---
id: notifications
title: '18.Notifications'
---

**Notifications** are used to send notifications to users.

The initial code for this example is in [master](https://github.com/dapplets/dapplet-template/tree/master).

1. Open `src/index.ts`. Import _notify_ function from Core.

```ts
export default class Notification {
    ...

    handleNotifyButtonClick = () => {
    Core.notify({
      title: "Notification's title",
      message: 'This is message a notification',
      icon: NOTIFICATION_IMG,
    })
    }
}
```

2. Add _handleNotifyButtonClick_ function to _exec_ field

```ts
...
 async activate(): Promise<void> {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: (ctx: any) =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'ex_19',
            img: EXAMPLE_IMG,
            exec: this.handleNotifyButtonClick,
          },
        }),
    })
  }
  ...

```

:::tip

**parameters of the notify's function**

_title_ - required parameter. Title of the notification.

_message_ - optional parameter. Message to user.

_icon_ - required parameter. We recommend to use images in SVG format.

More fields will be added soon.

:::

Here is the result code of the example: [ex19-notifications](https://github.com/dapplets/dapplet-template/tree/ex19-notifications).

Run the dapplet:

```bash
npm i
npm
```

![video](/video/ex_19.gif)
