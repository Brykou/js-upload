import React from "react";
import PropTypes from "prop-types";
import "./search.css";

class Search extends React.Component {
  static displayName = "Search";

  static propTypes = {
    onSearch: PropTypes.func.isRequired
  };

  filterFiles = event => {
    const { onSearch } = this.props;
    const input = event.target.value;
    onSearch(input);
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <input
        className="search"
        type="text"
        placeholder="Type a file name here"
        onChange={this.filterFiles}
      />
    );
  }
}

export default Search;
