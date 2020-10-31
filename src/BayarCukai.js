import react, {Component} from "react";
import { setUserSession } from './Utils/Common';
import logo1 from "./assets/img/logo1.png";
import OtpInput from "react-otp-input";

import IndexNavbar from "./components/Navbars/IndexNavbar2.js";
import Footer from "./components/Footers/Footer";

import swal from "sweetalert";

export default class Bayar extends Component{

    state = { otp: "" };

    handleChange = otp => {
        this.setState({ otp })
        console.log(otp);
    };

    render() {
    return (
        <div className="bg-gray">
        <IndexNavbar fixed />
        <section className="py-20 px-5 relative" style={{background: "rgb(34,81,122)", background: "linear-gradient(90deg, rgba(34,81,122,1) 0%, rgba(27,147,171,1) 100%)"}}>
        <div class="min-h-screen flex items-center justify-center  px-4 sm:px-6">
            <div class="max-w-md w-full" style={{marginTop: "-200px"}}>
                <div>
                <img class="mx-auto w-auto" src={logo1} alt="mymps" style={{height: "120px"}}/>
                <h2 class="mt-6 text-center text-xl leading-9 font-extrabold text-white">
                    Laman Bayaran Cukai Ekpress
                </h2>
                </div>
                <form class="mt-8" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="mx-auto rounded-md shadow-sm">
                    <div className="mx-auto">
                        <OtpInput
                            className="mx-auto p-3"
                            inputStyle="py-2 px-2 "
                            value={this.state.otp}
                            onChange={this.handleChange}
                            numInputs={6}
                            separator={<span className="text-white">  </span>}
                        />
                    </div>
                </div>

                <div class="mt-6">
                    <button type="button" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                        Semak Akaun
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
}
 
