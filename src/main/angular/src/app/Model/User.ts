export class User {
  id?: number;
  username?: string;
  avatarURL?:string;
  email?: string;
  roles?: string[];
  // @ts-ignore
  constructor(
  id?: number,
  username?: string,
  avatarURL?:string,
  email?: string,
  roles?: string[])
}
