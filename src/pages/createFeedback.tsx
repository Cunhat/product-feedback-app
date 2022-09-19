import React, { createRef, useState } from 'react';
import type { NextPage } from 'next';
import { trpc, Category } from '../utils/trpc';
import { Button } from '../components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

import NewFeedbackImg from '../assets/icons/icon-new-feedback.svg';
import { Select } from '../components/Select';
import { IconButton } from '../components/Button';

type SelectedCategory =
  | (Category & {
      selected?: boolean;
    })
  | {};

const CreateFeedback: NextPage = () => {
  const router = useRouter();
  const { data, isSuccess } = trpc.useQuery(['category.getAllCategories'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const selectRef = createRef<HTMLInputElement>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = React.useState<string>('');

  const utils = trpc.useContext();

  const createFeedbackMutation = trpc.useMutation(['productRequest.createProductRequest'], {
    onSuccess: () => {
      utils.invalidateQueries(['productRequest.getAllProductRequests']);
      router.push('/');
    },
  });

  const addFeedbackHandler = () => {
    createFeedbackMutation.mutate({
      title: title,
      description: description,
      categoryId: category,
      userId: 'cl7t3e5ew0019x4wddqmz9fs7', //TO-DO Will be hardcoded until we have auth
    });
  };

  const checkIfCanSubmit = () => {
    return title === '' && description === '';
  };

  return (
    <div className='bg-stone flex flex-col 2xl:justify-center items-center h-screen  py-10 box-border overflow-auto'>
      <div className='w-[540px] mb-[53px]'>
        <IconButton onlyLabel isSecondary text='Go Back' onClick={() => router.back()} />
      </div>
      <div className='flex flex-col w-[540px] bg-white rounded-[10px] h-fit px-11 pb-10 pt-[52px] relative'>
        <div className='absolute top-[-25px] left-[42px]'>
          <Image src={NewFeedbackImg} alt='feedback' width={56} height={56} />
        </div>
        <h1 className='font-bold text-dark-blue text-2xl mb-11'>Create New Feedback</h1>
        <div className='flex flex-col gap-11'>
          <div>
            <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Feedback Title</h1>
            <h2 className='font-regular text-gray-custom text-small mb-4'>Add a short, descriptive headline</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              className='border-none bg-stone rounded-sm px-4 py-3 w-full font-regular text-[15px] text-dark-blue '
              type='text'
            />
          </div>
          <div>
            <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Category</h1>
            <h2 className='font-regular text-gray-custom text-small mb-4'>Choose a category for your feedback</h2>
            <Select onChange={(e) => setCategory(e)} data={data || []} value={category} />
          </div>
          <div>
            <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Feedback Detail</h1>
            <h2 className='font-regular text-gray-custom text-small mb-4'>
              Include any specific comments on what should be improved, added, etc.
            </h2>
            <textarea
              maxLength={250}
              style={{ resize: 'none' }}
              onChange={(e) => setDescription(e.target.value)}
              className='bg-stone w-full h-20 px-6 py-4 font-regular text-[15px] text-dark-blue rounded-[5px] flex-1'
            />
          </div>
          <div className='flex gap-4 justify-end mt-2'>
            <Button color='darkBlue' width='w-[93px]' text='Cancel' onClick={() => router.back()} />
            <Button disabled={checkIfCanSubmit()} color='violet' text='Add Feedback' onClick={() => addFeedbackHandler()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeedback;
