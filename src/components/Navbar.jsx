import { useDucks } from '../context/context';
import duckIcon from '../assets/rubber-duck-icon.svg';
const Navbar = () => {
    const { duckState } = useDucks();
    return (
        <div className='bg-slate-800 py-4 text-2xl mb-6 flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <img
                    className='h-12'
                    src={duckIcon}
                    alt='A simple rubber duck'
                />
                <h2>Where wild ducks roam</h2>
            </div>
            <h2>You have {duckState.length} ducks in the pond!</h2>
        </div>
    );
};

export default Navbar;
