import React, { Fragment ,useEffect} from 'react'
//import {CgMouse} from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData  from '../layout/MetaData';
import {getProduct,clearErrors} from "../../actions/productAction"
import {useSelector,useDispatch} from "react-redux";
//import {} from "react-redux";
import { useAlert } from 'react-alert';
import Loader from "../layout/Loader/Loader";

const Home = () => {
  const alert=useAlert();
  
  const dispatch=useDispatch();
  
  const {loading,error,products}=useSelector((state)=>state.products);
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
    
  }, [dispatch,error,alert]);

//console.log("Loading"+loading);
  return (
  
  <Fragment>

    {loading ? (
      <Loader />
    ):(
      <Fragment>
      <MetaData title="SHOP 24X7"/>
      <div className="banner">
        <p>Welcome to Shop 24X7</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>
            Scroll
          </button>
        </a>

      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
    </Fragment>
    )}
  </Fragment>
    
);
};
export default Home;
