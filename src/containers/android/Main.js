/**
 * Created by zhongxiaoming on 2016/8/5.
 */
import React, { Component } from 'react';
import {
  View,
  Linking,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  DrawerLayoutAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Toast from 'react-native-root-toast';
import DeviceInfo from 'react-native-device-info';
import Map from './MapContainer';
import ShellsDetail from './ShellsDetail';
import ChooseActions from '../../actions/ChooseActions';
import { Global } from '../../Global';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B3745',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#4EC3EE',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },

  map: {
    flex: 1,
  },

  textInputView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,

  },
  textInput: {
    fontSize: 16,
    marginTop: -10,
    color: '#e5e5e5',
  },
  logintext: {
    color: '#FFFFFF',
    fontSize: 16,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  search: {
    color: '#FFFFFF',
    alignItems: 'center',
    fontSize: 16,
    paddingLeft: 5,
    paddingRight: 5,
  },
  image: {
    width: 50,
    height: 50,
  },
});

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animationType: 'none',
      modalVisible: false,
      transparent: false,
      listMapFlag: false,
      lat: 0.0,
      lng: 0.0,
    };

    this.openDrawer = this.openDrawer.bind(this);
    this.search = this.search.bind(this);
    this.imagePress = this.imagePress.bind(this);
    this.myLocation = this.myLocation.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setState({
          lat,
          lng,
        });
        this.props.actions.setOwnLocation({
          lat,
          lng,
        });
      },
      error => {
        Toast.show(`获取当前位置失败,原因:${error}`, {
          duration: Toast.durations.LONG, // toast显示时长
          position: Toast.positions.CENTER, // toast位置
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0, // toast显示的延时
        });
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listMapFlag: nextProps.listMapFlag,
    });
  }

  openDrawer() {
    Actions.leftMenu();
  }

  search() {
    Actions.searchList();
  }

  myLocation() {
    this.props.actions.setOwnLocation({
      lat: this.state.lat,
      lng: this.state.lng,
    });
  }

  imagePress() {
    if (Global.appState.user) {
      this.props.actions.getCustomOwnData({
        access_token: Helper.getToken(),
      });
    } else {
      Toast.show('请先登录！', {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    }
  }

  mapToList() {
    Actions.chargeList();
  }

  button() {
    if (!this.state.listMapFlag) {
      return (
        <Button style={styles.search} onPress={this.search}>搜索</Button>
      );
    }
    return (
      <Button style={styles.search} onPress={this.mapToList}>列表</Button>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button style={styles.logintext} onPress={this.openDrawer}>登录</Button>
          <View style={styles.textInputView}>
            <TextInput
              placeholder="搜索地点"
              placeholderTextColor="#E0E0E0"
              style={styles.textInput}
              underlineColorAndroid="transparent"
              keyboardType="default"
              onFocus={this.search}
            />
          </View>
          {this.button()}
        </View>
        <View style={styles.map}>
          <Map/>
          <ShellsDetail/>
          <View style={{ flex: 1, top: 60, position: 'absolute', right: 10 }}>
            <TouchableHighlight
              style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}
              onPress={this.imagePress}
            >
              <Image
                source={require('../../image/funnel.png')}
              />
            </TouchableHighlight>
          </View>
          <View style={{ flex: 1, bottom: 60, position: 'absolute', left: 10 }}>
            <TouchableHighlight
              style={{ width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }}
              onPress={this.myLocation}
            >
              <Image
                source={require('../../image/icon-myLocation.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    listMapFlag: state.mapReducer.listMapFlag,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ChooseActions, dispatch),
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Main);
