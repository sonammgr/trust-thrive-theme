import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import TrustBadges from "@/components/TrustBadges";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import { fetchShopifyProductByHandle, ShopifyProduct } from "@/lib/shopify-api";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Truck, RotateCcw, Minus, Plus, Play, ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProductPage = () => {
  const { handle } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useCartStore((state) => state.setOpen);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: () => fetchShopifyProductByHandle(handle!),
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <TrustBadges />
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button asChild>
              <Link to="/collections">Back to Shop</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const selectedVariant = product.variants.edges[selectedVariantIndex]?.node;
  const price = parseFloat(selectedVariant?.price.amount || "0");
  const compareAtPrice = selectedVariant?.compareAtPrice?.amount
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : null;
  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const isLowStock = selectedVariant?.quantityAvailable !== undefined && 
    selectedVariant.quantityAvailable <= 5 && 
    selectedVariant.quantityAvailable > 0;

  const mainImage = product.images.edges[0]?.node;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const productWrapper: ShopifyProduct = {
      node: product,
    };

    addItem({
      product: productWrapper,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    });

    toast.success("Added to cart", {
      description: `${product.title} × ${quantity}`,
      action: {
        label: "View Cart",
        onClick: () => setCartOpen(true),
      },
    });
  };

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
                {mainImage ? (
                  <img
                    src={mainImage.url}
                    alt={mainImage.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
                {discount > 0 && (
                  <span className="sale-badge absolute top-4 left-4 text-sm">
                    -{discount}% OFF
                  </span>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {product.images.edges.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.edges.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-secondary/30">
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {product.title}
              </h1>

              <div className="flex items-center gap-4">
                <StarRating rating={4.7} showCount count={Math.floor(Math.random() * 1000) + 100} size="md" />
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">${price.toFixed(2)}</span>
                {compareAtPrice && compareAtPrice > price && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${compareAtPrice.toFixed(2)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-sm font-semibold text-scarcity">
                    Save ${(compareAtPrice! - price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Low Stock Warning */}
              {isLowStock && (
                <div className="bg-scarcity/10 border border-scarcity/20 rounded-lg p-3">
                  <p className="low-stock-warning font-medium">
                    ⚡ Hurry! Only {selectedVariant.quantityAvailable} left in stock
                  </p>
                </div>
              )}

              {/* Variant Selection */}
              {product.options.length > 0 && product.options[0].name !== "Title" && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const variantIndex = product.variants.edges.findIndex(
                            (v) => v.node.selectedOptions.some(
                              (opt) => opt.name === option.name && opt.value === value
                            )
                          );
                          const isSelected = selectedVariantIndex === variantIndex;
                          
                          return (
                            <Button
                              key={value}
                              variant={isSelected ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedVariantIndex(variantIndex >= 0 ? variantIndex : 0)}
                            >
                              {value}
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {product.description || `Experience premium quality with our ${product.title}. Designed for modern living, this product combines cutting-edge technology with elegant design.`}
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
                <Button 
                  variant="cta" 
                  size="lg" 
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                >
                  {selectedVariant?.availableForSale 
                    ? `Add to Cart - $${(price * quantity).toFixed(2)}`
                    : "Out of Stock"
                  }
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
        </div>
      </main>

      {/* Sticky Add to Cart Bar - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-lg font-bold text-foreground">${price.toFixed(2)}</p>
            {compareAtPrice && compareAtPrice > price && (
              <p className="text-sm text-muted-foreground line-through">
                ${compareAtPrice.toFixed(2)}
              </p>
            )}
          </div>
          <Button 
            variant="cta" 
            size="lg" 
            className="flex-1"
            onClick={handleAddToCart}
            disabled={!selectedVariant?.availableForSale}
          >
            {selectedVariant?.availableForSale ? "Add to Cart" : "Out of Stock"}
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
