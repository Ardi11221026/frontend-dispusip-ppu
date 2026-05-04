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
    <BeritaForm
      type={type}
      item={item}
      onSave={onSave}
      onClose={onClose}
    />
  );
}