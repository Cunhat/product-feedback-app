import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { Badge } from '../components/Badge';
import { Tag } from '../components/Tag';

const FILTERS = ['all', 'frontend', 'backend', 'mobile', 'UX'];

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
            <Tag key={filter} text={filter} isActive={false}></Tag>
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
      <div className='flex flex-col flex-1 h-full gap-[20px]'>
        <div className='h-[72px] bg-dark-blue-2 rounded-[10px] mb-1'></div>
        <div className='flex-1 bg-white rounded-[10px] max-h-[600px]'></div>
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
