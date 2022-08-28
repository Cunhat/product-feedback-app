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
    <div className='h-screen justify-center flex pt-20 bg-background-custom'>
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
                  <Comment content={comment.content} user={comment.user} key={comment.id} />
                  {index !== commentInfo.comments.length - 1 && <div className='h-[1px] bg-separator my-8' />}
                </>
              );
            })}
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
  replies?: Array<CommentProps>;
};

const Comment: React.FC<CommentProps> = (props) => {
  return (
    <div>
      <div className='flex gap-8'>
        <Image src={Img} alt='userImage' width={40} height={40} className='rounded-full' />
        <div className='flex flex-col'>
          <span className='text-dark-blue font-bold text-sm'>{props.user.name}</span>
          <span className='text-gray-custom font-regular text-sm'>@{props.user.username}</span>
        </div>
        <span className='ml-auto text-custom-blue font-bold text-xs cursor-pointer underline'>Reply</span>
      </div>
      <div className='mt-[17px] ml-[72px]'>
        <p className='text-gray-custom font-regular text-[15px]'>{props.content}</p>
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
