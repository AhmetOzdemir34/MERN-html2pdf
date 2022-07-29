import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {loggedinPending,loggedinSuccess,loggedinRejected} from './redux/user-slice'
import axios from 'axios'


const ProtectedRoute = ({component:Component, ...rest}) => {
    const dispatch = useDispatch();
    const access = useSelector(state=> state.user.access);
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

  return (
    <Route
    {...rest}
    render={(props)=>{
        if(access){
            return <Component />
        } else{
            return(
                <Redirect to={{pathname:"/", state: {from: props.location}}}/>
            )
        }
    }}
    />
  )
}

export default ProtectedRoute