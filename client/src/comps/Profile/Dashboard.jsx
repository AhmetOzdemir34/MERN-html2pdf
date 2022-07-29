import React, {useEffect, useState} from 'react'
import Navbar from '../Navbar'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import parse from 'html-react-parser';
import axios from 'axios'
import { notification } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import {loggedinPending,loggedinSuccess,loggedinRejected} from '../../redux/user-slice'
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Dashboard = () => {
  const [docu, setDocu] = useState({});
  const [permission, setPermission] = useState(false);
  const dispatch = useDispatch();
  const access = useSelector(state=> state.user.access);
  const user = useSelector(state=> state.user.user);

  const openNotification = () => {
    notification.open({
      message: 'The Document was created successfully!',
      description:
        'You have added a new document to your documents. You can look at content & other values of the document in profile page.',
    });
  };
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
  const createDoc = async (e) => {
    e.preventDefault();
    const element = document.getElementById("fake-root");
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${docu.title}.pdf`);
      //axios post db
      axios.post('http://localhost:5000/doc',docu).then((res)=>{
        openNotification();
      });
  }
  if(!access){
    return <Redirect to={'/'} />
  }
  return (
    <>
    <Helmet>
      <title>{`${user.username} | Dashboard`}</title>
    </Helmet>
    <Navbar />
    <div className='mb-5'>
      <div className="container mx-auto">
        <div className="mt-5 flex flex-col flex-nowrap justify-between">
          <div className='w-10/12 mx-auto md:w-1/2'>
            <form>
              <input type="text" onChange={(e)=>{setDocu({...docu,title:e.target.value})}} className='w-full rounded border border-gray-500 p-3' placeholder='title'/>
              <p className='mt-5 text-red-600 font-bold'>{'First element have to contain all elements and to has "fake-root" ID.'}</p>
              <textarea rows="20" onChange={(e)=>{setDocu({...docu,content:e.target.value})}} className='w-full rounded border border-gray-500 p-3' placeholder='Enter HTML Content'></textarea>
              <button disabled={!(docu.content && docu.title)} type="button" onClick={()=> setPermission(true)} className='bg-alternate mr-3 p-4 mt-3 rounded text-final font-bold'>{"Activate Preview"}</button>
            </form>
          </div>
          <div className='w-10/12 mx-auto md:w-1/2 mt-5'>
            <hr />
            {(permission==true && docu.content && docu.title) && 
            <>
            {parse(docu.content)}
            <button type="button" onClick={createDoc} className='bg-secondary p-4 mt-3 rounded text-final font-bold'>{"Create PDF"}</button>
            </>}
          </div>
        </div>
      </div>
    </div>
    </>
  )
  
}

export default Dashboard