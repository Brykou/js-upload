import React from "react";
import PropTypes from "prop-types";
import FileItem from "./FileItem";
import "./fileList.css";

class FileList extends React.Component {
  static displayName = "FileList";

  static propTypes = {
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        mimeType: PropTypes.string.isRequired
      })
    ).isRequired,
    onRemove: PropTypes.func.isRequired
  };

  render() {
    const { files, onRemove } = this.props;
    return (
      <ul className="list">
        {files.map(file => {
          return <FileItem key={file.id} file={file} onRemove={onRemove} />;
        })}
      </ul>
    );
  }
}

export default FileList;
