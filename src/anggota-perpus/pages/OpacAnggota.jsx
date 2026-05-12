import AnggotaLayout from '../components/AnggotaLayout';
import OpacInterface from '../../shared/components/OpacInterface';

export default function OpacAnggota() {
  return (
    <AnggotaLayout>
      <div className="bg-white min-h-[calc(100vh-140px)] rounded-3xl overflow-hidden border border-slate-200 shadow-sm m-4 sm:m-6">
        <OpacInterface isAnggota={true} />
      </div>
    </AnggotaLayout>
  );
}
