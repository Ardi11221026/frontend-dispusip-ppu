import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PetugasLayout from '../components/PetugasLayout';
import { Trash2, Eye } from 'lucide-react';

export default function BukuTamuDigitalPetugas() {
  const { category } = useParams();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('bukuTamuDigital') || '[]');
    let filtered = items.reverse();
    
    if (category) {
      filtered = filtered.filter(e => e.type === category);
    }
    
    setEntries(filtered);
  }, [category]);

  const handleDelete = (id) => {
    const all = JSON.parse(localStorage.getItem('bukuTamuDigital') || '[]');
    const remaining = all.filter((e) => e.id !== id);
    localStorage.setItem('bukuTamuDigital', JSON.stringify(remaining));
    
    let filtered = remaining.reverse();
    if (category) {
      filtered = filtered.filter(e => e.type === category);
    }
    setEntries(filtered);
  };

  const getTitle = () => {
    if (category === 'non-anggota') return 'Buku Tamu: Non-Anggota';
    if (category === 'anggota') return 'Buku Tamu: Anggota';
    if (category === 'rombongan') return 'Buku Tamu: Rombongan';
    return 'Buku Tamu Digital (Semua)';
  };

  return (
    <PetugasLayout>
      <div className="p-4 sm:p-6 space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{getTitle()}</h1>
              <p className="text-sm text-slate-600">Daftar entri pengunjung yang masuk melalui layanan publik.</p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[900px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">Waktu</th>
                  {(!category || category === 'non-anggota') && (
                    <>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Nama</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">JK</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Umur</th>
                    </>
                  )}
                  {category === 'anggota' && (
                    <>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Nama</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">No. Anggota</th>
                    </>
                  )}
                  {category === 'rombongan' && (
                    <>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Asal Instansi</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Penanggungjawab</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Kontak</th>
                    </>
                  )}
                  <th className="px-4 py-3 text-center font-semibold text-slate-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 && (
                  <tr>
                    <td colSpan="10" className="px-4 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-lg font-medium text-slate-500">Tidak ada entri</p>
                        <p className="text-xs">Belum ada data pengunjung untuk kategori ini.</p>
                      </div>
                    </td>
                  </tr>
                )}

                {entries.map((e) => (
                  <tr key={e.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4 font-mono text-xs font-semibold text-blue-600">{e.id}</td>
                    <td className="px-4 py-4 text-slate-500 text-xs">{new Date(e.createdAt).toLocaleString()}</td>
                    
                    {(!category || category === 'non-anggota') && (
                      <>
                        <td className="px-4 py-4 text-slate-700 font-medium">{e.data.nama || '-'}</td>
                        <td className="px-4 py-4 text-slate-600">{e.data.jenisKelamin || '-'}</td>
                        <td className="px-4 py-4 text-slate-600">{e.data.umur ? `${e.data.umur} th` : '-'}</td>
                      </>
                    )}
                    
                    {category === 'anggota' && (
                      <>
                        <td className="px-4 py-4 text-slate-700 font-medium">{e.data.nama || '-'}</td>
                        <td className="px-4 py-4 font-mono text-blue-600 text-xs">{e.data.nomorAnggota || '-'}</td>
                      </>
                    )}

                    {category === 'rombongan' && (
                      <>
                        <td className="px-4 py-4 text-slate-700 font-medium">{e.data.asalSekolah || '-'}</td>
                        <td className="px-4 py-4 text-slate-600">{e.data.penanggungjawab || '-'}</td>
                        <td className="px-4 py-4 text-slate-600">{e.data.kontak || '-'}</td>
                      </>
                    )}

                    <td className="px-4 py-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <button type="button" title="Lihat detail" onClick={() => alert(JSON.stringify(e, null, 2))} className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                          <Eye size={16} />
                        </button>
                        <button type="button" title="Hapus" onClick={() => handleDelete(e.id)} className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                          <Trash2 size={16} />
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
