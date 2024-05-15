import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../Auth/AuthProvider';
import axios from 'axios';
import Navbar from '../Home/Navbar/Navbar';

const Borrowed = () => {

    const [cat, setCat] = useState([]);
    const { user } = useContext(MyContext);

    const getAllCat = async () => {
        const res = await axios.get(`http://localhost:5000/borrowed-list/${user?.email}`);
        console.log(res?.data);
        setCat(res?.data)
    }

    useEffect(() => {
        getAllCat();
    }, [])

    const handleReturn = async (id) => {
        try {
            await axios.put(`http://localhost:5000/borrow-list/${id}`);
            getAllCat();
            window.alert('Back request send to admin');
        } catch (error) {
            console.error('Error returning borrowed item:', error);
        }
    };

    return (
        <div className='bg-gray-800 min-h-screen relative'>
            <Navbar />
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-3 divide-gray-200 text-xl">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Serial</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Book Name</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Author</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Quantity</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Status</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Delete</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {
                            cat && cat.map((item, index) =>
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-4 py-3 font-medium text-white">
                                        <h1>{index + 1}</h1>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.name}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.writter}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.quantity}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.status}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <button onClick={() => handleReturn(item._id)}
                                            className="inline-block rounded bg-indigo-600 px-4 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            Back Now
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Borrowed