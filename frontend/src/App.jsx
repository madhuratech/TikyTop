import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
