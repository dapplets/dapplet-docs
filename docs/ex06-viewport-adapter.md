---
id: viewport-adapter
title: "Ex06: Viewport adapter"
---

Task: change twitter adapter to **common** adapter and check it on Twitter, YouTube, Instagram and Dapplets.org.

The initial code for this example is in [master](https://github.com/dapplets/dapplet-template/tree/master).

Change twitter adapter to **common** adapter in `/dapplet.json` with a right version:

```json
{
  ...
  
  "contextIds": ["common-adapter.dapplet-base.eth"],
  ...
  "dependencies": {
    "common-adapter.dapplet-base.eth": "0.3.6"
  }
}
```

In `src/index.ts` change injected adapter:

```ts
@Inject('common-adapter.dapplet-base.eth') public adapter: any;
```

and set the right insertion point:

```ts
BODY: () => 
  button({
    ...
  }),
```

Here is the result code of the example: [ex06-viewport-adapter.](https://github.com/dapplets/dapplet-template/tree/ex06-viewport-adapter)

Run the dapplet:

```bash
npm i
npm start
```
