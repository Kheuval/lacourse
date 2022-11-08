import type { User } from "@/Domain/User/UserInterface";

export interface AuthServiceInterface {
  login(username: string, password: string): Promise<void>;
  logout(): void;
  getUser(token: string): User;
}
