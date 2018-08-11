import React from "react";
import PropTypes from "prop-types";

class Uploader extends React.Component {
  static displayName = "Uploader";

  static propTypes = {
    onUpload: PropTypes.func.isRequired
  };

  handleUploadFile = event => {
    const { onUpload } = this.props;
    const data = new FormData();
    data.append("fileToUpload", event.target.files[0]);
    onUpload(data);
  };

  render() {
    return <input type="file" onChange={this.handleUploadFile} />;
  }
}

export default Uploader;
