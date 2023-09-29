---
id: overlays
title: 'Ex04: Overlays'
---

In this example we will add an overlay to a `POST`. This overlay will be opened with a button click.

Here are two examples of an overlay:

- [Pure HTML page](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/pure-html-page)
- [React.js based example](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/react-overlay)

First we implement an overlay written on HTML with pure JavaScript. Second - the React based component.

Here is the initial code for this example, including both of the above overlays: [ex04-overlays-exercise.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-exercise)

Now let's create overlays.

:::tip

We recommend using an overlay written on the React based component. When implement an overlay written on HTML with pure JavaScript, some functions are not available.

Such as:

- [Share State HOC](/dapplet-docs/docs/ex13-shared-state.md),

... and some others

:::

### HTML with JavaScript overlay

1. In `pure-html-page/index.html` import Bridge class from `https://unpkg.com/@dapplets/dapplet-overlay-bridge` package.

```js
import Bridge from 'https://unpkg.com/@dapplets/dapplet-overlay-bridge'
```

2. Create Bridge class instance and subscribe it to the `data` event.

```js
const bridge = new Bridge()

bridge.on('data', ({ message, counter }) => {
  document.querySelector('.dappletMessage').innerText = message
  document.querySelector('.dappletCounter').innerText = counter ?? 0
})
```

3. Add an event handler to the button click.

```js
let isTick = true
const button = document.querySelector('.ch-state-btn')
button.addEventListener('click', async () => {
  const counter = await bridge.increaseCounterAndToggleLabel(isTick)
  document.querySelector('.dappletCounter').innerText = counter
  isTick = !isTick
})
```

### React.js based overlay

First install [Dapplet-Overlay Bridge:](https://github.com/dapplets/dapplet-overlay-bridge) in `/overlayWithReact` module.

```bash
cd overlayWithReact
npm i @dapplets/dapplet-overlay-bridge
cd ..
```

1. In `/overlayWithReact/src/App.tsx` import Bridge class from @dapplets/dapplet-overlay-bridge package.

```tsx

```

2. Create `IDappletApi` interface and Bridge class instance typing with the inteface.

```tsx
interface IDappletApi {
  increaseCounterAndToggleLabel: (isTick: boolean) => Promise<number>
}

const bridge = new Bridge<IDappletApi>()
```

3. Add a listener to the 'data' event.

```tsx
componentDidMount() {
  bridge.on('data', ({ message, counter }: { message: string, counter: number }) => this.setState({ message, counter }));
}
```

4. Add an event handler to the button click.

```tsx
handleClick = async () => {
  const counter = await bridge.increaseCounterAndToggleLabel(this.state.isTick)
  this.setState({ isTick: !this.state.isTick, counter })
}
```

### Change the dapplet

1. Implement the IDappletApi interface, the same as in the React-based overlay.

```ts
interface IDappletApi {
  increaseCounterAndToggleLabel: (isTick: boolean) => Promise<number>
}
```

2. Implement the overlay opening on the button click.

```ts

   async activate(): Promise<void>  {
    ...
    this.adapter.attachConfig({
      ...
    })

    Core.onAction(() => this.overlay.open())
  }

```

3. Create an object that implements the interface. Write increaseCounterAndToggleLabel function. Declare the API in the overlay.

```ts
const dappletApi: IDappletApi = {
  increaseCounterAndToggleLabel: (isTick: boolean) => {
    ctx.counter = ctx.counter ? ++ctx.counter : 1

    me.label = `${ctx.counter}`

    return ctx.counter
  },
}
overlay.declare(dappletApi)
```

4. Send 'Hello, World!' message and ctx.counter to the overlay using 'data' event.

```ts
overlay.send('data', { message: 'Hello, World!', counter: ctx.counter })
```

5. Add to the `dapplet.json` manifest the following option:

```json
{
  ...
  "overlays": {
    "example-04-overlay": "http://localhost:3000"
  }
}
```

Dependencies must be installed before running:

```bash
npm i
```

To run the dapplet with React overlay, change `start` script to the following:

```json
"start": "concurrently -c \"yellow,blue\" -n \"dapplet,overlay\" \"rollup -w --config rollup.config.js\" \"cd overlayWithReact && npm start\"",
```

Run the dapplet

```bash
npm start
```

:::tip

To publish a dapplet with an overlay, you need `assets-manifest.json`. When overlay is written in React, webpack or another module bundler builds it on its own.

:::

Here is the result code of the example: [ex04-overlays-solution.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-solution)

![video](/video/ex_4.gif)
