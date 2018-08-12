import { connect } from "react-redux";
import Search from "../components/Search";
import { updateFilter } from "../redux/actions";

const mapDispatchToProps = dispatch => ({
  onSearch: input => dispatch(updateFilter(input))
});

export default connect(
  null,
  mapDispatchToProps
)(Search);
