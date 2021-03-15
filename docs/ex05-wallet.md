---
id: wallet
title: Wallet
---

This example shows how to connect a wallet to a dapplet.

The initial code for this example is here: [ex05-wallet-exercise.](https://github.com/dapplets/dapplet-template/tree/ex05-wallet-exercise)

In `src/index.ts`open the wallet on the button click. Use `await Core.wallet()`:

```ts
exec: async (ctx, me) => {
  me.state = 'PENDING';
  this.wallet = this.wallet || (await Core.wallet());
  this.wallet.sendAndListen('eth_accounts', [], {
    result: (op, { data }) => {
      this._currentAddress = data[0];
      me.state = 'CONNECTED';
    },
  });
},
```

Add states `CONNECTED`, `PENDING`, `REGECTED`, `COMPLETED` and `UNAVAILABLE`.

```ts
CONNECTED: {
  label: `Send ${BigInt(this._transferAmount) / BigInt(1000000000000000000)} ETH`,
  img: EXAMPLE_IMG,
  exec: async (ctx, me) => {
    // LP: 3. Send the necessary data to wallet and listen for the answer.
      // LP: 4. Show the state of the transaction
      // LP end
    // LP end
  },
},
PENDING: {
  label: 'Pending',
  img: ICON_LOADING,
},
REGECTED: {
  label: 'Rejected',
  img: EXAMPLE_IMG,
  exec: (ctx, me) => (me.state = 'CONNECTED'),
},
MINING: {
  label: 'Mining',
  img: ICON_LOADING,
},
COMPLETED: {
  label: 'Completed',
  img: EXAMPLE_IMG,
  exec: (ctx, me) => (me.state = 'CONNECTED'),
},
UNAVAILABLE: {
  label: 'Not available',
  img: EXAMPLE_IMG,
  exec: (ctx, me) => (me.state = 'CONNECTED'),
},
```

Send the necessary data to the wallet and listen for the answer.

> *In this example the sender and the recipient of the transaction are the same*

```ts
this.wallet.sendAndListen(
  'eth_sendTransaction',
  [
    {
      from: this._currentAddress,
      to: this._currentAddress,
      value: this._transferAmount,
    },
  ],
  {
    // LP: 4. Show the state of the transaction
    // LP end
  },
);
```

Show the state of the transaction: pending, completed, rejected or unavailable.
Method `sendAndListen` of `wallet` listens events: `pending`, `rejected`, `result` and `mined`.
Use them to change the button state.

```ts
pending: () => (me.state = 'PENDING'),
rejected: () => (me.state = 'REGECTED'),
result: () => (me.state = 'MINING'),
mined: (op, { hash }) => (me.state = hash === 0 || hash === 0x0 ? 'UNAVAILABLE' : 'COMPLETED'),
```

Result:

```ts
import {} from '@dapplets/dapplet-extension';
import EXAMPLE_IMG from './icons/icon19.png';
import ICON_LOADING from './icons/loading.svg';

@Injectable
export default class TwitterFeature {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private wallet: any;
  private _currentAddress: string | null = null;
  private _transferAmount = '0x1BC16D674EC80000'; // 2ETH
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
            label: 'Connect',
            img: EXAMPLE_IMG,
            exec: async (ctx, me) => {
              me.state = 'PENDING';
              this.wallet = this.wallet || (await Core.wallet());
              this.wallet.sendAndListen('eth_accounts', [], {
                result: (op, { data }) => {
                  this._currentAddress = data[0];
                  me.state = 'CONNECTED';
                },
              });
            },
          },
          CONNECTED: {
            label: `Send ${BigInt(this._transferAmount) / BigInt(1000000000000000000)} ETH`,
            img: EXAMPLE_IMG,
            exec: async (ctx, me) => {
              this.wallet.sendAndListen(
                'eth_sendTransaction',
                [
                  {
                    from: this._currentAddress,
                    to: this._currentAddress,
                    value: this._transferAmount,
                  },
                ],
                {
                  pending: () => (me.state = 'PENDING'),
                  rejected: () => (me.state = 'REGECTED'),
                  result: () => (me.state = 'MINING'),
                  mined: (op, { hash }) =>
                    (me.state = hash === 0 || hash === 0x0 ? 'UNAVAILABLE' : 'COMPLETED'),
                },
              );
            },
          },
          PENDING: {
            label: 'Pending',
            img: ICON_LOADING,
          },
          REGECTED: {
            label: 'Rejected',
            img: EXAMPLE_IMG,
            exec: (ctx, me) => (me.state = 'CONNECTED'),
          },
          MINING: {
            label: 'Mining',
            img: ICON_LOADING,
          },
          COMPLETED: {
            label: 'Completed',
            img: EXAMPLE_IMG,
            exec: (ctx, me) => (me.state = 'CONNECTED'),
          },
          UNAVAILABLE: {
            label: 'Not available',
            img: EXAMPLE_IMG,
            exec: (ctx, me) => (me.state = 'CONNECTED'),
          },
        }),
      ],
    });
  }
}
```

Here is the result code of the example: [ex05-wallet-solution.](https://github.com/dapplets/dapplet-template/tree/ex05-wallet-solution)

Run the dapplet:

```bash
npm i
npm start
```
