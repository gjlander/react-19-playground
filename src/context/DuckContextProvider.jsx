import { useState, use } from 'react';
import { DuckContext } from './context';
const DuckContextProvider = ({ children, ducksData }) => {
    const allDucks = use(ducksData);
    const [ducks, setDucks] = useState(allDucks);

    return <DuckContext value={{ ducks, setDucks }}>{children}</DuckContext>;
};

export default DuckContextProvider;
