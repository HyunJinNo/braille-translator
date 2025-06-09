import { tw } from '@src/shared/lib/utils';
import { View } from 'react-native';
import { ControlBarButton } from './ControlBarButton';

interface ControlBarProps {
  isSpeakButtonActive: boolean;
  isVoiceButtonActive: boolean;
  isHighlightButtonActive: boolean;
  isEditButtonActive: boolean;
  isPlayButtonActive: boolean;
  isSnapshotButtonActive: boolean;
  isStopButtonActive: boolean;
}

export const ControlBar = ({
  isSpeakButtonActive,
  isVoiceButtonActive,
  isHighlightButtonActive,
  isEditButtonActive,
  isPlayButtonActive,
  isSnapshotButtonActive,
  isStopButtonActive,
}: ControlBarProps) => {
  return (
    <View style={tw`h-15 flex flex-row items-center gap-3 bg-white`}>
      <ControlBarButton
        imageSource={require('@assets/icon/speak-icon-clickable.png')}
        pressedImageSource={require('@assets/icon/speak-icon-active.png')}
        disabledImageSource={require('@assets/icon/speak-icon-disabled.png')}
        isActive={isSpeakButtonActive}
        onPress={() => {}}
      />
      <ControlBarButton
        imageSource={require('@assets/icon/voice-icon-clickable.png')}
        pressedImageSource={require('@assets/icon/voice-icon-active.png')}
        disabledImageSource={require('@assets/icon/voice-icon-disabled.png')}
        isActive={isVoiceButtonActive}
        onPress={() => {}}
      />
      <ControlBarButton
        imageSource={require('@assets/icon/highlight-icon-clickable.png')}
        pressedImageSource={require('@assets/icon/highlight-icon-active.png')}
        disabledImageSource={require('@assets/icon/highlight-icon-disabled.png')}
        isActive={isHighlightButtonActive}
        onPress={() => {}}
      />
      <ControlBarButton
        imageSource={require('@assets/icon/edit-icon-clickable.png')}
        pressedImageSource={require('@assets/icon/edit-icon-active.png')}
        disabledImageSource={require('@assets/icon/edit-icon-disabled.png')}
        isActive={isEditButtonActive}
        onPress={() => {}}
      />
      {isPlayButtonActive && (
        <ControlBarButton
          imageSource={require('@assets/icon/play-icon-clickable.png')}
          pressedImageSource={require('@assets/icon/play-icon-active.png')}
          disabledImageSource={require('@assets/icon/play-icon-disabled.png')}
          isActive={isPlayButtonActive}
          onPress={() => {}}
        />
      )}
      {isSnapshotButtonActive && (
        <ControlBarButton
          imageSource={require('@assets/icon/snapshot-icon-clickable.png')}
          pressedImageSource={require('@assets/icon/snapshot-icon-active.png')}
          disabledImageSource={require('@assets/icon/snapshot-icon-disabled.png')}
          isActive={isSnapshotButtonActive}
          onPress={() => {}}
        />
      )}
      <ControlBarButton
        imageSource={require('@assets/icon/stop-icon-clickable.png')}
        pressedImageSource={require('@assets/icon/stop-icon-active.png')}
        disabledImageSource={require('@assets/icon/stop-icon-disabled.png')}
        isActive={isStopButtonActive}
        onPress={() => {}}
      />
    </View>
  );
};
