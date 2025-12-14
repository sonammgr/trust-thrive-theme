import { Link } from "react-router-dom";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  inStock?: boolean;
  stockCount?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isLowStock = product.stockCount && product.stockCount <= 5;

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 animate-fade-up">
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Sale Badge */}
        {discount > 0 && (
          <span className="sale-badge absolute top-3 left-3">
            -{discount}%
          </span>
        )}
        
        {/* Best Seller Badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-0.5 text-xs font-semibold rounded-full">
            {product.badge}
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mb-3">
          <StarRating rating={product.rating} showCount count={product.reviewCount} size="sm" />
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {isLowStock && (
          <p className="low-stock-warning mb-2">Only {product.stockCount} left in stock!</p>
        )}

        <Button variant="cta" className="w-full" size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
