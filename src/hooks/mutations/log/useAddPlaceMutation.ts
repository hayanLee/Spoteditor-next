import { logKeys, placeKeys } from '@/app/actions/keys';
import { addPlacesToExistingLog } from '@/app/actions/log-register';
import { AddedPlaceValues } from '@/types/log';
import { uploadPlacesOptimized } from '@/utils/imageUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface AddPlaceMutationProps {
  values: AddedPlaceValues[];
  logId: string;
  existingOrderCount?: number; // 기존 장소 + 1 부터 번호 매기기 위해
}

// 이미지 업로드
// db 갱신 (place, place_images)
const useAddPlaceMutation = () => {
  const queryClient = useQueryClient();
  const tToast = useTranslations('Toast.logCreate');
  return useMutation({
    mutationFn: async ({ values, logId, existingOrderCount = 0 }: AddPlaceMutationProps) => {
      /* 장소 이미지 업로드 */
      const { placeDataList, placeImageDataList } = await uploadPlacesOptimized(
        values,
        logId,
        existingOrderCount
      );

      return await addPlacesToExistingLog(placeDataList, placeImageDataList);
    },
    onSuccess: ({ success }) => {
      if (success) {
        toast.success(tToast('placeAdded'));

        const keysToInvalidate = [logKeys.all, placeKeys.all];

        keysToInvalidate.forEach((key) => {
          queryClient.removeQueries({ queryKey: key, exact: false });
        });
      }
    },
    onError: (error) => {
      console.error('장소 추가 실패:', error);
      toast.error(tToast('placeAddedError'));
    },
  });
};

export default useAddPlaceMutation;
