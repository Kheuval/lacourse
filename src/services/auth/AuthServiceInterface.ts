import type { User } from "@/typescript/interfaces/UserInterface";

export interface AuthServiceInterface {
  login(username: string, password: string): Promise<void>;
  logout(): void;
  getUser(token: string): User;
}
