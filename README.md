# Shopify Embedded Express MVP

Production-ready base for a Shopify embedded app using Node.js, Express, MongoDB, React, App Bridge, and Polaris.

## Folder Structure

```text
shopify-embedded-express-app/
  shopify.app.toml
  shopify.web.toml
  package.json
  .env.example
  server/
    server.js
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
  web/
    package.json
    index.html
    vite.config.js
    src/
      App.jsx
      main.jsx
      components/
      pages/
      utils/
```

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Fill in `.env` with your Shopify app credentials and tunnel URL.

4. Make sure MongoDB is running locally, or set `MONGODB_URI` to a hosted MongoDB connection string.

5. Start the app:

```bash
npm run dev
```

6. In another terminal, use Shopify CLI to run/install the app on a development store:

```bash
shopify app dev
```

When Shopify CLI gives you the preview/install URL, open it and install the app on your test store. After OAuth completes, the embedded dashboard will show `App Installed Successfully` and your shop name.

## API Routes

- `GET /api/health` returns `{ "status": "ok" }`
- `GET /api/shop?shop=your-store.myshopify.com` returns basic shop details from the Shopify Admin GraphQL API

## Notes

- The Admin API version is pinned to `2026-04`, the latest stable Shopify API version as of April 29, 2026.
- Access tokens and Shopify OAuth sessions are stored in MongoDB.
