## Name to connect:

- `twitter-adapter.dapplet-base.eth`

## About the Twitter adapter

The Twitter adapter provides you with a high-level interface for Twitter **augmentation**. The adapter provides a set of **widgets** which can be inserted into specific types of **contexts**. In one dapplet, you can augment different contexts with widgets defined for them.

## Contexts

### ▪ POST

![Profile insertion points](/img/a_twitter_14.png)

### ▪ PROFILE

![Profile insertion points](/img/a_twitter_13.png)

### ▪ HEADING

![Profile insertion points](/img/a_twitter_15.png)

### ▪ SUSPENDED

![Profile insertion points](/img/a_twitter_16.png)

### ▪ QUOTE_POST

![Profile insertion points](/img/a_twitter_17.png)

#### Widget \ Context table

| Widgets         | POST | PROFILE | HEADING | SUSPENDED | QUOTE_POST |
| :-------------- | :--: | :-----: | :-----: | :-------: | :--------: |
| `avatar`        |  ✔️  |   ✔️    |         |    ✔️     |            |
| `avatarBadge`   |  ✔️  |   ✔️    |         |           |            |
| `usernameBadge` |  ✔️  |   ✔️    |   ✔️    |    ✔️     |            |
| `button`        |  ✔️  |   ✔️    |         |           |     ✔️     |
| `label`         |  ✔️  |         |         |           |            |
| `picture`       |  ✔️  |         |         |           |            |
| `caption`       |  ✔️  |         |         |           |            |
| `Starter`       |  ✔️  |         |         |           |            |

## Widgets

The way a widget will look is made up of three components:

1. choosing the **context** into which the widget is inserted
2. **parameters** which we set to the widget according to its **api**
3. styles written in the adapter for a specific widget in a specific context

The tables show the **api** of widgets.

### 1. Avatar

name: `avatar`

| Parameters    |                  Type                  | Description                   |
| :------------ | :------------------------------------: | :---------------------------- |
| **`img`** \*  |                `string`                | image as blob                 |
| **`label`**   |                `string`                | text label                    |
| **`tooltip`** |                `string`                | text tooltip                  |
| **`hidden`**  |               `boolean`                | hides the widget              |
| **`exec`**    | `(ctx: any, me: IAvatarState) => void` | action on click               |
| **`init`**    | `(tx: any, me: IAvatarState) => void`  | action through initialisation |

### 2. Avatar Badge

name: `avatarBadge`

| Parameters       |                    Type                     | Description                   |
| :--------------- | :-----------------------------------------: | :---------------------------- |
| **`img`** \*     |                  `string`                   | image as blob                 |
| **`vertical`**   |            `'top'` or `'bottom'`            | sets a vertical position      |
| **`horizontal`** |            `'left'` or `'right'`            | sets a horizontal position    |
| **`tooltip`**    |                  `string`                   | text tooltip                  |
| **`hidden`**     |                  `boolean`                  | hides the widget              |
| **`exec`**       | `(ctx: any, me: IAvatarBadgeState) => void` | action on click               |
| **`init`**       | `(tx: any, me: IAvatarBadgeState) => void`  | action through initialisation |

### 3. Username Badge

name: `usernameBadge`

| Parameters    |                     Type                      | Description                   |
| :------------ | :-------------------------------------------: | :---------------------------- |
| **`img`** \*  |                   `string`                    | image as blob                 |
| **`tooltip`** |                   `string`                    | text tooltip                  |
| **`hidden`**  |                   `boolean`                   | hides the widget              |
| **`exec`**    | `(ctx: any, me: IUsernameBadgeState) => void` | action on click               |
| **`init`**    | `(tx: any, me: IUsernameBadgeState) => void`  | action through initialisation |

### 4. Button

name: `button`

| Parameters     |                  Type                  | Description                            |
| :------------- | :------------------------------------: | :------------------------------------- |
| **`img`**      |                `string`                | image as blob                          |
| **`label`**    |                `string`                | text label                             |
| **`loading`**  |               `boolean`                | sets the loading icon instead of image |
| **`tooltip`**  |                `string`                | text tooltip                           |
| **`disabled`** |               `boolean`                | makes the widget disabled              |
| **`hidden`**   |               `boolean`                | hides the widget                       |
| **`exec`**     | `(ctx: any, me: IButtonState) => void` | action on click                        |
| **`init`**     | `(tx: any, me: IButtonState) => void`  | action through initialisation          |

