import React, { Fragment,useState } from 'react'
import "./Search.css";
import MetaData from '../layout/MetaData';
import { useNavigate } from 'react-router';

const Search = () => {
    
    
    const [keyword,setKeyword]=useState("");
    const navigate=useNavigate();
    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        if(keyword.trim()){
            //alert({keyword});
            navigate(`/products/${keyword}`);
        } else{
            navigate("/products");
        }
    };
  return <Fragment>

        <MetaData title="Search A Product --SHOP 24 X 7"/>
    <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
            type="text"
            placeholder="Search a Product..."
            onChange={(e)=> setKeyword(e.target.value)} />
            <input type="submit" value="Search" />
    </form>
  </Fragment>
}

export default Search
