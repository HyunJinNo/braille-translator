import { tw } from '@src/shared/lib/utils';
import { Filter } from '@src/shared/ui/filter';
import { View } from 'react-native';
import { Camera, CameraDevice } from 'react-native-vision-camera';

interface CameraViewProps {
  device?: CameraDevice;
  isActive: boolean;
  camera: React.RefObject<Camera | null>;
}

export const CameraView = ({ device, isActive, camera }: CameraViewProps) => {
  if (!device) {
    return <View style={tw`w-full flex-1 bg-black`} />;
  }

  return (
    <Filter
      title={
        isActive
          ? '텍스트를 박스에 비춰 주세요'
          : '아래 재생 버튼을 눌러 주세요'
      }>
      <Camera
        style={tw`h-full w-full`}
        device={device}
        isActive={isActive}
        photo={true}
        ref={camera}
      />
    </Filter>
  );
};
