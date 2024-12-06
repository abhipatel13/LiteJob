import { createBrowserRouter, redirect } from "react-router-dom";
import Main from "../template/Main";
import Dashboard from "../pages/Dashboard";
import Chats from "../pages/Chats";
import Invoices from "../pages/Invoices";
import Settings from "../pages/Settings";
import HistoryUser from "../pages/HistoryUser";
import InvoiceDetail from "../pages/InvoiceDetail";
import DashboardBusiness from "../pages/DashboardBussiness";
import HistoryBussiness from "../pages/HistoryBusiness";
import Services from "../pages/Services";
import ChatMessages from "../pages/ChatMessages";
import NoMessage from "../pages/NoMessage";
import RecentOrders from "../pages/RecentOrders";
import RecentReviews from "../pages/RecentReviews";
import BusinessSettings from "../pages/BusinessSettings";
import UserInvoices from "../pages/UserInvoice";
import UserRecentOrders from "../pages/UserRecentOrders";
import UserLoginForm from "../components/authentication/UserLoginForm";
import LandingBody from "../components/landingPage/LandingBody";
import LoginPage from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { ForgottenPassword } from "../components/authentication/Forgotten";
import HomeBody from "../components/homePage/HomeBody";
import ZoomedMain from "../components/zoomedPage/ZoomedMain";
import HomePage from "../pages/Home";
import Cleaner from "../pages/Cleaner";
import Electrician from "../pages/Electrician";
import ChatBox from "../components/businessServices/ChatBox";
import BusinessService from "../components/businessServices/BusinessService";

const routes = createBrowserRouter([
  {
    path:"/",
    element:<LandingBody/>
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "user",
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "recent-purchases",
            element: <UserRecentOrders />,
          },
          {
            path: "chats/open/:id",
            element: <ChatMessages />,
          },
          {
            path: "chats",
            element: <Chats />,
            children: [
              {
                path: "",
                element: <NoMessage />,
              },
              {
                path: ":id",
                element: <ChatMessages />,
              },
            ],
          },
          {
            path: "invoices",

            children: [
              {
                path: "",
                element: <UserInvoices />,
              },
              {
                path: ":id",
                element: <InvoiceDetail />,
              },
            ],
          },
          {
            path: "history",
            children: [
              {
                path: "",
                element: <HistoryUser />,
              },
              {
                path: "recent-purchases",
                element: <UserRecentOrders />,
              },
              {
                path: "recent-reviews",
                element: <RecentReviews />,
              },
            ],
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "business",
        children: [
          {
            path: "",
            element: <DashboardBusiness />,
          },
          {
            path: "recent-orders",
            element: <RecentOrders />,
          },
          {
            path: "chats/open/:id",
            element: <ChatMessages />,
          },
          {
            path: "chats",
            element: <Chats />,
            children: [
              {
                path: "",
                element: <NoMessage />,
              },
              {
                path: ":id",
                element: <ChatMessages />,
              },
            ],
          },
          {
            path: "invoices",

            children: [
              {
                path: "",
                element: <Invoices />,
              },
              {
                path: ":id",
                element: <InvoiceDetail />,
              },
            ],
          },
          {
            path: "history",
            children: [
              {
                path: "",
                element: <HistoryBussiness />,
              },
              {
                path: "recent-purchases",
                element: <RecentOrders />,
              },
            ],
          },
          {
            path: "settings",
            element: <BusinessSettings />,
          },
          {
            path: "services",
            element: <Services />,
          },
        ],
      },
    ],
  },
  
  {
    path:"/login",
    element:<LoginPage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
  ,
  {
    path:"/forgottenPassword",
    element:<ForgottenPassword/>
  },
  {
    path:"/forgottenUsername",
    element:<forgottenUsername/>
  },
  {
    path:"/Home", 
    element:<HomeBody />
  },
  {
    path:"/ZoomedMain", 
    element:<ZoomedMain />
  },
  {
    path:"/review", 
    element:<BusinessService />
  },
  // {
  //   path: "/profile/:slug", 
  //   element:<Electrician />
  // },
  {
    path: "profile",
    children: [
      {
        path: ":slug", // removed the leading '/'
        element: <Electrician />,
      },
      {
        path: "chats",
        element: <ChatBox />,
        // children: [
        //   {
        //     path: "",
        //     element: <NoMessage />,
        //   },
        //   {
        //     path: ":id",
        //     element: <ChatMessages />,
        //   },
        // ],
      },
    ],
  },
  
  {
    path:"/filter/:slug", 
    element:<Cleaner />
  },
 
]);

export default routes;
