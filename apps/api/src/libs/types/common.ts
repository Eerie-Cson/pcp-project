import { ObjectId } from "@pcp/object-id";

export type Component = {
  id: ObjectId;
  name: string;
  price: string;
  manufacturer: string;
  partNumber: string;
};
