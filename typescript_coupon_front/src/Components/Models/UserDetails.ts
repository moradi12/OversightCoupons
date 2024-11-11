export interface UserDetails {
  email: string;
  password: string;
  id: number;
  role?: "admin" | "user"; 
}
