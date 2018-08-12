import React from "react";
import PropTypes from "prop-types";
import "./fileItem.css";

export default class FileItem extends React.PureComponent {
  static displayName = "FileItem";

  static propTypes = {
    file: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      mimeType: PropTypes.string.isRequired
    }),
    onRemove: PropTypes.func.isRequired
  };

  render() {
    const { file, onRemove } = this.props;
    const { id, name, mimeType } = file;
    return (
      <li className="item">
        <div>
          {mimeType.includes("image") ? (
            <img
              className="thumbnail"
              src={`${process.env.PUBLIC_URL}/static/${id}`}
              alt={name}
            />
          ) : (
            <div className="text">No preview</div>
          )}
        </div>
        <div className="text">{name}</div>
        <button onClick={() => onRemove(id)}>Delete</button>
      </li>
    );
  }
}
