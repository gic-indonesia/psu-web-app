import axios from "axios";
import { LoginRequest } from "../requests";

export class AuthService {
  login(request: LoginRequest) {
    return axios.post('/api/login', request);
  }
}