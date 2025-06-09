import { tw } from '@src/shared/lib/utils';
import { Image, Pressable, View } from 'react-native';

export const ControlBar = () => {
  return (
    <View style={tw`h-15 flex flex-row items-center gap-3 bg-white`}>
      <Pressable>
        {({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/speak-icon-active.png')
                : require('@assets/icons/speak-icon-clickable.png')
            }
          />
        )}
      </Pressable>
      <Pressable>
        {({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/voice-icon-active.png')
                : require('@assets/icons/voice-icon-clickable.png')
            }
          />
        )}
      </Pressable>
      <Pressable>
        {({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/highlight-icon-active.png')
                : require('@assets/icons/highlight-icon-clickable.png')
            }
          />
        )}
      </Pressable>
      <Pressable>
        {({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/edit-icon-active.png')
                : require('@assets/icons/edit-icon-clickable.png')
            }
          />
        )}
      </Pressable>
      <Pressable>
        {({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/play-icon-active.png')
                : require('@assets/icons/play-icon-clickable.png')
            }
          />
        )}
      </Pressable>
      <Pressable>
        {({ pressed }) => (
          <Image
            style={tw`h-10 w-10`}
            source={
              pressed
                ? require('@assets/icons/stop-icon-active.png')
                : require('@assets/icons/stop-icon-clickable.png')
            }
          />
        )}
      </Pressable>
    </View>
  );
};
