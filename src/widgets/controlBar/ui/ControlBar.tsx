import { tw } from '@src/shared/lib/utils';
import { Image, Pressable, View } from 'react-native';

export const ControlBar = () => {
  return (
    <View
      style={tw`h-15 flex flex-row items-center gap-3 border-b border-b-gray-400 bg-white`}>
      <Pressable
        children={({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/speak-icon.png')
                : require('@assets/icons/speak-icon-clickable.png')
            }
          />
        )}
      />
      <Pressable
        children={({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/voice-icon.png')
                : require('@assets/icons/voice-icon-clickable.png')
            }
          />
        )}
      />
      <Pressable
        children={({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/highlight-icon.png')
                : require('@assets/icons/highlight-icon-clickable.png')
            }
          />
        )}
      />
      <Pressable
        children={({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/edit-icon.png')
                : require('@assets/icons/edit-icon-clickable.png')
            }
          />
        )}
      />
      <Pressable
        children={({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/play-icon.png')
                : require('@assets/icons/play-icon-clickable.png')
            }
          />
        )}
      />
      <Pressable
        children={({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/pause-icon.png')
                : require('@assets/icons/pause-icon-clickable.png')
            }
          />
        )}
      />
    </View>
  );
};
