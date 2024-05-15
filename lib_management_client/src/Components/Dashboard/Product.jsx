import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddProduct from '../AddProduct/AddProduct';

const Product = () => {

    const [product, setProduct] = useState([]);
    const [complete, setComplete] = useState('')

    const getAllCat = async () => {
        const res = await axios.get('http://localhost:5000/books');
        setProduct(res?.data)
    }

    useEffect(() => {
        getAllCat();
    }, [complete])

    const deleteItem = async (id) => {
        console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/book-delete/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAllCat();
                    })
            }
        })
    }
    return (
        <div className='bg-gray-800 min-h-screen'>
            <div className="overflow-x-auto">
                <div className='flex justify-between items-center px-10 p-5'>
                    <h1 className='text-3xl font-bold text-white'>Heres All the Books</h1>
                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className='bg-green-500 text-white px-10 py-3 rounded-lg'>Add New Book</button>
                </div>
                <table className="min-w-full divide-y-2 divide-gray-400 text-xl">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Product Name</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Brand</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Category</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Quantity</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 text-center">
                        {
                            product && product.map((item, index) =>
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-4 py-3 font-medium text-white">{item?.name}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.category}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.category}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.quantity}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <button onClick={() => deleteItem(item?._id)}
                                            className="inline-block rounded bg-indigo-600 px-4 py-3 text-xs font-medium text-white hover:bg-indigo-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <AddProduct setComplete={setComplete} />
                    </div>
                </dialog>
            </div>
        </div>
    )
}

export default Product