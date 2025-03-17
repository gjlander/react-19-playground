import { toast } from 'react-hot-toast';
const BASE_URL = 'https://duckpond-89zn.onrender.com/wild-ducks';
const createDuckAction = async (prev, formData) => {
    const name = formData?.get('name');
    const imgUrl = formData?.get('imgUrl');
    const quote = formData?.get('quote');

    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, imgUrl, quote }),
        });
        if (!res.ok) {
            const { error } = await res.json();
            console.log(error);
            throw new Error(`Error: ${res.status}. ${error}`);
        }

        const data = await res.json();
        // console.log(data);

        return { status: 'SUCCESS', message: 'New duck added!', data };
    } catch (error) {
        toast.error(error.message);
        return { status: 'ERROR', message: error.message, data: null };
    }
};

export { createDuckAction };
