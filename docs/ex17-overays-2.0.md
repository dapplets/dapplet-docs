---
id: overlays-2.0
title: "Ex17: Overlays 2.0"
---

This example shows how to work with the overlay through the new Core Login API.

For example, let's connect and disconnect an Ethereum network account. Implement connecting and disconnecting an account through an overlay

Here is the initial code for this example: [`ex17-overlay-v2.0-exercise`](https://github.com/dapplets/dapplet-template/tree/ex17-overlay-v2.0-exercise).

### Dapplet

More details about **useState** and **onAction** methods can be found in the  [Ex13.](/docs/shared-state)


### LP: 1. Add method 'useState' to the overlay

Add method to overlay initialization. The state will transfer the account address from the dapplet to the overlay.

```typescript
 private overlay = Core.overlay<IBridge>({ name: 'overlay', title: 'Ex17' })
 .useState(this.state)
```

### LP: 2. Declare the API in the overlay

The `dapplet/src/api.ts` contains the functions that will be available in the overlay. 

```typescript
 .declare(this.api);;
```

### LP: 3. Let's add the 'Core.onAction' method.

More details about **declare**  method can be found in the  [Ex4.](/docs/overlays)

Add this method to the activation function.

```typescript
 Core.onAction(() => this.overlay.open());
```

### LP: 4. Use the API's function for initialization account.

```typescript
await this.api.initializeCurrentAccount();
```

### Overlay

To implement the overlay part, we use React functional components.

### LP: 5. Add interface for Bridge, with functions

Dapplet and overlay are connected using **Bridge** and **IDappStateProps** which are imported from  `@dapplets/dapplet-overlay-bridge`. 

```typescript
interface IBridge {
  login: () => Promise<void>;
  logout: () => Promise<void>;
 
}
```

### LP: 6. Add functions for connect/disconnect by account

Adding functions to the `App.tsx` .

```typescript
const handleLogIn = async (e: any) => {
    e.preventDefault();
    const res = await bridge.login();

  };

const handleLogOut = async (e: any) => {
    e.preventDefault();
    const res = await bridge.logout();

  };
```

### LP: 7.1 Add function Login and LogOut

Use the **sharedState** to render the component and display the account address.

```typescript
  return (
    sharedState && (
      <div className='wrapper' >
        ...
         {sharedState.global?.userAccount==="" ? (
          <button
            className="login"
            onClick={handleLogIn}
          >
            Log in to my account
          </button>
        ) : (
          <>
            ...
            <button
              className="logout"
              onClick={handleLogOut}
            >
              Log out
            </button>
          </>
        )}
      </div>
    )
  );
```


Here is the result code of the example: [`ex17-overlay-v2.0-solution`](https://github.com/dapplets/dapplet-template/tree/ex17-overlay-v2.0-solution).

:::caution

overlay uses `https://localhost:3000/webpack-dev-server/`

:::

Run the dapplet:

```bash
npm i
npm start
```
![video](/video/ex_17.gif)

