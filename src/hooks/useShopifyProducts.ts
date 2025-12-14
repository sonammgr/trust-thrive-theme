import { useQuery } from "@tanstack/react-query";
import { fetchShopifyProducts, ShopifyProduct } from "@/lib/shopify-api";

export function useShopifyProducts(first: number = 20, query?: string) {
  return useQuery({
    queryKey: ["shopify-products", first, query],
    queryFn: () => fetchShopifyProducts(first, query),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
