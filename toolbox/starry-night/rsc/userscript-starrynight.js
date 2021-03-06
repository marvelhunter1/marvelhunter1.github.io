var txt={
  sence:[
    '深院靜，小庭空，斷續寒砧斷續風',
    '无奈夜长人不寐，数声何月到帘栊'
  ],
  life: [
    '一曲新词酒一杯，去年天气旧亭台，夕阳西下几时回',
    '無可奈何花落去，似曾相識燕歸來，小園香徑獨徘徊',
    '槛菊愁烟兰泣露，罗幕轻寒，燕子双飞去。明月不谙离恨苦，斜光到晓穿朱户',
    '昨夜西风凋碧树，独上高楼，望尽天涯路。欲寄彩笺兼尺素，山长水阔知何处',
    '爱上层楼，为赋新词强说愁',
    '欲說還休，卻道天涼好個秋',
    '世人笑我太疯癫，我笑世人看不穿',
    '不見五陵豪傑墓，無花無酒做鋤田',
    '白发渔樵江渚上，惯看秋月春风',
    '壹壺煮酒喜相逢，古今多少事，都付笑談中',
    '人生在世不稱意，明朝散發弄偏舟',
    '二十四桥明月夜，玉人何处教吹箫',
    '细草微风岸，危樯独夜舟',
    '星垂平野阔，月涌大江流',
    '名岂文章著，官应老病休',
    '飘飘何所似，天地一沙鸥'
  ],
  love: [
    '青青子衿，悠悠我心。縱我不往，子寧不嗣音',
    '青青子佩，悠悠我思。縱我不往，子寧不來',
    '自牧歸荑，洵美且異。匪女之為美，美人之貽',
    '纤云弄巧，飞星传恨，银汉迢迢暗度',
    '金風玉露壹相逢，便勝卻人間無數',
    '柔情似水，佳期如梦，忍顾鹊桥归路',
    '兩情若是久長時，又豈在朝朝暮暮',
    '梦后楼台高锁，酒醒帘幕低垂',
    '去年春恨却来时，落花人独立，微雨燕双飞',
    '記得小蘋初見，兩重心字羅衣',
    '琵琶弦上说相思，當時明月在，曾照彩雲歸',
    '从别后，忆相逢，几回魂梦与君同。今宵剩把银釭照，犹恐相逢是梦中',
    '红笺小字，说尽平生意。鸿雁在云鱼在水，惆怅此情难寄',
    '夜月壹簾幽夢，春風十裏柔情'
  ]
}

