import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTestiItem } from '../actions/TestiItem.actions';
import TestiItem from '../components/TestiItem.component';

const mapStateToProps = (state) => ({
  exercises: state.getIn(['exercises', 'entries']),
});

const mapDispatchToProps = (dispatch) => ({
  addTestiItem(TestiItem) {
    dispatch(addTestiItem(TestiItem))
  },
});

export default connect(null, mapDispatchToProps)(TestiItem);
