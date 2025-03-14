import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { getAllDucks } from '../data/ducks';
import DuckPond from './DuckPond';
const DuckSection = () => {
    const ducksPromise = getAllDucks();
    return (
        <section className='flex flex-col gap-4 m-4'>
            <h2 className='text-4xl'>The ducks in your pond:</h2>
            <ErrorBoundary
                FallbackComponent={
                    <p>Something went wrong loading the ducks...</p>
                }
            >
                <Suspense fallback={<p>Loading...</p>}>
                    <DuckPond ducksData={ducksPromise} />
                </Suspense>
            </ErrorBoundary>
        </section>
    );
};

export default DuckSection;