var music={
  provider: '163 music',
  api: {
    music:'https://api.imjad.cn/cloudmusic/?type=song&id=', //&br=64000, 128000(default), 198000, 320000
    //return value usage: 'data'[0].'url'
    //standard format:
    // {"data":[{"id":28012031,"url":"https:\/\/m7.music.126.net\/20200703155303\/b03b24797fe0cbb50cd8e7ebde099852\/ymusic\/8972\/6e6e\/7b86\/bddf788bf92e62d7c5c9aa457dd27bf5.mp3","br":128000,"size":3950276,"md5":"bddf788bf92e62d7c5c9aa457dd27bf5","code":200,"expi":1200,"type":"mp3","gain":0,"fee":0,"uf":null,"payed":0,"flag":256,"canExtend":false,"freeTrialInfo":null,"level":"standard","encodeType":"mp3"}],"code":200}
    title: 'https://api.imjad.cn/cloudmusic/?type=detail&id='
    //standard format:
    // {"songs":[{"name":"在这个世界相遇-钢琴版（《潮流琴房》曲谱试听）","id":421110801,"pst":0,"t":0,"ar":[{"id":1197082,"name":"文武贝","tns":[],"alias":[]}],"alia":[],"pop":95.0,"st":0,"rt":"","fee":0,"v":92,"crbt":null,"cf":"","al":{"id":34777765,"name":"《潮流琴房》（乐谱音频）","picUrl":"https://p2.music.126.net/QXI329jEogBgxr2GM93vjQ==/109951162819438408.jpg","tns":[],"pic_str":"109951162819438408","pic":109951162819438408},"dt":189903,"h":{"br":320000,"fid":0,"size":7604811,"vd":670.0},"m":{"br":192000,"fid":0,"size":4562904,"vd":3742.0},"l":{"br":128000,"fid":0,"size":3041951,"vd":7172.0},"a":null,"cd":"1","no":2,"rtUrl":null,"ftype":0,"rtUrls":[],"djId":0,"copyright":2,"s_id":0,"mark":131072,"originCoverType":0,"single":0,"noCopyrightRcmd":null,"mv":0,"rtype":0,"rurl":null,"mst":9,"cp":0,"publishTime":1468730325241}],"privileges":[{"id":421110801,"fee":0,"payed":0,"st":0,"pl":320000,"dl":320000,"sp":7,"cp":1,"subp":1,"cs":false,"maxbr":320000,"fl":320000,"toast":false,"flag":0,"preSell":false,"playMaxbr":320000,"downloadMaxbr":320000,"chargeInfoList":[{"rate":128000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":192000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":320000,"chargeUrl":null,"chargeMessage":null,"chargeType":0},{"rate":999000,"chargeUrl":null,"chargeMessage":null,"chargeType":1}]}],"code":200}
  },
  id_all: [
    437753697,
    28411989,
    1330624788,
    31134633,
    31260221,
    1339009324,
    31134621,
    421110801,
    1459703175
  ],
  id_prefered:[
    31134621
  ],
  current_playing_item:0,
  random_list:false,
  loop:false,
  enable_control:false
}

$(document).ready(function(){

  x_max=document.body.offsetWidth;
  y_max=document.body.offsetHeight;

//---------
  // if (yDiff < 0 && start.y >= 0.75*document.body.offsetHeight) {
  //   if (document.referrer.match('power-button')==null) {
  //     $(location).attr('href','/');
  //   }
  //   else if (document.referrer.match('power-button')[0]!='') {
  //     $(location).attr('href','../power-button/');
  //   }
  // }
  // else if (yDiff < 0){
  //   $('.prompt').show();
//-------------
  TouchEvt=TouchMotionObject;
  TouchEvt.addTouchEvt(document.body, 'singletap', function(){togglePlay()} );
  TouchEvt.addTouchEvt(document.body, 'swipeleft', function(){toggleMusic(1)} );
  TouchEvt.addTouchEvt(document.body, 'swiperight', function(){toggleMusic()} );
  TouchEvt.addTouchEvt(document.body, 'singlepress', function(){
    $('#music-ctrl img').fadeTo('fast',0.5)
    music.enable_control=true
  });
  TouchEvt.addTouchEvt(document.body, 'pressrelease', function(){
    $('#music-ctrl img:not(.zoom)').css('opacity','0')
    // $('#music-ctrl img:not(.zoom)').fadeTo('fast',0)
    $('#music-ctrl img.zoom').fadeTo('normal',0, function () {
      $('#music-ctrl img').removeClass('zoom')
    })
    if ($('.loop').hasClass('zoom')){
      music.loop=true
      $('audio').attr('loop','')
    }
    else if ($('.order').hasClass('zoom')){
      music.loop=false
      $('audio').removeAttr('loop')
    }
    else if ($('.previous').hasClass('zoom')){
      toggleMusic(1)
    }
    else if ($('.next').hasClass('zoom')){
      toggleMusic()
    }
  });

  TouchEvt.addTouchEvt(document.body, 'panup', function(){
    if (music.enable_control){
      $('#music-ctrl img.zoom').css('opacity','0.5').removeClass('zoom')
      $('.loop').addClass('zoom').css('opacity','1')
    }
  });
  TouchEvt.addTouchEvt(document.body, 'pandown', function(){
    if (music.enable_control){
      $('#music-ctrl img.zoom').css('opacity','0.5').removeClass('zoom')
      $('.order').addClass('zoom').css('opacity','1')
    }
  });
  TouchEvt.addTouchEvt(document.body, 'panleft', function(){
    if (music.enable_control){
      $('#music-ctrl img.zoom').css('opacity','0.5').removeClass('zoom')
      $('.previous').addClass('zoom').css('opacity','1')
    }
  });
  TouchEvt.addTouchEvt(document.body, 'panright', function(){
    if (music.enable_control){
      $('#music-ctrl img.zoom').css('opacity','0.5').removeClass('zoom')
      $('.next').addClass('zoom').css('opacity','1')
    }
  });

  audio1 = document.getElementById("audio1");

  var music_url=music.api.music+music.id_prefered[0];
  loadMusic(music_url);
  addMusicEvt();

  // loadText();
  // txt_countdown=setInterval("loadText()",txt_fade_speed)

});

