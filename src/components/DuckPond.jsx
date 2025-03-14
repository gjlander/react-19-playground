import { use } from 'react';
import { useDucks } from '../context/context';
import DuckCard from './DuckCard';

const DuckPond = ({ ducksData }) => {
    const { ducks, setDucks } = useDucks();
    !ducks.length && setDucks(use(ducksData));
    return (
        <div className='flex justify-center flex-wrap gap-12 w-full'>
            {ducks.map((duck) => (
                <DuckCard key={duck._id} {...duck} />
            ))}
        </div>
    );
};
export default DuckPond;
