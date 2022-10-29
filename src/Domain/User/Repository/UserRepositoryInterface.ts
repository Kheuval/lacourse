import type { User } from "../UserInterface";

export interface UserRepository {
  findOneByIri(iri: string): Promise<User | null>;
  updateOneByIri(iri: string, data: object): Promise<User>;
  deleteOneByIri(iri: string): Promise<void>;
}
