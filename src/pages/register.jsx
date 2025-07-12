'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchData } from '@/utils/fetch';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const router = useRouter();

  const handleRegister = async () => {
    const response = await fetchData('POST', 'register', form);
    if (response.success) {
      alert('Registrasi berhasil');
      router.push('/login');
    } else {
      alert('Registrasi gagal')
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <Input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <Input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <Input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}
