import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ShopifyProductCard from "./ShopifyProductCard";

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useShopifyProducts(50);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our complete collection of quality products, handpicked for value and satisfaction.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Failed to load products. Please try again.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found.</p>
            <p className="text-sm text-muted-foreground">Create products by telling me what you want to sell!</p>
          </div>
        )}

        {/* Product Grid */}
        {products && products.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {products.map((product, index) => (
              <div key={product.node.id} style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}>
                <ShopifyProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        {products && products.length > 0 && (
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/collections">
                View All Products
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
