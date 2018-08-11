import { connect } from "react-redux";
import Uploader from "../components/Uploader";
import { uploadFile } from "../redux/actions";

const mapDispatchToProps = dispatch => ({
  onUpload: data => dispatch(uploadFile(data))
});

export default connect(
  null,
  mapDispatchToProps
)(Uploader);
