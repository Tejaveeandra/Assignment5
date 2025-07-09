import { NavLink } from "react-router-dom";
import "../Css/MainNavbar.css";
import { useRef, useEffect } from "react";

const tabs = [
  { path: "/students/studentsprofile", label: "Student Profile" },
  { path: "/students/payments", label: "Payments" },
  { path: "/students/transport", label: "Transport" },
  { path: "/students/academics", label: "Academics" },
  { path: "/students/alerts", label: "Alerts" },
  { path: "/students/history", label: "History" },
  { path: "/students/roomallotment", label: "Room Allotment" },
  { path: "/students/issueforms", label: "Issue Forms" },
  { path: "/students/certificates", label: "Certificates" },
];

const MainNavbar = () => {
  const navbarRef = useRef(null);
  const rightArrowRef = useRef(null);
  const leftArrowRef = useRef(null);

  const scrollRight = () => {
    if (navbarRef.current) {
      navbarRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (navbarRef.current) {
      navbarRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const navbar = navbarRef.current;
    const rightArrow = rightArrowRef.current;
    const leftArrow = leftArrowRef.current;
    const checkVisibility = () => {
      if (navbar && rightArrow && leftArrow) {
        // Increased tolerance to account for padding and layout discrepancies
        const tolerance = 20;
        const isScrollable = navbar.scrollWidth > navbar.clientWidth + tolerance;
        const maxScroll = navbar.scrollWidth - navbar.clientWidth;
        const isLeftScrolled = navbar.scrollLeft > 0;
        const isCertificatesHidden = navbar.scrollLeft >= maxScroll - 200; // Approximate when Certificates is out of view

        rightArrow.style.display = isScrollable ? "block" : "none";
        leftArrow.style.display = isLeftScrolled && !isCertificatesHidden ? "block" : "none";
      }
    };

    checkVisibility();
    navbar.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    return () => {
      navbar.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  return (
    <div
      className="main-navbar d-flex shadow-sm p-1 mb-3 position-relative"
      ref={navbarRef}
      style={{ gap: "10px", overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none", msOverflowStyle: "none", paddingRight: "30px", boxSizing: "border-box" }} // boxSizing to include padding in width
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `nav-tab px-3 py-2 ${isActive ? "active-tab" : "text-dark"}`
          }
        >
          {tab.label}
        </NavLink>
      ))}
      <button
        ref={rightArrowRef}
        className="scroll-arrow right-arrow"
        onClick={scrollRight}
        style={{ position: "absolute", right: "5px", top: "50%", transform: "translateY(-50%)", display: "none", zIndex: 1 }} // zIndex to ensure it’s above content
      >
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 1L2 10L11 19" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        ref={leftArrowRef}
        className="scroll-arrow left-arrow"
        onClick={scrollLeft}
        style={{ position: "absolute", left: "5px", top: "50%", transform: "translateY(-50%)", display: "none", zIndex: 1 }} // zIndex to ensure it’s above content
      >
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L10 10L1 19" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
};

export default MainNavbar;