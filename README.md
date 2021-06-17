This is a new [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Apart from the default next configuration, FluentUI was added with support for SSR following [this docs](https://github.com/microsoft/fluentui/wiki/Server-side-rendering-and-browserless-testing).

This repo is intended to reproduce an issue with keyframes clashing between server and client when using SSR on production builds.

If you run a dev build
```bash
yarn dev
```

zoom the page to 400% zoom and try to open the overflow menu for the action bar, you will notice it opens correctly (if you inspect the contextual menu you can see that the animation names used start at css-1, which seems to be the same as the ones in the embedded stylesheet, which doesn't seem to be server namespaced.).

Now, if you run a production build
```bash
yarn build; yarn start
```

and follow the same instructions, you will notice that the contextual menu flashes and it's not usable (if you inspect the element you can see the animation names start at css-0, which don't match the embedded stylesheet)