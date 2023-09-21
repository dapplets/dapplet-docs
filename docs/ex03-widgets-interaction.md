---
id: widgets-interaction
title: '03.Widgets interaction'
---

In this exercise we will add two interactive widgets to `POST` context.

Here is the initial code for this example: [ex03-widgets-interaction-exercise](https://github.com/dapplets/dapplet-template/tree/ex03-widgets-interaction-exercise).

Here is `src/index.ts`:

```ts
import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex03.png'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  activate() {
    // LP: 1. Get the widget "avatarBadge" from adapter
    const { button } = this.adapter.exports
    // LP end
    const { $ } = this.adapter.attachConfig({
      POST: (ctx) => [
        button({
          DEFAULT: {
            label: 'GOLD',
            img: EXAMPLE_IMG,
            // LP: 2. Toggle the state “hidden/shown” of the "avatarBadge" widget on button click

            // LP end
          },
        }),
        // LP: 1. Add extra "avatarBadge" widget and make it hidden by default

        // LP end
      ],
    })
  }
}
```

:::tip

There is a **$ Function** used to access to an existing widget on the website.

It receives two parameters:

- **ctx** — parsed context of the block in which the desired widget is located;
- **id** — the widget ID that needs to be specified manually.

`$(ctx, 'element_id')` returns the **me** object we used in the previous exercises, but for the desired widget.

Use it to change the **state** or **parameters**.

```ts
// Changing the state
exec: () => ($(ctx, 'another_el_id').state = 'SECOND')

// Changing the label
exec: () => ($(ctx, 'another_el_id').label = 'Hello')
```

:::

Let's get the widget `avatarBadge` from the adapter

```ts
const { button, avatarBadge } = this.adapter.exports
```

Add an extra avatar badge to `POST` and make it hidden by default.

```ts
POST: () => [
  ...

  avatarBadge({
    id: 'badge',
    initial: 'DEFAULT',
    DEFAULT: {
      img: BADGE_IMG,
      vertical: 'bottom',
      horizontal: 'right',
      hidden: true,
      exec: () => console.log(ctx),
    },
  }),
],
```

With a button click, toggle the avatarBadge’s state - "hidden/shown".

```ts
exec: () => {
  $(ctx, 'badge').hidden = !$(ctx, 'badge').hidden;
},
```

Result:

```ts
import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex03.png'
import BADGE_IMG from './icons/gold-eth.jpg'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  async activate() {
    // LP: 1. Get the widget 'avatarBadge' from adapter
    const { button, avatarBadge } = this.adapter.exports
    // LP end
    const { $ } = this.adapter.attachConfig({
      POST: (ctx) => [
        button({
          DEFAULT: {
            label: 'GOLD',
            img: EXAMPLE_IMG,
            // LP: 3. Toggle the state “hidden/shown” of the "avatarBadge" widget on button click
            exec: () => {
              $(ctx, 'badge').hidden = !$(ctx, 'badge').hidden
            },
            // LP end
          },
        }),
        // LP: 2. Add extra "avatarBadge" widget and make it hidden by default
        avatarBadge({
          id: 'badge',
          initial: 'DEFAULT',
          DEFAULT: {
            img: BADGE_IMG,
            vertical: 'bottom',
            horizontal: 'right',
            hidden: true,
            exec: () => console.log(ctx),
          },
        }),
        // LP end
      ],
    })
  }
}
```

Here is the result code of the example: [ex03-widgets-interaction-solution](https://github.com/dapplets/dapplet-template/tree/ex03-widgets-interaction-solution).

Run the dapplet:

```bash
npm i
npm start
```

In the browser:

![video](/video/ex_3.gif)

> If you don't know how to run a dapplet in your browser, see [Get Started](/docs/get-started#11-connect-the-development-server-to-dapplet-extension).
