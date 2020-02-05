import {User} from './User';

export class Company {
  author: User;
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
    urls?: String[]
  )
}
