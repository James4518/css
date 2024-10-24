/*此为键盘插件，使用很简单
		$('.keyboard').keyboard(opts);
		即可把一个盒子变成键盘
		如上 opts为参数，json格式，可不填，具体参数值如下
			width:p($obj.css('width')),			//键盘宽度
			radius:4,							//键盘四角的圆角度数
			padding:10,							//键盘四周空白区域宽度
			segment:4,							//键盘左中右之间分割线宽度
			FbuttonHeight:2,					//第一排F区域按键与第二行之间的距离
			keyWidth:0,							//按钮宽度
			keyHeight:0,						//按钮高度
			keyRadius:4,						//每个按钮四角的圆角度数
			keyFontSize:12,						//按钮上字体大小
			keyPassColor:'#fff',				//按钮按下时的字体颜色
			keyMargin:1,						//每个按钮四周留空的距离
			keyBorderWidth:1,					//每个按钮的边线宽度
			keyBorderColor:'#fff',				//每个按钮的边线颜色
			keyColorShadow:5,						//每个按钮的阴影扩散度
			keyDoubleFontSize:12,				//两行字的按钮上字体大小
			keyDoubleSegment:4,					//两行字的按钮上 上下两行间距
			lightRad:3,							//指示灯半径
			lightBorderColor:'#cdcd00',			//指示灯边线颜色
			lightBorderWidth:1,					//指示灯边线宽度
			lightColor:'#ccc',					//指示灯颜色
			lightColorShow:'#ff0',				//指示灯灯光颜色
			keyColors:['rgb(0, 255, 100)','rgb(255, 225, 0)','rgb(255, 100, 0)','rgb(255, 0, 75)','rgb(150, 0, 255)','rgb(0, 150, 255)'],//按钮颜色
			keyColorsRun:true,					//是否开启按钮颜色移动变化
			keyColorsRunTimes:1000,				//按钮颜色移动变化频率(毫秒)
			boardColors:['rgb(0, 255, 100)','rgb(255, 225, 0)','rgb(255, 100, 0)','rgb(255, 0, 75)','rgb(150, 0, 255)','rgb(0, 150, 255)'],//键盘内阴影颜色
			boardColorsShow:true,				//是否显示键盘背景内阴影
			boardColorsRun:true,				//是否开启键盘背景内阴影播放，不开启默认显示第一个颜色
			boardColorsRunType:'random',		//键盘内阴影播放方式'random' 随机播放 'order' 按顺序播放
			boardColorsInsetSize:200,			//键盘内阴影大小
			boardColorsRunTimes:1500,			//键盘内阴影播放频率(毫秒)
			keyAfterToRunTime:8000,				//按键结束后多少秒自动开启默认播放动作
			audio:'',							//按键声音路径
			keyREffect:true,					//是否开启按键四射特效
			keyREffectTimes:3					//按键特效速度，越小越快
 * */

