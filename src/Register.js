import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "./Utils/Common";
import logo1 from "./assets/img/logo1.png";

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";

function Register(props) {
  const username = useFormInput("");
  const password = useFormInput("");
  const email = useFormInput("");
  const nokp = useFormInput("");

  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    setError(null);
    setLoading(true);

    axios
      .post("https://apisim.mps.gov.my/api/mymps/akaunbyic?nokp=930420145231", {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data[0].NOAKAUN, response.data[0].NAMA_PEMILIK);

        console.log(response.data);
        props.history.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);

        console.log("Something went wrong. Plese try again!");
        if (error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  const handleNumber = () => {
    console.log(username.value);
  };

  return (
    <div className="bg-gray">
      <IndexNavbar fixed />

      
      <section className="py-20 relative" style={{background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>

      {/* sample form */}
      <div class=" sm:mt-0" style={{padding: "20px"}}>
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1 bg-gray-100" style={{padding: "20px", borderRadius: "10px"}}>
            <div class="px-4 sm:px-0">
              <img className="mx-auto" src={logo1} style={{width:"120px", height:"120px"}}/>
              <h3 class="text-lg font-medium leading-6 text-gray-900 text-center" style={{marginTop: "30px"}}>Daftar Pengguna</h3>
              <p class="mt-1 text-sm leading-5 text-gray-600" style={{marginTop: "30px"}}>
                Selamat Datang ke laman daftar sebagai pengguna Majlis Perbandaran Selayang 2020. Sila pastikan setiap maklumat diisi lengkap sebelum daftar sebagai pengguna.
              </p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                  <div class="grid grid-cols-6 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label for="first_name" class="block text-sm font-medium leading-5 text-gray-700">KATA PENGGUNA</label>
                      <input id="first_name" class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                      <label for="last_name" class="block text-sm font-medium leading-5 text-gray-700">KATA LALUAN</label>
                      <input id="last_name" class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div class="col-span-6 sm:col-span-6">
                      <label for="email_address" class="block text-sm font-medium leading-5 text-gray-700">ALAMAT EMEL</label>
                      <input id="email_address" class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div class="col-span-6">
                      <label for="street_address" class="block text-sm font-medium leading-5 text-gray-700">NO KAD PENGENALAN</label>
                      <input id="street_address" class="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div class="col-span-6">
                      <a href="/login" class="font-small text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        <i class="fas fa-user"></i> Sudah mempunyai akaun? Login
                      </a>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6 bg-gray-300">
                  <button type="button" class="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
                    Daftar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* sample form */}
      </section>

      {/* <section className="pb-16 bg-gray-300 relative pt-32">
        
      </section> */}

      <Footer />
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Register;
