import React, { memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-700 text-white mt-auto">
      <div className="container mx-auto px-4 py-1">
        <div className="flex flex-col text-center">
          <div className="text-sm text-green-100">
            © {currentYear} Dream Portfolio. All rights reserved.
          </div>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/aman-kumar-verma-a7b360242/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aman Kumar Verma LinkedIn Profile"
              className="text-white hover:text-green-200 transition-all"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a
              href="https://github.com/TSSLxAMAN"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Aman Kumar Verma github Profile"
              className="text-white hover:text-green-200 transition-all"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;