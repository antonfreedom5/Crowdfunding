import {Company} from './Company';

export class Bonus {

  id?: number;
  description?: String;
  cost?: number;
  company?: Company;

  // @ts-ignore
  constructor(
    id?: number,
    description?: String,
    cost?: number,
    company?: Company
  )
}
