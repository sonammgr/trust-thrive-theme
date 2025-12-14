import StarRating from "./StarRating";
import { Quote } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  image?: string;
  productImage?: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
}

const CustomerReviews = ({ reviews }: CustomerReviewsProps) => {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real reviews from real customers. See why thousands trust DEMANDinss for their smart home needs.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {review.image ? (
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-lg">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground">{review.name}</p>
                    {review.verified && (
                      <p className="text-xs text-success flex items-center gap-1">
                        <span>✓</span> Verified Purchase
                      </p>
                    )}
                  </div>
                </div>
                <Quote className="w-8 h-8 text-primary/20" />
              </div>

              {/* Rating */}
              <div className="mb-3">
                <StarRating rating={review.rating} />
              </div>

              {/* Review Text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                "{review.text}"
              </p>

              {/* Product Image */}
              {review.productImage && (
                <div className="mt-4 pt-4 border-t border-border">
                  <img
                    src={review.productImage}
                    alt="Product"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
              )}

              {/* Date */}
              <p className="text-xs text-muted-foreground mt-3">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