(function($) {
    var p = function(a) {
            return parseInt(a)
        };
    $.fn.keyboard = function(a) {
        var b = this;
        var a = $.extend({
            width: p(b.css('width')),
            radius: 4,
            padding: 10,
            segment: 4,
            FbuttonHeight: 2,
            keyWidth: 0,
            keyHeight: 0,
            keyRadius: 4,
            keyFontSize: 12,
            keyPassColor: '#fff',
            keyMargin: 1,
            keyBorderWidth: 1,
            keyBorderColor: '#fff',
            keyColorShadow: 5,
            keyDoubleFontSize: 12,
            keyDoubleSegment: 4,
            lightRad: 3,
            lightBorderColor: '#cdcd00',
            lightBorderWidth: 1,
            lightColor: '#ccc',
            lightColorShow: '#ff0',
            keyColors: ['rgb(0, 255, 100)', 'rgb(255, 225, 0)', 'rgb(255, 100, 0)', 'rgb(255, 0, 75)', 'rgb(150, 0, 255)', 'rgb(0, 150, 255)'],
            keyColorsRun: true,
            keyColorsRunTimes: 1000,
            boardColors: ['rgb(0, 255, 100)', 'rgb(255, 225, 0)', 'rgb(255, 100, 0)', 'rgb(255, 0, 75)', 'rgb(150, 0, 255)', 'rgb(0, 150, 255)'],
            boardColorsShow: true,
            boardColorsRun: true,
            boardColorsRunType: 'random',
            boardColorsInsetSize: 200,
            boardColorsRunTimes: 1500,
            keyAfterToRunTime: 8000,
            audio: '',
            keyREffect: true,
            keyREffectTimes: 3
        }, a || {});
        a.keyWidth = a.keyWidth || p((p(a.width) - p(a.padding) * 2 - p(a.segment) * 2) / 22);
        a.keyHeight = a.keyHeight || a.keyWidth;
        addDom(b);
        initStyle(b, a);
        addEL(b, a);
        return this
    };
    function addDom(a) {
        var b = '<div class="keyboard_container">					<div class="keyboard_s keyboard_l">						<ul class="keyboard_row keyboard_row1">							<li data_index="27">Esc</li>							<li data_index="0" class="keyboard_gw"></li>							<li data_index="112">F1</li>							<li data_index="113">F2</li>							<li data_index="114">F3</li>							<li data_index="115">F4</li>							<li data_index="0" class="keyboard_gw keyboard_gw1_2"></li>							<li data_index="116">F5</li>							<li data_index="117">F6</li>							<li data_index="118">F7</li>							<li data_index="119">F8</li>							<li data_index="0" class="keyboard_gw keyboard_gw1_2"></li>							<li data_index="120">F9</li>							<li data_index="121">F10</li>							<li data_index="122">F11</li>							<li data_index="123">F12</li>						</ul>						<ul class="keyboard_row">							<li data_index="192" class="keyboard_double">~</br>`</li>							<li data_index="49" class="keyboard_double">!</br>1</li>							<li data_index="50" class="keyboard_double">@</br>2</li>							<li data_index="51" class="keyboard_double">#</br>3</li>							<li data_index="52" class="keyboard_double">$</br>4</li>							<li data_index="53" class="keyboard_double">%</br>5</li>							<li data_index="54" class="keyboard_double">^</br>6</li>							<li data_index="55" class="keyboard_double">&</br>7</li>							<li data_index="56" class="keyboard_double">*</br>8</li>							<li data_index="57" class="keyboard_double">(</br>9</li>							<li data_index="48" class="keyboard_double">)</br>0</li>							<li data_index="189" class="keyboard_double">—</br>-</li>							<li data_index="187" class="keyboard_double">+</br>=</li>							<li data_index="8" class="keyboard_w2">Backspace</li>						</ul>						<ul class="keyboard_row">							<li data_index="9" class="keyboard_w3_2">Tab</li>							<li data_index="81">Q</li>							<li data_index="87">W</li>							<li data_index="69">E</li>							<li data_index="82">R</li>							<li data_index="84">T</li>							<li data_index="89">Y</li>							<li data_index="85">U</li>							<li data_index="73">I</li>							<li data_index="79">O</li>							<li data_index="80">P</li>							<li data_index="219" class="keyboard_double">{</br>[</li>							<li data_index="221" class="keyboard_double">}</br>]</li>							<li data_index="220" class="keyboard_double keyboard_w3_2">|</br>\</li>						</ul>						<ul class="keyboard_row">							<li data_index="20" class="keyboard_w2">Caps Lock</li>							<li data_index="65">A</li>							<li data_index="83">S</li>							<li data_index="68">D</li>							<li data_index="70">F</li>							<li data_index="71">G</li>							<li data_index="72">H</li>							<li data_index="74">J</li>							<li data_index="75">K</li>							<li data_index="76">L</li>							<li data_index="186" class="keyboard_double">:</br>;</li>							<li data_index="222" class="keyboard_double">"</br>\'</li>							<li data_index="13" class="keyboard_w2">Enter</li>						</ul>						<ul class="keyboard_row">							<li data_index="16" class="keyboard_w5_2">Shift</li>							<li data_index="90">Z</li>							<li data_index="88">X</li>							<li data_index="67">C</li>							<li data_index="86">V</li>							<li data_index="66">B</li>							<li data_index="78">N</li>							<li data_index="77">M</li>							<li data_index="188" class="keyboard_double">&lt;</br>,</li>							<li data_index="190" class="keyboard_double">&gt;</br>.</li>							<li data_index="191" class="keyboard_double">?</br>/</li>							<li data_index="16" class="keyboard_w5_2">Shift</li>						</ul>						<ul class="keyboard_row">							<li data_index="17">Ctrl</li>							<li data_index="91">Win</li>							<li data_index="18">Alt</li>							<li data_index="32" class="keyboard_w8">space</li>							<li data_index="18">Alt</li>							<li data_index="92">Win</li>							<li data_index="93">嘿嘿</li>							<li data_index="17">Ctrl</li>						</ul>					</div>					<div class="keyboard_s keyboard_m">						<ul class="keyboard_row keyboard_row1">							<li data_index="44" class="keyboard_double">Primt Sc</br>SysRq</li>							<li data_index="145" class="keyboard_double">Scroll</br>Lock</li>							<li data_index="19" class="keyboard_double">Pause</br>Break</li>						</ul>						<ul class="keyboard_row">							<li data_index="45">Insert</li>							<li data_index="36">Home</li>							<li data_index="33" class="keyboard_double">Page</br>Up</li>						</ul>						<ul class="keyboard_row">							<li data_index="46">Delete</li>							<li data_index="35">End</li>							<li data_index="34" class="keyboard_double">Page</br>Down</li>						</ul>						<ul class="keyboard_row">							<li data_index="0" class="keyboard_gw"></li>						</ul>						<ul class="keyboard_row">							<li data_index="0" class="keyboard_gw"></li>							<li data_index="38">↑</li>							<li data_index="0" class="keyboard_gw"></li>						</ul>						<ul class="keyboard_row">							<li data_index="37">←</li>							<li data_index="40">↓</li>							<li data_index="39">→</li>						</ul>					</div>					<div class="keyboard_s keyboard_r">						<ul class="keyboard_row keyboard_row1">							<li class="keyboard_gw keyboard_lights">								<i><em class="keyboard_light"></em></i>								<i><em></em></i>								<i><em></em></i>							</li>						</ul>						<ul class="keyboard_row">							<li data_index="144" class="keyboard_double">Num<br/>Lock</li>							<li data_index="111">/</li>							<li data_index="106">*</li>						</ul>						<ul class="keyboard_row">							<li data_index="103" class="keyboard_double">7</br>Home</li>							<li data_index="104" class="keyboard_double">8</br>↑</li>							<li data_index="105" class="keyboard_double">9</br>PgUp</li>						</ul>						<ul class="keyboard_row">							<li data_index="100" class="keyboard_double">4</br>←</li>							<li data_index="101" class="keyboard_double">5</br></li>							<li data_index="102" class="keyboard_double">6</br>→</li>						</ul>						<ul class="keyboard_row">							<li data_index="97" class="keyboard_double">1</br>End</li>							<li data_index="98" class="keyboard_double">2</br>↓</li>							<li data_index="99" class="keyboard_double">3</br>PgDn</li>						</ul>						<ul class="keyboard_row">							<li data_index="96" class="keyboard_w2 keyboard_double">0<br/>Ins</li>							<li data_index="110" class="keyboard_double">.</br>Del</li>						</ul>					</div>					<div class="keyboard_s keyboard_rr">						<ul class="keyboard_row keyboard_row1">							<li data_index="0" class="keyboard_gw"></li>						</ul>						<ul class="keyboard_row">							<li data_index="109">-</li>						</ul>						<ul class="keyboard_row">							<li data_index="107" class="keyboard_h2">+</li>						</ul>						<ul class="keyboard_row">							<li data_index="13" class="keyboard_h2">Enter</li>						</ul>					</div>				</div>';
        a.html(b)
    }
    function initStyle(a, b) {
        var c = a.find('.keyboard_container');
        var s = b;
        var d = p(s.keyWidth);
        var e = p(s.keyHeight);
        var f = p(s.keyBorderWidth) * 2 + p(s.keyMargin) * 2;
        var g = d - f;
        var h = e - f;
        c.css({
            'width': p(s.width) + 'px',
            'overflow': 'hidden',
            'border-radius': p(s.radius) + 'px',
            'position': 'relative',
            'padding': p(s.padding) + 'px'
        });
        c.find('.keyboard_s').css({
            'float': 'left'
        });
        c.find('.keyboard_l').css({
            'width': d * 15
        });
        c.find('.keyboard_m').css({
            'width': d * 3,
            'margin': '0 ' + p(s.segment)
        });
        c.find('.keyboard_r').css({
            'width': d * 3
        });
        c.find('.keyboard_rr').css({
            'width': d
        });
        c.find('.keyboard_row').css({
            'margin': 0,
            'padding': 0,
            'overflow': 'hidden'
        });
        c.find('.keyboard_row1').css({
            'padding-bottom': p(s.FbuttonHeight) + 'px'
        });
        c.find('.keyboard_row>li').css({
            'cursor': 'pointer',
            'border-radius': p(s.keyRadius) + 'px',
            'text-align': 'center',
            'list-style': 'none',
            'float': 'left',
            'font-size': p(s.keyFontSize) + 'px',
            'width': g + 'px',
            'height': h + 'px',
            'border': p(s.keyBorderWidth) + 'px solid ' + s.keyBorderColor,
            'margin': p(s.keyMargin) + 'px',
            'line-height': h + 'px'
        });
        c.find('.keyboard_row>li.keyboard_gw').css({
            'width': d + 'px',
            'height': e + 'px',
            'border': 'none',
            'margin': '0',
            'cursor': 'auto'
        });
        c.find('.keyboard_row>li.keyboard_gw1_2').css({
            'width': p(d / 2) + 'px'
        });
        c.find('.keyboard_row>li.keyboard_lights').css({
            'width': d * 3 + 'px',
            'overflow': 'hidden'
        });
        c.find('.keyboard_row>li.keyboard_lights i').css({
            'width': d + 'px',
            'float': 'left',
            'overflow': 'hidden'
        });
        var i = p(e / 2) - p(s.lightRad) - p(s.lightBorderWidth);
        c.find('.keyboard_row>li.keyboard_lights i em').css({
            'float': 'right',
            'width': p(s.lightRad) * 2 + 'px',
            'height': p(s.lightRad) * 2 + 'px',
            'background': s.lightColor,
            'border': p(s.lightBorderWidth) + 'px solid ' + s.lightBorderColor,
            'margin-top': i + 'px'
        });
        c.find('.keyboard_row>li.keyboard_lights i em.keyboard_light').css({
            'background': s.lightColorShow,
            'border': p(s.lightBorderWidth) + 'px solid ' + s.lightColorShow,
            'box-shadow': '0 0 5px 0px ' + s.lightColorShow
        });
        var j = p(s.keyDoubleFontSize) + p(s.keyDoubleSegment);
        var k = p(h / 2) - j;
        c.find('.keyboard_row>li.keyboard_double').css({
            'font-size': p(s.keyDoubleFontSize) + 'px',
            'line-height': '16px',
            'padding-top': k + 'px',
            'height': h - k + 'px'
        });
        c.find('.keyboard_row>li.keyboard_w2').css({
            'width': d * 2 - f + 'px'
        });
        c.find('.keyboard_row>li.keyboard_w3_2').css({
            'width': p(d * 1.5) - f + 'px'
        });
        c.find('.keyboard_row>li.keyboard_w5_2').css({
            'width': p(d * 2.5) - f + 'px'
        });
        c.find('.keyboard_row>li.keyboard_w8').css({
            'width': d * 8 - f + 'px'
        });
        c.find('.keyboard_row>li.keyboard_h2').css({
            'height': e * 2 - f + 'px',
            'line-height': e * 2 - f + 'px'
        })
    }
    function addEL(d, f) {
        var s = f;
        var g = d.find('.keyboard_container');
        var h = g.find('li').not('.gw');
        var j = [];
        h.each(function(i, e) {
            var a = {};
            var e = a.e = $(e);
            a.key = e.attr('data_index');
            a.x = parseInt(e.position().left + (e.outerWidth() / 2) + 2);
            a.y = parseInt(e.position().top + (e.outerHeight() / 2) + 2);
            j.push(a)
        });
        j.sort(function(a, b) {
            return (b.x - b.y) - (a.x - a.y)
        });
        var k = j.length;
        var l = f.keyColors;
        var m = l.length;
        var o = k / m;
        var q = 0;

        function setLinearColor(a) {
            var a = a || 0;
            for (var i = 0; i < k; i++) {
                var b = l[(parseInt(i / o) + a) % m];
                j[i].initcolor = b;
                j[i].e.css({
                    'color': b,
                    'border-color': b,
                    'box-shadow': '0 0 ' + p(s.keyColorShadow) + 'px ' + b
                })
            }
        }
        setLinearColor(q);
        var r = 0;
        var t = s.boardColors;
        var u = t.length;
        function setBoardColor(n) {
            var n = n || 0;
            g.css({
                'box-shadow': '0 0 ' + p(s.boardColorsInsetSize) + 'px 0 ' + t[n] + ' inset'
            })
        }
        if (s.boardColorsShow) {
            setBoardColor(r)
        }
        addTimer();
        var v;
        var w;
        function addTimer() {
            if (s.keyColorsRun) {
                clearInterval(v);
                v = setInterval(function() {
                    q++;
                    setLinearColor(q)
                }, s.keyColorsRunTimes)
            }
            if (s.boardColorsShow) {
                if (s.boardColorsRun) {
                    clearInterval(w);
                    w = setInterval(function() {
                        if (s.boardColorsRunType == 'order') {
                            r = (r + 1) % u
                        } else {
                            r = parseInt(u * Math.random())
                        }
                        setBoardColor(r)
                    }, s.boardColorsRunTimes)
                }
            }
        }
        function findKeyByCode(a) {
            for (var i = 0; i < k; i++) {
                if (j[i].key == a) {
                    return j[i]
                }
            }
            return false
        }
        function findKeyByE(a) {
            for (var i = 0; i < k; i++) {
                if (j[i].e[0] == a[0]) {
                    return j[i]
                }
            }
            return false
        }
        var x;

        function keydown(a) {
            if (a.press) return;
            a.press = true;
            if (s.audio) {
                var b = document.createElement('video');
                b.src = s.audio;
                b.play()
            }
            var c = a.initcolor;
            a.e.css({
                'color': s.keyPassColor,
                'background': c,
                'box-shadow': '0 0 ' + p(s.keyColorShadow) + 'px ' + c,
                'transform': 'scale(1.1)'
            });
            clearInterval(v);
            clearInterval(w);
            clearTimeout(x)
        }
        function keyup(b) {
            b.press = false;
            var c = b.initcolor;
            b.e.css({
                'color': c,
                'background': 'none',
                'box-shadow': '0 0 ' + p(s.keyColorShadow) + 'px ' + c,
                'transform': 'scale(1)'
            });
            x = setTimeout(function() {
                clearTimeout(x);
                addTimer()
            }, s.keyAfterToRunTime);
            if (!s.keyREffect) return;
            for (var i = 0; i < k; i++) {
                (function(i) {
                    var a = j[i].time = Math.abs(j[i].x - b.x) + (Math.abs(j[i].y - b.y) * s.keyREffectTimes);
                    if (j[i].press) return;
                    j[i].timeout = setTimeout(function() {
                        clearTimeout(j[i].timeout);
                        j[i].e.css({
                            'color': c,
                            'border-color': c,
                            'box-shadow': '0 0 ' + p(s.keyColorShadow) + 'px ' + c
                        });
                        j[i].distimeout = setTimeout(function() {
                            clearTimeout(j[i].distimeout);
                            j[i].e.css({
                                'color': j[i].initcolor,
                                'border-color': j[i].initcolor,
                                'box-shadow': '0 0 ' + p(s.keyColorShadow) + 'px ' + j[i].initcolor
                            })
                        }, 50)
                    }, j[i].time)
                })(i)
            }
        }
        $(document).on('keydown', function(a) {
            var b = findKeyByCode(a.keyCode);
            if (!b) {
                alert('请切换至英文输入');
                return
            }
            keydown(b)
        });
        $(document).on('keyup', function(a) {
            var b = findKeyByCode(a.keyCode);
            if (!b) {
                alert('请切换至英文输入');
                return
            }
            keyup(b)
        });
        h.on('mousedown', function() {
            var a = findKeyByE($(this));
            keydown(a);
            var b = setTimeout(function() {
                clearTimeout(b);
                keyup(a)
            }, 100)
        })
    }
})(jQuery);