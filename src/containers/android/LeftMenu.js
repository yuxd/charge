/**
 * Created by zhongxiaoming on 2016/8/5.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import * as WeChat from 'react-native-wechat';
import Toast from 'react-native-root-toast';
import UserInfo from './UserInfo';
import { Global } from '../../Global';
import Helper from '../../utils/helper';
import UserManagementActions from '../../actions/UserManagementActions';

const styles = StyleSheet.create({
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 0.28,
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
  container: {
    flex: 1,
  },
  contentitem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentitem1: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  splitters: {
    height: 10,
    backgroundColor: '#E8E4E4',
  },
  text: {
    fontSize: 18,
    marginLeft: 10,
  },
  modalHeight: {
    height: 185,
    borderRadius: 5,
  },
  modelTop: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E4E4',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modelBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  modelImg: {
    width: 60,
    height: 60,
  },
});

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationType: 'none',
      modalVisible: false,
      transparent: false,
      isOpen: false,
    };
    WeChat.registerApp('wxaf493f65796ba592');
    Helper.bindMethod(this);
  }

  onLogOut() {
    this.props.actions.updateUser(null);
  }

  getChargeView() {
    Actions.chargeView();
  }

  about() {
    Actions.about();
  }

  share() {
    this.setState({
      isOpen: true,
    });
  }
  closeModel() {
    this.setState({
      isOpen: false,
    });
  }
  weChatFriend() {
    WeChat.isWXAppInstalled().then(supported => {
      if (supported) {
        WeChat.shareToSession({
          title: '新能源车主必备神器',
          description: '还在为爱车充电发愁么，用桩家自己做充电专家',
          thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
          type: 'news',
          webpageUrl: 'http://www.lcode.org',
        });
      } else {
        Toast.show('没有安装微信软件，请您安装微信之后再试', {
          duration: Toast.durations.LONG, // toast显示时长
          position: Toast.positions.CENTER, // toast位置
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0, // toast显示的延时
        });
      }
    }).catch(err => {
      Toast.show(`出错了：${err}`, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    });
  }

  weChatZone() {
    WeChat.isWXAppInstalled().then(supported => {
      if (supported) {
        WeChat.shareToTimeline({
          title: '新能源车主必备神器',
          description: '还在为爱车充电发愁么，用桩家自己做充电专家',
          thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
          type: 'news',
          webpageUrl: 'http://www.lcode.org',
        });
      } else {
        Toast.show('没有安装微信软件，请您安装微信之后再试', {
          duration: Toast.durations.LONG, // toast显示时长
          position: Toast.positions.CENTER, // toast位置
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0, // toast显示的延时
        });
      }
    }).catch(err => {
      Toast.show(`出错了：${err}`, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    });
  }

  copyUrl() {
    Clipboard.setString('Hello World');
    try {
      Toast.show('复制成功', {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    } catch (e) {
      Toast.show(`出错了：${e.message}`, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={[styles.search, { marginLeft: 10 }]}
            onPress={() => { Actions.pop(); }}
          >
            返回
          </Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.loginTextStyle}>我是桩家</Text>
          </View>
        </View>
        <View style={styles.contentitem}>
          <UserInfo/>
        </View>
        <View style={styles.splitters}/>
        <TouchableOpacity onPress={this.getChargeView} activeOpacity={1}>
          <View style={styles.contentitem1}>
            <Image source={require('../../image/global_days.png')}/>
            <Text style={styles.text}>桩家视界</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.splitters}/>
        <View style={[styles.contentitem1, { borderBottomWidth: 1, borderBottomColor: '#E8E4E4' }]}>
          <Image source={require('../../image/ic_menu_mark.png')}/>
          <Text style={styles.text}>去评分</Text>
        </View>
        <TouchableOpacity onPress={this.share} activeOpacity={1}>
          <View
            style={[styles.contentitem1,
            { borderBottomWidth: 1,
            borderBottomColor: '#E8E4E4' }]}
          >
            <Image source={require('../../image/ic_menu_update.png')}/>
            <Text style={styles.text}>分享桩家</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.about} activeOpacity={1}>
          <View style={styles.contentitem1}>
            <Image source={require('../../image/ic_menu_about.png')}/>
            <Text style={styles.text}>关于桩家</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.splitters}/>
        <TouchableOpacity onPress={this.onLogOut} activeOpacity={1}>
          <View style={styles.contentitem1}>
            <Image source={require('../../image/exit.png')}/>
            <Text style={styles.text}>退出登录</Text>
          </View>
        </TouchableOpacity>
        <Modal
          style={styles.modalHeight}
          position={"bottom"}
          isOpen={this.state.isOpen}
        >
          <View style={styles.modelTop}>
            <Text>分享到</Text>
          </View>
          <View
            style={{ flexDirection: 'row',
            paddingTop: 10,
            paddingBottom: 10,
            borderBottomWidth: 5,
            borderBottomColor: '#E8E4E4' }}
          >
            <TouchableOpacity onPress={this.weChatFriend} activeOpacity={1}>
              <View style={{ alignItems: 'center', paddingLeft: 20 }}>
                <Image style={styles.modelImg} source={require('../../image/sns_icon_1.png')}/>
                <Text style={{ fontSize: 12 }}>微信好友</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.weChatZone} activeOpacity={1}>
              <View style={{ alignItems: 'center', paddingLeft: 20 }}>
                <Image style={styles.modelImg} source={require('../../image/sns_icon_2.png')}/>
                <Text style={{ fontSize: 12 }}>朋友圈</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.copyUrl} activeOpacity={1}>
              <View style={{ alignItems: 'center', paddingLeft: 20 }}>
                <Image style={styles.modelImg} source={require('../../image/sns_icon_3.png')}/>
                <Text style={{ fontSize: 12 }}>复制链接</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.closeModel} activeOpacity={1}>
            <View style={styles.modelBottom}>
              <Text style={{ color: 'black' }}>取消</Text>
            </View>
          </TouchableOpacity>
        </Modal>
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
)(LeftMenu);
