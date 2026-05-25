// API Request/Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// User types
export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  image: string | null;
  plan: "FREE" | "PRO" | "ENTERPRISE";
  isOnboarded: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Subscription types
export interface SubscriptionDetails {
  id: string;
  userId: string;
  plan: "FREE" | "PRO" | "ENTERPRISE";
  status: "active" | "canceled" | "expired";
  billingCycle: "monthly" | "yearly";
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  startDate: Date;
  endDate: Date | null;
  renewalDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Plan types
export interface PlanInfo {
  name: string;
  price: number;
  features: string[];
  requestLimit: number;
  storageLimit: number;
}

// Feature access types
export interface FeatureAccess {
  hasAccess: boolean;
  requiredPlan: string | null;
  currentPlan: string;
}

// Error types
export interface AuthError {
  code:
    | "INVALID_CREDENTIALS"
    | "USER_NOT_FOUND"
    | "EMAIL_ALREADY_EXISTS"
    | "INVALID_TOKEN"
    | "TOKEN_EXPIRED"
    | "SESSION_EXPIRED"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "SERVER_ERROR";
  message: string;
}
