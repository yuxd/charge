/**
 * Created by zhongxiaoming on 2016/8/5.
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Navigator,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  DrawerLayoutAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import store from 'react-native-simple-store';
import searchActions from '../../actions/SearchActions';
import Helper from '../../utils/helper';
import { Global } from '../../Global';

const styles = StyleSheet.create({
  row: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  thumb: {
    width: 26,
    height: 26,
  },
  title: {
    color: 'black',
    flex: 1,
  },
  container1: {
    height: 50,
    flex: 1,
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#4EC3EE',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
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
    fontSize: 16,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

class SearchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      history: Global.appState.searchHistory || { list: [] },
      searchListData: [],
    };
    Helper.bindMethod(this);
  }

  componentDidMount() {
    if (!Global.appState.searchHistory) {
      Global.appState.searchHistory = {
        list: [],
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchListData: nextProps.searchListData,
    });
  }

  changeState(key, value) {
    this.props.getChargeList({
      access_token: Helper.getToken(),
      parameter: {
        radius: 5000,
        name: value,
        region: '北京',
      },
    });
    this.setState({ [key]: value });
  }

  back() {
    Actions.pop();
  }

  search() {
    if (Global.appState.searchHistory) {
      Global.appState.searchHistory.list.push(this.state.searchText);
    }
    this.setState({ history: Global.appState.searchHistory });
    this.props.getKeyListOfCharge({
      access_token: Helper.getToken(),
      parameter: {
        radius: 5000,
        name: this.state.searchText,
        region: '北京',
        latitude: 40.008456800067,
        longitude: 116.47474416608,
      },
    });
    Actions.pop();
  }

  pressData(data) {
    Actions.pop();
    this.props.getListOfCharge(data.location, {
      access_token: Helper.getToken(),
      parameter: {
        radius: 5000,
        name: data.name,
        region: '北京',
        latitude: data.location.lat,
        longitude: data.location.lng,
        originLat: 40.008456800067,
        originLng: 116.47474416608,
      },
    });
  }

  list(data, index) {
    return (
      <TouchableHighlight onPress={() => this.pressData(data)} key={index}>
        <View style={styles.row}>
          <View style={{ justifyContent: 'center' }}>
            <Image style={styles.thumb} source={require('../../image/position.png')}/>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ paddingLeft: 10, paddingTop: 5 }}>
              <Text style={styles.title} numberOfLines={1}>
                {data.name}
              </Text>
            </View>
            <View style={{ paddingLeft: 10, paddingTop: 5, paddingBottom: 3 }}>
              <Text>
                {data.address}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', paddingRight: 10, paddingLeft: 10 }}>
            <Text>
              {data.num}个结果
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Button style={styles.logintext} onPress={this.back}>返回</Button>
          <View style={styles.textInputView}>
            <TextInput
              value={this.state.searchText}
              onChangeText={text => {
                this.changeState('searchText', text);
              }}
              placeholder="搜索地点"
              placeholderTextColor="#E0E0E0"
              onSubmitEditing={this.search}
              style={styles.textInput}
              underlineColorAndroid="transparent"
              keyboardType="default"
              autoFocus
            />
          </View>
          <Button style={styles.search} onPress={this.back}>取消</Button>
        </View>
        <ScrollView>
          <View style={{ paddingLeft: 10 }}>
            {this.state.searchListData.map(this.list)}
          </View>
        </ScrollView>
        <View>
          {
            this.state.history.list.map((text, i) =>
              (<View style={{ flexDirection: 'row' }} key={i}>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require('../../image/history.png')}
                  />
                </View>
                <View style={{ flex: 8 }}>
                  <Text key={text + i} style={{ color: '#000000' }}>{text}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Image
                    source={require('../../image/arrow.png')}
                  />
                </View>
              </View>)
            )
          }
        </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    searchText: '',
    searchListData: state.searchListReducer.searchListData,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(searchActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchList);
