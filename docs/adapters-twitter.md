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

> The parameter `"hidden"` doesn't work temporarily. It will work in the future releases.

Finally, the default exported class of your dapplet has to be **`@Injectable`**,
and a constructor has to have argument `@Inject('exercise-viewport-adapter.dapplet-base.eth') public adapter: any`.
For example:

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

## Widgets

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

If the **DEFAULT** state is not presented, the **initial** state has to be specified clearly.

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

Into states we pass **parameters** of the widget. Parameter lists are defined by widgets and will be described below.

The Twitter adapter provides the following widgets:

- [badge](adapters-twitter#badge)
- [button](adapters-twitter#button)
- [caption](adapters-twitter#caption)
- [label](adapters-twitter#label)
- [picture](adapters-twitter#picture)

### badge

Parameters:
- **img** `: string` — a path to the image for the badge;
- **vertical** `: 'top' | 'bottom'` — sets a vertical position;
- **horizontal** `: 'left' | 'right'` — sets a hirizontal position;
- **hidden** `: boolean` — hides the badge;
- **tooltip** `?: string` — adds a tooltip.

### button

Parameters:
- **img** `?: string` — a path to the image for the button;
- **label** `?: string` — sets a label for the button;
- **loading** `?: boolean` — sets the loading icon instead of **img**;
- **disabled** `?: boolean` — makes the button disabled;
- **hidden** `?: boolean` — hides the button;
- **tooltip** `?: string` — adds a tooltip.

### caption

Parameters:
- **img** `: string` — a path to the image for the caption;
- **text** `: string` — adds the text to the caption;
- **hidden** `: boolean` — hides the caption;
- **tooltip** `?: string` — adds a tooltip.

### label

Parameters:
- **img** `: string` — a path to the image for the label;
- **text** `: string` — adds the text to the label;
- **postfix** `?: string` — adds a postfix to **text**;
- **disabled** `?: boolean` — makes the label disabled;
- **hidden** `: boolean` — hides the label;
- **tooltip** `?: string` — adds a tooltip.

### picture

Parameters:
- **img** `: string` — a path to the image for the picture;
- **disabled** `: boolean` — makes the picture disabled;
- **hidden** `: boolean` — hides the picture;
- **tooltip** `?: string` — adds a tooltip.

## Insertion points

### Tweet:

- POST_SOUTH

- POST_COMBO

- POST_PICTURE

- POST_AVATAR_BADGE

- POST_USERNAME_BADGE

- POST_USERNAME_LABEL

- POST_STARTER

- POST_SOCIAL_CONTEXT



## Events

### Tweet:

- like

- dislike

- starter

