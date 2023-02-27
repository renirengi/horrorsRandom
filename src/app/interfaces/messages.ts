export interface IDialog {
  firstUserId: number;
  secondUserId: number;
  id: number;
  theme: string;
  messages: IMessage[];
  elected: boolean
}

export interface IMessage {
  id:number;
  timestamp?: Date;
  authorId: number;
  text: string;
  statement: boolean;
}
