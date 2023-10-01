---
id: notifications
title: 'Ex19: Notifications'
---

**Notifications** are used to send notifications to users.

The initial code for this example is in [master](https://github.com/dapplets/dapplet-template/tree/master).

1. Open `src/index.ts`. Import _notify_, _confirm_ and _alert_ functions from Core.

```ts
export default class Notification {
    ...

  onNotification = async () => {
   await Core.notify({
      title: "Notification's title",
      message: 'This is message a notification',
      teaser: 'This is message a teaser',
    })
  }
  onConfirm = async () => {
   await Core.confirm('This is a confirm')
  }
  onAlert = async () => {
   await Core.alert('This is a alert')
  }
}
```

2. Add _onNotification_, _onConfirm_, _onAlert_ functions to _exec_ field in buttons

```ts
...
async activate(): Promise<void> {
    const { button } = this.adapter.exports
     this.adapter.attachConfig({
      PROFILE: (ctx: any) =>[
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Notify',
            img: EXAMPLE_IMG,
            exec: this.onNotification,
          },
        }),
        button({
          initial: 'ALERT',
          ALERT: {
            label: 'Alert',
            img: EXAMPLE_IMG,
            exec: this.onAlert,
          },
        }),
        button({
          initial: 'CONFIRM',
          CONFIRM: {
            label: 'Conf',
            img: EXAMPLE_IMG,
            exec: this.onConfirm,
          },
        }),
      ]

    })

  }
  ...

```

:::tip

**parameters of the notify's function**

_title_ - required parameter. Title of the notification.

_message_ - optional parameter. Message to user.

_teaser_ - required parameter. Short message in the charge in the notice.

More fields will be added soon.

:::

Here is the result code of the example: [ex19-notifications](https://github.com/dapplets/dapplet-template/tree/ex19-notifications).

Run the dapplet:

```bash
npm i
npm
```

![video](/video/ex_19.gif)
