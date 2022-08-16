import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { Badge } from '../components/Badge';

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

  return (
    <div className='flex gap-[30px] px-[165px] pt-[94px] w-full h-screen bg-stone'>
      <div className=' w-[255px] h-full flex flex-col gap-[24px]'>
        <div className='h-[137px]'>
          <Badge />
        </div>
        <div className='h-[166px] bg-white rounded-[10px]'></div>
        <div className='h-[178px] bg-white rounded-[10px]'></div>
      </div>
      <div className='flex flex-col flex-1 h-full gap-[20px]'>
        <div className='h-[72px] bg-dark-blue-2 rounded-[10px] mb-1'></div>
        <div className='flex-1 bg-white rounded-[10px] max-h-[600px]'></div>
      </div>
    </div>
  );
};

export default Home;
