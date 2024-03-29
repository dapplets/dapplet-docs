---
id: config
title: Dapplet config
---

When you create a dapplet module, one of the important entities is the **dapplet config**. It provides settings that can be selected by the user in the Dapplets extension. It also allows you to set different parameter values depending on the environment.

For example: you could define the network in which the dapplet will work, configure the monetization of the dapplet, change the url addresses of the server and the overlay part of the dapplet.

The configuration is implemented through the `schema.json`.

The schema follows the rules defined in http://json-schema.org/.
The Dapplet settings UI is generated by [react-jsonschema-form](https://react-jsonschema-form.readthedocs.io/en/latest/usage/single/).

In the production environment we set up the **dapplet config** and specify the parameters that will be available in the browser through the extension.

### Configuration

The **dapplet config** is located in the **./config** directory.

In the `schema.json` file we specify the dapplet settings that will be available to the user.

The scheme consists of parameters:

```js
{
  // Schema type: always object
  "type": "object",
  // List the names of the required parameters. Other parameters will be optional
  "required": [
    "network"
  ],
  "properties": {
    // Property name (ID)
    "network": {
      // string or number
      "type": "string",
      // Property title for the extension
      "title": "Target network",
      /**
        An optional field visibility parameter. Boolean value.
        Make the setting hidden for users.
        It's displayed in the developer and testing mode, not in the public.
      */
      "hidden": false,
      /**
        An optional field in select format. It sets the dropdown form for the setting.
        You should list the available values here.
      */
      "enum": [
        "mainnet",
        "testnet"
      ]
    },
  }
}
```

![img](/img/con_01.png)

![img](/img/con_02.png)

Inputs for numbers can have a limit on the maximum and minimum value and a step.

```js
{
  "type": "object",
  "required": [
    "step",
    "delay"
  ],
  "properties": {
    "step": {
      "type": "number",
      "title": "Donation increase step",
      "maximum": 1,
      "minimum": 0.05,
      // The property value must be a multiple of this parameter
      "multipleOf": 0.05,
   ...
    },
    "delay": {
      "type": "number",
      "title": "Time before sending tip (in seconds)",
      "maximum": 0.1,
      "minimum": 5,
      "multipleOf": 0.1,
      ...
    },
  }
}
```

![img](/img/con_03.png)

The default setting values are defined in the `default.json`.

There are three environments:

- `dev` - used when a module is loaded from the development server;
- `test` - used when a module is loaded from the Test Dapplet Registry;
- `prod` or `main` - used when a module is loaded from the Production Dapplet Registry.

Describe the fields as an object:

```js
{
  // Environment type
  "main": {
    // <property name>: <default value>
    "network": "mainnet",
    "step": 0.05,
    "delay": 3
  },
  "test": {
    "network": "mainnet",
    "step": 0.05,
    "delay": 2
  },
  "dev": {
    "network": "testnet",
    "step": 0.1,
    "delay": 1
  }
}
```

### Dapplet

There is **Core.storage** API that allows you to work in the dapplet with its config.
The most commonly used method is `get(key: string)`. It allows to get current values of the settings.

```js
...
async activate(): Promise<void> {
  const step = await Core.storage.get('step');
  const delay = await Core.storage.get('delay');
  this._network = await Core.storage.get('network');
  ...
}
```

There are also `set(key: string, value: any)`, `remove(key: string)` and `clear()` methods. They can be used to change a setting, restore a specific setting or all settings to their default values.

### Extension

User interaction with the **dapplet config** takes place in the User Settings page.

The user can interact with the field by saving the data or reverting it to the default **dapplet config** data.

![video](/video/con_01.gif)
