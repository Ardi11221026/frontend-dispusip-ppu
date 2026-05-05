import { useEffect, useMemo, useState } from 'react';
import { Download, Minus, Plus, RotateCcw } from 'lucide-react';
import { formatDate } from '../../shared/utils/formatDate';

export default function GaleriModal({ isOpen, item, onClose }) {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (isOpen) setZoom(1);
  }, [isOpen, item]);

  const canZoomOut = zoom > 0.75;
  const canZoomIn = zoom < 3;

  const handleDownload = async () => {
    if (!item?.image) return;

    const fileName = `${(item.title || 'galeri')
      .replace(/[^a-z0-9-_]+/gi, '-')
      .toLowerCase()}.jpg`;

    try {
      const response = await fetch(item.image, { mode: 'cors' });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      const link = document.createElement('a');
      link.href = item.image;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const imageStyle = useMemo(
    () => ({
      transform: `scale(${zoom})`,
      transformOrigin: 'center center',
      transition: 'transform 160ms ease-out',
    }),
    [zoom]
  );

  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 z-[90] h-screen w-screen overflow-y-auto bg-slate-950/70 px-4 py-6 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <div
          className="flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">Preview Gambar</h2>
            <p className="mt-1 text-sm text-gray-500">{item.title}</p>
          </div>

          <div className="bg-slate-100 px-4 py-6 sm:px-6">
            <div className="flex max-h-[65vh] items-center justify-center overflow-auto rounded-xl bg-white p-4 shadow-inner">
              <img
                src={item.image}
                alt={item.title}
                style={imageStyle}
                className="max-h-[58vh] w-auto max-w-none select-none object-contain"
                draggable="false"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-white px-6 py-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((current) => Math.max(0.75, +(current - 0.25).toFixed(2)))}
                disabled={!canZoomOut}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Minus size={16} />
                Zoom Out
              </button>
              <button
                type="button"
                onClick={() => setZoom((current) => Math.min(3, +(current + 0.25).toFixed(2)))}
                disabled={!canZoomIn}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                Zoom In
              </button>
              <button
                type="button"
                onClick={() => setZoom(1)}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                <RotateCcw size={16} />
                Reset
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <Download size={16} />
                Unduh
              </button>
            </div>

            <div className="text-sm text-gray-500">{formatDate(item.date)}</div>
          </div>

          <div className="flex justify-end border-t border-gray-200 bg-white px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-gray-300 px-6 py-2 font-semibold text-gray-800 transition hover:bg-gray-400"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}