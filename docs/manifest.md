---
id: manifest
title: Module Manifest
---

The module manifest – `dapplet.json` – is a JSON that is placed in the root of the module and contains all the required information that is needed to deploy the module and add it to the dapplet registry. It is a necessary part of every module.

Here is an example of the module's manifest:

```json
{
  "name": {
    "$ref": "package.json#/name"
  },
  "branch": "default",
  "version": {
    "$ref": "package.json#/version"
  },
  "type": "FEATURE",
  "title": "Dapplet Template Publishing",
  "description": {
    "$ref": "package.json#/description"
  },
  "main": {
    "$ref": "package.json#/main"
  },
  "icon": "src/icons/example.png",
  "contextIds": ["twitter-config.dapplet-base.eth"],
  "config": {
    "schema": "config/schema.json",
    "default": "config/default.json"
  },
  "overlays": {},
  "dependencies": {
    "twitter-config.dapplet-base.eth": "0.1.5"
  }
}
```

### Manifest Structure

Some fields refer to `package.json`. They have `"$ref"` children with the field link values.
`"$ref"` is a part of JSON Reference specification. More details:

- https://datatracker.ietf.org/doc/html/draft-pbryan-zyp-json-ref-03
- https://niem.github.io/json/reference/json-schema/references/

All these fields are obligatory. Set them in `package.json`:

- **name** – the name of the module. The name is the ID of your module so it must be unique.
- **version** – a version of the module. Refer to SemVer format: https://semver.org/
- **description** – a brief description of your module. It's displayed in the dapplets list inside the extension's overlay and in the Dapplets Store.
- **main** – sets the entry point for the dapp.

Other parameters are specified in `dapplet.json`:

- **type** – indicates the type of module. There are three types:

  - `FEATURE` – a dapplet, the main part that interacts with the adapter and the Core API
  - `CONFIG` – a site-specific adapter that allows dapplets to work with site specific contexts
  - `INTERFACE` – a virtual adapter which provides an interface for dapplets so they are able to use several site-specific adapters

- **title** – a module's name. It's displayed in the extension's dapplets list, in the Dapplets Store, on the NFT, etc.
- **icon** – a link to the dapplet's icon. It's an optional parameter.
- **contextIds** – a list of resources where the module is loaded and activated. You should list site domains or a name of the module (adapter, interface), where domains are already listed.

  For example, you can specify certain domains in the adapter's manifest:

  ```json
  // ./adapter/dapplet.json
  {
    "contextIds": ["twitter.com", "www.twitter.com", "mobile.twitter.com"]
  }
  ```

  and specify this adapter in the dapplet's manifest:

  ```json
  // ./dapplet/dapplet.json
  {
    "contextIds": ["twitter-config.dapplet-base.eth"]
  }
  ```

  So this dapplet will be loaded and activated with the same resources as the adapter.

  There is an opportunity to specify the dynamic context. It means that this context can appear on the page at any time and the module will start working. It may be a tweet or another type of post:

  ```json
  {
    "contextIds": ["twitter.com/1551967807428071431"]
  }
  ```

  The last way to specify ContextIDs is setting the contexts determined by content detectors. Currently they are specified in the Dapplets extension and only one is available – "video" context:

  ```json
  {
    "contextIds": ["video"]
  }
  ```

:::caution

Video contextId is currently not working, but it is planned to return in the near future.
Follow our news and updates

:::

This means that the module works if there are <video\> elements on the page. This is also dynamic context.

- **config** – a dapplet's config. It's an optional field that's used only in dapplets.
  The idea is to add some settings to the dapplet which can be changed in the extension.
  For more information look [here](/docs/config).

- **overlays** – a list of the overlays that use the dapplet. If your dapplet uses the overlay you have to add its name/ID and the development server here:

  ```json
  {
    "overlays": {
      "example-04-overlay": "http://localhost:3000"
    }
  }
  ```

  An `assets-manifest.json` should be available at the root of overlay's URL. Example:

  ```json
  {
    "index.html": "index.html",
    "main.js": "main.js"
  }
  ```

Check out how to make a dapplet with an overlay here: [Overlays](/docs/overlays)

- **dependencies** – adapters which are used in the module. Currently you can set dependencies only for FEATURE modules (dapplets). Set site-specific and virtual adapters which you want to interact with.
  Set the site-specific and virtual adapters in dapplets.

- **interfaces** – a list of interfaces (virtual adapters) that the adapter implements.
  It is an optional parameter for site-specific adapters.
  If some dapplet use a virtual adapter from this list the site-specific adapter runs in supported contexts.

  ```json
  {
    "interfaces": {
      "social-virtual-config.dapplet-base.eth": "0.1.0"
    }
  }
  ```

### Manifest Update

The changes in `dapplet.json` will not be considered in the dapplet registry when you will deploy new module versions.
To change some information open the Dapplets extension, connect the wallet of the owner or admin of the module, and go to the Settengs -> Developer. You will see the Registry chapter with your published module. Open its settings.

![developers tab](/img/manif_01.png)

Here you can change: title, description, icon, ownership, admins, context IDs.

![module settings](/img/manif_02.png)
