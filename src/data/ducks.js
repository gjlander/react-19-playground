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

    // toast.error(error.message);
    // return { status: 'ERROR', message: error.message, data: null };
};
const ducksInThePond = [
    {
        _id: 1,
        name: 'Sir Quacks-a-lot',
        imgUrl: 'https://cdn11.bigcommerce.com/s-nf2x4/images/stencil/1280x1280/products/430/7841/Knight-Rubber-Duck-Yarto-2__93062.1576270637.jpg?c=2',
        quote: 'I will slay your bugs!',
    },
    {
        _id: 2,
        name: 'Captain Quack Sparrow',
        imgUrl: 'https://www.veniceduckstore.it/cdn/shop/products/Captain-Quack-Rubber-Duck-slant.jpg',
        quote: "You'll always remember this as the day you almost squeezed Captain Quack Sparrow.",
    },
    {
        _id: 3,
        name: 'Ruder Duck',
        imgUrl: 'https://i.ebayimg.com/images/g/vToAAOSwr6hdW8L8/s-l1600.jpg',
        quote: '#@*% off! Debug your own code!',
    },
    {
        _id: 4,
        name: 'Darth Quacker',
        imgUrl: 'https://www.duckshop.de/media/image/3c/ce/25/Black_Star_Badeente_58495616_4_600x600.jpg',
        quote: 'No, I am your debugger!',
    },
    {
        _id: 5,
        name: 'Spider-Duck',
        imgUrl: 'https://i5.walmartimages.com/seo/Spidy-Super-Hero-Rubber-Duck_a42dbd68-e8cd-41f2-ac6d-c812a3a00339.bc3415f3b98088ac58eaeda1f06c10c9.png?odnHeight=640&odnWidth=640&odnBg=FFFFFF',
        quote: 'Does whatever a Spider-Duck can!',
    },
    {
        _id: 6,
        name: 'Sr Developer Duckbert',
        imgUrl: 'https://www.duckshop.de/media/image/91/86/a1/Nerd_Badeente_67685078_600x600.jpg',
        quote: 'Come to me with your BIG bugs!',
    },
    {
        _id: 7,
        name: 'Quacker',
        imgUrl: 'https://m.media-amazon.com/images/I/61iqP4VFsEL.__AC_SX300_SY300_QL70_ML2_.jpg',
        quote: 'Why so serious?',
    },
    {
        _id: 8,
        name: 'Mad Quacker',
        imgUrl: 'https://duckycity.com/cdn/shop/products/SG-REYTD-JCNYO_1024x1024_clipped_rev_1-min_540x.jpeg?v=1505504539',
        quote: 'Be careful, or I might just make your bugs into SUPER bugs!',
    },
    {
        _id: 9,
        name: 'Ducklock Holmes',
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbw5dFwbwPw_Uf_KTKU94mljxvtCcZzMCmKA&s',
        quote: '',
    },
];

export { getAllDucks, createDuck, ducksInThePond };
