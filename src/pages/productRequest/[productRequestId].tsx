import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const ProductRequest: NextPage = () => {
  const router = useRouter();
  const { productRequestId } = router.query;
  return <div>ProductRequestId: {productRequestId}</div>;
};

export default ProductRequest;
