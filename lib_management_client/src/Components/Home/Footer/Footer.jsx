import React from 'react'

const Footer = () => {
    return (
        <div className='bg-[#4b2b1f]'>
            <div className='p-10 text-neutral-content max-w-7xl mx-auto'>
                <footer className="footer container mx-auto">
                    <nav className='text-lg'>
                        <header className="footer-title">Book</header>
                        <a className="link link-hover">Borrow Book</a>
                        <a className="link link-hover">Search Book</a>
                        <a className="link link-hover">Review</a>
                        <a className="link link-hover">Return Book</a>
                    </nav>
                    <nav className='text-lg'>
                        <header className="footer-title">Library</header>
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Address</a>
                        <a className="link link-hover">Press</a>
                    </nav>
                    <nav className='text-lg'>
                        <header className="footer-title">Legal</header>
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </nav>
                </footer>
            </div>
        </div>
    )
}

export default Footer