---
id: new-viewport-adapter
title: "Ex09: New Viewport adapter"
---

In this example we create a new viewport adapter and a dapplet for it.

The initial code for this example is here: [ex09-new-viewport-adapter-exercise.](https://github.com/dapplets/dapplet-template/tree/ex09-new-viewport-adapter-exercise)

Our template has an adapter that is similar in structure to the adapter in the previous exercise.

```bash
adapter
├── .gitignore
├── dapplet.json
├── package-lock.json
├── package.json
├── rollup.config.js
├── src
|  ├── button.ts
|  ├── close_cross.svg
|  ├── globals.d.ts
|  ├── index.ts
|  └── popup.ts
└── tsconfig.json
```

When you create an adapter don't forget to set **`contextIds`** in `dapplet.json`. In this example we are setting the following contexts:

```json
{
  ...
  "contextIds": [
    "dapplets.org",
    "127.0.0.1",
    "forum.dapplets.org",
    "youtube.com",
    "www.youtube.com",
    "twitter.com",
    "mobile.twitter.com",
    "google.com",
    "www.google.com",
    "www.instagram.com",
    "instagram.com"
  ],
  ...
}
```

1. Implement communication between dapplets and pages in `/adapter/src/index.ts`:

```ts
public config = [
  {
    containerSelector: 'html',
    contextSelector: 'body > *:nth-last-child(2)',
    insPoints: {
      BODY: {},
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    contextBuilder: (): ContextBuilder => ({
      id: document.location.href,
    }),
  },
];
```

2. Implement the **button** HTML with **`image`** and **`tooltip`** in `/adapter/src/button.ts`:

```ts
// class Button

public mount(): void {
  if (!this.el) this._createElement();
  const { img, tooltip } = this.state;
  const htmlString = `
    <div style="
      position:fixed;
      width:60px;
      height:60px;
      bottom:40px;
      left:40px;
      background-color:#fff;
      color:#FFF;
      border-radius:50px;
      border: 3px solid #d10019;
      text-align:center;
      box-shadow: 2px 2px 3px #999;
      cursor: pointer;
      display: block;
      box-sizing: content-box;
      z-index: 9999;
    ">
      <img style="margin-top:11px;" height="32" src="${img}">
    </div>
  `;
  this.el.title = tooltip ?? '';
  this.el.innerHTML = htmlString;
}
```

3. Implement the **popup** HTML with **`text`**, **`link`**, **`img`** and **`closed`**:

```ts
// class Popup

public mount(): void {
  if (!this.el) this._createElement();
  const { text, link, img, closed } = this.state;
  const htmlString = `
    <style>
      .dapplet-widget-basic-container {
        position: absolute;
        overflow-wrap: break-word;
        width: 380px;
        min-height: 60px;
        top: 80px;
        left: 50%;
        margin-left: -212px;
        padding: 20px;
        background-color: #fff;
        color: #d10019;
        border: 2px solid #d10019;
        border-radius: 15px;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
        box-sizing: content-box;
        font-size: 19px;
        font-weight: 600;
        font-family: system-ui, -apple-system, sans-serif, BlinkMacSystemFont, Roboto, Ubuntu;
        z-index: 9998;
      }
      .dapplet-widget-close {
        position: initial;
      }
      .dapplet-widget-close-icon {
        width: 18px;
        height: 18px;
        position: absolute;
        right: 12px;
        top: 12px;
        cursor: pointer;
      }
      .dapplet-widget-mascot-img {
        position: initial;
      }
      .dapplet-widget-mascot-img img {
        width: 18px;
        height: 18px;
        position: absolute;
        left: 12px;
        top: 12px;
        cursor: pointer;
      }
      .dapplet-widget-basic-container a {
        text-decoration: none;
        color: #d10019;
      }
      .dapplet-widget-basic-container a:active {
        text-decoration: none;
        color: #d10019;
      }
      .dapplet-widget-basic-container a:visited {
        text-decoration: none;
        color: #d10019;
      }
      .displayed {
        display: block;
      }
      .no-displayed {
        display: none;
      }
    </style>
    <div class="dapplet-widget-basic-container ${closed ? 'no-displayed' : 'displayed'} ">  
      <div class="dapplet-widget-close">
        <img src="${CLOSE_ICON}" class="dapplet-widget-close-icon" alt="close icon">
      </div>
      <div class="dapplet-widget-mascot-img">
        <img src="${img}">
      </div>
      <div>
        <a href="${link}" target="_blank">${text}</a>
      </div>
    </div>
  `;
  this.el.innerHTML = htmlString;
}
```

4. Change `dependencies` and `contextIds` in `/dapplet-feature/dapplet.json` to new adapter:

```json
{
  ...
  "contextIds": ["exercise-viewport-adapter.dapplet-base.eth"],
  ...
  "dependencies": {
    "exercise-viewport-adapter.dapplet-base.eth": "0.1.0"
  }
}
```

5. Add a valid adapter in `/dapplet-feature/src/index.ts`:

```ts
@Inject('exercise-viewport-adapter.dapplet-base.eth') public adapter: any,
```

6. Add popup with **`text`**, **`image`** and some **`link`** from the page to **`BODY`**:

```ts
popup({
  id: 'popup',
  initial: 'DEFAULT',
  DEFAULT: {
    text: 'The link opens this page in a new tab',
    img: EXAMPLE_IMG,
    init: (ctx, me) => (me.link = ctx.id),
  },
}),
```

7. On button click show the popup:

```ts
button({
  ...
  DEFAULT: {
    ...
    exec: (ctx) => ($(ctx, 'popup').closed = false),
  },
}),
```

Here is the result: [ex09-new-viewport-adapter-solution.](https://github.com/dapplets/dapplet-template/tree/ex09-new-viewport-adapter-solution)

Run the dapplet:

```bash
npm i
npm start
```
> In this example we run **two servers** concurrently. So you have to add two registry addresses to Dapplet extension in Development tab. How to do it see [here](/docs/getting-started#11-connect-the-development-server-to-dapplet-extension).
