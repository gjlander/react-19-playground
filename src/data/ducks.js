const BASE_URL = 'https://duckpond-89zn.onrender.com/wild-ducks';
// const BASE_URL = 'http://localhost:3000/wild-ducks';

const getAllDucks = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
        const { error } = res.json();
        throw new Error(`${res.status}. ${error}`);
    }

    const data = await res.json();
    // console.log(data);

    return data;
};
const createDuck = async (formData) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (!res.ok) {
        const { error } = await res.json();
        console.log(error);
        throw new Error(`Error: ${res.status}. ${error}`);
    }

    const data = await res.json();
    // console.log(data);

    return data;
};

export { getAllDucks, createDuck };
