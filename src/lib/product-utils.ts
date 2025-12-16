import { ShopifyProduct } from "./shopify-api";

// Clean product title by removing shipping info like "SHIP FROM: CHINA"
export function cleanProductTitle(title: string): string {
  return title
    .replace(/\s*[-–—]\s*(SHIP\s*FROM|SHIPS?\s*FROM|SHIPPING\s*FROM)\s*[:\s]*\w+\s*/gi, "")
    .replace(/\s*(SHIP\s*FROM|SHIPS?\s*FROM|SHIPPING\s*FROM)\s*[:\s]*\w+\s*/gi, "")
    .trim();
}

// Extract unique categories from products (using product type or tags)
export function extractCategories(products: ShopifyProduct[]): string[] {
  const categoriesSet = new Set<string>();
  
  products.forEach((product) => {
    // Use productType if available
    if (product.node.productType && product.node.productType.trim()) {
      categoriesSet.add(product.node.productType.trim());
    }
  });
  
  return Array.from(categoriesSet).sort();
}

// Filter products by category
export function filterByCategory(products: ShopifyProduct[], category: string | null): ShopifyProduct[] {
  if (!category) return products;
  
  return products.filter((product) => {
    const productType = product.node.productType?.toLowerCase() || "";
    return productType === category.toLowerCase();
  });
}
