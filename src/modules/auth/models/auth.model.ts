/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IUserDataModel {
  id: string;
  fullname: string;
  username: string;
  nik: string;
  company_list: any[]
}

export class UserDataModel {
  id: string;
  fullname: string;
  username: string;
  nik: string;
  company_list: any[]

  constructor(model: IUserDataModel) {
    this.id = model.id;
    this.fullname = model.fullname;
    this.username = model.username;
    this.nik = model.nik;
    this.company_list = model.company_list;
  }
}

export interface ILoginDataModel extends IUserDataModel {
  accessToken: string;
  refreshToken: string;
  role: string;
  ability: any[];
  tokenExpiresIn: number;
}

export class LoginDataModel extends UserDataModel {
  accessToken: string;
  refreshToken: string;
  role: string;
  ability: any[];
  tokenExpiresIn: number;

  constructor(model: ILoginDataModel) {
    super(model);
    this.accessToken = model.accessToken;
    this.refreshToken = model.refreshToken;
    this.role = model.role;
    this.ability = model.ability;
    this.tokenExpiresIn = model.tokenExpiresIn;
  }

  static createFromJson(json: ILoginDataModel) {
    return new LoginDataModel(json);
  }
}