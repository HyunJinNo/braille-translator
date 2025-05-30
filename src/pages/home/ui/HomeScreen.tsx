import { BACKEND_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { tw } from '@src/shared/lib/utils';
import { Button, Image, Text, View } from 'react-native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home</Text>
      <Text>{BACKEND_URL}</Text>
      <Image
        style={tw`aspect-2/3 h-96`}
        source={require('@assets/background.jpg')}
      />
      <Button
        title="설정화면으로"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
};
