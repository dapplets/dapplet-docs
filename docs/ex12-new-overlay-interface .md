---
id: new-overlay-interface 
title: "Ex12: New Overlay Interface"
---

The main advantage of the new interface is the deployment of the dapplet and overlay together.

This example based on [Ex04: Overlays.](/docs/overlays)


In the code of the **dapplet** change overlay argument `url` to `name`:

In the code of the dapplet `/src/index.ts` we change the old syntax:

```typescript
const overlayUrl = await Core.storage.get('overlayUrl');
const overlay = Core.overlay({ url: overlayUrl, title: 'Exercise 04' });
```

To a new one:

```typescript
const overlay = Core.overlay({ name: 'exercise-12-overlay', title: 'Exercise 12' });
```

Now we don't get the **url** from the *Core.storage*, so we can remove **overlayUrl** from `/config/default.json` and `/config/schema.json`.

Add to the `dapplet.json` manifest the following option. 

*Be careful your port may differ from the example*:

```json
"overlays": {
  "exercise-12-overlay": "http://localhost:3000"
}
```

**Run** the dapplet:

```bash
npm i
npm run start-react
```

Now you can simply **deploy** the dapplet without deploying the overlay separately.

The complete code for this example can be found here: [ex12-new-overlay-interface.](https://github.com/dapplets/dapplet-template/tree/ex12-new-overlay-interface)
