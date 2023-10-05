---
id: virtual-adapter-int
title: 'Virtual adapter (interface)'
---

Task: change the Twitter Config to an **Social Virtual Config** config and check it on Twitter and Github.

The initial code for this example is in [master.](https://github.com/dapplets/dapplet-template/tree/master)

Change the "twitter-config.dapplet-base.eth" to an **social-virtual-config.dapplet-base.eth** in `/dapplet.json` with a right version:

```json
{
  ...
  "contextIds": ["social-virtual-config.dapplet-base.eth"],
  ...
  "dependencies": {
      "social-virtual-config.dapplet-base.eth": "0.1.0"
  }
}
```

In `src/index.ts` change the injected adapter:

```ts
@Inject('social-virtual-config.dapplet-base.eth')
public adapter: any;
```

Here is the result code of the example: [ex07-virtual-adapter.](https://github.com/dapplets/dapplet-template/tree/ex07-virtual-adapter)

Run the dapplet:

```bash
npm i
npm start
```

![video](/video/ex_7.gif)
