import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import ContentLoader from 'react-content-loader';
import BulbImg from '../assets/icons/bulb.svg';
import EmptyImg from '../assets/images/emptyComments.svg';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { ProductRequest } from '../components/ProductRequest';
import { Tag } from '../components/Tag';
import { trpc } from '../utils/trpc';

type FilterCategory = {
  name: string;
  isActive: boolean;
};

const Home: NextPage = () => {
  const category = trpc.useQuery(['category.getAllCategories'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      let auxArray: Array<FilterCategory> = [];
      data.forEach((category) => {
        auxArray.push({ name: category.name, isActive: false });
      });
      setFilterTags((oldVal) => [...oldVal, ...auxArray]);
    },
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
  const [filterTags, setFilterTags] = React.useState<Array<FilterCategory>>([{ name: 'All', isActive: true }]);

  const numberOfLoaders = [1, 2, 3];

  const onStateChange = (name: string, isActive: boolean) => {
    let auxArray: Array<FilterCategory> = [...filterTags];
    auxArray.forEach((tag) => {
      if (tag.name.toLowerCase() === name.toLowerCase()) {
        tag.isActive = isActive;
      }
    });
    setFilterTags(auxArray);
  };

  return (
    <div className='flex flex-col md:flex-col lg:flex-row gap-[30px] px-10 py-14 lg:px-[165px] lg:pt-[94px] h-screen bg-stone'>
      <div className='lg:w-[255px] lg:h-full flex lg:flex-col md:flex-row flex-row gap-[24px] md:gap-[10px]'>
        <div className='lg:h-[137px] flex-1 lg:flex-none'>
          <Badge />
        </div>
        <div className=' p-[24px] bg-white rounded-[10px] flex gap-[8px] flex-wrap flex-1 lg:flex-none'>
          {category?.isLoading && (
            <ContentLoader speed={2} width={'100%'} height={50} backgroundColor='#f3f3f3' foregroundColor='#ecebeb'>
              <rect x='0' y='0' rx='10' ry='10' width='50' height='30' />
              <rect x='60' y='0' rx='10' ry='10' width='50' height='30' />
            </ContentLoader>
          )}
          {category.isSuccess && (
            <>
              <Tag onStateChange={onStateChange} disabled={false} key={'all'} text='All' isActive></Tag>
              {category.data.map((category) => (
                <Tag onStateChange={onStateChange} disabled={false} key={category.id} text={category.name} isActive={false} />
              ))}
            </>
          )}
        </div>
        <div className='bg-white rounded-[10px] px-6 pt-[19px] pb-6 flex-1 lg:flex-none'>
          <div className='flex justify-between items-center mb-[24px]'>
            <p className='font-bold text-lg text-dark-blue'>RoadMap</p>
            <p className='font-regular text-[13px] text-custom-blue underline hover:cursor-pointer'>View</p>
          </div>
          <div className='flex flex-col gap-[8px]'>
            {status?.isLoading && (
              <ContentLoader speed={2} width={'100%'} height={50} backgroundColor='#f3f3f3' foregroundColor='#ecebeb'>
                <rect x='0' y='0' rx='5' ry='5' width='100%' height='10' />
                <rect x='0' y='20' rx='5' ry='5' width='100%' height='10' />
                <rect x='0' y='40' rx='5' ry='5' width='100%' height='10' />
              </ContentLoader>
            )}
            {status.isSuccess &&
              status.data?.map((item) => (
                <RoadMapItem key={item.id} title={item.name} color='bg-orange-pastel' value={item.productRequest.length} />
              ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col lg:h-full gap-[20px] pb-5 overflow-auto'>
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
        {products?.isLoading ? (
          <>
            {numberOfLoaders.map((index) => (
              <ContentLoader
                speed={2}
                width={'100%'}
                height={156}
                viewBox='0 0 100% 124'
                backgroundColor='#f3f3f3'
                foregroundColor='#ecebeb'
                className='px-8 py-7 bg-white rounded-[10px]'
                key={index}
              >
                <rect x='0' y='0' rx='5' ry='5' width='40' height='53' />
                <rect x='60' y='10' rx='5' ry='5' width='50%' height='10' />
                <rect x='60' y='33' rx='5' ry='5' width='60%' height='10' />
                <rect x='60' y='71' rx='5' ry='5' width='84' height='23' />
              </ContentLoader>
            ))}
          </>
        ) : products?.isSuccess && products?.data?.length > 0 ? (
          <div className='flex-1 flex flex-col overflow-auto gap-4'>
            {products?.data
              .filter((elem) => {
                if (filterTags.find((elem) => elem.name.toLocaleLowerCase() === 'all')?.isActive) return elem;
                return filterTags.find((tag) => tag.name === elem.category.name)?.isActive;
              })
              .map((elem) => {
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
