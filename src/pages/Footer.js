import React from 'react';

const Footer = () => {
  const primaryColor = '#FF7F50';

  return (
    <footer
      className="text-center py-3 mt-5"
      style={{
        backgroundColor: primaryColor,
        color: '#fff',
      }}
    >
      <div>
        <p className="mb-0"> Meal Explorer &copy; {new Date().getFullYear()}</p>

      </div>
    </footer>
  );
};

export default Footer;
