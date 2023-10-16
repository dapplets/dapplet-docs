---
id: notifications
title: 'Notifications'
---

**Notifications** are used to send notifications to users.

The initial code for this example is in [master](https://github.com/dapplets/dapplet-template/tree/master).

1. Open `src/index.ts`. Use _notify_, _confirm_ and _alert_ functions from Core.

```ts
export default class Notification {
    ...

  onNotification = () =>
    Core.notify({
      title: "Notification's title",
      message: 'This is a full notification message',
      teaser: 'This is a teaser message',
    })

  onAlert = () => Core.alert('This is an alert')

  onConfirm = async () => {
    const isConfirmed = await Core.confirm('This is a confirm')
    if (isConfirmed) {
      Core.notify('Confirmed!')
    } else {
      Core.notify('Rejected!')
    }
  }
}
```

Functions are asynchronous and return typed promises.

**Parameters of the notify's function**

_title_ - required parameter. Title of the notification.

_message_ - optional parameter. Message to user.

_teaser_ - required parameter. Short message in the charge in the notice.

More fields notify's function will be added soon.

**Parameters of the alert's function**

_message_ - Message to user.

**Parameters of the confirm's function**. Returns a boolean value.

_message_ - Message to user.

2. Add _onNotification_, _onConfirm_, _onAlert_ functions to _exec_ field in buttons

```ts
...
async activate() {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      PROFILE: () => [
        button({
          DEFAULT: {
            label: 'Notify',
            img: NOTIFICATION_IMG,
            exec: this.onNotification,
          },
        }),
        button({
          DEFAULT: {
            label: 'Alert',
            exec: this.onAlert,
          },
        }),
        button({
          DEFAULT: {
            label: 'Confirm',
            exec: this.onConfirm,
          },
        }),
      ],
    })
  }
  ...

```

Here is the result code of the example: [ex19-notifications](https://github.com/dapplets/dapplet-template/tree/ex19-notifications).

Run the dapplet:

```bash
npm i
npm
```

![video](/video/ex_19.gif)
