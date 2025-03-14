import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getAllDucks } from './data/ducks';
import { Toaster } from 'react-hot-toast';
import DuckContextProvider from './context/DuckContextProvider';
import Navbar from './components/Navbar';
import Header from './components/Header';
import DuckSection from './components/DuckSection';
import AddSection from './components/AddSection';
import Footer from './components/Footer';

function App() {
    const ducksPromise = getAllDucks();
    return (
        <ErrorBoundary
            FallbackComponent={<p>Something went wrong loading the ducks...</p>}
        >
            <Suspense fallback={<p>Loading...</p>}>
                <DuckContextProvider ducksData={ducksPromise}>
                    <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
                        <Navbar />
                        <Header />
                        <main className='flex-grow flex flex-col justify-between py-4'>
                            <DuckSection />
                            <AddSection />
                        </main>
                        <Footer />
                    </div>
                    <Toaster
                        position='bottom-right'
                        toastOptions={{
                            success: {
                                style: {
                                    background: '#2ecc71',
                                    color: '#292929',
                                },
                            },
                            error: {
                                style: {
                                    background: '#e74c3c',
                                    color: '#f9f7f7',
                                },
                            },
                        }}
                    />
                </DuckContextProvider>
            </Suspense>
        </ErrorBoundary>
    );
}

export default App;
