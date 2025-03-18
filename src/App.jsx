import { Toaster } from 'react-hot-toast';
import { toastOptions } from './utils/toastSettings.js';
import DuckContextProvider from './context/DuckContextProvider';
import Navbar from './components/Navbar';
import Header from './components/Header';
import DuckSection from './components/DuckSection';
import AddSection from './components/AddSection';
import Footer from './components/Footer';

function App() {
    return (
        <DuckContextProvider>
            <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
                <Navbar />
                <Header />
                <main className='flex-grow flex flex-col justify-between py-4'>
                    <DuckSection />
                    <AddSection />
                </main>
                <Footer />
            </div>
            <Toaster position='bottom-right' toastOptions={toastOptions} />
        </DuckContextProvider>
    );
}

export default App;
