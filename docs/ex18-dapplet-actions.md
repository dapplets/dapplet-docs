---
id: dapplet-actions
title: "Ex18: Dapplet Actions"
---

**Dapplet Actions** widgets are used for quick user access to dapplet functions in a minimized extension.

The initial code for this example is in [master.](https://github.com/dapplets/dapplet-template/tree/master).

1. Inject of Overlay adapter to virtual adapter in `src/index.ts`.

```ts
@Inject('overlay-adapter.dapplet-base.eth') public adapterAction: any
```

2. Import of widget **button** from Overlay adapter.

```ts
async activate(): Promise<void> {
    ...
    const { button: buttonAction } = this.adapterAction.exports
    ...
    }
```

3. We pass parameters of the widget described in the adapter into states and then use in the attachConfig() function:

```ts
async activate(): Promise<void> {

    ...
    const { button: buttonAction } = this.adapterAction.exports


    const wallet = await Core.wallet({
      authMethods: ["ethereum/goerli", "near/testnet"],
    });

    const ex18_button = buttonAction({
      initial: 'ex18',
      ex18: {
        icon: EXAMPLE_IMG,
        title: 'title',
        pinnedID: 'ex18-title',
        action: (_, me) => {
          me.title = 'ex18 new title'
        },
      },
    })
    this.adapterAction.attachConfig({

      MENU_ACTION: (ctx) => [ex18_button,
        buttonAction({
          initial: "CONNECT",
          CONNECT: {
            icon: EXAMPLE_IMG_2,
            title: 'connect',
            pinnedID: 'ex18-connect',
            action: async (_, me) => {
              try {
                await wallet.connect();
              } catch (err) {
                console.log("Disconnect ERROR:", err);
              }
            },
          },
        })],
    })
   ...
  }
```

:::tip

**parameters of the Dapplet Actions**

Widget **button** have similar parameters to button widgets of other adapters. More about it [here](/docs/extra-button).

_icon_ - required parameter. Used svg format.

_pinnedID_ - required parameter, for the user to pin the widget in the minimized extension. Must be uniq for each widget.

_action_ - analogue of _exec_ .

_disabled_ - option parameter, default false.

_hidden_ - option parameter, default false, hidding widget.
:::

Here is the result code of the example: [ex18-dapplet-actions](https://github.com/dapplets/dapplet-template/tree/ex18-dapplet-actions).

Run the dapplet:

```bash
npm i
npm
```

![video](/video/ex_18.gif)
