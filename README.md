# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## [Task Specs](Task.md)

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

## Installation

Create Docker Container:

> **Note:** If **Recommended IDE Setup** used then use **Open Folder in Container**

```sh
$ cd .devcontainer
$ docker-compose up

docker exec -it newsapi_nodejs bash
```

Install the npm dependencies:

```sh
$ npm install
```

Serve project on localhost:

```sh
$ npm run dev
```

Build project:

```sh
$ npm run build
```
