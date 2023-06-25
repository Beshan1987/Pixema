import axios, { type AxiosResponse } from 'axios';

export interface CreateUserResponse {
  username: string;
  email: string;
  id: number;
}

interface CreateUserPayload {
  username: string;
  password: string;
  email: string;
}

export async function createUser(
  user: CreateUserPayload
): Promise<CreateUserResponse> {
  const { data } = await axios.post<
    CreateUserResponse,
    AxiosResponse<CreateUserResponse>,
    CreateUserPayload
  >(`https://studapi.teachmeskills.by/auth/users/`, user);

  return data;
}
