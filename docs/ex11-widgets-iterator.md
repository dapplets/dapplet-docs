---
id: widgets-iterator
title: "Ex11: Widgets Iterator"
---

The function that we pass to augment the context can return either a **single widget**, or an **array of widgets**, or a **null**. The widgets in the array can be of the same or different types. The function itself can be either **synchronous** or **asynchronous**.

The complete code for this example can be found here: [ex11-widgets-iterator](https://github.com/dapplets/dapplet-template/tree/ex11-widgets-iterator).

Let's create a few `label`-s for `POST` and `button`-s for `PROFILE`. We will use `data.json` as data. We will fetch *nfts*, which contain an *image* and *text*, in an asynchronous `activate` function.

```ts
// /dapplet/src/index.ts > TwitterFeature
async activate() {
  const url = await Core.storage.get('dataUrl');
  let nfts: NftMetadata[];
  try {
    nfts = await this._fetchNfts(url);
  } catch (err) {
    console.log('Error getting NFTs.', err)
  }

  const { label, button } = this.adapter.exports;
  this.adapter.attachConfig({
    POST: (ctx) =>
      nfts && nfts.map((nft) =>
        label({
          DEFAULT: {
            img: nft.image,
            basic: true,
            tooltip: ctx.authorFullname + "'s " + nft.text,
          },
        }),
      ),
    PROFILE: (ctx) =>
      nfts && nfts.map((nft) =>
        button({
          DEFAULT: {
            img: nft.image,
            tooltip: ctx.authorFullname + "'s " + nft.text,
          },
        }),
      ),
  });
}
```

Also add `_fetchNfts` function:

```ts
private async _fetchNfts(url: string): Promise<NftMetadata[]> {
  let res: any;
  try {
    res = await fetch(url);
  } catch (err) {
    console.log('Error fetching NFTs.', err)
  }
  return res.json();
}
```

The complete code for this example can be found here: [ex11-widgets-iterator.](https://github.com/dapplets/dapplet-template/tree/ex11-widgets-iterator)

Run the dapplet:

```bash
npm i
npm start
```
