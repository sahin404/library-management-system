import axios from 'axios';
import React, { useEffect, useState } from 'react'

const BackRquest = () => {

    const [cat, setCat] = useState([]);

    const getAllCat = async () => {
        const res = await axios.get('http://localhost:5000/books-back-request');
        console.log(res?.data);
        setCat(res?.data)
    }

    useEffect(() => {
        getAllCat();
    }, [])

    const approve = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/back-list/${id}`);
            getAllCat();
            window.alert('successfully approved book back request');
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    return (
        <div className='bg-gray-800 min-h-screen relative'>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-3 divide-gray-200 text-xl">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Serial</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Book Name</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Author</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Quantity</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">User Name</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">User Email</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Approve</th>
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
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.userName}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.email}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <button onClick={() => approve(item._id)}
                                            className="inline-block rounded bg-indigo-600 px-4 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            Approve
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

export default BackRquest