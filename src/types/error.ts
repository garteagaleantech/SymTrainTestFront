import { AxiosError } from 'axios';

export type ErrorResponse = AxiosError<{
  status: number;
  message: string;
}>;
