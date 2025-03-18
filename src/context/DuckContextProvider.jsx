import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { DuckContext } from './context';
import { getAllDucks, createDuck } from '../data/ducks';
import { isValidUrl } from '../utils/validation';

const DuckContextProvider = ({ children }) => {
    const [ducks, setDucks] = useState([]);
    const addDuck = async (previousState, formData) => {
        const name = formData?.get('name');
        const imgUrl = formData?.get('imgUrl');
        const quote = formData?.get('quote');

        const currData = { name, imgUrl, quote };
        try {
            //validate data
            if (!name) throw new Error('Your duck must have a name.');
            if (!imgUrl) throw new Error('Your duck must have an image.');
            if (!isValidUrl(imgUrl))
                throw new Error('Image must be a valid URL.');
            const newDuck = await createDuck(currData);

            setDucks((prev) => [...prev, newDuck]);

            return { name: '', imgUrl: '', quote: '' };
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            return currData;
        }
    };
    useEffect(() => {
        (async () => {
            try {
                const allDucks = await getAllDucks();
                setDucks(allDucks);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);
    return (
        <DuckContext value={{ ducks, setDucks, addDuck }}>
            {children}
        </DuckContext>
    );
};

export default DuckContextProvider;
