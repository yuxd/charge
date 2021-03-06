/**
 * Created by zhaohang on 2016/8/29.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import { api, callApi } from '../apis/api';
import actionEnum from '../constants/actionEnum';
import mapAction from '../actions/mapAction';

const chargeListActions = {
  setLocationToMap: createAction(actionEnum.SET_LOCATION_TO_MAP),
  setChargeMapList: createAction(actionEnum.SET_CHARGE_MAP_LIST),
  getChargeDesc: (parameter) =>
    dispatch => {
      callApi(
        api.getVisitorData(parameter),
        data => {
          dispatch(chargeListActions.requestChargeListDescSuccess(data));
        },
        err => {
          dispatch(chargeListActions.requestChargeListDescFail(err));
        }
      );
    },
  requestChargeListDescSuccess: (data) =>
    dispatch => {
      dispatch(mapAction.getSingleData({ showOrHide: false, data }));
    },
  requestChargeListDescFail: (err) =>
    dispatch => {
      Toast.show(err, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    },

};

export default chargeListActions;
