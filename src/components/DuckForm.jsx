import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDucks } from '../context/context';
import { createDuck } from '../data/ducks';

const DuckForm = () => {
    const { setDucks } = useDucks();
    const [isPending, setIsPending] = useState(false);
    const [form, setForm] = useState({
        name: '',
        imgUrl: '',
        quote: '',
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!form.name) throw new Error('Your duck must have a name!');
            if (!form.imgUrl) throw new Error('Your duck must have an image!');

            setIsPending(true);
            const newDuck = await createDuck(form);
            setDucks((prev) => [...prev, newDuck]);
            setForm({
                name: '',
                imgUrl: '',
                quote: '',
            });
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsPending(false);
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            id='add-form'
            className='flex flex-col gap-4 w-3/4 border-2 rounded-lg p-4'
        >
            <label className='w-full flex gap-2 items-baseline'>
                <span className='text-xl'>Name:</span>
                <input
                    value={form.name}
                    onChange={handleChange}
                    name='name'
                    type='text'
                    placeholder="What is your duck's name?"
                    className='input validator bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 flex-grow'
                />
            </label>
            <label className='w-full flex gap-2 items-baseline'>
                <span className='text-xl'>Image:</span>
                <input
                    value={form.imgUrl}
                    onChange={handleChange}
                    name='imgUrl'
                    placeholder='What does your duck look like?'
                    className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                />
            </label>
            <label className='w-full flex gap-2 items-baseline'>
                <span className='text-xl'>Quote:</span>
                <input
                    value={form.quote}
                    onChange={handleChange}
                    name='quote'
                    type='text'
                    placeholder='What does your duck say?'
                    className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                />
            </label>
            <button
                id='submit-btn'
                type='submit'
                className='btn btn-primary'
                disabled={isPending}
            >
                Add duck
            </button>
        </form>
    );
};
export default DuckForm;
