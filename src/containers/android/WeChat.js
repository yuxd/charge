/**
 * Created by zhaohang on 2016/8/8.
 */
import React, { Component } from 'react';
import { View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ListView,
  TouchableHighlight,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  ToolbarAndroid,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Helper from '../../utils/helper';
import ChooseActions from '../../actions/ChooseActions';
import { Global } from '../../Global';

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.3,
    borderBottomColor: 'white',
    backgroundColor: '#4CC4F6',
  },
  loginTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '500',
    marginRight: 50,
  },
  search: {
    color: '#FFFFFF',
    fontSize: 16,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '500',
  },
  bgcontainer: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bg: {
    width: 170,
    height: 170,

  },
});

class Choose extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Helper.bindMethod(this);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text
            style={[styles.search, { marginLeft: 10 }]}
            onPress={() => { Actions.pop(); }}
          >
            返回
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.loginTextStyle}>WeChat</Text>
          </View>
        </View>
        <View style={styles.bgcontainer}>
          <Image
            style={styles.bg}
            source={require('../../image/wechat.png')}
          />
          <View style={{ paddingTop: 10, paddingBottom: 10 }}>
            <Text style={{ fontWeight: '500' }}>扫码当「 桩 」家</Text>
          </View>
          <Text style={{ fontSize: 12 }}>微信公众账号：zhuanghome2015</Text>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({});
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Choose);

