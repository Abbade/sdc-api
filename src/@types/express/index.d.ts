declare namespace Express {
  export interface Request {
    id_user: number;
    permissions: string[];
  }
}
