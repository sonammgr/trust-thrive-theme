import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ShopifyProductCard from "./ShopifyProductCard";
import ProductSearch from "./ProductSearch";
import CategoryFilter from "./CategoryFilter";
import { extractCategories, filterByCategory } from "@/lib/product-utils";

const FeaturedProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: products, isLoading, error } = useShopifyProducts(50);

  const categories = useMemo(() => {
    if (!products) return [];
    return extractCategories(products);
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let result = filterByCategory(products, selectedCategory);
    
    if (searchQuery.trim()) {
      result = result.filter((product) =>
        product.node.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [products, searchQuery, selectedCategory]);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Browse our complete collection of quality products, handpicked for value and satisfaction.
          </p>
          <div className="space-y-4">
            <ProductSearch value={searchQuery} onChange={setSearchQuery} />
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
          </div>
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
        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {searchQuery || selectedCategory ? `No products found${selectedCategory ? ` in "${selectedCategory}"` : ""}${searchQuery ? ` for "${searchQuery}"` : ""}` : "No products found."}
            </p>
            {!searchQuery && !selectedCategory && (
              <p className="text-sm text-muted-foreground">Create products by telling me what you want to sell!</p>
            )}
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
            {filteredProducts.map((product, index) => (
              <div key={product.node.id} style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}>
                <ShopifyProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* View All CTA */}
        {filteredProducts.length > 0 && (
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
