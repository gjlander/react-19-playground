import { useState } from 'react';
import { useDucks } from '../context/context';

const EditForm = ({ id, name, imgUrl, quote, setEditing }) => {
    const { duckDispatch } = useDucks();
    const [form, setForm] = useState({
        name,
        imgUrl,
        quote,
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDuck = { ...form, id };
        duckDispatch({ type: 'DUCK_UPDATED', payload: updatedDuck });
        setEditing(false);
    };
    return (
        <form
            onSubmit={handleSubmit}
            className='bg-slate-800 shadow-xl hover:shadow-2xl hover:cursor-pointer w-96 rounded-md flex-flex-col'
        >
            <label className='rounded-t-md overflow-hidden w-full h-96'>
                <span className='text-xl'>Image:</span>
                <input
                    value={form.imgUrl}
                    onChange={handleChange}
                    name='imgUrl'
                    placeholder='What does your duck look like?'
                    className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                />
                <img className='w-full max-h-72' src={imgUrl} alt={name} />
            </label>
            <div className='flex flex-col p-6 pt-2 bg-slate-800 h-40'>
                <label className='w-full flex gap-2 items-baseline border-b-2 mb-4 border-b-gray-400'>
                    <span className='text-xl'>Name:</span>
                    <input
                        value={form.name}
                        onChange={handleChange}
                        name='name'
                        type='text'
                        placeholder="What is your duck's name?"
                        className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 flex-grow'
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
            </div>
            <div className='flex justify-end bg-slate-800 rounded-b-md pb-4 pr-4 gap-2'>
                <button
                    onClick={() => setEditing(false)}
                    type='button'
                    className='bg-orange-500 p-2 rounded-lg font-bold'
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    className='bg-green-600 p-2 rounded-lg font-bold'
                >
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default EditForm;
