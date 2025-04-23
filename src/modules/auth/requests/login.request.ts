import * as z from 'zod';

export interface ILoginRequest {
  username: string;
  password: string;
}

export class LoginRequest {
  username: string;
  password: string;
  
  constructor(request: ILoginRequest) {
    this.username = request.username;
    this.password = request.password;
  }

  static schema() {
    return z.object({
      username: z.string().min(1, 'Username harus diisi'),
      password: z.string().min(1, 'Password harus diisi'),
    });
  }

  static createFromJson(json: ILoginRequest) {
    return new LoginRequest(json);
  }
}