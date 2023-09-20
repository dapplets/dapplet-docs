---
id: overlays
title: 'Ex04: Overlays'
---

In this example we will add an overlay to a `POST`. This overlay will be opened with a button click.

Here are example of an overlay, the React based component:

- [React.js based example](https://github.com/dapplets/dapplet-overlay-bridge/tree/master/examples/react-overlay)

Here is the initial code for this example: [ex04-overlays-exercise.](https://github.com/dapplets/dapplet-template/tree/ex04-overlays-exercise)

Now let's create overlays.

### React.js based overlay

First install [Dapplet-Overlay Bridge:](https://github.com/dapplets/dapplet-overlay-bridge) in `/overlayWithReact` module.

```bash
cd overlayWithReact
npm i @dapplets/dapplet-overlay-bridge
cd ..
```

1. In `/overlayWithReact/src/App.tsx` import GeneralBridge class from @dapplets/dapplet-overlay-bridge package.

```tsx

```

2. Create `IDappletApi` interface and GeneralBridge class instance typing with the inteface.

```tsx
interface IDappletApi {
  increaseCounterAndToggleLabel: (isTick: boolean) => Promise<number>
}

const bridge = new GeneralBridge<IDappletApi>()
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

  activate() {
    ...
    this.adapter.attachConfig({
      ...
    })

    Core.onAction(async () => {
      this.overlay.open()
    })
  }

```

3. Create an object that implements the interface. Write increaseCounterAndToggleLabel function. Declare the API in the overlay.

```ts
const dappletApi: IDappletApi = {
  increaseCounterAndToggleLabel: (isTick: boolean) => {
    ctx.counter = ctx.counter === undefined ? 1 : ctx.counter + 1
    me.label = `${isTick ? 'tick' : 'tock'} ${ctx.counter}`
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

To run the dapplet with ReactJS overlay, change `start` script to the following:

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