//--------------------


//---------------------------------------------------------------

var txt_iterate_cnt=1;
var txt_iterate_max=30;
var txt_fade_toggle=true;
var txt_countdown;
var txt_fade_speed=3000 //milli second
var x_max;
var y_max;
var audio1;
var minutes_to_pause=20*60*1000;
var music_countdown;

function Rando(min, max) {
  return Math.floor(Math.random() * (max - min) + min ) ;
}

function loadText(){
  var div='#txt_fade'
  if(txt_fade_toggle==true){
    var new_x=Rando(x_max*0.2,x_max*0.7)
    var new_y=Rando(y_max*0.2,y_max*0.7)
    var index = Math.floor(Math.random() * txt.love.length)
    $(div).css({'left':new_x.toString()+'px', 'top':new_y.toString()+'px'});
    $("#txt_fade p").text(txt.love[index]);
    txt_fade_toggle=false
    txt_iterate_cnt=txt_iterate_cnt+1
  }
  else{
    txt_fade_toggle=true
  }

  $(div).fadeToggle(txt_fade_speed);
  if(txt_iterate_cnt>txt_iterate_max){
    clearInterval(txt_countdown)
  }
}

function loadMusic(api_url){
  var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
  httpRequest.open('GET', api_url, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
  httpRequest.send();//第三步：发送请求  将请求参数写在URL中
  /**
   * 获取数据后的处理程序
   */
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var _json = httpRequest.responseText;//获取到json字符串，还需解析
      var music_info = JSON.parse(_json);
      $('audio').attr('src', music_rsc=music_info.data[0].url);
      // console.log(typeof(music_info));
      // console.log(music_info);
      // console.log(music_rsc);
    }
  }

  // $('audio').removeAttr('controls')
  // $('title').text('Title')
}

function addMusicEvt(){
  //initialize menu. This is used to fix display problems

  audio1.addEventListener('ended', function () { //结束
    if(music.random_list==false && music.current_playing_item<music.id_all.length-1){
      var music_url=music.api.music+music.id_all[++music.current_playing_item]
    }
    else {
      var music_url=music.api.music+music.id_all[Rando(0,music.id_all.length)]
    }
    loadMusic(music_url)
  }, false);
  music_countdown=setTimeout(function(){audio1.pause()},minutes_to_pause)
}

function togglePlay() {
  if(audio1.paused) audio1.play()
  else audio1.pause()
}

function toggleMusic(last=false) {
  audio1.pause()
  if (music.current_playing_item<music.id_all.length-1 && last==false)
    var music_url=music.api.music+music.id_all[++music.current_playing_item]
  else if (music.current_playing_item>0 && last==true)
    var music_url=music.api.music+music.id_all[--music.current_playing_item]
  else {
    alert('暂时已经没有更多曲目了')
    return
  }
  loadMusic(music_url)
}
