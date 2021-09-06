---
id: new-site-adapter
title: "Ex08: New Site specific adapter"
---

In this example we implement an adapter for Google and a dapplet for it.

The initial code for this example is here: [ex08-new-adapter-exercise.](https://github.com/dapplets/dapplet-template/tree/ex08-new-adapter-exercise)

The adapter and the dapplet are divided into two directories: `/adapter` and `/dapplet-feature`.

### Create an adapter with one element `button` and two insertion points for it 

At the beginning we change the adapter template. Let's add buttons
under the title of each element of the standard search results and one button in the top navigation bar.

In `adapter/src/index.ts` implement **`config`**. It is an array of objects which describe different **contexts**
on the page, associated **insertion points** and **`contextBuilder()`**s, that define what information
gets the dapplet as a first argument in **`exec()`** and **`init()`** (named **`ctx`** in our examples).

```ts
public config = [
  {
    containerSelector: '#cnt, .ndYZfc',
    contextSelector: '#top_nav, .jZWadf',
    insPoints: {
      MENU: {
        selector: '.MUFPAc, .T47uwc',
        insert: 'inside',
      },
    },
    contextBuilder: (): ContextBuilder => ({
      id: '',
      insertPoint: '#rcnt, .mJxzWe',
    }),
  },
  {
    containerSelector: '#search',
    contextSelector: '.hlcw0c .tF2Cxc',
    insPoints: {
      SEARCH_RESULT: {
        selector: '.yuRUbf',
        insert: 'inside',
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contextBuilder: (searchNode: any): ContextBuilder => ({
      id: searchNode.querySelector('.yuRUbf > a').href,
      title: searchNode.querySelector('h3 > span').textContent,
      link: searchNode.querySelector('.yuRUbf > a').href,
      description: searchNode.querySelector('.IsZvec').textContent,
    }),
  },
];
```

Now we have two insertion points: **MENU** and **SEARCH_RESULT**. You can insert a dapplet element inside, before or after the page element selected in the `selector` by setting **`insert`**: **`inside`**, **`begin`** or **`end`**.

If there are many contexts of one type on the page, like tweets of search results, you have to find **unique `id`** for everyone.
It's needed for saving the states of dapplets' elements connected to these contexts.

The next step is creating an element. We have a template of the button in `adapter/src/button.ts`.
Let's implement at the public method **`mount()`** of the class `Button` the button HTML with **`label`**, **`image`** and **`tooltip`** for our insertion points `MENU` and `SEARCH_RESULT`.

```ts
const activeNavEl: HTMLElement = document.querySelector('.hdtb-msel, .rQEFy');
if (this.insPointName === 'MENU') {
  this.el.innerHTML = `
    <div style="margin: 1px 1px 0; padding: 16px 12px 12px 10px;
      ${isActive ? 'border-bottom: 3px solid #1a73e8; ' : 'border-bottom: none; '}
      display: inline; cursor: pointer;"
      ${tooltip ? `title="${tooltip}"` : ''}
    >
      <img style="margin-right: 5px; margin-bottom: -3px;" src="${img}"/>
      <div style="display: inline-block; font-size: 13px; line-hight: 16px; -webkit-tap-highlight-color: rgba(0,0,0,.10); color: #5f6368;">${label}</div>
    </div>
  `;
  activeNavEl.style.borderBottom = isActive ? 'none' : '3px solid #1a73e8';
} else if (this.insPointName === 'SEARCH_RESULT') {
  this.el.innerHTML = `
    <div 
      style="display: flex; align-items: center; cursor: pointer;"
      ${tooltip ? `title="${tooltip}"` : ''}
    >
      <img style="margin-right: 1em; margin-bottom: 3px;" src="${img}"/>
      <div style="display: inline-block; font-size: 1.1em; color: #F5504A; font-weight: bold;">${label}</div>
    </div>
  `;
}
```

Add styles for the element depending on the insertion point.

```ts
let stylesAdded = false;

const addStyles = (): void => {
  const styleTag: HTMLStyleElement = document.createElement('style');
  styleTag.innerHTML = `
    .dapplet-widget-menu {
      display: inline-block;
    }
    .dapplet-widget-results {
      display: block;
    }
  `;
  document.head.appendChild(styleTag);
};

...

export class Button {
  ...
  public mount(): void {
    if (!this.el) this._createElement();
    if (!stylesAdded) {
      addStyles();
      stylesAdded = true;
    }
    ...
  }
  ...
  private _createElement() {
    this.el = document.createElement('div');
    if (this.insPointName === 'MENU') {
      this.el.classList.add('dapplet-widget-menu');
    } else if (this.insPointName === 'SEARCH_RESULT') {
      this.el.classList.add('dapplet-widget-results');
    }
    ...
  }
}
```

Then change the dapplet. Add buttons to search results and top navigation bar in `/dapplet-feature/src/index.ts`.

Implement an alert that should be triggered when you click the search results button.
The alert should contain the **title** of the element, the **link** to the source and
a short description of the found fragment from the element.

```ts
exec: (ctx) => {
  const { title, link, description } = ctx;
  alert(`  title: ${title}\n  link: ${link}\n  description: ${description}`);
},
```

Implement two states for top navigation bar button with actions: replace search results with `HI_GIF` and return to default results.

```ts
button({
  initial: 'RESULTS',
  RESULTS: {
    label: 'Hi',
    img: GRAY_IMG,
    tooltip: 'Hi, friend!',
    isActive: false,
    exec: (ctx, me) => {
      const el = document.querySelector(ctx.insertPoint);
      el.style.display = 'none';
      if (!('replacedEl' in ctx)) {
        ctx.replacedEl = document.createElement('div');
        ctx.replacedEl.style.justifyContent = 'center';
        const elImg = document.createElement('img');
        elImg.src = `${HI_GIF}`;
        ctx.replacedEl.appendChild(elImg);
        el.parentElement.appendChild(ctx.replacedEl);
      }
      ctx.replacedEl.style.display = 'flex';
      me.state = 'FRIENDS';
    },
  },
  FRIENDS: {
    label: 'Hi',
    img: GOOGLE_IMG,
    tooltip: 'Go to results',
    isActive: true,
    exec: (ctx, me) => {
      const el = document.querySelector(ctx.insertPoint);
      el.style.display = 'block';
      ctx.replacedEl.style.display = 'none';
      me.state = 'RESULTS';
    },
  },
}),
```

Here is the result of this part: [ex08.1-new-adapter-solution.](https://github.com/dapplets/dapplet-template/tree/ex08.1-new-adapter-solution)

Run the dapplet:

```bash
npm i
npm start
```
> In this example we run **two servers** concurrently. So you have to add two registry addresses to Dapplet extension in Development tab. How to do it see [here](/docs/get-started#11-connect-the-development-server-to-dapplet-extension).

### Add an element `result` to the adapter with one insertion point

Add a new insertion point **`WIDGETS`** on the top of Google widgets like Videos, Images of ..., People also ask etc.

Conplete **config** in `/adapter/src/index.ts`:

```ts
{
  containerSelector: '#search',
  contextSelector: '#rso',
  insPoints: {
    WIDGETS: {
      selector: '.ULSxyf',
      insert: 'begin',
    },
  },
  contextBuilder: (): ContextBuilder => ({
    id: '',
  }),
},
```

Add a new insertion point **`DAPPLET_SEARCH_RESULT`**, which is similar to `SEARCH_RESULT`
but adds a button to our search widget. This is to prevent overwriting of similar search results from different sources.

```ts
{
  containerSelector: '#search',
  contextSelector: '.hlcw0c-dapp .tF2Cxc',
  insPoints: {
    DAPPLET_SEARCH_RESULT: {
      selector: '.yuRUbf',
      insert: 'inside',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contextBuilder: (searchNode: any): ContextBuilder => ({
    id: searchNode.querySelector('.yuRUbf > a').href,
    title: searchNode.querySelector('h3 > span').textContent,
    link: searchNode.querySelector('.yuRUbf > a').href,
    description: searchNode.querySelector('.IsZvec').textContent,
  }),
},
```

Implement module `adapter/src/result.ts` that exports class **`Result`**.
It should have an **image**, a **title** and a artificial list of **results**.

See the code of [result.ts](https://github.com/dapplets/dapplet-template/blob/ex08.2-new-adapter-widget-solution/adapter/src/result.ts)

Import and add **Result** to `/adapter/src/index.ts`:

```ts
import { Result } from './result';
...
@Injectable
export default class GoogleAdapter {
  public exports = (): Exports => ({
    button: this.adapter.createWidgetFactory(Button),
    result: this.adapter.createWidgetFactory(Result),
  });
  ...
}
```

In `dapplet-feature/src/index.ts` add **`result`** to **`WIDGETS`**. Use `searchResults` from the template as a content sourse.

```ts
WIDGETS: [
  result({
    initial: 'DEFAULT',
    DEFAULT: {
      img: GOOGLE_IMG,
      title: 'clouds',
      searchResults,
    },
  }),
],
```

```ts
const searchResults = [
  {
    title: 'Types of Clouds | NOAA SciJinks - All About Weather',
    link: 'https://scijinks.gov/clouds/',
    description:
      'Mammatus clouds. Mammatus clouds are actually altocumulus, cirrus,\
      cumulonimbus, or other types of clouds that have these pouch-like shapes hanging \
      out of the bottom. The pouches are created when cold air within the cloud sinks down \
      toward the Earth. Weather prediction: Severe weather might be on its way!',
  },
  {
    title: 'Clouds—facts and information - Science',
    link: 'https://www.nationalgeographic.com/science/article/clouds-1',
    description:
      'Altostratus clouds may portend a storm. Nimbostratus clouds are thick \
      and dark and can produce both rain and snow. Low clouds fall into four divisions: \
      cumulus, stratus, cumulonimbus, and ...',
  },
  {
    title: 'Types of Clouds | Live Science',
    link: 'https://www.livescience.com/29436-clouds.html',
    description:
      'Clouds of great vertical development: These are the cumulonimbus clouds, \
      often called a thunderhead because torrential rain, vivid lightning and thunder come \
      from it. The tops of such clouds may ...',
  },
];
```

Implement the insertion of buttons into our widget.

```ts
DAPPLET_SEARCH_RESULT: [
  button({
    initial: 'DEFAULT',
    DEFAULT: {
      label: 'Get data',
      tooltip: 'Show in the alert',
      img: EXAMPLE_IMG,
      exec: (ctx) => {
        const { title, link, description } = ctx;
        alert(`  title: ${title}\n  link: ${link}\n  description: ${description}`);
      },
    },
  }),
],
```

Add to `adapter/src/button.ts` support for `DAPPLET_SEARCH_RESULT` insertion point.

```ts
// class Button
...
public mount(): void {
  if (this.insPointName === 'MENU') {
    ...
  } else if (
    this.insPointName === 'SEARCH_RESULT' ||
    this.insPointName === 'DAPPLET_SEARCH_RESULT'
  ) {
    ...
  }
}
...
private _createElement() {
  ...
  if (this.insPointName === 'MENU') {
    this.el.classList.add('dapplet-widget-menu');
  } else if (
    this.insPointName === 'SEARCH_RESULT' ||
    this.insPointName === 'DAPPLET_SEARCH_RESULT'
  ) {
    this.el.classList.add('dapplet-widget-results');
  }
  ...
}
```

Here is the result: [ex08.2-new-adapter-widget-solution.](https://github.com/dapplets/dapplet-template/tree/ex08.2-new-adapter-widget-solution)

Run the dapplet:

```bash
npm i
npm start
```
