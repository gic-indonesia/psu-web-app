import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoginDataModel } from "../models/auth.model";
import { StorageService } from '@shared/local-storage';
const storageService = StorageService();

interface AuthState {
  userData: LoginDataModel | undefined;
  accessToken: string | undefined;
  tokenExpiresIn: string | undefined;
}

function initialUser() {
  const item = (typeof window !== 'undefined') ? storageService.get('userData') : undefined;
  return item && typeof item === 'string' ? new LoginDataModel(JSON.parse(item)) : undefined;
}

const initialState: AuthState = {
  userData: initialUser(),
  accessToken: undefined,
  tokenExpiresIn: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleLogin: (state, action: PayloadAction<LoginDataModel>) => {
      const expiredTime = (new Date(+(new Date()).getTime() + (action.payload.tokenExpiresIn * 1000))).getTime();
      state.tokenExpiresIn = expiredTime.toString();
      storageService.set('tokenExpiredTime', expiredTime.toString());

      state.userData = action.payload;
      state.accessToken = action.payload.accessToken;
      storageService.set('userData', JSON.stringify(action.payload));
      storageService.set('accessToken', action.payload.accessToken);
    },
    handleLogout: (state) => {
      state.tokenExpiresIn = undefined;
      state.accessToken = undefined;
      state.userData = undefined;
      storageService.destroy('tokenExpiredTime');
      storageService.destroy('userData');
      storageService.destroy('accessToken');
    }
  }
})

export const {
  handleLogin,
  handleLogout,
} = authSlice.actions;

export default authSlice.reducer;