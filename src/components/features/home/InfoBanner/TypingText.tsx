'use client';
import { TypeAnimation } from 'react-type-animation';

const TypingText = () => {
  return (
    <TypeAnimation
      sequence={[
        '여행지에서, 익숙한 동네에서—\n당신의 취향으로 하루를 그려보세요',
        1200,
        'Traveling or staying local—\nshape your day with what you love',
        1200,
      ]}
      speed={40}
      className="font-bold text-sm web:text-xl text-black whitespace-pre-line"
      repeat={Infinity}
    />
  );
};

export default TypingText;
