import DuckCardSkeleton from './DuckCardSkeleton';

const DuckPondSkeleton = () => {
    return (
        <div className='flex justify-center flex-wrap gap-12 w-full'>
            {Array.from({ length: 9 }).map((duck, i) => (
                <DuckCardSkeleton key={i} />
            ))}
        </div>
    );
};
export default DuckPondSkeleton;
