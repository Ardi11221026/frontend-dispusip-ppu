import { useEffect, useState } from 'react';
import PetugasLayout from '../components/PetugasLayout';
import { Trash2, Eye } from 'lucide-react';

export default function BukuTamuDigitalList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('bukuTamuDigital') || '[]');
    setEntries(items.reverse());
  }, []);

  const handleDelete = (id) => {
    const remaining = (JSON.parse(localStorage.getItem('bukuTamuDigital') || '[]') || []).filter((e) => e.id !== id);
    localStorage.setItem('bukuTamuDigital', JSON.stringify(remaining));
    setEntries(remaining.reverse());
  };

  return (
    <PetugasLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Buku Tamu Digital</h1>
              <p className="text-sm text-slate-600">Daftar entri pengunjung yang masuk melalui layanan publik.</p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[720px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">ID</th>
                  <th className="px-4 py-3 text-left font-semibold">Tipe</th>
                  <th className="px-4 py-3 text-left font-semibold">Ringkasan</th>
                  <th className="px-4 py-3 text-left font-semibold">Waktu</th>
                  <th className="px-4 py-3 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-slate-500">Tidak ada entri.</td>
                  </tr>
                )}

                {entries.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100">
                    <td className="px-4 py-3 font-mono text-xs">{e.id}</td>
                    <td className="px-4 py-3">{e.type}</td>
                    <td className="px-4 py-3">
                      {e.type === 'anggota' && `${e.data.nama} — #${e.data.nomorAnggota}`}
                      {e.type === 'non-anggota' && `${e.data.nama} — ${e.data.jenisKelamin} — ${e.data.umur} th`}
                      {e.type === 'rombongan' && `${e.data.asalSekolah} — ${e.data.penanggungjawab}`}
                    </td>
                    <td className="px-4 py-3">{new Date(e.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button type="button" title="Lihat detail" onClick={() => alert(JSON.stringify(e, null, 2))} className="rounded-lg bg-blue-600 px-3 py-1 text-white">
                          <Eye size={14} />
                        </button>
                        <button type="button" title="Hapus" onClick={() => handleDelete(e.id)} className="rounded-lg bg-rose-600 px-3 py-1 text-white">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PetugasLayout>
  );
}
