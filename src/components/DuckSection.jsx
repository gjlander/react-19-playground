import { lazy, Suspense } from 'react';
import DuckPondSkeleton from './loadingUI/DuckPondSkeleton';
const DuckPond = lazy(() => import('./DuckPond'));
const DuckSection = () => {
    return (
        <section className='flex flex-col gap-4 m-4'>
            <h2 className='text-4xl'>The ducks in your pond:</h2>
            <Suspense fallback={<DuckPondSkeleton />}>
                <DuckPond />
            </Suspense>
        </section>
    );
};

export default DuckSection;
