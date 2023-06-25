import axios from 'axios';

export interface ActivateEmailPayload {
  uid: string;
  token: string;
}

export async function activateEmail(
  payload: ActivateEmailPayload
): Promise<void> {
  const { data } = await axios.post<void>(
    `https://studapi.teachmeskills.by/auth/users/activation/`,
    payload
  );

  return data;
}
