---
id: motivation-for-adapter-developers
title: "Motivation for Adapter Developers"
---

A dapplet author can create their own adapter for any website, or they can use an existing adapter made previously by another author. 

But usually, the dapplet developer will reuse an existing adapter with some changes. How can the dapplet developer motivate the owner of adapter to implement that changes? There is an incentivization mechanism for that.

## Using the launch pool to reward an adapter creator
A dapplet developer can allocate a part of the Initial Token Supply as a conditional reward for the adapter developer. He will get the reward only if his adaptor will be used by the dapplet, which actually means that the adapter developer has implemented all necessary features required by the dapplet. Receiving launch rewards and holding tokens of supported dapplets is the main incentivization mechanism for the adapter developer to keep it operational and reputable.

![](https://raw.githubusercontent.com/dapplets/dapplet-docs/master/docs/whitepapers/21-adapter-developer-motivation.png)
*Pic: Using the Collateral Stake as the first transaction on the Bonding curve and as a reward for the adapter developer*

## How to receive the launch reward
1. A dapplet owner creates and fills the launch pool with collateral (usually AUGE token).
1. A dapplet owner agrees with the adapter Owner about some share in the launch pool.
1. This share may be conditional, which means it will be distributed only if the dapplet will be deployed with the dependency to the adapter.
1. Once the dapplet is launched, the collateral stored in the launch pool will be used for the initial minting transaction on the Bonding Curve. 
1. The minted amount is distributed according to the share table for all active shares. A conditional share is only active if condition is met to the time of minting. In particular, if the dapplet has no dependency to some adapter at the time of deployment, the adapter owner becomes no shares.

Note, there is no formal agreement between the dapplet owner and the adapter owner about the cooperation. Such agreement is unnecessary. 

The adapter owner becomes the share only if a dapplet uses the adapter. A dapplet deployed without the necessary dependency can’t work. Otherwise, if it starts with the dependency, it activates the share dedicated to the owner of the adapter.
