---
id: state-machine
title: "Ex02: State machine"
---

Let's change button state on its click.

The initial code for this example is here: [ex02-state-machine-exercise](https://github.com/dapplets/dapplet-template/tree/ex02-state-machine-exercise).

Here is `src/index.ts`:

```ts
import {} from '@dapplets/dapplet-extension';
import COOL_BADGE_IMG from './icons/smile19.png';
import ANGRY_BADGE_IMG from './icons/angry-smile19.png';

@Injectable
export default class TwitterFeature {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
    @Inject('twitter-adapter.dapplet-base.eth') public adapter: any,
  ) {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Fake',
            img: COOL_BADGE_IMG,
            // LP: 2. Add a function toggling the button state

            // LP end
          },
          // LP: 1. Add another state to the button

          // LP end
        }),
      ],
    });
  }
}
```

Firstly add another state with a different badge to the button.

```ts
ANOTHER: {
label: 'FAKE!!!',
img: ANGRY_BADGE_IMG,
exec: (ctx, me) => (me.state = 'DEFAULT'),
},
```

Secondary implement toggling states on button click.

```ts
exec: (ctx, me) => (me.state = 'ANOTHER'),
```

Result:

```ts
import {} from '@dapplets/dapplet-extension';
import COOL_BADGE_IMG from './icons/smile19.png';
import ANGRY_BADGE_IMG from './icons/angry-smile19.png';

@Injectable
export default class TwitterFeature {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
    @Inject('twitter-adapter.dapplet-base.eth') public adapter: any,
  ) {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            label: 'Fake',
            img: COOL_BADGE_IMG,
            exec: (ctx, me) => (me.state = 'ANOTHER'),
          },
          ANOTHER: {
            label: 'FAKE!!!',
            img: ANGRY_BADGE_IMG,
            exec: (ctx, me) => (me.state = 'DEFAULT'),
          },
        }),
      ],
    });
  }
}
```

Here is the result code of the example: [ex02-state-machine-solution](https://github.com/dapplets/dapplet-template/tree/ex02-state-machine-solution).

Run the dapplet:

```bash
npm i
npm start
```

> If you don't know how to run the dapplet in a browser, see [Getting Started](/docs/getting-started#11-connect-the-development-server-to-dapplet-extension).
