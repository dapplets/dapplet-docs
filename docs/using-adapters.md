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
  "contextIds": ["twitter-config.dapplet-base.eth"],
  "config": {
    "schema": "config/schema.json",
    "default": "config/default.json"
  },
  "dependencies": {
    "twitter-config.dapplet-base.eth": "0.1.8"
  }
}
```

Here set the title and icon and check if the other fields match your project.

As you can see **`"contextIds"`** and **`"dependencies"`** contain the name of our Twitter adapter: `"twitter-config.dapplet-base.eth"`. The last field specifies which **version** should be used.

Implement the dapplet’s `/src/index.ts` according to the example:

```ts
import {} from '@dapplets/dapplet-extension';
...

@Injectable
export default class MyDapplet {

  @Inject('twitter-config.dapplet-base.ethh')
  public adapter: any;

  activate(): any {
    ...
  }
}
```

## Using widgets

Widgets are taken from the adapter's **`exports`**:

```ts
const { button } = this.adapter.exports
```

and then used in the **`attachConfig()`** function:

```ts
 this.adapter.attachConfig({
      POST: () =>
        button({
        ...
        }),
    })
```

`attachConfig` receives an object with context names as keys. The values of the object are functions which return a widget or an array of widgets. `attachConfig` returns the object with `$(ctx, 'element_id')` function,
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
