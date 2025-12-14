import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { products, reviews } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, RotateCcw, Minus, Plus, Play, ChevronLeft } from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/collections">Back to Shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isLowStock = product.stockCount && product.stockCount <= 5;

  return (
    <div className="min-h-screen flex flex-col">
      <TrustBadges />
      <Header />

      <main className="flex-1 bg-background">
        <div className="container py-6 md:py-12">
          {/* Breadcrumb */}
          <Link to="/collections" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Shop
          </Link>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <span className="sale-badge absolute top-4 left-4 text-sm">
                    -{discount}% OFF
                  </span>
                )}
              </div>
              
              {/* Video Placeholder */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary/50 cursor-pointer group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                <p className="absolute bottom-4 left-4 text-sm text-muted-foreground">
                  Watch product demo
                </p>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {product.badge && (
                <span className="inline-block bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full">
                  {product.badge}
                </span>
              )}
              
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <StarRating rating={product.rating} showCount count={product.reviewCount} size="md" />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-sm font-semibold text-scarcity">
                    Save ${(product.originalPrice! - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Low Stock Warning */}
              {isLowStock && (
                <div className="bg-scarcity/10 border border-scarcity/20 rounded-lg p-3">
                  <p className="low-stock-warning font-medium">
                    ⚡ Hurry! Only {product.stockCount} left in stock
                  </p>
                </div>
              )}

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                Experience premium quality with our {product.name}. Designed for modern living, this product combines cutting-edge technology with elegant design. Perfect for everyday use, it's the smart solution you've been looking for.
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button variant="cta" size="lg" className="flex-1">
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="flex flex-col items-center text-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="text-xs text-muted-foreground">Secure Checkout</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="w-6 h-6 text-primary" />
                  <span className="text-xs text-muted-foreground">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RotateCcw className="w-6 h-6 text-primary" />
                  <span className="text-xs text-muted-foreground">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <section className="mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-8">Customer Reviews</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="bg-secondary/30 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold">{review.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{review.name}</p>
                      {review.verified && (
                        <p className="text-xs text-success">✓ Verified Purchase</p>
                      )}
                    </div>
                  </div>
                  <StarRating rating={review.rating} size="sm" />
                  <p className="mt-3 text-sm text-muted-foreground">"{review.text}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Add to Cart Bar - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
          <Button variant="cta" size="lg" className="flex-1">
            Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Spacer for sticky bar */}
      <div className="lg:hidden h-20" />

      <Footer />
    </div>
  );
};

export default ProductPage;
