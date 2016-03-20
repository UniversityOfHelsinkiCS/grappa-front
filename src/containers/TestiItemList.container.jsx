import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTestiItems } from '../actions/TestiItem.actions';
import TestiItemList from '../components/TestiItemList.component';
/*
const mapStateToProps = (state) => ({
  exercises: state.getIn(['exercises', 'entries']),
});

const mapDispatchToProps = (dispatch) => ({
  getTestiItems() {
    dispatch(getTestiItems())
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TestiItemList);
*/
export default connect()(TestiItemList);
