export interface IMessages {
  firstUserId: number;
  secondUserId: number;
  id: number;
  theme: string;
  messages: IMessage[];
}

export interface IMessage {
  id:number;
  timestamp: Date;
  authorId: number;
  text: string;
  statement: boolean;
}
