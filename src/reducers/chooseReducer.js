/**
 * Created by zhaohang on 2016/8/30.
 */
import { handleActions } from 'redux-actions';
import deepcopy from 'deepcopy';
import mapAction from '../actions/mapAction';
import ChooseActions from '../actions/ChooseActions';


const initialState = {
  brands: [
    [
      {
        name: '全部',
        value: '',
      },
      {
        name: '特斯拉',
        value: '348D',
      },
      {
        name: '腾势',
        value: '3701',
      },
      {
        name: '宝马',
        value: '400F',
      },
    ],
    [
      {
        name: '比亚迪(电动)',
        value: '4041_2',
      },
      {
        name: '荣威',
        value: '4093',
      },
      {
        name: '北汽',
        value: '415D',
      },
      {
        name: '众泰',
        value: '4149',
      },
    ],
    [
      {
        name: '比亚迪(混动)',
        value: '4041_1',
      },
      {
        name: '江铃',
        value: '4049',
      },
      {
        name: '江淮',
        value: '900D',
      },
      {
        name: '其他',
        value: 'FFFF',
      },
    ],
  ],
  chargeType: [
    {
      name: '全部',
      value: 2,
    },
    {
      name: '快冲',
      value: 1,
    },
    {
      name: '慢充',
      value: 0,
    },
  ],
  parking: [
    {
      name: '全部',
      value: 2,
    },
    {
      name: '免费',
      value: 0,
    },
    {
      name: '付费',
      value: 1,
    },
  ],
  property: [
    {
      name: '全部',
      value: 2,
    },
    {
      name: '共用',
      value: 0,
    },
    {
      name: '专用',
      value: 1,
    },
  ],
  allPay: [
    {
      name: '全部',
      value: '',
    },
  ],
  quickPay: [
    [
      {
        name: '免费',
        value: '0',
      },
      {
        name: '现金',
        value: '1',
      },
      {
        name: '微信',
        value: '102',
      },
    ],
    [
      {
        name: '支付宝',
        value: '101',
      },
      {
        name: '星星APP',
        value: '516',
      },
      {
        name: '特来电APP',
        value: '507',
      },
    ],
    [
      {
        name: '聚电桩APP',
        value: '591',
      },
      {
        name: '电桩APP',
        value: '517',
      },
      {
        name: '绿狗APP',
        value: '514',
      },
    ],
    [
      {
        name: '依威能源APP',
        value: '518',
      },
      {
        name: 'E APP',
        value: '592',
      },
      {
        name: '其他APP',
        value: '500',
      },
    ],
  ],
  payCard: [
    [
      {
        name: '国网普通卡',
        value: '401',
      },
      {
        name: 'SGCC HW. card',
        value: '490',
      },
      {
        name: '中国普天充值卡',
        value: '406',
      },
    ],
    [
      {
        name: '小易充值卡',
        value: '491',
      },
      {
        name: '易冲卡',
        value: '492',
      },
      {
        name: '其他充值卡',
        value: '400',
      },
    ],
  ],
};
const chooseReducer = handleActions({
  [ChooseActions.setCustomOwnData]: (state, action) => {
    const newState = deepcopy(state);
    const customOwnData = action.payload;
    for (const row of newState.brands) {
      for (const carName of row) {
        if (carName.value === customOwnData.chain_code) {
          carName.select = true;
        } else {
          carName.select = false;
        }
      }
    }
    for (const model of newState.chargeType) {
      if (model.value === customOwnData.charging_mode) {
        model.select = true;
      } else {
        model.select = false;
      }
    }
    for (const payType of newState.parking) {
      if (payType.value === customOwnData.parking_fee) {
        payType.select = true;
      } else {
        payType.select = false;
      }
    }
    for (const payKind of newState.property) {
      if (payKind.value === customOwnData.plot_kind) {
        payKind.select = true;
      } else {
        payKind.select = false;
      }
    }
    if (customOwnData.payment === '') {
      newState.allPay[0].select = true;
      for (const rowQuick of newState.quickPay) {
        for (const rowQuickPay of rowQuick) {
          rowQuickPay.select = false;
        }
      }
      for (const rowCard of newState.payCard) {
        for (const rowPayCard of rowCard) {
          rowPayCard.select = false;
        }
      }
    } else {
      newState.allPay[0].select = false;
      let arr = [];
      arr = customOwnData.payment.split('|');
      for (const rowQuick1 of newState.quickPay) {
        for (const rowQuickPay1 of rowQuick1) {
          for (const arrNum of arr) {
            if (arrNum === rowQuickPay1.value) {
              rowQuickPay1.select = true;
              break;
            } else {
              rowQuickPay1.select = false;
            }
          }
        }
      }
      for (const rowCard1 of newState.payCard) {
        for (const rowPayCard1 of rowCard1) {
          for (const arrNum1 of arr) {
            if (arrNum1 === rowPayCard1.value) {
              rowPayCard1.select = true;
              break;
            } else {
              rowPayCard1.select = false;
            }
          }
        }
      }
    }
    return newState;
  },
}, initialState);
export default chooseReducer;
