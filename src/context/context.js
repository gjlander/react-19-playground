import { createContext, use } from 'react';

const DuckContext = createContext();

const useDucks = () => {
    const context = use(DuckContext);
    if (!context)
        throw new Error(
            'useDucks can only be used within a DuckContextProvider'
        );
    return context;
};

export { DuckContext, useDucks };
