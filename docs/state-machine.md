---
id: state-machine
title: 'State machine'
---

Now let’s try to have the button change its appearance when clicked.

Here is the initial code for this example: [ex02-state-machine-exercise](https://github.com/dapplets/dapplet-template/tree/ex02-state-machine-exercise).

Here is `src/index.ts`:

```ts
import {} from '@dapplets/dapplet-extension'
import COOL_BADGE_IMG from './icons/smile19.png'
// import ANGRY_BADGE_IMG from './icons/angry-smile19.png'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  activate() {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: () =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Fake',
            img: COOL_BADGE_IMG,
            // LP: 2. Add function toggling the button state

            // LP end
          },
          // LP: 1. Add another state to the button

          // LP end
        }),
    })
  }
}
```

Firstly, add another state with a different badge to the button.

```typescript
ANOTHER: {
  label: 'FAKE!!!',
  img: ANGRY_BADGE_IMG,
  exec: (_, me) => (me.state = 'DEFAULT'),
},
```

Secondly, implement toggling states on button click.

```ts
exec: (_, me) => (me.state = 'ANOTHER'),
```

Result:

```ts
import {} from '@dapplets/dapplet-extension'
import COOL_BADGE_IMG from './icons/smile19.png'
import ANGRY_BADGE_IMG from './icons/angry-smile19.png'

@Injectable
export default class TwitterFeature {
  @Inject('twitter-config.dapplet-base.eth')
  public adapter

  activate() {
    const { button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: () =>
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Fake',
            img: COOL_BADGE_IMG,
            // LP: 2. Add function toggling the button state
            exec: (_, me) => (me.state = 'ANOTHER'),
            // LP end
          },
          // LP: 1. Add another state to the button
          ANOTHER: {
            label: 'FAKE!!!',
            img: ANGRY_BADGE_IMG,
            exec: (_, me) => (me.state = 'DEFAULT'),
          },
          // LP end
        }),
    })
  }
}
```

Here is our example’s result code: [ex02-state-machine-solution](https://github.com/dapplets/dapplet-template/tree/ex02-state-machine-solution).

Run the dapplet:

```bash
npm i
npm start
```

In the browser:

![video](/video/ex_2.gif)

> If you don't know how to run a dapplet in your browser, see [Get Started](/docs/get-started#10-connect-the-development-server-to-the-dapplets-extension).
