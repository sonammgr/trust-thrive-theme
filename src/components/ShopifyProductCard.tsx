import { Link } from "react-router-dom";
import { ShopifyProduct } from "@/lib/shopify-api";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { toast } from "sonner";
import { cleanProductTitle } from "@/lib/product-utils";

interface ShopifyProductCardProps {
  product: ShopifyProduct;
}

const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const setOpen = useCartStore((state) => state.setOpen);
  const { node } = product;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  const compareAtPrice = node.compareAtPriceRange?.minVariantPrice?.amount 
    ? parseFloat(node.compareAtPriceRange.minVariantPrice.amount)
    : null;
  const currency = node.priceRange.minVariantPrice.currencyCode;
  
  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const isLowStock = firstVariant?.quantityAvailable !== undefined && firstVariant.quantityAvailable <= 5 && firstVariant.quantityAvailable > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("No variant available");
      return;
    }

    addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions,
    });

    toast.success("Added to cart", {
      description: cleanProductTitle(node.title),
      action: {
        label: "View Cart",
        onClick: () => setOpen(true),
      },
    });
  };

  return (
    <div className="group relative bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up">
      <Link to={`/product/${node.handle}`} className="block relative aspect-square overflow-hidden bg-secondary">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        
        {discount > 0 && (
          <span className="sale-badge absolute top-3 left-3">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="p-4 bg-card">
        <Link to={`/product/${node.handle}`}>
          <h3 className="font-medium text-card-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {cleanProductTitle(node.title)}
          </h3>
        </Link>

        <div className="mb-3">
          <StarRating rating={4.5} showCount count={Math.floor(Math.random() * 500) + 50} size="sm" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-card-foreground">
            {currency === "USD" ? "$" : currency} {price.toFixed(2)}
          </span>
          {compareAtPrice && compareAtPrice > price && (
            <span className="text-sm text-muted-foreground line-through">
              ${compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {isLowStock && (
          <p className="low-stock-warning mb-2">Only {firstVariant.quantityAvailable} left in stock!</p>
        )}

        <Button 
          variant="cta" 
          className="w-full" 
          size="sm"
          onClick={handleAddToCart}
          disabled={!firstVariant?.availableForSale}
        >
          {firstVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default ShopifyProductCard;
