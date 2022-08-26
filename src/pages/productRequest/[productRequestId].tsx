import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';

import { Button, IconButton } from '../../components/Button';
import { ProductRequest as ProductRequestComponent } from '../../components/ProductRequest';

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
      </div>
    </div>
  );
};

export default ProductRequest;

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
