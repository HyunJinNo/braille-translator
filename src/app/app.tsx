import { useEffect } from 'react';
import { Navigation } from './routes';
import SplashScreen from 'react-native-splash-screen';
import { ToastProvider } from '@src/shared/ui/toast';
import { FontSizeProvider } from '@src/shared/ui/provider/FontSizeProvider';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <FontSizeProvider>
      <ToastProvider>
        <Navigation />
      </ToastProvider>
    </FontSizeProvider>
  );
};
