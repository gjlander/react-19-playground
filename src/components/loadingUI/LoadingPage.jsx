import NavbarLoading from './NavbarLoading';
import Header from '../Header';
import DuckPondSkeleton from './DuckPondSkeleton';
import DuckFormLoading from './DuckFormLoading';
import Footer from '../Footer';

const LoadingPage = () => {
    return (
        <div className='bg-slate-600 text-gray-300 flex flex-col min-h-screen'>
            <NavbarLoading />
            <Header />
            <main className='flex-grow flex flex-col justify-between py-4'>
                <section className='flex flex-col gap-4 m-4'>
                    <h2 className='text-4xl'>The ducks in your pond:</h2>
                    <DuckPondSkeleton />
                </section>
                <section className='flex flex-col items-center gap-4  mx-8'>
                    <h2 className='text-4xl'>Add a new duck to my pond!</h2>
                    <DuckFormLoading />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default LoadingPage;
