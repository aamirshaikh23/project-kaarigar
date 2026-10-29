# Kaarigar Marketplace

A React storefront prototype for a centralized marketplace where customers can discover handmade products from community and NGO partners.

## Run locally

```bash
npm install
npm run dev
```

## Current prototype

- Responsive marketplace homepage and product catalog
- Product category, NGO, search, and sort filters
- Maker/NGO discovery cards
- Single-NGO shopping bag with quantity controls
- Demo newsletter signup and checkout feedback

The current app is a frontend prototype using sample catalog data. Authentication, persistent orders, NGO and Super Admin workspaces, secure NGO data isolation, file storage, UPI/QR payment submission, and server-side payment verification require a backend and are not implemented here. In particular, submitting a UTR must never automatically mark an order as paid.
