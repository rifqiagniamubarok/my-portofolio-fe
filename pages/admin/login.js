import { Button, Input } from '@nextui-org/react';
import axios from 'axios';
import { parse } from 'cookie';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';

import React from 'react';
import { useState } from 'react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [invalidMsg, setInvalidMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();
    const { target } = event;

    let email = target[0].value;
    let password = target[1].value;

    try {
      setIsLoading(true);
      const {
        data: { data },
      } = await axios.post(`${process.env.BACKEND_URL}auth/login`, {
        email,
        password,
      });

      if (!data?.token) return;

      await setCookie('token', data.token, { maxAge: 60 * 60 * 24 });

      router.push('/admin');
    } catch (error) {
      console.error({ error });
      setIsInvalid(true);
      setInvalidMsg(error?.response?.data?.msg || 'Username or password wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-white">
      <form className="space-y-4 bg-white p-4 rounded-md mt-32" onSubmit={handleLogin}>
        <p className="text-center text-primary text-2xl font-semibold">Login</p>
        <p className="text-center text-black text-xl font-semibold">as Admin</p>
        <Input type="email" label="Email" size="md" className="max-w-lg w-[300px]" isInvalid={isInvalid} />
        <Input type="password" label="Password" className="max-w-lg w-[300px]" isInvalid={isInvalid} errorMessage={invalidMsg} />
        <Button color="primary" type="submit" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export async function getServerSideProps(context) {
  const cookie = parse(context.req.headers.cookie || '');
  const isToken = cookie.token || false;

  if (isToken)
    return {
      redirect: {
        permanent: false,
        destination: '/admin',
      },
    };

  return {
    props: { data: 'hello' },
  };
}

export default Login;
