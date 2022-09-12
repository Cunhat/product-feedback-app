import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { Badge } from '../components/Badge';
import { Tag } from '../components/Tag';
import EmptyImg from '../assets/images/emptyComments.svg';
import Image from 'next/image';
import { Button } from '../components/Button';
import BulbImg from '../assets/icons/bulb.svg';
import { ProductRequest } from '../components/ProductRequest';
import { useRouter } from 'next/router';

//import Data from '..//data.json';

const Home: NextPage = () => {
  const category = trpc.useQuery(['category.getAllCategories'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const status = trpc.useQuery(['status.getAllStatus'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const products = trpc.useQuery(['productRequest.getAllProductRequests'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const router = useRouter();

  return (
    <div className='flex gap-[30px] px-[165px] pt-[94px] w-full h-screen bg-stone'>
      <div className=' w-[255px] h-full flex flex-col gap-[24px]'>
        <div className='h-[137px]'>
          <Badge />
        </div>
        <div className=' p-[24px] bg-white rounded-[10px] flex gap-[8px] flex-wrap'>
          <Tag disabled={false} key={'all'} text='All' isActive></Tag>
          {category.isSuccess &&
            category.data.map((filter) => <Tag disabled={false} key={filter.id} text={filter.name} isActive={false} />)}
        </div>
        <div className='bg-white rounded-[10px] px-6 pt-[19px] pb-6'>
          <div className='flex justify-between items-center mb-[24px]'>
            <p className='font-bold text-lg text-dark-blue'>RoadMap</p>
            <p className='font-regular text-[13px] text-custom-blue underline hover:cursor-pointer'>View</p>
          </div>
          <div className='flex flex-col gap-[8px]'>
            {status.isSuccess &&
              status.data?.map((item) => (
                <RoadMapItem key={item.id} title={item.name} color='bg-orange-pastel' value={item.productRequest.length} />
              ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 h-full gap-[20px] pb-5'>
        <div className='h-[72px] bg-dark-blue-2 rounded-[10px] mb-1 flex px-4 items-center'>
          <Image src={BulbImg} alt='Bulb' width={23} height={24} />
          <p className='text-white font-bold text-lg ml-4 text-4.5'>
            {products?.data?.length || 0} {products?.data?.length === 1 ? 'Suggestion' : 'Suggestions'}
          </p>
          <span className='text-light-gray-3 text-3.5 ml-10'>
            Sort by: <span className='text-light-gray-3 font-bold text-3.5'>Most Upvotes</span>
          </span>
          <div className='ml-auto'>
            <Button text='+ Add Feedback' color='violet' onClick={() => router.push('/createFeedback')} />
          </div>
        </div>

        {products?.isSuccess ? (
          <div className='flex-1 flex flex-col overflow-auto gap-4'>
            {products?.data.map((elem) => {
              return (
                <ProductRequest
                  title={elem.title}
                  description={elem.description}
                  category={elem.category.name}
                  upvotes={elem.upVotes}
                  comments={elem.comments.length || 0}
                  key={elem.id}
                  productRequestId={elem.id}
                />
              );
            })}
          </div>
        ) : (
          <div className='flex-1 bg-white rounded-[10px] max-h-[600px]'>
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

type RoadMapItemProps = {
  title: string;
  color: string;
  value: number;
};

const RoadMapItem: React.FC<RoadMapItemProps> = (props) => {
  const getColor = () => {
    switch (props.title) {
      case 'Planned':
        return 'bg-orange-pastel';
      case 'In-Progress':
        return 'bg-custom-violet';
      case 'Live':
        return 'bg-light-blue';
    }
  };

  return (
    <div className='flex'>
      <div className='flex items-center gap-4'>
        <div className={`rounded-full w-2 h-2 ${getColor()}`}></div>
        <p className='text-[16px] text-gray-custom '>{props.title}</p>
      </div>
      <p className='ml-auto text-gray-custom font-bold'>{props.value}</p>
    </div>
  );
};

const EmptyState: React.FC<{}> = (props) => {
  return (
    <div className='flex flex-col gap-[53px] justify-center items-center text-center h-full'>
      <Image src={EmptyImg} width={130} height={136} alt='emptyStateImg'></Image>
      <div>
        <p className='text-[24px] font-bold text-dark-blue mb-5'>There is no feedback yet.</p>
        <p className='text-[16px] text-gray-custom'>Got a suggestion? Found a bug that needs to be squashed?</p>
        <p className='text-[16px] text-gray-custom mb-[50px]'>We love hearing about new ideas to improve our app.</p>
        <Button text='+ Add Feedback' color='violet' onClick={() => {}} />
      </div>
    </div>
  );
};
