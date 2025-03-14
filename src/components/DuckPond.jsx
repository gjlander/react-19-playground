import { useDucks } from '../context/context';
import DuckCard from './DuckCard';

const DuckPond = () => {
    const { duckState } = useDucks();
    return (
        <div className='flex justify-center flex-wrap gap-12 w-full'>
            {duckState.map((duck) => (
                <DuckCard key={duck.id} {...duck} />
            ))}
        </div>
    );
};
export default DuckPond;
