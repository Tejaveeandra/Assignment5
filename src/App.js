import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import StudentProfile from './Components/StudentProfile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <Router>
      <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor:'#F6F8F9' }}>
        <header className="border-bottom" style={{ height: '8vh', backgroundColor: '#f0f8ff' }}>
          <Header />
        </header>
        <main className="d-flex flex-row" style={{ height: '92vh' }}>
          <aside
            className="border-end"
            style={{
              width: isSidebarExpanded ? '15vw' : '5%',
              backgroundColor: '#f5f5f5',
              transition: 'width 0.3s ease',
            }}
            onMouseEnter={() => setIsSidebarExpanded(true)}
            onMouseLeave={() => setIsSidebarExpanded(false)}
          >
            <Sidebar isExpanded={isSidebarExpanded} />
          </aside>
          <div
            className="main-container flex-grow-1 d-flex flex-column"
            style={{ transition: 'width 0.3s ease' }}
          >
            <section  style={{ height: '29vh' }}>
              <Routes>
                <Route path="/students" element={<StudentProfile />} />
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
            </section>
            <section style={{ height: '64vh' }}>
              <div>This is empty</div>
            </section>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;