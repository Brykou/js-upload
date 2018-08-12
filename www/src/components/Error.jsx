import React from "react";
import PropTypes from "prop-types";
import "./error.css";

export default function Error({ message, dismiss }) {
  if (!message) return null;
  return (
    <div className="error" title="Dismiss error" onClick={() => dismiss()}>
      {`ERROR: ${message}`}
    </div>
  );
}

Error.displayName = "Error";
Error.propTypes = {
  message: PropTypes.string,
  dismiss: PropTypes.func.isRequired
};
