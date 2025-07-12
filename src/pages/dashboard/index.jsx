'use client';

import { useEffect, useState } from 'react';
import ChecklistCard from '@/components/ChecklistCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { fetchData } from '@/utils/fetch';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [checklists, setChecklists] = useState([]);
    const [newChecklist, setNewChecklist] = useState('');

        const router = useRouter();

    const fetchChecklists = async () => {
        const response = await fetchData('GET', 'checklist')
        if (response.success) {
            setChecklists(response.data.data.data || []);
        } else {
            alert('Gagal mengambil checklist, mungkin Anda belum login.');
        }
    };

    useEffect(() => {
        fetchChecklists();
    }, []);

    const handleAddChecklist = async () => {
        if (!newChecklist.trim()) return;

        const response = await fetchData('POST', 'checklist', { name: newChecklist });
        if (response.success) {
            setChecklists([...checklists, response.data.data.data]);
            setNewChecklist('');
        } else {
            alert('Gagal menambahkan checklist');
        }
    };

    const handleDelete = (id) => {
        setChecklists(checklists.filter((item) => item.id !== id));
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
            <h1 className="text-3xl font-bold text-center">Todo Dashboard</h1>

            <div className="flex gap-2">
                <Input
                    placeholder="Nama Todo baru"
                    value={newChecklist}
                    onChange={(e) => setNewChecklist(e.target.value)}
                />
                <Button onClick={handleAddChecklist}>Tambah</Button>
            </div>

            <div className="space-y-4">
                {checklists.length === 0 ? (
                    <p className="text-center text-gray-500">Belum ada Todo</p>
                ) : (
                    checklists.map((checklist) => (
                        <div className='cursor-pointer'><ChecklistCard key={checklist.id} checklist={checklist} onDelete={handleDelete} /></div>

                    ))
                )}
            </div>
        </div>
    );
}
