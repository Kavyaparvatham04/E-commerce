import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);
const getDefaultcart =() =>{
    let cart={};
    for (let index=0;index< 300+1; index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{

    const [all_product, setAll_product] =useState([]);
    const [cartItems,SetcartItems] = useState(getDefaultcart());

    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAll_product(data));

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getcart',{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((response)=>response.json())
            .then((data)=>SetcartItems(data));
        }
    },[])
    
   
    const addToCart = (itemId)=>{
        SetcartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    const removeFromCart = (itemId)=>{
        SetcartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
                method:"POST",
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    const getTotalCartAmount = () =>{
        if (all_product.length === 0) {
            console.log("Products are not loaded yet.");
            return 0;
        }
        else{
            console.log('Successfully Fetched');
            console.log(all_product);
        }
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0)
                {
                let iteminfo = all_product.find((product)=>product.id === Number(item));
                //totalAmount+=iteminfo.new_price*cartItems[item];

                if (iteminfo && iteminfo.new_prices) {
                    totalAmount += iteminfo.new_prices * cartItems[item];
                } else {
                    console.log(`Product not found or price missing for item ID: ${item}`);
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];
            }
        }
        return totalItem
    }
    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    

    return(
        <ShopContext.Provider value ={contextValue}>
            {props.children}
        /</ShopContext.Provider>
    )
}

export default ShopContextProvider