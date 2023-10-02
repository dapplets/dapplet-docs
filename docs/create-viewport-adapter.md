---
id: create-viewport-adapter
title: 'Create viewport adapter'
---

In this example we create a new viewport adapter and a dapplet for it.

Here is the initial code for this example: [ex09-new-viewport-adapter-exercise.](https://github.com/dapplets/dapplet-template/tree/ex09-new-viewport-adapter-exercise)

Our template has an adapter:

```bash
adapter
├── .gitignore
├── dapplet.json
├── package-lock.json
├── package.json
├── styles
|  ├── body
        ├── button.css
└── index.json
```

When you create an adapter don't forget to set **`contextIds`** in `/adapter/dapplet.json`. On these sites, the adapter will work:

```json
{
  ...
  "contextIds": [
   "https://twitter.com",
   "https://www.instagram.com/",
   "https://www.youtube.com/",
   "https://dapplets.org/",
   "twitter.com",
   "instagram.com",
   "youtube.com",
   "dapplets.org",
   "http://twitter.com",
   "http://www.instagram.com",
   "http://www.youtube.com",
   "http://dapplets.org",
   "www.instagram.com",
   "www.youtube.com"
  ],
  ...
}
```

1. Implement communication between dapplets and pages in `/adapter/index.json`:

```ts
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
                    "insertionPoint": "",
                    "insert": ""
                }
            },
            "contextBuilder": {
                "id": "string('global')",
                "websiteName": "string(//title)"
            }
        }
    }
```

2. Implement the **button** style :

```typescript
 "button": {
                    "styles": "styles/body/button.css",
                    "insertionPoint": "body",
                    "insert": "end"
                }
```

3. Change `dependencies` and `contextIds` in `/dapplet-feature/dapplet.json` to new adapter:

```json
{
  ...
  "contextIds": ["example-viewport-adapter.dapplet-base.eth"],
  ...
  "dependencies": {
    "example-viewport-adapter.dapplet-base.eth": "0.2.0"
  }
}
```

5. Add a valid adapter in `/dapplet-feature/src/index.ts`:

```ts
@Inject('example-viewport-adapter.dapplet-base.eth') public adapter: any;
```

6. Add `button` from the page in `BODY`:

```ts
button({
  initial: 'DEFAULT',
  id: 'button',
  DEFAULT: {
    label: 'GOOGLE_EXAMPLE',
    img: EXAMPLE_IMG,
    exec: () => this.onAlert(ctx),
  },
})
```

7. On button click show the website name:

```ts
onAlert = async (ctx) => {
  Core.alert(`${ctx.websiteName}`)
}
```

Here is the result: [ex09-new-viewport-adapter-solution.](https://github.com/dapplets/dapplet-template/tree/ex09-new-viewport-adapter-solution)

Run the dapplet:

```bash
npm i
npm start
```

![video](/video/ex_9.gif)

> In this example we run **two servers** concurrently. So you have to add two registry addresses to Dapplet extension in Development tab. Click [here](/docs/get-started#11-connect-the-development-server-to-dapplet-extension) for instructions.
