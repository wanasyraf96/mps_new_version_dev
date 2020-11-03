import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "./Utils/Common";
import logo1 from "./assets/img/logo1.png";

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";
import swal from "sweetalert";

function Register(props) {

  // const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    nokp: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    let formData = new FormData();
    formData.append('username',form.username);
    formData.append('password',form.password);
    formData.append('email',form.email);
    formData.append('nokp',form.nokp);

    axios
    .post('https://mymps.corrad.my/int/api_generator.php?api_name=daftar_pengguna',formData)
    .then(response => {
      console.log(response);

      if(response.data.status === 'success'){
        // console.log('success');
        swal('Pendaftaran Berjaya',"Something something something","success");
        setLoading(false);
      }
      else{
        // console.log('failure');
        swal('Pendaftaran Tidak Berjaya',"Something something something","error");
        setLoading(false);
      }
    })
  };

  return (
    <div className="bg-gray">
      <IndexNavbar fixed />

      
      <section className="py-20 relative" style={{background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>

      {/* sample form */}
      <div className=" sm:mt-0" style={{padding: "20px"}}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 bg-gray-100" style={{padding: "20px", borderRadius: "10px"}}>
            <div className="px-4 sm:px-0">
              <img className="mx-auto" src={logo1} style={{width:"120px", height:"120px"}}/>
              <h3 className="text-lg font-medium leading-6 text-gray-900 text-center" style={{marginTop: "30px"}}>Daftar Pengguna</h3>
              <p className="mt-1 text-sm leading-5 text-gray-600" style={{marginTop: "30px"}}>
                Selamat Datang ke laman daftar sebagai pengguna Majlis Perbandaran Selayang 2020. Sila pastikan setiap maklumat diisi lengkap sebelum daftar sebagai pengguna.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={(e) => handleRegister(e)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="username" className="block text-sm font-medium leading-5 text-gray-700">KATA PENGGUNA</label>
                      <input id="username" onChange={(e) => handleChange(e)} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">KATA LALUAN</label>
                      <input id="password" type='password' onChange={(e) => handleChange(e)} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">ALAMAT EMEL</label>
                      <input id="email" onChange={(e) => handleChange(e)} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="nokp" className="block text-sm font-medium leading-5 text-gray-700">NO KAD PENGENALAN</label>
                      <input id="nokp" onChange={(e) => handleChange(e)} className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" maxLength="12" />
                    </div>

                    <div className="col-span-6">
                      <a href="/login" className="font-small text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        <i className="fas fa-user"></i> Sudah mempunyai akaun? Login
                      </a>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 bg-gray-300">
                  <button type="submit" className="py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 shadow-sm hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-indigo-600 transition duration-150 ease-in-out">
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

// const handleValidation = e =>{
  
// }
export default Register;
