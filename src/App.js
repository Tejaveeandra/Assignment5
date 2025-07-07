import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import StudentProfile from './Components/StudentProfile';
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainNavbar from './Components/MainNavbar';
import FeeSummary from './Components/FeeSummary';
import StudentsLayout from './Components/StudentsLayout'; // Import the new layout

// Placeholder components for MainNavbar routes
const PaymentsPage = () => <div>Payments Page Content</div>;
const TransportPage = () => <div>Transport Page Content</div>;
const AcademicsPage = () => <div>Academics Page Content</div>;
const AlertsPage = () => <div>Alerts Page Content</div>;
const HistoryPage = () => <div>History Page Content</div>;
const RoomAllotmentPage = () => <div>Room Allotment Page Content</div>;
const IssueFormsPage = () => <div>Issue Forms Page Content</div>;
const CertificatesPage = () => <div>Certificates Page Content</div>;

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const handleProfileToggle = (expanded) => {
    setIsProfileExpanded(expanded);
  };

  return (
    <Router>
      <AppContent
        isSidebarExpanded={isSidebarExpanded}
        setIsSidebarExpanded={setIsSidebarExpanded}
        isProfileExpanded={isProfileExpanded}
        handleProfileToggle={handleProfileToggle}
      />
    </Router>
  );
}

const AppContent = ({ isSidebarExpanded, setIsSidebarExpanded, isProfileExpanded, handleProfileToggle }) => {
  const location = useLocation();
  const isStudentRoute = location.pathname.startsWith('/students');

  // Reset isProfileExpanded to false only when leaving /students route
  useEffect(() => {
    if (!isStudentRoute) {
      handleProfileToggle(false);
    }
  }, [location.pathname, handleProfileToggle, isStudentRoute]);

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#F6F8F9', position: 'relative' }}>
      <header className="border-bottom" style={{ height: '8vh', backgroundColor: '#f0f8ff' }}>
        <Header />
      </header>

      <main className="d-flex flex-row" style={{ height: '92vh', position: 'relative' }}>
        {/* Sidebar */}
        <aside
          className="border-end"
          style={{
            width: isSidebarExpanded ? '15vw' : '5%',
            backgroundColor: '#f5f5f5',
            transition: 'width 0.3s ease',
            zIndex: 1,
          }}
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
        >
          <Sidebar isExpanded={isSidebarExpanded} />
        </aside>

        {/* Main content */}
        <div className="main-container d-flex flex-row" style={{ flexGrow: 1, position: 'relative', overflow: 'visible' }}>
          {/* Left content */}
          <div
            className="content-area d-flex flex-column"
            style={{
              flexGrow: 1,
              padding: '10px',
              height: '50%',
              transition: 'transform 0.3s ease',
              transform: isProfileExpanded ? 'translateY(56%)' : 'translateY(0)',
              position: 'relative',
            }}
          >
            <Routes>
              <Route path="/students" element={<StudentsLayout />}>
                <Route path="studentsprofile" element={<FeeSummary />} />
                <Route path="payments" element={<PaymentsPage />} />
                <Route path="transport" element={<TransportPage />} />
                <Route path="academics" element={<AcademicsPage />} />
                <Route path="alerts" element={<AlertsPage />} />
                <Route path="history" element={<HistoryPage />} />
                <Route path="roomallotment" element={<RoomAllotmentPage />} />
                <Route path="issueforms" element={<IssueFormsPage />} />
                <Route path="certificates" element={<CertificatesPage />} />
              </Route>
              <Route path="/application" element={<div>Application</div>} />
              <Route path="/employee" element={<div>Employee</div>} />
              <Route path="/fleet" element={<div>Fleet</div>} />
              <Route path="/warehouse" element={<div>Warehouse</div>} />
              <Route path="/sms" element={<div>SMS</div>} />
              <Route path="/question-bank" element={<div>Question-bank</div>} />
              <Route path="/assets-management" element={<div>Assets Management</div>} />
              <Route path="/payment-services" element={<div>Payment Services</div>} />
              <Route path="/cctv" element={<div>CCTV</div>} />
              <Route path="/hrms" element={<div>HRMS</div>} />
              <Route path="/" element={<div></div>} />
            </Routes>
          </div>

          {/* StudentProfile shown ABOVE if at /students route */}
          {isStudentRoute && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 2000,
              }}
            >
              <StudentProfile onToggle={handleProfileToggle} isExpanded={isProfileExpanded} />
            </div>
          )}

          {/* Sidebar right (navigation target container) */}
          <section
            className="sidebar-right"
            style={{
              width: '26vw',
              backgroundColor: '#F6F8F9',
              padding: '10px',
              overflowY: 'auto',
              position: 'relative',
              height: '100%',
              zIndex: 1000,
            }}
          >
            <Routes>
              <Route path="/application" element={<div>Application</div>} />
              <Route path="/employee" element={<div>Employee</div>} />
              <Route path="/fleet" element={<div>Fleet</div>} />
              <Route path="/warehouse" element={<div>Warehouse</div>} />
              <Route path="/sms" element={<div>SMS</div>} />
              <Route path="/question-bank" element={<div>Question-bank</div>} />
              <Route path="/assets-management" element={<div>Assets Management</div>} />
              <Route path="/payment-services" element={<div>Payment Services</div>} />
              <Route path="/cctv" element={<div>CCTV</div>} />
              <Route path="/hrms" element={<div>HRMS</div>} />
              <Route path="/" element={<div></div>} />
              <Route path="/students/*" element={<div></div>} /> {/* Catch-all for /students sub-routes */}
            </Routes>
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;