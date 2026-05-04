import { X } from 'lucide-react';
import BeritaForm from './BeritaForm';

export default function BeritaFormModal({
  isOpen,
  type,
  item,
  onClose,
  onSave,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
          <h2>
            {type === 'add' ? 'Buat Berita' : 'Edit Berita'}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto">
          <BeritaForm
            type={type}
            item={item}
            onSave={onSave}
            onClose={onClose}
          />
        </div>

      </div>
    </div>
  );
}