---
id: dark-theme-support
title: "Ex 12: Dark theme support"
---

You can add different icons for **light** and **dark** themes.

Usually we pass to `img` the image encoded as `base64`. This can also be an absolute image `URL`. But we can also pass an object, that contains two images with the keys `LIGHT` and `DARK` for light and dark themes respectively.

```typescript
this.adapter.attachConfig({
  POST: (ctx) =>
    button({
      initial: 'DEFAULT',
      DEFAULT: {
        label: 'Injected Button',
        img: {
          LIGHT: LIGHT_IMG,
          DARK: DARK_IMG,
        },
        exec: () => {
          console.log(ctx);
          alert('Hello, Themes!');
        },
      },
    }),
});
```

Also `ctx` contains `theme` parameter, which can be `'LIGHT'` or `'DARK'`. This information is determined by the adapter and can be used in the dapplet-feature or in the overlay.

The complete code for this example can be found here: [ex12-dark-theme-support.](https://github.com/dapplets/dapplet-template/tree/ex12-dark-theme-support)
