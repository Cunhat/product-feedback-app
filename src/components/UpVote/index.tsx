import React, { PropsWithChildren, useEffect } from 'react';
import { flushSync } from 'react-dom';
import Image from 'next/image';
import Icon from '../../assets/icons/icon-arrow-up.svg';
import IconWhite from '../../assets/icons/icon-arrow-up-white.svg';
import { trpc } from '../../utils/trpc';

type UpVoteProps = {
  number: number;
  active: boolean;
  productId: string;
};

export const UpVote: React.FC<PropsWithChildren<UpVoteProps>> = (props) => {
  const [active, setActive] = React.useState<boolean>(props.active);
  const [counter, setCounter] = React.useState<number>(props.number);
  const queryClient = trpc.useContext();

  const upVote = trpc.useMutation(['productRequest.upVote'], {
    onSuccess() {
      queryClient.refetchQueries(['productRequest.getAllProductRequests']);
    },
  });

  const onClick = (e:React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    let auxCounter = counter;

    if (active) {
      auxCounter--;
    } else {
      auxCounter++;
    }

    setActive(!active);
    setCounter(auxCounter);
    upVote.mutate({ id: props.productId, upVotes: auxCounter });
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
