---
id: dark-theme-support
title: 'Dark theme support'
---

You can add different icons for **light** and **dark** themes.

Usually we pass an image encoded as `base64` to `img`. This can also be an absolute image `URL`. But we can also pass an object, that contains two images with the keys `LIGHT` and `DARK` for light and dark themes respectively.

```typescript
this.adapter.attachConfig({
  POST: () =>
    button({
      DEFAULT: {
        label: 'Injected Button',
        img: {
          LIGHT: LIGHT_IMG,
          DARK: DARK_IMG,
        },
        exec: () => Core.alert('Hello, Themes!'),
      },
    }),
})
```

The complete code for this example can be found here: [ex12-dark-theme-support.](https://github.com/dapplets/dapplet-template/tree/ex12-dark-theme-support)

![video](/video/ex_12.gif)
