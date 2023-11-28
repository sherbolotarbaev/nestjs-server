type UserRole = "USER" | "ADMIN";

type UserGender = "MALE" | "FEMALE";

type Company = {
  id: number;
  name?: string | null;
  domain?: string | null;
  userId: number;
};

type Location = {
  id: number;
  ip?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  userId: number;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  gender?: UserGender | null;
  bio?: string | null;
  nationality?: string | null;
  email: string;
  username: string;
  phone?: string | null;
  photo?: string | null;
  password: string;
  refreshToken?: string | null;
  isActive: boolean;
  isVerified: boolean;
  lastVisit: Date;
  createdAt: Date;
  updatedAt: Date;
  company: Company[];
  location: Location[];
};
