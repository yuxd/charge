/**
 * Created by wangtun on 2016/7/21.
 */
import { createAction } from 'redux-actions';
import { Actions } from 'react-native-router-flux';
import deepcopy from 'deepcopy';
import store from 'react-native-simple-store';
import DeviceInfo from 'react-native-device-info';
import { Global, appStateDefault } from '../Global';
import UserManagementActions from './UserManagementActions';

const StartActions = {
  loadUser: (parameter) =>
    dispatch => {
      store.get('appState')
        .then(res => {
          Global.appState = res;
          if (!Global.appState) {
            Global.appState = deepcopy(appStateDefault);
          }
          if (!Global.appState.user) {
            dispatch(UserManagementActions.getVisitorToken({
              code: DeviceInfo.getUniqueID(),
            }));
          }
          dispatch(UserManagementActions.setUser(Global.appState.user));
          if (Global.appState.boolFirstLaunch) {
            Actions.introduction();
          } else {
            Actions.mainModule();
          }
        });
    },
};

export default StartActions;
