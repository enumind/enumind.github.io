# EnuMind landing page

A static, framework-free landing page prepared for GitHub Pages.

## Deploy

1. Copy everything in this folder to the root of a GitHub repository.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the branch (usually `main`) and `/ (root)`, then save.

## Configure

Edit `config.js` to change the title, copy, footer line, or color tokens. `config.properties` mirrors the same values as a reference for external tooling.

Edit `products.js` to add, remove, or reorder the product tiles on the homepage — each entry takes a `name`, `logo`, `summary`, `link`, and optional `linkLabel`. `products.properties` mirrors the same values as a reference for external tooling. The tile carousel scrolls left/right automatically once there are more products than fit on screen.

No build command or framework is required.
