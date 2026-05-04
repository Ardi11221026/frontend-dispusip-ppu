import { useState, useEffect, useRef } from 'react';
import {
  Upload,
  ChevronUp,
  ChevronDown,
  Trash2,
  Bold,
  Italic,
  Underline,
  Heading2,
  Heading3,
  Pilcrow,
  List,
  ListOrdered,
  Strikethrough,
  Baseline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link,
  Palette,
  Eraser,
} from 'lucide-react';

export default function BeritaForm({ type, item, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    time: (() => { const now = new Date(); return String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0'); })(),
    category: 'Berita',
    location: '',
    image: '',
    contentBlocks: [],
  });
  const [errors, setErrors] = useState({});
  const contentRefs = useRef([]);
  const [activeBlock, setActiveBlock] = useState(null);

  useEffect(() => {
    if (type === 'edit' && item) {
      setFormData({
        title: item.title || '',
        date: item.date || new Date().toISOString().split('T')[0],
        time: item.time || (() => { const now = new Date(); return String(now.getHours()).padStart(2,'0') + ':' + String(now.getMinutes()).padStart(2,'0'); })(),
        category: item.category || 'Berita',
        location: item.location || '',
        image: item.image || '',
        contentBlocks:
          item.contentBlocks ||
          (item.content ? [{ type: 'text', value: item.content }] : []),
      });
    }
  }, [type, item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (index === null) {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      } else {
        updateContentBlock(index, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const addContentBlock = (type) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: [...prev.contentBlocks, { type, value: '' }],
    }));
  };

  const execFormat = (cmd, value = null) => {
    if (activeBlock == null) return;
    const el = contentRefs.current[activeBlock];
    if (!el) return;
    el.focus();
    // use deprecated execCommand for simple formatting
    document.execCommand(cmd, false, value);
    // sync state
    updateContentBlock(activeBlock, el.innerHTML);
  };

  const withActiveBlock = (index, fn) => {
    setActiveBlock(index);
    const el = contentRefs.current[index];
    if (el) el.focus();
    fn();
  };

  const handleInsertLink = (index) => {
    const url = window.prompt('Masukkan URL (contoh: https://contoh.com)');
    if (!url) return;
    withActiveBlock(index, () => execFormat('createLink', url));
  };

  const handleEditorFocus = (index, event) => {
    setActiveBlock(index);
    event.currentTarget.setAttribute('dir', 'ltr');
    // enforce visual direction and caret placement
    event.currentTarget.style.direction = 'ltr';
    event.currentTarget.style.unicodeBidi = 'isolate';
    // place caret at end to avoid reverse typing
    setTimeout(() => {
      try {
        const el = event.currentTarget;
        const range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } catch (e) {
        // ignore
      }
    }, 0);
  };

  const updateContentBlock = (index, value) => {
    const newBlocks = [...formData.contentBlocks];
    newBlocks[index].value = value;
    setFormData((prev) => ({ ...prev, contentBlocks: newBlocks }));
  };

  const moveBlock = (index, direction) => {
    const blocks = [...formData.contentBlocks];
    if (direction === 'up' && index > 0) {
      [blocks[index], blocks[index - 1]] = [blocks[index - 1], blocks[index]];
    }
    if (direction === 'down' && index < blocks.length - 1) {
      [blocks[index], blocks[index + 1]] = [blocks[index + 1], blocks[index]];
    }
    setFormData((prev) => ({ ...prev, contentBlocks: blocks }));
  };

  const deleteBlock = (index) => {
    setFormData((prev) => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple validation
    const newErrors = {};
    if (!formData.title || formData.title.trim() === '') newErrors.title = 'Judul wajib diisi';
    const hasContent = formData.contentBlocks.some((b) => {
      if (b.type === 'text') return (b.value || '').replace(/<[^>]*>/g, '').trim() !== '';
      if (b.type === 'image') return !!b.value;
      return false;
    });
    if (!hasContent) newErrors.content = 'Tambahkan setidaknya satu blok konten (teks atau gambar)';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const content = formData.contentBlocks
      .map((b) => (b.type === 'text' ? b.value : ''))
      .join('\n');

    const gallery = formData.contentBlocks
      .filter((b) => b.type === 'image')
      .map((b) => b.value);

    const plainText = content.replace(/<[^>]+>/g, '');

    onSave({
      ...item,
      ...formData,
      content,
      gallery,
      excerpt: plainText.substring(0, 150),
      id: item?.id || Date.now(),
      status: item?.status || 'Draft',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-xl flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Buat Berita Baru</h2>
        </div>

        {/* BODY (SCROLLABLE) */}
          <form id="berita-form" onSubmit={handleSubmit} className="overflow-y-auto px-6 py-4 space-y-6 flex-1">

          {/* Thumbnail */}
          <div>
            <label className="font-medium block mb-2">Thumbnail Berita *</label>
            <label className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer text-gray-500">
              <Upload />
              <span className="text-sm mt-2">Klik untuk upload thumbnail</span>
              <input type="file" hidden onChange={handleImageChange} />
            </label>
            {formData.image && (
              <img src={formData.image} className="h-32 mt-3 rounded" />
            )}
          </div>

          {/* Tanggal */}
          <div>
            <label className="block mb-1 font-medium">Tanggal Berita</label>
                    <div className="flex gap-2">
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, date: e.target.value }))
                        }
                        className="w-1/2 border rounded-lg px-3 py-2"
                      />
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                        className="w-1/2 border rounded-lg px-3 py-2"
                      />
                    </div>
          </div>

          {/* Judul */}
          <div>
            <label className="block mb-1 font-medium">Judul Berita *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul berita"
              className="w-full border rounded-lg px-3 py-2"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Konten */}
          <div>
            <label className="font-medium block mb-2">Konten Berita *</label>

            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => addContentBlock('text')}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Teks
              </button>
              <button
                type="button"
                onClick={() => addContentBlock('image')}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Gambar
              </button>
            </div>
            {formData.contentBlocks.map((block, i) => (
              <div key={i} className="border rounded-lg p-3 mb-3">

                {block.type === 'text' ? (
                  <>
                    <div className="mb-2 flex flex-wrap items-center gap-1 rounded-lg border bg-gray-50 p-2">
                      <button type="button" title="Bold" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('bold'))}><Bold size={16} /></button>
                      <button type="button" title="Italic" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('italic'))}><Italic size={16} /></button>
                      <button type="button" title="Underline" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('underline'))}><Underline size={16} /></button>
                      <div className="mx-1 h-6 w-px bg-gray-300" />

                      <button type="button" title="Heading 2" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('formatBlock', '<H2>'))}><Heading2 size={16} /></button>
                      <button type="button" title="Heading 3" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('formatBlock', '<H3>'))}><Heading3 size={16} /></button>
                      <button type="button" title="Paragraph" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('formatBlock', '<P>'))}><Pilcrow size={16} /></button>
                      <div className="mx-1 h-6 w-px bg-gray-300" />

                      <button type="button" title="Bullet List" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('insertUnorderedList'))}><List size={16} /></button>
                      <button type="button" title="Numbered List" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('insertOrderedList'))}><ListOrdered size={16} /></button>
                      <button type="button" title="Strikethrough" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('strikeThrough'))}><Strikethrough size={16} /></button>
                      <button type="button" title="Superscript" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('superscript'))}><Baseline size={16} /></button>
                      <div className="mx-1 h-6 w-px bg-gray-300" />

                      <button type="button" title="Align Left" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('justifyLeft'))}><AlignLeft size={16} /></button>
                      <button type="button" title="Align Center" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('justifyCenter'))}><AlignCenter size={16} /></button>
                      <button type="button" title="Align Right" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('justifyRight'))}><AlignRight size={16} /></button>
                      <button type="button" title="Justify" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('justifyFull'))}><AlignJustify size={16} /></button>
                      <div className="mx-1 h-6 w-px bg-gray-300" />

                      <button type="button" title="Insert Link" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => handleInsertLink(i)}><Link size={16} /></button>
                      <label title="Text Color" className="relative inline-flex cursor-pointer items-center justify-center p-2 border rounded text-sm hover:bg-gray-100">
                        <Palette size={16} />
                        <input
                          type="color"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          onChange={(e) => withActiveBlock(i, () => execFormat('foreColor', e.target.value))}
                        />
                      </label>
                      <button type="button" title="Clear Format" className="p-2 border rounded text-sm hover:bg-gray-100" onClick={() => withActiveBlock(i, () => execFormat('removeFormat'))}><Eraser size={16} /></button>
                    </div>
                    <div
                      ref={(el) => (contentRefs.current[i] = el)}
                      contentEditable
                      dir="ltr"
                      suppressContentEditableWarning
                      spellCheck={false}
                      onFocus={(e) => handleEditorFocus(i, e)}
                      onInput={(e) => updateContentBlock(i, e.currentTarget.innerHTML)}
                      className="w-full border rounded p-2 min-h-[120px] prose max-w-full"
                      style={{ direction: 'ltr', unicodeBidi: 'isolate' }}
                      dangerouslySetInnerHTML={{ __html: block.value || '' }}
                    />
                  </>
                ) : (
                  <div>
                    <input
                      type="file"
                      onChange={(e) => handleImageChange(e, i)}
                    />
                    {block.value && (
                      <img src={block.value} className="mt-2 h-32 rounded" />
                    )}
                  </div>
                )}

                <div className="flex gap-2 mt-3">
                  <button type="button" onClick={() => moveBlock(i, 'up')}>
                    <ChevronUp size={18} />
                  </button>
                  <button type="button" onClick={() => moveBlock(i, 'down')}>
                    <ChevronDown size={18} />
                  </button>
                  <button type="button" onClick={() => deleteBlock(i)}>
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
          </div>
        </form>

        {/* FOOTER (STICKY BUTTONS) */}
        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-700 text-white"
          >
            Simpan Berita
          </button>
        </div>
      </div>
    </div>
  );
}