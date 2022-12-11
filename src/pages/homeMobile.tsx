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
import { redirect } from 'next/dist/server/api-utils';
import { getSession, GetSessionParams } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import IconHamburger from '../assets/icons/icon-hamburger.svg';

type FilterCategory = {
  name: string;
  isActive: boolean;
};

const HomeMobile: NextPage = () => {
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

  const [showSideBar, setShowSideBar] = React.useState(false);

  const openSideBar = () => {
    const scroll = showSideBar;
    setShowSideBar(!scroll);
    document.body.style.overflow = scroll ? 'unset' : 'hidden';
  };

  return (
    <div className='h-full bg-stone flex flex-col'>
      {/* <Badge /> */}
      <div className='bg-mobile-gradient py-4 px-6 box-border flex'>
        <div>
          <p className='font-bold text-white text-[15px]'>Frontend Mentor</p>
          <p className='font-regular text-white text-[13px] opacity-75'>Feedback Board</p>
        </div>
        <div className='ml-auto flex items-center'>
          <Image src={IconHamburger} height={17} width={20} onClick={() => openSideBar()} className='cursor-pointer' />
        </div>
      </div>
      {showSideBar && (
        <div className='absolute bg-black h-full w-full z-10 top-[75px] flex justify-end bg-opacity-50'>
          <div className='flex flex-col h-full bg-stone p-6 max-w-xs gap-6'>
            <div className=' p-[24px] bg-white rounded-[10px] flex gap-[8px] flex-wrap'>
              {category.isSuccess && (
                <>
                  <Tag onStateChange={onStateChange} disabled={false} key={'all'} text='All' isActive></Tag>
                  {category.data.map((category) => (
                    <Tag onStateChange={onStateChange} disabled={false} key={category.id} text={category.name} isActive={false} />
                  ))}
                </>
              )}
            </div>
            <div className='bg-white rounded-[10px] px-6 pt-[19px] pb-6 h-fit'>
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
        </div>
      )}

      <div className='flex flex-1 flex-col gap-[20px]'>
        <div className='h-[72px] bg-dark-blue-2 mb-1 flex px-4 items-center'>
          <span className='text-light-gray-3 text-3.5'>
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
          <div className='flex-1 flex flex-col gap-4 px-6 overflow-auto'>
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

export default HomeMobile;

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

export const getServerSideProps: GetServerSideProps = async (context: GetSessionParams) => {
  const session = await getSession(context);
  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

{
}
