export default function PopupKonfirmasi({ isOpen, title, message, confirmText = 'Ya, Hapus', cancelText = 'Batal', onConfirm, onCancel, tone = 'danger' }) {
  if (!isOpen) return null;

  const isDanger = tone === 'danger';

  return (
    <div className="fixed inset-0 z-[90] h-screen w-screen overflow-y-auto bg-slate-950/60 px-4 py-6 backdrop-blur-[2px]">
      <div className="flex min-h-full items-center justify-center">
        <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl ring-1 ring-black/5">
          <div className="border-b border-gray-200 px-6 py-4">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <div className="space-y-4 px-6 py-5 text-center">
            <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${isDanger ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
              <span className="text-2xl font-bold">!</span>
            </div>
            <p className="font-semibold text-gray-900">{message}</p>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onCancel} className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">
                {cancelText}
              </button>
              <button type="button" onClick={onConfirm} className={`rounded-lg px-4 py-2 font-medium text-white ${isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}