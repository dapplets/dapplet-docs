---
id: widgets-interaction
title: 'Ex03: Widgets interaction'
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

  async activate() {
    // LP: 1. Get the widget 'avatarBadge' from adapter
    const { button } = this.adapter.exports
    // LP end
    // $ returns object "me". Use it to change state or params of the other widget
    // Example 1: exec: () => $(ctx, 'another_el_id').state = 'SECOND'
    // Example 2: exec: () => $(ctx, 'another_el_id').label = 'Hello'
    const { $ } = this.adapter.attachConfig({
      POST: (ctx) => [
        button({
          id: 'button',
          DEFAULT: {
            label: 'Injected Button',
            img: EXAMPLE_IMG,
            // LP: 2. Toggle the state “hidden/shown” of the avatarBadge on button click

            // LP end
          },
        }),
        // LP: 1. Add extra avatarBadge and make it hidden by default

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

Add an extra avatarBadge to `POST` and make it hidden by default.

```ts
POST: () => [
  ...

  avatarBadge({
    id: 'avatarBadge',
    initial: 'DEFAULT',
    DEFAULT: {
      img: STAMP_IMG,
      hidden: true,
    },
  }),
],
```

With a button click, toggle the avatarBadge’s state - "hidden/shown".

```ts
exec: () => {
  $(ctx, 'avatarBadge').hidden = !$(ctx, 'avatarBadge').hidden;
},
```

Result:

```ts
import {} from '@dapplets/dapplet-extension'
import EXAMPLE_IMG from './icons/ex03.png'
import STAMP_IMG from './icons/fakeStamp.png'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  async activate() {
    // LP: 1. Get the widget 'avatarBadge' from adapter
    const { button, avatarBadge } = this.adapter.exports
    // LP end
    // $ returns object "me". Use it to change state or params of the other widget
    // Example 1: exec: () => $(ctx, 'another_el_id').state = 'SECOND'
    // Example 2: exec: () => $(ctx, 'another_el_id').label = 'Hello'
    const { $ } = this.adapter.attachConfig({
      POST: (ctx) => [
        button({
          id: 'button',
          DEFAULT: {
            label: 'Injected Button',
            img: EXAMPLE_IMG,
            // LP: 2. Toggle the state “hidden/shown” of the avatarBadge on button click
            exec: () => {
              $(ctx, 'avatarBadge').hidden = !$(ctx, 'avatarBadge').hidden
            },
            // LP end
          },
        }),
        // LP: 1. Add extra avatarBadge and make it hidden by default
        avatarBadge({
          id: 'avatarBadge',
          initial: 'DEFAULT',
          DEFAULT: {
            img: STAMP_IMG,
            hidden: true,
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
