---
id: widgets-iterator
title: 'Ex11: Widgets Iterator'
---

The function that we pass to augment the context can return either a **single widget**, or an **array of widgets**, or a **null**. The widgets in the array can be of the same or different types. The function itself can be either **synchronous** or **asynchronous**.

The initial code for this example is in [master.](https://github.com/dapplets/dapplet-template/tree/master)

Let's create a few `avatarBadge`-s for `POST` and `button`-s for `PROFILE`. We will use `data.json` as data. We will fetch _nfts_, which contain an _image_ and _text_, in an asynchronous `activate` function.

```ts
// /dapplet/src/index.ts > TwitterFeature
async activate(): Promise<void> {
    let nfts: NftMetadata[] = data

    const { avatarBadge, button } = this.adapter.exports
    this.adapter.attachConfig({
      POST: (ctx) =>
        nfts &&
        nfts.map((nft) =>
          avatarBadge({
            DEFAULT: {
              img: nft.image,
              basic: true,
              tooltip: ctx.authorFullname + "'s " + nft.text,
            },
          })
        ),
      PROFILE: (ctx) =>
        nfts &&
        nfts.map((nft) =>
          button({
            DEFAULT: {
              img: nft.image,
              tooltip: ctx.authorFullname + "'s " + nft.text,
            },
          })
        ),
    })
  }
```

The complete code for this example can be found here: [ex11-widgets-iterator.](https://github.com/dapplets/dapplet-template/tree/ex11-widgets-iterator)

Run the dapplet:

```bash
npm i
npm start
```

![video](/video/ex_11.gif)
