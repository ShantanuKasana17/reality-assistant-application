// import React, { useEffect, useState } from "react";
// import { SubHeading, MenuItem } from "../../components";
// // import { data } from "../../constants";
// import "./SpecialMenu.css";
// import { db, collection, query, onSnapshot } from "../../firebase";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { getQuantity } from "../../util/helpers";

// const SpecialMenu = ({ cartItems, setCartItems }) => {
//   const [showBeverages, setShowBeverages] = useState(false);
//   const [showSnacks, setShowSnacks] = useState(false);

//   const [wines, setWines] = useState([]);
//   const [cocktails, setCocktails] = useState([]);
//   const [waterQuantity, setWaterQuantity] = useState(0);

//   useEffect(() => {
//     // data.wines.forEach(async (wine) => {
//     //   await addDoc(collection(db, "wines"), {
//     //     title: wine.title,
//     //     description: wine.tags,
//     //     tags: wine.tags,
//     //     price: "$10",
//     //     status: Math.random() > 0.5 ? true : false,
//     //     type: "wines",
//     //   });
//     // });
//     const winesCollection = query(collection(db, "wines"));
//     const unsubscribeWines = onSnapshot(winesCollection, (querySnapshot) => {
//       const winesData = querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
//       setWines(winesData);
//     });
//     // console.log(wines);

//     // data.cocktails.forEach(async (cocktail) => {
//     //   await addDoc(collection(db, "cocktails"), {
//     //     title: cocktail.title,
//     //     description: cocktail.tags,
//     //     tags: cocktail.tags,
//     //     price: "$20",
//     //     status: Math.random() > 0.5 ? true : false,
//     //     type: "cocktails",
//     //   });
//     // });
//     const cocktailsCollection = query(collection(db, "cocktails"));
//     const unsubscribeCocktails = onSnapshot(
//       cocktailsCollection,
//       (querySnapshot) => {
//         const cocktailsData = querySnapshot.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));
//         setCocktails(cocktailsData);
//       }
//     );
//     // console.log(cocktails);

//     return () => {
//       unsubscribeWines();
//       unsubscribeCocktails();
//     };
//   }, []);

//   const handleIncrement = () => {
//     const value = waterQuantity + 1;
//     setWaterQuantity(value);
//     updateCart(value);
//   };

//   const handleDecrement = () => {
//     const value = waterQuantity > 0 ? waterQuantity - 1 : 0;
//     setWaterQuantity(value);
//     updateCart(value);
//   };

//   const updateCart = (quantity) => {
//     // const updatedCartItems = cartItems.filter((item) => item.title !== "Water");
//     // if (quantity > 0) {
//     //   updatedCartItems.push({
//     //     title: "Water",
//     //     quantity,
//     //   });
//     // }
//     setCartItems(cartItems);
//   };

//   return (
//     <div className="app__specialMenu flex__center section__padding" id="menu">
//       <div className="app__specialMenu-title">
//         <SubHeading title="Menu that fits your palate" />
//         <h1 className="headtext__cormorant">Today&apos;s Special</h1>
//       </div>

//       <div className="app__specialMenu">
//         <div className="app__specialMenu-menu_water flex__center">
//           <div className="app__specialMenu-menu_heading">
//             <p>Water</p>
//           </div>
//           <div className="app__specialMenu_menu_items">
//             <div className="menu-item">
//               <MenuItem
//                 key="101"
//                 title="Add Cups"
//                 tags=""
//                 status=""
//                 cartItems={cartItems}
//                 setCartItems={setCartItems}
//                 quantity={getQuantity("Water", cartItems)}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="app__specialMenu-menu_wine flex__center">
//           <div
//             className="app__specialMenu-menu_heading"
//             onClick={() => setShowBeverages(!showBeverages)}
//           >
//             <p>Beverages</p>
//             {showBeverages ? (
//               <FaChevronUp className="dropdown-icon" />
//             ) : (
//               <FaChevronDown className="dropdown-icon" />
//             )}
//           </div>
//           {showBeverages && (
//             <div className="app__specialMenu_menu_items">
//               {wines.map((wine, index) => (
//                 <MenuItem
//                   key={wine.title + index}
//                   title={wine.title}
//                   price={wine.price}
//                   tags={wine.tags}
//                   status={wine.status}
//                   cartItems={cartItems}
//                   setCartItems={setCartItems}
//                   quantity={getQuantity(wine.title, cartItems)}
//                   inactive={wine.status}
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="app__specialMenu-menu_cocktails flex__center">
//           <div
//             className="app__specialMenu-menu_heading"
//             onClick={() => setShowSnacks(!showSnacks)}
//           >
//             <p>Snacks</p>
//             {showSnacks ? (
//               <FaChevronUp className="dropdown-icon" />
//             ) : (
//               <FaChevronDown className="dropdown-icon" />
//             )}
//           </div>
//           {showSnacks && (
//             <div className="app__specialMenu_menu_items">
//               {cocktails.map((cocktail, index) => (
//                 <MenuItem
//                   key={cocktail.title + index}
//                   title={cocktail.title}
//                   price={cocktail.price}
//                   tags={cocktail.tags}
//                   status={cocktail.status}
//                   cartItems={cartItems}
//                   setCartItems={setCartItems}
//                   quantity={getQuantity(cocktail.title, cartItems)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SpecialMenu;
import React, { useEffect, useState } from "react";
import { SubHeading, MenuItem } from "../../components";
import { toast } from "react-toastify";
import "./SpecialMenu.css";
import { db, collection, query, onSnapshot, where } from "../../firebase";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getQuantity } from "../../util/helpers";

