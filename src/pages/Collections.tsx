import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";

const Collections = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<2 | 3>(3);

  const category = searchParams.get("category");
  const saleOnly = searchParams.get("sale") === "true";

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    if (saleOnly) {
      result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
    }
    
    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Featured - keep original order
        break;
    }
    
    return result;
  }, [sortBy, saleOnly]);

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
            <p className="text-muted-foreground">
              {filteredProducts.length} products curated for quality and value
            </p>
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
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
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

            {/* Product Grid */}
            <div className={`grid gap-4 md:gap-6 ${gridCols === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"}`}>
              {filteredProducts.map((product, index) => (
                <div key={product.id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
