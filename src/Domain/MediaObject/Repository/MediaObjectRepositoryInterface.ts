import type { MediaObject } from "../MediaObjectInterface";

export interface MediaObjectRepository {
  findOneByIri(iri: string): Promise<MediaObject | null>;
  create(mediaObject: FormData): Promise<MediaObject>;
}
