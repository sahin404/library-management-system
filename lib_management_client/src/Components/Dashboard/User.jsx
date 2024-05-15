import axios from 'axios';
import React, { useEffect, useState } from 'react'

const User = () => {

    const [cat, setCat] = useState([]);

    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get('http://localhost:5000/api/borrowed-books');
            console.log(res?.data);
            setCat(res?.data)
        }
        getAllCat();
    }, [])


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
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {
                            cat && cat.map((item, index) => item?.status === 'approved' &&
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-4 py-3 font-medium text-white">
                                        <h1>{index + 1}</h1>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.name}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.writter}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.quantity}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.userName}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default User