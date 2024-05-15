import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import AddCategory from '../AddCategory/AddCategory';

const Category = () => {

    const [cat, setCat] = useState([]);
    const [complete, setComplete] = useState('')

    const getAllCat = async () => {
        const res = await axios.get('http://localhost:5000/categories');
        console.log(res?.data);
        setCat(res?.data)
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
                fetch(`http://localhost:5000/cat-delete/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        getAllCat()
                    })
            }
        })
    }

    return (
        <div className='bg-gray-800 min-h-screen relative'>
            <div className='flex justify-between items-center px-10 p-5'>
                <h1 className='text-3xl font-bold text-white'>Heres All the categories</h1>
                <button onClick={() => document.getElementById('my_modal_3').showModal()} className='bg-green-500 px-10 py-3 rounded-lg'>Add New Categories</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-3 divide-gray-200 text-xl">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Image</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Category Name</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Serial</th>
                            <th className="whitespace-nowrap px-4 py-3 font-medium text-white">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-center">
                        {
                            cat && cat.map((item, index) =>
                                <tr key={index}>
                                    <td className="whitespace-nowrap px-4 py-3 font-medium text-white">
                                        <img src={`http://localhost:5000/image/${item.image}`} className='h-10 w-10 mx-auto' alt="" />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{item?.bookName}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-white">{index + 1}</td>
                                    <td className="whitespace-nowrap px-4 py-3">
                                        <button onClick={() => deleteItem(item._id)}
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
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <AddCategory setComplete={setComplete} />
                </div>
            </dialog>
        </div>
    )
}

export default Category