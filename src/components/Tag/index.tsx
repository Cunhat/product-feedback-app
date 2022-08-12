import React, { useState } from 'react';

type TagProps = {
  text: string;
  isActive: boolean;
};

export const Tag: React.FC<TagProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(props.isActive);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        isActive ? 'bg-custom-blue' : 'bg-light-gray'
      }  rounded-[10px] w-[48px] h-[30px] flex justify-center items-center hover:bg-light-violet hover:text-custom-blue hover:cursor-pointer`}
    >
      <p className={`${isActive ? 'text-white' : 'text-custom-blue'} text-[13px] font-bold`}>{props.text}</p>
    </div>
  );
};
