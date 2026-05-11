import PetugasLayout from '../components/PetugasLayout';
import OpacInterface from '../../shared/components/OpacInterface';

export default function Opac() {
  return (
    <PetugasLayout>
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <OpacInterface isPetugas={true} />
        </div>
      </div>
    </PetugasLayout>
  );
}