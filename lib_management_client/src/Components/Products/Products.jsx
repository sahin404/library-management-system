import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Home/Navbar/Navbar'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { BsCheckLg } from 'react-icons/bs';
import Slider from '../Slider/Slider';
import axios from 'axios';
import { MyContext } from '../../Auth/AuthProvider';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
const Review = () => {

    const { brand_name } = useParams();
    const { user } = useContext(MyContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get(`http://localhost:5000/book-by-cat?name=${brand_name}`);
            setData(res?.data)
        }
        getAllCat();
    }, [brand_name])

    const [cat, setCat] = useState([]);

    useEffect(() => {
        const getAllCat = async () => {
            const res = await axios.get('http://localhost:5000/categories');
            setCat(res?.data)
        }
        getAllCat();
    }, [])



    const borrowBook = async (d) => {
        console.log(user?.reloadUserInfo);
        if (user?.reloadUserInfo?.email) {
            const book = {
                ...d,
                email: user?.reloadUserInfo?.email,
                userName: user?.reloadUserInfo?.displayName,
            }
            const res = await axios.post('http://localhost:5000/borrow', book);
            console.log(res?.data);
            // setCat(res?.data)
            if (res.data) {
                window.alert('borrow request successfully');
            }
        }
    }

    // /borrow-list/:email

    const [borrow, setBorrow] = useState([]);

    useEffect(() => {
        const getAllCat = async () => {
            const res = user?.reloadUserInfo?.email ? await axios.get(`http://localhost:5000/borrow-list/${user?.reloadUserInfo?.email}`) : window.alert("First need to register...")
            console.log(res?.data);
            setBorrow(res?.data)
        }
        getAllCat();
    }, [])


    // working tomorrow-----------------------

    return (
        <div>
            <div className='bg-[#4b2b1f]'>
                <Navbar />
            </div>
            <div> <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                {
                    cat && cat?.map((item, index) =>
                        <SwiperSlide key={index}>
                            <img src={`http://localhost:5000/image/${item.image}`} alt="" className='w-full h-[500px]' />
                        </SwiperSlide>

                    )
                }

            </Swiper></div>

            <div className='py-20 text-center text-bold text-4xl uppercase'>
                <div className=''>
                    <h1>{brand_name}</h1>
                </div>
            </div>
            {/* map hobe */}
            <div className='max-w-7xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 py-10 mx-auto'>
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
                            <div className={`justify-end w-full`}>
                                <button onClick={() => borrowBook(d)} className="px-5 py-2 w-full bg-white hover:bg-red-500 text-center bg-whites text-black">
                                    Borrow Request
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Review