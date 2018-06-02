Page({
  jumpToIndex:function(){
    // wx.navigateTo({
    //   url: '../screen/scree,
    // })

    if (getApp().realName == null || getApp().realName == '' || getApp().Class == null || getApp().Class == '' || getApp().College == null || getApp().College == '' || getApp().mobilePhoneNumber == null || getApp().mobilePhoneNumber == ''){
      wx.switchTab({
        url: '../Info/Info'
      })  
    }
    else{
      wx.switchTab({
        url: '../test/test'
      })
    }
  }
})