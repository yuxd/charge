/**
 * Created by liwanchong on 2016/8/2.
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
<<<<<<< HEAD

//import Map from './MapContainer';
import { Router, Scene, Modal,ActionConst } from 'react-native-router-flux';

import Choose from './../../containers/android/Choose';
import Main from './../../containers/android/Main';
import About from './../../containers/android/About';
import routeReducerCreator from './../../reducers/routeReducerCreator';
// import helper from './../../utils/helper'
 import store from './../../store/store';
// import ArticleInfo from './../../containers/android/MessInfo'
import DetailInfo from '../../containers/android/Detail'

import shellsDetail from '../../containers/android/shellsDetail'

import imageViewPage from '../../containers/android/imageViewPager'

class App extends React.Component {
    constructor(props) {
        super(props);
        //helper.bindMethod(this);
    }
    render() {
        return (
            <Provider store={store}>
                <Router createReducer={routeReducerCreator}>
                    <Scene key="modal" component={Modal}>
                        <Scene key="root" hideNavBar hideTabBar>
                            <Scene key="mainModule"  direction="horizontal" initial={true}>
                                <Scene key="main" component={Main} title="main"
                                       hideNavBar/>
                                <Scene key="shellsDetail" component={shellsDetail} title="shellsDetail"
                                hideNavBar/>
                                <Scene key="DetailInfo" component={DetailInfo} title="DetailInfo"
                                       hideNavBar/>

                                <Scene key="imageViewPage" component={imageViewPage} title="imageViewPage"
                                       hideNavBar/>
                            </Scene>
                            <Scene direction="horizontal" key="About" component={About} schema="modal" title="About"
                                   hideNavBar/>


                        </Scene>
                        <Scene key="error" component={Error}/>
                    </Scene>
                </Router>
            </Provider>
        );
    }
=======
import { Router, Scene, Modal } from 'react-native-router-flux';
import map from './../../components/android/map';
import routeReducerCreator from './../../reducers/routeReducerCreator';
import Store from './../../store/store';
import Login from '../../containers/android/Login';
import Start from '../../containers/android/Start';
import DetailInfo from '../../containers/android/Detail';
import shellsDetail from '../../containers/android/shellsDetail';
import Choose from '../../containers/android/Choose';
import About from './../../containers/android/About';

class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <Router createReducer={routeReducerCreator}>
          <Scene key="modal" component={Modal}>
            <Scene key="root" hideNavBar hideTabBar>
              <Scene key="start" component={Start} title="Start" hideNavBar hideTabBar initial />
              <Scene key="login" component={Login} title="Login" hideNavBar />
              <Scene key="mainModule" direction="vertical">
                <Scene key="map" component={map} title="Map" hideNavBar />
                <Scene
                  key="shellsDetail"
                  component={shellsDetail}
                  title="shellsDetail"
                  hideNavBar
                />
                <Scene
                  key="DetailInfo"
                  component={DetailInfo}
                  title="DetailInfo"
                  hideNavBar
                />
                <Scene key="Choose" component={Choose} title="Choose" hideNavBar />
              </Scene>
              <Scene
                direction="horizontal"
                key="About" component={About}
                schema="modal"
                title="About"
                hideNavBar
              />
            </Scene>
            <Scene key="error" component={Error} />
          </Scene>
        </Router>
      </Provider>
    );
  }
>>>>>>> charge/master
}

export default App;
