import React, { useRef } from 'react';
import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { Button } from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

import EditFeedbackImg from '@/assets/icons/icon-edit-feedback.svg';
import { Select } from '@/components/Select';
import { IconButton } from '@/components/Button';

const EditFeedback: NextPage = () => {
  const selectRef = useRef(null);
  const updateRef = useRef(null);
  const router = useRouter();

  const addFeedbackHandler = () => {
  
  };

  return (
    <div className='bg-stone flex flex-col justify-center items-center h-screen w-screen'>
      <div className='w-[540px] mb-[53px]'>
        <IconButton onlyLabel isSecondary text='Go Back' onClick={() => router.back()} />
      </div>
      <div className='flex flex-col w-[540px] bg-white rounded-[10px] h-fit px-11 pb-10 pt-[52px] relative'>
        <div className='absolute top-[-25px] left-[42px]'>
          <Image src={EditFeedbackImg} alt='feedback' width={56} height={56} />
        </div>
        <h1 className='font-bold text-dark-blue text-2xl mb-[75px]'>Editing ‘Add a dark theme option’</h1>
        <div className='flex flex-col gap-11'>
          <div>
            <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Feedback Title</h1>
            <h2 className='font-regular text-gray-custom text-small mb-4'>Add a short, descriptive headline</h2>
            <input className='border-none bg-stone rounded-sm px-4 py-3 w-full font-regular text-[15px] text-dark-blue ' type='text' />
          </div>
          <div>
            <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Category</h1>
            <h2 className='font-regular text-gray-custom text-small mb-4'>Choose a category for your feedback</h2>
            <Select
              ref={selectRef}
              value={[
                { name: 'teste', id: '123' },
                { name: 'teste123', id: '1234' },
              ]}
            />
          </div>
          <div>
            <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Update Status</h1>
            <h2 className='font-regular text-gray-custom text-small mb-4'>Change feature state</h2>
            <Select
              ref={updateRef}
              value={[
                { name: 'teste', id: '123' },
                { name: 'teste123', id: '1234' },
              ]}
            />
          </div>
          <div>
            <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Feedback Detail</h1>
            <h2 className='font-regular text-gray-custom text-small mb-4'>
              Include any specific comments on what should be improved, added, etc.
            </h2>
            <textarea
              maxLength={250}
              style={{ resize: 'none' }}
              className='bg-stone w-full h-20 px-6 py-4 font-regular text-[15px] text-dark-blue rounded-[5px] flex-1'
            />
          </div>
          <div className='flex gap-4 mt-2'>
            <Button color='red' width='w-[93px]' text='Delete' onClick={() => {}} />
            <div  className='flex gap-4 ml-auto'>
              <Button color='darkBlue' width='w-[93px]' text='Cancel' onClick={() => {}} />
              <Button color='violet' text='Add Feedback' onClick={addFeedbackHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFeedback;
