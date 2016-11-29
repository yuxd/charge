/**
 * Created by zhaohang on 2016/8/29.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import { api, callApi } from '../apis/api';
import actionEnum from '../constants/actionEnum';
import SearchActions from '../actions/SearchActions';

const chooseActions = {
  setCustomOwnData: createAction(actionEnum.SET_CUSTOM_OWN_DATA),

  setCustomData: (parameter) =>
    dispatch => {
      callApi(
        api.saveCustomData(parameter),
        data => {
          dispatch(chooseActions.requestCustomDataSuccess(data));
        },
        err => {
          dispatch(chooseActions.requestCustomDataFail(err));
        }
      );
    },
  requestCustomDataSuccess: (data) =>
    dispatch => {
      Actions.mainModule();
    },
  requestCustomDataFail: (err) =>
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
  getCustomOwnData: (parameter) =>
    dispatch => {
      callApi(
        api.customOwnData(parameter),
        data => {
          dispatch(chooseActions.requestCustomOwnDataSuccess(data));
        },
        err => {
          dispatch(chooseActions.requestCustomOwnDataFail(err));
        }
      );
    },
  requestCustomOwnDataSuccess: (data) =>
    dispatch => {
      Actions.choose();
      dispatch(chooseActions.setCustomOwnData(data));
    },
  requestCustomOwnDataFail: (err) =>
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
  setOwnLocation: (parameter) =>
    dispatch => {
      dispatch(SearchActions.setLocationToMap(parameter));
    },
};

export default chooseActions;
