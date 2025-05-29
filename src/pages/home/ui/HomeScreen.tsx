import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';
import { tw } from '../../../shared/lib/utils';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text style={tw`ml-5 mt-10 text-blue-500`}>Home</Text>
      <Button
        title="설정화면으로"
        onPress={() => navigation.navigate('Setting')}
      />
    </View>
  );
};
