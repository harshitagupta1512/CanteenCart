import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Login from "./components/common/Login";
import Navbar from "./components/templates/Navbar";
import DisplayProfileBuyer from "./components/users/DisplayProfileBuyer";
import DisplayProfileVendor from "./components/users/DisplayProfileVendor";
import EditProfileBuyer from "./components/users/EditProfileBuyer";
import EditProfileVendor from "./components/users/EditProfileVendor";
import MenuVendor from "./components/common/MenuVendor";
import AddFoodItem from "./components/common/AddFoodItem";
import Wallet from "./components/common/Wallet";
import WalletAdd from "./components/common/WalletAdd";
import EditFoodItem from "./components/common/EditFoodItem";
import MenuBuyer from "./components/common/MenuBuyer";
import Favs from "./components/common/Favs"
import OrdersVendor from "./components/common/OrdersVendor"
import MyOrdersBuyer from "./components/common/MyOrdersBuyer"
import PlaceOrder from "./components/common/PlaceOrder"
import Stats from "./components/common/Stats"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {

  let user = localStorage.getItem("usertype");

  if (user === "V") {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="vendor/profile" element={<DisplayProfileVendor />} />
            <Route path="vendor/profile/edit" element={<EditProfileVendor />} />
            <Route path="vendor/menu" element={<MenuVendor />} />
            <Route path="vendor/menu/add" element={<AddFoodItem />} />
            <Route path="vendor/menu/edit" element={<EditFoodItem />} />
            <Route path="vendor/orders" element={<OrdersVendor />} />
            <Route path="vendor/stats" element={<Stats />} />

          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  if (user === "B") {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="buyer/profile" element={<DisplayProfileBuyer />} />
            <Route path="buyer/profile/edit" element={<EditProfileBuyer />} />
            <Route path="buyer/wallet" element={<Wallet />} />
            <Route path="buyer/wallet/add" element={<WalletAdd />} />
            <Route path="buyer/menu" element={<MenuBuyer />} />
            <Route path="buyer/menu/place/order" element={<PlaceOrder />} />
            <Route path="buyer/myorders" element={<MyOrdersBuyer />} />
            <Route path="buyer/favs" element={<Favs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
