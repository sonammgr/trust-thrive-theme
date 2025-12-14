import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  showCount?: boolean;
  count?: number;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({ rating, maxRating = 5, showCount = false, count = 0, size = "md" }: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="inline-flex items-center gap-1">
      <div className="flex star-rating">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={`${sizeClasses[size]} fill-current`} />
        ))}
        {hasHalfStar && <StarHalf className={`${sizeClasses[size]} fill-current`} />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className={`${sizeClasses[size]} text-muted-foreground/30`} />
        ))}
      </div>
      {showCount && (
        <span className="text-xs text-muted-foreground ml-1">({count.toLocaleString()})</span>
      )}
    </div>
  );
};

export default StarRating;
