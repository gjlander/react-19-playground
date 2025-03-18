# React 19 Patterns

React 19 released in December, and with it some exciting new additions.

## React Server Components

-   The biggest of these updates was the introduction of React Server components. Don't confuse this with SSR, which React has always been able to do, and is simple static rendering on the server. RSC allow us to use full on React Components on the server. This means an entire paradigm shift in how you organize your app because:
    -   You can remove the API layer, and fetch directly from RSC
    -   You can make RSC async, and await inside them
    -   Because RSC are still static once they reach the client, hooks such as `useState` and `useEffect` can't be used in RSC
    -   You can nest Client Components (which is just what we've been always working with), and pass data from RSC to client components
-   There is quite a bit of complexity involved in trying to use RSC in an optimized way, and currently Next.js is the only framework that offers out-of-the-box support for them.
-   Other frameworks seem hesitant to incorporate them due to their complexity, and because they already came up with their own solutions to the problems that RSC solve, so don't feel the need. So it remains to be seen if RSC will really become the future of React.

Many of the new features in React 19 are geared towards working with RSC, but still offer us some exciting new ways to work in purely client-side apps, such as:

-   New options for working with forms, via Actions and a new hook: useActionState
-   The new `use` API for working with Promises, or Context

## Our React 18 App

-   The nice thing is, there's nothing wrong with the way you've been doing things. There's already MANY options working with forms, data fetching, and the like. From your own custom implementation, to dedicated libraries. With React 19 we now have new options, that will become the new standard, since they solve some common issues in the old way of doing things.
-   Our app is using Tailwind v4, with DaisyUI v5, and React Hot Toast for toast messages

### App.jsx

-   We import the `Toaster` component from `react-hot-toast`, and the `toastOptions` from a `utils` file so we don't clutter up ur JSX
-   We've also got a `DuckContextProvider`, and our different components

### /context

-   `context.js`
    -   We create our `DuckContext`, and our custom `useDucks` hook to consume it
-   `DuckContextProvider.jsx`
    -   Here we have our ducks state, and a `useEffect` to fetch our initial data
    -   We also then pass those values

### DuckSection tree

-   `DuckSection.jsx` - Here we are using `lazy` to load our DuckPond - this means the component won't be called until it tries to render. - We can wrap the component that is loading in a `Suspense` boundary, and create a fallback that will display while it loads. I made some card skeletons - This implementation isn't perfect, but we'll be using `Suspense` in a better way soon. I just wanted to highlight that `Suspense` is already available to us in React 18, even though it might be new to you -`DuckPond.jsx` - Here is where we actually render our DuckCards

### AddSection tree

-   Nothing exciting in `AddSection.jsx`

#### DuckForm.jsx

-   We have 2 pieces of state, one for the form inputs, and an `isPending` (or `loading`) state
-   `isPending` is used to disable our submit button while the submission is still in progress
-   We have our change handler for the controlled inputs
-   In our actual form, it has an `onSubmit` that uses out `submitHandler`, each input has a value based on the state, and the `onChange` to update it -`handleSubmit` - It's async - As always we preventDefault - We have some input validation, name and imgUrl are required - We also have a utility function to make sure imgUrl is a valid URL - All of these throw an error that will land us in the catch block, and give us an error toast
    -If we pass validation checks, set isPending to true - Await out new duck, and add it to our duck state to update our UI - reset the form - in the finally we set isPending to false, to that whether it was successful or not, we can use the form again

Questions about the form implementation?

## React 19 Forms

## useActionState

-   With the new hook `useActionState`, we no longer need to control our inputs, and we can handle our `isPending` state as part of it. Let's take a look at [the docs](https://react.dev/reference/react/useActionState)

```js
const [state, formAction, isPending] = useActionState(fn, initialState, permalink?);
```

-   Breaking down the anatomy, in our return we get back three items in our array
    -   `state` - this is whatever we return from the Action. This can be an error message, meta data about the request, the newly created resource, or whatever we decide we want back
    -   `formAction` - this is the action that will be passed to the form
    -   `isPending` - this replaces our separate isPending state, and is managed by `useActionState`, so we no longer need to manually update it
-   `useActionState` requires 2 arguments and has an optional third
    -   `fn` - this is the function that we will use for our action
    -   `initialState` - just like `useState` you pass an initial state
    -   `permaLink` - an optional parameter to contain the unique URL that this form modifies. We won't be using it today

### Using useActionState

-   So, let's update our form. We're going to use the inputs for our state, but again, this could be an error message, or whatever is needed
-   For now, we'll pass an empty async function

```js
const [formState, formAction, isPending] = useActionState(async () => {}, {
    name: '',
    imgUrl: '',
    quote: '',
});
```

-   From here, we can delete our `handleChange`, and the `value` and `onChange` of our inputs

-   Now let's convert our `handleSubmit` into an Action, let's move everything inside into our action first, and delete the `onSubmit`

```js
const [formState, formAction, isPending] = useActionState(
    async () => {
        try {
            e.preventDefault();

            //validate data
            if (!form.name) throw new Error('Your duck must have a name!');
            if (!form.imgUrl) throw new Error('Your duck must have an image!');
            if (!isValidUrl(form.imgUrl))
                throw new Error('Image must be a valid URL.');

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
    },
    {
        name: '',
        imgUrl: '',
        quote: '',
    }
);
```

-   We can delete any of our setters (except the one for our global ducks state) and we don't need the prevent default

```js
async () => {
            try {
                //validate data
                if (!form.name) throw new Error('Your duck must have a name!');
                if (!form.imgUrl)
                    throw new Error('Your duck must have an image!');
                if (!isValidUrl(form.imgUrl))
                    throw new Error('Image must be a valid URL.');

                const newDuck = await createDuck(form);

                setDucks((prev) => [...prev, newDuck]);
            } catch (error) {
                console.error(error);
                toast.error(error.message);
            }
        },
```

-   Our action needs some arguments. The first argument, similar to a callback in a state setter, is the previousState
-   The second, is a FormData object based on the form inputs

```js
async (previousState, formData) => {};
```

-   This FormData is an instance of the native JS FormData Object, so to get the values of the inputs, we can use the .get() method
    -   For this to work, they need the appropriate `name` attributes, already in place from our change handler

```js
const name = formData?.get('name');
const imgUrl = formData?.get('imgUrl');
const quote = formData?.get('quote');
```

-   We can then put these back together into a new object for ease of use

```js
const currData = { name, imgUrl, quote };
```

-   And update our validation, and `createDuck` argument

```js
const name = formData?.get('name');
            const imgUrl = formData?.get('imgUrl');
            const quote = formData?.get('quote');

            const currData = { name, imgUrl, quote };
            try {
                //validate data
                if (!name) throw new Error('Your duck must have a name.');
                if (!imgUrl) throw new Error('Your duck must have an image.');
                if (!isValidUrl(imgUrl))
                    throw new Error('Image must be a valid URL.');
                const newDuck = await createDuck(currData);
                }
```

-   We still need to update our ducks state for our new duck to appear, so we'll keep that, but now we need to return something, so let's return our default state (empty strings) on success, and the current data if an error is thrown

```js
async (previousState, formData) => {
    const name = formData?.get('name');
    const imgUrl = formData?.get('imgUrl');
    const quote = formData?.get('quote');

    const currData = { name, imgUrl, quote };
    try {
        //validate data
        if (!name) throw new Error('Your duck must have a name.');
        if (!imgUrl) throw new Error('Your duck must have an image.');
        if (!isValidUrl(imgUrl)) throw new Error('Image must be a valid URL.');
        const newDuck = await createDuck(currData);

        setDucks((prev) => [...prev, newDuck]);

        return { name: '', imgUrl: '', quote: '' };
    } catch (error) {
        console.error(error);
        toast.error(error.message);
        return currData;
    }
};
```

-   Now on our form, instead of an `onSubmit`, we can now pass our formAction as an action. Native HTML form elements have the `action` attribute.
-   For HTML forms, this is the URL you want this request sent to, and is commonly used in Server-side rendering paradigms. We've not used it, since we're doing everything client side.
-   If you pass it a React form a URL, it will work like a native form element, but if you pass it a function, it will read it as an action, and take care of lots of things for us, such as preventing the default, and resetting the form

```js
<form
            action={formAction}
            className='flex flex-col gap-4 w-3/4 border-2 rounded-lg p-4'
        >
```

-   And voila! Our form adds our new duck!

### Some organization

-   Having this big long function as an argument in `useActionState` is technically fine, but I don't love it.
-   Since this action is actually related to our `ducks` state, let's move it into our `DuckContextProvider`, then pass it via context
-   We'll also need to include our imports

```js
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { DuckContext } from './context';
import { getAllDucks, createDuck } from '../data/ducks';
import { isValidUrl } from '../utils/validation';

const DuckContextProvider = ({ children }) => {
    const [ducks, setDucks] = useState([]);
    const addDuck = async (previousState, formData) => {
        const name = formData?.get('name');
        const imgUrl = formData?.get('imgUrl');
        const quote = formData?.get('quote');

        const currData = { name, imgUrl, quote };
        try {
            //validate data
            if (!name) throw new Error('Your duck must have a name.');
            if (!imgUrl) throw new Error('Your duck must have an image.');
            if (!isValidUrl(imgUrl))
                throw new Error('Image must be a valid URL.');
            const newDuck = await createDuck(currData);

            setDucks((prev) => [...prev, newDuck]);

            return { name: '', imgUrl: '', quote: '' };
        } catch (error) {
            console.error(error);
            toast.error(error.message);
            return currData;
        }
    };
    useEffect(() => {
        (async () => {
            try {
                const allDucks = await getAllDucks();
                setDucks(allDucks);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);
    return (
        <DuckContext value={{ ducks, setDucks, addDuck }}>
            {children}
        </DuckContext>
    );
};

export default DuckContextProvider;
```

-   Now our `DuckForm` is lookin' squeaky clean

```js
import { useActionState } from 'react';
import { useDucks } from '../context/context';

const DuckForm = () => {
    const { addDuck } = useDucks();
    const [formState, formAction, isPending] = useActionState(addDuck, {
        name: '',
        imgUrl: '',
        quote: '',
    });
};
```

### Not resetting our form if there is an error

-   You may notice that I'm getting the linting error that `formState` is still unused, so let's use it!
-   Actions will always reset our form, even if there was an error. This can be kind of annoying. You don't want to have to retype everything if you made a mistake, or of something didn't work
-   Since we're returning empty strings, or the current data from our action, we can use those for our `defaultValue`
    -   Note we're using `defaultValue`, not `value` this is because these components are not controlled. We are simply setting the starting value
-   Now we'll reset the form on success, but keep our work if something went wrong

```js
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
    <button type='submit' className='btn btn-primary' disabled={isPending}>
        Add duck
    </button>
</form>
```

-   There is, as always, lots to explore and many ways we could handle this. I chose this pattern for 2 main reasons 1. I want to update my `ducks` state on success. If I wasn't trying to update a piece of state, I could organize things a bit differently 2. I'm using a toast library to handle user feedback for errors. If I wanted the error to appear around the inputs themselves, I could include the error messages in my `formState`

#### There are a few other new hooks that also make working with forms easier, but you'll have check those out on your own.

Questions before we move on to the new `use` API?

## use API

-   The `use` API is a bit confusingly named. It has 2 main functions that it serves
    -   consume Context, so it can be used to replace `useContext`
    -   handle Promises
-   They call it an API rather than just a hook, because even though it is very similar to hooks, it doesn't follow al of the Rules of Hooks
    -   Most importantly, it doesn't have to be called at the top level of components or custom hooks. You can put it inside of an `if` statement

### Context

-   With this knowledge, we can update our custom hook to use `use` instead of `useContext` (try saying that 5 times quickly)

```js
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
```

-   Easy peasy. Not strictly necessary, but since it offers more flexibility, React docs recommend defaulting to `use` and will eventually deprecate `useContext`
-   Another minor adjustment to Context, is that we longer need the `.Provider`

```js
<DuckContext value={{ ducks, setDucks, addDuck }}>{children}</DuckContext>
```

### Data fetching with use

-   Since `use` can also resolve promises, we can replace our `useEffect` with it
-   `use` must be used within a `Suspense` boundary. So we have to wrap our `DuckContextProvider` in Suspense, which for us means basically wrapping the entire application
-   I've already made a loading UI for the whole page, so we'll use that as the fallback

```js
<Suspense fallback={<LoadingPage />}>
                <DuckContextProvider ducksData={ducksPromise}>
```

-   Another tricky thing about `use` is that it can't resolve Promises in render. So we can't do what our first instinct might be, something like this

```js
const [ducks, setDucks] = useState(use(getAllDucks()));
```

-   We get stuck on our fallback forever.
-   What we have to do then, is call `getAllDucks` in a parent component, and then pass it via props
-   So in `App.jsx`

```js
function App() {
    const ducksPromise = getAllDucks();
    return (
        <Suspense fallback={<LoadingPage />}>
            <DuckContextProvider ducksData={ducksPromise}>)}
```

-   Then back in `DuckContextProvider.jsx`

```js
const DuckContextProvider = ({ children, ducksData }) => {
    const [ducks, setDucks] = useState(use(ducksData));
};
```

-   Another issue with `use`, is that even though you can use it in an `if` statement, you can't use it in a `try/catch` block. What you do instead, is create an `ErrorBoundary`. You can do this manually, but any framework you work with will have some version of it, and React's own documentation recommend the small library `react-error-boundary`, so we'll use that

`npm i react-error-boundary`

-   Then we wrap our suspense around it with it's own fallback

```js
<ErrorBoundary fallback={<p>Something went wrong!</p>}>
    <Suspense fallback={<LoadingPage />}>

```

-   A bit lazy, but now if an error does occur, we have a fallback
-   A final consideration is that this Promise isn't cached. It gets loaded again on every rerender. So if we had another piece of state in `App.jsx`, every change would trigger a refetching
-   Let's add a basic counter to demo this

```js
const [counter, setCounter] = useState(0);
```

`Counter.jsx`

```js
const Counter = ({ counter, setCounter }) => {
    return (
        <div className='flex justify-center items-center gap-2'>
            <button
                onClick={() => setCounter((prev) => prev - 1)}
                className='btn'
            >
                -
            </button>
            <span>{counter}</span>
            <button
                onClick={() => setCounter((prev) => prev + 1)}
                className='btn'
            >
                +
            </button>
        </div>
    );
};

export default Counter;
```

-   If we open the network tab, we see every change in the counter state is triggering a rerender, and a new fetch
-   To solve this, we need to cache, or memoize the results of our `getAllDucks` function, to preserve it across rerenders
    We have 2 options:

1. the `useMemo` hook
    - `useMemo` will save the results of a function across renders. You can use it for expensive calculations to optimize your code
    - Similar to `useEffect`, it takes a callback as the first argument, and a dependency array

```js
const ducksPromise = useMemo(() => getAllDucks(), []);
```

2. React has a new Compiler that is still in beta, so it's not fully stable yet, but it will automatically memoize functions, and do a bunch of other optimizations to your code.
    - This React Compiler will make optimization hooks like `useMemo` and `useCallback` redundant.
    - The nice thing is, as long as you have written code that follows the Rules of React, you can install it and use it without modifying your codebase
    - It also has an additional linter

-   To set it up, first install it
    `npm install -D babel-plugin-react-compiler@beta eslint-plugin-react-compiler@beta`
-   Then to use the linter, add it to your `eslint.config.js` file

```js
import reactCompiler from 'eslint-plugin-react-compiler';
//...other stuff
 plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'react-compiler': reactCompiler,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'react-compiler/react-compiler': 'error',
        },
```

-   And add the compiler to `vite.config.js`

```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', {}]],
            },
        }),
        tailwindcss(),
    ],
});
```

-   Now our code is optimized by default! And if we check the React Dev Tools, we can see that most of our components are now auto-memoized

### And there it is! This is another case of "not much has changed about our app" (except better loading page!) There's lots we weren't able to cover, but hopefully this gives you a solid frame of reference as you look through the docs, and try to work on using these new features.

#### It will take time for companies to adapt to these new practices, so it's still worth knowing the "old" way of doing things, but definitely look through the documentation, and the example here, and play around with refactoring old exercises and projects with these new React 19 features!
