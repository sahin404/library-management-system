import React from 'react'
import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import Error from '../Error/Error';
import AddProduct from '../AddProduct/AddProduct';
import Products from '../Products/Products';
import ProductDetails from '../ProductDetails/ProductDetails';
import CartItem from '../CartItem/CartItem';
import Registration from '../../Registration/Registration';
import Login from '../../Login/Login';
import Private from '../../Private/Private';
import UpdateProduct from '../../UpdateProduct/UpdateProduct';
import AddCategory from '../AddCategory/AddCategory';
import Contact from '../Contact/Contact';
import PaymentHistory from '../CartItem/PaymentHistory';
import Route from '../Dashboard/Route';
import DasHome from '../Dashboard/DasHome';
import User from '../Dashboard/User';
import Category from '../Dashboard/Category';
import Product from '../Dashboard/Product';
import Message from '../Dashboard/Message';
import PendingList from '../User/PendingList';
import Books from '../Book/Books';
import Borrowed from '../User/Borrowed';
import Categories from '../Book/Categories';
import BackRquest from '../Dashboard/BackRquest';
import Admin from '../../Private/Admin';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
                loader: () => fetch('/data/brands.json')
            },
            {
                path: '/requested-book',
                element: <Private><PendingList /></Private>
            },
            {
                path: '/books',
                element: <Books />
            },
            {
                path: '/categories',
                element: <Private><Categories /></Private>
            },
            {
                path: '/borrowed-book',
                element: <Private><Borrowed /></Private>
            },
            {
                path: '/brand/:brand_name',
                element: <Products />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Registration />,
            },
        ]
    },
    {
        path: '/dashboard',
        element: <Admin><Route /></Admin>,
        children: [
            {
                path: '/dashboard',
                element: <Admin><DasHome /></Admin>,
            },
            {
                path: '/dashboard/borrowed-list',
                element: <Admin><User /></Admin>,
            },
            {
                path: '/dashboard/category',
                element: <Admin><Category /></Admin>,
            },
            {
                path: '/dashboard/product',
                element: <Admin><Product /></Admin>,
            },
            {
                path: '/dashboard/message',
                element: <Admin><Message /></Admin>,
            },
            {
                path: '/dashboard/back-request',
                element: <Admin><BackRquest /></Admin>,
            },
        ]
    }
])

export default router