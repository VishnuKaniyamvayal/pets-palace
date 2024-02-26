import React, { useEffect } from 'react';
import Navigator from '../../components/admin/Navigator';
import AdminHeader from '../../components/admin/AdminHeader'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const AdminView = () => {

  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user)
    {
      navigate("/login")
    }
  })

  return (
    <>
        <Navigator/>
    </>
  );
};
export default AdminView;
