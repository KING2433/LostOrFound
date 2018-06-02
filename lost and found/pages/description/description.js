var Bmob=require("../../utils/bmob.js");
var that;

Page({
  	data: {
      place: ["教室", "操场", "食堂", "教学楼", "图书馆", "体育馆", "实验楼", "南门", "东门", "其它"],
      goods_types: ["文具", "眼镜", "书籍", "衣服", "鞋子", "校园卡", "数码用品", "生活用品", "其它"],	
  	  state:['丢失','拾取'],
      n_p: 0,
      n_c: 0,
      n_s: 0,
      date:'2018-1-1',
    },
  onPullDownRefresh:function(){
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },100);
    
  },
  onLoad:function(){
    that=this;
    var Things=Bmob.Object.extend("Things");
    var thing=new Things();
    thing.set("WCName",getApp().globalData.userInfo.nickName);
    thing.set("avatarUrl",getApp().globalData.userInfo.avatarUrl);
    thing.set("Place", this.data.place[1]);
    thing.set("Category", this.data.goods_types[1]);
    thing.set("State",false);
    thing.set("username",getApp().globalData.username);
    thing.set("Description", '');
    if(this.data.n_s==1){
      thing.set("LostOrFound", true);
    }
    else thing.set("LostOrFound", false);
    that.setData({
      thing:thing
    });
    that.setData({
      description:''
    });   
  },
  onShow: function () {
    that = this;
    var Things = Bmob.Object.extend("Things");
    var thing = new Things();
    thing.set("WCName", getApp().globalData.userInfo.nickName);
    thing.set("avatarUrl", getApp().globalData.userInfo.avatarUrl);
    thing.set("Place", this.data.place[1]);
    thing.set("Category", this.data.goods_types[1]);
    thing.set("State", false);
    thing.set("username", getApp().globalData.username);
    thing.set("Description", '');
    if (this.data.n_s == 1) {
      thing.set("LostOrFound", true);
    }
    else thing.set("LostOrFound", false);
    that.setData({
      thing: thing
    });
    that.setData({
      description: ''
    });
  },
  onHide: function () {
    that = this;
    var Things = Bmob.Object.extend("Things");
    var thing = new Things();
    thing.set("WCName", getApp().globalData.userInfo.nickName);
    thing.set("avatarUrl", getApp().globalData.userInfo.avatarUrl);
    thing.set("Place", this.data.place[1]);
    thing.set("Category", this.data.goods_types[1]);
    thing.set("State", false);
    thing.set("username", getApp().globalData.username);
    thing.set("Description", '');
    if (this.data.n_s == 1) {
      thing.set("LostOrFound", true);
    }
    else thing.set("LostOrFound", false);
    that.setData({
      thing: thing
    });
    that.setData({
      description: ''
    });
  },
  chooseState: function (e) {
    var t = parseInt(e.detail.value);
    //console.log('goods发送选择改变，携带值为', e.detail.value)

    if (t == 1) {
      this.data.thing.set("LostOrFound", true);
    }
    else {
      this.data.thing.set("LostOrFound", false);
    }
    console.log("n_s:" + t);
    this.setData({
      n_s: t
    });
  },

  chooseTime: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  descriptionInput(e){
    this.data.thing.set("Description",e.detail.value);
    this.setData({
      description:e.detail.value
    })
    console.log("description");
    
  },

  	choosePlace: function(e) {
	    //console.log('place发送选择改变，携带值为', e.detail.value)
	    this.data.thing.set("Place",this.data.place[parseInt(e.detail.value)]);
  	  this.setData({
        n_p:parseInt(e.detail.value)
      });
      console.log("Place: "+this.data.thing.get("Place"));
      
    },

  	chooseGoods: function(e) {
	    //console.log('goods发送选择改变，携带值为', e.detail.value)
      this.data.thing.set("Category", this.data.goods_types[parseInt(e.detail.value)]);
      this.setData({
        n_c:parseInt(e.detail.value)
      });
      console.log("category: "+this.data.thing.get("Category"));
  	},

	chooseimage: function() {
		that = this;  
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
         
        var tempFilePaths = res.tempFilePaths;
        console.log("tempfiles"+tempFilePaths);
        if (tempFilePaths.length > 0) {
          var name = that.data.thing.get("Time") + ".jpg";//上传的图片的别名，建议可以用日期命名    
          var file = new Bmob.File(name, tempFilePaths);
          file.save().then(function (res) {
            // console.log(res.url());
            that.data.thing.set("Picture",res);
            that.setData({
              tempFilePaths: res.url()
            });
            console.log("tempFile: " + that.data.tempFilePaths);
          }, function (error) {
            console.log(error);
          })
        }
        
      }
    })
	},

  formSubmit: function (e) {
    // 点击submit按钮后触发的事件
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    console.log(this.data.thing);
    var that = this;
    // 设置悬停窗
    wx.showModal({
      title:"发布",                          // 悬停窗题目
      content:"是否发布该消息",              // 窗口内文字内容
      showCanCel:"true",                     // 是否显示取消键
      cancelText:"取消",                     // 取消键的文字内容
      cancelColor:"#333",                    // 取消键文字颜色
      confirmText:"确认",                    // 确定键的内容
      confirmColor:"#405f80",                // 确定键中文字的颜色
      success:function(res){
        if(res.confirm){
          // 如果点击确认键
          console.log('LostOrFound'+that.data.thing.get('LostOrFound'));
          if (that.data.description==''||that.data.description==null){
            console.log("failed");
            wx.showToast({
              title: "信息不完整",
              icon: 'fail',
              duration: 2000
            }) 
          }
          else{
            that.data.thing.save({
              success: function () {
                console.log("success");
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 2000,
                })
                that.setData({
                  checked: '',
                  n_p: 0,
                  n_c: 0,
                  n_s: 0,
                  date: '2018-1-1',
                  descrption: '',
                  tempFilePaths: ''
                })
                wx.redirectTo({
                  url: '../test/test',
                })
              },
              error: function () {
                console.log("failed");
                wx.showToast({
                  title: "失败",
                  icon: 'fail',
                  duration: 2000
                })
              }
            });
          }
        }
      }
    }) 
  }

})