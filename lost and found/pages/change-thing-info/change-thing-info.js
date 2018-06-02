var Bmob=require("../../utils/bmob.js");
var that;

Page({
  	data: {
	  	place: ['主教', '食堂', '图书馆', '操场','其他'],
    	goods_types: ['校园卡', '文具', '电子产品', '衣物','现金、证件','其他'],	
  	  state:['丢失','拾取'],
      State:['未解决','已解决'],
      n_p: 0,
      n_c: 0,
      n_s: 0,
      n_S: 0,
      date:'2018-1-1',
    },  
  onLoad:function(){
    that=this;
    console.log("thing:"+getApp().globalData.thing);
    that.setData({
      thing:getApp().globalData.thing
    });
    var res = that.data.thing.get('Picture');
    if(res!=null){
      console.log(res.url);
      // console.log("picture:"+res.url);
      that.setData({
        tempFilePaths: res.url
      })
    }
    for(var i=0;i<5;i++){
      if(this.data.place[i]==this.data.thing.get('Place')){
        this.setData({
          n_p:i
        });
        break;
      }
    }
    console.log(this.data.place[this.data.n_p]);
    for(var i=0;i<7;i++)if(this.data.goods_types[i]==this.data.thing.get('Category')){
      this.setData({
        n_c:i
      });
      break;
    }
    console.log(this.data.goods_types[this.data.n_c]);
    
    if(this.data.thing.get('LostOrFound')==true){
      this.setData({
        n_s:1
      });
    }
    else{
      this.setData({
        n_s:0
      });
    }

    if (this.data.thing.get('State') == true) {
      this.setData({
        n_S: 1
      });
      console.log("已解决");
    }
    else {
      this.setData({
        n_S: 0
      });
      console.log('未解决');
    }
    this.setData({
      description: this.data.thing.get('Description')
    })
    console.log(this.data.state[this.data.n_s]);
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
    console.log("n_s:"+t);
    this.setData({
      n_s: t
    });
  },
  chooseSTATE: function (e) {
    var t = parseInt(e.detail.value);
    //console.log('goods发送选择改变，携带值为', e.detail.value)

    if (t == 1) {
      this.data.thing.set("State", true);
    }
    else {
      this.data.thing.set("State", false);
    }
    // console.log("n_S:" + t);
    this.setData({
      n_S: t
    });
    console.log("n_S:"+this.data.n_S);
  },
  chooseTime: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  descriptionInput(e){
    this.data.thing.set("Description",e.detail.value);
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
  Delete:function(){
    var tha=this;
    wx.showModal({
      title: "删除",                          // 悬停窗题目
      content: "是否删除",              // 窗口内文字内容
      showCanCel: "true",                     // 是否显示取消键
      cancelText: "取消",                     // 取消键的文字内容
      cancelColor: "#333",                    // 取消键文字颜色
      confirmText: "确认",                    // 确定键的内容
      confirmColor: "#405f80",                // 确定键中文字的颜色
      success: function (res) {
        if (res.confirm) {
          that.data.thing.destroy({
            success: function (myObject) {
              // 删除成功
              console.log("success");
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000,
              })
              //返回上一个页面并执行onload操作
              var pages = getCurrentPages(); // 当前页面  
              var beforePage = pages[pages.length - 2]; // 前一个页面  
              // console.log("beforePage");  
              // console.log(beforePage);  
              wx.navigateBack({
                success: function () {
                  beforePage.onLoad(); // 执行前一个页面的onLoad方法  
                }
              });  
              
            },
            error: function (myObject, error) {
              // 删除失败
              console.log('failed');
            }
          });
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
      title:"保存",                          // 悬停窗题目
      content:"是否保存",              // 窗口内文字内容
      showCanCel:"true",                     // 是否显示取消键
      cancelText:"取消",                     // 取消键的文字内容
      cancelColor:"#333",                    // 取消键文字颜色
      confirmText:"确认",                    // 确定键的内容
      confirmColor:"#405f80",                // 确定键中文字的颜色
      success:function(res){
        if(res.confirm){
          // 如果点击确认键
          console.log('LostOrFound'+that.data.thing.get('LostOrFound'));
          if (that.data.thing.get('LostOrFound') == null){
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
                var pages = getCurrentPages(); // 当前页面  
                var beforePage = pages[pages.length - 2]; // 前一个页面  
                // console.log("beforePage");  
                // console.log(beforePage);  
                wx.navigateBack({
                  success: function () {
                    beforePage.onLoad(); // 执行前一个页面的onLoad方法  
                  }
                });  
                // that.setData({
                //   checked: '',
                //   n_p: 0,
                //   n_c: 0,
                //   n_s: 0,
                //   date: '2018-1-1',
                //   description: '',
                //   tempFilePaths: ''
                // })
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