import React from 'react';
import PropTypes from 'prop-types';

function Input({ placeholder, type = "text", className }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border rounded-xl  pr-4 pl-4 mr-4 ${className}`} 
    />
  );
}

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
