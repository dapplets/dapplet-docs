---
id: virtual-adapter-int
title: "Ex07: Virtual adapter (interface)"
---

Task: change twitter adapter to **identity** adapter and check it on Twitter and Instagram.

The initial code for this example is in [master.](https://github.com/dapplets/dapplet-template/tree/master)

Change twitter adapter to **identity** adapter in `/dapplet.json` with a right version:

```json
{
  ...
  "contextIds": ["identity-adapter.dapplet-base.eth"],
  ...
  "dependencies": {
    "identity-adapter.dapplet-base.eth": "0.2.0"
  }
}
```

In `src/index.ts` change injected adapter:

```ts
@Inject('identity-adapter.dapplet-base.eth') public adapter: any,
```

Here is the result code of the example: [ex07-virtual-adapter.](https://github.com/dapplets/dapplet-template/tree/ex07-virtual-adapter)

Run the dapplet:

```bash
npm i
npm start
```
