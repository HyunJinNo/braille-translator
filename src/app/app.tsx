import { useEffect } from 'react';
import { Navigation } from './routes';
import SplashScreen from 'react-native-splash-screen';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Navigation />;
};
