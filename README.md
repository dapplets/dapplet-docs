<img width="1245" alt="dapplet-docs" src="https://user-images.githubusercontent.com/43613968/225053352-0e655e09-c42c-49ab-8b57-5ff8283c2e9f.png">

# Documentation for Dapplet Platform

Documentation for the Dapplet Platform. Includes instructions for using the [Dapplet Browser Extension](https://github.com/dapplets/dapplet-extension), [exercises](https://github.com/dapplets/dapplet-template) for creating dapplets and adapters for the platform, and documentation for community-created adapters.

View at [docs.dapplets.org](https://docs.dapplets.org/)

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Node Version

You must use **node 14** or above. We recommend [nvm](https://github.com/nvm-sh/nvm).

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
