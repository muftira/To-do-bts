'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { fetchData } from '@/utils/fetch';

export default function ChecklistCard({ checklist, onDelete }) {
  const router = useRouter();

  const handleDelete = async () => {
    e.preventDefault()
    const confirm = window.confirm('Yakin ingin menghapus checklist ini?');
    if (confirm) {
      const response = await fetchData('DELETE', `checklist/${checklist.id}`);
      if (response.success) {
        onDelete(checklist.id);
        return router.push('/dashboard');
      } else {
        alert('Gagal menghapus checklist');
      }
    }
  };

  return (
    <Card className="p-4 flex justify-between items-center shadow hover:shadow-md">
      <div onClick={() => router.push(`/dashboard`)} className="cursor-pointer">
        <h3 className="font-semibold">{checklist.name}</h3>
      </div>
      <Button variant="destructive" size="sm" onClick={(e) => handleDelete(e)}>
        Hapus
      </Button>
    </Card>
  );
}
