---
id: overlays
title: "Ex04: Overlays"
---

In this example we add an overlay that opens on click by button in the POST.

Here are two examples of the overlay:

- [Pure HTML page](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/pure-html-page)
- [React.js based example](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/react-overlay)

At first, we implement an overlay written on HTML with pure JavaScript and at second - the React based component.

The initial code for this example, including both of the above overlays, is
here: [ex04-overlays-exercise.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-exercise)

First install [Dapplet-Overlay Bridge:](https://github.com/dapplets/dapplet-overlay-bridge)

```bash
npm i @dapplets/dapplet-overlay-bridge
```

Now let's create overlays.

### HTML with JavaScript overlay

The `pure-html-page/index.html` has a `<span>` tag with a `dappletMessage` class and a button with a `ch-state-btn`
class.

```html

<div>
  Info from dapplet:
  <span class="dappletMessage"></span>
</div>
<button class="ch-state-btn">Counter +1</button>
```

In a `<script>` tag we import class **`Bridge`** from `dapplet-overlay-bridge` and create class `MyBridge`, that
extends `Bridge`, with methods **`onData()`** and **`onClick()`**.

**`onData()`** increments the counter received from the dapplet and sends back.

**`onClick()`** receives boolean variable and sends *'tick'* or *'tock'* to dapplet on every click.

```js
import Bridge from 'https://unpkg.com/@dapplets/dapplet-overlay-bridge';

class MyBridge extends Bridge {
  _subId = 0;

  onData (callback) {
    this.subscribe('data', (data) => {
      callback(data);
      return (++this._subId).toString();
    });
  }
  
  onClick (tickTock) {
    this.publish(this._subId.toString(), {
      type: 'onClick',
      message: tickTock ? 'tick' : 'tock',
    });
  }
}

const bridge = new MyBridge();
bridge.onData((data) => (document.querySelector('.dappletMessage').innerText = data));
let tickTock = true;
const button = document.querySelector('.ch-state-btn');
button.addEventListener('click', () => {
  bridge.onClick(tickTock);
  tickTock = !tickTock;
});
```

There are two methods in **`Bridge`**:

1. **`this.subscribe(type, fn)`** - to get data;
2. **`this.publish(this._subId.toString(), { type, message })`** - to send data.

type = your class method's name.

### React.js based overlay

In `/overlayWithReact` we do the same.

In `/overlayWithReact/src/App.tsx`  we add variable to the state:

```tsx
tickTock: boolean;
```

add event on button click:

```tsx
handleClick = () => {
  bridge.onClick(this.state.tickTack, (tickTack) => this.setState({ tickTack }));
};
```

and add **`onClick`** attribute to the button:

```tsx
<button className="ch-state-btn" onClick={this.handleClick}>
  Counter +1
</button>
```

In `dappletBridge.ts` we add method **`onClick()`** that sends message to dapplet:

```ts
onClick(tickTack: boolean, callback: (data: any) => void) {
  callback(!tickTack);
  this.publish(this._subId.toString(), {
    type: 'onClick',
    message: tickTack ? 'tick' : 'tack',
  });
}
```

### Change the dapplet

1. Implement overlay opening on button click.

2. To get url use `Core.storage.get('url_name')`.

3. To get current overlay use `Core.overlay({ url: string, title: string })`.

4. Send some data to overlay and get callback **`onClick`**.

5. In callback increase current counter and add received message to `label`.

```ts 
exec: async (ctx, me) => {
  const overlayUrl = await Core.storage.get('overlayUrl');
  const overlay = Core.overlay({ url: overlayUrl, title: 'Overlay' });
  overlay.sendAndListen('data', 'Hello, World!', {
    onClick: (op, { message }) => {
      ctx.counter = ctx.counter === undefined ? 0 : ctx.counter + 1;
      me.label = `${message} ${ctx.counter}`;
    },
  });
},
```

The url `http://localhost:3000` add to config to `default.json`:

```json
{
  ...
  "dev": {
    "overlayUrl": "http://localhost:3000",
    "exampleString": "some string value",
    "exampleHiddenString": "some string value"
  }
}
```

and add appropriate field to `schema.json`:

```json
{
  "type": "object",
  "required": [
    "overlayUrl",
    "exampleString",
    "exampleHiddenString"
  ],
  "properties": {
    "overlayUrl": {
      "type": "string",
      "title": "Example of string property"
    },
    
    ...
  }
}
```

Before running install dependencies:

```bash
npm i
```

Run the dapplet with pure JS overlay:

```bash
npm run start-html
```

or with the React based overlay:

```bash
npm run start-react
```

### Publish React overlay to the decentralized storage (Swarm)

In overlay's `package.json` add `"homepage": "./"` and scripts `"archive"`, `"swarm:upload"` and `"deploy"`:

```json
"homepage": "./",
"scripts": {
"archive": "cd ./build && tar -cvf temp.tar .",
"swarm:upload": "curl -X POST -H \"Content-Type: application/x-tar\" -H \"Swarm-Index-Document: index.html\" -H \"Swarm-Error-Document: index.html\" --data-binary @build/temp.tar https://gateway.ethswarm.org/dirs",
"deploy": "npm run build && npm run archive && npm run swarm:upload"
}
```

From overlay's directory run deploy:

```bash
npm run deploy
```

Copy hash from console:

```bash
{"reference":"7cf\*\*\*dac17e"}
```

Add to url `https://gateway.ethswarm.org/bzz/` (expects something like
this: `https://gateway.ethswarm.org/bzz/7cf\*\*\*dac17e/`).

The url add to config to `default.json`:

```json
"overlayUrl": "https://gateway.ethswarm.org/bzz/7cf\*\*\*dac17e/",
```

Here is the result code of the
example: [ex04-overlays-solution.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-solution)

Run the dapplet:

```bash
npm i
npm run start-react
```

![video](/video/ex04-overlay.gif)
