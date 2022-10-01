import React from 'react';
import type { NextPage } from 'next';
import { Button } from '@/components/Button';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import UserImg from '@/assets/user-images/image-anne.jpg';
import Image from 'next/image';
import { trpc } from '../utils/trpc';

const images = {
  anne: UserImg
}

const Login: NextPage = () => {
  const [user, setUser] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const users = trpc.useQuery(['user.getAllUsers'], {});

  async function onHandleSubmit(e) {
    e.preventDefault();
    console.log(user);
    console.log(password);
    const auth = await signIn('credentials', {
      email: user,
      password: password,
      redirect: false,
    });

    if (auth?.status === 200) {
      router.push('/');
    }
    console.log(auth);
  }

  return (
    <div className=' bg-gray-custom xl:h-screen md:h-screen flex flex-col justify-center items-center overflow-auto py-10'>
      <h1 className='font-bold text-2xl text-white'>Choose a user to login</h1>
      <div className='grid md:gap-10 md:grid-cols-3 md:grid-rows-3 xl:gap-20 xl:grid-cols-4 xl:grid-rows-4 md:py-10 xl:py-10 py-10 gap-10'>
        {users?.data?.map((user) => (
          <div className='flex flex-col gap-3 items-center p-3 rounded-md hover:bg-dark-blue hover:cursor-pointer'>
            <Image width={100} height={100} className='rounded-full box-sha' src={UserImg} />
            <h1 className='font-bold text-[16px] text-white'>{user.name}</h1>
            <h2 className='font-bold text-[12px] text-custom-violet'>@{user.username}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Login;
