import duckIcon from '../../assets/rubber-duck-icon.svg';
const Navbar = () => {
    return (
        <div className='bg-slate-800 py-4 px-8 text-2xl mb-6 flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <img
                    className='h-12'
                    src={duckIcon}
                    alt='A simple rubber duck'
                />
                <h2>Where the wild ducks roam</h2>
            </div>
        </div>
    );
};

export default Navbar;
