---
id: motivation-for-adapter-developers
title: "Motivation for Adapter Developers"
---

A dapplet author can create their own adapter for any website, or they can use an existing adapter made previously by another author. 

Usually a dapplet developer will simply reuse an existing adapter while adding the changes he requires. However, these changes still need to be implemented by the original developer of the adapter. A dapplet developer has a special incentive mechanism that can motivate adapter developers.

## Using the launch pool to reward an adapter creator
A dapplet developer can allocate a part of the Initial Token Supply as a conditional reward for the adapter developer. He will only receive the reward if his adapter is used by the dapplet. This would mean that the adapter developer has implemented all the necessary features required by the dapplet developer. Receiving launch rewards and tokens of supported dapplets is the main incentive mechanism for the adapter developer to keep their adapters operational and reputable. 

![](https://raw.githubusercontent.com/dapplets/dapplet-docs/master/docs/whitepapers/21-adapter-developer-motivation.png)
*Pic: Using the Collateral Stake as the first transaction on the Bonding curve and as a reward for the adapter developer*

## How to receive the launch reward
1. A dapplet owner creates and fills the launch pool with collateral (usually AUGE token).
1. A dapplet owner agrees with the adapter developer about some share in the launch pool.
1. This share may be conditional, which means that it will only be distributed if the dapplet is deployed with the dependency to the adapter.
1. Once the dapplet is launched, the collateral stored in the launch pool will be used for the initial minting transaction on the Bonding Curve. 
1. The minted amount is distributed according to the share table for all active shares. A conditional share is only active if the condition is met at the time of minting. Thereby if the dapplet has no dependency to an adapter at the time of deployment, the adapter developer does not receive any shares.

Note that there is no formal agreement between the dapplet owner and the adapter developer about cooperation. Such an agreement is unnecessary. 

The adapter owner only receives the share if a dapplet uses the adapter. A dapplet deployed without the necessary dependency can’t work. Otherwise, if it starts with the dependency, it activates the share dedicated to the owner of the adapter.
