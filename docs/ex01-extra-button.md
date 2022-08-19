---
id: extra-button
title: "Ex01: Extra button"
---

Here is the initial code for this example: [ex01-add-button-exercise](https://github.com/dapplets/dapplet-template/tree/ex01-add-button-exercise).

The **basic template** for `your_dapplet/src/index.ts` looks like this:

```ts
import { } from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/ex01.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;

  activate() {
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST: (ctx: any) => 
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 1. Add label with counter for it.

            // LP end
            // LP: 2. Listen for the button click - output into console.
            //     3: Increase the counter value on the button click
            exec: () => alert('Hello, World!'),
            // LP end
          },
        }),
    });
  }
}
```

The dapplet injects a **button** to every Tweet on a Twitter page. This button is displayed below the main content, near the buttons *Like*, *Retweet* etc. The function passed to `POST` takes `ctx` and returns the **widget**, the **array of widgets** or **null**.

`ctx` - is an *object* that contains parameters of the current **context** where the dapplet widgets were injected. Parameters are defined by the adapter.

```typescript
POST:  (ctx) => [ button({ ... }) ] 
```

or

```typescript
POST: (ctx) => button({})
```

Before using the `button` or/and other widgets in `this.adapter.attachConfig()` it has to be received
from `this.adapter.exports`.

This button has only one state - `DEFAULT`. In this case you can choose not to set the initial state and delete this field.

```typescript
 button({
  DEFAULT: {
    img: EXAMPLE_IMG,
    exec: () => alert('Hello, World!'),
  },
})
```

When you don’t have the `DEFAULT` state you have to set the `initial` state as above.

```typescript
button({
  initial: 'FIRST_STATE', // or SECOND_STATE

  // First state button
  FIRST_STATE: {
    img: LIKE_IMG,
    exec: () => alert('Hello, World!'),
  },

  // Second state button
  SECOND_STATE: {
    img: DISLIKE_IMG,
    exec: () => alert('Hello, World!'),
  }
})
```

The `label`, `img` and `exec` are defined in the state. In this case `exec` takes the function that will be executed with a
button click.

The whole list of **widgets** and **contexts** is defined in the adapter. The **twitter-adapter** API can be found [here](/docs/adapters-docs-list).

In the first exercise we will add a counter to the button label in `POST`.

Let's implement counters for the buttons.

Add a label with a counter.

```ts
label: 0
```

Listen for the button click - output into console.

```ts
exec: async (ctx, me) => {
  console.log(ctx);
  console.log(me);
...
}
```

The extension provides **exec** function with two parameters:

* **ctx** — the current parsed context;
* **me** — a *Proxy* of the widget.

We got the `ctx` object earlier so in our example we don't need to get it here.

Using `me` we can change the widget's parameters and its state.

```ts
// Changing the state
exec: (ctx, me) => me.state = 'SECOND';

// Changing the label
exec: (ctx, me) => me.label = 'Hello';
```

Increase the counter value on the button click.

```ts
me.label += 1;
```

Let's display a message in the browser alert by clicking on the widget. We will also give an opportunity to customize the message text in the extension’s dapplet settings.

The dapplet settings are as follows:

![Dapplet's User Settings](/img/ex01_1.jpg)

To do this, add the following code to the dapplet's `exec`:

```ts
const message1 = await Core.storage.get('exampleString');
const message2 = await Core.storage.get('exampleHiddenString');
alert(`I wrote: ${message1}. Then wrote: ${message2}.`);
```

Here is the complete `exec` code:

```ts
exec: async (_, me) => {
  console.log(ctx);
  console.log(me);
  me.label += 1;
  const message1 = await Core.storage.get('exampleString');
  const message2 = await Core.storage.get('exampleHiddenString');
  alert(`I wrote: ${message1}. Then wrote: ${message2}.`);
}
```

In the `config/default.json` define your own defaults.

```json
{
  "main": {
    "exampleString": "some string value",
    "exampleHiddenString": "some string value"
  },
  "test": {
    "exampleString": "TEST: shown",
    "exampleHiddenString": "TEST: hidden"
  },
  "dev": {
    "exampleString": "some string value",
    "exampleHiddenString": "some string value"
  }
}
```

Run the dapplet in your terminal

```bash
npm start
```

> If you don't know how to run the dapplet in a browser, see [Get Started](/docs/get-started#11-connect-the-development-server-to-dapplet-extension).

Here is the result code of the example: [ex01-add-button-solution](https://github.com/dapplets/dapplet-template/tree/ex01-add-button-solution)

In the browser:

![video](/video/ex_1_2.gif)

> If you want to save counters' values and get them from the server, look at [example 15](/docs/server-connection).
