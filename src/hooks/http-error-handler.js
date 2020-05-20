import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState('');

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError(null);
    return req;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    res => res, // return response
    err => {
      setError(err);
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    return () => {
      // remove interceptor we do not need anymore
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [httpClient, reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
