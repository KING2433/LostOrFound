var Bmob = require('utils/bmob.js');
Bmob.initialize("237dc7cb739f59c29a62f2aade9ece9a", "e73192ad134421a7e07aea2a0ac2abe5");

//app.js
App({
  data:{
    
  },
  onLaunch: function () {
    // 展示本地存储能力
    var that = this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 注册
    wx.login({
      success: function (res) {
        if (res.code) {
          Bmob.User.requestOpenId(res.code, {//获取userData(根据个人的需要，如果需要获取userData的需要在应用密钥中配置你的微信小程序AppId和AppSecret，且在你的项目中要填写你的appId)
            success: function (userData) {
              getApp().globalData.userData=userData;
              wx.getUserInfo({
                success: function (result) {
                  var userInfo = result.userInfo
                  var nickName = userInfo.nickName
                  var avatarUrl=userInfo.avatarUrl;

                  var user = new Bmob.User();//开始注册用户
                  user.set("username", userData.openid);
                  user.set("nickName",nickName);
                  user.set("password", userData.openid);//因为密码必须提供，但是微信直接登录小程序是没有密码的，所以用openId作为唯一密码
                  user.set("userData", userData);
                  user.set("avatarUrl",avatarUrl);
                  
                  user.signUp(null, {
                    success: function (res) {
                      // console.log("res:"+res);
                      console.log("注册成功!");
                      // that.globalData.user=res;
                      // console.log(res.id);
                      var User=Bmob.Object.extend('_User');
                      var query = new Bmob.Query(User);
                      query.get(res.id, {
                        success: function (result) {
                          // 查询成功，调用get方法获取对应属性的值
                          console.log("success");
                          getApp().globalData.user=result;
                          console.log(that.globalData.user);
                          that.globalData.id=result.id;
                          that.globalData.username = result.get('username');
                          that.globalData.realName = result.get('realName');
                          that.globalData.Class = result.get("Class");
                          that.globalData.College = result.get("College");
                          that.globalData.mobilePhoneNumber = result.get("mobilePhoneNumber");
                        },
                        error: function (object, error) {
                          // 查询失败
                        }
                      });
            
                    },
                    error: function (userData, error) {
                      console.log(error);
                      // console.log(that.globalData.user);
                      console.log("openid:"+getApp().globalData.userData.openid);
                      // o4qAb5EQHPxSZWB4hsPVmYKERFRM
                     

                      var User = Bmob.Object.extend('_User');
                      var query=new Bmob.Query(User);
                      
                      query.equalTo("username", getApp().globalData.userData.openid);
                      // 查询所有数据
                      query.find({
                        success: function (results) {
                          getApp().globalData.user = results[0];
                          console.log(getApp().globalData.user);
                          var result=results[0];
                          that.globalData.id = result.id;
                          console.log('id:'+that.globalData.id);
                          that.globalData.username = result.get('username');
                          that.globalData.realName = result.get('realName');
                          that.globalData.Class = result.get("Class");
                          that.globalData.College = result.get("College");
                          that.globalData.mobilePhoneNumber = result.get("mobilePhoneNumber");
                        },
                        error: function (error) {
                          console.log("查询失败: " + error.code + " " + error.message);
                        }
                      });
                      
                    }
                  });
                }

              })
              
            },
            error: function (error) {
              // Show the error message somewhere
              console.log("Error: " + error.code + " " + error.message);
            }
          });

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})