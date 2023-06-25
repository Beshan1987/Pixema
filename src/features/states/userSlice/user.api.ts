import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosHeaders, type AxiosResponse } from 'axios';

import { type JWTToken, type User } from '~/entities/User';
import { type CreateTokenPayload } from '~/features/states/userSlice/user.types';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async function (_, thunkAPI) {
    const accessToken = localStorage.getItem('@blog/access-token');

    if (!accessToken) {
      throw new Error('Unauthorized');
    }

    const headers = new AxiosHeaders();

    headers.set('Authorization', `Bearer ${accessToken}`);
    const { data } = await axios.get<User>(
      `https://studapi.teachmeskills.by/auth/users/me/`,
      {
        headers,
        signal: thunkAPI.signal
      }
    );

    return data;
  }
);

export const createTokens = createAsyncThunk(
  'user/createTokens',
  async function (payload: CreateTokenPayload, thunkAPI) {
    const { data } = await axios.post<
      JWTToken,
      AxiosResponse<JWTToken>,
      CreateTokenPayload
    >(`https://studapi.teachmeskills.by/auth/jwt/create/`, payload, {
      signal: thunkAPI.signal
    });

    return data;
  }
);
