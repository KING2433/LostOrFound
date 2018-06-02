Page({
  data:{
    
  },
  onLoad: function () {
    this.setData({
      id: getApp().globalData.id,
      realName: getApp().globalData.realName,
      Class: getApp().globalData.Class,
      College: getApp().globalData.College,
      mobilePhoneNumber: getApp().globalData.mobilePhoneNumber

    })
    this.setData({
      userInfo: getApp().globalData.userInfo
    });
  },

  onShow: function () {
    this.setData({
      id: getApp().globalData.id,
      realName: getApp().globalData.realName,
      Class: getApp().globalData.Class,
      College: getApp().globalData.College,
      mobilePhoneNumber: getApp().globalData.mobilePhoneNumber

    })
    this.setData({
      userInfo: getApp().globalData.userInfo
    });
  },
	change_info: function () {
		wx.navigateTo({
    	  	url: '../change-information/change-information'
    	});
	}
})