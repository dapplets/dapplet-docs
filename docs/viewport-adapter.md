---
id: viewport-adapter
title: 'Viewport adapter'
---

Task: change the twitter adapter to a **common** adapter and check it on Twitter, YouTube, Instagram and Dapplets.org.

The initial code for this example is in [master](https://github.com/dapplets/dapplet-template/tree/master).

Change twitter adapter to a **common** adapter in `/dapplet.json` with a right version:

```json
{
  ...

  "contextIds": ["example-common-config.dapplet-base.eth"],
  ...
  "dependencies": {
    "example-common-config.dapplet-base.eth": "0.1.0"
  }
}
```

In `src/index.ts` change injected adapter:

```ts
@Inject('example-common-config.dapplet-base.eth') public adapter: any;
```

and set the right insertion point:

```ts
...
  async activate(): Promise<void> {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      GLOBAL: (global) => {
        this._globalContext = global
      },
      BODY: () =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Hi',
            img: EXAMPLE_IMG,
            exec: this.onAlert,
          },
        }),
    })
  }
  onAlert = async () => {
    Core.alert('Hello world')
  }
  ...
```

Here is the result code of the example: [ex06-viewport-adapter.](https://github.com/dapplets/dapplet-template/tree/ex06-viewport-adapter)

Run the dapplet:

```bash
npm i
npm start
```

![video](/video/ex_06.gif)
