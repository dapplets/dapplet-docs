---
id: architecture
title: "Architecture: Content-Adapter-Application"
---

The general architecture is based on a 3-tier model of *Content*, *Adapter* and *Dapplet*.

Let's look at the example below.

![](https://raw.githubusercontent.com/dapplets/dapplet-docs/master/docs/whitepapers/07-architecture.png)

The сontent (a web page or video stream) is assumed to exist independently from augmentation dapplets. 

To keep the interface of the dapplet stable and straightforward, we introduce an Adapter. The adapter parses the content's raw data into a set of content objects. A dapplet should operate strictly with the content model and avoid any direct operation with the content.

If the structure of the content changes, a new version of an adapter should be released keeping the content model and thus the interface of the dapplet stable. This keeps all the dapplets based on this content adapter working despite the changes in the content. An adapter is a kind of driver for the content.

There are two kinds of adapters - *content adapter* and *viewport adapter*. The content adapter embeds an augmentation relative to its content object (like a “verified” check mark over the avatar icon). Viewport adapter puts it relative to the content viewport (like a floating button).

Different content adapters for different websites can export the same public functions. In this case a dapplet that uses this functionality will work on all of the websites. 

### A dapplet that utilizes a user identity will work on all websites where adapters export a user identity interface.

It is essential to mention that dapplets should not define their augmentation widgets. All augmentations are created and managed by adapters, dapplets are only configuring them. Dapplets set widget icons, states and event handlers but the life-cycle logic is implemented in the adapter. There are many reasons for that: 

* Firstly, this provides maximum isolation between the dapplet and the content and allows dapplets to work on different content types. 
* Secondly, this increases the overall security, because a dapplet becomes relatively small, it thus makes it hard to create malicious code that bypasses an audit. 
