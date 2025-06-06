import { PublicUser } from '@/types/api/user';
import LogProfile from './LogProfile';

interface LogAuthorIntroProps {
  user: PublicUser;
  logDescription: string;
}

const LogAuthorIntro = ({ user, logDescription }: LogAuthorIntroProps) => {
  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] py-5 space-y-1">
      <LogProfile
        userId={String(user?.user_id)}
        userImage={String(user?.image_url)}
        userNickname={String(user?.nickname)}
      />
      <pre className="text-light-400 text-text-sm web:text-text-lg py-1.5 pre">
        {logDescription}
      </pre>
    </div>
  );
};

export default LogAuthorIntro;
