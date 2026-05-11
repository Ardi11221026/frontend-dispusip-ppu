import { useState, useRef } from 'react';
import { Search, Book, X, ChevronRight, ChevronLeft } from 'lucide-react';

const booksData = [
  {
    id: 1,
    title: "Tentang Kamu",
    author: "Tere Liye",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    category: "Fiksi",
    status: "Tersedia",
    publisher: "Republika",
    year: "2016",
    description: "Sebuah novel yang menceritakan tentang perjuangan dan pencarian jati diri."
  },
  {
    id: 2,
    title: "Dikta & Hukum",
    author: "DHIA'AN FARAH",
    cover: "https://images.unsplash.com/photo-1543004629-ff569f872783?auto=format&fit=crop&q=80&w=400",
    category: "Romance",
    status: "Tersedia",
    publisher: "Asoka Utama",
    year: "2021",
    description: "Kisah tentang Dikta dan Nadhira yang terjebak dalam perjodohan."
  },
  {
    id: 3,
    title: "Tentang Semua yang Ada di Bumi",
    author: "aesteuticc",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400",
    category: "Puisi",
    status: "Dipinjam",
    publisher: "Gramedia",
    year: "2020",
    description: "Kumpulan puisi tentang kehidupan dan perasaan."
  },
  {
    id: 4,
    title: "Romankasa",
    author: "Killmill; editor, Shafira Amanita",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400",
    category: "Fiksi",
    status: "Tersedia",
    publisher: "Bukune",
    year: "2022",
    description: "Sebuah cerita tentang petualangan di angkasa dan cinta."
  },
  {
    id: 5,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    cover: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400",
    category: "Fiksi",
    status: "Tersedia",
    publisher: "Bentang Pustaka",
    year: "2005",
    description: "Kisah perjuangan anak-anak Belitong mengejar cita-cita."
  },
  {
    id: 6,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
    category: "Sejarah",
    status: "Tersedia",
    publisher: "Hasta Mitra",
    year: "1980",
    description: "Kisah Minke di akhir abad ke-19 pada masa kolonial Belanda."
  }
];

const CarouselSection = ({ title, books, onBookClick }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-16 relative">
      <h2 className="text-xl font-bold text-gray-800 mb-8 uppercase tracking-wide">{title}</h2>
      
      <div className="group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-xl rounded-full p-3 text-gray-600 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
        >
          {books.map((book) => (
            <div 
              key={book.id} 
              className="w-[160px] sm:w-[200px] flex-shrink-0 cursor-pointer group/card"
              onClick={() => onBookClick(book)}
            >
              <div className="aspect-[2/3] w-full bg-gray-100 rounded-lg overflow-hidden mb-3 border border-gray-200 transition-all duration-300 group-hover/card:shadow-lg group-hover/card:border-blue-200">
                <img 
                  src={book.cover} 
                  alt={book.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600?text=SAMPUL+BELUM+TERSEDIA';
                  }}
                />
              </div>
              <h3 className="font-bold text-gray-800 text-xs sm:text-sm line-clamp-2 leading-snug group-hover/card:text-blue-600 transition-colors">
                {book.title} / {book.author}
              </h3>
            </div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-xl rounded-full p-3 text-gray-600 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100 hidden md:block border border-gray-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default function OpacInterface({ isPetugas = false }) {
  const [selectedBook, setSelectedBook] = useState(null);
  const [activeTab, setActiveTab] = useState('cari');
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

  return (
    <div className="bg-white font-poppins">
      {/* Search Hero Section */}
      <div className={`${isPetugas ? 'bg-slate-50' : 'bg-[#D1D9FF] pt-24'} pb-16 px-4`}>
        <div className="max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-1 mb-0">
            <button 
              onClick={() => setActiveTab('cari')}
              className={`px-8 py-3 rounded-t-xl font-bold text-sm transition-all ${
                activeTab === 'cari' ? 'bg-white text-gray-800' : 'bg-white/50 text-gray-600 hover:bg-white/80'
              }`}
            >
              Cari
            </button>
            <button 
              onClick={() => setActiveTab('browse')}
              className={`px-8 py-3 rounded-t-xl font-bold text-sm transition-all ${
                activeTab === 'browse' ? 'bg-white text-gray-800' : 'bg-white/50 text-gray-600 hover:bg-white/80'
              }`}
            >
              Browse
            </button>
          </div>

          {/* Search Controls */}
          <div className="bg-white p-4 rounded-b-xl rounded-tr-xl shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-grow">
                <input 
                  type="text" 
                  placeholder="Kata Kunci" 
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm ${
                    searchTerm === "" && errors.search ? 'border-red-500' : 'border-gray-200'
                  }`}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (errors.search) setErrors(prev => ({ ...prev, search: '' }));
                  }}
                />
                {errors.search && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.search}</p>
                )}
              </div>
              <div className="w-full lg:w-64">
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm bg-white cursor-pointer appearance-none">
                  <option>Judul</option>
                  <option>Pengarang</option>
                  <option>Penerbit</option>
                  <option>ISBN</option>
                </select>
              </div>
              <div className="w-full lg:w-64">
                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm bg-white cursor-pointer appearance-none">
                  <option>Semua Bahan</option>
                  <option>Buku</option>
                  <option>Majalah</option>
                  <option>Surat Kabar</option>
                </select>
              </div>
              <button 
                onClick={() => {
                  if (!searchTerm.trim()) {
                    setErrors(prev => ({ ...prev, search: 'Silakan masukkan kata kunci pencarian' }));
                    return;
                  }
                }}
                className="bg-[#4CAF50] hover:bg-[#43a047] text-white px-10 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-sm shadow-md"
              >
                <Search className="w-4 h-4" />
                Cari
              </button>
            </div>

            {/* Helper Links */}
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-medium text-blue-600">
              <button className="hover:underline">Pencarian lanjut</button>
              <span className="text-gray-300">|</span>
              <button className="hover:underline">Riwayat Pencarian</button>
              <span className="text-gray-300">|</span>
              <button className="hover:underline">Bantuan</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <CarouselSection 
          title="KOLEKSI SERING DI PINJAM" 
          books={booksData} 
          onBookClick={setSelectedBook}
        />
        
        <CarouselSection 
          title="KOLEKSI TERBARU" 
          books={[...booksData].reverse()} 
          onBookClick={setSelectedBook}
        />
      </main>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/3 bg-gray-100 relative">
                <img 
                  src={selectedBook.cover} 
                  alt={selectedBook.title} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600?text=SAMPUL+BELUM+TERSEDIA';
                  }}
                />
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-4 left-4 md:hidden bg-white/80 p-2 rounded-full backdrop-blur-sm shadow-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto relative flex flex-col">
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-8 right-8 hidden md:block text-gray-400 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                      {selectedBook.category}
                    </span>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                      selectedBook.status === 'Tersedia' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {selectedBook.status}
                    </span>
                  </div>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">{selectedBook.title}</h2>
                  <p className="text-lg text-gray-600 font-medium">{selectedBook.author}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Penerbit</p>
                    <p className="font-semibold text-gray-900 text-sm">{selectedBook.publisher}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Tahun Terbit</p>
                    <p className="font-semibold text-gray-900 text-sm">{selectedBook.year}</p>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Book className="w-4 h-4 text-blue-600" />
                    Detail Koleksi
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {selectedBook.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <div className="mt-auto">
                  <button 
                    onClick={() => setSelectedBook(null)}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for hiding scrollbar */}
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
