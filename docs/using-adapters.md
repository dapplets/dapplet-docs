---
id: using-adapters
sidebar_label: Using adapters
title: How to connect a dapplet to an adapter?
---

First you need to install the **Dapplet extension** package to your project. Use npm for this:

```bash
npm i -D @dapplets/dapplet-extension
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
    "twitter-adapter.dapplet-base.eth": "0.9.0"
  }
}
```

Here set the title and icon and check if the other fields match your project.

As you can see **`"contextIds"`** and **`"dependencies"`** contain the name of our Twitter adapter: `"twitter-adapter.dapplet-base.eth"`. The last field specifies which **version** should be used.

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

Finally, implement the dapplet’s `/src/index.ts` according to the example:

```ts
import {} from '@dapplets/dapplet-extension';
...

@Injectable
export default class MyDapplet {

  @Inject('exercise-viewport-adapter.dapplet-base.eth')
  public adapter: any;

  activate(): any {
    ...
  }
}
```

## Using widgets

Widgets are taken from the adapter's **`exports`**:

```ts
const { button, popup } = this.adapter.exports;
```

and then used in the **`attachConfig()`** function:

```ts
const { $ } = this.adapter.attachConfig({
  BODY: (ctx) => [
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

`attachConfig` receives an object with context names as keys. The values of the object are  functions which return a widget or an array of widgets. `attachConfig` returns the object with `$(ctx, 'element_id')` function,
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

It's possible to implement many states.

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
We pass **parameters** of the widget described in the adapter into states.

## Using events

Adapters provide a number of events for different contexts that dapplets can listen to.
They are used in the **`attachConfig`** function near the insertion points:

```ts
// /src/index.ts > TwitterFeature > activate

this.adapter.attachConfig({
  events: {
    like: async (ctx) => {
      ...
    },
  },
  ...
});
```
