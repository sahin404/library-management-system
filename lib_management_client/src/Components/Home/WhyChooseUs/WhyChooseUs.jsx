import React from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
// AiFillCaretLeft

const WhyChooseUs = () => {
    return (
        <div>
            {/* <div className='container mx-auto min-h-[500px] flex flex-col-reverse lg:flex-row justify-start items-center gap-5 lg:gap-20 p-2 py-20'>
                <h1 className="text-3xl lg:text-6xl dark:text-white text-black">Explore millions of offerings <br />tailored to your business <br />needs</h1>
                <div className='grid grid-cols-2 gap-5 lg:gap-20 mb-5'>
                    <div className='space-y-16'>
                        <div className='border-l-4 pl-3'>
                            <h1 className='text-5xl font-thin text-[#FF6600]'>200M+</h1>
                            <p className='text-2xl font-thin text-[gray]'>Products</p>
                        </div>
                        <div className='border-l-4 pl-3'>
                            <h1 className='text-5xl font-thin text-[#FF6600]'>6069+</h1>
                            <p className='text-2xl font-thin text-[gray]'>Products Categories</p>
                        </div>
                    </div>
                    <div className='space-y-16'>
                        <div className='border-l-4 pl-3'>
                            <h1 className='text-5xl font-thin text-[#FF6600]'>100K+</h1>
                            <p className='text-2xl font-thin text-[gray]'>Suppliers</p>
                        </div>
                        <div className='border-l-4 pl-3'>
                            <h1 className='text-5xl font-thin text-[#FF6600]'>50K+</h1>
                            <p className='text-2xl font-thin text-[gray]'>Countries & Region</p>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='bg-[#f7f2f0] lg:min-h-screen dark:bg-gray-900 '>
                <div className='container mx-auto py-20'>
                    {/* <h1 className='text-3xl lg:text-7xl text-center mb-10 dark:text-white'>Personalize your trading experience with curated benefits</h1>
 */}

                    <div className="carousel w-full">
                        <div id="slide1" className="carousel-item relative w-full ">
                            <img src="/assets/banner-image/sliderImage.png" className="w-full" />
                            <div className='absolute top-[50%] transform translate-y-[-50%] lg:px-32 px-20'>
                                <div className='flex justify-between items-center gap-4 lg:gap-16'>
                                    <div className='flex justify-start items-center lg:gap-10 flex-col md:flex-row'>
                                        <img src="/assets/expart-image/istockphoto-1154642632-612x612.jpg" className='w-16 h-16 lg:h-52 lg:w-52 rounded-full' />
                                        <div>
                                            <h1 className='text-sm md:text-2xl font-bold'>Eva Jane</h1>
                                            <p className='text-[10px] md:text-lg font-thin'>Department of Sociology</p>
                                        </div>
                                    </div>
                                    <p className='text-sm lg:text-2xl font-bold'><sup>"</sup>The Library Management System streamlines access to library resources.
                                        <br />enhancing efficiency for users and administrators while promoting a seamless borrowing experience.<sup>"</sup></p>
                                </div>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide4" className="btn btn-circle"><AiFillCaretLeft/></a>
                                <a href="#slide2" className="btn btn-circle"><AiFillCaretRight/></a>
                            </div>
                        </div>
                        <div id="slide2" className="carousel-item relative w-full">
                            <img src="/assets/banner-image/sliderImage.png" className="w-full" />
                            <div className='absolute top-[50%] transform translate-y-[-50%] lg:px-32 px-20'>
                                <div className='flex justify-between items-center gap-4 lg:gap-16'>
                                    <div className='flex justify-start items-center lg:gap-10 flex-col md:flex-row'>
                                        <img src="/assets/expart-image/HKstrategies-1029-1024x683.jpg" className='w-16 h-16 lg:h-52 lg:w-52 rounded-full' />
                                        <div>
                                            <h1 className='text-sm md:text-2xl font-bold'>Shimul Zahan</h1>
                                            <p className='text-[10px] md:text-lg font-thin'>Department of CSE</p>
                                        </div>
                                    </div>
                                    <p className='text-sm lg:text-2xl font-bold'><sup>"</sup>The Library Management System streamlines access to library resources.
                                        <br />enhancing efficiency for users and administrators while promoting a seamless borrowing experience.<sup>"</sup></p>
                                </div>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle"><AiFillCaretLeft /></a>
                                <a href="#slide3" className="btn btn-circle"><AiFillCaretRight /></a>
                            </div>
                        </div>
                        <div id="slide3" className="carousel-item relative w-full">
                            <img src="/assets/banner-image/sliderImage.png" className="w-full" />
                            <div className='absolute top-[50%] transform translate-y-[-50%] lg:px-32 px-20'>
                                <div className='flex justify-between items-center gap-4 lg:gap-16'>
                                    <div className='flex justify-start items-center lg:gap-10 flex-col md:flex-row'>
                                        <img src="/assets/expart-image/ac2bacd8-ae22-4172-9412-0f8856bdd19c.png" className='w-16 h-16 lg:h-52 lg:w-52 rounded-full' />
                                        <div>
                                            <h1 className='text-sm md:text-2xl font-bold'>Sahin Alam</h1>
                                            <p className='text-[10px] md:text-lg font-thin'>Department of Bangla</p>
                                        </div>
                                    </div>
                                    <p className='text-sm lg:text-2xl font-bold'><sup>"</sup>The Library Management System streamlines access to library resources.
                                        <br />enhancing efficiency for users and administrators while promoting a seamless borrowing experience.<sup>"</sup></p>
                                </div>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle"><AiFillCaretLeft /></a>
                                <a href="#slide4" className="btn btn-circle"><AiFillCaretRight /></a>
                            </div>
                        </div>
                        <div id="slide4" className="carousel-item relative w-full">
                            <img src="/assets/banner-image/sliderImage.png" className="w-full" />
                            <div className='absolute top-[50%] transform translate-y-[-50%] lg:px-32 px-20'>
                                <div className='flex justify-between items-center gap-4 lg:gap-16'>
                                    <div className='flex justify-start items-center lg:gap-10 flex-col md:flex-row'>
                                        <img src="/assets/expart-image/010t010.jpg" className='w-16 h-16 lg:h-52 lg:w-52 rounded-full' />
                                        <div>
                                            <h1 className='text-sm md:text-2xl font-bold'>Akash Tanvir</h1>
                                            <p className='text-[10px] md:text-lg font-thin'>Department of Mathematics</p>
                                        </div>
                                    </div>
                                    <p className='text-sm lg:text-2xl font-bold'><sup>"</sup>The Library Management System streamlines access to library resources.
                                        <br />enhancing efficiency for users and administrators while promoting a seamless borrowing experience.<sup>"</sup></p>
                                </div>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle"><AiFillCaretLeft /></a>
                                <a href="#slide1" className="btn btn-circle"><AiFillCaretRight /></a>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs