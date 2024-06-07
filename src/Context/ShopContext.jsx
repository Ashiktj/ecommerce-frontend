import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Shopcategory from "../Pages/Shopcategory";
import { baseurl } from "../Components/Url";


export const ShopContext = createContext(null)



const ShopContextProvider = (props) => {

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
};


    const [all_product,setAll_Product] = useState([]);

    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
      fetch(`${baseurl}/allproducts`) 
            .then((res) => res.json()) 
            .then((data) => setAll_Product(data))
  
      if(localStorage.getItem("auth-token"))
      {
        fetch(`${baseurl}/getcart`, {
        method: 'POST',
        headers: {
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem("auth-token")}`,
          'Content-Type':'application/json',
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => {setCartItems(data)});
      }
  
  }, [])

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        console.log(cartItems);
        if (localStorage.getItem("auth-token")) {
            fetch(`${baseurl}/addtocart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem("auth-token")}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((resp) => resp.json())
                .then((data) => { console.log(data) });
        }
    };
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if(localStorage.getItem("auth-token"))
        {
          fetch(`${baseurl}/removefromcart`, {
          method: 'POST',
          headers: {
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem("auth-token")}`,
            'Content-Type':'application/json',
          },
          body: JSON.stringify({"itemId":itemId}),
        })
          .then((resp) => resp.json())
          .then((data) => {console.log(data)});
        }
      };
    

      const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            let itemInfo = all_product.find((product) => product.id === Number(item));
            console.log(itemInfo);
            totalAmount += cartItems[item] * itemInfo.new_price;
          }
        }
        return totalAmount;
      };
    

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
          if (cartItems[item] > 0) {
            totalItem += cartItems[item];
          }
        }
        return totalItem;
      };
    


    const contextValue = {getTotalCartAmount,Shopcategory, removeFromCart,getTotalCartItems, all_product, addToCart, cartItems }

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider

// import React, { useEffect, useState, createContext } from "react";

// export const ShopContext = createContext(null);

// const ShopContextProvider = (props) => {
//     const getDefaultCart = () => {
//         let cart = {};
//         for (let i = 0; i <= 300; i++) {
//             cart[i] = 0;
//         }
//         return cart;
//     };

//     const [all_product, setAll_Product] = useState([]);
//     const [cartItems, setCartItems] = useState(getDefaultCart());

//     useEffect(() => {
//         fetch('http://localhost:4000/allproducts')
//             .then((res) => res.json())
//             .then((data) => setAll_Product(data))
//             .catch((error) => console.error('Error fetching all products:', error));

//         if (localStorage.getItem("auth-token")) {
//             fetch('http://localhost:4000/getcart', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'auth-token': `${localStorage.getItem("auth-token")}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(),
//             })
//                 .then((resp) => resp.json())
//                 .then((data) => setCartItems(data))
//                 .catch((error) => console.error('Error fetching cart:', error));
//         }
//     }, []);

//     const addToCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//         console.log(cartItems);

//         if (localStorage.getItem("auth-token")) {
//             fetch('http://localhost:4000/addtocart', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'auth-token': `${localStorage.getItem("auth-token")}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ itemId }),
//             })
//                 .then((resp) => resp.json())
//                 .then((data) => console.log(data))
//                 .catch((error) => console.error('Error adding to cart:', error));
//         }
//     };

//     const removeFromCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

//         if (localStorage.getItem("auth-token")) {
//             fetch('http://localhost:4000/removefromcart', {
//                 method: 'POST',
//                 headers: {
//                     Accept: 'application/json',
//                     'auth-token': `${localStorage.getItem("auth-token")}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ itemId }),
//             })
//                 .then((resp) => resp.json())
//                 .then((data) => console.log(data))
//                 .catch((error) => console.error('Error removing from cart:', error));
//         }
//     };

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         if (all_product.length > 0) {
//             for (const item in cartItems) {
//                 if (cartItems[item] > 0) {
//                     let itemInfo = all_product.find((product) => product.id === Number(item));
//                     if (itemInfo) {
//                         totalAmount += cartItems[item] * itemInfo.new_price;
//                     }
//                 }
//             }
//         }
//         return totalAmount;
//     };

//     const getTotalCartItems = () => {
//         let totalItem = 0;
//         for (const item in cartItems) {
//             if (cartItems[item] > 0) {
//                 totalItem += cartItems[item];
//             }
//         }
//         return totalItem;
//     };

//     const contextValue = {
//         removeFromCart,
//         getTotalCartItems,
//         all_product,
//         addToCart,
//         cartItems,
//         getTotalCartAmount
//     };

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// };

// export default ShopContextProvider;
