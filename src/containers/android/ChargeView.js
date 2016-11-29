/**
 * Created by zhaohang on 2016/8/24.
 */
import React, { Component } from 'react';
import {
  View,
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
  Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';
import Toast from 'react-native-root-toast';
import { Actions } from 'react-native-router-flux';
import Helper from '../../utils/helper';

const styles = StyleSheet.create({
  wrapper: {},
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: 'white',
    backgroundColor: '#4CC4F6',
  },
  search: {
    color: '#FFFFFF',
    fontSize: 16,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '500',
  },
  loginTextStyle: {
    color: '#FFFFFF',
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '500',
    marginRight: 50,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  image: {
    width: undefined,
    resizeMode: 'stretch',
  },
  image1: {
    width: undefined,
    height: 180,
    resizeMode: 'stretch',
  },
  image1View: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

class ChargeView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPressButton = this.onPressButton.bind(this);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({});
  }

  onPressButton(url) {
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        Toast.show(`Can not handle url:${url}`, {
          duration: Toast.durations.LONG, // toast显示时长
          position: Toast.positions.CENTER, // toast位置
          shadow: true, // toast是否出现阴影
          animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
          hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
          delay: 0, // toast显示的延时
        });
      }
      Linking.openURL(url);
    }).catch(err => {
      Toast.show(`An error occurred${err}`, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
      });
    });
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
            <Text style={styles.loginTextStyle}>桩家视界</Text>
          </View>
        </View>
        <ScrollView>
          <View>
            <Swiper
              style={styles.wrapper}
              height={230}
              paginationStyle={{ bottom: 10, right: 60 }}
              loop
              autoplay
            >
              <View style={styles.slide}>
                <Image
                  style={styles.image}
                  source={require('../../image/campaign/campaign_banner2.png')}
                >
                  <Text
                    style={{ height: 240 }}
                    onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}
                  />
                </Image>
              </View>
              <View style={styles.slide}>
                <Image
                  style={styles.image}
                  source={require('../../image/campaign/campaign_banner1.png')}
                >
                  <Text
                    style={{ height: 240 }}
                    onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}
                  />
                </Image>
              </View>
            </Swiper>
            <View style={styles.image1View}>
              <TouchableHighlight onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}>
                <Image
                  style={styles.image1}
                  source={require('../../image/campaign/campaign1.png')}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.image1View}>
              <TouchableHighlight onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}>
                <Image
                  style={styles.image1}
                  source={require('../../image/campaign/campaign2.png')}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.image1View}>
              <TouchableHighlight onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}>
                <Image
                  style={styles.image1}
                  source={require('../../image/campaign/campaign3.png')}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.image1View}>
              <TouchableHighlight onPress={() => { this.onPressButton('http://sina.cn/?from=wap'); }}>
                <Image
                  style={styles.image1}
                  source={require('../../image/campaign/campaign4.png')}
                />
              </TouchableHighlight>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChargeView);
