import { Request } from "express";

export interface UserRequest extends Request {
  user: string;
}

export interface CollectionRequest extends Request {
  email: string;
  collectionName: string;
  OrginalContent: string;
  TranslatedContent: string;
}

export interface dataObj {
  collectionName: string;
  words: string[];
}
