var Bmob = require("../../utils/bmob.js");

// pages/findlist/findlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var Things=Bmob.Object.extend('Things');
    var query=new Bmob.Query(Things);

    query.equalTo('username',getApp().globalData.username);
    query.equalTo('State',false);
    query.equalTo('LostOrFound',true);
    query.find({
      success:function(results){
        console.log("success");
        console.log(results.length);
        that.setData({
          Things:results
        })
      },
      error:function(error){
        console.log('failed');
      }
    });
  },
  onShow: function (options) {
    var that = this;
    var Things = Bmob.Object.extend('Things');
    var query = new Bmob.Query(Things);

    query.equalTo('username', getApp().globalData.username);
    query.equalTo('State', false);
    query.equalTo('LostOrFound', true);
    query.find({
      success: function (results) {
        console.log("success");
        console.log(results.length);
        that.setData({
          Things: results
        })
      },
      error: function (error) {
        console.log('failed');
      }
    });
  },
  toChangeInfo: function (e) {
    console.log("id：" + e.currentTarget.id);
    var id = e.currentTarget.id;
    for (var i = 0; i < this.data.Things.length; i++) {
      var x = this.data.Things[i].createdAt.toString();
      if (x == id) {
        getApp().globalData.thing = this.data.Things[i];
        break;
      }
    }
    console.log("thing:" + getApp().globalData.thing)
    wx.navigateTo({
      url: '../change-thing-info/change-thing-info',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})