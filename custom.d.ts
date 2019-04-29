declare namespace Express {
   export interface Request {
       session: any,
       json: Function,
       sessionID: string
   }
}