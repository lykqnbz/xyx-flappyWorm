// api测试
export class ApiExamples {
  getUserInfo() {
    const params = {
      success: function(res) {
          console.log(res)
      }
    };
    wx.getUserInfo(params)
  }

  login(){
    wx.login({
      success:function(res){
        console.log(res)
      }
    })
  }

  
}