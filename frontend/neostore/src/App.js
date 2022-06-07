import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Headercmp from './Components/Dashboard/Headercmp'
import Footercmp from './Components/Dashboard/Footercmp'
import Dashboard from "./Components/Dashboard/Dashboard"
import Aboutus from "./Components/Dashboard/Aboutus"
import Login from "./Components/Loginregister/Login"
import Register from "./Components/Loginregister/Register"
import Userdashboard from "./Components/Userdetail/Userdashboard";
import ForgetPassword from "./Components/Forgetpassword/ForgetPassword";
import RecoverPassword from "./Components/Forgetpassword/RecoverPassword";
import Logoutcmp from "./Components/Loginregister/Logoutcmp";
import Productdetails from "./Components/Dashboard/Productdetails";
import Cartcmp from "./Components/Orders/Cartcmp";
import Profile from "./Components/Dashboard/Profile/Profile";
import Checkoutcmp from "./Components/Dashboard/Checkoutcmp";
import Productdetail from "./Components/Products/Productdetail";
import Mapcmp from "./Components/Mapcmp";
import Addaddress from "./Components/Dashboard/Profile/Addaddress";
import NotFound from "./Components/Dashboard/Notfound";
import CartEmpty from "./Components/CartEmpty";
import LoginAdmin from "./Components/Loginregister/LoginAdmin";
import AdminCrud from "./Components/AdminCrud";
import AllOrder from "./Components/Orders/AllOrder"
import MenuProvider from 'react-flexible-sliding-menu';
import Notifications from './Components/Dashboard/Notifcaitons'
import AdminNotification from "./Components/AdminNotification";

function App() {
  return (
    <MenuProvider MenuComponent={Notifications} width="30%">
    <div className="App">
      <Router>
      <Headercmp />
      <div style={{display:"flex",flexDirection:"column",minHeight:"40vh"}}>
        <Switch>
          <Route path="/aboutus">
            <Aboutus />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/loginadmin">
            <LoginAdmin />
          </Route>
          <Route path="/admincrud">
            <AdminCrud />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/cart" exact>
            <Cartcmp />
          </Route>
          <Route path="/cartempty" exact>
            <CartEmpty />
          </Route>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/dashboard">
            <Userdashboard />
          </Route>
          <Route path="/products">
            <Productdetail />
          </Route>
          <Route path="/forgetpassword">
            <ForgetPassword />
          </Route>
          <Route path="/recoverpassword">
            <RecoverPassword />
          </Route>
          <Route path="/logout">
            <Logoutcmp />
          </Route>
          <Route path="/getdetails/:id">
            <Productdetails />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/checkout">
            <Checkoutcmp />
          </Route>
          <Route path="/location">
            <Mapcmp />
          </Route>
          <Route path="/addaddress">
            <Addaddress />
          </Route>
          <Route path="/allorder">
            <AllOrder />
          </Route>
          <Route path="/adminnotificaitons">
            <AdminNotification />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
            <Footercmp />
    </Router>
      </div>
      </MenuProvider>
  );
}

export default App;
