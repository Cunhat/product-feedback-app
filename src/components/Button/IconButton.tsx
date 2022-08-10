import React, { PropsWithChildren } from 'react';
import Image from 'next/image';
import Icon from '../../assets/icons/icon-back-button.svg';
import IconSecondary from '../../assets/icons/icon-secondary-button.svg';

type IconButtonProps = {
  text: string;
  onClick: () => void;
  isPrimary?: boolean;
  isSecondary?: boolean;
};

export const IconButton: React.FC<PropsWithChildren<IconButtonProps>> = (props) => {
  const color = props.isSecondary ? 'bg-white' : 'bg-dark-blue';

  const textColor = props.isSecondary ? 'text-dark-blue' : 'text-white';

  return (
    <button className={`rounded-[10px] ${color} hover:underline w-40 h-11 ${textColor}`} onClick={props.onClick}>
      <div className='flex justify-center items-center w-full gap-[16px]'>
        <Image src={props.isSecondary ? IconSecondary : Icon} height={10} width={6} />
        <p className='font-bold text-sm leading-5'>{props.text}</p>
      </div>
    </button>
  );
};
