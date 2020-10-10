# ThreeDify-web-app

A REACT web app for ThreeDify.

[![Build](https://github.com/silwalanish/ThreeDify-web-app/workflows/Build/badge.svg)](https://github.com/silwalanish/ThreeDify-web-app/actions)
[![Lint](https://github.com/silwalanish/ThreeDify-web-app/workflows/Lint%20Check/badge.svg)](https://github.com/silwalanish/ThreeDify-web-app/actions)

# What's ThreeDify?

ThreeDify is a online platform where you can upload images and create a 3D reconstruction of the images.

## Environment Variables

| Variable | Description                             |
| -------- | --------------------------------------- |
| PORT     | Port to run the web server              |
| API_URL  | Base API URL e.g. http://127.0.0.1:8000 |

## Installation

1. Make sure you have `node-v13.11.0` and `yarn-v1.22.4`
2. Install dependencies

```
$ yarn
```

3. Create `.env` file

```
$ cp .env.example .env
```

## Build

```bash
$ yarn build
```

## Run

```bash
$ yarn start
```

## Watch

```bash
$ yarn watch
```

## Development

Start webserver to serve the files. And watch for file changes.

```bash
$ yarn start:dev
```

## Lint

Check lint errors

```bash
$ yarn lint
```

Fix lint errors

```bash
$ yarn lint:fix
```
