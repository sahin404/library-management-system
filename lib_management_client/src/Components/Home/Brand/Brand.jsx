import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MyContext } from '../../../Auth/AuthProvider';

const Brand = () => {

    const [cat, setCat] = useState([]);
    const { search } = useContext(MyContext)

    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get('http://localhost:5000/categories');
            console.log(res?.data);
            setCat(res?.data)
        }
        getAllCat();
    }, [])

    // category
    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/search-category?q=${search}`);
            console.log(response.data);
            setCat(response.data);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    useEffect(() => {
        handleSearch()
    }, [search])

    return (
        <div className='container mx-auto py-20'>
            <h1 className='text-5xl font-bold text-center dark:text-white my-10'>Books Categories</h1>
            <div className='flex justify-center items-center mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 my-10 max-w-7xl mx-auto'>
                    {
                        cat.map(brand =>
                            <Link key={brand._id} to={`brand/${brand.bookName}`}>
                                <div className="card w-96 h-64 bg-base-100 shadow-xl image-full">
                                    <figure>
                                        <img src={`http://localhost:5000/image/${brand?.image}`} height={104} className='h-64' alt="Shoes" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="text-3xl font-bold uppercase text-center">{brand?.bookName}</h2>
                                        <p className='text-center'>{brand?.shortDesc}</p>
                                        <div className="card-actions w-full">
                                            <button className="btn btn-primary w-full">Seel All Books</button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Brand