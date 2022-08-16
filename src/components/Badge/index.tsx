import React from 'react';

export const Badge: React.FC = () => {
  return (
    <div className='h-full bg-desktop-gradient rounded-[10px] flex flex-col justify-end p-[24px]'>
      <p className='font-bold text-white text-[20px]'>Frontend Mentor</p>
      <p className='font-regular text-white text-[15px] opacity-75'>Feedback Board</p>
    </div>
  );
};
