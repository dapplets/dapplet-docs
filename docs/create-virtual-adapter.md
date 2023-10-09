---
id: create-virtual-adapter
title: 'Create virtual adapter (interface)'
---

The point of a virtual adapter is to run one dapplet on many adapters.
In this exercise you should implement a virtual adapter for two search adapters.

Here is the initial code for this example: [ex10-new-virtual-adapter-exercise.](https://github.com/dapplets/dapplet-template/tree/ex10-new-virtual-adapter-exercise)

The starting point of exercise is the solution for the [Ex08: New Site specific adapter](/docs/create-site-adapter). There is an adapter for Google Search and a dapplet for it.

1. Add a search adapter for Yahoo. See the code on GitHub: [example-yahoo-adapter.](https://github.com/dapplets/dapplet-template/tree/ex10-new-virtual-adapter-solution/example-yahoo-adapter)

2. Add `/example-virtual-adapter/` folder that should have a structure similar to the Google Adapter Example.

```bash
example-virtual-adapter
├── dapplet.json
├── package-lock.json
├── package.json
├── rollup.config.js
├── src
|  └── index.ts
└── tsconfig.json
```

3. The `/example-virtual-adapter/src/` folder should contain only `index.ts` that exports an empty object.

```ts
export default {}
```

4. In the `/example-virtual-adapter/dapplet.json` set `"type": "INTERFACE"` and remove `"contextIds"` and `"dependencies"`.

```json
{
  "name": { "$ref": "package.json#/name" },
  "branch": "default",
  "version": { "$ref": "package.json#/version" },
  "type": "INTERFACE",
  "title": "Virtual Adapter Example",
  "description": { "$ref": "package.json#/description" },
  "main": { "$ref": "package.json#/main" }
}
```

5. Add virtual adapter to `"interfaces: []"` in `dapplet.json` of Google and Yahoo adapters and to `"contextIds"` and `"dependencies"` of the dapplet-feature.

```json
// example-google-adapter/dapplet.json example-yahoo-adapter/dapplet.json
{
  ...
  "interfaces": {
    "example-virtual-adapter.dapplet-base.eth": "0.2.0"
  }
}
```

```json
// dapplet-feature/dapplet.json
{
  ...
  "contextIds": ["example-virtual-adapter.dapplet-base.eth"],
  ...
  "dependencies": {
    "example-virtual-adapter.dapplet-base.eth": "0.2.0"
  }
}
```

6. Change injecting of Google adapter to virtual adapter in `/dapplet-feature/src/index.ts`.

```ts
@Inject('example-virtual-adapter.dapplet-base.eth') public adapter: any;
```

Add to `/package.json` to install and run the virtual Google adapters, Yahoo adapters and the dapplet.

```json
// scripts

"postinstall": "concurrently -c \"yellow,magenta,green,blue\" -n \"example-google-adapter,example-yahoo-adapter,dapplet,example-virtual-adapter\" \"cd example-google-adapter && npm i\" \"cd example-yahoo-adapter && npm i\" \"cd dapplet-feature && npm i\" \"cd example-virtual-adapter && npm i\"",
"start": "concurrently -c \"yellow,magenta,green,blue\" -n \"example-google-adapter,example-yahoo-adapter,dapplet,example-virtual-adapter\" \"cd example-google-adapter && npm start\" \"cd example-yahoo-adapter && npm start\" \"cd dapplet-feature && npm start\" \"cd example-virtual-adapter && npm start\"",
```

Here is the result: [ex10-new-virtual-adapter-solution.](https://github.com/dapplets/dapplet-template/tree/ex10-new-virtual-adapter-solution)

Run the dapplet:

```bash
npm i
npm start
```

> In this example we run four servers concurrently. This means you have to add four registry addresses to the Dapplet extension in the Development tab. Click [here](/docs/get-started#11-connect-the-development-server-to-dapplet-extension) for instructions.

![video](/video/ex_10.gif)
