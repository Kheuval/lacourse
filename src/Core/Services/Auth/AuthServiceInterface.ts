import type { User } from "@/Domain/User/Interfaces/UserInterface";

export interface AuthServiceInterface {
  login(username: string, password: string): Promise<void>;
  logout(): void;
  getUser(token: string): User;
}
