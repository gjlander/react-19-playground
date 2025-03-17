import { useState, use } from 'react';
import { toast } from 'react-hot-toast';
import { DuckContext } from './context';
import { createDuck } from '../data/ducks';
import { isValidUrl } from '../utils/validation';
const DuckContextProvider = ({ children, ducksData }) => {
    const allDucks = use(ducksData);
    const [ducks, setDucks] = useState(allDucks);

    const addDuck = async (previousState, formData) => {
        const name = formData?.get('name');
        const imgUrl = formData?.get('imgUrl');
        const quote = formData?.get('quote');

        const currData = { name, imgUrl, quote };
        try {
            if (!name) throw new Error('Your duck must have a name.');
            if (!imgUrl) throw new Error('Your duck must have an image.');
            if (!isValidUrl(imgUrl))
                throw new Error('Image must be a valid URL.');
            const newDuck = await createDuck(currData);
            setDucks((prev) => [...prev, newDuck]);

            return { name: '', imgUrl: '', quote: '' };
        } catch (error) {
            toast.error(error.message);
            return currData;
        }
    };

    return (
        <DuckContext value={{ ducks, setDucks, addDuck }}>
            {children}
        </DuckContext>
    );
};

export default DuckContextProvider;
