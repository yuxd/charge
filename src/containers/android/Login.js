import React, { Component } from 'react';
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as WeChat from 'react-native-wechat';
import Button from 'react-native-button';
import UserManagementActions from '../../actions/UserManagementActions';
import Helper from '../../utils/helper';
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

  textInputView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
  },
  loginTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '500',
  },
  logintext: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  search: {
    color: '#FFFFFF',
    fontSize: 16,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '500',
  },
  rootContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
  rightRowContainer: {
    justifyContent: 'flex-end',
  },
  smallImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallImage: {
    width: 20,
    height: 20,
  },
  lineContainer: {
    backgroundColor: '#DCDCDC',
    height: 1,
  },
  textInput: {
    flex: 9,
    height: 35,
    color: '#000000',
    margin: 0,
    padding: 0,
  },
  forgetPassword: {
    height: 30,
    color: '#808080',
    textAlignVertical: 'center',
  },
  textLoginContainer: {
    backgroundColor: '#1e90ff',
    borderRadius: 2,
    height: 40,
  },
  textLogin: {
    flex: 1,
    height: 30,
    color: '#ffffff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textWeiXinLoginContainer: {
    borderColor: '#808080',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 2,
    height: 40,
    marginTop: 10,
  },
  textWeiXinLogin: {
    flex: 1,
    height: 30,
    color: '#1e90ff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };

    Helper.bindMethod(this);
  }

  onLogin() {
    const parameter = {
      name: this.state.userName,
      password: this.state.password,
      clientId: 2,
    };

    this.props.actions.loginRequest(parameter);
  }

  onWeiXinLogin() {
  }

  changeState(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.header}>
          <Text
            style={[styles.search, { marginLeft: 10 }]}
            onPress={() => { Actions.pop(); }}
          >
            返回
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.loginTextStyle}>登录</Text>
          </View>
          <Text style={styles.search} onPress={() => { Actions.regist(); }}>注册</Text>
        </View>
        <View>
          <Image
            source={require('../../image/bg_about.png')}
            style={{ width: undefined, height: 320, justifyContent: 'flex-end' }}
          >
            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
              <View style={styles.rowContainer}>
                <View style={styles.smallImageContainer}>
                  <Image
                    source={require('../../image/login_icon_phonenumber.png')}
                    style={styles.smallImage}
                  />
                </View>
                <TextInput
                  placeholder="请输入手机号"
                  placeholderTextColor="#808080"
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                  keyboardType="default"
                  value={this.state.userName}
                  onChangeText={text => { this.changeState('userName', text); }}
                />
              </View>
              <View style={styles.lineContainer}/>
              <View style={styles.rowContainer}>
                <View style={styles.smallImageContainer}>
                  <Image
                    source={require('../../image/login_icon_password.png')}
                    style={styles.smallImage}
                  />
                </View>
                <TextInput
                  ref={c => { this.passwordInput = c; }}
                  placeholder="请输入密码"
                  placeholderTextColor="#808080"
                  style={styles.textInput}
                  secureTextEntry
                  underlineColorAndroid="transparent"
                  keyboardType="default"
                  value={this.state.password}
                  onChangeText={text => { this.changeState('password', text); }}
                />
              </View>
              <View style={styles.lineContainer}/>
              <View style={[styles.rowContainer, styles.rightRowContainer]}>
                <Text
                  style={styles.forgetPassword}
                  onPress={() => { Actions.findPassword(); }}
                >
                  忘记密码?
                </Text>
              </View>
            </View>
          </Image>
        </View>
        <View style={{ paddingLeft: 15, paddingRight: 15 }}>
          <View style={[styles.rowContainer, styles.textLoginContainer]}>
            <Text
              style={styles.textLogin}
              onPress={this.onLogin}
            >
              登录
            </Text>
          </View>
          <View style={[styles.rowContainer, styles.textWeiXinLoginContainer]}>
            <Text
              style={styles.textWeiXinLogin}
              onPress={this.onWeiXinLogin}
            >
              微信登录
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserManagementActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
