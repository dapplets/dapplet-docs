---
id: adapters-twitter
title: Twitter adapter
---

## What is the Twitter adapter?

The Twitter adapter provides you with a high-level interface for embedding a series of widgets on top of Twitter. The adapter provides a set of widgets and insertion points for them. Within one dapplet, you can use multiple widgets and use them at the same or different insertion points.

## How to connect your dapplet to the Twitter adapter?

First you need to install **Dapplet extension** package using npm to your project:

```bash
npm i @dapplets/dapplet-extension
```

Then create the manifest **`/dapplet.json`**:

```json
{
  "name": { "$ref": "package.json#/name" },
  "branch": "default",
  "version": { "$ref": "package.json#/version" },
  "type": "FEATURE",
  "title": "YOUR_TITLE",
  "description": { "$ref": "package.json#/description" },
  "main": { "$ref": "package.json#/main" },
  "icon": "src/icons/YOUR_ICON.png",
  "contextIds": ["twitter-adapter.dapplet-base.eth"],
  "config": {
    "schema": "config/schema.json",
    "default": "config/default.json"
  },
  "dependencies": {
    "twitter-adapter.dapplet-base.eth": "0.5.1"
  }
}
```

Here set the title and icon and check if the other fields match your project.

As you can see **`"contextIds"`** and **`"dependencies"`** contains the name of our Twitter adapter: `"twitter-adapter.dapplet-base.eth"`, and the last field specifies **version** to be used.

Add the `/config` directory with the following structure:

```bash
config
├── default.json
└── schema.json
```

In the `schema.json` we specify the settings for the dapplet, which will be available in a browser through the extension. `default.json` contains defaults for the schema for three environments: **main**, **test** and **dev**.

```json
{
  "type": "object",
  "required": ["exampleString", "exampleHiddenString"],
  "properties": {
    "exampleString": {
      "type": "string",
      "title": "Example of string property"
    },
    "exampleHiddenString": {
      "type": "string",
      "title": "Example of hidden string property",
      "hidden": true
    }
  }
}
```

```json
{
  "main": {
    "exampleString": "some string value",
    "exampleHiddenString": "some string value"
  },
  "test": {
    "exampleString": "some string value",
    "exampleHiddenString": "some string value"
  },
  "dev": {
    "exampleString": "some string value",
    "exampleHiddenString": "some string value"
  }
}
```

![Dapplet Settings](/img/a_twitter_1.jpg)

> The parameter `"hidden"` doesn't work in the development mode.

## Widgets

The Twitter adapter provides the following widgets:

- [badge](adapters-twitter#badge)
- [button](adapters-twitter#button)
- [caption](adapters-twitter#caption)
- [label](adapters-twitter#label)
- [picture](adapters-twitter#picture)
- [starter](adapters-twitter#starter)

### badge

### button

### caption

### label

### picture

### starter


## Insertion points
