---
id: new-site-adapter
title: 'Ex08: New Site specific adapter'
---

In this example we implement an adapter for Google Search and a dapplet for it.

Here is the initial code for this example: [ex08-new-adapter-exercise.](https://github.com/dapplets/dapplet-template/tree/ex08-new-adapter-exercise)

The adapter and the dapplet are divided into two directories: `/adapter` and `/dapplet-feature`.

### Create an adapter with one widget `button` for two states.

At the beginning we change the adapter template. Let's add a button for standard Google search results.

In `adapter/index.json` implement **`config`**. It is an object which describes different **contexts** on the page. Selectors for container, context data and insertion points for widgets are described here. `contextBuilder` defines context information that widget receives in this context type: `BODY` in our case (named **`ctx`** in our examples).

```ts
{
  "themes": {
    "LIGHT": "boolean(//body[@style='background-color: #FFFFFF;'] | //body[@style='background-color: rgb(255, 255, 255);'])",
    "DARK": "boolean(//body[@style='background-color: rgb(21, 32, 43);'] | //body[@style='background-color: rgb(0, 0, 0);'])"
  },
  "contexts": {
    "GLOBAL": {
      "containerSelector": "html",
      "contextBuilder": {
        "id": "string('global')",
        "websiteName": "string(//title)"
      }
    },
    "BODY": {
      "containerSelector": "html",
      "contextSelector": "",
      "widgets": {
        "button": {
          "styles": "",
          "insertionPoint": "body",
          "insert": "end"
        },
        "popup": {
          "styles": "",
          "insertionPoint": "body",
          "insert": "end"
        }
      },
      "contextBuilder": {
        "id": "string(//title)"
      }
    }
  }
}
```

:::tip

**How to create an adapter's config?**

Now we could talk about site-specific adapters. It means that dapplets using this adapter interact with some specific website.
It also means that we should **use the website's HTML structure** to add our widgets to certain parts of the pages.

The idea of **separating adapters from dapplets** is to provide **dapplets' developers** with a simple interface to add their augmentations (we call them widgets) to existing pages.
This way, **dapplets developers** don't need to worry about how to add their code in certain places or how to parse different blocks of information on the page. They get the template, customize it and add the behavior they need.

The goals of the **adapters' developer** are to create this template, define the data that can be parsed from the context, that can be useful in the dapplet.
**Adapters' developer** also need to describe exact places on the pages where the widgets will be inserted. To describe them we use valid CSS selectors that can be used.

For example, let's look at the Google Search page. Enter some search query, `clouds` for example.
Look at the structure of the page in the browser's developer tools, Elements tab.
There you can find the block with `search` id, that contains all the main search results.
It will be our **containerSelector** where we will search some separate results.

```js
document.querySelector('#search')
▸ <div id="search">…</div>
```

Then try to pick out the selectors' chain that provides access to separate context — **contextSelector**.
You can choose relevant selectors manually or you can left click on the element in the Elements tab and choose Copy selector.
In most cases the selector has to be edited.

```js
document.querySelectorAll('#search .MjjYud')
▸ NodeList(10) [div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud]
```

In some cases there are several relevant selectors for different places on the page or different pages. In this case you can define them separating by using commas.

```js
document.querySelectorAll('#search #rso > .g .jtfYYd, #rso > div > .g .jtfYYd, #rso > div > div > .g .jtfYYd, .MjjYud')
▸ NodeList(11) [div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud, div.MjjYud]
```

Make sure not to include unwanted blocks.

Using the same method define selectors for insertion points — exact places where the widgets will be placed.
There are 3 insert options: `end`, `begin` and `inside`. The first one is default.

```typescript
 "insertionPoint": "body",
 "insert": "end"
```

**!!** Note that websites can be changed and you will get errors trying to get properties when the nodes will not be found.

It is assumed that **all interactions with DOM** happen in the adapters and not in the dapplets.

So let's go back to our exercise.

:::

Now we have one context: **BODY**.

The next step - is creating styles for **widget**. We have a template of the button's style in `adapter/styles/body/button.css`.

For example, let's define the styles for `button` and `popup`

```ts
"button": {
          "styles": "styles/body/button.css",
          "insertionPoint": "body",
          "insert": "end"
        },
 "popup": {
          "styles": "styles/body/popup.css",
          "insertionPoint": "body",
          "insert": "end"
        }
```

:::tip

Adapters allow the dapplet to **customize** the widgets. This can be the `text` of the button, the `image` on the icon, the choice of one of the `location` options, etc. The adapter developer decides what **parameters** to make customizable. They should be described in the documentation as follows: parameter's `name`, `mandatory` or not, data `TYPE`, text `description`. If you need to select one of several value options for a parameter, they must be listed (this can be specified in the parameter type). If the parameter type is a number, then it is recommended to indicate in which units it will be converted: pixels, percentages, fractions, etc.

:::

Then change the dapplet.

Add button to page in `/dapplet-feature/src/index.ts`.

Implement an alert that would be triggered when you click the button.

```ts
exec: () => {
  const { id } = ctx
  Core.alert(`  title: ${id}\n`)
},
```

Full code example

```ts
button({
          initial: 'RESULTS',
          RESULTS: {
            label: 'Hi',
            img: GRAY_IMG,
            tooltip: 'Results',

            exec: (_, me) => {
              me.state = 'SECOND'
            },
          },
          SECOND: {
            label: 'SECOND',
            img: EXAMPLE_IMG,
            tooltip: 'SECOND',
            exec: (_, me) => {
              const { id } = ctx
              Core.alert(`  title: ${id}\n`)
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

![video](/video/ex_8_1.gif)
