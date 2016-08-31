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
import Map from './MapContainer';
import LeftMenu from './LeftMenu';
import ShellsDetail from './ShellsDetail';
import ChooseActions from '../../actions/ChooseActions';
import { Global } from '../../Global';

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
    };

    this.openDrawer = this.openDrawer.bind(this);
    this.imagePress = this.imagePress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      listMapFlag: nextProps.listMapFlag,
    });
  }

  openDrawer() {
    this.drawer.openDrawer();
  }

  search() {
    Actions.searchList();
  }

  imagePress() {
    this.props.actions.getCustomOwnData({
      access_token: Global.appState.user.accessToken,
    });
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
    const navigationView = (
      <LeftMenu/>
    );

    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={(drawer) => { this.drawer = drawer; }}
        renderNavigationView={() => navigationView}
      >
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
          </View>
        </View>
      </DrawerLayoutAndroid>
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
