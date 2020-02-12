import {User} from './User';

export class Company {
  id?: number;
  companyName?: String;
  goal?: number;
  shortDisc?: String;
  fullDisc?: String;
  videoLink?: String;
  durationDate?: Date;
  author?: User;
  categories?: String[];
  picURLs?: String[];
  reached?: number;
  // @ts-ignore
  constructor(
    id?: number,
    companyName?: String,
    goal?: number,
    shortDisc?: String,
    fullDisc?: String,
    videoLink?: String,
    durationDate?: Date,
    author?: User,
    categories?: String[],
    picURLs?: String[],
    reached?: number
  )
}
