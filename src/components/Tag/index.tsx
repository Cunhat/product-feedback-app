import React, { useState } from 'react';

type TagProps = {
  text: string;
  isActive: boolean;
  disabled: boolean;
};

export const Tag: React.FC<TagProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(props.isActive);

  const handleClick = () => {
    if (props.disabled) return;
    setIsActive(!isActive);
  };

  return (
    <div
      onClick={handleClick}
      className={`${
        isActive ? 'bg-custom-blue' : 'bg-light-gray'
      } font-regular rounded-[10px] w-fit flex justify-center items-center hover:bg-light-violet hover:text-custom-blue hover:cursor-pointer px-[16px] py-[5px]`}
    >
      <p className={`${isActive ? 'text-white' : 'text-custom-blue'} text-[13px] font-bold`}>
        {props.text[0]!.toUpperCase() + props.text.substring(1)}
      </p>
    </div>
  );
};
