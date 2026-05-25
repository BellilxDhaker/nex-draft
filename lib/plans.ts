// Plan limits and features
export const PLAN_LIMITS = {
  FREE: {
    name: "Free",
    price: 0,
    features: ["Basic features", "Limited usage"],
    requestLimit: 100,
    storageLimit: 1, // GB
  },
  PRO: {
    name: "Pro",
    price: 29,
    features: ["All features", "Priority support", "Advanced analytics"],
    requestLimit: 10000,
    storageLimit: 100, // GB
  },
  ENTERPRISE: {
    name: "Enterprise",
    price: 299,
    features: ["Custom features", "24/7 support", "SLA"],
    requestLimit: Infinity,
    storageLimit: Infinity,
  },
};

export const DEFAULT_PLAN = "FREE";

// Feature access based on plan
export const FEATURE_ACCESS = {
  "advanced-analytics": ["PRO", "ENTERPRISE"],
  "api-access": ["PRO", "ENTERPRISE"],
  "team-collaboration": ["ENTERPRISE"],
  "custom-branding": ["ENTERPRISE"],
};

export function canAccessFeature(plan: string, feature: string): boolean {
  return (
    FEATURE_ACCESS[feature as keyof typeof FEATURE_ACCESS]?.includes(plan) ??
    false
  );
}

export function getPlanDetails(plan: string) {
  return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.FREE;
}
