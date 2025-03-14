import { createContext, useContext } from 'react';

const DuckContext = createContext();

const useDucks = () => {
    const context = useContext(DuckContext);
    if (!context)
        throw new Error(
            'useDucks can only be used within a DuckContextProvider'
        );
    return context;
};

export { DuckContext, useDucks };
