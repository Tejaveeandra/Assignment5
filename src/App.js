import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import StudentProfile from './Components/StudentProfile';
import { BrowserRouter as Router, Routes, Route, useMatch } from 'react-router-dom';
import { useState } from 'react';
import StudentsLayout from './Components/StudentsLayout';

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
  const isStudentRoute = useMatch('/students/*');

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: '#F6F8F9', position: 'relative' }}>
      <header className="border-bottom" style={{ height: '8vh', backgroundColor: '#f0f8ff' }}>
        <Header />
      </header>

      <main className="d-flex flex-row" style={{ height: '92vh', position: 'relative' }}>
        <aside
          className="border-end"
          style={{
            width: isSidebarExpanded ? '15vw' : '5vw',
            backgroundColor: '#f5f5f5',
            transition: 'width 0.3s ease',
            zIndex: 1,
          }}
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
        >
          <Sidebar isExpanded={isSidebarExpanded} />
        </aside>

        <div className="main-container d-flex flex-row" style={{ flexGrow: 1, position: 'relative', overflow: 'auto' ,   scrollbarWidth: 'none', /* Hide scrollbar in Firefox */
              msOverflowStyle: 'none', /* Hide scrollbar in IE/Edge */ }}>
          <div
            className="content-area d-flex flex-column"
            style={{
              flexGrow: 1,
              padding: '10px',
              height: isProfileExpanded && isStudentRoute ? '70%' : '100%',
              transition: 'transform 0.3s ease, height 0.3s ease',
              transform: isProfileExpanded && isStudentRoute ? 'translateY(46%)' : 'translateY(0)',
              position: 'relative',
              overflowY: 'auto',
              scrollbarWidth: 'none', /* Hide scrollbar in Firefox */
              msOverflowStyle: 'none', /* Hide scrollbar in IE/Edge */
            }}
          >
            <Routes>
              <Route path="/students/*" element={<StudentsLayout isProfileExpanded={isProfileExpanded} />} />
              <Route path="/application/*" element={<div>Application Layout</div>} />
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

          {isStudentRoute && (
            <div style={{ position: 'absolute', top: 0, right: '1rem', width: '100%' }}>
              <StudentProfile onToggle={handleProfileToggle} isExpanded={isProfileExpanded} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;