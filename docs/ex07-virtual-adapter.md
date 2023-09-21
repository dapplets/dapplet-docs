---
id: virtual-adapter-int
title: 'Ex07: Virtual config (interface)'
---

Task: change the twitter adapter to an **virtual** config and check it on Twitter and Github.

The initial code for this example is in [master.](https://github.com/dapplets/dapplet-template/tree/master)

Change the twitter adapter to an **virtual** config in `/dapplet.json` with a right version:

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

In `src/index.ts` change the virtual config:

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
