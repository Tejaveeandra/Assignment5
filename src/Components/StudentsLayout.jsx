import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import StudentInfoHeader from './StudentInfoHeader';

const StudentsLayout = () => {
  return (
    <div>
      <MainNavbar />
      <div>
           <StudentInfoHeader />
        <Outlet />
     
      </div>
    </div>
  );
};

export default StudentsLayout;