---
id: adapter-connection
sidebar_label: Using adapters
title: How to connect a dapplet to an adapter?
---

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
// /config/schema.json
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
// /config/default.json
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

> The parameter `"hidden"` doesn't work temporarily. It will work in the future releases.

Finally, implement `/src/index.ts` of the dapplet according to the example:

```ts
import {} from '@dapplets/dapplet-extension';
...

@Injectable
export default class MyDapplet {
  constructor(
    @Inject('exercise-viewport-adapter.dapplet-base.eth') public adapter: any,
  ) {
    ...
  }
}
```

## Using widgets

Widgets are taken from the adapter's **`exports`**:

```ts
const { button, popup } = this.adapter.exports;
```

and then use in  the **`attachConfig()`** function:

```ts
const { $ } = this.adapter.attachConfig({
  BODY: [
    button({
      ...
    }),
    popup({
      id: 'popup',
      ...
    }),
  ],
});
```

`attachConfig()` receives an object with insertion points as keys and arrays of widgets as values
and returns the object with **`$(ctx, 'element_id')`** function,
which returns the Proxy of the widget by its **id**.

Widgets have **states**. The **DEFAULT** (case sensitive) state is used as initial.

```ts
button({
  DEFAULT: {
    ...
  },
  ...
}),
```

It's possible to inplement many states.

If the **DEFAULT** state is not presented, the **initial** state has to be specified explicitly.

```ts
button({
  initial: 'FIRST',
  FIRST: {
    ...
  },
  SECOND: {
    ...
  },
  ...
}),
```

Into states we pass **parameters** of the widget described in the adapter.
