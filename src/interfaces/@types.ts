import { Request } from "express";
import { RowDataPacket } from "mysql2";

export interface UserRequest extends Request {
  user?: string;
}

export interface dataObj {
  collection: collectionIndex[];
}

export interface collectionIndex {
  [index: number]: string;
  name: string;
  words: wordsArray | string;
}

export interface wordsArray {
  [index: number]: string;
  word: string[];
}

export interface queryId extends RowDataPacket {
  passwd: string;
  _collectionId: number;
  _id: number;
  name: string;
  hashedPassword: string;
}
