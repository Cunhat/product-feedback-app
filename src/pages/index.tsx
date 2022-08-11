import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';
import { Button, IconButton } from '../components/Button';
import { UpVote } from '../components/UpVote';
const Home: NextPage = () => {
  const hello = trpc.useQuery(['example.hello', { text: 'from tRPC' }]);

  return (
    <div className='flex flex-col gap-1 m-1'>
      <Button color='violet' onClick={() => console.log('huhuhuh')} text='Button 1' />
      <Button color='blue' onClick={() => console.log('huhuhuh')} text='Button 1' />
      <Button color='darkBlue' onClick={() => console.log('huhuhuh')} text='Button 1' />
      <Button color='red' onClick={() => console.log('huhuhuh')} text='Button 1' />
      <IconButton isPrimary onClick={() => console.log('huhuhuh')} text='Button 1' />
      <IconButton isSecondary onClick={() => console.log('huhuhuh')} text='Button 1' />
      <UpVote number={99}  active={false} />
      <UpVote number={100} active />
    </div>
  );
};

export default Home;
