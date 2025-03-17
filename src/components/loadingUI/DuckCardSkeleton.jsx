import React from 'react';

const DuckCardSkeleton = () => {
    return (
        <div className='card card-compact bg-slate-800 w-96 shadow-xl'>
            <div className='skeleton h-96 w-full'></div>
            <div className='card-body h-40'>
                <div className='skeleton card-title h-8 w-full '></div>
                <div className='border-b-2 w-full'></div>
                <div className='skeleton h-4 w-full'></div>
                <div className='skeleton h-4 w-full'></div>
            </div>
        </div>
    );
};

export default DuckCardSkeleton;
