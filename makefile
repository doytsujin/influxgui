GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
BINARY_NAME=influxgui
BINARY_UNIX=$(BINARY_NAME)_unix

all: test build

test:
	${GOTEST}

compile-assets:
	go-bindata -o assets.go -prefix assets/ assets/ assets/components/ assets/media/

build-dev: compile-assets
	ENV="develop" mkdir -p ./build && ${GOBUILD} -o ./build/${BINARY_NAME}_linux -v *.go

build-linux: compile-assets
	mkdir -p ./build && ${GOBUILD} -o ./build/${BINARY_NAME}_linux -v *.go

build: test build-linux
	xgo -dest ./build/ -targets windows/*,darwin/* github.com/Atihinen/influxgui

run: build-dev
	./build/${BINARY_NAME}_linux