import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Drawer } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import {userPending,userSuccess,userRejected,loggedinPending,loggedinSuccess,loggedinRejected} from '../../redux/user-slice'
import {Redirect} from 'react-router-dom'
import {Helmet} from 'react-helmet'

const Login = () => {

  const dispatch = useDispatch();
  const [login, setLogin] = useState({});
  const [register, setRegister] = useState({});
  const [active, setActive] = useState(false); //input ve buttonların aktifliği ile alakalı
  const [active2, setActive2] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [visible, setVisible] = useState(false);
  const access = useSelector(state=> state.user.access);
  const [msgActive, setMsgActive] = useState(false);

  useEffect(()=>{
    const fetchUser = async () => {
      dispatch(loggedinPending());
    try{
    const res = await axios.get('http://localhost:5000/');
    dispatch(loggedinSuccess(res.data));
    }catch(err){
      dispatch(loggedinRejected(err));
    }
    }
    fetchUser();
  }, []);

  const loginOp = async(e) => {
    e.preventDefault();
    setActive(!active);
    dispatch(userPending());
    try{
      const res = await axios.post('http://localhost:5000/',login);
      dispatch(userSuccess(res.data));
    }catch(err){
      dispatch(userRejected(err));
      alert(err.response.data.message);
      setActive(false);
    }
  }

  const registerOp = (e) => {
    e.preventDefault();
    setActive2(!active2);
    if(checkbox){
    setActive(false);
    axios.post('http://localhost:5000/register', register).then((res)=>{
      // sayfa refresh edilir
      setMsgActive(true);
      console.log(res.data);
      setTimeout(()=>{
        onClose();
      },2000)
    }).catch((err)=>{
      alert(err.response.data);
      setActive2(!active2);
    });
    }else{
      alert("You must accept privacy policy & user aggrement.");
    }
  }
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  if(access){
    return <Redirect to={'/profile'}/>
  }

  return (
    <>
    <Helmet>
      <title>{"Convert HTML-to-PDF"}</title>
    </Helmet>
    <div className='bg-primary'>
      <div className="container mx-auto h-screen relative">
        <div className='rounded md:w-5/12 w-10/12 px-3 py-5 bg-final absolute top-1/2 left-1/2' style={{transform:'translate(-50%,-50%)'}}>
            <div className='flex flex-col flex-nowrap justify-center'>
                <div className='mb-3'>
                  <h1 className='text-center font-bold italic'>{'Convert HTML-to-PDF'}</h1>
                  <p className='text-center mt-2 text-2xl'>Login</p>
                </div>
                <div>
                  <form onSubmit={loginOp}>
                    <input onChange={(e)=>{setLogin({...login, email:e.target.value})}} disabled={active} type="text" className='rounded border border-gray-400 w-10/12 mx-auto p-2 block my-2' placeholder='email'/>
                    <input onChange={(e)=>{setLogin({...login, password:e.target.value})}} disabled={active} type="password" className='rounded border border-gray-400 w-10/12 mx-auto p-2 block my-2' placeholder='password'/>
                    <button disabled={active} type='submit' className='mt-5 py-3 px-5 block mx-auto bg-alternate text-final rounded font-bold'>{'Login'}</button>
                  </form>
                  <p onClick={showDrawer} className='text-center font-bold underline cursor-pointer text-sm mt-3 text-blue-800'>{'Have not a account yet?'}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
    <Drawer
    title="Register"
    placement={'right'}
    closable={false}
    onClose={onClose}
    visible={visible}
    key={'placement'}
  >
    <form onSubmit={registerOp}>
      <h2 className='font-bold'>{'Fill the all blanks to register'}</h2>
      <input onChange={(e)=>{setRegister({...register,username:e.target.value})}} disabled={active2} type="text" className='rounded border border-gray-400 w-10/12 mx-auto p-2 block my-2' placeholder='username*'/>
      <input onChange={(e)=>{setRegister({...register,email:e.target.value})}} disabled={active2} type="text" className='rounded border border-gray-400 w-10/12 mx-auto p-2 block my-2' placeholder='email*'/>
      <input onChange={(e)=>{setRegister({...register,password:e.target.value})}} disabled={active2} type="password" className='rounded border border-gray-400 w-10/12 mx-auto p-2 block my-2' placeholder='password*'/>
      <input onChange={(e)=>{setRegister({...register,confirmPassword:e.target.value})}} disabled={active2} type="password" className='rounded border border-gray-400 w-10/12 mx-auto p-2 block my-2' placeholder='confirm password*'/>
      <div className='mt-2'>
        <input onChange={()=> setCheckbox(!checkbox)} type="checkbox" className='p-4 my-2' style={{transform:'scale(1.3)'}} /> <span className='text-sm'>{'I accept privacy policy & user aggrement.'}</span>
      </div>
      <button disabled={active2} type='submit' className='mt-5 py-3 px-5 block mx-auto bg-primary text-final rounded'>Register</button>
    </form>
    {
      msgActive && 
      <div className='text-green-800 italic font-bold text-center mt-3'>{'You have registered successfully.'}</div>
    }
  </Drawer>
  </>
  )
}

export default Login