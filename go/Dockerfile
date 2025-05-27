FROM golang:alpine3.21 AS builder

WORKDIR /app

COPY main.go /app/

RUN go build -ldflags="-s -w" main.go

ENTRYPOINT [ "./main" ]

FROM scratch
COPY --from=builder /app/main /app/main
WORKDIR /app
ENTRYPOINT [ "./main" ]
