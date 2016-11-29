/**
 * Created by liwanchong on 2016/8/2.
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Scene, Modal, ActionConst } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import deepcopy from 'deepcopy';
import store from 'react-native-simple-store';
import ChargeView from './../../containers/android/ChargeView';
import routeReducerCreator from './../../reducers/routeReducerCreator';
import ReduxStore from './../../store/store';
import Login from '../../containers/android/Login';
import Start from '../../containers/android/Start';
import DetailInfo from '../../containers/android/Detail';
import Helper from '../../utils/helper';
import Choose from '../../containers/android/Choose';
import About from './../../containers/android/About';
import HelpView from './../../containers/android/HelpView';
import Main from './../../containers/android/Main';
import Introduction from './../../containers/android/Introduction';
import SearchList from '../../containers/android/SearchList';
import ChargeList from '../../containers/android/ChargeList';
import WeChat from '../../containers/android/WeChat';
import LeftMenu from '../../containers/android/LeftMenu';
import { Global } from '../../Global';
import imageViewPage from '../../containers/android/imageViewPager';
import Regist from './Regist';
import UserAgreement from './UserAgreement';
import FindPassword from './FindPassword';
import Error from './Error';

const styles = StyleSheet.create({
  textInput: {
    color: 'black',
    flex: 1,
    height: 40,
  },
  container: {
    width: 250,
    marginLeft: 60,
    borderWidth: 1,
    borderColor: 'red',
    flexDirection: 'row',
    marginTop: 5,
  },
});
class App extends React.Component {
  componentWillUnmount() {
    Global.appState.boolFirstLaunch = false;
    Global.appState = deepcopy(Global.appState);
    store.save('appState', Global.appState);
  }

  test1() {

  }

  render() {
    return (
      <Provider store={ReduxStore}>
        <Router createReducer={routeReducerCreator}>
          <Scene key="modal" component={Modal}>
            <Scene key="root">
              <Scene key="start" component={Start} title="Start" hideNavBar hideTabBar initial/>
              <Scene key="login" component={Login} hideNavBar/>
              <Scene key="regist" component={Regist} hideNavBar/>
              <Scene key="userAgreement" component={UserAgreement} title="用户协议" hideNavBar={false}/>
              <Scene key="findPassword" component={FindPassword} title="手机找回密码" hideNavBar={false}/>
              <Scene key="introduction" component={Introduction} title="Introduction" hideNavBar/>
              <Scene key="mainModule" direction="horizontal">
                <Scene
                  key="main"
                  component={Main}
                  title="Main"
                  hideNavBar
                />

                <Scene
                  key="detailInfo"
                  component={DetailInfo}
                  title="DetailInfo"
                  hideNavBar
                />
                <Scene
                  key="imageViewPage"
                  component={imageViewPage}
                  title="imageViewPage"
                  hideNavBar
                />
              </Scene>
              <Scene
                key="choose"
                component={Choose}
                hideNavBar
              />
              <Scene
                key="searchList"
                component={SearchList}
                hideNavBar
              />
              <Scene
                key="about"
                component={About}
                hideNavBar
              />
              <Scene
                key="leftMenu"
                component={LeftMenu}
                hideNavBar
              />
              <Scene
                key="helpView"
                component={HelpView}
                title="帮助"
                hideNavBar={false}
              />
              <Scene
                key="weChat"
                component={WeChat}
                hideNavBar
              />
              <Scene
                key="chargeView"
                component={ChargeView}
                hideNavBar
              />
              <Scene
                key="chargeList"
                component={ChargeList}
                hideNavBar
              />
            </Scene>
            <Scene
              key="error"
              component={Error}
            />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
export default App;
