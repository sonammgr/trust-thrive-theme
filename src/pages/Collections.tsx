import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import ProductSearch from "@/components/ProductSearch";
import CategoryFilter from "@/components/CategoryFilter";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { extractCategories, filterByCategory } from "@/lib/product-utils";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, LayoutGrid, Loader2 } from "lucide-react";

const Collections = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<2 | 3>(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const category = searchParams.get("category");
  const saleOnly = searchParams.get("sale") === "true";

  const { data: products, isLoading, error } = useShopifyProducts(50);

  const categories = useMemo(() => {
    if (!products) return [];
    return extractCategories(products);
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];
    
    let result = filterByCategory(products, selectedCategory);
    
    // Filter by search query
    if (searchQuery.trim()) {
      result = result.filter((product) =>
        product.node.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => 
          parseFloat(a.node.priceRange.minVariantPrice.amount) - 
          parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-high":
        result.sort((a, b) => 
          parseFloat(b.node.priceRange.minVariantPrice.amount) - 
          parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "title-az":
        result.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case "title-za":
        result.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
      default:
        break;
    }
    
    return result;
  }, [products, sortBy, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <TrustBadges />
      <Header />
      
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <section className="bg-secondary/30 py-12">
          <div className="container text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Collection` : saleOnly ? "Sale Items" : "All Products"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {filteredAndSortedProducts.length} products curated for quality and value
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
        </section>

        {/* Filters & Grid */}
        <section className="py-8">
          <div className="container">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title-az">Name: A to Z</option>
                  <option value="title-za">Name: Z to A</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={gridCols === 2 ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setGridCols(2)}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={gridCols === 3 ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setGridCols(3)}
                  className="hidden md:flex"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
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
            {!isLoading && !error && filteredAndSortedProducts.length === 0 && (
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
            {filteredAndSortedProducts.length > 0 && (
              <div className={`grid gap-4 md:gap-6 ${gridCols === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
                {filteredAndSortedProducts.map((product, index) => (
                  <div key={product.node.id} style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}>
                    <ShopifyProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
