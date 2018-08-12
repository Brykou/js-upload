import React from "react";
import PropTypes from "prop-types";
import "./fileList.css";

function FileItem({ id, name, onRemove }) {
  return (
    <li className="item">
      <div>
        <img
          className="thumbnail"
          src={`${process.env.PUBLIC_URL}/static/${id}`}
          alt={name}
        />
      </div>
      <div className="title">{name}</div>
      <button onClick={() => onRemove(id)}>Delete</button>
    </li>
  );
}

class FileList extends React.Component {
  static displayName = "FileList";

  static propTypes = {
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    onRemove: PropTypes.func.isRequired
  };

  render() {
    const { files, onRemove } = this.props;
    return (
      <ul className="list">
        {files.map(file => {
          return (
            <FileItem
              key={file.id}
              id={file.id}
              name={file.name}
              onRemove={onRemove}
            />
          );
        })}
      </ul>
    );
  }
}

export default FileList;
