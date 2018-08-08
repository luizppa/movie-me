import { User } from './user.model'

export class Comment {

  constructor(
    public id: number,
    public movie_id: number,
    public user: User,
    public text: string,
    public likes: number
  ){}
}
