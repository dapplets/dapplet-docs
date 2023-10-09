---
id: viewport-adapter
title: 'Viewport adapter'
---

Adapters do not need to know the site markup to work with it. Some of them may simply insert pop-ups, floating buttons, or something else onto the screen. We can call them viewport, universal or common adapters.

Task: change the Twitter Adapter to a **Common Adapter** and check it on Twitter, YouTube, Instagram and Dapplets.org.

The initial code for this example is in [master](https://github.com/dapplets/dapplet-template/tree/master).

Change `twitter-config.dapplet-base.eth` to a `common-config.dapplet-base.eth` adapter in `/dapplet.json` with a right version:

```json
{
  ...

  "contextIds": ["common-config.dapplet-base.eth"],
  ...
  "dependencies": {
    "common-config.dapplet-base.eth": "0.1.1"
  }
}
```

In `src/index.ts` change injected adapter:

```ts
@Inject('common-config.dapplet-base.eth') public adapter: any;
```

and set the right insertion point:

```ts
activate() {
  const { button } = this.adapter.exports
  this.adapter.attachConfig({
    BODY: () =>
      button({
        DEFAULT: {
          label: 'Injected Button',
          img: EXAMPLE_IMG,
          exec: () => Core.alert('Hello, World!'),
        },
      }),
  })
}
```

Here is the result code of the example: [ex06-viewport-adapter.](https://github.com/dapplets/dapplet-template/tree/ex06-viewport-adapter)

Run the dapplet:

```bash
npm i
npm start
```

![video](/video/ex_06.gif)
