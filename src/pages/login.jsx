'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchData } from '@/utils/fetch';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    const response = await fetchData('POST', 'login', form);
    if (response.success) {
      localStorage.setItem('token', JSON.stringify(response.data.data.data.token));
      router.push('/dashboard');
    } else {
      alert('Login gagal');
    }
  };

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center items-center mt-20 space-y-4">
      <p className='font-bold'>LOGIN</p>
      <Input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <Input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <p className='cursor-pointer text-sm text-red-600' onClick={() => router.push("/register")}>Registrasi akun</p>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
