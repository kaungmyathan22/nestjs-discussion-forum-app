type JwtPayload = {
  id: number;
};

type EmailVerificationJwtPayload = {
  email: string;
};

declare namespace Express {
  export interface Request {
    user?: any;
  }
}
