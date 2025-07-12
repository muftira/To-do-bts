'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ItemCard from '@/components/itemCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchData } from '@/utils/fetch';

export default function ChecklistDetailPage() {
    const { checklistId } = useParams();
    const [items, setItems] = useState([]);
    const [newItemName, setNewItemName] = useState('');

    const fetchItems = async () => {
        const response = await fetchData('GET', `checklist/${checklistId}/item`)
        if (response.success) {
            setItems(response.data.data.data || []);
        } else {
            alert('Gagal mengambil item checklist');
        }
    };

    useEffect(() => {
        fetchItems();
    }, [checklistId]);

    const handleAddItem = async () => {
        if (!newItemName.trim()) return;
        const response = await fetchData('POST', `checklist/${checklistId}/item`, { itemName: newItemName });
        if (response.success) {
            setItems([...items, response.data.data]);
            setNewItemName('');
        } else {
            alert('Gagal menambahkan item');
        }
    };

    const handleDelete = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleStatusChange = (id) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, status: !item.status } : item
            )
        );
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
            <h2 className="text-2xl font-bold text-center">Checklist #{checklistId}</h2>

            <div className="flex gap-2">
                <Input
                    placeholder="Tambah item baru"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                />
                <Button onClick={handleAddItem}>Tambah</Button>
            </div>

            <div className="space-y-3">
                {items.length === 0 ? (
                    <p className="text-center text-gray-500">Belum ada item</p>
                ) : (
                    items.map((item) => (
                        <div>
                            <ItemCard
                                key={item.id}
                                item={item}
                                checklistId={checklistId}
                                onDeleted={handleDelete}
                                onStatusChanged={handleStatusChange}
                            />
                        </div>

                    ))
                )}
            </div>
        </div>
    );
}
