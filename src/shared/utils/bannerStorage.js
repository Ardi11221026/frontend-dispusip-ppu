const STORAGE_KEY = 'dispusip_banner_items';

const DEFAULT_ITEMS = [
  { id: 1, title: 'Banner 1', image: '/banner/pusip1.jpeg' },
  { id: 2, title: 'Banner 2', image: '/banner/pusip2.jpg' },
  { id: 3, title: 'Banner 3', image: '/banner/pusip3.jpeg' },
];

export const bannerStorage = {
  getAll: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ITEMS));
      return DEFAULT_ITEMS;
    }

    return JSON.parse(stored);
  },

  add: (item) => {
    const items = bannerStorage.getAll();
    const newItem = {
      ...item,
      id: Math.max(...items.map((entry) => entry.id), 0) + 1,
    };

    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newItem;
  },

  update: (id, updates) => {
    const items = bannerStorage.getAll();
    const index = items.findIndex((entry) => entry.id === id);
    if (index === -1) throw new Error('Item not found');

    items[index] = { ...items[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return items[index];
  },

  delete: (id) => {
    const items = bannerStorage.getAll();
    const filtered = items.filter((entry) => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};
