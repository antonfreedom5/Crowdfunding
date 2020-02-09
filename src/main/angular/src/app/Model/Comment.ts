export class Comment {
  id?: number;
  companyID?: number;
  sender?: string;
  content?: string;
  type?: string;
  avatarURL?: string;
  peopleWhoLikedIDs?: number[];
  peopleWhoDislikedIDs?: number[];
  // @ts-ignore
  constructor(
    id?: number,
    companyID?: number,
    sender?: string,
    content?: string,
    type?: string,
    avatarURL?: string,
    peopleWhoLikedIDs?: number[],
    peopleWhoDislikedIDs?: number[]
  )
}
