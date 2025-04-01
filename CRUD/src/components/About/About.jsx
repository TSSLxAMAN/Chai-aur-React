import React from 'react';
import { useSelector } from 'react-redux';

const About = () => {
  // Get theme colors from Redux store
  const themeBgColor = useSelector(state => state.theme.bgColor);
  const themeTextColor = useSelector(state => state.theme.textColor);
  const themeCardBgColor = useSelector(state => state.theme.cardBgColor);
  const themeBorderColor = useSelector(state => state.theme.border);
  const themeCardColor = useSelector(state => state.theme.btnColor);
  
  return (
    <div className={`mx-auto p-6 ${themeBgColor} ${themeTextColor}  h-screen`}>
      <div className={`${themeCardColor} p-8 rounded-xl shadow-lg border ${themeBorderColor}`}>
        <h1 className="text-4xl font-bold text-white mb-4">About Employee Management System</h1>
        <p className="text-lg leading-relaxed text-white">
          Our <span className="text-white font-semibold">Employee Management System</span> is designed to 
          streamline workforce management, making it easier for organizations to handle employee records, 
          departments, and performance tracking efficiently.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 border ${themeBorderColor} rounded-lg hover:bg-opacity-80 transition`}>
            <h3 className="text-xl text-white font-semibold">Our Mission</h3>
            <p className="mt-2 text-white">
              To simplify HR processes by providing an intuitive platform that enables businesses to manage 
              employee data with ease and efficiency.
            </p>
          </div>
          <div className={`p-4 border ${themeBorderColor} rounded-lg hover:bg-opacity-80 transition`}>
            <h3 className="text-xl text-white font-semibold">Our Vision</h3>
            <p className="mt-2 text-white">
              To be the leading employee management solution that enhances workplace productivity 
              and promotes seamless organizational growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
