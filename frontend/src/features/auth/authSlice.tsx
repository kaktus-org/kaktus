// src/features/auth/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from "api"; // Ensure this points to your API utility file
import qs from "qs";

interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  csrfToken: string | null;
  isLoggedIn: boolean;
  userEmail: string | null;
}

interface LoginResponse {
    csrf: string,
}

const initialState: AuthState = {
  csrfToken: null,
  isLoggedIn: false,
  userEmail: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: LoginPayload) => {
    const formData = qs.stringify({
      username,
      password,
    });

    const response: LoginResponse = await api.post("/users/login", formData);
    return {
      csrfToken: response.csrf,
      userEmail: username,
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action: PayloadAction<{ csrfToken: string; userEmail: string }>) => {
      state.csrfToken = action.payload.csrfToken;
      state.isLoggedIn = true;
      state.userEmail = action.payload.userEmail;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
