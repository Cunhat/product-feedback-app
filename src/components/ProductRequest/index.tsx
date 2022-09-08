import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { UpVote } from '../UpVote';
import IconComment from '../../assets/icons/icon-comments.svg';
import { Tag } from '../Tag';

type ProductRequestProps = {
  title: string;
  description: string;
  category: string;
  upvotes: number;
  comments: number;
  productRequestId: string;
};

export const ProductRequest: React.FC<ProductRequestProps> = (props) => {
  return (
    <Link href={`/productRequest/${props.productRequestId}`}>
      <div className='flex py-7 px-8 bg-white rounded-[10px] cursor-pointer'>
        <div className='mr-5'>
          <UpVote number={props.upvotes} active={false} />
        </div>
        <div className='flex flex-1 flex-col'>
          <h2 className='text-dark-blue font-bold text-[18px] mb-1'>{props.title}</h2>
          <p className='text-gray-custom text-[16px] font-regular leading-[23px] mb-4'>{props.description}</p>
          <Tag text={props.category} disabled isActive={false} />
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Image src={IconComment} width={18} height={16} alt='iconComment' />
          <p className='text-dark-blue text-[16px] font-bold'>{props.comments}</p>
        </div>
      </div>
    </Link>
  );
};
