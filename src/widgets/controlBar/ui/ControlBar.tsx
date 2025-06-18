import { tw } from '@src/shared/lib/utils';
import { View } from 'react-native';
import { ControlBarButton } from './ControlBarButton';

interface ControlBarProps {
  isEditButtonActive?: boolean;
  isPlayButtonActive: boolean;
  isSnapshotButtonActive: boolean;
  isStopButtonActive: boolean;
  isSaveButtonActive?: boolean;
  onEditButtonPress?: () => void;
  onPlayButtonPress: () => void;
  onSnapshotButtonPress: () => void;
  onStopButtonPress: () => void;
  onSaveButtonPress?: () => void;
}

export const ControlBar = ({
  isEditButtonActive,
  isPlayButtonActive,
  isSnapshotButtonActive,
  isStopButtonActive,
  isSaveButtonActive,
  onEditButtonPress,
  onPlayButtonPress,
  onSnapshotButtonPress,
  onStopButtonPress,
  onSaveButtonPress,
}: ControlBarProps) => {
  return (
    <View style={tw`h-15 flex flex-row items-center gap-3 bg-white`}>
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
      {isSaveButtonActive !== undefined && onSaveButtonPress !== undefined && (
        <ControlBarButton
          imageSource={require('@assets/icon/save-icon-clickable.png')}
          pressedImageSource={require('@assets/icon/save-icon-active.png')}
          disabledImageSource={require('@assets/icon/save-icon-disabled.png')}
          isActive={isSaveButtonActive}
          onPress={onSaveButtonPress}
        />
      )}
    </View>
  );
};
