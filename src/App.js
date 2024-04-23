import './App.css';

import Home from './Components/Customer/Home';
import { LoginForm } from './Components/Login/LoginForm';
import { SignupForm } from './Components/Login/SignupForm';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Profile from './Components/Customer/Profile';
import Dashboard from './Components/Owner Dashbord/Dashboard.jsx';
import UpdateMenuForm from './Components/Owner Dashbord/UpdateMenuForm';
import UpdateProfileForm from './Components/Owner Dashbord/UpdateProfileForm';
import AllMenus from './Components/Customer/AllMenus.js';
import SearchMenu from './Components/Customer/SearchMenu.js';
import Filter from './Components/Customer/Filter.js';
import Banner from './Components/Customer/Banner.js'
function App() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/",
      element: <Banner />,
    },
    {
      path: "/signup",
      element: <SignupForm />,
    },
    {
      path:"/login",
      element:<LoginForm/>
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          index: true,
          element: <UpdateProfileForm />,
        },
        {
          path: "menu",
          element: <UpdateMenuForm />,
        },
      ],
    },

    {
      path: "/customer",
      element: <Home />,
      children: [
        {
          index: true,
          element: <AllMenus />,
        },
        {
          path: "search-menu",
          element: <SearchMenu />,
        },
        {
          path: "filter-menu",
          element: <Filter />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
