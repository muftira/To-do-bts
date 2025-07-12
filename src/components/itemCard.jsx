'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { fetchData } from '@/utils/fetch';

export default function ItemCard({ item, checklistId, onDeleted, onStatusChanged }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Hapus item ini?')) return;
    const response = await fetchData('DELETE', `checklist/${checklistId}/item/${item.id}`);
    if (response.success) {
      onDeleted(item.id);
    } else {
      alert('Gagal menghapus item');
    }
  };

  const toggleStatus = async () => {

    const response = await fetchData('PUT', `checklist/${checklistId}/item/${item.id}`);
    if (response.success) {
      onStatusChanged(item.id);
    } else {
      alert('Gagal mengubah status');
    }
  };

  return (
    <Card className="p-4 flex justify-between items-center">
      <div
        className="cursor-pointer"
        onClick={() => router.push(`/dashboard/${checklistId}/${item.id}`)}
      >
        <h4 className={`font-semibold ${item.status ? 'line-through text-gray-500' : ''}`}>
          {item.itemName}
        </h4>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={toggleStatus}>
          {item.status ? 'Belum' : 'Selesai'}
        </Button>
        <Button size="sm" variant="destructive" onClick={handleDelete}>
          Hapus
        </Button>
      </div>
    </Card>
  );
}
