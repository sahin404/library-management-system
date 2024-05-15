import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../Auth/AuthProvider';
import axios from 'axios';
import Navbar from '../Home/Navbar/Navbar';

const PendingList = () => {

    const [cat, setCat] = useState([]);
    const { user } = useContext(MyContext);

    console.log(user?.email);

    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get(`http://localhost:5000/borrow-list/${user?.email}`);
            console.log(res?.data);
            setCat(res?.data)
        }
        getAllCat();
    }, [])

    const handleDelete = async (id) => {
        try {
            console.log(id);
            await axios.delete(`http://localhost:5000/borrow-list/${id}`);
            setCat(cat.filter(item => item._id !== id));
            window.alert('Deleted Successfully')
        } catch (error) {
            console.error('Error deleting borrow request:', error);
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
                                        <button onClick={() => handleDelete(item._id)}
                                            className="inline-block rounded bg-indigo-600 px-4 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            Delete Request
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

export default PendingList