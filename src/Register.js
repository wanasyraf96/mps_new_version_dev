import React, {useState} from "react";
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import { TextInputField, Heading, Button, BuildIcon } from "evergreen-ui";
import logo1 from "./assets/img/logo1.png";

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";

function Register(props){

    const username = useFormInput("");
    const password = useFormInput("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError(null);
        setLoading(true);
        
        axios.post('https://apisim.mps.gov.my/api/mymps/akaunbyic?nokp=930420145231', { username: username.value, password: password.value }).then(response => {

            setLoading(false);
            setUserSession(response.data[0].NOAKAUN, response.data[0].NAMA_PEMILIK);

            console.log(response.data);
            props.history.push('/dashboard');
        })
        .catch(error => {

            setLoading(false);

            console.log("Something went wrong. Plese try again!");
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    const handleNumber = () => {
        console.log(username.value);
        
    }

    return (
        <div className="bg-gray">
            <IndexNavbar fixed />
            {/* Login <br /><br /> */}
            {/* <div>
                Username <br />
                <input type="text" {...username} />
            </div>
            <div style={{ marginTop: 10 }}>
                Password <br />
                <input type="password" {...password} />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br /> */}
        <section className="py-20 bg-gray-700 overflow-hidden h-100" style={{height: "20vh"}}>

        </section>
        <section className="pb-16 bg-gray-300 relative pt-32">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center bg-white shadow-2xl rounded-lg -mt-64 py-16 px-10 relative z-10">
                    <div className="w-full text-center lg:w-8/12">
                    <p className="text-center">
                        <img className="mx-auto" src={logo1} style={{height:"150px", width:"150px"}}></img>
                    </p>
                    <Heading size={700} marginTop="default">Pendaftaran Pengguna</Heading>
                    {/* <p className="text-gray-600 text-lg leading-relaxed mt-4 mb-4">
                        Cause if you do, it can be yours now. Hit the buttons below to
                        navigate to get the Free version for your next project. Build a
                        new web app or give an old project a new look!
                    </p> */}
                    <div className="sm:block flex flex-col mt-10">
                        <div className="text-left p-5">
                        <TextInputField
                            label="NO. KAD PENGENALAN"
                            //hint="This is a hint."
                            placeholder="cth: 203451057890"
                            onKeyUp={handleNumber}
                            {...username}
                        />

                        <TextInputField
                            label="KATA LALUAN"
                            //hint="This is a hint."
                            placeholder="cth: abcd1234@^"
                            type="password" 
                            {...password}
                        />
                        </div>
                    
                        <div className="top-29-px">

                            <Button 
                                marginRight={16} 
                                appearance="primary" 
                                intent="success"
                                value={loading ? 'Loading...' : 'Daftar'} 
                                onClick={handleLogin} 
                                disabled={loading}
                            >
                                Daftar Pengguna
                            </Button>

                            <Button 
                                marginRight={16} 
                                appearance="primary" 
                                intent="none"
                                onClick={ () => window.location.href = "/login"}
                            >
                                Login
                            </Button>

                        </div>
                    </div>
                    <div className="text-center mt-16"></div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
        </div>
    )
    
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
   
export default Register;