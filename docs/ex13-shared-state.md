---
id: shared-state
title: "Ex13: Shared State"
---

In this exercise we create a dapplet with an overlay with shared state.

The overlay will be React App with Typescript (TSX).

In our dapplet we will add `button` with a counter and `input` to every tweet and to the overlay. The values of all the counters and inputs will be kept in a single shared state.

Here is the initial code for this example, which is similar to the base template: [`ex13-shared-state-exercise`](https://github.com/dapplets/dapplet-template/tree/ex13-shared-state-exercise)

### Dapplet

1.  Implement a type or an interface of the state with a counter and a text.

  ```typescript
  interface IState {
    counter: number
    text: string
  }
  ```

2.  Use the **`Core.state<T>`** method to create a shared state. Make it at the beginning of the `activate` method. It has to be typed with our interface and receive the default state as a single parameter.

  ```typescript
  const state = Core.state<IState>({ counter: 0, text: '' });
  ```

3.  Then create an `IState` interface type overlay.

  To share the state with the overlay add the **`useState`** method that returns the overlay itself.

  ```typescript
  const overlay = Core.overlay<IState>({ name: 'example-13-overlay', title: 'Example 13' })
    .useState(state);
  ```

:::tip

In a dapplet you can create **several states and overlays**. So you can use one state with one or many overlays or use different states with different overlays. But **note** that one overlay can use only one shared state.

:::

4.  Let's add the **`Core.onAction`** method. It inserts a **home** button near the dapplets name in the extension's dapplets' list. It receives a callback.

  We add a callback to the overlay opening event.

  ```typescript
  Core.onAction(() => overlay.open());
  ```

5.  Let's pass the state's **counter** and **text**  to the button's `label` and input's `text` respectively.

  We have two widgets in `POST`: `button` and `input`.

  ```typescript
  const { button, input } = this.adapter.exports;
  this.adapter.attachConfig({
    POST: (ctx: any) => ([
      button({
        DEFAULT: {
          img: EXAMPLE_IMG,
          // ...
        },
      }),
      input({
        DEFAULT: {
          // ...
        },
      })
    ])
  });
  ```

  We want to create different states for every tweet. So the keys will be the tweets' IDs.

  ```typescript
  {
    // ...
    label: state[ctx.id].counter,
  }
  // ...
  {
    text: state[ctx.id].text
  }
  ```

  You don't need to create the current context state in advance. It will be created from the default state when the key is not found in the storage.

:::tip

**Shared state** works like a key-value storage. Values are observable RxJS-based proxies.

The value of the counter is an observable object. To get the scalar value you have to use **value** property:

```typescript
const value = state[someId].someParameter.value;
```

To set the new value you have to use the **next** method:

```typescript
state[someId].someParameter.next(newValue);
```

:::

6.  Increase the counter by clicking the button and open the overlay.

  ```typescript
  {
    // ...
    exec: () => {
      const oldValue = state[ctx.id].counter.value;
      state[ctx.id].counter.next(oldValue + 1);
      overlay.open(ctx.id);
    },
  }
  ```

  Here we pass an optional parameter - **id** to the `overlay.open` method. Then we can get it in the overlay and use for getting and setting an appropriate part of the state.

The entire `activate` method:

```typescript
activate() {
  const state = Core.state<IState>({ counter: 0, text: '' });
  const overlay = Core.overlay<IState>({ name: 'example-13-overlay', title: 'Example 13' })
    .useState(state);
  Core.onAction(() => overlay.open());

  const { button, input } = this.adapter.exports;
  this.adapter.attachConfig({
    POST: (ctx: any) => ([
      button({
        DEFAULT: {
          img: EXAMPLE_IMG,
          label: state[ctx.id].counter,
          exec: () => {
            state[ctx.id].counter.next(state[ctx.id].counter.value + 1);
            overlay.open(ctx.id);
          },
        },
      }),
      input({
        DEFAULT: {
          text: state[ctx.id].text
        }
      })
    ])
  });
}
```

### Overlay

In this example we don't talk about native JavaScript overlay because the interaction with the shared state goes through the **React's HOC** (Higher-Order Component). To know more about this technique check out [the official documentation page](https://reactjs.org/docs/higher-order-components.html).

7.  Add **Share State HOC** into the `./overlay/src/index.tsx`

  Import **`dappletState`** from **@dapplets/dapplet-overlay-bridge**. This function is typed with IState interface, receives `App` and returns a new React component.

  ```typescript
  // ...
  import App, { IState } from './App';
  import { dappletState } from '@dapplets/dapplet-overlay-bridge';

  const DappletState = dappletState<IState>(App);

  ReactDOM.render(
    <React.StrictMode><DappletState/></React.StrictMode>,
    document.getElementById('root'),
  );
  ```

8.  In **App** we paste the copied **IState** interface from the dapplet and export it. Then we type the module's props with **IDappStateProps** typed with **IState**.

  ```typescript
  // ...
  import { IDappStateProps } from '@dapplets/dapplet-overlay-bridge';

  export interface IState {
    counter: any
    text: string
  }

  export default class App extends React.Component<IDappStateProps<IState>> {
    // ...
  }
  ```

9.  In `render` method get props: **sharedState, changeSharedState, id**

  ```typescript
  const { sharedState, changeSharedState, id } = this.props;
  ```

  *  **sharedState** is an object that's matched to the dapplets **state** but its values are scalar. So you don't need to get `.value` of them and you cannot change them directly.
  *  **changeSharedState** is a function that changes the state's parametes. It receives two arguments: an object with parameters that you want to change and an ID of the changing state. The second argument is optional.
  *  **id** is an ID, that passed through the `overlay.open` function.

:::tip

There is one key-value state that's created by default. It is **state.global**. Use it for the state's parameters that are common for entire app or for all IDs in the current state.

When you want to change its parameters in the overlay, you don't need to pass the second argument to the **changeSharedState** function.

:::

10.  When we have an ID we need to show the counter, an input with the text and a button that increments the counter.
When there is no ID (click the **home** button) we need to show all the states: keys with the counters' and texts' values.

  ```typescript
  return (
    <>
      <h1>Shared State</h1>
      {id ? (
        <>
          <p>Counter: {sharedState[id]?.counter ?? 0}</p>
          <input value={sharedState[id].text} onChange={(e) => changeSharedState?.({ text: e.target.value }, id)} />
          <p></p>
          <button className="ch-state-btn" onClick={() => changeSharedState?.({ counter: sharedState[id].counter + 1 }, id)}>Counter +1</button>
        </>
      ) : Object.entries(sharedState)
        .map(([id, value]: [string, any]) => <p key={id}><b>{id}:</b> {value?.counter} / {value?.text} </p>)}
    </>
  );
  ```

Here is the result code of the example: [`ex13-shared-state-solution`](https://github.com/dapplets/dapplet-template/tree/ex13-shared-state-solution)

Run the dapplet:

```bash
npm i
npm start
```
