## Name to connect:

- `github-config.dapplet-base.eth`

## About the GitHub config

The GitHub config provides you with a high-level interface for GitHub **augmentation**. The adapter provides styles for **widgets** which can be inserted into specific types of **contexts**. In one dapplet, you can augment different contexts with these widgets.

## Contexts

### ▪ POST

Insertion points:

![Profile insertion points](/img/adapter-g-02.png)

Context parse result:

|       |       |       |       |
| :---: | :---: | :---: | :---: |
| id | authorUsername | authorImg | url |

### ▪ PROFILE

Insertion points:

![Profile insertion points](/img/adapter-g-01.png)

Context parse result:

|       |       |       |       |       |
| :---: | :---: | :---: | :---: | :---: |
| id | authorFullname | authorUsername | authorImg | url |

### ▪ GLOBAL

Context parse result:

|       |       |       |       |       |       |
| :---: | :---: | :---: | :---: | :---: | :---: |
| id | websiteName | username | fullname | img | url |

#### Widget \ Context table

| Widgets         | POST | PROFILE |
| :-------------- | :--: | :-----: |
| `avatarBadge`   |  ✔️   |    ✔️    |
| `button`        |  ✔️   |    ✔️    |

## Widgets

The way a widget will look is made up of three components:

1. choosing the **context** into which the widget is inserted
2. **parameters** which we set to the widget according to its **api**
3. styles written in the adapter for a specific widget in a specific context

The tables show the **api** of widgets.

### 1. Avatar Badge

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

### 2. Button

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

\* - mandatory parameters


## Virtual adapters:

- `social-virtual-config.dapplet-base.eth`: ver. 0.1.0
