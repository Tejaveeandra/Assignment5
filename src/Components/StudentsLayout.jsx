import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import StudentInfoHeader from './StudentInfoHeader';
import FeeSummary from './FeeSummary';
import Information from './Information';

// Placeholder components for student routes
const PaymentsPage = () => <div>Payments Page</div>;
const TransportPage = () => <div>Transport Page</div>;
const AcademicsPage = () => <div>Academics Page</div>;
const AlertsPage = () => <div>Alerts Page</div>;
const HistoryPage = () => <div>History Page</div>;
const RoomAllotmentPage = () => <div>Room Allotment Page</div>;
const IssueFormsPage = () => <div>Issue Forms Page</div>;
const CertificatesPage = () => <div>Certificates Page Content</div>;

const StudentsLayout = ({ isProfileExpanded }) => {
  const location = useLocation();
  const showStudentInfoHeader = location.pathname.endsWith('/studentsprofile');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', // Distributes space between the sections
        width: '100%',
        height: '100%',
        backgroundColor: '#F6F8F9',
      }}
    >
      {/* Left Section (73%) */}
      <div style={{ width: '73%', height: '100%', padding: '10px' }}>
        <MainNavbar />
        
        {/* Only show StudentInfoHeader on /students/studentsprofile */}
        {showStudentInfoHeader && <StudentInfoHeader />}

        <div style={{ padding: '10px', overflow: 'auto' }}>
          <Routes>
            <Route path="studentsprofile" element={<FeeSummary isProfileExpanded={isProfileExpanded} />} />
            <Route path="payments" element={<PaymentsPage />} />
            <Route path="transport" element={<TransportPage />} />
            <Route path="academics" element={<AcademicsPage />} />
            <Route path="alerts" element={<AlertsPage />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="roomallotment" element={<RoomAllotmentPage />} />
            <Route path="issueforms" element={<IssueFormsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
          </Routes>
        </div>
      </div>

      {/* Right Section (27%) */}
      <div
        style={{
          width: '27%', // Adjusted to make total width 100%
          height: '100%',
          padding: '10px',
          backgroundColor: '#F6F8F9',
          overflowY: 'auto',
        }}
      >
        {showStudentInfoHeader && (
          <div
            className='AdditionalInformation'
            style={{ width: '100%', marginTop: isProfileExpanded ? '0px' : '195px' }}
          >
            <Information />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsLayout;