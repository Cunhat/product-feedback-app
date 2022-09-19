import React, { useRef } from 'react';
import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import { trpc, ProductRequest, Category, Status } from '@/utils/trpc';
import { Button } from '@/components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';

import EditFeedbackImg from '@/assets/icons/icon-edit-feedback.svg';
import { Select } from '@/components/Select';
import { IconButton } from '@/components/Button';

import { getCommentById } from '@/pages/api/productRequests';
import { getAllCategories } from '@/pages/api/category';
import { getAllStatus } from '@/pages/api/status';

type SelectedCategory = Category & {
  selected?: boolean;
};

type SelectedStatus = Status & {
  selected?: boolean;
};

type ProductRequestProps = {
  productRequest: ProductRequest;
  categories: Array<SelectedCategory>;
  status: Array<SelectedStatus>;
};

const EditFeedback: NextPage<ProductRequestProps> = (props) => {
  const commentInfo = props.productRequest;
  const [title, setTitle] = React.useState(commentInfo?.title);
  const [description, setDescription] = React.useState(commentInfo?.description);
  const [status, setStatus] = React.useState(props?.status?.find((elem) => elem.selected)?.id);
  const [category, setCategory] = React.useState(props?.categories?.find((elem) => elem.selected)?.id);
  const router = useRouter();

  const utils = trpc.useContext();

  const updateMutation = trpc.useMutation(['productRequest.updateProductRequest'], {
    onSuccess: () => {
      utils.invalidateQueries(['productRequest.getAllProductRequests']);
      router.back();
    },
  });

  const addFeedbackHandler = () => {
    updateMutation.mutate({
      id: commentInfo?.id,
      title: title,
      description: description,
      statusId: status!,
      categoryId: category!,
    });
  };

  const checkIfCanSubmit = () => {
    return title === '' && description === '';
  };

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
            <Select onChange={(e) => setCategory(e)} value={category || ''} data={props.categories} />
          </div>
          <div>
            <h1 className='font-bold text-dark-blue text-small mb-[2px]'>Update Status</h1>
            <h2 className='font-regular text-gray-custom text-small mb-4'>Change feature state</h2>
            <Select onChange={(e) => setStatus(e)} value={status || ''} data={props.status} />
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
            <Button color='red' width='w-[93px]' text='Delete' onClick={() => {}} />
            <div className='flex gap-4 ml-auto'>
              <Button color='darkBlue' width='w-[93px]' text='Cancel' onClick={() => router.back()} />
              <Button disabled={checkIfCanSubmit()} color='violet' text='Add Feedback' onClick={addFeedbackHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFeedback;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const productRequest = await getCommentById(params?.productRequestId as string);

  if (productRequest === null) {
    return {
      notFound: true,
    };
  }

  const categories = await getAllCategories();

  if (categories === null || undefined) {
    return {
      notFound: true,
    };
  }

  const selectedCategories: Array<SelectedCategory> = categories.map((category: SelectedCategory) => {
    if (category.id === productRequest?.categoryId) {
      category.selected = true;
    } else {
      category.selected = false;
    }
    return category;
  });

  const status = await getAllStatus();

  if (status === null || undefined) {
    return {
      notFound: true,
    };
  }

  const selectedStatus: Array<SelectedCategory> = status.map((stat: SelectedCategory) => {
    if (stat.id === productRequest?.categoryId) {
      stat.selected = true;
    } else {
      stat.selected = false;
    }
    return stat;
  });

  return { props: { productRequest: productRequest, categories: selectedCategories, status: selectedStatus } };
};
