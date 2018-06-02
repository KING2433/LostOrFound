var start_clientX;
var end_clientX;
const app = getApp()
const util = require("../../utils/util.js")
var Bmob = require("../../utils/bmob.js");
const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;

var that;
Page({
  data: {
    windowWidth: wx.getSystemInfoSync().windowWidth,
    ui: {
      windowWidth: 0,
      menuWidth: 0,
      offsetLeft: 0,
      tStart: true
    },
  },
  onLoad() {
    
    this.setData({
      realName: getApp().globalData.realName,
      Class: getApp().globalData.Class,
      College: getApp().globalData.College,
      mobilePhoneNumber: getApp().globalData.mobilePhoneNumber,
      path:'/image/empty.jpg'
    })
    console.log(getApp().globalData.realName);

    var self = this;
    //this.getAll();
    //this.fetchTopThreePosts(); //获取轮播图的3篇文章
    this.setData({
      userInfo: getApp().globalData.userInfo
    });

    console.log(getApp().globalData.userInfo);

    var Things = Bmob.Object.extend("Things");
    var thing = new Bmob.Query(Things);
    that = this;
    thing.equalTo('State',false);
    thing.find({
      success: function (results) {
        results.reverse();
        that.setData({
          Things: results
        });
        console.log(results);
        // that.data.Things=results;
      },
      error: function (error) {
        console.log("failed");
      }
    })
    try {
      let res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
      this.data.ui.offsetLeft = 0;
      this.data.ui.windowWidth = res.windowWidth;
      this.setData({ ui: this.data.ui })
    } catch (e) {
    }
  },

  onShow: function (e) {

    // console.log(this.data.realName);
    this.setData({
      realName: getApp().globalData.realName,
      Class: getApp().globalData.Class,
      College: getApp().globalData.College,
      mobilePhoneNumber: getApp().globalData.mobilePhoneNumber

    })
    var self = this;
    //this.getAll();
    //this.fetchTopThreePosts(); //获取轮播图的3篇文章
    this.setData({
      userInfo: getApp().globalData.userInfo
    });

    var Things = Bmob.Object.extend("Things");
    var thing = new Bmob.Query(Things);
    that = this;
    thing.equalTo('State',false);
    thing.find({
      success: function (results) {
        // console.log("success");
        // console.log("we find " + results.length);
        results.reverse();
        that.setData({
          Things: results
        });
        console.log(results);
        // that.data.Things=results;
      },
      error: function (error) {
        console.log("failed");
      }
    })
  },


  toDetail: function (event) {
    var t = event.currentTarget.id;
    console.log("eventid" + t);
    console.log("thingid:"+this.data.Things[0].createdAt);
    for (var i = 0; i < this.data.Things.length; i++) {
      var x = this.data.Things[i].createdAt.toString();
      if (x == t) {
        getApp().data.detail = this.data.Things[i];
        break;
      }
    }
    getApp().globalData.premission=false;
    wx.navigateTo({
      url: '../index-detail/index-detail',
    })
  },
  toMy: function () {
    wx.navigateTo({
      url: '../my/my',
    })
  },
  //首页切换图片
  onSwiperChange: function (event) {
    curIndex = event.detail.current
    this.changeCurIndex()
  },
  changeCurIndex: function () {
    this.setData({
      curIndex: curIndex
    })
  },
  onHide: function () {
    this.setData({
      // autoplay: false
    })
  },

  //数据存储
  onSetData: function (data) {
  },
  //--------------------------------------------------------------------------------------------------------
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.tapStartTime = e.timeStamp;
    this.startX = clientX;
    this.data.ui.tStart = true;
    this.setData({ ui: this.data.ui })

  },
  handlerMove(e) {
    let { clientX } = e.touches[0];
    let { ui } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    ui.offsetLeft -= offsetX;
    if (ui.offsetLeft <= 0) {
      ui.offsetLeft = 0;
    } else if (ui.offsetLeft >= ui.menuWidth) {
      ui.offsetLeft = ui.menuWidth;
    }
    this.setData({ ui: ui })

  },
  handlerCancel(e) {
    // console.log(e);
  },
  handlerEnd(e) {
    this.data.ui.tStart = false;
    this.setData({ ui: this.data.ui })
    let { ui } = this.data;
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    //快速滑动
    if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
      //向左
      if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
        ui.offsetLeft = 0;
      } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        if (ui.offsetLeft >= ui.menuWidth / 2) {
          ui.offsetLeft = ui.menuWidth;
        } else {
          ui.offsetLeft = 0;
        }
      }
    } else {
      if (ui.offsetLeft >= ui.menuWidth / 2) {
        ui.offsetLeft = ui.menuWidth;
      } else {
        ui.offsetLeft = 0;
      }
    }
    this.setData({ ui: ui })

  },
  toModifyDiary: function (event) {
    var nowTime = event.target.dataset.Time;
    var nowCategory = event.target.dataset.Category;
    var nowId = event.target.dataset.id;
    that.setData({
      modifyDiarys: true,
      nowTime: nowTime,
      nowCategory: nowCategory,
      nowId: nowId
    })
  },
  modifyDiary: function (e) {
    var t = this;
    modify(t, e)
  },

  // 侧滑栏函数
  // 滑动开始
  touchstart: function (e) {
    start_clientX = e.changedTouches[0].clientX
  },
  // 滑动结束
  touchend: function (e) {
    end_clientX = e.changedTouches[0].clientX;
    if (end_clientX - start_clientX > 120) {
      this.setData({
        display: "block",

        translate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);',

      })
    } else if (start_clientX - end_clientX > 0) {
      this.setData({
        display: "none",
        translate: ''
      })
    }
  },
  // 头像
  showview: function () {
    this.setData({
      display: "block",
      translate: 'transform: translateX(' + this.data.windowWidth * 0.7 + 'px);'
    })
  },
  // 遮拦
  hideview: function () {
    this.setData({
      display: "none",
      translate: '',
    })
  },
  // //搜索
  // inputTyping: function (e) {
  //   //搜索数据
  //   that = this;
  //   var _this = this;
  //   var Things = Bmob.Object.extend("Things");
  //   var query = new Bmob.Query(Things);
  //   query.equalTo("Category", e.detail.value);
  //   // 查询所有数据
  //   query.find({
  //     success: function (results) {
  //       _this.setData({
  //         Things: results
  //       });
  //       console.log("共查询到 " + results.length + " 条记录");
  //       // 循环处理查询到的数据
  //       //  for (var i = 0; i < results.length; i++) {
  //       //    var object = results[i];
  //       //    console.log(object.id + ' - ' + object.get('Category'));
  //       //  }
  //     },
  //     error: function (error) {
  //       console.log("查询失败: " + error.code + " " + error.message);
  //     }
  //   });
  //   this.setData({
  //     inputVal: e.detail.value
  //   });
  // },
  
  change_info: function () {
    wx.navigateTo({
      url: '../change-information/change-information'
    });
  },
  click_search: function () {
    if (!this.buttonClicked) {
      util.buttonClicked(this);
      console.log(getCurrentPages())
      wx.navigateTo({
        url: '/pages/screen/screen',
      });
    }
  },
  goToDetail: function () {
    wx.navigateTo({
      url: '/pages/index-detail/index-detail'
    });
  },
  closeAddLayer: function () {
    that.setData({
      modifyDiarys: false
    })
  },
  goToDetail:function(){
    wx.navigateTo({
        url: '/pages/index-detail/index-detail'
    });
  },
  click_search:function(){
    wx.navigateTo({
        url: '/pages/screen/screen'
    });
  }
})
function getList(t, k) {
  that = t;
  var _this = this;
  var Things = Bmob.Object.extend("Things");
  var query = new Bmob.Query(Things);
  query.equalTo("Category", k);
  // 查询所有数据
  query.find({
    success: function (results) {
      _this.setData({
        Things: results
      });
      console.log("共查询到 " + results.length + " 条记录");
      // 循环处理查询到的数据
      //  for (var i = 0; i < results.length; i++) {
      //    var object = results[i];
      //    console.log(object.id + ' - ' + object.get('Category'));
      //  }
    },
    error: function (error) {
      console.log("查询失败: " + error.code + " " + error.message);
    }
  });
}