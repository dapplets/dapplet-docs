---
id: architecture
title: "Architecture: Content-Adapter-Application"
---

The general architecture is based on the 3-tier model of *Content*, *Adapter* and *Dapplet*.

Let us see an example in the picture below.

![](https://i.imgur.com/HLhIYs8.png)

The сontent (a web page or video stream) is assumed to exist independently from augmentation dapplets. 

To keep the interface to the Dapplet stable and straightforward, we introduce an Adapter. It parses the content raw data into the set of content objects. A dapplet should operate strictly on the content model and avoid any direct operation on the content.

If the structure of the content changes, a new version of adapter should be released keeping the content model and thus the interface to the dapplet stable. It keeps all the dapplets based on this content adapter working despite breaking changes in content. An adapter is some kind of driver for the content.

There are two kinds of adapters - *content adapter* and *viewport adapter*. Content adapter embeds an augment relative to its content object (like a “verified” check mark over the avatar icon). Viewport adapter puts it relative to the content viewport (like a floating button).

Different content adapters for different websites can export the same public functions. In this case a dapplet using this functionality will work on all of the websites. 

### A dapplet using a user identity will work on all websites where adapters export a user identity interface.

It is essential to mention that dapplets should not define their augmentation widgets. All augments are created and managed by adapters, dapplets are only configuring them. Dapplets set widget icons, states and event handlers but the life-cycle logic is implemented in the adapter. There are many reasons for that: 

* At first, it provides maximum isolation between dapplet and content and allows dapplets working on different content types. 
* Secondly, it increases the overall security because a dapplet becomes relatively small, so it becomes hard to create malicious code that bypasses an audit. 


