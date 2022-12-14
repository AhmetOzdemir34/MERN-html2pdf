import React, {useEffect} from 'react'
import axios from 'axios'
import Navbar from '../Navbar'
import { Tabs } from 'antd';
import man from '../../images/man.png';
import woman from '../../images/woman.png';
import feet from '../../images/feet.png';
import newbie from '../../images/newbie.png';
import three from '../../images/3 (1).png';
import { FilePdfOutlined, UserOutlined, StarOutlined } from '@ant-design/icons';
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {loggedinPending,loggedinSuccess,loggedinRejected, logout} from '../../redux/user-slice'
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const { TabPane } = Tabs;
const Profile = () => {
  const dispatch = useDispatch();
  /* const access = useSelector(state=> state.user.access); */
  const user = useSelector(state=> state.user.user);

  /* useEffect(()=>{
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
  }, []); */
  
  const logouting = async() => {
    await axios.get('http://localhost:5000/logout');
    dispatch(logout());
  }

  /* if(!access){
    return <Redirect to={'/'} />
  } */
  return (
    <>
    <Helmet>
      <title>{`${user.username} | Profile`}</title>
    </Helmet>
    <Navbar />
  <div>
    <div className="container mx-auto">
      <div className='flex flex-row flex-wrap justify-center items-start mt-5'>
        <div className='w-10/12 mx-auto md:w-5/12 p-3'>
          <img src={user.gender==="male" ? man:woman } className='block mx-auto object-cover w-[250px] md:w-2/3' />
        </div>
        <div className='w-10/12 mx-auto md:w-5/12 p-3'>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <UserOutlined /> 
                Profile
              </span>
            }
            key="1"
          >
            <div>
              <p><span className='font-bold'>{"Username:"}</span> {user.username}</p>
              <p><span className='font-bold'>{"Email:"}</span> {user.email}</p>
              <p><span className='font-bold'>{"Gender:"}</span> {user.gender}</p>
              <p><span className='font-bold'>{"CreatedAt:"}</span> {moment(user.createdAt, 'YYYY-mm-DD').toString().split(' ').map((i)=>i+" ").slice(0,4)}</p>
              <hr className='mb-3' />
              <p><span className='italic font-bold'>{"Total Documents:"}</span> {user.count}</p>
              <button type='button' className='p-2 bg-gray-200 mt-3 ml-auto block'
              onClick={logouting}
              >{"LOG OUT"}</button>
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <FilePdfOutlined />
                Documents
              </span>
            }
            key="2"
          >
            {user.count > 0 ? <>
              <p className='font-bold text-alternate underline'>{"Click to preview the documents."}</p>
              <ul>
                {
                user.documents.map((d, i)=>{
                  return (
                    <li onClick={()=>{
                      // customize modal
                      }} className='cursor-pointer font-bold capitalize p-2 my-1' style={{borderLeft:'7px solid dodgerblue'}} key={i}>
                      {d}
                    </li>
                  )
                })
                }
              </ul>
            </>:<div>Not found documents</div>}
          </TabPane>
          <TabPane
            tab={
              <span>
                <StarOutlined />
                Badges
              </span>
            }
            key="3"
          >
            {user.createdAt && <p title='NEWBIE'> <img src={newbie} width={40} className='inline-block mx-3'/> {"You have created an account."}</p>}
            {(user.count>0) && <p title='FIRST STEP'> <img src={feet} width={40} className='inline-block mx-3'/> {"First Document was generated by you."}</p> }
            {(user.count>=3) && <p title='THREE SHOTS'> <img src={three} width={40} className='inline-block mx-3'/> {"3 Documents!"}</p> }
          </TabPane>
        </Tabs>
        </div>
      </div>
    </div>
  </div>
  </>
  )

}

export default Profile