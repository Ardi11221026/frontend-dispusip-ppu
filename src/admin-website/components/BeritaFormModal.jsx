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
      key={`${type}-${item?.id ?? 'new'}`}
      type={type}
      item={item}
      onSave={onSave}
      onClose={onClose}
    />
  );
}