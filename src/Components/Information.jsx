import { useState } from "react";
import '../Css/Information.css';

const ArrowIcon = ({ isOpen }) => (
    isOpen ? (
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 6L6 1L1 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ) : (
        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1L6 6L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
);

const Information = () => {
    const [openCard, setOpenCard] = useState(null);

    const toggleCard = (card) => {
        setOpenCard(openCard === card ? null : card);
    };

    const renderHeader = (title, cardKey) => (
        <div className="header d-flex justify-content-between align-items-center bg-white" style={{ width: '100%' }}>
            <div className="d-flex align-items-center gap-2">
                {cardKey === "profile" ? (
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M14.2411 7.26923C13.8272 7.26923 13.279 7.26006 12.5964 7.26006C10.9318 7.26006 9.56309 5.88231 9.56309 4.20206V1.25406C9.56309 1.02215 9.37793 0.833313 9.1483 0.833313H4.29966C2.03691 0.833313 0.208008 2.69048 0.208008 4.96656V14.8436C0.208008 17.2316 2.12404 19.1666 4.48845 19.1666H11.7088C13.9633 19.1666 15.7913 17.3214 15.7913 15.0435V7.68173C15.7913 7.44889 15.6071 7.26098 15.3765 7.26189C14.989 7.26464 14.5243 7.26923 14.2411 7.26923Z" fill="#56555C" />
                        <path opacity="0.4" d="M11.7438 1.35336C11.4697 1.06828 10.9912 1.26444 10.9912 1.65953V4.07678C10.9912 5.09061 11.8263 5.92478 12.8401 5.92478C13.479 5.93211 14.3664 5.93394 15.1199 5.93211C15.5058 5.93119 15.702 5.47011 15.4343 5.19144C14.4672 4.18586 12.7356 2.38369 11.7438 1.35336Z" fill="#56555C" />
                        <path d="M10.2164 12.6517C10.5931 12.6517 10.8993 12.9579 10.8993 13.3346C10.8993 13.7114 10.5931 14.0166 10.2164 14.0166H5.22604C4.84929 14.0166 4.54404 13.7114 4.54404 13.3346C4.54404 12.9579 4.84929 12.6517 5.22604 12.6517H10.2164ZM8.32886 8.07367C8.70561 8.07367 9.01178 8.37984 9.01178 8.75659C9.01178 9.13334 8.70561 9.43859 8.32886 9.43859H5.22595C4.8492 9.43859 4.54395 9.13334 4.54395 8.75659C4.54395 8.37984 4.8492 8.07367 5.22595 8.07367H8.32886Z" fill="#56555C" />
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M17.2411 8.26926C16.8272 8.26926 16.279 8.26009 15.5964 8.26009C13.9318 8.26009 12.5631 6.88234 12.5631 5.20209V2.25409C12.5631 2.02218 12.3779 1.83334 12.1483 1.83334H7.29966C5.03691 1.83334 3.20801 3.69051 3.20801 5.96659V15.8437C3.20801 18.2316 5.12404 20.1667 7.48845 20.1667H14.7088C16.9633 20.1667 18.7913 18.3214 18.7913 16.0435V8.68176C18.7913 8.44893 18.6071 8.26101 18.3765 8.26192C17.989 8.26467 17.5243 8.26926 17.2411 8.26926Z" fill="#56555C" />
                        <path opacity="0.4" d="M14.7438 2.35336C14.4697 2.06828 13.9912 2.26444 13.9912 2.65953V5.07678C13.9912 6.09061 14.8263 6.92478 15.8401 6.92478C16.479 6.93211 17.3664 6.93394 18.1199 6.93211C18.5058 6.93119 18.702 6.47011 18.4343 6.19144C17.4672 5.18586 15.7356 3.38369 14.7438 2.35336Z" fill="#56555C" />
                        <path d="M13.2164 13.6517C13.5931 13.6517 13.8993 13.9579 13.8993 14.3347C13.8993 14.7114 13.5931 15.0167 13.2164 15.0167H8.22604C7.84929 15.0167 7.54404 14.7114 7.54404 14.3347C7.54404 13.9579 7.84929 13.6517 8.22604 13.6517H13.2164ZM11.3289 9.07373C11.7056 9.07373 12.0118 9.3799 12.0118 9.75665C12.0118 10.1334 11.7056 10.4386 11.3289 10.4386H8.22595C7.8492 10.4386 7.54395 10.1334 7.54395 9.75665C7.54395 9.3799 7.8492 9.07373 8.22595 9.07373H11.3289Z" fill="#56555C" />
                    </svg>
                )}
                <span className="section-title">{title}</span>
            </div>
            <button className="btn btn-sm toggle-btn" onClick={() => toggleCard(cardKey)}>
                <ArrowIcon isOpen={openCard === cardKey} />
            </button>
        </div>
    );

    return (
        <div id="information_container">
            <div className="information p-2">
                {/* Blue Badge Header */}
                <div className="badge-header d-flex align-items-center gap-2 ">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.7" d="M10.0997 0H12.9003C14.0602 0 15 0.939829 15 2.09969V4.90031C15 6.06017 14.0602 7 12.9003 7H10.0997C8.93983 7 8 6.06017 8 4.90031V2.09969C8 0.939829 8.93983 0 10.0997 0Z" fill="white" />
                        <path d="M4.28267 8.97699C5.21751 8.97699 5.97502 9.74089 5.97502 10.6836V12.96C5.97502 13.9021 5.21751 14.6666 4.28267 14.6666H2.02536C1.09051 14.6666 0.333008 13.9021 0.333008 12.96V10.6836C0.333008 9.74089 1.09051 8.97699 2.02536 8.97699H4.28267ZM11.974 8.97699C12.9088 8.97699 13.6663 9.74089 13.6663 10.6836V12.96C13.6663 13.9021 12.9088 14.6666 11.974 14.6666H9.71668C8.78184 14.6666 8.02433 13.9021 8.02433 12.96V10.6836C8.02433 9.74089 8.78184 8.97699 9.71668 8.97699H11.974ZM4.28267 1.33331C5.21751 1.33331 5.97502 2.09721 5.97502 3.03996V5.31633C5.97502 6.25907 5.21751 7.02297 4.28267 7.02297H2.02536C1.09051 7.02297 0.333008 6.25907 0.333008 5.31633V3.03996C0.333008 2.09721 1.09051 1.33331 2.02536 1.33331H4.28267Z" fill="white" />
                    </svg>
                    <span className="badge-text">Additional Information</span>
                </div>

                {/* Profile Details */}
                <div className="card border border-secondary-subtle rounded-3 shadow-sm mt-3 p-1">
                    {renderHeader("Profile Details", "profile")}
                    {!openCard || openCard !== "profile" ? (
                        <div className="button-row">
                            <button className="btn btn-sm rounded-pill additional custom-green" onClick={() => toggleCard("profile")}>
                                Profile Details
                            </button>
                        </div>
                    ) : (
                        <div className="row profile-info-row pe-3 mb-0">
                            <div className="col-6">
                                <label className="form-label small-label" style={{ color: "#999999" }}>Aadhar number</label>
                                <span className="form-value" style={{ color: "#4F4F4F" }}>6782 6789 9762</span>
                            </div>
                            <div className="col-6 text-end px-0">
                                <label className="form-label small-label" style={{ color: "#999999" }}>Mother Name</label>
                                <span className="form-value" style={{ whiteSpace: "noWrap", color: "#4F4F4F" }}>Radha Rani Bhimineni</span>
                            </div>
                            <div className="col-6">
                                <label className="form-label small-label" style={{ color: "#999999" }}>Date of Birth</label>
                                <span className="form-value" style={{ color: "#4F4F4F" }}>28 Dec 1997</span>
                            </div>
                            <div className="col-6 text-end">
                                <label className="form-label small-label" style={{ color: "#999999" }}>Father Name</label>
                                <span className="form-value" style={{ color: "#4F4F4F" }}>Giridhar Bhimineni</span>
                            </div>
                            <div className="col-12">
                                <label className="form-label" style={{ color: "#999999" }}>Address</label>
                                <span className="form-value" style={{ color: "#4F4F4F" }}>
                                    6th Floor, NCC Building, Durgamma Cheruvu Road, HITEC City, Hyderabad, Telangana 500081
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Campus Details */}
                <div className="card border border-secondary-subtle rounded-3 shadow-sm mt-3 p-1">
                    {renderHeader("Campus Details", "campus")}
                    {!openCard || openCard !== "campus" ? (
                        <div className="button-row">
                            <button className="btn btn-sm rounded-pill custom-green" onClick={() => toggleCard("campus")}>Current Campus</button>
                            <button className="btn btn-sm rounded-pill custom-pink" onClick={() => toggleCard("campus")}>Course</button>
                        </div>
                    ) : (
                        <div className="p-3">
                            <div className="col-6">
                                <label className="form-label small-label" style={{ color: "#999999" }}>Campus:</label>
                                <span className="form-value" style={{ whiteSpace: "noWrap", color: "#4F4F4F" }}> Hitech city</span>
                            </div>
                            <div className="col-6">
                                <label className="form-label small-label" style={{ color: "#999999" }}>Course:</label>
                                <span className="form-value" style={{ color: "#4F4F4F" }}> CSE</span>
                            </div>
                        </div>
                    )}
                </div>



                {/* Personal Interests */}
                <div className="card border border-secondary-subtle rounded-3 shadow-sm mt-3 p-1">
                    {renderHeader("Personal Interests", "interests")}
                    {!openCard || openCard !== "interests" ? (
                        <div className="button-row">
                            <button className="btn btn-sm rounded-pill custom-green" onClick={() => toggleCard("interests")}>Hobbies</button>
                            <button className="btn btn-sm rounded-pill custom-pink" onClick={() => toggleCard("interests")}>Interests</button>
                        </div>
                    ) : (
                        <div className="p-3">
                            <div className="col-6">
                                <label className="form-label small-label" style={{ color: "#999999" }}>Hobbies:</label>
                                <span className="form-value" style={{ whiteSpace: "noWrap", color: "#4F4F4F" }}> Reading</span>
                            </div>
                            <div className="col-6">
                                <label className="form-label small-label" style={{ color: "#999999" }}>Intrest:</label>
                                <span className="form-value" style={{ color: "#4F4F4F" }}> Badminton</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Information;