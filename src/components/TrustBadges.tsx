import { ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    { icon: ShieldCheck, label: "Secure Checkout" },
    { icon: Truck, label: "Free Shipping" },
    { icon: RotateCcw, label: "30-Day Returns" },
    { icon: CreditCard, label: "Safe Payment" },
  ];

  return (
    <div className="bg-secondary/50 border-b border-border">
      <div className="container py-2">
        <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
          {badges.map((badge, index) => (
            <div key={index} className="trust-badge">
              <badge.icon className="w-4 h-4 text-primary" />
              <span className="hidden sm:inline">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;
