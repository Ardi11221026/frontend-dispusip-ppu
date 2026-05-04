const STORAGE_KEY = 'dispusip_banner_items';

export const bannerStorage = {
  getAll: () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
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
