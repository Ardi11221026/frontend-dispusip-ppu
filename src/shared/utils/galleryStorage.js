// Gallery Storage Utilities - usando localStorage sebagai database sementara

const STORAGE_KEY = 'dispusip_gallery_items';

// Default sample data
const DEFAULT_ITEMS = [
  {
    id: 1,
    title: 'Kunjungan Sekolah',
    image: 'https://via.placeholder.com/400x300?text=Galeri+1',
    category: 'Kegiatan',
  },
  {
    id: 2,
    title: 'Acara Literasi',
    image: 'https://via.placeholder.com/400x300?text=Galeri+2',
    category: 'Literasi',
  },
  {
    id: 3,
    title: 'Ruang Baca Anak',
    image: 'https://via.placeholder.com/400x300?text=Galeri+3',
    category: 'Fasilitas',
  },
  {
    id: 4,
    title: 'Koleksi Buku',
    image: 'https://via.placeholder.com/400x300?text=Galeri+4',
    category: 'Koleksi',
  },
];

export const galleryStorage = {
  // Get all items
  getAll: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
      return DEFAULT_ITEMS;
    }
    return JSON.parse(stored);
  },

  // Add new item
  add: (item) => {
    const items = galleryStorage.getAll();
    const newItem = {
      ...item,
      id: Math.max(...items.map(i => i.id), 0) + 1,
      image: item.image || `https://via.placeholder.com/400x300?text=${item.title}`,
    };
    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newItem;
  },

  // Update existing item
  update: (id, updates) => {
    const items = galleryStorage.getAll();
    const index = items.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Item not found');
    items[index] = { ...items[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return items[index];
  },

  // Delete item
  delete: (id) => {
    const items = galleryStorage.getAll();
    const filtered = items.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  // Get by ID
  getById: (id) => {
    const items = galleryStorage.getAll();
    return items.find(i => i.id === id);
  },

  // Get categories
  getCategories: (items) => {
    return ['Semua', ...new Set(items.map(img => img.category))];
  },
};
