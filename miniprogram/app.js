// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env:"env-0glfk94n26eebb18",
        traceUser: true,
      });
    }

      wx.getSystemInfo({
        success: (res) => {
          this.globalData.systemInfo = res;

          // if (res.screenHeight - res.windowHeight - res.statusBarHeight - 34 > 72) {
          //     this.globalData.isFullScreen = true;
          // }

          this.globalData.statusBarHeight = res.statusBarHeight;
          let capsuleBound = wx.getMenuButtonBoundingClientRect();
          this.globalData.navigationHeight = capsuleBound.top - res.statusBarHeight + capsuleBound.bottom;
        }
      });

  },
  globalData : {
    systemInfo: null,
    statusBarHeight: 0,
    navigationHeight: 0,
  }
});
