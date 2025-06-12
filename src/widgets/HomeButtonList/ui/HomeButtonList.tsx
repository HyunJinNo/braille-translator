import { tw } from '@src/shared/lib/utils';
import { HomeButton } from '@src/shared/ui/button';
import { FlatList } from 'react-native';
import { HOME_BUTTON_DATA } from '../config/HomeButtonData';
import { useNavigation } from '@react-navigation/native';

export const HomeButtonList = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      contentContainerStyle={tw`flex h-full min-w-full flex-col justify-center gap-5 px-4`}
      columnWrapperStyle={tw`gap-5`}
      data={HOME_BUTTON_DATA}
      renderItem={({ item }) => (
        <HomeButton
          source={item.source}
          title={item.title}
          description={item.description}
          buttonStyle={item.buttonStyle}
          rippleColor={item.rippleColor}
          textColor={item.textColor}
          onPress={() => navigation.navigate(item.screen)}
        />
      )}
      keyExtractor={(item) => item.description.join(' ')}
      numColumns={2}
    />
  );
};
