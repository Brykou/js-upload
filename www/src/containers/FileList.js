import { connect } from "react-redux";
import FileList from "../components/FileList";
import { removeFile } from "../redux/actions";

const mapStateToProps = state => ({
  // Filter files depending on user input in seach bar
  files: state.files.filter(file => {
    return file.name.includes(state.search);
  })
});

const mapDispatchToProps = dispatch => ({
  onRemove: id => dispatch(removeFile(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);
