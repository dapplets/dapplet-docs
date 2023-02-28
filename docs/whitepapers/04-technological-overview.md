---
id: technological-overview
title: 'Technological Overview'
---

All our knowledge about augmented reality is taken from games, science-fiction films and AR-apps for smartphones. Essentially, it is about extending the original content with additional visual elements (known as “_augmentations_”). The position of an augmentation and its life-cycle may be anchored to its target content object or the view.

### Here is an example (from Google Maps)

![](https://i.imgur.com/OaupLPc.jpg)

**Content Type:** video stream, street view, geo data
**Augments:** map, navigation widgets
**Anchoring:** geo points

The most challenging process is a parsing of the raw source data into structured content and identifying its content objects (like geo points in the example above). We then need to embed augmentations into the view in the right place.

### The general idea of a content augmentation can be applied to web content as well.

![](https://i.imgur.com/b753WUV.jpg)

In the example above the web page is the content. Its elements are content objects. Embedded buttons and other widgets are augmentations. Let's look at the social feed page and possible augmentations for it:

1. Exchange rates widget;
1. Custom filters controls;
1. Personal ads;
1. Crypto accounts linked to social profile (connected accounts data);
1. Additional inserts;
1. Additional buttons;
1. Profile badges;
1. New functional starters;
1. Background themes and colors;
1. Hidden and paywall content;
1. Community stickers;
1. NFT profile pictures;
1. Visual frames and selections;
1. Community post from other social media
1. and many others.

A parsing of the content means parsing of the DOM, and embedding means inserting a widget's HTML into it. All augmentation widgets are organized as AugmentationDOM, which lays over the original content’s DOM.

A web page can still be quite dynamic: content objects may appear and disappear at any time or move around the page (i.e. by dynamic loading on scrolling). Augmentations should follow their linked content objects.

Although the implementation of the Dapplets Protocol is heavily optimized for the web, the protocol itself is web agnostic and was developed with a variety of content types in mind.
