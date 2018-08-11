import { connect } from "react-redux";
import FileList from "../components/FileList";
import { removeFile } from "../redux/actions";

const mapStateToProps = state => ({
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  onRemove: id => dispatch(removeFile(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileList);
