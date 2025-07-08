import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Css/FeeSummary.css';
import ScLogo from '../Assets/scLogo.png';
import ModrenLogo from '../Assets/modernLogo.png';

import { useNavigate } from 'react-router-dom';


const FeeSummary = () => {
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const handleChange = (panel) => (event) => {
    setExpanded(expanded === panel ? null : panel);
  };

  // Configuration
  const termTargets = [46000, 46000, 46000]; // Targets for Term 1, Term 2, Term 3
  const grandTarget = termTargets.reduce((sum, target) => sum + target, 0); // Total: 138,000
  const [currentValue, setCurrentValue] = useState(4900); // Set to 4,900 for testing
  const concession = 2000; // Example concession value
  const serviceTaxPaid = 1000; // Example service tax paid
  const feeDeduction = 500; // Example deduction
  const feeRefund = 0; // Example refund
  const serviceTaxToBePaid = 500; // Example tax to be paid

  // Calculate cumulative progress and segment details
  const cumulativeTargets = termTargets.reduce((acc, target, index) => {
    acc.push((acc[index] || 0) + target);
    return acc;
  }, []);
  const termProgress = termTargets.map((target, index) => {
    const start = index === 0 ? 0 : cumulativeTargets[index - 1];
    const paid = Math.min(Math.max(0, currentValue - start), target);
    const remaining = index === termTargets.length - 1 ? Math.max(0, grandTarget - currentValue) : Math.max(0, target - paid);
    const segmentProgress = (paid / target) * 100;
    const isCompleted = currentValue >= cumulativeTargets[index];
    return { paid, remaining, target, segmentProgress, start, isCompleted };
  });

  // Determine active term and completion
  const activeTermIndex = termProgress.findIndex(tp => tp.remaining > 0 && tp.start <= currentValue);
  const isAllCompleted = currentValue >= grandTarget;

  // Determine segment colors based on currentValue ranges
  const getSegmentColors = () => {
    if (currentValue < 46000) {
      return ['#dc3545', '#e9ecef', '#e9ecef']; // Term 1 red, others gray
    } else if (currentValue >= 46000 && currentValue < 92000) {
      return ['#28a745', '#dc3545', '#e9ecef']; // Term 1 green, Term 2 red, Term 3 gray
    } else if (currentValue >= 92000 && currentValue < 138000) {
      return ['#28a745', '#28a745', '#dc3545']; // Terms 1 & 2 green, Term 3 red
    } else {
      return ['#28a745', '#28a745', '#28a745']; // All green
    }
  };

  const segmentColors = getSegmentColors();

  // Calculate derived values
  const additionalAmount = currentValue > cumulativeTargets[activeTermIndex >= 0 ? activeTermIndex : 0] ? currentValue - cumulativeTargets[activeTermIndex >= 0 ? activeTermIndex : 0] : 0;
  const netFee = termTargets[0] - concession; // Example net fee calculation
  const overallDue = isAllCompleted ? 0 : termProgress[activeTermIndex >= 0 ? activeTermIndex : 2].remaining;

  // PocketItem Component
  const PocketItem = ({ label, value }) => (
    <div className="d-flex justify-content-between align-items-center mb-2 pocket-item">
      <span className="pocket-item-label">{label}</span>
      <span className="pocket-item-value">{value}</span>
    </div>
  );

  return (
    <div
      className="container-fluid p-0"
      style={{
        maxHeight: '300px', // Fixed height to prevent layout shift
        overflowY: 'auto', // Enable vertical scrolling
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
        msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
      }}
    >
      <div className="accordion" id="feeSummaryAccordion">
        {/* Fee Details Accordion */}
        <div className="accordion-item border-0 bg-light mb-2">
          <h2 className="accordion-header" id="fee-details-header">
            <button
              className={`accordion-button ${expanded !== 'panel1' ? 'collapsed' : ''}`}
              type="button"
              onClick={handleChange('panel1')}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E4F0' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {/* SVG and Fee Details */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#56555C',
                    gap: '8px',
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.83958 1.83334C9.71133 1.83426 10.5418 2.25043 11.0625 2.94618L11.8976 4.05718C12.1625 4.40936 12.5832 4.61909 13.0232 4.62001H15.6165C19.0647 4.62001 20.8057 6.43409 20.8057 10.329L20.7801 14.8821C20.7792 18.5194 18.5187 20.7799 14.8795 20.7799H7.746C4.0995 20.7799 1.8335 18.5185 1.8335 14.8793V7.73026C1.8335 3.81701 3.57425 1.83334 7.00625 1.83334H8.83958ZM8.83866 3.20834H7.00625C4.34425 3.20834 3.2085 4.56134 3.2085 7.73026V14.8793C3.2085 17.798 4.82 19.4049 7.746 19.4049H14.8795C17.7982 19.4049 19.4051 17.798 19.4051 14.8793V14.8766L19.4307 10.3253C19.4307 7.20959 18.3619 5.99501 15.6165 5.99501H13.0223C12.1524 5.99409 11.3219 5.57884 10.7994 4.88401L9.9625 3.77118C9.69941 3.41826 9.27866 3.20926 8.83866 3.20834ZM15.3233 13.0284C15.7028 13.0284 16.0108 13.3364 16.0108 13.7159C16.0108 14.0954 15.7028 14.4034 15.3233 14.4034H7.31626C6.93676 14.4034 6.62876 14.0954 6.62876 13.7159C6.62876 13.3364 6.93676 13.0284 7.31626 13.0284H15.3233Z"
                      fill="#56555C"
                    />
                  </svg>
                  <span style={{ fontWeight: 500, fontSize: '16px' }}>Fee Details</span>
                </div>
                {/* Payments Button and Term Progress */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4rem',
                    marginLeft: 'auto',
                  }}
                >
                  <button
                    className="btn btn-sm"
                    style={{
                      backgroundColor: '#EEEEEE',
                      color: '#3425FF',
                      height: '36px',
                      width: '6rem',
                      fontSize: '14px',
                      fontWeight: 400,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-plus"
                      viewBox="0 0 16 16"
                      style={{ marginRight: '4px' }}
                    >
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    Payment
                  </button>
                  <div className="d-flex align-items-center flex-column">
                    <div className="d-flex align-items-center mb-1">
                      <span className="me-5" style={{ color: '#82808F' }}>
                        {isAllCompleted ? 'Completed' : `Term ${activeTermIndex >= 0 ? activeTermIndex + 1 : 3}`}
                      </span>
                      <span
                        className="fw-bold me-2"
                        style={{
                          color: isAllCompleted
                            ? '#28a745'
                            : activeTermIndex >= 0 && termProgress[activeTermIndex].paid >= termTargets[activeTermIndex]
                            ? '#28a745'
                            : '#dc3545',
                        }}
                      >
                        {isAllCompleted ? 0 : activeTermIndex >= 0 ? termProgress[activeTermIndex].remaining : 0}
                      </span>
                    </div>
                    <div
                      style={{
                        width: '200px',
                        height: '10px',
                        display: 'flex',
                        backgroundColor: '#e9ecef',
                        borderRadius: '5px',
                        overflow: 'hidden',
                        position: 'relative',
                        isolation: 'isolate',
                      }}
                    >
                      {termTargets.map((_, index) => (
                        <div
                          key={index}
                          style={{
                            flex: 1,
                            backgroundColor: segmentColors[index],
                            borderRight: index < termTargets.length - 1 ? '1px solid #000' : 'none',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="fee-details-content"
            className={`accordion-collapse collapse ${expanded === 'panel1' ? 'show' : ''}`}
            aria-labelledby="fee-details-header"
            data-bs-parent="#feeSummaryAccordion"
          >
            <div className="accordion-body p-0" style={{ backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1, paddingTop: '1rem', paddingLeft: '4rem', paddingBottom: '1rem' }}>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Course Fee</strong></span>
                    <span className="fee-value">{grandTarget.toLocaleString()}</span>
                  </p>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Add’l Amount</strong></span>
                    <span className="fee-value">{additionalAmount.toLocaleString()}</span>
                  </p>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Concession</strong></span>
                    <span className="fee-value">{concession.toLocaleString()}</span>
                  </p>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Net Fee</strong></span>
                    <span className="fee-value">{netFee.toLocaleString()}</span>
                  </p>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Service Tax Paid</strong></span>
                    <span className="fee-value">{serviceTaxPaid.toLocaleString()}</span>
                  </p>
                </div>
                <div style={{ flex: 1, paddingTop: '1rem', paddingBottom: '1rem' }}>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Fee Paid</strong></span>
                    <span className="fee-value">{currentValue.toLocaleString()}</span>
                  </p>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Fee Deduction</strong></span>
                    <span className="fee-value">{feeDeduction.toLocaleString()}</span>
                  </p>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Fee Refund</strong></span>
                    <span className="fee-value">{feeRefund.toLocaleString()}</span>
                  </p>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Over All Due</strong></span>
                    <span className="fee-value">{overallDue.toLocaleString()}</span>
                  </p>
                  <p className="fee-details-text mb-2 d-flex align-items-center">
                    <span className="fee-title"><strong>Service Tax to be Paid</strong></span>
                    <span className="fee-value">{serviceTaxToBePaid.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pocket Money Section */}
        <div className="pocket-money-container mb-2">
          <div
            className="pocket-money-header"
            onClick={handleChange('panel2')}
          >
            <div className="d-flex align-items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.83958 0.833313C8.71133 0.83423 9.54183 1.2504 10.0625 1.94615L10.8976 3.05715C11.1625 3.40915 11.5832 3.61906 12.0232 3.61998H14.6165C18.1567 3.61998 19.8057 5.43406 19.8057 9.32898L19.7801 13.8821C19.7792 17.5194 17.5187 19.7799 13.8795 19.7799H6.746C3.0995 19.7799 0.833496 17.5185 0.833496 13.8793V6.73023C0.833496 2.81698 2.57425 0.833313 6.00625 0.833313H7.83958ZM7.83866 2.20831H6.00625C3.34425 2.20831 2.2085 3.56131 2.2085 6.73023V13.8793C2.2085 16.798 3.82 18.4049 6.746 18.4049H13.8795C16.7982 18.4049 18.4051 16.798 18.4051 13.8793V13.8766L18.4307 9.32531C18.4307 6.20956 17.3619 4.99498 14.6165 4.99498H12.0223C11.1524 4.99406 10.3219 4.57881 9.79941 3.88398L8.9625 2.77115C8.69941 2.41823 8.27866 2.20923 7.83866 2.20831ZM14.3233 12.0284C14.7028 12.0284 15.0108 12.3364 15.0108 12.7159C15.0108 13.0954 14.7028 13.4034 14.3233 13.4034H6.31626C5.93676 13.4034 5.62876 13.0954 5.62876 12.7159C5.62876 12.3364 5.93676 12.0284 6.31626 12.0284H14.3233Z" fill="#56555C" />
              </svg>
              <strong className="pocket-money-title">Pocket Money</strong>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex flex-column align-items-end">
                <div className="d-flex align-items-center gap-3 mb-1">
                  <span className="pocket-money-balance-label">Balance</span>
                  <span className="pocket-money-balance-value">800</span>
                </div>
                <div className="pocket-money-progress">
                  <div className="pocket-money-progress-filled"></div>
                  <div className="pocket-money-progress-empty"></div>
                </div>
              </div>
              {expanded === 'panel2' ? (
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6L6 1L11 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 1L6 6L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
          {expanded === 'panel2' && (
            <div className="pocket-money-content">
              <div className="row gy-3">
                <div className="col-md-6">
                  <PocketItem label="Pocket Refund" value="0" />
                  <PocketItem label="Deposited Amount" value="7,000" />
                  <PocketItem label="Taken Amount" value="5,492" />
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <div className="pocket-money-card">
                    <div className="pocket-money-card-admission">Admission No</div>
                    <div className="pocket-money-card-admission-value">123456765432</div>
                    <div className="pocket-money-card-student">
                      <div className="pocket-money-card-student-name">Yaswanth Bhimineni</div>
                      <div className="pocket-money-card-student-label">Student Name</div>
                    </div>
                    <div className="pocket-money-card-balance">
                      <div className="pocket-money-card-balance-label">Balance</div>
                      <div className="pocket-money-card-balance-value">2,000</div>
                    </div>
                    <div className="pocket-money-card-footer">
                      <figure>
                        <img src={ScLogo} alt="logo" width="24" height="24" />
                        <img src={ModrenLogo} alt="logo" width="24" height="24" />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-2 mt-3">
                <button
                  className="btn btn-sm"
                  style={{
                    backgroundColor: '#3425FF',
                    color: '#FFFFFF',
                    height: '36px',
                    width: '8rem',
                    fontSize: '14px',
                    fontWeight: 400,
                  }}
                  onClick={() => navigate('/students/add-money')}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-plus"
                    viewBox="0 0 16 16"
                    style={{ marginRight: '4px' }}
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  Add Money
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Transport Details Section */}
        <div className="accordion-item border-0 bg-light mb-2">
          <h2 className="accordion-header" id="transport-details-header">
            <button
              className={`accordion-button ${expanded !== 'panel3' ? 'collapsed' : ''}`}
              type="button"
              onClick={handleChange('panel3')}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E4F0' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#56555C',
                    gap: '8px',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.83909 0.833344C8.71084 0.83426 9.54134 1.25043 10.062 1.94618L10.8971 3.05718C11.162 3.40918 11.5828 3.61909 12.0228 3.62001H14.616C18.1562 3.62001 19.8053 5.43409 19.8053 9.32901L19.7796 13.8821C19.7787 17.5194 17.5182 19.7799 13.879 19.7799H6.74551C3.09901 19.7799 0.833008 17.5185 0.833008 13.8793V6.73026C0.833008 2.81701 2.57376 0.833344 6.00576 0.833344H7.83909ZM7.83817 2.20834H6.00576C3.34376 2.20834 2.20801 3.56134 2.20801 6.73026V13.8793C2.20801 16.798 3.81951 18.4049 6.74551 18.4049H13.879C16.7977 18.4049 18.4046 16.798 18.4046 13.8793V13.8766L18.4303 9.32534C18.4303 6.20959 17.3614 4.99501 14.616 4.99501H12.0218C11.1519 4.99409 10.3214 4.57884 9.79892 3.88401L8.96201 2.77118C8.69892 2.41826 8.27817 2.20926 7.83817 2.20834ZM14.3229 12.0284C14.7024 12.0284 15.0104 12.3364 15.0104 12.7159C15.0104 13.0954 14.7024 13.4034 14.3229 13.4034H6.31577C5.93627 13.4034 5.62827 13.0954 5.62827 12.7159C5.62827 12.3364 5.93627 12.0284 6.31577 12.0284H14.3229Z"
                      fill="#56555C"
                    />
                  </svg>
                  <span style={{ fontWeight: 500, fontSize: '16px' }}>Transport Details</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4rem',
                    marginLeft: 'auto',
                  }}
                >
                  <div className="d-flex align-items-center">
                    <span className=" me-2"style={{color:'#82808F'}}>Status:</span>
                    <span className=" fw-bold" style={{color:'#08b61A'}}>Assigned</span>
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="transport-details-content"
            className={`accordion-collapse collapse ${expanded === 'panel3' ? 'show' : ''}`}
            aria-labelledby="transport-details-header"
            data-bs-parent="#feeSummaryAccordion"
          >
            <div className="accordion-body p-4 px-5" style={{backgroundColor:'#FFFFFF'}}>
          
            
                 <div className="col-md-6">
                  <PocketItem label="Pocket Refund" value="0" />
                  <PocketItem label="Deposited Amount" value="7,000" />
                  <PocketItem label="Taken Amount" value="5,492" />
                </div>
            
            </div>
          </div>
        </div>

        {/* Refunds Accordion */}
        <div className="accordion-item border-0 bg-light mb-2">
          <h2 className="accordion-header" id="refunds-header">
            <button
              className={`accordion-button ${expanded !== 'panel4' ? 'collapsed' : ''}`}
              type="button"
              onClick={handleChange('panel4')}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E4F0' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#56555C',
                    gap: '8px',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.83909 0.833344C8.71084 0.83426 9.54134 1.25043 10.062 1.94618L10.8971 3.05718C11.162 3.40918 11.5828 3.61909 12.0228 3.62001H14.616C18.1562 3.62001 19.8053 5.43409 19.8053 9.32901L19.7796 13.8821C19.7787 17.5194 17.5182 19.7799 13.879 19.7799H6.74551C3.09901 19.7799 0.833008 17.5185 0.833008 13.8793V6.73026C0.833008 2.81701 2.57376 0.833344 6.00576 0.833344H7.83909ZM7.83817 2.20834H6.00576C3.34376 2.20834 2.20801 3.56134 2.20801 6.73026V13.8793C2.20801 16.798 3.81951 18.4049 6.74551 18.4049H13.879C16.7977 18.4049 18.4046 16.798 18.4046 13.8793V13.8766L18.4303 9.32534C18.4303 6.20959 17.3614 4.99501 14.616 4.99501H12.0218C11.1519 4.99409 10.3214 4.57884 9.79892 3.88401L8.96201 2.77118C8.69892 2.41826 8.27817 2.20926 7.83817 2.20834ZM14.3229 12.0284C14.7024 12.0284 15.0104 12.3364 15.0104 12.7159C15.0104 13.0954 14.7024 13.4034 14.3229 13.4034H6.31577C5.93627 13.4034 5.62827 13.0954 5.62827 12.7159C5.62827 12.3364 5.93627 12.0284 6.31577 12.0284H14.3229Z"
                      fill="#56555C"
                    />
                  </svg>
                  <span style={{ fontWeight: 500, fontSize: '16px' }}>Refunds</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4rem',
                    marginLeft: 'auto',
                  }}
                >
                  <div className="d-flex align-items-center">
                    <span className="me-2" style={{color:'#82808F'}}>Pending:</span>
                    <span className=" fw-bold" style={{color:'#08B61A'}}>0</span>
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="refunds-content"
            className={`accordion-collapse collapse ${expanded === 'panel4' ? 'show' : ''}`}
            aria-labelledby="refunds-header"
            data-bs-parent="#feeSummaryAccordion"
          >
              <div className="accordion-body p-4 px-5" style={{backgroundColor:'#FFFFFF'}}>
          
            
                 <div className="col-md-6">
                  <PocketItem label="Pocket Refund" value="0" />
                  <PocketItem label="Deposited Amount" value="7,000" />
                  <PocketItem label="Taken Amount" value="5,492" />
                </div>
            
            </div>
          </div>
        </div>

        {/* Other Fee Heads Accordion */}
        <div className="accordion-item border-0 bg-light mb-2">
          <h2 className="accordion-header" id="other-fee-heads-header">
            <button
              className={`accordion-button ${expanded !== 'panel5' ? 'collapsed' : ''}`}
              type="button"
              onClick={handleChange('panel5')}
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #E6E4F0' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#56555C',
                    gap: '8px',
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.83909 0.833344C8.71084 0.83426 9.54134 1.25043 10.062 1.94618L10.8971 3.05718C11.162 3.40918 11.5828 3.61909 12.0228 3.62001H14.616C18.1562 3.62001 19.8053 5.43409 19.8053 9.32901L19.7796 13.8821C19.7787 17.5194 17.5182 19.7799 13.879 19.7799H6.74551C3.09901 19.7799 0.833008 17.5185 0.833008 13.8793V6.73026C0.833008 2.81701 2.57376 0.833344 6.00576 0.833344H7.83909ZM7.83817 2.20834H6.00576C3.34376 2.20834 2.20801 3.56134 2.20801 6.73026V13.8793C2.20801 16.798 3.81951 18.4049 6.74551 18.4049H13.879C16.7977 18.4049 18.4046 16.798 18.4046 13.8793V13.8766L18.4303 9.32534C18.4303 6.20959 17.3614 4.99501 14.616 4.99501H12.0218C11.1519 4.99409 10.3214 4.57884 9.79892 3.88401L8.96201 2.77118C8.69892 2.41826 8.27817 2.20926 7.83817 2.20834ZM14.3229 12.0284C14.7024 12.0284 15.0104 12.3364 15.0104 12.7159C15.0104 13.0954 14.7024 13.4034 14.3229 13.4034H6.31577C5.93627 13.4034 5.62827 13.0954 5.62827 12.7159C5.62827 12.3364 5.93627 12.0284 6.31577 12.0284H14.3229Z"
                      fill="#56555C"
                    />
                  </svg>
                  <span style={{ fontWeight: 500, fontSize: '16px' }}>Other Fee Heads</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4rem',
                    marginLeft: 'auto',
                  }}
                >
                  <div className="d-flex align-items-center">
                    <span className="me-2" style={{color:'#82808F'}}>Pending:</span>
                    <span className=" fw-bold" style={{color:'#08B61A'}}>0</span>
                  </div>
                </div>
              </div>
            </button>
          </h2>
          <div
            id="other-fee-heads-content"
            className={`accordion-collapse collapse ${expanded === 'panel5' ? 'show' : ''}`}
            aria-labelledby="other-fee-heads-header"
            data-bs-parent="#feeSummaryAccordion"
          >
            <div className="accordion-body p-4 px-5" style={{backgroundColor:'#FFFFFF'}}>
          
            
                 <div className="col-md-6">
                  <PocketItem label="Pocket Refund" value="0" />
                  <PocketItem label="Deposited Amount" value="7,000" />
                  <PocketItem label="Taken Amount" value="5,492" />
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeSummary;