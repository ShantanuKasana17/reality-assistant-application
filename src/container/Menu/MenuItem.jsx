// import React, { useState } from "react";
// import "./MenuItem.css";
// import { data } from "../../constants";

// const MenuItem = ({
//   id,
//   title,
//   description,
//   type,
//   cartItems,
//   handleQuantityChange,
//   setCartItems,
//   quantity,
// }) => {
//   const isMaxQuantity = quantity >= 5;
//   const isMinQuantity = quantity <= 0;
//   const [itemValue, setItemValue] = useState(quantity);

//   // const handleQuantityChange = (delta) => {
//   //   const newQuantity = itemValue + delta;
//   //   if (newQuantity > data.MAX_QUANTITY) return;
//   //   setItemValue(newQuantity);

//   //   const updatedCart = cartItems.map((item) =>
//   //     item.title === title ? { ...item, quantity: item.quantity + delta } : item
//   //   );

//   //   if (newQuantity > 0) {
//   //     const itemInCart = cartItems.find((item) => item.title === title);
//   //     if (itemInCart) {
//   //       setCartItems(updatedCart);
//   //     } else {
//   //       setCartItems([...cartItems, { title, price, quantity: newQuantity }]);
//   //     }
//   //   } else {
//   //     setCartItems(updatedCart.filter((item) => item.quantity > 0));
//   //   }
//   // };

//   return (
//     <div className="app__menuitem">
//       <div className="app__menuitem-head">
//         <div className="app__menuitem-name">
//           <p className="p__cormorant" style={{ color: "#DCCA87" }}>
//             {title}
//           </p>
//         </div>
//         <div className="app__menuitem-dash" />
// <div className="app__menuitem-price">
//   {/* <p className="p__cormorant">{price}</p> */}
//   <button
//     onClick={() => handleQuantityChange(id, quantity - 1, title, type)}
//     disabled={isMinQuantity}
//   >
//     -
//   </button>
//   <span className="item-value">{quantity}</span>
//   <button
//     onClick={() => handleQuantityChange(id, quantity + 1, title, type)}
//     disabled={isMaxQuantity}
//   >
//     +
//   </button>
// </div>
//       </div>
//       <div className="app__menuitem-sub">
//         <p className="p__opensans" style={{ color: "#AAA" }}>
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MenuItem;

import React from "react";
import "./MenuItem.css";

const MenuItem = ({
  id,
  title,
  description,
  type,
  cartItems,
  handleQuantityChange,
  quantity,
}) => {
  const isWaterItem = type === "Water";
  const isMaxQuantity = !isWaterItem && quantity >= 5;
  const isMinQuantity = quantity <= 0;

  // return (
  //   <div className="app__menuitem">
  //     <div className="app__menuitem-content">
  //       <div className="app__menuitem-name">
  //         <p className="p__cormorant" style={{ color: "#DCCA87" }}>
  //           {title}
  //         </p>
  //       </div>
  //       <div className="app__menuitem-description">
  //         <p className="p__opensans" style={{ color: "#AAA" }}>
  //           {description}
  //         </p>
  //       </div>
  //     </div>
  //     <div className="app__menuitem-quantity">
  //       <button
  //         className="quantity-button"
  //         onClick={() => handleQuantityChange(id, quantity - 1, title, type)}
  //         disabled={isMinQuantity}
  //       >
  //         -
  //       </button>
  //       <span className="quantity-value">{quantity}</span>
  //       <button
  //         className="quantity-button"
  //         onClick={() => handleQuantityChange(id, quantity + 1, title, type)}
  //         disabled={isMaxQuantity}
  //       >
  //         +
  //       </button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="app__menuitem">
      <div className="app__menuitem-head">
        <div className="app__menuitem-name">
          <p className="p__cormorant" style={{ color: "#DCCA87" }}>
            {title}
          </p>
          <div className="app__menuitem-sub">
            <p className="p__opensans" style={{ color: "#AAA" }}>
              {description}
            </p>
          </div>
        </div>
        <div className="app__menuitem-dash" />
        <div className="app__menuitem-price">
          {/* <p className="p__cormorant">{price}</p> */}
          <button
            onClick={() => handleQuantityChange(id, quantity - 1, title, type)}
            disabled={isMinQuantity}
          >
            -
          </button>
          <span className="item-value">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(id, quantity + 1, title, type)}
            disabled={isMaxQuantity}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
