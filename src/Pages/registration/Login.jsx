import { Link } from 'react-router-dom'
import myContext from '../../context/myContext';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../Components/loader/Loader'

function Login() {
// Create set for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // get loader data from context api
    const context = useContext(myContext)
    const { loading,setLoading} = context

    // Create a signIn function
    const signin = async () => {
        // making loading true when user enter their credential
      setLoading(true);
    //  wrap the logic in try catch block
      try {
        // signIn user with their email and password
        const result = await signInWithEmailAndPassword(auth, email, password)
        // setting the user Data from firebase and localStorage
        localStorage.setItem('user',JSON.stringify(result));
        // showing react toastify alert
        toast.success('Signin Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // Navigaing the page to home page when the user credential met with the data stored in firebase
        window.location.href='/'
        setLoading(false);
      } catch (error) {
        // Adjusting the react toastify error
        toast.error('Sigin Failed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // setLoading to false 
        setLoading(false);
      }
    }
   
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={signin}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login