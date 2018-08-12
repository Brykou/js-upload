import React from "react";
import PropTypes from "prop-types";

class Uploader extends React.Component {
  static displayName = "Uploader";

  static propTypes = {
    onUpload: PropTypes.func.isRequired
  };

  shouldComponentUpdate() {
    return false;
  }

  handleUploadFile = event => {
    const file = event.target.files[0];
    if (file) {
      const { onUpload } = this.props;
      const data = new FormData();
      data.append("fileToUpload", file);
      onUpload(data);
    }
  };

  render() {
    return (
      <input
        type="file"
        accept=".jpg, .jpeg, .gif, .png, .txt"
        onChange={this.handleUploadFile}
      />
    );
  }
}

export default Uploader;
