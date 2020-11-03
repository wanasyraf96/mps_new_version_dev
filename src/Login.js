import React, {useState} from "react";
import { setUserSession } from './Utils/Common';
import { TextInputField, Heading, Button, BuildIcon } from "evergreen-ui";
import logo1 from "./assets/img/logo1.png";

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";

import swal from "sweetalert";
import axios from "axios";
import { FormatBoldTwoTone } from "@material-ui/icons";

function Login(props){

    // const username = useFormInput("");
    // const password = useFormInput("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({
          ...user,
          [e.target.id]: e.target.value
        })
      }

    const handleLogin = e => {
        e.preventDefault();
        setLoading(true);

        let formData = new FormData();
        formData.append('email',user.email);
        formData.append('password',user.password);
        console.log(formData.email);
        console.log(formData.password);

        if (user.email.value === '' || user.password.value ===''){
            console.log('email or password empty');
        }
        else{
            let myHeaders = new Headers();
            myHeaders.append("Cookie", "__cfduid=db6f29fff3ce79e0a3fe70a3990b3baeb1603864221; CORRAD_LANGUAGE=1; CORRAD_THEME=lavender; CORRAD_API_MYMPS=6nghhhcstuc4aad81r3m9qqp4b; MYMPS_API=jstp68stuf7siabrp233iff4pt");
            
            axios
            .post('https://mymps.corrad.my/int/api_generator.php?api_name=api_login',formData)
            .then(response => {
                // console.log(response);
                // console.log('Email : '+response.data.MPS_USERMAIL);
                // console.log('Password : '+response.data.MPS_PASSWORD);
                setLoading(false);
                if(response.data.status === 'success'){
                // setUserSession(response.data[0].TOKEN, response.data[0].MPS_USERNAME);
                    swal("Bejaya!", "Log Masuk Berjaya!", "success");
                    props.history.push('/dashboard'); // redirect
                }else{
                    swal("Tidak Berjaya!", "Log masuk tidak berjaya!", "error");
                }
                
            })
            .catch(error => {
                swal("Opss!", "Something went wrong. Please contact your administrator!", "error")
                setLoading(false);
            })
        }
    }

    return (
        <div className="bg-gray">
            <IndexNavbar fixed />
        <section className="py-20 px-5 relative" style={{background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
            <div className="min-h-screen flex items-center justify-center  px-4 sm:px-6">
                <div className="max-w-md w-full" style={{marginTop: "-100px"}}>
                    <div>
                        <img className="mx-auto w-auto" src={logo1} alt="mymps" style={{height: "120px"}}/>
                        <h2 className="mt-6 text-center text-xl leading-9 font-extrabold text-white">
                        Login Akaun
                        </h2>
                    </div>
                    <form onSubmit = {(e) => handleLogin(e)}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm">
                            <div>
                                <input id="email"  onChange={(e) => handleChange(e)} name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Kad Pengenalan" />
                            </div>
                             <br />
                            <div className="-mt-px">
                                <input id="password"  onChange={(e) => handleChange(e)} name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Kata Laluan" />
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember_me" type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-300">
                                    Ingat saya
                                </label>
                            </div>

                            <div className="text-sm leading-5">
                                <a href="#" className="font-medium text-gray-100 hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                                    Terlupa kata laluan?
                                </a>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                {loading ? 'Loading...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <Footer />
        </div>
    )
   
}
   
export default Login;