### 5. Label

name: `label`

| Parameters     |                 Type                  | Default | Description                                                                   |
| :------------- | :-----------------------------------: | :-----: | :---------------------------------------------------------------------------- |
| **`img`**      |               `string`                |         | image as blob                                                                 |
| **`text`**     |               `string`                |         | text label                                                                    |
| **`tooltip`**  |               `string`                |         | text tooltip                                                                  |
| **`postfix`**  |               `string`                |         | adds a postfix to **text**                                                    |
| **`basic`**    |               `boolean`               |  false  | By default there is a blue background. In case of true there is no background |
| **`disabled`** |               `boolean`               |         | makes the widget disabled                                                     |
| **`hidden`**   |               `boolean`               |         | hides the widget                                                              |
| **`exec`**     | `(ctx: any, me: ILabelState) => void` |         | action on click                                                               |
| **`init`**     | `(tx: any, me: ILabelState) => void`  |         | action through initialisation                                                 |

### 6. Picture

name: `picture`

| Parameters     |                 Type                  | Description                   |
| :------------- | :-----------------------------------: | :---------------------------- |
| **`img`** \*   |               `string`                | image as blob                 |
| **`tooltip`**  |               `string`                | text tooltip                  |
| **`disabled`** |               `boolean`               | makes the widget disabled     |
| **`hidden`**   |               `boolean`               | hides the widget              |
| **`exec`**     | `(ctx: any, me: IBadgeState) => void` | action on click               |
| **`init`**     | `(tx: any, me: IBadgeState) => void`  | action through initialisation |

### 7. Caption

name: `caption`

| Parameters     |                 Type                  | Description                   |
| :------------- | :-----------------------------------: | :---------------------------- |
| **`img`**      |               `string`                | image as blob                 |
| **`text`**     |               `string`                | text label                    |
| **`tooltip`**  |               `string`                | text tooltip                  |
| **`disabled`** |               `boolean`               | makes the widget disabled     |
| **`hidden`**   |               `boolean`               | hides the widget              |
| **`exec`**     | `(ctx: any, me: IBadgeState) => void` | action on click               |
| **`init`**     | `(tx: any, me: IBadgeState) => void`  | action through initialisation |

### 8. Starter

| Parameters  |                     Type                      | Description     |
| :---------- | :-------------------------------------------: | :-------------- |
| **`label`** |                   `string`                    | text label      |
| **`exec`**  | `(ctx: any, me: IButtonStarterState) => void` | action on click |

**Starter** has a different structure:

```ts
[
  {
    label: 'Add tweet to the Ethereum registry',
    exec: () => console.log('test'),
  }
],
```

Instead of a function we add an array of objects, which consists of the `label` and `exec` parameters, to the context.
A button click in the context opens a **Starter overlay** with the buttons defined in the array.

A Starter overlay combines buttons from **all turned on dapples** which use a starter.

\* - mandatory parameters

## Events

**PROFILE**

- [profile_changed](/docs/adapters-twitter#profile_changed)

**POST**

- [like](/docs/adapters-twitter#like)

- [dislike](/docs/adapters-twitter#dislike)

### ▪ PROFILE:

- #### profile_changed

Subscription to an account change.

Takes a function:

```ts
profile_changed: async (after, before) => { ... }
```

`before` contains data of the previous account, `after` contains data of the current account.
They are of the same type:

```ts
{
  authorFullname: string
  authorUsername: string
  authorImg: string
}
```

### ▪ POST:

- #### like

Subscription to liking the tweet.

Takes a function:

```ts
like: async (ctx) => { ... }
```

- #### dislike

Subscription to unliking the tweet.

Takes a function:

```ts
dislike: async (ctx) => { ... }
```

## Virtual adapters:

- `identity-adapter.dapplet-base.eth`: ver. 0.3.0
