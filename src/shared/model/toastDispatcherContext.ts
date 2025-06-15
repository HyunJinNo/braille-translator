import { createContext } from 'react';

export const ToastDispatcherContext = createContext({
  setToastMessage: (_toastMessage: string) => {},
});
