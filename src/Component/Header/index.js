import React, { useState, useEffect } from "react";
import { isMobileViewHook } from "../../CustomHooks/isMobileViewHook";
import DesktopHeader from "./DesktopHeader";
import { MobileHeader } from "./MobileHeader";
import PropTypes from "prop-types";

const Header = ({
  backgroundColor,
  containerClass,
  className,
  customStyle,
  headerClassName,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    isMobileViewHook(setIsMobile, 992);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [window.innerWidth]);

  return (
    <header
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 6,
      }}
      className={headerClassName}
    >
      {isMobile ? (
        <MobileHeader
          customStyle={customStyle}
          isSticky={scrollPosition >= 70}
        />
      ) : (
        <DesktopHeader
          backgroundColor={backgroundColor}
          containerClass={containerClass}
          className={className}
          isSticky={scrollPosition >= 109}
        />
      )}
    </header>
  );
};

export default Header;

Header.propTypes = {
  backgroundColor: PropTypes.string,
  containerClass: PropTypes.string,
  className: PropTypes.string,
  logo: PropTypes.object,
  customStyle: PropTypes.object,
};
