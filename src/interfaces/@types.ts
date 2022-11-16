import { Request } from "express";
import { RowDataPacket } from "mysql2";

export interface UserRequest extends Request {
  user?: string;
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

export interface queryId extends RowDataPacket {
  "0": _id;
  hashedPassword: string;
}

type _id = {
  passwd: queryId;
  _collectionId: queryId;
  _id: queryId;
};
