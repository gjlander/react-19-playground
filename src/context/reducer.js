const duckReducer = (state, action) => {
    switch (action.type) {
        case 'DUCK_ADDED': {
            const updatedDucks = [...state, action.payload];
            localStorage.setItem('ducks', JSON.stringify(updatedDucks));
            return updatedDucks;
        }
        case 'DUCK_UPDATED': {
            const updatedDucks = state.map((duck) =>
                duck.id === action.payload.id ? action.payload : duck
            );
            localStorage.setItem('ducks', JSON.stringify(updatedDucks));
            return updatedDucks;
        }
        case 'DUCK_DELETED': {
            const updatedDucks = state.filter(
                (duck) => duck.id !== action.payload
            );
            localStorage.setItem('ducks', JSON.stringify(updatedDucks));
            return updatedDucks;
        }

        default:
            return state;
    }
};

export { duckReducer };
