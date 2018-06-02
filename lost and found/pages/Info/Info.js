var Bmob = require("../../utils/bmob.js");

Page({
  data:{
      id:'',
      realName:"",
      Class:"",
      College:"",
      mobilePhoneNumber:""
  },
  onLoad:function(){
    this.setData({
      id:getApp().globalData.id,
      realName: getApp().globalData.realName,
      Class: getApp().globalData.Class,
      College: getApp().globalData.College,
      mobilePhoneNumber: getApp().globalData.mobilePhoneNumber

    })
    this.setData({
      userInfo:getApp().globalData.userInfo
    });
  },
  
  onShow:function(){
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

  getrealName:function(e){
    this.data.realName=e.detail.value;
  },
  
  getClass:function(e){
    this.data.Class=e.detail.value;
  },

  getCollege:function(e){
    this.data.College=e.detail.value;
  },
  getmobilePhoneNumber:function(e){
    this.data.mobilePhoneNumber=e.detail.value;
  },
	formSubmit:function(e){
		var that = this;
    
	    //设置悬停窗
	    wx.showModal({
		    title:"更改个人信息",                  // 悬停窗题目
		    content:"是否更改个人信息",            // 窗口内文字内容
		    showCanCel:"true",                     // 是否显示取消键
		    cancelText:"取消",                     // 取消键的文字内容
		    cancelColor:"#333",                    // 取消键文字颜色
		    confirmText:"确认",                    // 确定键的内容
		    confirmColor:"#405f80",                // 确定键中文字的颜色
		    success:function(res){
		    	if(res.confirm){
		          // 如果点击确认键
            var User = Bmob.Object.extend("_User");
            var query = new Bmob.Query(User);
            console.log("id:"+that.data.id);
            var id=that.data.id;
            console.log("realName:" + that.data.realName);
            getApp().globalData.realName = that.data.realName;
            getApp().globalData.Class = that.data.Class;
            getApp().globalData.College = that.data.College;
            getApp().globalData.mobilePhoneNumber = that.data.mobilePhoneNumber;
            query.get(id, {
              success: function (result) {
                // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
                // result.set('title', 'test!');
                // console.log(result);
                // console.log(that.data.realName);
                result.set('realName', that.data.realName);
                result.set('Class', that.data.Class);
                result.set('College', that.data.College);
                result.set('mobilePhoneNumber', that.data.mobilePhoneNumber);
                result.save();

                // The object was retrieved successfully.
              },
              error: function (object, error) {

              }
            });
		          wx.navigateBack();
		          wx.showToast({
		          	title: '修改成功',
		          	icon: 'success',
		          	duration: 2000
		          });
		      	} else{
			      	console.log("failed");
			      	wx.navigateBack(); 
			      	wx.showToast({
			      		title: "修改失败",
			      		icon: 'fail',
			      		duration: 2000
			      	});  
	      		}
	  		}   
		});
	}
})