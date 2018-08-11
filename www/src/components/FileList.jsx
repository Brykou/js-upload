import React from "react";
import PropTypes from "prop-types";

function FileItem({ id, onRemove }) {
  return (
    <li>
      {id}
      <button onClick={() => onRemove(id)}>X</button>
    </li>
  );
}

class FileList extends React.Component {
  static displayName = "FileList";

  static propTypes = {
    files: PropTypes.arrayOf(PropTypes.string).isRequired,
    onRemove: PropTypes.func.isRequired
  };

  render() {
    const { files, onRemove } = this.props;
    return (
      <ul>
        {files.map(file => {
          return <FileItem key={file} id={file} onRemove={onRemove} />;
        })}
      </ul>
    );
  }
}

export default FileList;
