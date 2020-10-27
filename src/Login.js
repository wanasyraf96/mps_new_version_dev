import react, {useState} from "react";
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Login(props){

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

    return (
        <div>
            Login <br /><br />
            <div>
                Username <br />
                <input type="text" {...username} />
            </div>
            <div style={{ marginTop: 10 }}>
                Password <br />
                <input type="password" {...password} />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
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