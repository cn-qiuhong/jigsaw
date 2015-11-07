var pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 2;
var info_screen = {
  w: 1280,
  h: 720
};
var info_screen0 = {
  w: window.innerWidth,
  h: window.innerHeight
};
// var info_screen0 = {
// w: Math.min(window.innerWidth, 1280),
// h: Math.min(window.innerHeight, 720)
// };
//画布偏移量
// var canvas_x = (window.innerWidth - info_screen0.w) / 2;
// var canvas_y = (window.innerHeight - info_screen0.h) / 2;
//判断是否是移动端
var bro = function()
{
  var browser = navigator.userAgent;
  var result = browser.indexOf('Android') || browser.indexOf('iPhone') || browser.indexOf('iPad') || browser.indexOf('Mobile');
  if (result > -1) return true;
  return false;
}();
if (bro)
{
  info_screen0 = {
    w: window.screen.height,
    h: window.screen.width
  };
  canvas_x = canvas_y = 0;
}
//显示比例
var sc_x = info_screen0.w / info_screen.w;
var sc_y = info_screen0.h / info_screen.h;

//主函数，入口
var main = function()
{
  var T = Tina().requires("Input,Sprites,Scenes,Text,Entities")
    .setup("canvas",
    {
      width: info_screen0.w,
      height: info_screen0.h,
      pixelRatio: pixelRatio,
      scale:
      {
        x: sc_x,
        y: sc_y
      }
    })
    .controls();

  var picture_c, stage_g, level = 0,
    maxlevel, record, bgmusic, duihuaindex;
  var data_g = [
    [
      [
      {
        asset: '1_nr1.png',
        w: 138,
        h: 130,
        center:
        {
          x: 69,
          y: 65
        },
        wh: 'sun',
        index: 1,
        x: 822,
        y: 617
      },
      {
        asset: '1_nr2.png',
        w: 87,
        h: 62,
        center:
        {
          x: 43,
          y: 31
        },
        wh: 'sun',
        index: 2,
        x: 936,
        y: 528
      },
      {
        asset: '1_nr3.png',
        w: 81,
        h: 64,
        center:
        {
          x: 40,
          y: 32
        },
        wh: 'sun',
        index: 3,
        x: 1140,
        y: 605
      },
      {
        asset: '1_nr4.png',
        w: 185,
        h: 166,
        center:
        {
          x: 92,
          y: 83
        },
        wh: 'sun',
        index: 4,
        x: 770,
        y: 458
      },
      {
        asset: '1_nl1.png',
        w: 152,
        h: 184,
        center:
        {
          x: 76,
          y: 92
        },
        wh: 'rain',
        index: 5,
        x: 815,
        y: 610
      },
      {
        asset: '1_nl2.png',
        w: 91,
        h: 73,
        center:
        {
          x: 45,
          y: 36
        },
        wh: 'rain',
        index: 6,
        x: 920,
        y: 500
      },
      {
        asset: '1_nl3.png',
        w: 100,
        h: 74,
        center:
        {
          x: 50,
          y: 37
        },
        wh: 'rain',
        index: 7,
        x: 1150,
        y: 617
      },
      {
        asset: '1_nl4.png',
        w: 238,
        h: 182,
        center:
        {
          x: 119,
          y: 91
        },
        wh: 'rain',
        index: 8,
        x: 744,
        y: 445
      }],
      [
      {
        asset: '1_nvr1.png',
        w: 118,
        h: 124,
        center:
        {
          x: 59,
          y: 62
        },
        wh: 'sun',
        index: 1,
        x: 821,
        y: 609
      },
      {
        asset: '1_nvr2.png',
        w: 85,
        h: 53,
        center:
        {
          x: 42,
          y: 26
        },
        wh: 'sun',
        index: 2,
        x: 915,
        y: 518
      },
      {
        asset: '1_nvr3.png',
        w: 62,
        h: 51,
        center:
        {
          x: 31,
          y: 25
        },
        wh: 'sun',
        index: 3,
        x: 1137,
        y: 625
      },
      {
        asset: '1_nvr4.png',
        w: 152,
        h: 154,
        center:
        {
          x: 76,
          y: 77
        },
        wh: 'sun',
        index: 4,
        x: 770,
        y: 448
      },
      {
        asset: '1_nvl1.png',
        w: 150,
        h: 173,
        center:
        {
          x: 75,
          y: 86
        },
        wh: 'rain',
        index: 5,
        x: 895,
        y: 610
      },
      {
        asset: '1_nvl2.png',
        w: 80,
        h: 77,
        center:
        {
          x: 40,
          y: 38
        },
        wh: 'rain',
        index: 6,
        x: 930,
        y: 475
      },
      {
        asset: '1_nvl3.png',
        w: 81,
        h: 61,
        center:
        {
          x: 40,
          y: 30
        },
        wh: 'rain',
        index: 7,
        x: 1122,
        y: 590
      },
      {
        asset: '1_nvl4.png',
        w: 179,
        h: 203,
        center:
        {
          x: 89,
          y: 101
        },
        wh: 'rain',
        index: 8,
        x: 758,
        y: 458
      }]
    ],
    [
    {
      asset: '2g1.png',
      w: 155,
      h: 189,
      center:
      {
        x: 77,
        y: 94
      },
      index: 1,
      x: 445,
      y: 420
    },
    {
      asset: '2g2.png',
      w: 155,
      h: 189,
      center:
      {
        x: 77,
        y: 94
      },
      index: 2,
      x: 483,
      y: 390
    },
    {
      asset: '2g3.png',
      w: 150,
      h: 128,
      center:
      {
        x: 75,
        y: 64
      },
      index: 3,
      x: 603,
      y: 420
    },
    {
      asset: '2g4.png',
      w: 150,
      h: 128,
      center:
      {
        x: 75,
        y: 64
      },
      index: 4,
      x: 875,
      y: 465
    },
    {
      asset: '2g5.png',
      w: 115,
      h: 77,
      center:
      {
        x: 57,
        y: 38
      },
      index: 5,
      x: 770,
      y: 458
    },
    {
      asset: '2g6.png',
      w: 130,
      h: 77,
      center:
      {
        x: 65,
        y: 38
      },
      index: 6,
      x: 1060,
      y: 407
    },
    {
      asset: '2g7.png',
      w: 225,
      h: 118,
      center:
      {
        x: 112,
        y: 59
      },
      index: 7,
      x: 1138,
      y: 430
    }],
    [
      {
        asset: '2_1.png',
        w: 247,
        h: 607,
        center:
        {
          x: 123,
          y: 303
        },
        index: 1,
        x: 417,
        y: 384
      },
      // {
      //   asset: '2_2.png',
      //   w: 178,
      //   h: 121,
      //   center:
      //   {
      //     x: 89,
      //     y: 60
      //   },
      //   index: 2,
      //   x: 691,
      //   y: 124
      // },
      {
        asset: '2_3.png',
        w: 189,
        h: 230,
        center:
        {
          x: 94,
          y: 115
        },
        index: 2,
        x: 682,
        y: 331
      },
      {
        asset: '2_4.png',
        w: 265,
        h: 239,
        center:
        {
          x: 132,
          y: 119
        },
        index: 3,
        x: 707,
        y: 582
      },
      {
        asset: '2_5.png',
        w: 235,
        h: 331,
        center:
        {
          x: 117,
          y: 165
        },
        index: 4,
        x: 964,
        y: 478
      },
      {
        asset: '2_6.png',
        w: 210,
        h: 275,
        center:
        {
          x: 105,
          y: 137
        },
        index: 5,
        x: 1170,
        y: 568
      }
    ],
    // [{asset: '3_1.png', w: 62, h: 72, center: {x: 31, y: 36}, index: 1, x: 955, y: 560},
    // 	{asset: '3_2.png', w: 172, h: 81, center: {x: 87, y: 40}, index: 2, x: 869, y: 450},
    // 	{asset: '3_3.png', w: 97, h: 176, center: {x: 48, y: 88}, index: 3, x: 1155, y: 600},
    // 	{asset: '3_4.png', w: 69, h: 70, center: {x: 34, y: 35}, index: 4, x: 855, y: 656},
    // 	{asset: '3_5.png', w: 172, h: 113, center: {x: 86, y: 56}, index: 5, x: 425, y: 530},
    // 	{asset: '3_6.png', w: 131, h: 125, center: {x: 65, y: 62}, index: 6, x: 473, y: 418},
    // 	{asset: '3_7.png', w: 67, h: 60, center: {x: 33, y: 30}, index: 7, x: 855, y: 168}
    // ],
    // [{asset: 'hy1.png', w: 221, h: 127, center: {x: 110, y: 63}, index: 1, x: 877, y: 644},
    // 	{asset: 'hy2.png', w: 180, h: 172, center: {x: 90, y: 86}, index: 2, x: 1058, y: 352},
    // 	{asset: 'hy3.png', w: 110, h: 115, center: {x: 55, y: 57}, index: 3, x: 1167, y: 643},
    // 	{asset: 'hy4.png', w: 296, h: 197, center: {x: 148, y: 98}, index: 4, x: 699, y: 391},
    // 	{asset: 'hy5.png', w: 129, h: 113, center: {x: 64, y: 56}, index: 5, x: 411, y: 463},
    // 	{asset: 'hy6.png', w: 185, h: 148, center: {x: 92, y: 74}, index: 6, x: 585, y: 622},
    // 	{asset: 'hy7.png', w: 107, h: 60, center: {x: 53, y: 30}, index: 7, x: 536, y: 527},
    // 	{asset: 'hy8.png', w: 300, h: 140, center: {x: 150, y: 70}, index: 8, x: 1072, y: 535},
    // 	{asset: 'hy9.png', w: 77, h: 90, center: {x: 38, y: 45}, index: 9, x: 1200, y: 410},
    // 	{asset: 'hy10.png', w: 67, h: 69, center: {x: 33, y: 34}, index: 10, x: 365, y: 618}],
    [
      {
        asset: '4_1.png',
        w: 223,
        h: 172,
        center:
        {
          x: 111,
          y: 86
        },
        index: 1,
        x: 685,
        y: 585
      },
      {
        asset: '4_2.png',
        w: 291,
        h: 114,
        center:
        {
          x: 145,
          y: 57
        },
        index: 2,
        x: 1137,
        y: 308
      },
      // {asset: '4_3.png', w: 159, h: 98, center: {x: 79, y: 49}, index: 3, x: 459, y: 145},
      {
        asset: '4_4.png',
        w: 164,
        h: 98,
        center:
        {
          x: 82,
          y: 49
        },
        index: 3,
        x: 475,
        y: 458
      },
      // {asset: '4_5.png', w: 99, h: 153, center: {x: 49, y: 76}, index: 5, x: 635, y: 156},
      {
        asset: '4_6.png',
        w: 258,
        h: 137,
        center:
        {
          x: 129,
          y: 68
        },
        index: 4,
        x: 1061,
        y: 616
      }
      // {asset: '4_7.png', w: 116, h: 56, center: {x: 58, y: 28}, index: 7, x: 855, y: 80},
      // {asset: '4_8.png', w: 75, h: 198, center: {x: 37, y: 99}, index: 8, x: 883, y: 283},
      // {asset: '4_9.png', w: 139, h: 103, center: {x: 69, y: 51}, index: 9, x: 1130, y: 83},
      // {asset: '4_10.png', w: 209, h: 119, center: {x: 104, y: 59}, index: 10, x: 604, y: 390}
    ],
    [
      {
        asset: '5_1.png',
        w: 112,
        h: 81,
        center:
        {
          x: 56,
          y: 40
        },
        index: 1,
        x: 896,
        y: 263
      },
      {
        asset: '5_2.png',
        w: 70,
        h: 54,
        center:
        {
          x: 35,
          y: 27
        },
        index: 2,
        x: 570,
        y: 477
      },
      {
        asset: '5_3.png',
        w: 133,
        h: 90,
        center:
        {
          x: 66,
          y: 45
        },
        index: 3,
        x: 750,
        y: 535
      },
      {
        asset: '5_4.png',
        w: 153,
        h: 91,
        center:
        {
          x: 76,
          y: 45
        },
        index: 4,
        x: 1170,
        y: 628
      },
      // {
      //   asset: '5_5.png',
      //   w: 98,
      //   h: 37,
      //   center:
      //   {
      //     x: 49,
      //     y: 18
      //   },
      //   index: 5,
      //   x: 610,
      //   y: 420
      // },
      {
        asset: '5_6.png',
        w: 174,
        h: 152,
        center:
        {
          x: 87,
          y: 76
        },
        index: 6,
        x: 983,
        y: 558
      },
      {
        asset: '5_7.png',
        w: 104,
        h: 103,
        center:
        {
          x: 52,
          y: 51
        },
        index: 7,
        x: 495,
        y: 432
      }
    ]
    // [{asset: '1_1.png', w: 218, h: 198, rw: 192, rh: 168, center: {x: 107, y: 97}, index: 1, x: 1165, y: 600},
    // 	{asset: '1_2.png', w: 218, h: 198, rw: 157, rh: 144, center: {x: 107, y: 97}, index: 2, x: 1053, y: 472},
    // 	{asset: '1_3.png', w: 393, h: 78, rw: 370, rh: 54, center: {x: 195, y: 37}, index: 3, x: 793, y: 657},
    // 	{asset: '1_4.png', w: 236, h: 236, rw: 188, rh: 140, center: {x: 113, y: 113}, index: 4, x: 635, y: 537},
    // 	{asset: '1_5.png', w: 236, h: 236, rw: 205, rh: 163, center: {x: 128, y: 113}, index: 5, x: 853, y: 545},
    // 	{asset: '1_6.png', w: 236, h: 236, rw: 151, rh: 95, center: {x: 128, y: 121}, index: 6, x: 1192, y: 404},
    // 	{asset: '1_7.png', w: 236, h: 236, rw: 112, rh: 128, center: {x: 117, y: 121}, index: 7, x: 1066, y: 331},
    // 	{asset: '1_8.png', w: 236, h: 236, rw: 135, rh: 225, center: {x: 121, y: 118}, index: 8, x: 925, y: 316},
    // 	{asset: '1_9.png', w: 236, h: 236, rw: 100, rh: 158, center: {x: 113, y: 135}, index: 9, x: 805, y: 363},
    // 	{asset: '1_10.png', w: 236, h: 236, rw: 156, rh: 105, center: {x: 113, y: 135}, index: 10, x: 696, y: 405},
    // 	{asset: '1_11.png', w: 236, h: 236, rw: 177, rh: 109, center: {x: 130, y: 113}, index: 11, x: 937, y: 100},
    // 	{asset: '1_12.png', w: 236, h: 236, rw: 131, rh: 117, center: {x: 105, y: 128}, index: 12, x: 458, y: 222},
    // 	{asset: '1_13.png', w: 236, h: 236, rw: 122, rh: 87, center: {x: 103, y: 129}, index: 13, x: 579, y: 317},
    // 	{asset: '1_14.png', w: 236, h: 236, rw: 203, rh: 64, center: {x: 118, y: 122}, index: 14, x: 478, y: 448}]
  ];
  var audio_path = [
    [],
    [],
    ['changjinglu.mp3', 'houzi.mp3', 'daishu.mp3', 'xiong.mp3', 'lang.mp3'],
    ['huo4che.mp3', 'huo3che.mp3', null, 'qiche.mp3'],
    []
  ];
  var audio_en = [
    [],
    [],
    ['en_changjinglu.mp3', 'en_houzi.mp3', 'en_daishu.mp3', 'en_xiong.mp3'],
    [],
    []
  ];
  var audio_level = [];
  //(1)类

  //动画播放
  var AnimPlayer = T.Entity.extend(
  {
    time: 33,
    timing: 0,
    z: 110,
    open: false,
    added: false,
    init: function(ops)
    {
      this._super(ops);
      this.merge("frameAnim");
      this.on("down", function()
      {
        this.down();
      });
    },
    update: function(dt)
    {
      this._super(dt);
      this.action();
    },
    action: function()
    {
      this.play("anim");
    },
    down: function() {}
  });

  //按钮
  var Button = T.Sprite.extend(
  {
    z: 10,
    init: function(ops)
    {
      this._super(ops);
      this.on("down", function()
      {
        this.down();
      });
    },
    down: function() {}
  });

  //背景,每关的背景在此处设置
  var Background = T.Sprite.extend(
  {
    init: function()
    {
      switch (level)
      {
        case 0:
          var bg = new BG();
          if (record.sex == 'boy')
          {
            if (record.weather == 'sun') bg.asset = 'bg1nr.png';
            else if (record.weather == 'rain') bg.asset = 'bg1nl.png';
          }
          else if (record.sex == 'girl')
          {
            if (record.weather == 'sun') bg.asset = 'bg1nvr.png';
            else if (record.weather == 'rain') bg.asset = 'bg1nvl.png';
          }
          stage_g.add(bg);
          break;
        case 1:
          if (record.sex == 'boy') stage_g.add(new BG('bg2_boy.png'));
          else if (record.sex == 'girl') stage_g.add(new BG('bg2_girl.png'));
          break;
        case 2:
          stage_g.add(new T.Sprite(
          {
            asset: 'bg3.png',
            w: 1280,
            h: 720
          }));
          break;
        case 3:
          stage_g.add(new T.Sprite(
          {
            asset: 'bg4.png',
            w: 1280,
            h: 720
          }));
          break;
        case 4:
          stage_g.add(new BG('bg5.png'));
          stage_g.add(new BG('bg5_nainai.png',
          {
            z: 5,
            w: 213,
            h: 274,
            x: 940,
            y: 288
          }));
          break;
      }
    }
  });

  var BG = T.Sprite.extend(
  {
    w: 1280,
    h: 720,
    time: 0,
    timing: 0,
    init: function(asset, ops)
    {
      if (asset != null) this.asset = asset;
      this._super(ops);
      this.on('down', function(e)
      {
        this.down(e);
      });
    },
    update: function(dt)
    {
      this._super(dt);
      this.action();
    },
    action: function() {},
    down: function(e) {}
  });

  var Duihuakuang = T.Sprite.extend(
    {
      w: 400,
      h: 260,
      x: 780,
      y: 270,
      z: 120,
      init: function()
      {
        switch (duihuaindex)
        {
          case 1:
            if (record.weather == 'sun')
            {
              this.asset = 'dh1qing.png';
              T.getAsset('1qing.mp3').play();
            }
            else
            {
              this.asset = 'dh1yu.png';
              T.getAsset('1yu.mp3').play();
            }
            break;
        }
        if (duihuaindex > 1)
        {
          this.asset = 'dh' + duihuaindex + '.png';
          if (duihuaindex == 2) T.getAsset('2.mp3').play();
        }
        duihuaindex++;
      }
    })
    //时间到游戏结束
  var GameClear = T.Sprite.extend(
  {
    asset: 'clear.png',
    w: 353,
    h: 108,
    center:
    {
      x: 176,
      y: 54
    },
    x: 640,
    y: 300,
    z: 5,
    init: function()
    {
      this.oldw = this.w;
      this.oldh = this.h;
      this.oldcx = this.center.x;
      this.oldcy = this.center.y;
      this.on("added", function()
      {
        console.log("恭喜过关");
        this.w /= 10;
        this.h /= 10;
        this.center.x /= 10;
        this.center.y /= 10;
      });
      if (record == null) record = {};
      if (record.level == null) record.level = 1;
      if (record.level <= level) record.level = level + 1;
      setStorage();
    },
    update: function()
    {
      if (this.w < this.oldw)
      {
        this.w *= 1.1;
        this.h *= 1.1;
        this.center.x *= 1.1;
        this.center.y *= 1.1;
      }
      else
      {
        if (++level < maxlevel)
        {
          var next = new Button(
          {
            x: 690,
            y: 400,
            asset: 'next.png',
            w: 200,
            h: 100
          });
          next.down = function()
          {
            // if (level == 4)
            // {
            T.stageScene('newgame');
            // }
            // else
            // {
            //   T.stageScene('game');
            // }
          };
          this.parent.add(next);
        }
        var again = new Button(
        {
          x: 390,
          y: 400,
          asset: 'onceagain.png',
          w: 200,
          h: 100
        });
        this.parent.add(again);
        again.down = function()
        {
          level--;
          T.stageScene('game');
        };
        stage_g.pause();
      }
    }
  });

  var Lurenjia = AnimPlayer.extend(
  {
    timing: 0,
    w: 200,
    h: 280,
    init: function(ops)
    {
      this._super(ops);
      if (record.sex == 'boy')
      {
        this.setAnimSheet("sheet_nanhai", "nanhai");
      }
      else if (record.sex == 'girl')
      {
        this.setAnimSheet("sheet_nvhai", 'nvhai');
      }
    },
    action: function()
    {
      if (Math.floor(this.timing / 20) < 4) this.play('idle');
      else if (Math.floor(this.timing / 20) < 5) this.play("anim");
      else this.timing = 0;
      this.timing++;
    }
  });

  //开头动画
  var OP = T.Entity.extend(
  {
    time: 120,
    timing: 0,
    z: 10,
    x: 420,
    y: 50,
    init: function()
    {
      this.merge("frameAnim");
      this.setAnimSheet("sheet_kaipian", "kaipian");
      this.on("added", function()
      {
        this.parent.add(new T.Sprite(
        {
          asset: 'kaichang_b.png',
          w: 1280,
          h: 720,
          z: 5
        }));
        // this.parent.add(new T.Sprite({asset: 'kaichang_a.png', w: 1280, h: 720, z: 15}));
        var kcanim = new AnimPlayer(
        {
          z: 11,
          time: 28
        });
        kcanim.setAnimSheet("sheet_kcanim", "kcanim");
        var op = this;
        kcanim.action = function()
        {
          if (this.timing < this.time)
          {
            this.play("anim");
            this.timing++;
          }
          else
          {
            this.play("idle");
            op.timing++;
            if (op.timing == 1)
            {
              op.hdkj = new T.Sprite(
              {
                asset: 'heidaokeji.png',
                w: 290,
                h: 112,
                x: -300,
                y: 500,
                z: 15
              });
              this.parent.add(op.hdkj);
              op.hxgzs = new T.Sprite(
              {
                asset: 'huoxuangongzuoshi.png',
                w: 490,
                h: 61,
                x: 1300,
                y: 650,
                z: 15
              });
              this.parent.add(op.hxgzs);
            }
          }
        };
        this.parent.add(kcanim);
      });
    },
    update: function(dt)
    {
      this._super(dt);
      if (this.timing > 0)
      {
        if (this.timing > this.time)
        {
          T.stageScene('ready');
        }
        this.play('anim');
        if (this.hdkj.x < 465) this.hdkj.x += 13;
        if (this.hxgzs.x > 410) this.hxgzs.x -= 15;
      }
      else
      {
        this.play('idle');
      }
    }
  });

  //图片需要拼的一小部分
  var Part = T.Sprite.extend(
  {
    down: false,
    ok: false,
    movetarget: null,
    rw: null,
    rh: null,
    z: 10,
    ratio_w: 1,
    ratio_h: 1,
    wh: null,
    index: null,
    init: function(ops)
    {
      this._super(ops);
      this.oldw = this.w;
      this.oldh = this.h;
      this.oldcx = this.center.x;
      this.oldcy = this.center.y;
      if (this.w > 130) this.ratio_w = 130 / this.w;
      if (this.h > 150) this.ratio_h = 150 / this.h;
      this.w *= this.ratio_w;
      this.center.x *= this.ratio_w;
      this.h *= this.ratio_h;
      this.center.y *= this.ratio_h;
      this.audioen = T.getAsset(audio_en[level][this.index - 1]);
      this.on("down", function(e)
      {
        if (this.ok) return;
        if (stage_g.paused) return;
        this.down = true;
        this.w = this.oldw;
        this.h = this.oldh;
        this.center.x = this.oldcx;
        this.center.y = this.oldcy;
        this.x = e.pos.x;
        this.y = e.pos.y;
        this.z += 5;
        if (this.audioen != null) this.audioen.play();
      });
      if (level == 1 && this.index == 2)
      {
        this.dc = new T.Sprite(
        {
          asset: 'dcyashua.png',
          z: -5,
          w: 300,
          h: 200
        });
        stage_g.add(this.dc);
      }
      this.on("move", function(e)
      {
        if (!this.down) return;
        this.x = e.pos.x;
        this.y = e.pos.y;
        if (this.dc)
        {
          this.dc.z = 15;
          this.dc.x = this.x - 100;
          this.dc.y = this.y - 200;
        }
      });
      this.on("up", function()
      {
        if (this.ok) return;
        if (stage_g.paused) return;
        judgePosition(this);
        if (this.ok) return;
        this.down = false;
        this.x = this.oldx;
        this.y = this.oldy;
        this.w *= this.ratio_w;
        this.h *= this.ratio_h;
        this.center.x *= this.ratio_w;
        this.center.y *= this.ratio_h;
        this.z -= 5;
        if (this.dc) this.dc.z = -5;
      });
      this.audio = T.getAsset(audio_path[level][this.index - 1]);
    },
    //向目标移动
    update: function()
    {
      if (this.movetarget)
      {
        var b = this.movetarget;
        this.tx = b.x;
        this.ty = b.y;
        this.z = 3;
        var x_cha = Math.abs(this.x - b.x);
        var y_cha = Math.abs(this.y - b.y);
        var x_yd = 3;
        var y_yd = x_yd * (y_cha / x_cha);
        if (this.x > b.x + 2) this.x -= x_yd;
        if (this.x < b.x - 2) this.x += x_yd;
        if (this.y > b.y + 2) this.y -= y_yd;
        if (this.y < b.y - 2) this.y += y_yd;
        if (Math.abs(this.x - b.x) < 3 && Math.abs(this.y - b.y) < 3)
        {
          var anim = new AnimPlayer(
          {
            x: this.x,
            y: this.y,
            w: 177,
            h: 474,
            center:
            {
              x: 88,
              y: 237
            }
          });
          anim.setAnimSheet("sheet_buling", "buling");
          anim.action = function()
          {
            this.play('anim');
            if (this.timing > this.time) this.parent.remove(this);
            this.timing++;
          };
          this.parent.add(anim);
          this.movetarget = null;
          if (this.audio) this.audio.play();
          if (this.dc) this.parent.remove(this.dc);
          //过关检测
          if (picture_c.parts.length == 0) this.parent.add(new GameClear());
        }
      }
      if (this.ok)
      {
        this.x = this.tx;
        this.y = this.ty;
      }
    },
    setOldxy: function(x, y)
    {
      this.oldx = x;
      this.oldy = y;
      this.x = x;
      this.y = y;
    }
  });

  //图片，有空白的整张图片,空白处留着拼
  var Picture = T.Sprite.extend(
  {
    init: function(ops)
    {
      this._super(ops);
      this.on("added", function()
      {
        var stage = this.parent;
        var length, data;
        if (level == 0)
        {
          length = 8;
          if (record.sex == 'boy') data = data_g[0][0];
          else data = data_g[0][1];
        }
        else
        {
          length = data_g[level].length;
          data = data_g[level];
        }
        this.parts = [];
        var i, x, y, temp = [];
        for (i = 0; i < data.length; i++)
        {
          temp[i] = i;
        }
        temp.sort(function(a, b)
        {
          return Math.random() > 0.5 ? -1 : 1;
        });
        for (i = 0; i < length; i++)
        { //添加需要拼的数量个拼图
          if (level == 0)
          {
            if (record.weather == 'sun' && i < 4) this.parts.push(data[i]);
            else if (record.weather == 'rain' && i > 3) this.parts.push(data[i]);
          }
          else this.parts.push(data[i]);
          var part = new Part(data[temp[i]]);
          x = 140 * (i % 2) + 70;
          y = 180 * Math.floor(i / 2) + 100;
          part.setOldxy(x, y);
          stage.add(part);
        }
        i = length;
        for (; i < length; i++)
        { //不需要拼的全部显示出来
          var qita = new T.Sprite(data[i]);
          qita.z = 2;
          stage.add(qita);
        }
      });
    }
  });

  var Text = T.CText.extend(
  {
    size: 40,
    width: 400,
    init: function()
    {
      var text, ops;
      // switch ()
      // {
      //   case 0:
      //     text = '';
      //     ops = {};
      //     break;
      // }
      this._super(text, ops);
      this.setSize(this.size);
      this.maxrow = Math.ceil(text.length * this.size / this.width);
      if (this.maxrow > 1)
      {
        this.numperrow = this.width / this.size;
        this.texts = [];
        for (var i = 0; i < this.maxrow; i++)
        {
          this.texts[i] = text.substr(i * this.numperrow, this.numperrow);
        }
      }
    },
    render: function(ctx)
    {
      if (!ctx)
      {
        ctx = this.ctx;
      }
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation * Math.PI / 180);
      ctx.scale(this.scale.x, this.scale.y);
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.textAlign = this.align;
      ctx.textBaseline = this.baseline;
      ctx.font = this._rfont;
      if (this.maxrow < 2) ctx.fillText(this._text, 0, 0);
      else
      {
        for (var i = 0; i < this.maxrow; i++)
        {
          ctx.fillText(this.texts[i], 0, i * this.size);
        }
      }
      ctx.restore();
      this.emit("render", ctx);
    }
  });

  var ChooseLevel = T.Sprite.extend(
  {
    asset: 'xuanzebeijing.png',
    w: 1280,
    h: 720,
    init: function()
    {
      this.on("added", function()
      {
        var stage = this.parent;
        level = record.level;
        level = 1;
        if (level == null) level = 0;
        stage.add(new T.Sprite(
        {
          asset: 'diertian.png',
          w: 550,
          h: 423,
          x: 830,
          y: 300,
          alpha: 0.9
        }));
        stage.add(new T.Sprite(
        {
          asset: 'diertian.png',
          w: 550,
          h: 423,
          x: -50,
          y: 300,
          alpha: 0.9
        }));
        stage.add(new T.Sprite(
        {
          asset: record.sex == 'boy' ? 'diyitian_nan.png' : 'diyitian_nv.png',
          w: 643,
          h: 481,
          x: 300,
          y: 150
        }));
        var d1g = new Button(
        {
          w: 192,
          h: 100,
          x: 640,
          y: 235
        });
        d1g.down = function()
        {
          level = 0;
          T.stageScene('newgame');
        };
        stage.add(d1g);
        var d2g = new Button(
        {
          w: 192,
          h: 100,
          asset: level < 1 ? record.sex == 'boy' ? 'd2gn.png' : 'd2gnv.png' : null,
          x: 640,
          y: 358
        });
        d2g.down = function()
        {
          if (this.asset) return;
          level = 1;
          T.stageScene('game');
        };
        stage.add(d2g);
        var d3g = new Button(
        {
          w: 192,
          h: 100,
          asset: level < 2 ? 'd3g.png' : null,
          x: 403,
          y: 358
        });
        d3g.down = function()
        {
          if (this.asset) return;
          level = 2;
          T.stageScene('game');
        };
        stage.add(d3g);
        var d4g = new Button(
        {
          w: 192,
          h: 100,
          asset: level < 3 ? 'd4g.png' : null,
          x: 405,
          y: 485
        });
        d4g.down = function()
        {
          if (this.asset) return;
          level = 3;
          T.stageScene('game');
        };
        stage.add(d4g);
        var d5g = new Button(
        {
          w: 192,
          h: 100,
          asset: level < 4 ? 'd5g.png' : null,
          x: 640,
          y: 485
        });
        d5g.down = function()
        {
          if (this.asset) return;
          level = 4;
          T.stageScene('game');
        };
        stage.add(d5g);
        var fanhui = new Button(
        {
          asset: 'fanhuianniu.png',
          w: 100,
          h: 100,
          x: 1180
        });
        fanhui.down = function()
        {
          T.stageScene('ready');
        };
        stage.add(fanhui);
      });
    }
  });
  //(2)场景

  //加载，显示吉祥物
  T.scene("load", new T.Scene(function(stage)
  {
    stage.add(new OP());
  },
  {
    sort: true
  }));

  //待机场景
  T.scene("ready", new T.Scene(function(stage)
  {
    stage.merge('interactive');
    duihuaindex = 0;
    var bg = new T.Sprite(
    {
      asset: 'bg_ready.png',
      w: 1280,
      h: 720
    });
    stage.add(bg);
    var gs = new Button(
    {
      asset: 'game_start.png',
      w: 272,
      h: 105,
      x: 300,
      y: 500
    });
    stage.add(gs);
    gs.down = function()
    {
      level = 0;
      if (record == null) record = {};
      stage.remove(this);
      stage.remove(gc);
      // var nanhai=new AnimPlayer({x:300,y:300,w:250,h:350});
      // nanhai.setAnimSheet("sheet_nanhai","nanhai");
      // stage.add(nanhai);
      var nanhai = new T.Sprite(
      {
        asset: 'gs_nan.png',
        w: 172,
        h: 200,
        x: 550,
        y: 400
      });
      nanhai.on("down", function()
      {
        record.sex = 'boy';
        setStorage();
        duihuaindex = 1;
        T.stageScene('newgame');
      });
      stage.add(nanhai);
      var boy = new AnimPlayer(
      {
        y: 280,
        x: 550,
        w: 200,
        h: 130
      });
      boy.setAnimSheet("sheet_boy", 'boy');
      stage.add(boy);
      // var nvhai=new AnimPlayer({x:800,y:300,w:200,h:350});
      // nvhai.setAnimSheet("sheet_nvhai","nvhai");
      // stage.add(nvhai);
      var nvhai = new T.Sprite(
      {
        asset: 'gs_nv.png',
        w: 172,
        h: 200,
        x: 900,
        y: 400
      });
      nvhai.on("down", function()
      {
        record.sex = 'girl';
        setStorage();
        duihuaindex = 1;
        T.stageScene('newgame');
      });
      stage.add(nvhai);
      var girl = new AnimPlayer(
      {
        x: 900,
        y: 280,
        w: 200,
        h: 130
      });
      girl.setAnimSheet("sheet_girl", 'girl');
      stage.add(girl);
    };
    var gc = new Button(
    {
      asset: 'game_continue.png',
      w: 272,
      h: 105,
      x: 700,
      y: 500
    });
    stage.add(gc);
    gc.down = function()
    {
      level = record.level;
      if (level == null)
      {
        T.stageScene('newgame');
      }
      else
      {
        T.stageScene('xuanguan');
      }
    };
    var title = new AnimPlayer(
    {
      w: 400,
      h: 160,
      x: 370,
      y: 40
    });
    title.setAnimSheet("sheet_title", 'title');
    title.action = function()
    {
      this.play('anim');
    };
    stage.add(title);
  },
  {
    sort: true
  }));

  T.scene('xuanguan', new T.Scene(function(stage)
  {
    stage.merge('interactive');
    stage.add(new ChooseLevel());
  }));

  T.scene('newgame', new T.Scene(function(stage)
  {
    stage.merge('interactive');
    var bg = new BG();
    if (level == 0)
    {
      record.weather = Math.random() > 0.5 ? 'sun' : 'rain';
      setStorage();
      if (record.sex == 'boy')
      {
        if (record.weather == 'sun')
        {
          if (duihuaindex == 1) bg.asset = 'bg0_boy_sunny.png';
          else if (duihuaindex == 2) bg.asset = 'bg1nr.png';
        }
        else if (record.weather == 'rain')
        {
          if (duihuaindex == 1) bg.asset = 'bg0_boy_rain.png';
          else if (duihuaindex == 2) bg.asset = 'bg1nl.png';
        }
      }
      else if (record.sex == 'girl')
      {
        if (record.weather == 'sun')
        {
          if (duihuaindex == 1) bg.asset = 'bg0_girl_sunny.png';
          else if (duihuaindex == 2) bg.asset = 'bg1nvr.png';
        }
        else if (record.weather == 'rain')
        {
          if (duihuaindex == 1) bg.asset = 'bg0_girl_rain.png';
          else if (duihuaindex == 2) bg.asset = 'bg1nvl.png';
        }
      }
    }
    else if (level == 1)
    {
      if (record.sex == 'boy') bg.asset = 'bg2_boy.png';
      else bg.asset = 'bg2_girl.png';
    }
    else if (level == 2)
    {
      bg.asset = 'bg3.png';
    }
    else if (level == 3)
    {
      bg.asset = 'bg4.png';
    }
    else if (level == 4)
    {
      bg.asset = 'cj5.png';
    }
    bg.down = function()
    {
      if (duihuaindex == 2) T.stageScene('newgame');
      else T.stageScene('game');
    };
    stage.add(bg);
    var xiaolu = new AnimPlayer(
    {
      w: 400,
      h: 567,
      x: 1500,
      y: 620,
      center:
      {
        x: 200,
        y: 283
      },
      rotation: -30
    });
    if (record.sex == 'boy') xiaolu.setAnimSheet("sheet_kaipian", "kaipian");
    else xiaolu.setAnimSheet('sheet_nvhai', 'nvhai');
    xiaolu.action = function()
    {
      if (this.x > 1120) this.x -= 10;
      else if (!this.open)
      {
        this.open = true;
        this.parent.add(new Duihuakuang());
      }
      this.play('anim');
    };
    stage.add(xiaolu);
  },
  {
    sort: true
  }));
  //游戏场景
  T.scene("game", new T.Scene(function(stage)
  {
    stage.merge('interactive');
    stage_g = stage;
    stage.add(new Background());
    picture_c = new Picture();
    stage.add(picture_c);
    var fanhui = new Button(
    {
      asset: 'fanhuianniu.png',
      w: 100,
      h: 100,
      x: 1180
    });
    fanhui.down = function()
    {
      T.stageScene('ready');
    };
    stage.add(fanhui);
    T.input.on('enter', function()
    {
      if (!stage.paused) stage.pause();
      else stage.unpause();
    });
  },
  {
    sort: true
  }));

  ////(3)加载资源
  T.load(['bg_ready.png', 'clear.png', 'effect.png', 'buling.png', 'onceagain.png', 'next.png', 'fanhuianniu.png', 'bg3.png', '2_1.png', '2_3.png', '2_4.png', '2_5.png', '2_6.png', 'bg4.png', 'kaipian.png', 'heidaokeji.png', 'huoxuangongzuoshi.png', 'kaichang_a.png', 'kaichang_b.png', 'kaichang_anim.png', 'xz_nanhai.png', 'xz_nvhai.png', 'game_start.png', 'game_continue.png', "bg0_boy_sunny.png", "bg0_boy_rain.png", "bg0_girl_rain.png", "bg0_girl_sunny.png", '2g1.png', '2g2.png', '2g3.png', '2g4.png', '2g5.png', '2g6.png', '2g7.png', 'bg2_boy.png', 'bg2_girl.png', 'bg1nr.png', 'bg1nl.png', 'bg1nvl.png', 'bg1nvr.png', '1_nr1.png', '1_nr2.png', '1_nr3.png', '1_nr4.png', '1_nl1.png', '1_nl2.png', '1_nl3.png', '1_nl4.png', '1_nvr1.png', '1_nvr2.png', '1_nvr3.png', '1_nvr4.png', '1_nvl1.png', '1_nvl2.png', '1_nvl3.png', '1_nvl4.png', 'gs_nan.png', 'gs_nv.png', '4_1.png', '4_2.png', '4_4.png', '4_6.png', 'changjinglu.mp3', 'daishu.mp3', 'en_changjinglu.mp3', 'en_daishu.mp3', 'en_houzi.mp3', 'en_xiong.mp3', 'houzi.mp3', 'huo3che.mp3', 'huo4che.mp3', 'lang.mp3', 'qiche.mp3', 'qichuang.mp3', 'xiong.mp3', 'cj5.png', 'bg5.png', 'bg5_nainai.png', '5_1.png', '5_2.png', '5_3.png', '5_4.png', '5_6.png', '5_7.png', 'title.png', 'jiantou.png', 'd2gn.png', 'd2gnv.png', 'd3g.png', 'd4g.png', 'd5g.png', 'diertian.png', 'diyitian_nan.png', 'diyitian_nv.png', 'xuanzebeijing.png', 'nanhai.png', 'nvhai.png', 'dh1yu.png', 'dh1qing.png', 'dh2.png', 'dh3.png', 'dh4.png', 'dh5.png', 'dh6.png', 'dh7.png', 'dh8.png', 'dcyashua.png', '1qing.mp3', '1yu.mp3', '2.mp3'],
    function()
    {
      T.sheet("sheet_effect", "effect.png",
      {
        tw: 142,
        th: 142
      });
      T.sheet("sheet_buling", "buling.png",
      {
        tw: 177,
        th: 474
      });
      T.sheet("sheet_kaipian", "kaipian.png",
      {
        tw: 400,
        th: 567
      });
      T.sheet("sheet_kcanim", "kaichang_anim.png",
      {
        tw: 1280,
        th: 720
      });
      T.sheet("sheet_nanhai", "xz_nanhai.png",
      {
        tw: 483,
        th: 697
      });
      T.sheet("sheet_nvhai", "xz_nvhai.png",
      {
        tw: 406,
        th: 697
      });
      T.sheet("sheet_title", "title.png",
      {
        tw: 509,
        th: 207
      });
      T.sheet("sheet_boy", "nanhai.png",
      {
        tw: 501,
        th: 360
      });
      T.sheet("sheet_girl", "nvhai.png",
      {
        tw: 501,
        th: 363
      });
      _.each([
        ["effect",
        {
          anim:
          {
            frames: _.range(0, 5),
            rate: 1 / 4
          }
        }],
        ["buling",
        {
          anim:
          {
            frames: _.range(0, 6),
            rate: 1 / 5
          }
        }],
        ["kaipian",
        {
          anim:
          {
            frames: _.range(0, 5),
            rate: 1 / 3
          },
          idle:
          {
            frames: [0],
            rate: 1
          }
        }],
        ["kcanim",
        {
          anim:
          {
            frames: _.range(0, 6),
            rate: 1 / 5
          },
          idle:
          {
            frames: [5],
            rate: 1
          }
        }],
        ["nanhai",
        {
          anim:
          {
            frames: _.range(0, 4),
            rate: 1 / 3
          }
        }],
        ["nvhai",
        {
          anim:
          {
            frames: _.range(0, 4),
            rate: 1 / 3
          }
        }],
        ["boy",
        {
          anim:
          {
            frames: _.range(1, 4),
            rate: 1 / 3
          }
        }],
        ["girl",
        {
          anim:
          {
            frames: _.range(1, 4),
            rate: 1 / 3
          }
        }],
        ["title",
        {
          anim:
          {
            frames: _.range(0, 3),
            rate: 1 / 2
          }
        }]
      ], function(anim)
      {
        T.fas(anim[0], anim[1]);
      });
      record = JSON.parse(localStorage.getItem("record"));
      maxlevel = data_g.length;
      window.setTimeout(function()
      {
        // level = 3;
        T.stageScene('load');
      }, 300);
      T.input.on('x', function()
      {
        T.stageScene('ready');
      });
    }
  );


  //(4)函数

  //碰撞函数,p传要拼的能移动的那个部分，b传不会动的空白
  function contact(p, b)
  {
    var px = p.x - ((p.rw || p.w) / 2 - 20);
    var pxx = p.x + ((p.rw || p.w) / 2 - 20);
    var py = p.y - ((p.rh || p.h) / 2 - 20);
    var pyy = p.y + ((p.rh || p.h) / 2 - 20);
    var bx = b.x - ((b.rw || b.w) / 2 - 20);
    var bxx = b.x + ((b.rw || b.w) / 2 - 20);
    var by = b.y - ((b.rh || b.h) / 2 - 20);
    var byy = b.y + ((b.rh || b.h) / 2 - 20);
    return !(pxx <= bx || pyy <= by || px >= bxx || py >= byy);
  }

  //判断是不是相同的东西，判断碰撞没,p传要拼的能移动的那个部分，b传不会动的空白
  function isThisPart(p, b)
  {
    if (level == 0) return (p.wh == b.wh && p.index == b.index && contact(p, b));
    return (p.index == b.index && contact(p, b));
  }

  //判断位置，能否贴上
  function judgePosition(p)
  {
    var parts = picture_c.parts,
      i;
    for (i = 0; i < parts.length; i++)
    {
      if (isThisPart(p, parts[i]))
      {
        p.movetarget = parts[i];
        p.down = false;
        p.ok = true;
        picture_c.parts.splice(i, 1); //拼好的就移除
        return;
      }
    }
  }

  function setStorage()
  {
    localStorage.setItem("record", JSON.stringify(record));
  }
};