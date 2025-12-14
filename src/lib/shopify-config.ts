export const SHOPIFY_CONFIG = {
  API_VERSION: '2025-07',
  STORE_PERMANENT_DOMAIN: '171w1n-pq.myshopify.com',
  STOREFRONT_TOKEN: 'f3587691e917bf521f4ba88230fe3e33',
  get STOREFRONT_URL() {
    return `https://${this.STORE_PERMANENT_DOMAIN}/api/${this.API_VERSION}/graphql.json`;
  }
} as const;
