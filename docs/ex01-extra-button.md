---
id: extra-button
title: "Ex01: Extra button"
---

The initial code for this example is here: [ex01-add-button-exercise](https://github.com/dapplets/dapplet-template/tree/ex01-add-button-exercise).

The **basic template** for `your_dapplet/src/index.ts` looks like this:

```ts title="HTML CSS TS"
import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  activate() {
    // LP: 11. Use async method `Core.storage.get(serverUrl: string)` to get server url.

    // LP End
    // LP: 12. Take a connection with server. Use `Core.connect<{ param }>({ url })`.

    // LP End
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 1. Add label with counter for it.

            // LP end
            // LP: 2. Listen for the button click - output into console.
            //     3: Make counter incrementing on button click.
            exec: () => alert('Hello, World!'),
            // LP end
          },
        }),
      ],
    });
  }
}
```

The dapplet injects the button to every Tweet on a Twitter page below the main content,
near the buttons "Like", "Retweet" etc. This insertion point is called `POST_SOUTH`.

Before using the `button()` or/and other elements in `this.adapter.attachConfig()` it has to be received from `this.adapter.exports`.

This button has only one state - `'DEFAULT'`. In this case you can choose not to set the initial state and delete this field.
But when you add several states you have to set the `initial` state as above.

The `label`, `img` and `exec` are defined in the state. In this case `exec` takes the function that will be executed on button click.

The whole **list of elements** for insertion **and insertion points** are defined in the adapter. The API of **twitter-adapter** you can find [here](/docs/adapters-docs-list).

In the first exercise we add counter to button's label.

## 1. Implement a counter in the dapplet

Add a label with a counter for it.

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

`ctx` - is an *object* that contains parameters of the current context where the dapplet element was injected.
Parameters are defined by the adapter.

`me` - is a *Proxy* of the element.

Make the counter incrementing on the button click.

```ts
me.label += 1;
```

Implement the ability to set the User Settings properties of the dapplet
at its layout in the browser.

![Dapptet's User Settings](/img/ex01_1.jpg)

They should be into the alert on the button click.

```ts
const message1 = await Core.storage.get('exampleString');
const message2 = await Core.storage.get('exampleHiddenString');
alert(`I wrote: ${message1}. Then wrote: ${message2}.`);
```

Here is the result of 2-4th points:

```ts
exec: async (ctx, me) => {
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

> If you don't know how to run the dapplet in a browser, see [Getting Started](/docs/getting-started#11-connect-the-development-server-to-dapplet-extension).

Here is the code of this part of the example: [ex01.1-add-button-noserver-solution](https://github.com/dapplets/dapplet-template/tree/ex01.1-add-button-noserver-solution)

In the browser:

![video](/video/ex01-extra-button.gif)

## 2. Implement a server counter storage

Add the storage for the counters in `server/index.js`.

```js
const counter = {};
```

Initialize the counter for the current tweet.

```js
if (!Object.prototype.hasOwnProperty.call(counter, tweetId)) {
  counter[tweetId] = {
    amount: 0,
  };
}
```

Send the ounter in `params`.

```js
ws.send(
  JSON.stringify({
    jsonrpc: '2.0',
    method: subscriptionId,
    params: [{ amount: counter[tweetId].amount }],
  }),
);
```

Send the counter in a callback.

```js
ws.send(
  JSON.stringify({
    jsonrpc: '2.0',
    method: subscriptionId,
    id: currentId,
    params: [{ amount: counter[currentId].amount }],
  }),
);
```

Implement the counter increment.

```js
const [currentId] = params;
counter[currentId].amount += 1;
emitter.emit('attached', currentId);
```

Add `serverUrl` to the dapplet's config.

```json
// config/default.json
{
  ...
  "dev": {
    "serverUrl": "ws://localhost:8080/feature-1",
    "exampleString": "some string value",
    "exampleHiddenString": "some string value"
  }
}

// config/schema.json
{
  ...
  "properties": {
    "serverUrl": {
      "type": "string",
      "title": "Server URL"
    },
    ...
  }
}
```

In `src/index.ts` use asynchronous method `Core.storage.get(serverUrl: string)` to get the server url.

```ts
const serverUrl = await Core.storage.get('serverUrl');
```

Don't forget to make the **`activate`** method `async`.

Take a connection with the server. Use `Core.connect<{ param }>({ url })`.

```ts
const server = Core.connect<{ amount: string }>({ url: serverUrl });
```

The console calls and the alert are no longer needed, so you can remove them.
The result is like this


```ts
import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/smile19.png';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/explicit-module-boundary-types
  @Inject('twitter-adapter.dapplet-base.eth') public adapter: any;
  
  async activate() {
    // LP: 11. Use async method `Core.storage.get(serverUrl: string)` to get server url.
    const serverUrl = await Core.storage.get('serverUrl');
    // LP End
    // LP: 12. Take a connection with server. Use `Core.connect<{ param }>({ url })`.
    const server = Core.connect<{ amount: string }>({ url: serverUrl });
    // LP End
    const { button } = this.adapter.exports;
    this.adapter.attachConfig({
      POST_SOUTH: [
        button({
          initial: 'DEFAULT',
          DEFAULT: {
            img: EXAMPLE_IMG,
            // LP: 1. Add label with counter for it.
            label: server.amount,
            // LP end
            // LP: 2. Listen for the button click - output into console.
            //     3: Make counter incrementing on button click.
            exec: (ctx) => server.send('increment', ctx.id),
            // LP end
          },
        }),
      ],
    });
  }
}
```

To run the server and the dapplet at the same time in this example we use [Concurrently](https://www.npmjs.com/package/concurrently):

```bash
npm i -D concurrently
```

In the package.json use the following script for `"start"` and `"postinstall"`:

```json
"postinstall": "cd server && npm i",
"start": "concurrently -c \"yellow,blue\" -n \"dapplet,server\" \"rollup -w --config rollup.config.js && cd server && node .\" \"cd server && node .\"",
```

Run the dapplet in your terminal

```bash
npm start
```

Here is the result code of the example: [ex01.2-add-button-server-solution](https://github.com/dapplets/dapplet-template/tree/ex01.2-add-button-server-solution).

In the browser:

![video](/video/ex01-2-extra-button-server.gif)

> If you don't know how to run the dapplet in a browser, see [Getting Started](/docs/getting-started#11-connect-the-development-server-to-dapplet-extension).
