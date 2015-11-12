var pixelRatio = window.devicePixelRatio ? window.devicePixelRatio : 2;
var info_screen = {
	w: 1280,
	h: 720
};
var info_screen0 = {
	w: window.innerWidth,
	h: window.innerHeight
};
//判断是否是移动端
var bro = function () {
	var browser = navigator.userAgent;
	var result = browser.indexOf('Android') || browser.indexOf('iPhone') || browser.indexOf('iPad') || browser.indexOf('Mobile');
	if (result > -1) return true;
	return false;
}();
if (bro) {
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
var main = function () {
	var T = Tina().requires("Input,Sprites,Scenes,Text,Entities")
		.setup("canvas", {
			width: info_screen0.w,
			height: info_screen0.h,
			pixelRatio: pixelRatio,
			scale: {
				x: sc_x,
				y: sc_y
			}
		})
		.controls();

	var picture_c, stage_g, level, down_g = false, part_g, maxlevel, record, bgmusic, duihuaindex, clear_g, addedclear;
	var data_g = [
		[
			[{
				asset: '1_nr1.png',
				w: 138,
				h: 130,
				center: {
					x: 69,
					y: 65
				},
				wh: 'sun',
				index: 1,
				x: 822,
				y: 617
			}, {
				asset: '1_nr2.png',
				w: 87,
				h: 62,
				center: {
					x: 43,
					y: 31
				},
				wh: 'sun',
				index: 2,
				x: 936,
				y: 528
			}, {
				asset: '1_nr3.png',
				w: 81,
				h: 64,
				center: {
					x: 40,
					y: 32
				},
				wh: 'sun',
				index: 3,
				x: 1140,
				y: 605
			}, {
				asset: '1_nr4.png',
				w: 185,
				h: 166,
				center: {
					x: 92,
					y: 83
				},
				wh: 'sun',
				index: 4,
				x: 770,
				y: 458
			}, {
				asset: '1_nl1.png',
				w: 152,
				h: 184,
				center: {
					x: 76,
					y: 92
				},
				wh: 'rain',
				index: 5,
				x: 815,
				y: 610
			}, {
				asset: '1_nl2.png',
				w: 91,
				h: 73,
				center: {
					x: 45,
					y: 36
				},
				wh: 'rain',
				index: 6,
				x: 920,
				y: 500
			}, {
				asset: '1_nl3.png',
				w: 100,
				h: 74,
				center: {
					x: 50,
					y: 37
				},
				wh: 'rain',
				index: 7,
				x: 1150,
				y: 614
			}, {
				asset: '1_nl4.png',
				w: 238,
				h: 182,
				center: {
					x: 119,
					y: 91
				},
				wh: 'rain',
				index: 8,
				x: 744,
				y: 445
			}],
			[{
				asset: '1_nvr1.png',
				w: 118,
				h: 124,
				center: {
					x: 59,
					y: 62
				},
				wh: 'sun',
				index: 1,
				x: 821,
				y: 609
			}, {
				asset: '1_nvr2.png',
				w: 85,
				h: 53,
				center: {
					x: 42,
					y: 26
				},
				wh: 'sun',
				index: 2,
				x: 915,
				y: 518
			}, {
				asset: '1_nvr3.png',
				w: 62,
				h: 51,
				center: {
					x: 31,
					y: 25
				},
				wh: 'sun',
				index: 3,
				x: 1137,
				y: 625
			}, {
				asset: '1_nvr4.png',
				w: 152,
				h: 154,
				center: {
					x: 76,
					y: 77
				},
				wh: 'sun',
				index: 4,
				x: 770,
				y: 448
			}, {
				asset: '1_nvl1.png',
				w: 150,
				h: 173,
				center: {
					x: 75,
					y: 86
				},
				wh: 'rain',
				index: 5,
				x: 895,
				y: 610
			}, {
				asset: '1_nvl2.png',
				w: 80,
				h: 77,
				center: {
					x: 40,
					y: 38
				},
				wh: 'rain',
				index: 6,
				x: 930,
				y: 475
			}, {
				asset: '1_nvl3.png',
				w: 81,
				h: 61,
				center: {
					x: 40,
					y: 30
				},
				wh: 'rain',
				index: 7,
				x: 1122,
				y: 590
			}, {
				asset: '1_nvl4.png',
				w: 179,
				h: 203,
				center: {
					x: 89,
					y: 101
				},
				wh: 'rain',
				index: 8,
				x: 758,
				y: 458
			}]
		],
		[{
			asset: '2g1.png',
			w: 155,
			h: 189,
			center: {
				x: 77,
				y: 94
			},
			index: 1,
			x: 445,
			y: 420
		}, {
			asset: '2g2.png',
			w: 155,
			h: 189,
			center: {
				x: 77,
				y: 94
			},
			index: 2,
			x: 483,
			y: 390
		}, {
			asset: '2g3.png',
			w: 150,
			h: 128,
			center: {
				x: 75,
				y: 64
			},
			index: 3,
			x: 603,
			y: 420
		}, {
			asset: '2g4.png',
			w: 150,
			h: 128,
			center: {
				x: 75,
				y: 64
			},
			index: 4,
			x: 875,
			y: 465
		}, {
			asset: '2g5.png',
			w: 115,
			h: 77,
			center: {
				x: 57,
				y: 38
			},
			index: 5,
			x: 770,
			y: 458
		}, {
			asset: '2g6.png',
			w: 130,
			h: 77,
			center: {
				x: 65,
				y: 38
			},
			index: 6,
			x: 1060,
			y: 407
		}, {
			asset: '2g7.png',
			w: 225,
			h: 118,
			center: {
				x: 112,
				y: 59
			},
			index: 7,
			x: 1138,
			y: 430
		}],
		[{
			asset: '3_changjinglu.png',
			w: 306,
			h: 487,
			center: {
				x: 153,
				y: 243
			},
			index: 1,
			x: 522,
			y: 346
		},
			{
				asset: '3_daishu.png',
				w: 293,
				h: 397,
				center: {
					x: 146,
					y: 198
				},
				index: 2,
				x: 787,
				y: 505
			}, {
			asset: '3_houzi.png',
			w: 146,
			h: 204,
			center: {
				x: 73,
				y: 102
			},
			index: 3,
			x: 698,
			y: 212
		}, {
			asset: '3_lang.png',
			w: 182,
			h: 221,
			center: {
				x: 91,
				y: 110
			},
			index: 4,
			x: 955,
			y: 265
		}, {
			asset: '3_xiong.png',
			w: 218,
			h: 338,
			center: {
				x: 109,
				y: 169
			},
			index: 5,
			x: 1083,
			y: 531
		}
		],
		[
			{
				asset: '4_gaotie.png', w: 196, h: 82, center: {x: 98, y: 41}, index: 1, x: 1185, y: 270
			},
			{
				asset: '4_gongjiaoche.png', w: 215, h: 109, center: {x: 107, y: 54}, index: 2, x: 495, y: 238
			},
			{
				asset: '4_jiaoche.png', w: 256, h: 204, center: {x: 128, y: 102}, index: 3, x: 575, y: 535
			},
			{
				asset: '4_jingche.png', w: 199, h: 117, center: {x: 99, y: 58}, index: 4, x: 891, y: 254
			},
			{
				asset: '4_xiaofangche.png',
				w: 453,
				h: 234,
				center: {
					x: 226,
					y: 117
				},
				index: 5,
				x: 1029,
				y: 568
			}, {
			asset: '4_zixingche.png',
			w: 144,
			h: 106,
			center: {
				x: 72,
				y: 53
			},
			index: 6,
			x: 803,
			y: 354
		}
		],
		[{
			asset: '5_1.png',
			w: 112,
			h: 81,
			center: {
				x: 56,
				y: 40
			},
			index: 1,
			x: 896,
			y: 263
		}, {
			asset: '5_2.png',
			w: 70,
			h: 54,
			center: {
				x: 35,
				y: 27
			},
			index: 2,
			x: 570,
			y: 477
		}, {
			asset: '5_3.png',
			w: 133,
			h: 90,
			center: {
				x: 66,
				y: 45
			},
			index: 3,
			x: 750,
			y: 535
		}, {
			asset: '5_4.png',
			w: 153,
			h: 91,
			center: {
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
				center: {
					x: 87,
					y: 76
				},
				index: 5,
				x: 983,
				y: 558
			}, {
			asset: '5_7.png',
			w: 104,
			h: 103,
			center: {
				x: 52,
				y: 51
			},
			index: 6,
			x: 495,
			y: 432
		}
		]
	];
	var audio_path = [
		[], [], [null, 'daishu.mp3', 'houzi.mp3', 'lang.mp3', 'xiong.mp3'],
		['huo3che.mp3', 'huo4che.mp3', 'qiche.mp3', 'jingche.mp3'], []
	];
	var audio_en = [
		[],
		[],
		['en_changjinglu.mp3', 'en_daishu.mp3', 'en_houzi.mp3', null, 'en_xiong.mp3'],
		[],
		['en_quanjiafu.mp3', null, 'en_maoxian.mp3', 'en_maomi.mp3', 'en_tanzi.mp3', 'en_maoyi.mp3']
	];
	var dcimg = [
		['dckuzi.png', 'dcwazi.png', 'dcxiezi.png', 'dcyifu.png', 'dckuzi.png', 'dcwazi.png', 'dcxiezi.png', 'dcyifu.png'],
		['dcyagao.png', 'dcyashua.png', 'dccup.png', 'dcshuzi.png', 'dcxiangzao.png', 'dcreshui.png', 'dcmaojin.png'],
		['dcchangjinglu.png', 'dcdaishu.png', 'dchouzi.png', 'dclang.png', 'dcxiong.png'],
		['dcgaotie.png', 'dcgongjiaoche.png', 'dcjiaoche.png', 'dcjingche.png', 'dcxiaofangche.png', 'dczixingche.png'],
		['dcquanjiafu.png', 'dccup.png', 'dcmaoxiantuan.png', 'dcmaomi.png', 'dctanzi.png', 'dcmaoyi.png']
	];

	//动画播放
	var AnimPlayer = T.Entity.extend({
		time: 33, timing: 0, z: 110, open: false, added: false,
		init: function (ops) {
			this._super(ops);
			this.merge("frameAnim");
			this.on("down", function () {
				this.down();
			});
		},
		update: function (dt) {
			this._super(dt);
			this.action();
		},
		action: function () {
			this.play("anim");
		},
		down: function () {
		}
	});
	//按钮
	var Button = T.Sprite.extend({
		z: 10,
		init: function (ops) {
			this._super(ops);
			this.on("down", function () {
				this.down();
			});
		},
		down: function () {
		}
	});
	//背景,每关的拼图背景在此处设置
	var Background = T.Sprite.extend({
		init: function () {
			switch (level) {
				case 0:
					var bg = new BG();
					if (record.sex == 'boy') {
						if (record.weather == 'sun') bg.asset = 'bg1nr.png';
						else if (record.weather == 'rain') bg.asset = 'bg1nl.png';
					} else if (record.sex == 'girl') {
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
					stage_g.add(new T.Sprite({
						asset: 'bg3.png',
						w: 1280,
						h: 720
					}));
					break;
				case 3:
					stage_g.add(new T.Sprite({
						asset: 'bg4.png',
						w: 1280,
						h: 720
					}));
					break;
				case 4:
					stage_g.add(new BG('bg5.png'));
					stage_g.add(new BG('bg5_nainai.png', {
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
	//通用背景
	var BG = T.Sprite.extend({
		w: 1280,
		h: 720,
		time: 0,
		timing: 0,
		init: function (asset, ops) {
			if (asset != null) this.asset = asset;
			this._super(ops);
			this.on('down', function (e) {
				this.down(e);
			});
		},
		update: function (dt) {
			this._super(dt);
			this.action();
		},
		action: function () {
		},
		down: function (e) {
		}
	});

	var ChooseLevel = T.Sprite.extend({
		asset: 'xuanzebeijing.png',
		w: 1280,
		h: 720,
		init: function () {
			this.on("added", function () {
				var stage = this.parent;
				level = record.level;
				if (level == null) level = 0;
				stage.add(new T.Sprite({
					asset: 'diertian.png',
					w: 550,
					h: 423,
					x: 830,
					y: 300,
					z: 1,
					alpha: 0.9
				}));
				stage.add(new T.Sprite({
					asset: 'diertian.png',
					w: 550,
					h: 423,
					x: -50,
					y: 300,
					z: 1,
					alpha: 0.9
				}));
				stage.add(new T.Sprite({
					asset: record.sex == 'boy' ? 'diyitian_nan.png' : 'diyitian_nv.png',
					w: 643,
					h: 481,
					x: 300,
					y: 150,
					z: 2
				}));
				var d1g = new Button({
					w: 192,
					h: 100,
					x: 640,
					y: 235
				});
				d1g.down = function () {
					level = 0;
					duihuaindex = 1;
					T.stageScene('newgame');
				};
				stage.add(d1g);
				var d2g = new Button({
					w: 192,
					h: 100,
					asset: level < 1 ? record.sex == 'boy' ? 'd2gn.png' : 'd2gnv.png' : null,
					x: 640,
					y: 358
				});
				d2g.down = function () {
					if (this.asset) return;
					level = 1;
					duihuaindex = 3;
					T.stageScene('newgame');
				};
				stage.add(d2g);
				var d3g = new Button({
					w: 192,
					h: 100,
					asset: level < 2 ? 'd3g.png' : null,
					x: 403,
					y: 358
				});
				d3g.down = function () {
					if (this.asset) return;
					level = 2;
					duihuaindex = 4;
					T.stageScene('newgame');
				};
				stage.add(d3g);
				var d4g = new Button({
					w: 192,
					h: 100,
					asset: level < 3 ? 'd4g.png' : null,
					x: 405,
					y: 485
				});
				d4g.down = function () {
					if (this.asset) return;
					level = 3;
					duihuaindex = 6;
					T.stageScene('newgame');
				};
				stage.add(d4g);
				var d5g = new Button({
					w: 192,
					h: 100,
					asset: level < 4 ? 'd5g.png' : null,
					x: 640,
					y: 485
				});
				d5g.down = function () {
					if (this.asset) return;
					level = 4;
					duihuaindex = 7;
					T.stageScene('newgame');
				};
				stage.add(d5g);
				var fanhui = new Button({
					asset: 'fanhuianniu.png',
					w: 100,
					h: 100,
					x: 1180
				});
				fanhui.down = function () {
					T.stageScene('ready');
				};
				stage.add(fanhui);
				stage.add(new T.Sprite({asset: 'jiantou.png', w: 285, h: 246, x: 480, y: 320}));
			});
		}
	});

	var Duihuakuang = T.Sprite.extend({
		w: 400,
		h: 260,
		x: 780,
		y: 300,
		z: 120,
		over: false,
		volume: 0.4,
		init: function () {
			switch (duihuaindex) {
				case 1:
					if (record.weather == 'sun') {
						this.asset = 'dh1qing.png';
						this.yuyin = T.getAsset('1qing.mp3');
						if (this.yuyin) {
							bgmusic.volume = this.volume;
							this.yuyin.play();
						}
					} else {
						this.asset = 'dh1yu.png';
						this.yuyin = T.getAsset('1yu.mp3');
						if (this.yuyin) {
							bgmusic.volume = this.volume;
							this.yuyin.play();
						}
					}
					break;
			}
			if (duihuaindex > 1) {
				this.asset = 'dh' + duihuaindex + '.png';
				this.yuyin = T.getAsset(duihuaindex + '.mp3');
				if (this.yuyin) {
					bgmusic.volume = this.volume;
					this.yuyin.play();
				}
			}
			duihuaindex++;
		},
		update: function () {
			if (this.yuyin && this.yuyin.currentTime && this.yuyin.ended) {
				this.over = true;
				if (bgmusic.volume <= 0.9)    bgmusic.volume += 0.1;
			}
		}
	});
	//游戏完成
	var GameClear = T.Sprite.extend({
		asset: 'clear.png', w: 353, h: 108, center: {
			x: 176,
			y: 54
		}, x: 640, y: 300, z: 5, added: false,
		init: function () {
			clear_g = true;
			this.oldw = this.w;
			this.oldh = this.h;
			this.oldcx = this.center.x;
			this.oldcy = this.center.y;
			this.on("added", function () {
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
			level++;
		},
		update: function () {
			if (this.w < this.oldw) {
				this.w *= 1.1;
				this.h *= 1.1;
				this.center.x *= 1.1;
				this.center.y *= 1.1;
			} else if (!this.added) {
				this.added = true;
				if (level < maxlevel) {
					var next = new Button({
						x: 690,
						y: 400,
						asset: 'next.png',
						w: 200,
						h: 100
					});
					next.down = function () {
						T.stageScene('newgame');
					};
					this.parent.add(next);
				} else {
					this.parent.add(new Lurenjia());
				}
				var again = new Button({
					x: 390,
					y: 400,
					asset: 'onceagain.png',
					w: 200,
					h: 100
				});
				this.parent.add(again);
				again.down = function () {
					level--;
					T.stageScene('game');
				};
			}
		}
	});

	var Lurenjia = AnimPlayer.extend({
		timing: 0,
		w: 400,
		h: 567,
		x: 1500,
		y: 620,
		tx: 1150,
		center: {
			x: 200,
			y: 283
		},
		rotation: -30,
		over: false,
		init: function (ops) {
			this._super(ops);
			if (record.sex == 'boy') {
				this.setAnimSheet("sheet_nanhai", "nanhai");
			} else if (record.sex == 'girl') {
				this.setAnimSheet("sheet_nvhai", 'nanhai');
			}
		},
		action: function () {
			if (this.x > this.tx) this.x -= 10;
			else if (!this.open) {
				this.open = true;
				this.dh = new Duihuakuang();
				this.parent.add(this.dh);
			}
			if (Math.floor(this.timing / 20) < 4) this.play('idle');
			else if (Math.floor(this.timing / 20) < 5) this.play("anim");
			else this.timing = 0;
			this.timing++;
			if (this.dh && this.dh.over) this.over = true;
		}
	});
	//开头动画
	var OP = T.Entity.extend({
		time: 120, //set how long goto t.scene('ready')
		timing: 0,
		z: 10,
		x: 420,
		y: 50,
		init: function () {
			this.merge("frameAnim");
			this.setAnimSheet("sheet_kaipian", "kaipian");
			this.on("added", function () {
				this.parent.add(new T.Sprite({
					asset: 'kaichang_b.png',
					w: 1280,
					h: 720,
					z: 5
				}));
				this.hdkj = new T.Sprite({
					asset: 'heidaokeji.png', w: 290, h: 112, x: -350, y: 500, z: 15
				});
				this.parent.add(this.hdkj);
				this.hxgzs = new T.Sprite({
					asset: 'huoxuangongzuoshi.png', w: 490, h: 61, x: 1350, y: 650, z: 15
				});
				this.parent.add(this.hxgzs);
				this.kcanim = new AnimPlayer({
					z: 11, time: 40 //set how long animplay
				});
				this.kcanim.setAnimSheet("sheet_kcanim", "kcanim");
				this.kcanim.action = function () {
					if (this.timing == 0) {
						this.play('ready');
					} else if (this.timing < this.time) {
						this.play("anim");
						this.timing++;
					} else {
						this.play("idle");
					}
				};
				this.parent.add(this.kcanim);
			});
		},
		update: function (dt) {
			this._super(dt);
			this.timing++;
			if (this.timing > this.time) {
				T.stageScene('ready');
			}
			this.play('anim');
			if (this.hdkj.x < 465) {
				this.hdkj.x += 16;
				//console.log('hd');
			}
			if (this.hxgzs.x > 410) {
				this.hxgzs.x -= 19;
				//console.log("hx");
			}
			if (this.timing == 8)this.kcanim.timing = 1;
		}
	});
	//图片需要拼的一小部分
	var Part = T.Sprite.extend({
		ok: false, movetarget: null, rw: null, rh: null, z: 10, ratio_w: 1,
		ratio_h: 1, wh: null, index: null, volume: 0.1, x_yd: 3,
		init: function (ops) {
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
			this.audio = T.getAsset(audio_path[level][this.index - 1]);
			this.on("down", function (e) {
				if (this.ok) return;
				down_g = true;
				part_g = this;
				this.w = this.oldw;
				this.h = this.oldh;
				this.center.x = this.oldcx;
				this.center.y = this.oldcy;
				this.x = e.pos.x;
				this.y = e.pos.y;
				this.z += 5;
				if (this.audioen) {
					bgmusic.volume = this.volume;
					this.audioen.play();
				}
				if (this.dc) {
					this.dc.z = 15;
					this.dc.x = this.x;
					this.dc.y = this.y - (this.h + this.dc.h) / 2;
				}
			});
			this.dc = new T.Sprite({
				asset: dcimg[level][this.index - 1],
				z: -5,
				w: 250,
				h: 120,
				center: {
					x: 125,
					y: 60
				}
			});
			this.dc.x = this.x;
			this.dc.y = this.y - (this.h + this.dc.h) / 2;
			if (level == 0 && record.sex == 'girl' && (this.index == 1 || this.index == 5)) this.dc.asset = 'dcqunku.png';
			stage_g.add(this.dc);
		},
		//向目标移动
		update: function () {
			if (this.movetarget) {
				var b = this.movetarget;
				this.tx = b.x;
				this.ty = b.y;
				this.z = 3;
				var x_cha = Math.abs(this.x - b.x);
				var y_cha = Math.abs(this.y - b.y);
				var x_yd = this.x_yd;
				var y_yd = x_yd * (y_cha / x_cha);
				if (y_yd > x_yd * 2)y_yd = x_yd * 2;
				if (this.x > b.x + 2) this.x -= x_yd;
				else if (this.x < b.x - 2) this.x += x_yd;
				if (this.y > b.y + 2) this.y -= y_yd;
				else if (this.y < b.y - 2) this.y += y_yd;
				console.log("x:" + this.x + ",y:" + this.y);
				if (this.dc) {
					this.dc.z = 15;
					this.dc.x = this.x;
					this.dc.y = this.y - (this.h + this.dc.h) / 2;
				}
				if (Math.abs(this.x - b.x) < 10 && Math.abs(this.y - b.y) < 10) {
					var anim = new AnimPlayer({
						x: this.x,
						y: this.y,
						w: 177,
						h: 474,
						center: {
							x: 88,
							y: 237
						}
					});
					anim.setAnimSheet("sheet_buling", "buling");
					anim.action = function () {
						this.play('anim');
						if (this.timing > this.time) this.parent.remove(this);
						this.timing++;
					};
					this.parent.add(anim);
					this.movetarget = null;
					if (this.audio) {
						bgmusic.volume = this.volume;
						this.audio.play();
					}
					if (this.dc) {
						this.dc.z = -5;
						this.parent.remove(this.dc);
					}
					//过关检测
					if (picture_c.parts.length == 0 && !addedclear) {
						this.parent.add(new GameClear());
						addedclear = true;
					}
				}
			} else if (this.ok) {
				this.x = this.tx;
				this.y = this.ty;
				if (this.dc) {
					this.dc.z = -5;
					this.parent.remove(this.dc);
				}
			}
			if ((this.audio && this.audio.currentTime && !this.audio.ended) ||
				(this.audioen && this.audioen.currentTime && !this.audioen.ended)) {
				bgmusic.volume = this.volume;
			} else if (bgmusic.volume <= 0.9)    bgmusic.volume += 0.1;
		},
		setOldxy: function (x, y) {
			this.oldx = x;
			this.oldy = y;
			this.x = x;
			this.y = y;
		}
	});
	//图片，有空白的整张图片,空白处留着拼
	var Picture = T.Sprite.extend({
		init: function (ops) {
			this._super(ops);
			this.on("added", function () {
				var stage = this.parent;
				var length, data = [];
				if (level == 0) {
					length = 8;
					if (record.sex == 'boy') data = data_g[0][0].concat();
					else data = data_g[0][1].concat();
				} else {
					length = data_g[level].length;
					data = data_g[level].concat();
				}
				this.parts = [];
				var i, x, y, temp = [];
				for (i = 0; i < data.length; i++) {
					temp[i] = i;
				}
				temp.sort(function (a, b) {
					return Math.random() > 0.5 ? -1 : 1;
				});
				for (i = 0; i < length; i++) { //添加需要拼的数量个拼图
					if (level == 0) {
						if (record.weather == 'sun' && i < 4) this.parts.push(data[i]);
						else if (record.weather == 'rain' && i > 3) this.parts.push(data[i]);
					} else this.parts.push(data[i]);
					var part = new Part(data[temp[i]]);
					x = 140 * (i % 2) + 70;
					y = 180 * Math.floor(i / 2) + 100;
					part.setOldxy(x, y);
					stage.add(part);
				}
				i = length;//需要添加在图片中的拼图的起点
				for (; i < length; i++) { //不需要拼的全部显示出来
					var qita = new T.Sprite(data[i]);
					qita.z = 2;
					stage.add(qita);
				}
			});
		}
	});


	//加载，显示吉祥物
	T.scene("load", new T.Scene(function (stage) {
		stage.add(new OP());
	}, {
		sort: true
	}));
	//待机场景
	T.scene("ready", new T.Scene(function (stage) {
		stage.merge('interactive');
		duihuaindex = 0;
		if (bgmusic) bgmusic.pause();
		bgmusic = T.getAsset('start.mp3');
		bgmusic.loop = true;
		bgmusic.volume = 1;
		bgmusic.play();
		var bg = new BG('bg_ready.png');
		stage.add(bg);
		var gs = new Button({
			asset: 'game_start.png',
			w: 272,
			h: 105,
			x: 300,
			y: 500
		});
		stage.add(gs);
		gs.down = function () {
			T.stageScene('xuannannv');
		};
		var gc = new Button({
			asset: 'game_continue.png',
			w: 272,
			h: 105,
			x: 700,
			y: 500
		});
		stage.add(gc);
		gc.down = function () {
			if (record.level == null) {
				T.stageScene('xuannannv');
			} else {
				T.stageScene('xuanguan');
			}
		};
		var title = new AnimPlayer({
			w: 400,
			h: 160,
			x: 370,
			y: 40
		});
		title.setAnimSheet("sheet_title", 'title');
		title.action = function () {
			this.play('anim');
		};
		stage.add(title);
	}, {
		sort: true
	}));

	T.scene('xuannannv', new T.Scene(function (stage) {
		stage.merge("interactive");
		var bg = new BG('bg_ready.png');
		stage.add(bg);
		record.weather = Math.random() > 0.5 ? 'sun' : 'rain';
		level = 0;
		duihuaindex = 1;
		if (record.level == null)record.level = 0;
		var nanhai = new T.Sprite({
			asset: 'gs_nan.png',
			w: 172,
			h: 200,
			x: 550,
			y: 400
		});
		nanhai.on("down", boydj);
		stage.add(nanhai);
		var boy = new AnimPlayer({
			y: 280,
			x: 550,
			w: 200,
			h: 130
		});
		boy.setAnimSheet("sheet_boy", 'boy');
		boy.down = boydj;
		stage.add(boy);
		var nvhai = new T.Sprite({
			asset: 'gs_nv.png',
			w: 172,
			h: 200,
			x: 900,
			y: 400
		});
		nvhai.on("down", girldj);
		stage.add(nvhai);
		var girl = new AnimPlayer({
			x: 900,
			y: 280,
			w: 200,
			h: 130
		});
		girl.setAnimSheet("sheet_girl", 'boy');
		girl.down = girldj;
		stage.add(girl);
		function boydj() {
			record.sex = 'boy';
			setStorage();
			T.stageScene('newgame');
		}

		function girldj() {
			record.sex = 'girl';
			setStorage();
			T.stageScene('newgame');
		}
	}, {
		sort: true
	}));

	T.scene('xuanguan', new T.Scene(function (stage) {
		stage.merge('interactive');
		stage.add(new ChooseLevel());
	}, {
		sort: true
	}));

	T.scene('newgame', new T.Scene(function (stage) {
		stage.merge('interactive');
		bgmusic.pause();
		var bg = new BG();
		if (level == 0) {
			if (record.sex == 'boy') {
				if (record.weather == 'sun') {
					if (duihuaindex == 1) bg.asset = 'bg0_boy_sunny.png';
					else if (duihuaindex == 2) bg.asset = 'bg1nr.png';
				} else if (record.weather == 'rain') {
					if (duihuaindex == 1) bg.asset = 'bg0_boy_rain.png';
					else if (duihuaindex == 2) bg.asset = 'bg1nl.png';
				}
			} else if (record.sex == 'girl') {
				if (record.weather == 'sun') {
					if (duihuaindex == 1) bg.asset = 'bg0_girl_sunny.png';
					else if (duihuaindex == 2) bg.asset = 'bg1nvr.png';
				} else if (record.weather == 'rain') {
					if (duihuaindex == 1) bg.asset = 'bg0_girl_rain.png';
					else if (duihuaindex == 2) bg.asset = 'bg1nvl.png';
				}
			}
			if (duihuaindex == 1)bgmusic = T.getAsset('qichuang.mp3');
		} else if (level == 1) {
			if (record.sex == 'boy') bg.asset = 'bg2_boy.png';
			else bg.asset = 'bg2_girl.png';
			if (duihuaindex == 3)bgmusic = T.getAsset('xishu.mp3');
		} else if (level == 2) {
			bg.asset = 'bg3.png';
			if (duihuaindex == 4) {
				bg.asset = 'cj3.png';
				bgmusic = T.getAsset('dongwuyuan.mp3');
			}
		} else if (level == 3) {
			bg.asset = 'bg4.png';
			if (duihuaindex == 6)bgmusic = T.getAsset('gonglu.mp3');
		} else if (level == 4) {
			if (duihuaindex == 7) {
				bgmusic = T.getAsset('waipojia.mp3');
				bg.asset = 'cj5.png';
			} else {
				bg.asset = 'bg5.png';
			}
		}
		bgmusic.loop = true;
		bgmusic.volume = 1;
		bgmusic.play();
		bg.down = function () {
			if (!xiaolu.over) return;
			if (duihuaindex == 2 || duihuaindex == 5 || duihuaindex == 8) T.stageScene('newgame');
			else T.stageScene('game');
		};
		stage.add(bg);
		var xiaolu = new Lurenjia();
		stage.add(xiaolu);
	}, {
		sort: true
	}));
	//游戏场景
	T.scene("game", new T.Scene(function (stage) {
		stage.merge('interactive');
		stage_g = stage;
		addedclear = clear_g = false;
		part_g = null;
		bgmusic.volume = 1;
		stage.add(new Background());
		picture_c = new Picture();
		stage.add(picture_c);
		var fanhui = new Button({
			asset: 'fanhuianniu.png',
			w: 100,
			h: 100,
			x: 1180
		});
		fanhui.down = function () {
			T.stageScene('ready');
		};
		stage.add(fanhui);
		T.input.on('enter', function () {
			if (!stage.paused) stage.pause();
			else stage.unpause();
		});
	}, {
		sort: true
	}));


	////(3)加载资源
	T.load(['bg_ready.png', 'clear.png', 'effect.png', 'buling.png', 'onceagain.png', 'next.png', 'fanhuianniu.png',
			'bg3.png', 'cj3.png', 'bg4.png', 'kaipian.png', 'heidaokeji.png', 'huoxuangongzuoshi.png', 'kaichang_a.png', 'kaichang_b.png', 'kaichang_anim.png', 'xz_nanhai.png', 'xz_nvhai.png', 'game_start.png', 'game_continue.png', "bg0_boy_sunny.png", "bg0_boy_rain.png", "bg0_girl_rain.png", "bg0_girl_sunny.png", '2g1.png', '2g2.png', '2g3.png', '2g4.png', '2g5.png', '2g6.png', '2g7.png', 'bg2_boy.png', 'bg2_girl.png', 'bg1nr.png', 'bg1nl.png', 'bg1nvl.png', 'bg1nvr.png', '1_nr1.png', '1_nr2.png', '1_nr3.png', '1_nr4.png', '1_nl1.png', '1_nl2.png', '1_nl3.png', '1_nl4.png', '1_nvr1.png', '1_nvr2.png', '1_nvr3.png', '1_nvr4.png', '1_nvl1.png', '1_nvl2.png', '1_nvl3.png', '1_nvl4.png', 'gs_nan.png', 'gs_nv.png', 'daishu.mp3', 'en_changjinglu.mp3', 'en_daishu.mp3', 'en_houzi.mp3', 'en_xiong.mp3', 'houzi.mp3', 'huo3che.mp3', 'huo4che.mp3', 'jingche.mp3', 'qiche.mp3', 'lang.mp3', 'xiong.mp3', 'cj5.png', 'bg5.png', 'bg5_nainai.png', '5_1.png', '5_2.png', '5_3.png', '5_4.png', '5_6.png', '5_7.png', 'title.png', 'jiantou.png', 'd2gn.png', 'd2gnv.png', 'd3g.png', 'd4g.png', 'd5g.png', 'diertian.png', 'diyitian_nan.png', 'diyitian_nv.png', 'xuanzebeijing.png', 'nanhai.png', 'nvhai.png', 'dh1yu.png', 'dh1qing.png', 'dh2.png', 'dh3.png', 'dh4.png', 'dh5.png', 'dh6.png', 'dh7.png', 'dh8.png', 'dh9.png', '1qing.mp3', '1yu.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '7.mp3', '8.mp3', '9.mp3', 'en_quanjiafu.mp3', 'en_maoyi.mp3', 'en_maomi.mp3', 'en_maoxian.mp3', 'en_tanzi.mp3', 'dccup.png', 'dckuzi.png', 'dcmaojin.png', 'dcmaomi.png', 'dcmaoxiantuan.png', 'dcmaoyi.png', 'dcquanjiafu.png', 'dcqunku.png', 'dcreshui.png', 'dcshuzi.png', 'dctanzi.png', 'dcwazi.png', 'dcxiangzao.png', 'dcxiezi.png', 'dcyagao.png', 'dcyashua.png', 'dcyifu.png', 'start.mp3', 'qichuang.mp3', 'xishu.mp3', 'dongwuyuan.mp3', 'gonglu.mp3', 'waipojia.mp3', '4_gaotie.png', '4_gongjiaoche.png', '4_jiaoche.png', '4_jingche.png', '4_xiaofangche.png', '4_zixingche.png', '3_changjinglu.png', '3_daishu.png', '3_houzi.png', '3_lang.png', '3_xiong.png', 'lu_nan.png', 'lu_nv.png', 'luyan_nan.png', 'luyan_nv.png', 'dcchangjinglu.png', 'dcdaishu.png', 'dcgaotie.png', 'dcgongjiaoche.png', 'dchouzi.png', 'dcjiaoche.png', 'dcjingche.png', 'dclang.png', 'dcxiaofangche.png', 'dcxiong.png', 'dczixingche.png'
		],
		function () {
			T.sheet("sheet_effect", "effect.png", {
				tw: 142,
				th: 142
			});
			T.sheet("sheet_buling", "buling.png", {
				tw: 177,
				th: 474
			});
			T.sheet("sheet_kaipian", "kaipian.png", {
				tw: 400,
				th: 567
			});
			T.sheet("sheet_kcanim", "kaichang_anim.png", {
				tw: 1280,
				th: 720
			});
			T.sheet("sheet_nanhai", "xz_nanhai.png", {
				tw: 483,
				th: 697
			});
			T.sheet("sheet_nvhai", "xz_nvhai.png", {
				tw: 406,
				th: 697
			});
			T.sheet("sheet_title", "title.png", {
				tw: 509,
				th: 207
			});
			T.sheet("sheet_boy", "nanhai.png", {
				tw: 501,
				th: 360
			});
			T.sheet("sheet_girl", "nvhai.png", {
				tw: 501,
				th: 363
			});
			T.sheet("sheet_lynan", 'luyan_nan.png', {tw: 279, th: 138});
			T.sheet("sheet_lynv", 'luyan_nv.png', {tw: 309, th: 138});
			_.each([
				["effect", {anim: {frames: _.range(0, 5), rate: 1 / 4}}],
				["buling", {anim: {frames: _.range(0, 6), rate: 1 / 5}}],
				["kaipian", {
					anim: {frames: _.range(0, 5), rate: 1 / 3},
					idle: {frames: [0], rate: 1}
				}],
				["kcanim", {
					anim: {frames: _.range(0, 11), rate: 1 / 7},
					ready: {frames: [0], rate: 1},
					idle: {frames: [10], rate: 1}
				}],
				["nanhai", {
					anim: {frames: _.range(0, 4), rate: 1 / 3},
					idle: {frames: [0], rate: 1}
				}],
				["boy", {anim: {frames: _.range(1, 4), rate: 1 / 3}}],
				["title", {anim: {frames: _.range(0, 3), rate: 1 / 2}}]
			], function (anim) {
				T.fas(anim[0], anim[1]);
			});
			record = JSON.parse(localStorage.getItem("record"));
			if (record == null) {
				record = {};
			}
			setStorage();
			maxlevel = data_g.length;
			window.setTimeout(function () {
				//level = 2;
				T.stageScene('load');
			}, 300);
			T.input.on('x', function () {
				T.stageScene('ready');
			});
		}
	);

	//碰撞函数,p传要拼的能移动的那个部分，b传不会动的空白
	function contact(p, b) {
		var px = p.x - ((p.rw || p.w) / 4);
		var pxx = p.x + ((p.rw || p.w) / 4);
		var py = p.y - ((p.rh || p.h) / 4);
		var pyy = p.y + ((p.rh || p.h) / 4);
		var bx = b.x - ((b.rw || b.w) / 4);
		var bxx = b.x + ((b.rw || b.w) / 4);
		var by = b.y - ((b.rh || b.h) / 4);
		var byy = b.y + ((b.rh || b.h) / 4);
		return !(pxx <= bx || pyy <= by || px >= bxx || py >= byy);
	}

	//判断是不是相同的东西，判断碰撞没,p传要拼的能移动的那个部分，b传不会动的空白,wh:weather
	function isThisPart(p, b) {
		return p.wh == b.wh && p.index == b.index && contact(p, b);
	}

	//判断位置，能否贴上
	function judgePosition(p) {
		var parts = picture_c.parts;
		for (var i = 0; i < parts.length; i++) {
			if (isThisPart(p, parts[i])) {
				p.movetarget = deepCopy(parts[i]);
				p.ok = true;
				picture_c.parts.splice(i, 1); //拼好的就移除
				return;
			}
		}
	}

	function setStorage() {
		localStorage.setItem("record", JSON.stringify(record));
	}

	T.cvs.addEventListener("mousemove", movefunc, false);
	T.cvs.addEventListener("touchmove", movefunc, false);
	T.cvs.addEventListener("mouseup", upfunc, false);
	T.cvs.addEventListener("touchend", upfunc, false);
	T.cvs.addEventListener("touchcancel", upfunc, false);

	function movefunc(e) {
		if (!down_g || part_g == null || part_g.ok) return;
		var point = getPoint(e);
		part_g.x = point.x;
		part_g.y = point.y;
		if (part_g.dc) {
			part_g.dc.z = 15;
			part_g.dc.x = part_g.x;
			part_g.dc.y = part_g.y - (part_g.h + part_g.dc.h) / 2;
		}
		e.stopPropagation();
		e.preventDefault();
	}

	function upfunc(e) {
		if (clear_g || part_g == null) return;
		judgePosition(part_g);
		if (part_g.ok) {
			down_g = false;
			part_g = null;
			return;
		}
		part_g.x = part_g.oldx;
		part_g.y = part_g.oldy;
		part_g.w *= part_g.ratio_w;
		part_g.h *= part_g.ratio_h;
		part_g.center.x *= part_g.ratio_w;
		part_g.center.y *= part_g.ratio_h;
		part_g.z -= 5;
		if (part_g.dc) part_g.dc.z = -5;
		down_g = false;
		part_g = null;
		e.stopPropagation();
		e.preventDefault();
	}

	function getPoint(e) {
		var element = T.cvs;
		var point = {
			x: (e.pageX || e.clientX + document.body.scrollLeft) - element.offsetLeft - T.canvas_tran_x,
			y: (e.pageY || e.clientY + document.body.scrollTop) - element.offsetTop - T.canvas_tran_y
		};

		if (T.scale) {
			point.x /= T.scale.x;
			point.y /= T.scale.y;
		}
		return point;
	}

	function deepCopy(source) {
		var result = {};
		for (var key in source) {
			result[key] = typeof source[key] == 'object' ? deepCopy(source[key]) : source[key];
		}
		return result;
	}
};