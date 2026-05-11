import Header from '../components/Header';
import Footer from '../components/Footer';
import OpacInterface from '../../shared/components/OpacInterface';

export default function Opac() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <OpacInterface />
      <Footer />
    </div>
  );
}
