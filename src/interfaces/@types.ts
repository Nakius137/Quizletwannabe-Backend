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
  collection: collectionIndex[];
}

interface collectionIndex {
  [index: number]: string;
  values: collectionObj;
}

interface collectionObj {
  name: string;
  words: wordsArray[] | string;
}

interface wordsArray {
  [index: number]: string;
  word: string[];
}

export interface queryId extends RowDataPacket {
  [index: number]: _id;
  hashedPassword: string;
}

type _id = {
  passwd: queryId;
  _collectionId: queryId;
  _id: queryId;
  name: string;
};
