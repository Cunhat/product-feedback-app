import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import Image from 'next/image';

import { Button, IconButton } from '../../components/Button';
import { ProductRequest as ProductRequestComponent } from '../../components/ProductRequest';
import Img from '../../assets/user-images/image-anne.jpg';

import Data from '../../data.json';

type ProductRequest = {
  commentInfo: {
    id: number;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments: [];
  };
};

const ProductRequest: NextPage<ProductRequest> = (props) => {
  const commentInfo = props.commentInfo;
  const router = useRouter();

  if (commentInfo === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className='h-screen justify-center flex pt-20 bg-background-custom overflow-auto'>
      <div className='max-w-[700px] flex flex-col flex-1 gap-6'>
        <div className='flex justify-between'>
          <IconButton text='Go back' onClick={() => router.back()} isSecondary />
          <Button color='blue' text='Edit Feedback' onClick={() => {}} />
        </div>
        <ProductRequestComponent
          title={commentInfo?.title}
          description={commentInfo.description}
          category={commentInfo.category}
          upvotes={commentInfo.upvotes}
          comments={commentInfo.comments?.length || 0}
          key={commentInfo.id}
          productRequestId={commentInfo.id}
        />
        <div className='bg-white rounded-md pt-6 pb-[33px] px-8'>
          <p className='text-dark-blue font-bold text-lg mb-7'>Comments</p>
          {commentInfo.comments?.length > 0 &&
            commentInfo.comments.map((comment, index) => {
              return (
                <>
                  <Comment content={comment.content} user={comment.user} key={comment.id} replies={comment.replies} />
                  {index !== commentInfo.comments.length - 1 && <div className='h-[1px] bg-separator my-8 opacity-25' />}
                </>
              );
            })}
        </div>
        <div className='flex flex-col rounded-sm bg-white px-8 py-6'>
          <p className='font-bold text-dark-blue text-[18px] mb-6'>Add Comment</p>
          <textarea maxLength={250} style={{ resize: 'none' }} className='bg-stone h-20 px-6 py-4 font-regular text-[15px] text-dark-blue rounded-[5px]' />
          <div className='flex justify-between items-center mt-4'>
            <p className='text-[15px] text-dark-blue'>255 characters left</p>
            <Button color='violet' text='Post Comment' onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRequest;

type User = {
  image: string;
  name: string;
  username: string;
};

type CommentProps = {
  content: string;
  user: User;
  replies: Array<any>;
  replyingTo?: string | undefined;
};

const Comment: React.FC<CommentProps> = (props) => {
  return (
    <div className='flex'>
      <div className='flex flex-col items-center gap-[23px] min-w-10'>
        <Image src={Img} alt='userImage' width={40} height={40} className='rounded-full' />
        {props.replies?.length > 0 && <div className='bg-[#979797] h-full w-[0.5px] flex-1 opacity-10'></div>}
      </div>
      <div className='flex-1 ml-7'>
        <div className='flex gap-8'>
          <div className='flex flex-col'>
            <span className='text-dark-blue font-bold text-sm'>{props.user.name}</span>
            <span className='text-gray-custom font-regular text-sm'>@{props.user.username}</span>
          </div>
          <span className='ml-auto text-custom-blue font-bold text-xs cursor-pointer underline'>Reply</span>
        </div>
        <div className='mt-[17px] ml-[0px]'>
          <span className='text-gray-custom font-regular text-[15px]'>
            {props.replyingTo !== undefined && <span className='text-custom-violet font-bold mr-2'>@{props?.replyingTo}</span>}
            {props.content}
          </span>
        </div>
        <div className='ml-[0px] mt-7'>
          {props.replies?.length > 0 &&
            props.replies
              //?.filter((reply) => reply.replyingTo === props.user.username)
              .map((reply, index) => {
                return (
                  <Comment
                    replyingTo={reply.replyingTo}
                    content={reply.content}
                    user={reply.user}
                    replies={reply.replies}
                    key={'reply' + props.user.username + index}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const products = Data.productRequests;

  const paths = products.map((product) => ({
    params: { productRequestId: product.id.toString() },
  }));

  return { paths, fallback: true };
}

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const commentInfo = Data.productRequests.find((elem) => elem.id === parseInt(params.productRequestId));
  return { props: { commentInfo } };
};
