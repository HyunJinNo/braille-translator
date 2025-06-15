import { tw } from '@src/shared/lib/utils';
import { createContext, useCallback, useState } from 'react';
import { Text, View } from 'react-native';

export const ToastDispatcherContext = createContext({
  setToastMessage: (_toastMessage: string) => {},
});

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [message, setMessage] = useState('');

  const setToastMessage = useCallback((toastMessage: string) => {
    setMessage(toastMessage);
  }, []);

  return (
    <ToastDispatcherContext value={{ setToastMessage }}>
      {children}
      <View style={tw`bottom-4 flex items-center justify-center px-4`}>
        <Text style={tw`rounded-full bg-black px-4 py-2 text-sm text-white`}>
          {message}
        </Text>
      </View>
    </ToastDispatcherContext>
  );
};
