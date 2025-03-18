import { useActionState } from 'react';
import { useDucks } from '../context/context';

const DuckForm = () => {
    const { addDuck } = useDucks();
    const [formState, formAction, isPending] = useActionState(addDuck, {
        name: '',
        imgUrl: '',
        quote: '',
    });

    return (
        <form
            action={formAction}
            className='flex flex-col gap-4 w-3/4 border-2 rounded-lg p-4'
        >
            <label className='w-full flex gap-2 items-baseline'>
                <span className='text-xl'>Name:</span>
                <input
                    defaultValue={formState.name}
                    name='name'
                    type='text'
                    placeholder="What is your duck's name?"
                    className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 flex-grow'
                />
            </label>
            <label className='w-full flex gap-2 items-baseline'>
                <span className='text-xl'>Image:</span>
                <input
                    defaultValue={formState.imgUrl}
                    name='imgUrl'
                    placeholder='What does your duck look like?'
                    className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                />
            </label>
            <label className='w-full flex gap-2 items-baseline'>
                <span className='text-xl'>Quote:</span>
                <input
                    defaultValue={formState.quote}
                    name='quote'
                    type='text'
                    placeholder='What does your duck say?'
                    className='bg-inherit border-solid border-2 border-slate-700 rounded-lg p-2 w-full'
                />
            </label>
            <button
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
