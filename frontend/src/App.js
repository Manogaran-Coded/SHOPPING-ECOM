
import './App.css';
import { useEffect,useState } from 'react';
import { ReactNavbar } from 'overlay-navbar';
import Header from "./component/layout/Header/Header.js";
import {BrowserRouter as Router,Routes, Route,Link} from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer";
import React from 'react';
import Home from "./component/Home/Home.js";
//import Loader from './component/layout/Loader/Loader';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import UserOptions from "./component/layout/Header/UserOptions";
import {loadUser} from "./actions/userAction";
import {useSelector} from "react-redux";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
//import { UpdatePassword } from "./component/User/UpdatePassword.js";
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from  "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from 'axios';
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Dashboard from "./component/Admin/Dashboard.js"
import ProductList from "./component/Admin/ProductList.js";
//import OrderList from "./component/Admin/OrderList";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from './component/layout/NotFound/NotFound';

function App() {
  const {isAuthenticated,user}=useSelector((state)=>state.user);
  const [stripeApiKey,setStripeApiKey]=useState("");
  const stripePromise=loadStripe(stripeApiKey);
  
  async function getStripeApiKey(){
    const {data}=await axios.get("api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
 // var WebFont = require('webfontloader');
  useEffect(()=>{
    WebFont.load({
      google:{
        families:  ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);

  window.addEventListener("contextmenu",(e)=>e.preventDefault());
  return (

   <Router>
   
      <ReactNavbar />
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>


        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
         <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/me/update" element={<UpdateProfile />} />
        <Route exact path="/password/update" element={<UpdatePassword />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route exact path="/password/reset/:token" element={<ResetPassword />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/about" element={<About/>} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
            <Route exact path="/shipping" element={<Shipping />}/>
            <Route exact path="/success" element={<OrderSuccess />}/>
            <Route exact path="/orders" element={<MyOrders />}/>
            <Route exact path="/order/confirm"  element={<ConfirmOrder />}/>
            <Route exact path="/order/:id" element={<OrderDetails />}/>
            <Route exact path="/process/payment" element={<Elements stripe={stripePromise}> <Payment /></Elements>}/>
            <Route  path="/admin/dashboard" isAdmin={true} element={<Dashboard />}/>
            <Route  path="/admin/products" isAdmin={true} element={<ProductList />}/>
            <Route  path="/admin/product" isAdmin={true} element={<NewProduct />}/>

            <Route  path="/admin/product/:id" isAdmin={true} element={<UpdateProduct />}/>
            <Route  path="/admin/orders" isAdmin={true} element={<OrderList />}/>
            <Route  path="/admin/order/:id" isAdmin={true} element={<ProcessOrder />}/>
            <Route  path="/admin/users/" isAdmin={true} element={<UsersList />}/>
            <Route  path="/admin/user/:id" isAdmin={true} element={<UpdateUser />}/>
            <Route  path="/admin/reviews" isAdmin={true} element={<ProductReviews />}/>
            <Route element={<NotFound/>} />    
        </Route>
        </Routes>
      <Footer />

    </Router>
  );
  
}

export default App;
