import { connect } from "react-redux";
import Error from "../components/Error";
import { dismissError } from "../redux/actions";

const mapStateToProps = state => ({
  message: state.error
});

const mapDispatchToProps = dispatch => ({
  dismiss: id => dispatch(dismissError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Error);
