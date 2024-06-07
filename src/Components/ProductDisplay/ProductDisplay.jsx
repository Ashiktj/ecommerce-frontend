import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from "../../Context/ShopContext";

function ProductDisplay(props) {
    const { product } = props
    const {addToCart} = useContext(ShopContext);

    return (
        <div className='Productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-prices-old">
                        ${product.old_price}
                    </div>
                    <div className="productdisplay-right-prices-new">
                        ${product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    Ultra-soft fabric: Crafted from 100% organic cotton, this tee feels luxuriously soft against your skin, perfect for the warm Alangad climate.
                    Hand-drawn design: Featuring a vibrant hand-drawn illustration of a palm tree swaying against a fiery sunset, capturing the essence of a tropical paradise.
                    Relaxed fit: The loose and comfortable fit allows for effortless movement and all-day comfort.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
<p className='productdisplay-right-category'><span>category :</span> Women , T-Shirt, Crop Top</p>

<p className='productdisplay-right-category'><span>Tags :</span> Modern , Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay