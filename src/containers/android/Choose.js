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
  TouchableOpacity,
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
  textLogin: {
    flex: 1,
    height: 30,
    color: '#1e90ff',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textLoginContainer: {
    borderRadius: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#1e90ff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    marginBottom: 3,
  },
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
  },
  search: {
    color: '#FFFFFF',
    fontSize: 16,
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: '500',
  },
  longButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 23,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: 111,
    borderColor: '#D8D8D8',
    borderWidth: 1,
  },
  longButton1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 23,
    overflow: 'hidden',
    backgroundColor: 'white',
    width: 111,
    borderColor: '#3366FF',
    borderWidth: 1,
  },
  image: {
    width: 83.3,
    height: 56,
  },
  flexContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  brand: {
    paddingBottom: 10,
  },
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  chargeContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  payContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#D8D8D8',
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  chargeText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 10,
    color: '#282828',
  },
  chargeText1: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 10,
    color: '#3366FF',
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 40,
  },
});

class Choose extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      chargeType: [],
      parking: [],
      property: [],
      allPay: [],
      quickPay: [],
      payCard: [],
      toolbar: {
        backgroundColor: '#e9eaed',
        height: 56,
      },
    };
    Helper.bindMethod(this);
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      brands: nextProps.brands,
      chargeType: nextProps.chargeType,
      parking: nextProps.parking,
      property: nextProps.property,
      allPay: nextProps.allPay,
      quickPay: nextProps.quickPay,
      payCard: nextProps.payCard,
    });
  }

  handlePress(name) {
    for (const row of this.state.brands) {
      for (const brand of row) {
        if (brand.name === name) {
          brand.select = true;
        } else {
          brand.select = false;
        }
      }
    }
    this.setState({ brands: this.state.brands });
  }

  handleChargePress(name) {
    for (const type of this.state.chargeType) {
      if (type.name === name) {
        type.select = true;
      } else {
        type.select = false;
      }
    }
    this.setState({ chargeType: this.state.chargeType });
  }

  handleParkingPress(name) {
    for (const park of this.state.parking) {
      if (park.name === name) {
        park.select = true;
      } else {
        park.select = false;
      }
    }
    this.setState({ parking: this.state.parking });
  }

  handlePropertyPress(name) {
    for (const property of this.state.property) {
      if (property.name === name) {
        property.select = true;
      } else {
        property.select = false;
      }
    }
    this.setState({ property: this.state.property });
  }

  handleAllPayPress(name) {
    this.state.allPay[0].select = true;
    for (const row of this.state.quickPay) {
      for (const pay of row) {
        pay.select = false;
      }
    }
    for (const row of this.state.payCard) {
      for (const card of row) {
        card.select = false;
      }
    }
    this.setState({ allPay: this.state.allPay });
    this.setState({ quickPay: this.state.quickPay });
    this.setState({ payCard: this.state.payCard });
  }

  handleQuickPayPress(name) {
    for (const row of this.state.quickPay) {
      for (const pay of row) {
        if (pay.name === name) {
          pay.select = !pay.select;
          this.state.allPay[0].select = false;
        }
      }
    }
    this.setState({ allPay: this.state.allPay });
    this.setState({ quickPay: this.state.quickPay });
  }

  handlePayCardPress(name) {
    for (const row of this.state.payCard) {
      for (const card of row) {
        if (card.name === name) {
          card.select = !card.select;
          this.state.allPay[0].select = false;
        }
      }
    }
    this.setState({ allPay: this.state.allPay });
    this.setState({ payCard: this.state.payCard });
  }

  saveCustom() {
    const brands = this.state.brands;
    const chargeType = this.state.chargeType;
    const parking = this.state.parking;
    const property = this.state.property;
    const allPay = this.state.allPay;
    const quickPay = this.state.quickPay;
    const payCard = this.state.payCard;
    let brandCar;
    let type;
    let pay;
    let kind;
    let paymentType = '';
    for (const row of brands) {
      for (const carName of row) {
        if (carName.select) {
          brandCar = carName.value;
        }
      }
    }
    for (const model of chargeType) {
      if (model.select) {
        type = model.value;
      }
    }
    for (const payType of parking) {
      if (payType.select) {
        pay = payType.value;
      }
    }
    for (const payKind of property) {
      if (payKind.select) {
        kind = payKind.value;
      }
    }
    if (allPay[0].select) {
      paymentType = allPay[0].value;
    } else {
      for (const rowQuick of quickPay) {
        for (const rowQuickPay of rowQuick) {
          if (rowQuickPay.select) {
            if (paymentType) {
              paymentType = `${paymentType}${rowQuickPay.value}|`;
            } else {
              paymentType = `${rowQuickPay.value}|`;
            }
          }
        }
      }
      for (const rowCard of payCard) {
        for (const rowPayCard of rowCard) {
          if (rowPayCard.select) {
            if (paymentType) {
              paymentType = `${paymentType}${rowPayCard.value}|`;
            } else {
              paymentType = `${rowPayCard.value}|`;
            }
          }
        }
      }
    }
    if (paymentType.endsWith('|')) {
      paymentType = paymentType.substring(0, paymentType.length - 1);
    }
    this.props.setCustomData({
      access_token: Global.appState.user.accessToken,
      parameter: {
        parking_fee: pay,
        payment: paymentType,
        plot_kind: kind,
        chain_code: brandCar,
        charging_mode: type,
      },
    });
  }

  allPay(data, index) {
    if (data.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{data.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handleAllPayPress(data.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{data.name}</Text>
        </View>
      </Button>
    );
  }

  property(data, index) {
    if (data.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{data.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handlePropertyPress(data.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{data.name}</Text>
        </View>
      </Button>
    );
  }

  parking(data, index) {
    if (data.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{data.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handleParkingPress(data.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{data.name}</Text>
        </View>
      </Button>
    );
  }

  charge(data, index) {
    if (data.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{data.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handleChargePress(data.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{data.name}</Text>
        </View>
      </Button>
    );
  }

  test(data, index) {
    return (
      <View style={styles.flexContainer} key={index}>
        {data.map(this.renderTask)}
      </View>
    );
  }

  quickPay(data, index) {
    return (
      <View style={styles.flexContainer} key={index}>
        {data.map(this.renderQuickPay)}
      </View>
    );
  }

  payCard(data, index) {
    return (
      <View style={styles.flexContainer} key={index}>
        {data.map(this.renderPayCard)}
      </View>
    );
  }

  renderPayCard(payCard, index) {
    if (payCard.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          onPress={() => { this.handlePayCardPress(payCard.name); }}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{payCard.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handlePayCardPress(payCard.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{payCard.name}</Text>
        </View>
      </Button>
    );
  }

  renderTask(brand, index) {
    const imagesUrl = [
      require('../../image/custom/CarBrand_no.png'),
      require('../../image/custom/tesla_no.png'),
      require('../../image/custom/tengshi_no.png'),
      require('../../image/custom/baoma_no.png'),
      require('../../image/custom/byd_no.png'),
      require('../../image/custom/rongwei_no.png'),
      require('../../image/custom/beiqi_no.png'),
      require('../../image/custom/zhongtai_no.png'),
      require('../../image/custom/byd_special_no.png'),
      require('../../image/custom/jiangling_no.png'),
      require('../../image/custom/jianghuai_no.png'),
      require('../../image/custom/other_no.png'),
    ];
    const imageSelectUrl = [
      require('../../image/custom/CarBrand_yes.png'),
      require('../../image/custom/tesla_yes.png'),
      require('../../image/custom/tengshi_yes.png'),
      require('../../image/custom/baoma_yes.png'),
      require('../../image/custom/byd_yes.png'),
      require('../../image/custom/rongwei_yes.png'),
      require('../../image/custom/beiqi_yes.png'),
      require('../../image/custom/zhongtai_yes.png'),
      require('../../image/custom/byd_special_yes.png'),
      require('../../image/custom/jiangling_yes.png'),
      require('../../image/custom/jianghuai_yes.png'),
      require('../../image/custom/other_yes.png'),
    ];

    if (brand.select) {
      return (
        <View key={index}>
          <Image
            style={styles.image}
            source={imageSelectUrl[brand.id]}
          />
        </View>
      );
    }
    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() => { this.handlePress(brand.name); }}
          activeOpacity={1}
        >
          <Image
            style={styles.image}
            source={imagesUrl[brand.id]}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderQuickPay(quickPay, index) {
    if (quickPay.select) {
      return (
        <Button
          containerStyle={styles.longButton1}
          key={index}
          onPress={() => { this.handleQuickPayPress(quickPay.name); }}
          activeOpacity={1}
        >
          <View>
            <Text style={styles.chargeText1}>{quickPay.name}</Text>
          </View>
        </Button>
      );
    }
    return (
      <Button
        containerStyle={styles.longButton}
        key={index}
        onPress={() => { this.handleQuickPayPress(quickPay.name); }}
        activeOpacity={1}
      >
        <View>
          <Text style={styles.chargeText}>{quickPay.name}</Text>
        </View>
      </Button>
    );
  }

  render() {
    if (this.state.brands.length > 0) {
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
              <Text style={styles.loginTextStyle}>个人定制</Text>
            </View>
            <Text style={styles.search} onPress={() => { Actions.regist(); }}>重置</Text>
          </View>
          <ScrollView >
            <View>
              <View style={styles.container}>
                <Text style={styles.brand}>按车辆品牌</Text>
                <View>
                  {this.state.brands.map(this.test)}
                </View>
              </View>
              <View style={styles.chargeContainer}>
                <Text style={styles.brand}>按快冲慢充</Text>
                <View style={styles.flexContainer}>
                  {this.state.chargeType.map(this.charge)}
                </View>
              </View>
              <View style={styles.chargeContainer}>
                <Text style={styles.brand}>按停车收费（元/小时）</Text>
                <View style={styles.flexContainer}>
                  {this.state.parking.map(this.parking)}
                </View>
              </View>
              <View style={styles.chargeContainer}>
                <Text style={styles.brand}>按属性</Text>
                <View style={styles.flexContainer}>
                  {this.state.property.map(this.property)}
                </View>
              </View>
              <View style={styles.payContainer}>
                <Text style={styles.brand}>按支付方式（可多选）</Text>
                <View style={styles.flexContainer}>
                  {this.state.allPay.map(this.allPay)}
                </View>
                <Text style={styles.brand}>便捷支付</Text>
                <View>
                  {this.state.quickPay.map(this.quickPay)}
                </View>
                <Text style={styles.brand}>充值卡</Text>
                <View>
                  {this.state.payCard.map(this.payCard)}
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <View style={[styles.rowContainer, styles.textLoginContainer]}>
              <Text
                style={styles.textLogin}
                onPress={this.saveCustom}
              >
                保存
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View/>
    );
  }
}

function mapStateToProps(state) {
  return {
    brands: state.chooseReducer.brands,
    chargeType: state.chooseReducer.chargeType,
    parking: state.chooseReducer.parking,
    property: state.chooseReducer.property,
    allPay: state.chooseReducer.allPay,
    quickPay: state.chooseReducer.quickPay,
    payCard: state.chooseReducer.payCard,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ChooseActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Choose);

