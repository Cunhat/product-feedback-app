import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Button, IconButton } from '@/components/Button';
import { ProductRequest as ProductRequestComponent } from '@/components/ProductRequest';
import Img from '@/assets/user-images/image-anne.jpg';

import { Comment, trpc } from '@/utils/trpc';

import formComments from '@/utils//formatComments';
import ContentLoader from 'react-content-loader';
import { useSession } from 'next-auth/react';

const ProductRequest: NextPage = () => {
  const router = useRouter();
  const { productRequestId } = router.query;
  const [content, setContent] = useState('');

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  useEffect(() => {
    console.log(status);
  }, [status]);

  const productInfo = trpc.useQuery(['productRequest.getProductRequestsById', { id: productRequestId as string }], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const createComment = trpc.useMutation(['commentRequest.createComment'], {
    onSuccess: () => {
      setContent('');
    },
  });

  const postComment = () => {
    createComment.mutate({
      content: content,
      productId: productRequestId as string,
    });
  };

  return (
    <div className='h-screen justify-center flex pt-20 bg-background-custom overflow-auto'>
      <div className='max-w-[700px] flex flex-col flex-1 gap-6'>
        <div className='flex justify-between'>
          <IconButton onlyLabel text='Go back' onClick={() => router.push('/')} isSecondary />
          {!productInfo.isFetching && (
            <Button color='blue' text='Edit Feedback' onClick={() => router.push(`${productInfo?.data?.id}/editFeedback`)} />
          )}
        </div>
        {productInfo.isFetching || status === 'loading' ? (
          <ContentLoader
            speed={2}
            width={'100%'}
            height={156}
            backgroundColor='#f3f3f3'
            foregroundColor='#ecebeb'
            className='px-8 py-7 bg-white rounded-[10px]'
          >
            <rect x='0' y='0' rx='5' ry='5' width='40' height='53' />
            <rect x='60' y='10' rx='5' ry='5' width='50%' height='10' />
            <rect x='60' y='33' rx='5' ry='5' width='60%' height='10' />
            <rect x='60' y='71' rx='5' ry='5' width='84' height='23' />
          </ContentLoader>
        ) : (
          <ProductRequestComponent
            title={productInfo.data?.title!}
            description={productInfo.data?.description!}
            category={productInfo.data?.category.name!}
            upvotes={productInfo.data?.upVotes!}
            comments={productInfo.data?.comments?.length || 0}
            key={productInfo.data?.id}
            productRequestId={productInfo.data?.id!}
          />
        )}
        {!productInfo.isFetching && productInfo?.data?.comments?.length! > 0 && (
          <div className='bg-white rounded-md pt-6 pb-[33px] px-8'>
            <p className='text-dark-blue font-bold text-lg mb-7'>Comments</p>
            {formComments(productInfo.data?.comments!)?.map((comment, index) => {
              return (
                <>
                  <Comment key={comment.id + index} comment={comment} />
                  {index !== productInfo?.data?.comments?.length! - 1 && (
                    <div key={index} className='h-[1px] bg-separator my-8 opacity-25' />
                  )}
                </>
              );
            })}
          </div>
        )}
        {!productInfo.isFetching && status === 'authenticated' && (
          <div className='flex flex-col rounded-sm bg-white px-8 py-6'>
            <p className='font-bold text-dark-blue text-[18px] mb-6'>Add Comment</p>
            <textarea
              maxLength={250}
              onChange={(e) => setContent(e.target.value)}
              value={content}
              style={{ resize: 'none' }}
              className='bg-stone h-20 px-6 py-4 font-regular text-[15px] text-dark-blue rounded-[5px]'
            />
            <div className='flex justify-between items-center mt-4'>
              <p className='text-[15px] text-dark-blue'>255 characters left</p>
              <Button disabled={content.length === 0} color='violet' text='Post Comment' onClick={postComment} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRequest;

type CommentProps = {
  comment: Comment;
};

const Comment: React.FC<CommentProps> = (props) => {
  const [addReply, setAddReply] = useState<boolean>(false);

  return (
    <div className='flex'>
      <div className='flex flex-col items-center gap-[23px] min-w-10'>
        <Image src={Img} alt='userImage' width={40} height={40} className='rounded-full' />
        {props?.comment?.replies?.length > 0 && <div className='bg-[#979797] h-full w-[0.5px] flex-1 opacity-10'></div>}
      </div>
      <div className='flex-1 ml-7'>
        <div className='flex gap-8'>
          <div className='flex flex-col'>
            <span className='text-dark-blue font-bold text-sm'>{props?.comment?.user?.name || ''}</span>
            <span className='text-gray-custom font-regular text-sm'>@{props?.comment?.user?.username || ''}</span>
          </div>
          <span className='ml-auto text-custom-blue font-bold text-xs cursor-pointer underline' onClick={() => setAddReply(!addReply)}>
            Reply
          </span>
        </div>
        <div className='mt-[17px] ml-[0px]'>
          <span className='text-gray-custom font-regular text-[15px]'>
            {props?.comment?.parent?.user.username && (
              <span className='text-custom-violet font-bold mr-2'>@{props?.comment?.parent?.user.username}</span>
            )}
            {props.comment?.content}
          </span>
        </div>
        {addReply && <AddReply parentId={props.comment.id} productRequestId={props.comment.productRequestId} />}
        <div className='ml-[0px] mt-7'>
          {props.comment?.replies?.length > 0 &&
            props.comment?.replies.map((reply, index) => {
              //@ts-ignore
              return <Comment comment={reply} key={'reply' + reply.id + index} />;
            })}
        </div>
      </div>
    </div>
  );
};

const AddReply: React.FC<{ parentId: string; productRequestId: string }> = ({ parentId, productRequestId }) => {
  const [content, setContent] = useState('');

  const createComment = trpc.useMutation(['commentRequest.createComment'], {
    onSuccess: () => {
      setContent('');
    },
  });

  const addReply = () => {
    createComment.mutate({
      content: content,
      parentId: parentId,
      productId: productRequestId,
    });
  };

  return (
    <div className='flex gap-4 mt-6'>
      <textarea
        maxLength={250}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ resize: 'none' }}
        className='bg-stone h-20 px-6 py-4 font-regular text-[15px] text-dark-blue rounded-[5px] flex-1'
      />
      <Button disabled={content.length === 0} width={'w-[117px]'} color='violet' text='Post Reply' onClick={addReply} />
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const productRequest = await getCommentById(params?.productRequestId as string);

//   if (productRequest === null) {
//     return {
//       notFound: true,
//     };
//   }
//   return { props: { productRequest } };
// };
