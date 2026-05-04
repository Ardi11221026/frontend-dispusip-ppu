import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Search, Book, User, Phone, MapPin, Mail, Lock, X, ChevronRight, Bookmark } from 'lucide-react';

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

export default function Opac() {
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePinjam = () => {
    setSelectedBook(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-poppins">
      <Header />
      
      {/* Hero Search Section */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white pt-24 pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Online Public Access Catalog</h1>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Temukan ribuan koleksi buku, jurnal, dan referensi lainnya dari Dinas Perpustakaan dan Arsip Kab. Penajam Paser Utara.
          </p>
          
          <div className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Cari Judul, Pengarang, atau ISBN..." 
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="px-6 py-4 rounded-xl text-gray-700 bg-gray-50 border-none font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Semua Bahan</option>
              <option>Buku</option>
              <option>Jurnal</option>
              <option>Skripsi</option>
            </select>
            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/30">
              Cari Koleksi
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar filters - Desktop */}
          <div className="hidden md:block">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-blue-600" />
                Kategori
              </h3>
              <div className="space-y-2">
                {["Fiksi", "Sejarah", "Romance", "Puisi", "Sains", "Teknologi"].map(cat => (
                  <button key={cat} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-700 transition-colors text-sm font-medium">
                    {cat}
                  </button>
                ))}
              </div>
              
              <hr className="my-6 border-gray-100" />
              
              <h3 className="font-bold text-gray-900 mb-4">Tahun Terbit</h3>
              <div className="space-y-2">
                {["2024", "2023", "2022", "2021", "Lainnya"].map(year => (
                  <label key={year} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{year}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Book Grid */}
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Koleksi Populer</h2>
              <div className="flex gap-2">
                <span className="text-sm text-gray-500">Menampilkan {booksData.length} buku</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8">
              {booksData.map((book) => (
                <div 
                  key={book.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedBook(book)}
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img 
                      src={book.cover} 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        book.status === 'Tersedia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {book.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{book.category}</p>
                    <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors mb-1">{book.title}</h3>
                    <p className="text-xs text-gray-500 mb-4">{book.author}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="text-xs font-medium text-gray-400">{book.year}</span>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/3 bg-gray-100 relative">
                <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-4 left-4 md:hidden bg-white/80 p-2 rounded-full backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 overflow-y-auto relative">
                <button 
                  onClick={() => setSelectedBook(null)}
                  className="absolute top-8 right-8 hidden md:block text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <div className="mb-8">
                  <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                    {selectedBook.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">{selectedBook.title}</h2>
                  <p className="text-xl text-gray-600 font-medium">{selectedBook.author}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8 bg-slate-50 p-6 rounded-2xl">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Penerbit</p>
                    <p className="font-semibold text-gray-900">{selectedBook.publisher}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Tahun</p>
                    <p className="font-semibold text-gray-900">{selectedBook.year}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Status</p>
                    <p className={`font-bold ${selectedBook.status === 'Tersedia' ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedBook.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">ID Buku</p>
                    <p className="font-semibold text-gray-900">#BK-00{selectedBook.id}</p>
                  </div>
                </div>

                <div className="mb-10">
                  <h4 className="font-bold text-gray-900 mb-3 text-lg">Ringkasan</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedBook.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={handlePinjam}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Book className="w-5 h-5" />
                    Pinjam Buku Sekarang
                  </button>
                  <button className="w-16 h-16 border-2 border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
