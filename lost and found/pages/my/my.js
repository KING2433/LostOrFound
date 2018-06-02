Page({
  data:{

  },
  onLoad:function(){
      this.setData({
        userInfo:getApp().globalData.userInfo
      });   
  },
  onTap1:function()
  {
    wx.navigateTo({
      url: '../personal-information/personal-information'
    });
  }
,
    onTap2: function () {
    wx.navigateTo({
      url: '../lostlist/lostlist'
    });
  }
,
    onTap3: function () {
      wx.navigateTo({
        url: '../findlist/findlist'
      });
    }
,
      onTap4: function () {
      wx.navigateTo({
        url: '../history/history'
      });
      }
})