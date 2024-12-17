import { useEffect, useState } from "react";
import axios from "axios";
import HomeButton from "../components/HomeButton";


const Home = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState();
  const [title,setTitle] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/menu/getAllMenu");

      if (response.data.success) {
        console.log(response.data.menus);
        setMenu(response.data.menus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const buttonClick = async (menuId) => {
    try {
      const response = await axios.get(backendUrl + `/api/menu/${menuId}`);

      if (response.data.success) {
        console.log(response.data.menu.name);
        setItems(response.data.menu.items);
        setTitle(response.data.menu.name)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1 className="flex font-anton justify-center text-2xl sm:text-3xl md:text-4xl">Menu</h1>
      <p className="flex justify-center pt-6 text-sm px-7 sm:text-base md:text-lg mx-auto text-justify">
        Please take a look at our menu featuring food, drinks, and brunch. If
        you'd like to place an order, use the "Order Online" button
        located below the menu.
      </p>

      {/* -----------------Buttons--------------------------------- */}
      <div className="font-[sans-serif] space-x-4 pt-6 space-y-4 text-center">
        {menu.map((item, index) => (
          <HomeButton
            key={index}
            onClick={() => buttonClick(item.id)}
          >
            {item.name}
          </HomeButton>
        ))}
        
      </div>

      {/* -------------Menu----------------- */}
      <div className="max-w-5xl mx-auto py-10 px-5">
        {/* <!-- Section Title --> */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wider text-red-500">
            {title}
          </h1>
        </div>

        {/* <!-- Menu Items --> */}
        <div className="space-y-6">
          {/* <!-- Bar 42 Mary --> */}
          {items && items.map((item,index) => <div key={index} className="flex justify-between items-start space-y-6 border-b border-gray-700 pb-4">
            <div>
              <h2 className="text-lg font-bold tracking-wider">{item.name}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {item.description}
              </p>
            </div>
            <div className="text-lg font-bold">${item.price}</div>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default Home;
