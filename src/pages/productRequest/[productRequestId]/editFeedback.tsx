import React, { useRef } from 'react';
import type { NextPage } from 'next';
import { trpc } from '@/utils/trpc';
import { Button } from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

import EditFeedbackImg from '@/assets/icons/icon-edit-feedback.svg';
import { Select } from '@/components/Select';
import { IconButton } from '@/components/Button';
import ContentLoader from 'react-content-loader';

const EditFeedback: NextPage = () => {
  const router = useRouter();
  const { productRequestId } = router.query;

  const productInfo = trpc.useQuery(['productRequest.getProductRequestsById', { id: productRequestId as string }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const categoryQuery = trpc.useQuery(['category.getAllCategories'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const statusQuery = trpc.useQuery(['status.getAllStatus'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const [title, setTitle] = React.useState(productInfo?.data?.title);
  const [description, setDescription] = React.useState(productInfo?.data?.description);
  const [status, setStatus] = React.useState(statusQuery?.data?.find((elem) => elem.id === productInfo?.data?.categoryId)?.id);
  const [category, setCategory] = React.useState(categoryQuery?.data?.find((elem) => elem.id === productInfo?.data?.statusId)?.id);

  const utils = trpc.useContext();

  const updateMutation = trpc.useMutation(['productRequest.updateProductRequest'], {
    onSuccess: () => {
      utils.invalidateQueries(['productRequest.getAllProductRequests']);
      router.back();
    },
  });

  const deleteProductMutation = trpc.useMutation(['productRequest.deleteProductRequest'], {
    onSuccess: () => {
      utils.invalidateQueries(['productRequest.getAllProductRequests']);
      router.push('/');
    },
  });

  const addFeedbackHandler = () => {
    updateMutation.mutate({
      id: productInfo?.data?.id!,
      title: title!,
      description: description!,
      statusId: status!,
      categoryId: category!,
    });
  };

  const checkIfCanSubmit = () => {
    return title === '' && description === '';
  };

  const loadingSkeleton = () => (
    <div className='flex flex-col gap-11'>
      <ContentLoader speed={2} width={'100%'} height={102} backgroundColor='#f3f3f3' foregroundColor='#ecebeb'>
        <rect x='0' y='0' rx='5' ry='5' width='30%' height='20' />
        <rect x='0' y='22' rx='5' ry='5' width='50%' height='20' />
        <rect x='0' y='58' rx='5' ry='5' width='100%' height='44' />
      </ContentLoader>
      <ContentLoader speed={2} width={'100%'} height={102} backgroundColor='#f3f3f3' foregroundColor='#ecebeb'>
        <rect x='0' y='0' rx='5' ry='5' width='30%' height='20' />
        <rect x='0' y='22' rx='5' ry='5' width='50%' height='20' />
        <rect x='0' y='58' rx='5' ry='5' width='100%' height='44' />
      </ContentLoader>
      <ContentLoader speed={2} width={'100%'} height={102} backgroundColor='#f3f3f3' foregroundColor='#ecebeb'>
        <rect x='0' y='0' rx='5' ry='5' width='30%' height='20' />
        <rect x='0' y='22' rx='5' ry='5' width='50%' height='20' />
        <rect x='0' y='58' rx='5' ry='5' width='100%' height='44' />
      </ContentLoader>
      <ContentLoader speed={2} width={'100%'} height={102} backgroundColor='#f3f3f3' foregroundColor='#ecebeb'>
        <rect x='0' y='0' rx='5' ry='5' width='30%' height='20' />
        <rect x='0' y='22' rx='5' ry='5' width='50%' height='20' />
        <rect x='0' y='58' rx='5' ry='5' width='100%' height='80' />
      </ContentLoader>
    </div>
  );

  return (
    <div className='bg-stone flex flex-col 2xl:justify-center items-center p-10 h-screen box-border overflow-auto'>
      <div className='w-[540px] mb-[53px]'>
        <IconButton onlyLabel isSecondary text='Go Back' onClick={() => router.back()} />
      </div>
      <div className='flex flex-col w-[540px] bg-white rounded-[10px] h-fit px-11 pb-10 pt-[52px] relative'>
        <div className='absolute top-[-25px] left-[42px]'>
          <Image src={EditFeedbackImg} alt='feedback' width={56} height={56} />
        </div>
        <h1 className='font-bold text-dark-blue text-2xl mb-[75px]'>Editing ‘Add a dark theme option’</h1>
        {productInfo.isFetching || categoryQuery.isFetching || statusQuery.isFetching ? (
          loadingSkeleton()
        ) : (
          <div className='flex flex-col gap-11'>
            <div>
              <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Feedback Title</h1>
              <h2 className='font-regular text-gray-custom text-small mb-4'>Add a short, descriptive headline</h2>
              <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className='border-none bg-stone rounded-sm px-4 py-3 w-full font-regular text-[15px] text-dark-blue '
                type='text'
              />
            </div>
            <div>
              <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Category</h1>
              <h2 className='font-regular text-gray-custom text-small mb-4'>Choose a category for your feedback</h2>
              <Select onChange={(e) => setCategory(e)} value={category || ''} data={categoryQuery?.data!} />
            </div>
            <div>
              <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Update Status</h1>
              <h2 className='font-regular text-gray-custom text-small mb-4'>Change feature state</h2>
              <Select onChange={(e) => setStatus(e)} value={status || ''} data={statusQuery?.data!} />
            </div>
            <div>
              <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Feedback Detail</h1>
              <h2 className='font-regular text-gray-custom text-small mb-4'>
                Include any specific comments on what should be improved, added, etc.
              </h2>
              <textarea
                maxLength={250}
                style={{ resize: 'none' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='bg-stone w-full h-20 px-6 py-4 font-regular text-[15px] text-dark-blue rounded-[5px] flex-1'
              />
            </div>
            <div className='flex gap-4 mt-2'>
              <Button
                color='red'
                width='w-[93px]'
                text='Delete'
                onClick={() => deleteProductMutation.mutate({ id: productInfo?.data?.id! })}
              />
              <div className='flex gap-4 ml-auto'>
                <Button color='darkBlue' width='w-[93px]' text='Cancel' onClick={() => router.back()} />
                <Button disabled={checkIfCanSubmit()} color='violet' text='Add Feedback' onClick={addFeedbackHandler} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditFeedback;

