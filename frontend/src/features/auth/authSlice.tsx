// src/features/auth/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from "api";
import qs from "qs";

interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  csrfToken: string | null;
  isLoggedIn: boolean;
  userEmail: string | null;
  isAdmin: boolean;
}

const initialState: AuthState = {
  csrfToken: null,
  isLoggedIn: false,
  userEmail: null,
  isAdmin: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginPayload) => {
    const formData = qs.stringify({
      username,
      password,
    });

    const response: any = await api.post("/users/login", formData);
    return {
      csrfToken: response.data.csrf,
      userEmail: username,
      isAdmin: response.data.isAdmin,
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.csrfToken = null;
      state.isLoggedIn = false;
      state.userEmail = null;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ csrfToken: string; userEmail: string; isAdmin: boolean }>) => {
      state.csrfToken = action.payload.csrfToken;
      state.isLoggedIn = true;
      state.userEmail = action.payload.userEmail;
      state.isAdmin =  action.payload.isAdmin;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
