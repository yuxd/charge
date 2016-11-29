/**
 * Created by zhaohang on 2016/8/29.
 */
import { handleActions } from 'redux-actions';
import mapAction from '../actions/mapAction';
import chargeListActions from '../actions/chargeListActions';
import SearchActions from '../actions/SearchActions';

const initialState = {
  mapListData: [],
  total: 0,
};
const chargeListReducer = handleActions({
  [SearchActions.setChargeMapList]: (state, action) => {
    const newState = Object.assign({}, state);
    const oriData = newState.mapListData;
    newState.mapListData = oriData.concat(action.payload.data);
    newState.total = action.payload.total;
    return newState;
  },
}, initialState);
export default chargeListReducer;
