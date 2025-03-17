const Counters = ({ counter, setCounter }) => {
    return (
        <div className='flex justify-center items-center gap-2'>
            <button
                onClick={() => setCounter((prev) => prev - 1)}
                className='btn'
            >
                -
            </button>
            <span>{counter}</span>
            <button
                onClick={() => setCounter((prev) => prev + 1)}
                className='btn'
            >
                +
            </button>
        </div>
    );
};

export default Counters;
