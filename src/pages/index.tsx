import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { Badge } from '../components/Badge';
import { Tag } from '../components/Tag';
import EmptyImg from '../assets/images/emptyComments.svg';
import IconComment from '../assets/icons/icon-comments.svg';
import Image from 'next/image';
import { Button } from '../components/Button';
import Link from 'next/link';
import { UpVote } from '../components/UpVote';

import Data from '..//data.json';

const FILTERS = ['all', 'frontend', 'backend', 'mobile', 'UX'];

const comments = [];

const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

  return (
    <div className='flex gap-[30px] px-[165px] pt-[94px] w-full h-screen bg-stone'>
      <div className=' w-[255px] h-full flex flex-col gap-[24px]'>
        <div className='h-[137px]'>
          <Badge />
        </div>
        <div className=' p-[24px] bg-white rounded-[10px] flex gap-[8px] flex-wrap'>
          {FILTERS.map((filter) => (
            <Tag disabled={false} key={filter} text={filter} isActive={false}></Tag>
          ))}
        </div>
        <div className='bg-white rounded-[10px] px-6 pt-[19px] pb-6'>
          <div className='flex justify-between items-center mb-[24px]'>
            <p className='font-bold text-lg text-dark-blue'>RoadMap</p>
            <p className='font-regular text-[13px] text-custom-blue underline hover:cursor-pointer'>View</p>
          </div>
          <div className='flex flex-col gap-[8px]'>
            <RoadMapItem title='Planned' color='bg-orange-pastel' value={2} />
            <RoadMapItem title='In-Progress' color='bg-custom-violet' value={3} />
            <RoadMapItem title='Live' color='bg-light-blue' value={1} />
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 h-full gap-[20px] pb-5'>
        <div className='h-[72px] bg-dark-blue-2 rounded-[10px] mb-1'></div>

        {Data.productRequests.length > 0 ? (
          <div className='flex-1 flex flex-col overflow-auto gap-4'>
            {Data.productRequests.map((elem) => {
              return (
                <ProductRequest
                  title={elem.title}
                  description={elem.description}
                  category={elem.category}
                  upvotes={elem.upvotes}
                  comments={elem.comments?.length || 0}
                  key={elem.id}
                ></ProductRequest>
              );
            })}{' '}
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
  return (
    <div className='flex'>
      <div className='flex items-center gap-4'>
        <div className={`rounded-full w-2 h-2 ${props.color}`}></div>
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

type ProductRequestProps = {
  title: string;
  description: string;
  category: string;
  upvotes: number;
  comments: number;
};

const ProductRequest: React.FC<ProductRequestProps> = (props) => {
  return (
    <Link href='/'>
      <div className='flex py-7 px-8 bg-white rounded-[10px]'>
        <div className='mr-5'>
          <UpVote number={props.upvotes} active={false} />
        </div>
        <div className='flex flex-1 flex-col'>
          <h2 className='text-dark-blue font-bold text-[18px] mb-1'>{props.title}</h2>
          <p className='text-gray-custom text-[16px] font-regular leading-[23px] mb-4'>{props.description}</p>
          <Tag text={props.category} disabled isActive={false} />
        </div>
        <div className='flex items-center justify-center gap-2'>
          <Image src={IconComment} width={18} height={16} alt='iconComment' />
          <p className='text-dark-blue text-[16px] font-bold'>{props.comments}</p>
        </div>
      </div>
    </Link>
  );
};
