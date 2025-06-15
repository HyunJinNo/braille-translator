import { tw } from '@src/shared/lib/utils';
import { ToastDispatcherContext } from '@src/shared/model';
import { useCallback, useMemo, useState } from 'react';
import { Animated, useAnimatedValue, View } from 'react-native';

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [message, setMessage] = useState('');
  const opacity = useAnimatedValue(0);

  const setToastMessage = useCallback(
    (toastMessage: string) => {
      setMessage(toastMessage);

      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 2000);
      });
    },
    [opacity],
  );

  const memoizedDispatcher = useMemo(
    () => ({ setToastMessage }),
    [setToastMessage],
  );

  return (
    <ToastDispatcherContext value={memoizedDispatcher}>
      {children}
      <View
        style={tw`absolute bottom-8 left-4 right-4 flex items-center justify-center px-4`}>
        <Animated.Text
          style={tw.style(
            'min-w-40 rounded-lg bg-black px-4 py-2 text-sm text-white',
            { opacity },
          )}>
          {message}
          {message}
          {message}
        </Animated.Text>
      </View>
    </ToastDispatcherContext>
  );
};
