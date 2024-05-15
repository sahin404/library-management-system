import React, { useContext } from 'react'
import BgImage from '/assets/banner-image/01.jpg'
import image from "../../../../public/assets/banner-image/desk.jpg"
// import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';
import { BsTelephoneFill, BsSearch } from 'react-icons/bs';
import { BiMicrophone } from 'react-icons/bi';
import { Typewriter } from 'react-simple-typewriter'
import axios from 'axios';
import { MyContext } from '../../../Auth/AuthProvider';

const Banner = () => {

    const { setSearch } = useContext(MyContext)

    return (
        <div className='max-h-screen -mt-[118px] lg:-mt-[193px] w-full top-0 bg-black bg-blend-overlay bg-opacity-60'
            style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGxpYnJhcnl8ZW58MHx8fHwxNjU4NDAwNTQ4&ixlib=rb-1.2.1&q=80&w=2000)`, backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>

            <div className='container mx-auto flex justify-center flex-col h-screen items-center space-y-3 lg:mt-20' data-aos="fade-in">
                <div className='md:mb-8 flex justify-between items-center relative w-9/12 md:w-1/3 input mt-20 bg-transparent input-bordered border-white'>
                    <button className='btn bg-transparent btn-outline absolute left-0 outline-none border-none'>
                        <BiMicrophone className='text-2xl text-white font-thin' />
                    </button>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" className='px-10 bg-transparent text-lg font-thin w-full text-white placeholder:text-white' placeholder='Search your book category' />
                    <button className='btn bg-transparent btn-outline absolute right-0 outline-none border-none'>
                        <BsSearch className='text-2xl text-white font-thin' />
                    </button>
                </div>
                <div className='text-white text-sm font-medium md:text-2xl text-center md:max-w-[800px]'>
                    Welcome to <span className='text-red-600 font-bold'>Library Plus</span>, where we are dedicated to enhancing your reading experience. Whether you're an ardent reader, a knowledge seeker, or a literary explorer, we've curated a diverse collection of books just for you.
                </div>

                <div className='pt-8'>
                    <Link to='/books'>
                        <h1 className='btn bg-black text-white capitalize text-lg font-medium px-8'>
                            <Link to='/books'>
                                <BsTelephoneFill className='text-lg font-thin mr-2' />
                            </Link>Contact Us Now
                        </h1>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Banner