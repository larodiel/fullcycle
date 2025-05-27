import express from 'express';
import mysql from 'mysql2/promise';
import path from 'path';

const app = express();

const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST || 'db',
  user: process.env.DATABASE_USER || 'root',
  database: process.env.DATABASE_NAME || 'nodedb',
  password: process.env.DATABASE_PASSWORD || 'nodedb'
});

await connection.execute(`
  CREATE TABLE IF NOT EXISTS people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const [rows] = await connection.execute('SELECT COUNT(*) as count FROM people');
if (rows[0].count === 0) {
  const initialPeople = [
    ['Alice', 'Smith'],
    ['Bob', 'Johnson'],
    ['Charlie', 'Williams'],
    ['Diana', 'Brown'],
    ['Ethan', 'Jones'],
    ['Fiona', 'Garcia'],
    ['George', 'Martinez'],
    ['Hannah', 'Davis'],
    ['Ian', 'Miller'],
    ['Julia', 'Wilson']
  ];

  for (const [name, lastName] of initialPeople) {
    await createPerson(name, lastName);
  }
}

app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), 'views'));

app.get('/', async (req, res) => {
  const [people] = await connection.execute('SELECT id, name, last_name, created_at FROM people');
  res.render('index', { people });
});

export async function createPerson(name, lastName) {
  const [result] = await connection.execute(`
    INSERT INTO people (name, last_name) VALUES (?, ?)
  `, [name, lastName]);
  return result.insertId;
}

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.LOCAL_PORT || 8080}`);
});