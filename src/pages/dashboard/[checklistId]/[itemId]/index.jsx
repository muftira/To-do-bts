'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/axiosInstance';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ItemDetailPage() {
  const { checklistId, itemId } = useParams();
  const [item, setItem] = useState(null);
  const [name, setName] = useState('');

  const fetchItem = async () => {
    const response = await fetchData(`checklist/${checklistId}/item/${itemId}`);
    if(response.success) {
      setItem(response.data.data.data);
      setName(response.data.data.data.itemName);
    } else {
      alert('Gagal mengambil item');
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const handleRename = async () => {
    const response = await fetchData(`checklist/${checklistId}/item/rename/${itemId}`, { itemName: name });
    if(response.success) {
      alert('Nama item diperbarui');
    } else {
      alert('Gagal mengubah nama item');
    }
  };

  const toggleStatus = async () => {
    const response = await fetchData(`checklist/${checklistId}/item/${itemId}`);
    if(response.success) {
      fetchItem();
    } else {
      alert('Gagal mengubah status item');
    }
  };

  if (!item) return <p className="text-center mt-10">Memuat...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-bold">Detail Item</h2>

      <Input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={handleRename}>Simpan Nama</Button>

      <p>Status: <strong>{item.status ? 'Selesai' : 'Belum'}</strong></p>
      <Button variant="outline" onClick={toggleStatus}>
        Toggle Status
      </Button>
    </div>
  );
}
