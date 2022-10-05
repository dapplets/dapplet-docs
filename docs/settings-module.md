---
id: settings-module
title: Module`s Settings
---

Module settings allow you to edit some of the parameters described in the [manifest](/docs/manifest) through the extension.



### Open Settings


Open extension settings and switch to developer mode.

:::caution

Module manifest is not updated locally. Don't forget to update it after changing the settings.

:::

Open the **registry**. Click on the settings icon.

### Settings fields

More about the fields name, title, icon, description [here](/docs/manifest)

After changing the fields (title, description or icon) press **push changes** if you want to save the changes.

Confirm the transaction.

![settings](/video/set_mode_1.gif)

Wait for the modal window to close.

**Ownership** - in this field you can change the owner of the module.

:::caution

When this field is changed, the module will disappear from your registry and pass to the new owner.

:::

Enter the eth wallet address of the new owner.

Click **change** and confirm the transaction.

Wait for the modal window to close.

After closing the window - automatic exit from the module settings.

**Admins** - a list of trusted developers who can deploy new versions of the module.

Add a new admin, click on the icon.

Enter the eth wallet address of the new owner.

Click `Add`.

Confirm the transaction. After the end of the transaction, the new admin will appear in the list.

**Context IDs** - adding, removing module contexts. [More about Context IDs](/docs/manifest)

Enter new Context IDs.

Click `Add` and confirm the transaction.

![settings](/video/set_mode_2.gif)


