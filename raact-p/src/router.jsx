import {createBrowserRouter, Navigate} from "react-router-dom";
import Dashboard from "./Dashboard.jsx";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Signup from "./views/Signup";
import Users from "./views/Users";
import UserForm from "./views/UserForm";
import App from "./App.jsx";
import Posts from "./views/Posts.jsx";
import CreatePost from "./views/CreatePost.jsx";
import EditPost from "./views/EditPost.jsx";
import AdmSkills from "./views/AdmSkills.jsx";
import CreateSkill from "./views/CreateSkill.jsx";
import EditSkill from "./views/EditSkill.jsx";
import AdmAboutMe from "./views/AdmAboutMe.jsx";
import CreateAboutMe from "./views/CreateAboutMe.jsx";
import AdmPortfolio from "./views/AdmPortfolio.jsx";
import CreatePortfolio from "./views/CreatePortfolio.jsx";
import EditPortfolio from "./views/EditPortfolio.jsx";
import AdmContact from "./views/AdmContact.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout/>,
    children: [
      {
        path: '/',
        element: <Navigate to="/users"/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/posts',
        element: <Posts/>
      },
      {
        path: '/create/post',
        element: <CreatePost/>
      },
      {
        path: '/post/edit/:id',
        element: <EditPost/>
      },

      {
        path: '/my_skills',
        element: <AdmSkills/>
      },
      {
        path: '/create/skill',
        element: <CreateSkill/>
      },

      {
        path: '/skill/edit/:id',
        element: <EditSkill/>
      },


      {
        path: '/about_me',
        element: <AdmAboutMe/>
      },

      {
        path: '/create/about',
        element: <CreateAboutMe/>
      },

      {
        path: '/about/edit/:id',
        element: <EditSkill/>
      },

      // ----------------------------------------------------------

      {
        path: '/my_portfolio',
        element: <AdmPortfolio/>
      },

      {
        path: '/create/portfolio',
        element: <CreatePortfolio/>
      },

      {
        path: '/portfolio/edit/:id',
        element: <EditPortfolio/>
      },


      // ------------------------------------------------------------------
      {
        path: '/users',
        element: <Users/>
      },
      {
        path: '/contacts',
        element: <AdmContact/>
      },
      {
        path: '/users/new',
        element: <UserForm key="userCreate" />
      },
      {
        path: '/users/:id',
        element: <UserForm key="userUpdate" />
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/main',
        element: <App/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <Signup/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
