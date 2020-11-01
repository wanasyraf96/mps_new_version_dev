import React from "react";
import { getUser, getNOKP, getToken, removeUserSession } from "./Utils/Common";

import MainDashboard from "./views/admin/Dashboard";
import Sidebar from "./Sidebar";

function Dashboard(props) {

  const token = getToken();
  const user = getUser();
  const nokp = getNOKP();

  console.log(atob(token));
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  return (
    <div>
      <Sidebar />
      
      <div class="bg-gray-400 mb-5">
        <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 class="text-xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-2xl sm:leading-10">
            Selamat Datang, 
            <span class="text-indigo-600"> {user} </span>
          </h2>
          <div class="mt-8 flex lg:flex-shrink-0 lg:mt-0">
            <div class="inline-flex rounded-md shadow">
              
            </div>
            <div class="ml-3 inline-flex rounded-md shadow">
              <a
                onClick={handleLogout}
                class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <MainDashboard />
    </div>
  );
}

export default Dashboard;
