import { useDucks } from '../context/context';
import DuckCard from './DuckCard';

const DuckPond = () => {
    const { ducks } = useDucks();
    return (
        <div className='flex justify-center flex-wrap gap-12 w-full'>
            {ducks.map((duck) => (
                <DuckCard key={duck._id} {...duck} />
            ))}
        </div>
    );
};
export default DuckPond;