const SpecialMenu = ({ cartItems, setCartItems }) => {
  const [showBeverages, setShowBeverages] = useState(false);
  const [showSnacks, setShowSnacks] = useState(false);
  const [showWater, setShowWater] = useState(false);
  const [wines, setWines] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [waterQuantity, setWaterQuantity] = useState(0);

  useEffect(() => {
    const winesQuery = query(
      collection(db, "wines"),
      where("status", "==", true)
    );
    const unsubscribeWines = onSnapshot(winesQuery, (querySnapshot) => {
      const winesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "Beverages",
      }));
      setWines(winesData);
    });

    const cocktailsQuery = query(
      collection(db, "cocktails"),
      where("status", "==", true)
    );
    const unsubscribeCocktails = onSnapshot(cocktailsQuery, (querySnapshot) => {
      const cocktailsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "Snacks",
      }));
      setCocktails(cocktailsData);
    });

    return () => {
      unsubscribeWines();
      unsubscribeCocktails();
    };
  }, []);

  const handleQuantityChange = (id, quantity, title, type) => {
    const newQuantity = Math.min(Math.max(parseInt(quantity) || 0, 0), 5);
    const updatedCartItems = { ...cartItems };
    const oldQuantity = cartItems[id]?.quantity || 0;

    if (newQuantity > 0) {
      updatedCartItems[id] = { id, title, quantity: newQuantity, type };
    } else {
      delete updatedCartItems[id];
    }

    setCartItems(updatedCartItems);

    // Show toast notification
    if (newQuantity > oldQuantity) {
      toast.success(`${title} has been added successfully to the cart`);
    } else if (newQuantity < oldQuantity) {
      toast.info(`${title} has been removed successfully from the cart`);
    }
  };

  const renderMenuSection = (items, sectionTitle, showState, setShowState) => (
    <div className="app__specialMenu-menu_section flex__center">
      <div
        className="app__specialMenu-menu_heading"
        onClick={() => setShowState(!showState)}
      >
        <p>{sectionTitle}</p>
        {showState ? (
          <FaChevronUp className="dropdown-icon" />
        ) : (
          <FaChevronDown className="dropdown-icon" />
        )}
      </div>
      {showState && (
        <div className="app__specialMenu_menu_items">
          {items.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              type={item.type}
              cartItems={cartItems}
              handleQuantityChange={handleQuantityChange}
              quantity={cartItems[item.id]?.quantity || 0}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="app__specialMenu flex__center section__padding" id="menu">
      <div className="app__specialMenu-title">
        <SubHeading title="Menu that fits your palate" />
        <h1 className="headtext__cormorant">Today's Special</h1>
      </div>

      <div className="app__specialMenu">
        {renderMenuSection(
          [
            {
              id: "water",
              title: "Add Glasses",
              description: "",
              type: "Water",
            },
          ],
          "Water",
          showWater,
          setShowWater
        )}
        {renderMenuSection(wines, "Beverages", showBeverages, setShowBeverages)}
        {renderMenuSection(cocktails, "Snacks", showSnacks, setShowSnacks)}
      </div>
    </div>
  );
};

export default SpecialMenu;
