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
function isMObile() {
	var browser = navigator.userAgent;
	var result = browser.indexOf('Android') || browser.indexOf('iPhone') || browser.indexOf('iPad') || browser.indexOf('Mobile');
	if (result > -1) return true;
	return false;
}
var ismobile_g = isMObile();
if (ismobile_g) {
	info_screen0 = {
		w: window.screen.height,
		h: window.screen.width
	};
}
//显示比例
var sc_x = info_screen0.w / info_screen.w;
var sc_y = info_screen0.h / info_screen.h;

var GAME_NAME = "jigsaw_hx";
document.title = "儿童贴图游戏-火旋工作室";

//主函数，入口
var main = function () {
	var T = Tina().requires("Input,Sprites,Scenes,Text,Entities")
		.setup("canvas", {width: info_screen0.w, height: info_screen0.h, pixelRatio: pixelRatio, scale: {x: sc_x, y: sc_y}})
		.controls();

	var picture_c, stage_g, level, down_g = false, part_g, maxlevel, record, bgmusic, duihuaindex, clear_g, addedclear, firstgoal, dancixinashi_g;
	var data_g = [
		[
			[{asset: '1_nr1.png', w: 163, h: 159, center: {x: 81, y: 79}, wh: 'sun', index: 1, x: 806, y: 602},
				{asset: '1_nr2.png', w: 103, h: 79, center: {x: 51, y: 39}, wh: 'sun', index: 2, x: 955, y: 534},
				{asset: '1_nr3.png', w: 97, h: 85, center: {x: 48, y: 42}, wh: 'sun', index: 3, x: 1166, y: 641},
				{asset: '1_nr4.png', w: 204, h: 186, center: {x: 102, y: 93}, wh: 'sun', index: 4, x: 770, y: 443},
				{asset: '1_nl1.png', w: 201, h: 197, center: {x: 100, y: 98}, wh: 'rain', index: 5, x: 815, y: 610},
				{asset: '1_nl2.png', w: 111, h: 92, center: {x: 55, y: 46}, wh: 'rain', index: 6, x: 960, y: 502},
				{asset: '1_nl3.png', w: 120, h: 94, center: {x: 60, y: 47}, wh: 'rain', index: 7, x: 1175, y: 625},
				{asset: '1_nl4.png', w: 251, h: 204, center: {x: 125, y: 102}, wh: 'rain', index: 8, x: 757, y: 433}],
			[{
				asset: '1_nvr1.png', w: 141, h: 149, center: {x: 70, y: 74}, wh: 'sun', index: 1, x: 825, y: 604
			}, {
				asset: '1_nvr2.png', w: 113, h: 79, center: {x: 56, y: 39}, wh: 'sun', index: 2, x: 940, y: 510
			}, {
				asset: '1_nvr3.png', w: 85, h: 79, center: {x: 42, y: 39}, wh: 'sun', index: 3, x: 1169, y: 620
			}, {
				asset: '1_nvr4.png', w: 191, h: 191, center: {x: 95, y: 95}, wh: 'sun', index: 4, x: 750, y: 443
			}, {
				asset: '1_nvl1.png', w: 170, h: 188, center: {x: 85, y: 94}, wh: 'rain', index: 5, x: 878, y: 617
			}, {
				asset: '1_nvl2.png', w: 99, h: 95, center: {x: 49, y: 47}, wh: 'rain', index: 6, x: 953, y: 480
			}, {
				asset: '1_nvl3.png', w: 111, h: 89, center: {x: 55, y: 44}, wh: 'rain', index: 7, x: 1172, y: 615
			}, {
				asset: '1_nvl4.png', w: 197, h: 223, center: {x: 98, y: 111}, wh: 'rain', index: 8, x: 743, y: 446
			}]
		],
		[{
			asset: '2g1.png',
			w: 120,
			h: 220,
			center: {
				x: 60,
				y: 110
			},
			index: 1,
			x: 510,
			y: 448
		}, {
			asset: '2g2.png',
			w: 141,
			h: 263,
			center: {
				x: 70,
				y: 131
			},
			index: 2,
			x: 401,
			y: 481
		}, {
			asset: '2g3.png',
			w: 185,
			h: 129,
			center: {
				x: 92,
				y: 64
			},
			index: 3,
			x: 662,
			y: 550
		}, {
			asset: '2g4.png',
			w: 210,
			h: 128,
			center: {
				x: 105,
				y: 64
			},
			index: 4,
			x: 908,
			y: 575
		}, {
			asset: '2g5.png',
			w: 125,
			h: 76,
			center: {
				x: 62,
				y: 38
			},
			index: 5,
			x: 818,
			y: 495
		}, {
			asset: '2g6.png',
			w: 174,
			h: 143,
			center: {
				x: 87,
				y: 71
			},
			index: 6,
			x: 1150,
			y: 560
		}],
		[{
			asset: '3_changjinglu.png', w: 325, h: 507, center: {x: 162, y: 253}, index: 1, x: 542, y: 335
		}, {
			asset: '3_daishu.png', w: 313, h: 416, center: {x: 156, y: 208}, index: 2, x: 809, y: 493
		}, {
			asset: '3_houzi.png', w: 165, h: 224, center: {x: 82, y: 112}, index: 3, x: 718, y: 200
		}, {
			asset: '3_lang.png', w: 201, h: 240, center: {x: 100, y: 120}, index: 4, x: 975, y: 252
		}, {
			asset: '3_xiong.png', w: 238, h: 358, center: {x: 119, y: 179}, index: 5, x: 1103, y: 515
		}],
		[{
			asset: '4_gaotie.png', w: 216, h: 102, center: {x: 108, y: 51}, index: 1, x: 613, y: 233
		}, {
			asset: '4_gongjiao.png', w: 237, h: 129, center: {x: 118, y: 64}, index: 2, x: 505, y: 360
		}, {
			asset: '4_jiaoche.png', w: 270, h: 231, center: {x: 135, y: 115}, index: 3, x: 515, y: 575
		}, {
			asset: '4_jingche.png', w: 243, h: 151, center: {x: 121, y: 75}, index: 4, x: 928, y: 624
		}, {
			asset: '4_xiaofangche.png', w: 308, h: 169, center: {x: 154, y: 84}, index: 5, x: 1124, y: 470
		}, {
			asset: '4_zixingche.png', w: 146, h: 113, center: {x: 73, y: 56}, index: 6, x: 695, y: 536
		}],
		[{
			asset: '5_beizi.png', w: 88, h: 72, center: {x: 44, y: 36}, index: 1, x: 843, y: 557
		}, {
			asset: '5_maomi.png', w: 169, h: 109, center: {x: 84, y: 54}, index: 2, x: 1167, y: 636
		}, {
			asset: '5_maoxian.png', w: 149, h: 108, center: {x: 74, y: 54}, index: 3, x: 660, y: 480
		}, {
			asset: '5_maoyi.png', w: 121, h: 121, center: {x: 60, y: 60}, index: 4, x: 520, y: 488
		}, {
			asset: '5_quanjiafu.png', w: 129, h: 99, center: {x: 64, y: 49}, index: 5, x: 896, y: 263
		}]
	];
	var data_special = [{}, {}, {}, {}, {
		asset: '5_tanzi.png', w: 191, h: 170, center: {x: 95, y: 85}, index: 6, x: 983, y: 558
	}];
	var audio_en = [
		[], [], ['en_changjinglu.mp3', 'en_daishu.mp3', 'en_houzi.mp3', null, 'en_xiong.mp3'],
		[], [null, 'en_maomi.mp3', 'en_maoxian.mp3', 'en_maoyi.mp3', 'en_quanjiafu.mp3', 'en_tanzi.mp3']
	];
	var dcimg = [
		['dckuzi.png', 'dcwazi.png', 'dcxiezi.png', 'dcyifu.png', 'dckuzi.png', 'dcwazi.png', 'dcxiezi.png', 'dcyifu.png'],
		['dcyagao.png', 'dcyashua.png', 'dccup.png', 'dcshuzi.png', 'dcxiangzao.png', 'dcmaojin.png'],
		['dcchangjinglu.png', 'dcdaishu.png', 'dchouzi.png', 'dclang.png', 'dcxiong.png'],
		['dcgaotie.png', 'dcgongjiaoche.png', 'dcjiaoche.png', 'dcjingche.png', 'dcxiaofangche.png', 'dczixingche.png'],
		['dccup.png', 'dcmaomi.png', 'dcmaoxiantuan.png', 'dcmaoyi.png', 'dcquanjiafu.png', 'dctanzi.png']
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
					stage_g.add(new BG('bg4_wuding.png', {z: 5, w: 64, h: 71, x: 692, y: 209}));
					break;
				case 4:
					stage_g.add(new BG('bg5.png'));
					stage_g.add(new BG('bg5_nainai.png', {z: 5, w: 213, h: 274, x: 929, y: 282}));
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
		asset: 'xuanzebeijing.png', w: 1280, h: 720,
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
					y: 360
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
					y: 360
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
					asset: 'fanhui.png',
					w: 100,
					h: 100,
					x: 1180
				});
				fanhui.down = function () {
					T.stageScene('ready');
				};
				stage.add(fanhui);
				stage.add(new T.Sprite({asset: 'jiantou.png', w: 285, h: 246, x: 480, y: 320, z: 12}));
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
						//this.asset = 'dh1qing.png';
						this.yuyin = newMedia('1qing.mp3');
						if (this.yuyin) {
							bgmusic.volume = this.volume;
							this.yuyin.play();
						}
					} else {
						//this.asset = 'dh1yu.png';
						this.yuyin = newMedia('1yu.mp3');
						if (this.yuyin) {
							bgmusic.volume = this.volume;
							this.yuyin.play();
						}
					}
					break;
			}
			if (duihuaindex > 1) {
				//this.asset = 'dh' + duihuaindex + '.png';
				this.yuyin = newMedia(duihuaindex + '.mp3');
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
		asset: 'clear_bottom.png', w: 506, h: 424, center: {x: 253, y: 212}, x: 780, y: 380, z: 5, added: false,
		init: function () {
			clear_g = true;
			this.star = new T.Sprite({w: 309, h: 201, center: {x: 154, y: 100}, x: this.x, y: this.y - 150, z: 6, asset: 'clear_star.png'});
			this.oldw = this.star.w;
			this.on("added", function () {
				this.parent.add(this.star);
				console.log("恭喜过关");
				this.star.w /= 10;
				this.star.h /= 10;
				this.star.center.x /= 10;
				this.star.center.y /= 10;
			});
			if (record == null) record = {};
			if (record.level == null) record.level = 1;
			if (record.level <= level) record.level = level + 1;
			setStorage();
			level++;
		},
		update: function () {
			if (this.star.w < this.oldw) {
				this.star.w *= 1.1;
				this.star.h *= 1.1;
				this.star.center.x *= 1.1;
				this.star.center.y *= 1.1;
			} else if (!this.added) {
				this.added = true;
				if (level < maxlevel) {
					var next = new Button({x: this.x - 100, y: this.y + 70, asset: 'next.png', w: 200, h: 100});
					next.down = function () {
						T.stageScene('newgame');
					};
					this.parent.add(next);
				} else {
					this.parent.add(new Lurenjia());
				}
				var again = new Button({x: this.x - 100, y: this.y - 40, asset: 'onceagain.png', w: 200, h: 100});
				this.parent.add(again);
				again.down = function () {
					level--;
					T.stageScene('game');
				};
			}
		}
	});

	var JianbianBai = T.Sprite.extend({
		asset: 'kc_b.png', w: 1280, h: 720, timing: 15, z: 200,
		update: function () {
			this.alpha = 1 - 1 / this.timing;
			this.timing--;
			if (this.timing == 0)this.parent.remove(this);
		}
	});

	var Lurenjia = AnimPlayer.extend({
		timing: 0, w: 400, h: 567, x: 1500, y: 620, tx: 1150, center: {x: 200, y: 283}, rotation: -30, over: false,
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
			//语音结束自动进入下个界面
			if (this.dh && this.dh.over) {
				this.over = true;
				gotoNextPage();
			}
		}
	});

	//开头动画
	var OP = T.Entity.extend({
		time: 120, //set how long goto t.scene('ready')
		time2: 22, //set how long animplay
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
				this.kcanim = new AnimPlayer({z: 11, time: this.time2});
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
		ok: false, movetarget: null, rw: null, rh: null, z: 10, ratio_w: 1, ratio_h: 1, wh: null, index: null, volume: 0.1, x_yd: 3, scalebig: false,
		init: function (ops) {
			this._super(ops);
			this.oldw = this.w;
			this.oldh = this.h;
			this.oldcx = this.center.x;
			this.oldcy = this.center.y;
			if (this.w > 130) this.ratio_w = 130 / this.w;
			if (this.h > 150) this.ratio_h = 150 / this.h;
			this.w *= this.ratio_w;
			this.h *= this.ratio_h;
			this.center.x *= this.ratio_w;
			this.center.y *= this.ratio_h;
			this.sw = this.w;
			this.w /= 100;
			this.h /= 100;
			this.center.x /= 100;
			this.center.y /= 100;
			this.scalebig = true;
			this.audioen = newMedia(audio_en[level][this.index - 1]);
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
			if (dancixinashi_g) {
				this.dc = new T.Sprite({asset: dcimg[level][this.index - 1], z: -5, w: 250, h: 120, center: {x: 125, y: 60}});
				this.dc.x = this.x;
				this.dc.y = this.y - (this.h + this.dc.h) / 2;
				if (level == 0 && record.sex == 'girl' && (this.index == 1 || this.index == 5)) this.dc.asset = 'dcqunku.png';
				stage_g.add(this.dc);
			}
		},
		//向目标移动
		update: function () {
			if (this.scalebig) {
				if (this.w < this.sw * 0.95) {
					this.w *= 1.2;
					this.h *= 1.2;
					this.center.x *= 1.2;
					this.center.y *= 1.2;
				} else this.scalebig = false;
			}
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
				if (this.dc) {
					this.dc.z = 15;
					this.dc.x = this.x;
					this.dc.y = this.y - (this.h + this.dc.h) / 2;
				}
				if (Math.abs(this.x - b.x) < 10 && Math.abs(this.y - b.y) < 10) {
					var anim = new AnimPlayer({time: 30, x: this.x, y: this.y, w: 300, h: 300, center: {x: 150, y: 150}});
					anim.setAnimSheet("sheet_buling", "buling");
					anim.action = function () {
						this.play('anim');
						if (this.timing > this.time) this.parent.remove(this);
						this.timing++;
					};
					this.parent.add(anim);
					this.movetarget = null;
					if (this.dc) {
						this.dc.z = -5;
						this.parent.remove(this.dc);
					}
					//过关检测
					if (picture_c.parts.length == 0 && !addedclear) {
						if (level == 4 && !firstgoal) {
							console.log(this.firstgoal);
							picture_c.parts.push(data_special[level]);
							var part = new Part(data_special[level]);
							part.setOldxy(140, 300);
							this.parent.add(part);
							firstgoal = true;
						} else {
							this.parent.add(new GameClear());
							addedclear = true;
						}
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
			if (this.audioen && this.audioen.currentTime && !this.audioen.ended) {
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
	}));
	//待机场景
	T.scene("ready", new T.Scene(function (stage) {
		stage.merge('interactive');
		duihuaindex = 0;
		if (bgmusic) bgmusic.pause();
		bgmusic = newMedia('start.mp3');
		bgmusic.loop = true;
		bgmusic.volume = 1;
		bgmusic.play();
		stage.add(new JianbianBai());
		var bg = new BG('bg_ready.png');
		stage.add(bg);
		var gs = new Button({asset: 'game_start.png', w: 272, h: 105, x: 504, y: 360});
		stage.add(gs);
		gs.down = function () {
			T.stageScene('xuannannv');
		};
		var gc = new Button({asset: 'game_continue.png', w: 272, h: 105, x: 504, y: 470});
		stage.add(gc);
		gc.down = function () {
			if (record.level == null) {
				T.stageScene('xuannannv');
			} else {
				T.stageScene('xuanguan');
			}
		};
		var title = new AnimPlayer({w: 527, h: 320, x: 300, y: -320, time: 50});
		title.setAnimSheet("sheet_title", 'title');
		title.action = function () {
			if (this.y < 30) {
				this.y += 30;
				this.play('idle');
			} else if (this.timing < this.time) {
				this.play('anim');
				this.timing++;
			} else this.play('stop');
		};
		stage.add(title);
		var dancibt = new Button({asset: dancixinashi_g ? 'dancikaiqi.png' : 'danciguanbi.png', x: 100, y: 600, w: 152, h: 56});
		dancibt.down = function () {
			if (dancixinashi_g) {
				dancixinashi_g = false;
				this.asset = 'danciguanbi.png';
			} else {
				dancixinashi_g = true;
				this.asset = 'dancikaiqi.png';
			}
			record.dancixianshi = dancixinashi_g;
			setStorage();
		};
		stage.add(dancibt);
	}));

	T.scene('xuannannv', new T.Scene(function (stage) {
		stage.merge("interactive");
		var alphavalue = 0.5;
		var bg = new BG('bg_black.png');
		stage.add(bg);
		record.weather = Math.random() > 0.5 ? 'sun' : 'rain';
		level = 0;
		duihuaindex = 1;
		var xuanze = true;
		if (record.level == null)record.level = 0;
		var nanhai = new T.Sprite({
			asset: 'nan.png',
			w: 640,
			h: 720,
			x: 640,
			alpha: alphavalue,
			index: 'boy'
		});
		nanhai.on("down", xzdj);
		stage.add(nanhai);
		var boy = new AnimPlayer({
			y: 50,
			x: 1050,
			w: 200,
			h: 130,
			index: 'boy'
		});
		boy.setAnimSheet("sheet_boy", 'boy');
		boy.down = xzdj;
		var fengexian = new T.Sprite({asset: 'fengexianhui.png', w: 14, h: 720, x: 633, z: 1});
		stage.add(fengexian);
		var nvhai = new T.Sprite({
			asset: 'nv.png',
			w: 640,
			h: 720,
			alpha: alphavalue,
			index: 'girl'
		});
		nvhai.on("down", xzdj);
		stage.add(nvhai);
		var girl = new AnimPlayer({
			x: 30,
			y: 50,
			w: 200,
			h: 130,
			index: 'girl'
		});
		girl.setAnimSheet("sheet_girl", 'boy');
		girl.down = xzdj;
		var xiaolu = new AnimPlayer({x: 420, y: 720});
		xiaolu.setAnimSheet("sheet_kaipian", 'kaipian');
		stage.add(xiaolu);
		xiaolu.action = function () {
			if (this.y > 290)this.y -= 30;
			this.play('anim');
		};
		xiaolu.down = xzdj;
		function xzdj() {
			if (xuanze) {
				xuanze = false;
				nanhai.alpha = 1;
				nvhai.alpha = 1;
				stage.add(boy);
				stage.add(girl);
				fengexian.asset = 'fengexianbai.png';
				stage.remove(xiaolu);
				return;
			}
			record.sex = this.index;
			setStorage();
			T.stageScene('newgame');
		}
	}));

	T.scene('xuanguan', new T.Scene(function (stage) {
		stage.merge('interactive');
		stage.add(new ChooseLevel());
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
			if (duihuaindex == 1)bgmusic = newMedia('qichuang.mp3');
		} else if (level == 1) {
			if (record.sex == 'boy') bg.asset = 'bg2_boy.png';
			else bg.asset = 'bg2_girl.png';
			if (duihuaindex == 3)bgmusic = newMedia('xishu.mp3');
		} else if (level == 2) {
			bg.asset = 'bg3.png';
			if (duihuaindex == 4) {
				bg.asset = 'cj3.png';
				bgmusic = newMedia('dongwuyuan.mp3');
			}
		} else if (level == 3) {
			bg.asset = 'bg4.png';
			if (duihuaindex == 6)bgmusic = newMedia('gonglu.mp3');
		} else if (level == 4) {
			if (duihuaindex == 7) {
				bgmusic = newMedia('waipojia.mp3');
				bg.asset = 'cj5.png';
			} else {
				bg.asset = 'bg5.png';
			}
		}
		bgmusic.loop = true;
		bgmusic.volume = 1;
		bgmusic.play();
		bg.down = function () {
			//人声没完不能进入下个场景
			//if (!xiaolu.over) return;
			//点击屏幕进入下一场景，暂停背景人声
			xiaolu.dh.yuyin.pause();
			gotoNextPage();
		};
		stage.add(bg);
		var xiaolu = new Lurenjia();
		stage.add(xiaolu);
	}));
	//游戏场景
	T.scene("game", new T.Scene(function (stage) {
		stage.merge('interactive');
		stage_g = stage;
		firstgoal = addedclear = clear_g = false;
		part_g = null;
		bgmusic.volume = 1;
		stage.add(new Background());
		picture_c = new Picture();
		stage.add(picture_c);
		var fanhui = new Button({
			asset: 'fanhui.png',
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
	}));


	////(3)加载资源
	T.load([
		"kc_b.png", 'fengexianbai.png', 'fengexianhui.png', 'bg_black.png', 'bg_ready.png', 'buling.png', 'onceagain.png', 'next.png', 'fanhui.png', 'bg3.png', 'cj3.png', 'bg4.png', 'kaipian.png', 'heidaokeji.png', 'huoxuangongzuoshi.png', 'kaichang_a.png', 'kaichang_b.png', 'kaichang_anim.png', 'xz_nanhai.png', 'xz_nvhai.png', 'game_start.png', 'game_continue.png', "bg0_boy_sunny.png", "bg0_boy_rain.png", "bg0_girl_rain.png", "bg0_girl_sunny.png", '2g1.png', '2g2.png', '2g3.png', '2g4.png', '2g5.png', '2g6.png', 'bg2_boy.png', 'bg2_girl.png', 'bg1nr.png', 'bg1nl.png', 'bg1nvl.png', 'bg1nvr.png', '1_nr1.png', '1_nr2.png', '1_nr3.png', '1_nr4.png', '1_nl1.png', '1_nl2.png', '1_nl3.png', '1_nl4.png', '1_nvr1.png', '1_nvr2.png', '1_nvr3.png', '1_nvr4.png', '1_nvl1.png', '1_nvl2.png', '1_nvl3.png', '1_nvl4.png', 'gs_nan.png', 'gs_nv.png', 'en_changjinglu.mp3', 'en_daishu.mp3', 'en_houzi.mp3', 'en_xiong.mp3', 'cj5.png', 'bg5.png', 'bg5_nainai.png', '5_quanjiafu.png', '5_beizi.png', '5_maoxian.png', '5_maomi.png', '5_maoyi.png', '5_tanzi.png', 'title.png', 'jiantou.png', 'd2gn.png', 'd2gnv.png', 'd3g.png', 'd4g.png', 'd5g.png', 'diertian.png', 'diyitian_nan.png', 'diyitian_nv.png', 'xuanzebeijing.png', 'nanhai.png', 'nvhai.png', '1qing.mp3', '1yu.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3', '6.mp3', '7.mp3', '8.mp3', '9.mp3', 'en_quanjiafu.mp3', 'en_maoyi.mp3', 'en_maomi.mp3', 'en_maoxian.mp3', 'en_tanzi.mp3', 'dccup.png', 'dckuzi.png', 'dcmaojin.png', 'dcmaomi.png', 'dcmaoxiantuan.png', 'dcmaoyi.png', 'dcquanjiafu.png', 'dcqunku.png', 'dcreshui.png', 'dcshuzi.png', 'dctanzi.png', 'dcwazi.png', 'dcxiangzao.png', 'dcxiezi.png', 'dcyagao.png', 'dcyashua.png', 'dcyifu.png', 'start.mp3', 'qichuang.mp3', 'xishu.mp3', 'dongwuyuan.mp3', 'gonglu.mp3', 'waipojia.mp3', '4_gaotie.png', '4_gongjiao.png', '4_jiaoche.png', '4_jingche.png', '4_xiaofangche.png', '4_zixingche.png', "bg4_wuding.png", '3_changjinglu.png', '3_daishu.png', '3_houzi.png', '3_lang.png', '3_xiong.png', 'dcchangjinglu.png', 'dcdaishu.png', 'dcgaotie.png', 'dcgongjiaoche.png', 'dchouzi.png', 'dcjiaoche.png', 'dcjingche.png', 'dclang.png', 'dcxiaofangche.png', 'dcxiong.png', 'dczixingche.png', 'nan.png', 'nv.png', "clear_bottom.png", "clear_star.png", "dancikaiqi.png", "danciguanbi.png"
	], function () {
		T.sheet("sheet_buling", "buling.png", {tw: 590, th: 590});
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
		T.sheet("sheet_title", "title.png", {tw: 527, th: 320});
		T.sheet("sheet_boy", "nanhai.png", {
			tw: 501,
			th: 360
		});
		T.sheet("sheet_girl", "nvhai.png", {
			tw: 501,
			th: 363
		});
		_.each([
			["buling", {anim: {frames: _.range(0, 7), rate: 1 / 5}}],
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
			["title", {
				anim: {frames: _.range(0, 6), rate: 1 / 3},
				idle: {frames: [0], rate: 1},
				stop: {frames: [5], rate: 1}
			}]
		], function (anim) {
			T.fas(anim[0], anim[1]);
		});
		record = JSON.parse(localStorage.getItem(GAME_NAME));
		if (record == null) {
			record = {};
			record.dancixianshi = true;
		}
		dancixinashi_g = record.dancixianshi;
		if (dancixinashi_g == null)dancixinashi_g = true;
		setStorage();
		maxlevel = data_g.length;
		window.setTimeout(function () {
			// level = 4;
			// bgmusic = newMedia('start.mp3');
			T.stageScene('load');
		}, 300);
		T.input.on('x', function () {
			T.stageScene('ready');
		});
	});

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

	function deepCopy(source) {
		var result = {};
		for (var key in source) {
			result[key] = typeof source[key] == 'object' ? deepCopy(source[key]) : source[key];
		}
		return result;
	}

	function getPoint(e) {
        var element = T.cvs;
        var point, ep = e;
        if (e.type == 'touchmove') {
            ep = e.targetTouches[0];
        }
        point = {
            x: (ep.pageX || ep.clientX + document.body.scrollLeft) - element.offsetLeft - T.canvas_tran_x,
            y: (ep.pageY || ep.clientY + document.body.scrollTop) - element.offsetTop - T.canvas_tran_y
        };
        if (T.scale) {
            point.x /= T.scale.x;
            point.y /= T.scale.y;
        }
        return point;
    }

	//newgame stage用，小鹿说完话或者点击屏幕跳转
	function gotoNextPage() {
		window.setTimeout(function () {
			if (duihuaindex == 2 || duihuaindex == 5 || duihuaindex == 8) T.stageScene('newgame');
			else T.stageScene('game');
		}, 50);
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

	function newMedia(src) {
		function onSuccess() {
			console.log("media:success");
		}

		function onError(error) {
			alert('media error:' + error.code + ':' + error.message);
		}

		function onStatus(statcode) {
			console.log('media status:' + statcode);
		}

		var file;
		if (ismobile_g)    file = new Media(src, onSuccess, onError, onStatus);
		else file = T.getAsset(src);
		return file;
	}

	function setStorage() {
		localStorage.setItem(GAME_NAME, JSON.stringify(record));
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

	T.cvs.addEventListener("mousemove", movefunc, false);
	T.cvs.addEventListener("touchmove", movefunc, false);
	T.cvs.addEventListener("mouseup", upfunc, false);
	T.cvs.addEventListener("touchend", upfunc, false);
	T.cvs.addEventListener("touchcancel", upfunc, false);
};