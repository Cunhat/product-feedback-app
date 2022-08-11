import React, { PropsWithChildren } from 'react';
import Image from 'next/image';
import Icon from '../../assets/icons/icon-arrow-up.svg';
import IconWhite from '../../assets/icons/icon-arrow-up-white.svg';

type UpVoteProps = {
  number: number;
  active: boolean;
};

export const UpVote: React.FC<PropsWithChildren<UpVoteProps>> = (props) => {
  const [active, setActive] = React.useState<boolean>(props.active);
  const [counter, setCounter] = React.useState<number>(props.number);

  const onClick = () => {
    setCounter((oldCounter) => {
      if (active) return oldCounter - 1;
      return oldCounter + 1;
    });
    setActive(!active);
  };

  return (
    <div
      className={`${
        active ? 'bg-custom-blue' : 'bg-light-gray-3'
      } w-[40px] h-[53px] rounded-[10px] flex flex-col gap-2 justify-center items-center hover:cursor-pointer hover:bg-light-violet`}
      onClick={onClick}
    >
      <Image src={active ? IconWhite : Icon} height={4} width={8} />
      <p className={`font-bold text-[13px] ${active ? 'text-white' : 'text-dark-blue'}`}>{counter}</p>
    </div>
  );
};
