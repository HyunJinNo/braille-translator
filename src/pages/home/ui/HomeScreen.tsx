import { BACKEND_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home</Text>
      <Text>{BACKEND_URL}</Text>
      <Button
        title="설정화면으로"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
};
