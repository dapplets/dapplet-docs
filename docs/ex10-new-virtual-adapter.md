---
id: new-virtual-adapter
title: "Ex10: New Virtual adapter (interface)"
---

The point of a virtual adapter is to run one dapplet on many adapters.
In this exercise you should implement a virtual adapter for two search adapters.

The initial code for this example is here: [ex10-new-virtual-adapter-exercise.](https://github.com/dapplets/dapplet-template/tree/ex10-new-virtual-adapter-exercise)

The start point of the exercise is a solution for the [Ex08: New Site specific adapter](/docs/new-site-adapter). There is an adapter for Google and a dapplet for it.

1. Add search adapter for Yahoo. See the code on GitHub: [yahoo-adapter.](https://github.com/dapplets/dapplet-template/tree/ex10-new-virtual-adapter-solution/yahoo-adapter)

2. Add `/my-virtual-adapter/` folder that should have a structure similar to Google adapter.

```bash
my-virtual-adapter
├── dapplet.json
├── package-lock.json
├── package.json
├── rollup.config.js
├── src
|  └── index.ts
└── tsconfig.json
```

3. The `/my-virtual-adapter/src/` folder should contain only `index.ts` that exports an empty object.

```ts
export default {};
```

4. In the `/my-virtual-adapter/dapplet.json` set `"type": "INTERFACE"` and remove `"contextIds"` and `"dependencies"`.

```json
{
  "name": { "$ref": "package.json#/name" },
  "branch": "default",
  "version": { "$ref": "package.json#/version" },
  "type": "INTERFACE",
  "title": "My Virtual Adapter",
  "description": { "$ref": "package.json#/description" },
  "main": { "$ref": "package.json#/main" }
}
```

5. Add virtual adapter to `"interfaces: []"` in `dapplet.json` of Google and Yahoo adapters and to `"contextIds"` and `"dependencies"` of the dapplet.

```json
// google-adapter/dapplet.json yahoo-adapter/dapplet.json
{
  ...
  "interfaces": {
    "my-virtual-adapter.dapplet-base.eth": "0.1.0"
  }
}
```

```json
// dapplet-feature/dapplet.json
{
  ...
  "contextIds": ["my-virtual-adapter.dapplet-base.eth"],
  ...
  "dependencies": {
    "my-virtual-adapter.dapplet-base.eth": "0.1.0"
  }
}
```

6. Change injecting of Google adapter to Virtual adapter in `/dapplet-feature/src/index.ts`.

```ts
@Inject('my-virtual-adapter.dapplet-base.eth') public adapter: any,
```

Add to `/package.json` to install and run virtial, google, yahoo adapters and the dapplet:

```json
// scripts

"postinstall": "concurrently -c \"yellow,magenta,green,blue\" -n \"google-adapter,yahoo-adapter,dapplet,my-virtual-adapter\" \"cd google-adapter && npm i\" \"cd yahoo-adapter && npm i\" \"cd dapplet-feature && npm i\" \"cd my-virtual-adapter && npm i\"",
"start": "concurrently -c \"yellow,magenta,green,blue\" -n \"google-adapter,yahoo-adapter,dapplet,my-virtual-adapter\" \"cd google-adapter && npm start\" \"cd yahoo-adapter && npm start\" \"cd dapplet-feature && npm start\" \"cd my-virtual-adapter && npm start\"",
```

Here is the result: [ex10-new-virtual-adapter-solution.](https://github.com/dapplets/dapplet-template/tree/ex10-new-virtual-adapter-solution)

Run the dapplet:

```bash
npm i
npm start
```
> In this example we run **four servers** concurrently. So you have to add four registry addresses to Dapplet extension in Development tab. How to do it see [here](/docs/getting-started#11-connect-the-development-server-to-dapplet-extension).
