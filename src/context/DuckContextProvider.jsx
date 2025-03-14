import { useState } from 'react';
import { DuckContext } from './context';
// import { getAllDucks } from '../data/ducks';
const DuckContextProvider = ({ children }) => {
    const [ducks, setDucks] = useState([]);
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const allDucks = await getAllDucks();
    //             setDucks(allDucks);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     })();
    // }, []);
    return <DuckContext value={{ ducks, setDucks }}>{children}</DuckContext>;
};

export default DuckContextProvider;
