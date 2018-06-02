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
    pageBackgroundColor: '#5cb85c',
    tabs: ["一天内", "近三天内", "近一周内", "近一个月内", "近半年内","所有"],
    tabs1: ["教室", "操场", "食堂", "教学楼", "图书馆", "体育馆", "实验楼", "南门", "东门", "其它"],
    tabs2: ["文具", "眼镜", "书籍", "衣服", "鞋子", "校园卡", "数码用品", "生活用品", "其它"],
    clickId: 0,
    clickItem: "一天内",
    clickIdtwo:0,
    clickItemtwo:"教室",
    clickIdthree: 0,
    clickItemthree: "文具",
    ui: {
      windowWidth: 0,
      menuWidth: 0,
      offsetLeft: 0,
      tStart: true
    },
    path:'/image/empty.jpg'
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
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
    console.log("detail:"+getApp().data.detail);
    // getApp().globalData.premission=false;
    wx.redirectTo({
      url: '../index-detail/index-detail',
    })
  },
  // 改变背景颜色
  tabClick: function (tabs) {
    console.log(tabs);
    this.setData({
      clickId: tabs.currentTarget.id,
      clickItem: this.data.tabs[tabs.currentTarget.id]
    });
    that = this;
    var _this = this;
    var Things = Bmob.Object.extend("Things");
    var query = new Bmob.Query(Things);
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var time = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    if(this.data.clickId==0)
    {
      var newtimestamp=timestamp-24*60*60;
      var newn=newtimestamp*1000;
      var newdate =new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if(newh<10)
      newh='0'+newh;
      var newm = newdate.getMinutes();
      if(newm<10)
      newm='0'+newm;
      var news = newdate.getSeconds();
      if(news<10)
      news='0'+news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm +":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if (this.data.clickId == 1)
    {
      var newtimestamp = timestamp - 3*24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if(this.data.clickId == 2)
    {
      var newtimestamp = timestamp - 7*24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if(this.data.clickId == 3)
    {
      var newtimestamp = timestamp - 30*24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if(this.data.clickId == 4)
    {
      var newtimestamp = timestamp - 180*24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    query.equalTo("Place", this.data.clickItemtwo);
    query.equalTo("Category", this.data.clickItemthree);
    query.descending("createdAt");
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
  },
  tabClick1: function (tabs1) {
    console.log(tabs1)
    this.setData({
      clickIdtwo: tabs1.currentTarget.id,
      clickItemtwo: this.data.tabs1[tabs1.currentTarget.id]
    });
    that = this;
    var _this = this;
    var Things = Bmob.Object.extend("Things");
    var query = new Bmob.Query(Things);
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var time = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    if (this.data.clickId == 0) {
      var newtimestamp = timestamp - 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if (this.data.clickId == 1) {
      var newtimestamp = timestamp - 3 * 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if (this.data.clickId == 2) {
      var newtimestamp = timestamp - 7 * 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if (this.data.clickId == 3) {
      var newtimestamp = timestamp - 30 * 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if (this.data.clickId == 4) {
      var newtimestamp = timestamp - 180 * 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    query.equalTo("Place", this.data.clickItemtwo);
    query.equalTo("Category", this.data.clickItemthree);
    query.descending("createdAt");
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
  },
  tabClick2: function (tabs2) {
  //  console.log(tabs2)
    this.setData({
      clickIdthree: tabs2.currentTarget.id,
      clickItemthree: this.data.tabs2[tabs2.currentTarget.id]
    });
    that = this;
    var _this = this;
    var Things = Bmob.Object.extend("Things");
    var query = new Bmob.Query(Things);
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var time = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
    if (this.data.clickId == 0) {
      var newtimestamp = timestamp - 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if (this.data.clickId == 1) {
      var newtimestamp = timestamp - 3 * 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if (this.data.clickId == 2) {
      var newtimestamp = timestamp - 7 * 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if (this.data.clickId == 3) {
      var newtimestamp = timestamp - 30 * 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    else if (this.data.clickId == 4) {
      var newtimestamp = timestamp - 180 * 24 * 60 * 60;
      var newn = newtimestamp * 1000;
      var newdate = new Date(newn);
      var newY = newdate.getFullYear();
      var newM = (newdate.getMonth() + 1 < 10 ? '0' + (newdate.getMonth() + 1) : newdate.getMonth() + 1);
      var newD = newdate.getDate() < 10 ? '0' + newdate.getDate() : newdate.getDate();
      var newh = newdate.getHours();
      if (newh < 10)
        newh = '0' + newh;
      var newm = newdate.getMinutes();
      if (newm < 10)
        newm = '0' + newm;
      var news = newdate.getSeconds();
      if (news < 10)
        news = '0' + news;
      var newtime = newY + "-" + newM + "-" + newD + " " + h + ":" + newm + ":" + news;
      console.log(newtime);
      query.equalTo("createdAt", { "$gte": { "__type": "Date", "iso": newtime } });
    }
    query.equalTo("Place", this.data.clickItemtwo);
    query.equalTo("Category",this.data.clickItemthree);
    query.descending("createdAt");
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


  onLoad(t) {
    var self = this;
    //this.getAll();
    //this.fetchTopThreePosts(); //获取轮播图的3篇文章
    this.setData({
      userInfo: getApp().globalData.userInfo
    });

    var Things = Bmob.Object.extend("Things");
    var thing = new Bmob.Query(Things);
    that = this;
    thing.find({
      success: function (results) {
        console.log("success");
        console.log("we find " + results.length);
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
    var Things = Bmob.Object.extend("Things");
    var thing = new Bmob.Query(Things);
    that = this;
    thing.find({
      success: function (results) {
        console.log("success");
        console.log("we find " + results.length);
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
    console.log("thingid:" + this.data.Things[0].createdAt);
    for (var i = 0; i < this.data.Things.length; i++) {
      var x = this.data.Things[i].createdAt.toString();
      if (x == t) {
        getApp().data.detail = this.data.Things[i];
        break;
      }
    }
    getApp().globalData.premission = false;
    wx.navigateTo({
      url: '../index-detail/index-detail',
    })
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
        translate: 'transform: translateX(-80%);',
        // ' + this.data.windowWidth * 0.7 + 'px

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
      translate: 'transform: translateX(-80%);'
    })
  },
  // 遮拦
  hideview: function () {
    this.setData({
      display: "none",
      translate: '',
    })
  },
  //搜索
  inputTyping: function (e) {
    //搜索数据
    that = this;
    var _this = this;
    var Things = Bmob.Object.extend("Things");
    var query = new Bmob.Query(Things);
    query.equalTo("Category", e.detail.value);
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
    this.setData({
      inputVal: e.detail.value
    });
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
