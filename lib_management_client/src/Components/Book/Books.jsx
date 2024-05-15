import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Home/Navbar/Navbar';
import { BiMicrophone } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';
import { MyContext } from '../../Auth/AuthProvider';

const Books = () => {

    const [data, setData] = useState([]);
    const { user } = useContext(MyContext);

    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get(`http://localhost:5000/books`);
            console.log(res.data);
            setData(res?.data)
        }
        getAllCat();
    }, [])

    const borrowBook = async (d) => {
        if (user?.reloadUserInfo?.email) {
            const book = {
                ...d,
                email: user?.reloadUserInfo?.email,
                userName: user?.reloadUserInfo?.displayName,
                status: 'borrow-request'
            }
            const res = await axios.post('http://localhost:5000/borrow', book);
            window.alert("requested successfully");
            // setCat(res?.data)
            if (res.data) {
                window.alert('borrow request successfully');
            }
        }
    }


    const handleSearch = async (e) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/search?q=${e.target.value}`);
            setData(response.data);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };


    return (
        <div className=' bg-gray-900'>
            <div className='bg-[#4b2b1f]'>
                <Navbar />
            </div>
            <div className='relative flex justify-center items-center  bg-gray-900'>
                <div className='md:mb-8 flex justify-between bg-black items-center relative w-9/12 md:w-1/3 input mt-20 bg-transparent input-bordered border-white'>
                    <button className='btn bg-transparent btn-outline absolute left-0 outline-none border-none'>
                        <BiMicrophone className='text-2xl text-white font-thin' />
                    </button>
                    <input onChange={handleSearch} type="text" className='px-10 bg-transparent text-lg font-thin w-full text-white placeholder:text-white' placeholder='Search your best book' />
                    <button className='btn bg-transparent btn-outline absolute right-0 outline-none border-none'>
                        <BsSearch className='text-2xl text-white font-thin' />
                    </button>
                </div>
            </div>
            <div className='max-w-7xl  bg-gray-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-10 mx-auto'>
                {data && data.map(d =>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <figure>
                            <img src={`http://localhost:5000/image/${d?.image}`} className='h-64 w-full' alt="Album" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title"> Book Name: {d.name}</h2>
                            <p> Book Description: {d.description}</p>
                            <p>Book Author: {d.writter}</p>
                            <p>Book Quantity: {d.quantity}</p>
                            <p>Book Added Date: {d.date}</p>
                            <p>Book Category: {d.category}</p>
                            <div className={`card-actions justify-end w-full`}>
                                <button onClick={() => borrowBook(d)} className="px-5 py-2 hover:bg-red-500 bg-white text-black w-full text-center">
                                    Borrow Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Books