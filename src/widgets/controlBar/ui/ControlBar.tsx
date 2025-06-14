import { tw } from '@src/shared/lib/utils';
import { View } from 'react-native';
import { ControlBarButton } from './ControlBarButton';

interface ControlBarProps {
  isHighlightButtonActive: boolean;
  isEditButtonActive?: boolean;
  isPlayButtonActive: boolean;
  isSnapshotButtonActive: boolean;
  isStopButtonActive: boolean;
  onHighlightButtonPress: () => void;
  onEditButtonPress?: () => void;
  onPlayButtonPress: () => void;
  onSnapshotButtonPress: () => void;
  onStopButtonPress: () => void;
}

export const ControlBar = ({
  isHighlightButtonActive,
  isEditButtonActive,
  isPlayButtonActive,
  isSnapshotButtonActive,
  isStopButtonActive,
  onHighlightButtonPress,
  onEditButtonPress,
  onPlayButtonPress,
  onSnapshotButtonPress,
  onStopButtonPress,
}: ControlBarProps) => {
  return (
    <View style={tw`h-15 flex flex-row items-center gap-3 bg-white`}>
      <ControlBarButton
        imageSource={require('@assets/icon/highlight-icon-clickable.png')}
        pressedImageSource={require('@assets/icon/highlight-icon-active.png')}
        disabledImageSource={require('@assets/icon/highlight-icon-disabled.png')}
        isActive={isHighlightButtonActive}
        onPress={onHighlightButtonPress}
      />
      {isEditButtonActive !== undefined && onEditButtonPress !== undefined && (
        <ControlBarButton
          imageSource={require('@assets/icon/edit-icon-clickable.png')}
          pressedImageSource={require('@assets/icon/edit-icon-active.png')}
          disabledImageSource={require('@assets/icon/edit-icon-disabled.png')}
          isActive={isEditButtonActive}
          onPress={onEditButtonPress}
        />
      )}
      <ControlBarButton
        imageSource={require('@assets/icon/play-icon-clickable.png')}
        pressedImageSource={require('@assets/icon/play-icon-active.png')}
        disabledImageSource={require('@assets/icon/play-icon-disabled.png')}
        isActive={isPlayButtonActive}
        onPress={onPlayButtonPress}
      />
      <ControlBarButton
        imageSource={require('@assets/icon/snapshot-icon-clickable.png')}
        pressedImageSource={require('@assets/icon/snapshot-icon-active.png')}
        disabledImageSource={require('@assets/icon/snapshot-icon-disabled.png')}
        isActive={isSnapshotButtonActive}
        onPress={onSnapshotButtonPress}
      />
      <ControlBarButton
        imageSource={require('@assets/icon/stop-icon-clickable.png')}
        pressedImageSource={require('@assets/icon/stop-icon-active.png')}
        disabledImageSource={require('@assets/icon/stop-icon-disabled.png')}
        isActive={isStopButtonActive}
        onPress={onStopButtonPress}
      />
    </View>
  );
};
