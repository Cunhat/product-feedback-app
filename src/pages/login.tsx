import React from 'react';
import type { NextPage } from 'next';
import { Button } from '@/components/Button';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Anne from '@/assets/user-images/image-anne.jpg';
import Elijah from '@/assets/user-images/image-elijah.jpg';
import George from '@/assets/user-images/image-george.jpg';
import Jackson from '@/assets/user-images/image-jackson.jpg';
import James from '@/assets/user-images/image-james.jpg';
import Javier from '@/assets/user-images/image-javier.jpg';
import Judah from '@/assets/user-images/image-judah.jpg';
import Roxanne from '@/assets/user-images/image-roxanne.jpg';
import Ryan from '@/assets/user-images/image-ryan.jpg';
import Suzanne from '@/assets/user-images/image-suzanne.jpg';
import Thomas from '@/assets/user-images/image-thomas.jpg';
import Victoria from '@/assets/user-images/image-victoria.jpg';
import Zena from '@/assets/user-images/image-zena.jpg';
import Image from 'next/image';
import { trpc, Users } from '@/utils/trpc';

const images = {
  anne: Anne,
  elijah: Elijah,
  george: George,
  jackson: Jackson,
  james: James,
  javier: Javier,
  judah: Judah,
  roxanne: Roxanne,
  ryan: Ryan,
  suzanne: Suzanne,
  thomas: Thomas,
  victoria: Victoria,
  zena: Zena,
};

const Login: NextPage = () => {
  const [renderUsers, setRenderUsers] = React.useState<boolean>(false);
  const router = useRouter();
  const { status } = useSession();

  if (status === 'authenticated') {
    router.push('/');
  }

  return (
    <div className=' bg-gray-custom py-10 overflow-auto 2xl:h-screen xl:h-screen sm:h-screen flex flex-col px-10 items-center'>
      {renderUsers ? (
        <UsersToLogin />
      ) : (
        <div className='h-full flex flex-col justify-center items-center gap-20'>
          <h1 className='font-bold text-2xl text-white'>Welcome to FrontEnd Masters product feedback challenge</h1>
          <Button text='Login' color='violet' onClick={() => setRenderUsers(!renderUsers)} />
        </div>
      )}
    </div>
  );
};

export default Login;

const UsersToLogin: React.FC = () => {
  async function onHandleSubmit(username: String) {
    signIn('credentials', { username: username, callbackUrl: '/' });
  }

  function getImageSrc(user: string) {
    const index = user?.split(' ')[0]?.toLowerCase() as keyof typeof images;
    return images[index];
  }

  const users = trpc.useQuery(['user.getAllUsers'], { refetchInterval: false, refetchOnReconnect: false, refetchOnWindowFocus: false });

  return (
    <>
      <h1 className='font-bold text-2xl text-white'>Choose a user to login</h1>
      <div className='grid md:gap-10 md:grid-cols-3 md:grid-rows-3 xl:gap-20 xl:grid-cols-4  md:py-10 xl:py-10 py-10 gap-10 flex-1'>
        {users?.data?.map((user) => (
          <div
            key={user.id}
            onClick={() => onHandleSubmit(user.username)}
            className='flex flex-col gap-3 items-center p-5 rounded-md hover:bg-dark-blue hover:cursor-pointer hover:shadow-xl h-fit'
          >
            <Image width={100} height={100} className='rounded-full' src={getImageSrc(user.name ?? 'zena')} />
            <h1 className='font-bold text-[16px] text-white'>{user.name}</h1>
            <h2 className='font-bold text-[12px] text-pink-500'>@{user.username}</h2>
          </div>
        ))}
      </div>
    </>
  );
};
