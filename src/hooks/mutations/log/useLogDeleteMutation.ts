import { logKeys, placeKeys, searchKeys } from '@/app/actions/keys';
import { deleteLog } from '@/app/actions/log';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LogDeleteMutationProps {
  logId: string;
}

const useLogDeleteMutation = () => {
  const t = useTranslations('Toast.logDelete');
  const locale = useLocale();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ logId }: LogDeleteMutationProps) => deleteLog(logId),
    onSuccess: ({ success }) => {
      if (success) {
        toast.success(t('success'));
        const keysToInvalidate = [logKeys.all, placeKeys.all, searchKeys.all];

        keysToInvalidate.forEach((key) => {
          queryClient.removeQueries({ queryKey: key, exact: false });
        });
        router.replace(`/${locale}`);
      }
    },
    onError: () => {
      toast.error(t('error'));
    },
  });
};

export default useLogDeleteMutation;
