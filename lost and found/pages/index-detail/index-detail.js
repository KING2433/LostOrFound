var Bmob = require("../../utils/bmob.js");

Page({
	data: {
    
  },
  onPullDownRefresh:function(){
    setTimeout(()=>{
      wx.stopPullDownRefresh();
    },100)
  },
  onLoad:function(){
    var that=this;

    this.setData({
      Inf:getApp().data.detail
    })
    console
    console.log('username'+this.data.Inf.get('username'));

    var User=Bmob.Object.extend('_User');
    var query=new Bmob.Query(User);
    
    query.equalTo('username',this.data.Inf.get('username'));

    query.find({
      success: function (results) {
        var result=results[0];
        console.log(result);
        console.log(result.get('realName'));
        that.setData({
          realName:result.get('realName'),
          Class: result.get('Class'),
          College: result.get('College'),
          mobilePhoneNumber: result.get('mobilePhoneNumber')
        })
        
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });

    console.log(this.data.Inf);
  },
  // onShow: function () {
  //   var that = this;

  //   this.setData({
  //     Inf: getApp().data.detail
  //   })

  //   console.log(this.data.Inf.get('username'));

  //   var User = Bmob.Object.extend('_User');
  //   var query = new Bmob.Query(User);

  //   query.equalTo('username', this.data.Inf.get('username'));

  //   query.find({
  //     success: function (results) {
  //       var result = results[0];
  //       console.log(result);
  //       console.log(result.get('realName'));
  //       that.setData({
  //         realName: result.get('realName'),
  //         Class: result.get('Class'),
  //         College: result.get('College'),
  //         mobilePhoneNumber: result.get('mobilePhoneNumber')
  //       })

  //     },
  //     error: function (error) {
  //       console.log("查询失败: " + error.code + " " + error.message);
  //     }
  //   });

  //   console.log(this.data.Inf);
  // }

  

	
})