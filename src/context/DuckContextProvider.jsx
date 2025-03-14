import { useReducer } from 'react';
import { duckReducer } from './reducer';
import { DuckContext } from './context';
const DuckContextProvider = ({ children }) => {
    const [duckState, duckDispatch] = useReducer(
        duckReducer,
        JSON.parse(localStorage.getItem('ducks')) || []
    );
    return (
        <DuckContext.Provider value={{ duckState, duckDispatch }}>
            {children}
        </DuckContext.Provider>
    );
};

export default DuckContextProvider;
