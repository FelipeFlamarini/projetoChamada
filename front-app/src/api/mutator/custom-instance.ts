import Axios, { AxiosError, AxiosRequestConfig } from "axios";
// import { useOauthGoogleJwtCallbackApiAuthGoogleCallbackGet } from "@/chamada";

// mudar para es2020
const URL_CEll =
  import.meta.env.VITE_FASTAPI_APP_URL || "http://localhost:2010";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: URL_CEll,
  withCredentials: true,
}); // use your own URL here or environment variable



// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-expect-error: Adding cancel method to promise object
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;

// Or, in case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
//  export type BodyType<BodyData> = CamelCase<BodyData>;
