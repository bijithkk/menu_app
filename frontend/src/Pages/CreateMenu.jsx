import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CreateMenuButton from "../components/CreateMenuButton";
import MenuInputs from "../components/MenuInputs";

const CreateMenu = () => { 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [data, setData] = useState([]);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [add, setAdd] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");

  const loadData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/menu/getAllMenu");
      if (response.data.success) {
        console.log(response.data.menus);
        setData(response.data.menus);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (menuId) => {
    setActiveMenuId((prevMenuId) => (prevMenuId === menuId ? null : menuId));
  };

  const submitItems = async (menuId) => {
    try {
      const response = await axios.post(
        backendUrl + `/api/item/${menuId}/createitem`,
        { itemName, description, price }
      );
      if (response.data.success) {
        console.log(response.data.newItem);
        setData((prevData) =>
          prevData.map((menu) =>
            menu.id === menuId
              ? {
                  ...menu,
                  items: [...(menu.items || []), response.data.newItem],
                }
              : menu
          )
        );
        toast.success(response.data.message);
        setActiveMenuId(null);
        setItemName("");
        setDescription("");
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const submitMenus = async () => {
    try {
      const response = await axios.post(backendUrl + "/api/menu/createmenu", {
        menuName,
        menuDescription,
      });
      if (response.data.success) {
        console.log(response.data.newMenu);
        setData((prevData) => [...prevData, response.data.newMenu]);
        toast.success(response.data.message);
        setAdd(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4 sm:mb-0">
          Menus and Items
        </h1>
        <CreateMenuButton
          onClick={() => setAdd(true)}
        >
          Add New Menu
        </CreateMenuButton>
      </div>
      <div className="max-w-4xl mx-auto mt-6">
        {/* -------------add menu-------------------- */}
        {add && (
          <form className="space-y-4 pt-10 mb-10 font-[sans-serif] max-w-md mx-auto">
            <MenuInputs
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="Enter Menu Name"
            />

            <MenuInputs
              onChange={(e) => setMenuDescription(e.target.value)}
              placeholder="Enter Description"
              
            />

            <div className="flex gap-6 justify-between">
              <CreateMenuButton
                onClick={() => setAdd(false)}
              >
                Cancel
              </CreateMenuButton>
              <CreateMenuButton
                onClick={submitMenus}
              >
                Submit
              </CreateMenuButton>
            </div>
          </form>
        )}

        {data &&
          data.map((item, index) => (
            <div key={index} className="mb-6 bg-white p-4 rounded-lg shadow-md">
              {/* Menu Section */}
              <h2 className="text-2xl font-semibold text-blue-600 mb-2">
                {item.name}
              </h2>
              <p className="text-gray-600 mb-4">{item.description}</p>

              {/* Item List */}
              <ul className="list-disc list-inside space-y-2">
                {item.items &&
                  item.items.map((item, index) => (
                    <li key={index} className="text-gray-800">
                      <span className="font-medium text-blue-500">
                        {item.name}:
                      </span>{" "}
                      {item.description}-----₹{item.price}
                    </li>
                  ))}
              </ul>
              <button
                onClick={() => addItem(item.id)}
                className="text-orange-300 pt-2 pb-2"
                type="button"
              >
                {activeMenuId === item.id ? "Cancel" : "Add Items"}
              </button>

              {activeMenuId === item.id && (
                <form className="space-y-4 font-[sans-serif] max-w-md mx-auto">
                  <MenuInputs
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Enter item name"
                  />

                  <MenuInputs
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description"
                  />
                  <MenuInputs
                    type="number"
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Enter price"
                  />

                  <CreateMenuButton
                    onClick={() => submitItems(item.id)}
                  >
                    Submit
                  </CreateMenuButton>
                </form>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default CreateMenu;
