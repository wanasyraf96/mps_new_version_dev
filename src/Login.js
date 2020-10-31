import react, {useState} from "react";
import { setUserSession } from './Utils/Common';
import { TextInputField, Heading, Button, BuildIcon } from "evergreen-ui";
import logo1 from "./assets/img/logo1.png";

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";

import swal from "sweetalert";

function Login(props){

    const username = useFormInput("");
    const password = useFormInput("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setError(null);
        setLoading(true);

        // var formData = new FormData();
        // formData.append("username", username.value)
        // formData.append("password", password.value)
        
        // axios('https://api.corrad.my/api/API-login', {
        //     method: 'POST',
        //     mode: 'no-cors', 
        //     headers: {
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': 'application/json',
        //     },
        //     data : formData
        // })
        // .then(response => {

        //     setLoading(false);
        //     setUserSession(response.data[0].NOAKAUN, response.data[0].NAMA_PEMILIK);

        //     console.log(response.data);
        //     props.history.push('/dashboard');
        // })
        // .catch(error => {

        //     setLoading(false);

        //     console.log("Something went wrong. Plese try again!");
        //     console.log(error.data)
        //     setError(error.data);
        // });

        if(username.value == "" || password.value == ""){

            swal("Opss!", "Sila pastikan kata nama dan kata laluan anda sah", "error");
            setLoading(false);

        }else{

            var myHeaders = new Headers();
            myHeaders.append("Cookie", "__cfduid=db6f29fff3ce79e0a3fe70a3990b3baeb1603864221; CORRAD_LANGUAGE=1; CORRAD_THEME=lavender; CORRAD_API_MYMPS=6nghhhcstuc4aad81r3m9qqp4b; MYMPS_API=jstp68stuf7siabrp233iff4pt");
            
            var formdata = new FormData();
            formdata.append("username", username.value);
            formdata.append("password", password.value);

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            };

            var urlAPI1 = 'https://mymps.corrad.my/int/api_generator.php?api_name=api_login';
            var urlAPI2 = 'https://api.corrad.my/api/API-login';

            fetch(urlAPI1, requestOptions)
            .then(response => response.json())
            .then(result => {

                //console.log(result);
                setLoading(false);

                if(result.status == "unsuccess")
                {
                    console.log("Wrong credentials. Please try again!");
                    swal("Opss!", "Sila pastikan kata nama dan kata laluan anda sah", "error");
                }
                else if(result.status == "success")
                {
                    setUserSession(result.data[0].TOKEN, result.data[0].USERNAME);

                    //swal("Bejaya!", "Login Berjaya!", "success");
                    props.history.push('/dashboard');
                }
                

            })
            .catch(error => {

                console.log(error);
                swal("Opss!", "Something went wrong. Please contact your administrator!", "error")
                .then((value) => {
                    props.history.push('/');
                })

            });
        }
        

    }

    return (
        <div className="bg-gray">
            <IndexNavbar fixed />
        <section className="py-20 px-5 relative" style={{background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
        <div class="min-h-screen flex items-center justify-center  px-4 sm:px-6">
            <div class="max-w-md w-full" style={{marginTop: "-100px"}}>
                <div>
                <img class="mx-auto w-auto" src={logo1} alt="mymps" style={{height: "120px"}}/>
                <h2 class="mt-6 text-center text-xl leading-9 font-extrabold text-white">
                    Login Akaun
                </h2>
                </div>
                <form class="mt-8" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm">
                    <div>
                    <input aria-label="Email" {...username} name="email" type="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Email" />
                    </div>
                    <div class="-mt-px">
                    <input aria-label="Password" {...password} name="password" type="password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5" placeholder="Kata Laluan" />
                    </div>
                </div>

                <div class="mt-6 flex items-center justify-between">
                    <div class="flex items-center">
                    <input id="remember_me" type="checkbox" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                    <label for="remember_me" class="ml-2 block text-sm leading-5 text-gray-300">
                        Remember me
                    </label>
                    </div>

                    <div class="text-sm leading-5">
                    <a href="#" class="font-medium text-gray-100 hover:text-gray-200 focus:outline-none focus:underline transition ease-in-out duration-150">
                        Terlupa kata laluan?
                    </a>
                    </div>
                </div>

                <div class="mt-6">
                    <button type="button" onClick={handleLogin} class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </div>
                </form>
            </div>
        </div>
        </section>
        {/* <section className="pb-16 bg-gray-300 relative pt-32">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-center bg-white shadow-2xl rounded-lg -mt-64 py-16 px-10 relative z-10">
                    <div className="w-full text-center lg:w-8/12">
                    <p className="text-center">
                        <img className="mx-auto" src={logo1} style={{height:"150px", width:"150px"}}></img>
                    </p>
                    <Heading size={700} marginTop="default">Login MyMPS</Heading>
                    <p className="text-gray-600 text-lg leading-relaxed mt-4 mb-4">
                        Cause if you do, it can be yours now. Hit the buttons below to
                        navigate to get the Free version for your next project. Build a
                        new web app or give an old project a new look!
                    </p>
                    <div className="sm:block flex flex-col mt-10">
                        <div className="text-left p-5">
                        <TextInputField
                            label="KATA NAMA / USERNAME"
                            //hint="This is a hint."
                            placeholder="cth: 203451057890"
                            onKeyUp={handleNumber}
                            {...username}
                        />

                        <TextInputField
                            label="KATA LALUAN / PASSWORD"
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
                                value={loading ? 'Loading...' : 'Login'} 
                                onClick={handleLogin} 
                                disabled={loading}
                            >
                                    Login
                            </Button>

                            <Button 
                                marginRight={16} 
                                appearance="primary" 
                                intent="none"
                                onClick={ () => window.location.href = "/daftar"}
                            >
                            Daftar
                            </Button>

                        </div>
                    </div>
                    <div className="text-center mt-16"></div>
                    </div>
                </div>
            </div>
        </section> */}
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
   
export default Login;