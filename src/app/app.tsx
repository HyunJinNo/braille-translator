import { useEffect } from 'react';
import { Navigation } from './routes';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from '@src/shared/ui/toast';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ToastProvider>
      <Navigation />
    </ToastProvider>
  );
};
