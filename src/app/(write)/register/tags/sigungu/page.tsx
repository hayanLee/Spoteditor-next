import { RegisterFooter } from '@/components/common/Footer';
import { PageIntro, TagGroup } from '@/components/features/log/register/tags';
import { REGISTER_PATHS } from '@/constants/pathname';

const SigunguSelectionPage = () => {
  return (
    <>
      <PageIntro title="시/군/구를 선택해주세요." des="메인 시/군/구 도시를 선택해주세요." />
      <div className="grow">
        <TagGroup title="시/군/구" type="sigungu" />
      </div>
      <RegisterFooter tagTargets={['sigungu']} nextPath={REGISTER_PATHS.LOG} />
    </>
  );
};

export default SigunguSelectionPage;
