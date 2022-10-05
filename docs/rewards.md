---
id: rewards
title: Rewards
---

**Dapplet Under Construction** offers the ability to give out rewards that are distributed to those involved in the development process. They are handed out at the moment the dapplet (token and curve) is launched. [To learn more](/docs/whitepapers/motivation-for-adapter-developers).

### Create Rewards

#### Go to settings Dapplet Under Construction

#### Open Rewards page

Enter **Pool**  - contributing of the total reward for both adapter developers and third parties that the dapplet owner wants to reward when the token / dapplet is launched.

Click `create` to create conditions for receiving a reward.

Enter the name of the reward and the percentage of the reward pool.

Click on the icon to open an additional field.

For an **Unconditional reward**, enter the address of the recipient of the token.

**Conditional Reward**

DUC currently implements only one conditional reward mechanism, which is aimed at motivating adapter developers.

To create such a reward, the user must specify the adapter's author and name, as well as the reward percentage that they will receive if the adapter is included in the list of the dapplet's dependencies.


If multiple authors and adapters are specified within the same reward, the distribution of the reward will be based on the situation at the time of the release:

* none of the specified adapters are included in the dependencies - none of the authors receive an reward

* one of the adapters is included in the list - the author receives the whole reward

* several adapters are included in the list - the reward is divided equally between the authors of the adapters indicated in the dependencies

:::tip

If the reward pool is not fully distributed, the remaining tokens will be transferred to the author of the dapplet.

:::

After filling in the fields, press the `apply` to create a reward.

You can add new rewards, change or delete created rewards.

After creating rewards, click `push changes` to save changes.

![rewards](/video/rew.gif)

