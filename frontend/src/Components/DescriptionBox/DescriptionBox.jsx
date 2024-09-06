import React from 'react'
import "./DescriptionBox.css"

export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">reviews</div>
        </div>
            <div className="descriptionbox-description">
                <p>An e-commerce website is an online platforn that facilitates the buying and selling of products 
                    or services over the internet servers as avirtual marketplace where busiines and individuals showcase their products,
                     intercat with customer, and conduct transactions without the need for a physical presence. e-commerce websites have gained 
                     immense popularity due to their concentions accessibility, and the globbal reach they offer.
                </p>
                <p>
                    E-commerce website typically display products or services along with detailed descriptions, images, prices, and any available variations (eg, sizes, colors
                    ). Each product usually has its own dedicated page with relevant information.
                </p>
            </div>

    </div>
  )
}
export default DescriptionBox