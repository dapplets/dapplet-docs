## Name to connect:

- `common-config.dapplet-base.eth`

## About the Common config

The Common config provides you with a high-level interface for universal **augmentation**. The adapter provides styles for **widgets** which can be inserted into nonspecific places on many websites.

## Contexts

### ▪ BODY

Insertion points:

![Profile insertion points](/img/a_twitter_14.png)

Context parse result:

|       |
| :---: |
| id |

### ▪ GLOBAL

Context parse result:

|       |       |
| :---: | :---: |
| id | websiteName |

#### Widget \ Context table

| Widgets         | BODY |
| :-------------- | :--: |
| `button`        |  ✔️   |

## Widgets

The way a widget will look is made up of three components:

1. choosing the **context** into which the widget is inserted
2. **parameters** which we set to the widget according to its **api**
3. styles written in the adapter for a specific widget in a specific context

The tables show the **api** of widgets.

### Button

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
