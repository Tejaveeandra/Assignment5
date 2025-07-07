import React from 'react';
import '../Css/StudentProfile.css';
import studentImg from '../Assets/StudentProfile.png';
import MaleIcon from '@mui/icons-material/Male';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StudentProfile = () => {
  return (
    <div className="student-profile container-fluid m-2 mt-3" style={{ height: '100%', width: '99%' }}>
      <div className="student-card bg-white border rounded-4 p-3 pb-0 position-relative">
        {/* Show Profile Switch (Top-Right) */}
        <div
          className="form-check form-switch student-switch "
          style={{
            background: 'linear-gradient(90deg, #FFFFFF 30%, #6987FF 100%)',
            width: '20%',
            position: 'absolute',
            top: '0',
            right: '0',
            justifyContent:'right',
            alignItems:'right',
             borderTopRightRadius: '10px',
          }}
        >
          <label className="form-check-label small" htmlFor="showProfileSwitch">
            Show Profile
          </label>
          <input className="form-check-input" type="checkbox" id="showProfileSwitch" defaultChecked />
        </div>

        {/* Main Content */}
        <div className="d-flex justify-content-between gap-5">
          {/* Left: Image and Basic Info */}
          <div className="student-basic d-flex align-items-center gap-3" style={{ marginBottom: '0px', height: '40%' }}>
            <div className="student-image">
              <figure className="m-0">
                <img
                  src={studentImg}
                  alt="Student"
                  className="rounded-3"
                  width="119"
                  height="151"
                />
              </figure>
            </div>
            <div className="student-info">
              <div className="text-muted small student-admin-id">
                <span style={{ fontSize: '14px', fontWeight: 500 }}> Admin No: </span>
                <strong className="text-dark" style={{ fontSize: '14px', fontWeight: 600 }}>HYD 253487918</strong>
              </div>
              <h5 className="mb-1 fw-bold student-name">Devansh.N</h5>
              <div className="d-flex align-items-center gap-3 small mb-2 student-gender-group">
                <span className="student-gender" style={{ fontSize: '12px', fontWeight: 600, color: '#010101' }}>
                  <MaleIcon sx={{ width: '15px', height: '15px', color: '#5558FF' }} /> Male
                </span>
                <span
                  className="student-category text-muted d-flex align-items-center"
                  style={{ fontSize: '12px', fontWeight: 600, color: '#1F1F1F', gap: '8px' }}
                >
                  <svg width="5" height="4" viewBox="0 0 5 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="2.02344" cy="2" r="2" fill="#D9D9D9" />
                  </svg>
                  General
                </span>
              </div>
              <div className="student-tags d-flex gap-2 align-items-center">
                <span
                  className="btn student-class"
                  style={{
                    backgroundColor: '#0F6CBD',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    width: '56px',
                    height: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0'
                  }}
                >
                  Class 8
                </span>
                <span
                  className="btn student-track"
                  style={{
                    backgroundColor: '#48910F',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    width: '58px',
                    height: '23px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0'
                  }}
                >
                  Techno
                </span>
                <span
                  className="student-options border rounded-2 d-flex align-items-center justifyContent: 'center'"
                  style={{ width: '28px', height: '23px' }}
                >
                  <MoreHorizIcon sx={{ color: '#616161' }} />
                </span>
              </div>
            </div>
          </div>

          {/* Right: Details and Actions */}
          <div className="d-flex flex-grow-1 my-4 gap-3">
            <div className="student-details flex-grow-1">
              <div className="row text-muted small">
                {/* Row 1 */}
                <div className="col-md-4 mb-2 student-detail-item">
                  <div style={{ fontSize: '12px', fontWeight: 400, color: '#606060' }}>
                    Course Track / Orientation
                  </div>
                  <strong style={{ fontSize: '12px', fontWeight: 800, color: '#4F4F4F' }}>
                    Class 8 with Techno
                  </strong>
                </div>

                <div className="col-md-4 mb-2 student-detail-item">
                  <div style={{ fontSize: '12px', fontWeight: 400, color: '#606060' }}>
                    Admission Type
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#4F4F4F' }}>
                    Direct Walkin
                  </div>
                </div>

                <div className="col-md-4 mb-2 student-detail-item">
                  {/* Empty column for alignment */}
                </div>

                {/* Row 2 */}
                <div className="col-md-4 mb-2 student-detail-item">
                  <div style={{ fontSize: '12px', fontWeight: 400, color: '#606060' }}>
                    Admission Status
                  </div>
                  <strong style={{ fontSize: '12px', fontWeight: 800, color: '#4F4F4F' }}>
                    Current
                  </strong>
                </div>

                <div className="col-md-4 mb-2 student-detail-item">
                  <div style={{ fontSize: '12px', fontWeight: 400, color: '#606060' }}>
                    Student Type
                  </div>
                  <strong style={{ fontSize: '12px', fontWeight: 800, color: '#4F4F4F' }}>
                    Residential
                  </strong>
                </div>

                <div className="col-md-4 mb-2 student-detail-item">
                  <div style={{ fontSize: '12px', fontWeight: 400, color: '#606060' }}>
                    Section
                  </div>
                  <strong style={{ fontSize: '12px', fontWeight: 800, color: '#4F4F4F' }}>
                    8A
                  </strong>
                </div>
              </div>
            </div>

                  
            <div className="student-actions d-flex flex-column align-items-start gap-2" style={{ width: '20%' }}>
                  <div className="form-check form-switch  student-switch" >
            
            </div>
              <button className="btn btn-primary w-100 mb-1 student-view-btn">View full Profile</button>
              <button className="btn btn-outline-primary w-100 student-timeline-btn">⏳ Timeline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;