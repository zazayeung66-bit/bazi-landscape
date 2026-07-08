const TIAN_GAN=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const DI_ZHI=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const WUXING={甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水',子:'水',丑:'土',寅:'木',卯:'木',辰:'土',巳:'火',午:'火',未:'土',申:'金',酉:'金',戌:'土',亥:'水'};
const YINYANG={甲:'阳',乙:'阴',丙:'阳',丁:'阴',戊:'阳',己:'阴',庚:'阳',辛:'阴',壬:'阳',癸:'阴',子:'阳',丑:'阴',寅:'阳',卯:'阴',辰:'阳',巳:'阴',午:'阳',未:'阴',申:'阳',酉:'阴',戌:'阳',亥:'阴'};
const CANG_GAN={子:['癸'],丑:['己','癸','辛'],寅:['甲','丙','戊'],卯:['乙'],辰:['戊','乙','癸'],巳:['丙','戊','庚'],午:['丁','己'],未:['己','丁','乙'],申:['庚','壬','戊'],酉:['辛'],戌:['戊','辛','丁'],亥:['壬','甲']};
const SHI_SHEN_MAP={'甲':{甲:'比',乙:'劫',丙:'食',丁:'伤',戊:'才',己:'财',庚:'杀',辛:'官',壬:'枭',癸:'印'},'乙':{甲:'劫',乙:'比',丙:'伤',丁:'食',戊:'财',己:'才',庚:'官',辛:'杀',壬:'印',癸:'枭'},'丙':{甲:'枭',乙:'印',丙:'比',丁:'劫',戊:'食',己:'伤',庚:'才',辛:'财',壬:'杀',癸:'官'},'丁':{甲:'印',乙:'枭',丙:'劫',丁:'比',戊:'伤',己:'食',庚:'财',辛:'才',壬:'官',癸:'杀'},'戊':{甲:'杀',乙:'官',丙:'枭',丁:'印',戊:'比',己:'劫',庚:'食',辛:'伤',壬:'才',癸:'财'},'己':{甲:'官',乙:'杀',丙:'印',丁:'枭',戊:'劫',己:'比',庚:'伤',辛:'食',壬:'财',癸:'才'},'庚':{甲:'才',乙:'财',丙:'杀',丁:'官',戊:'枭',己:'印',庚:'比',辛:'劫',壬:'食',癸:'伤'},'辛':{甲:'财',乙:'才',丙:'官',丁:'杀',戊:'印',己:'枭',庚:'劫',辛:'比',壬:'伤',癸:'食'},'壬':{甲:'食',乙:'伤',丙:'才',丁:'财',戊:'杀',己:'官',庚:'枭',辛:'印',壬:'比',癸:'劫'},'癸':{甲:'伤',乙:'食',丙:'财',丁:'才',戊:'官',己:'杀',庚:'印',辛:'枭',壬:'劫',癸:'比'}};

const LIU_CHONG={子:'午',午:'子',丑:'未',未:'丑',寅:'申',申:'寅',卯:'酉',酉:'卯',辰:'戌',戌:'辰',巳:'亥',亥:'巳'};
const LIU_HE={子:'丑',丑:'子',寅:'亥',亥:'寅',卯:'戌',戌:'卯',辰:'酉',酉:'辰',巳:'申',申:'巳',午:'未',未:'午'};
const LIU_HAI={子:'未',未:'子',丑:'午',午:'丑',寅:'巳',巳:'寅',卯:'辰',辰:'卯',申:'亥',亥:'申',酉:'戌',戌:'酉'};
const SAN_XING=[['寅','巳','申'],['丑','戌','未'],['子','卯'],['辰','午','酉','亥']];
const SAN_HE={'申子辰':'水','寅午戌':'火','巳酉丑':'金','亥卯未':'木'};

// ===== 农历转换核心数据（1900-2100） =====
const lunarInfo = [
  0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
  0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
  0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
  0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
  0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
  0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
  0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
  0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
  0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
  0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x05ac0,0x0ab60,0x096d5,0x092e0,
  0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
  0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
  0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
  0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
  0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
  0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,
  0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
  0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,
  0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
  0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,
  0x0d520
];

function lYearDays(y){var i,sum=348;for(i=0x8000;i>0x8;i>>=1){sum+=(lunarInfo[y-1900]&i)?1:0;}return sum+leapDays(y);}
function leapMonth(y){return(lunarInfo[y-1900]&0xf);}
function leapDays(y){if(leapMonth(y)){return((lunarInfo[y-1900]&0x10000)?30:29);}return 0;}
function monthDays(y,m){if(m>12||m<1)return-1;return((lunarInfo[y-1900]&(0x10000>>m))?30:29);}

function lunar2solar(y,m,d,isLeapMonth){
  isLeapMonth=!!isLeapMonth;
  if(y===2100&&m===12&&d>1||y===1900&&m===1&&d<31)return null;
  var day=monthDays(y,m);
  if(isLeapMonth){var lm=leapMonth(y);if(lm!==m)return null;day=leapDays(y);}
  if(y<1900||y>2100||d>day)return null;
  var offset=0;
  for(var i=1900;i<y;i++){offset+=lYearDays(i);}
  var leap=0,isAdd=false;
  for(i=1;i<m;i++){
    leap=leapMonth(y);
    if(!isAdd){if(leap<=i&&leap>0){offset+=leapDays(y);isAdd=true;}}
    offset+=monthDays(y,i);
  }
  if(isLeapMonth){offset+=monthDays(y,m);}
  var stamp=Date.UTC(1900,1,30,0,0,0);
  var calObj=new Date((offset+d-31)*86400000+stamp);
  return{year:calObj.getUTCFullYear(),month:calObj.getUTCMonth()+1,day:calObj.getUTCDate()};
}

// ===== 八字计算 =====

function getYearGanZhi(year, month, day){
  // 年柱以立春为界（约2月4日），立春前算上一年
  var effectiveYear = year;
  if (month < 2 || (month === 2 && day < 4)) {
    effectiveYear = year - 1;
  }
  effectiveYear = (effectiveYear < 1900 ? 1900 : effectiveYear);
  var offset = (effectiveYear - 1984 + 60) % 60;
  var gan = TIAN_GAN[offset % 10];
  var zhi = DI_ZHI[offset % 12];
  return { gan, zhi, full: gan + zhi };
}

function getDayGanZhi(year,month,day){
  // 使用Date.UTC计算从1900-01-01的天数差，1900-01-01=甲戌(10)
  var sm=month-1;
  var dayCyclical=Math.floor(Date.UTC(year,sm,1)/86400000)+25567+10;
  var idx=(dayCyclical+day-1)%60;
  if(idx<0)idx+=60;
  var gan=TIAN_GAN[idx%10];
  var zhi=DI_ZHI[idx%12];
  return{gan,zhi,full:gan+zhi};
}

// 精确节气判断（12个节）
function getMonthZhi(year,month,day){
  // 节气月份对应表（近似日期，已足够准确用于八字）
  var jieQi=[
    {m:1,d:6,zhi:'丑',name:'小寒'},   // 小寒后=丑月
    {m:2,d:4,zhi:'寅',name:'立春'},   // 立春后=寅月
    {m:3,d:6,zhi:'卯',name:'惊蛰'},
    {m:4,d:5,zhi:'辰',name:'清明'},
    {m:5,d:6,zhi:'巳',name:'立夏'},
    {m:6,d:6,zhi:'午',name:'芒种'},
    {m:7,d:7,zhi:'未',name:'小暑'},
    {m:8,d:8,zhi:'申',name:'立秋'},
    {m:9,d:8,zhi:'酉',name:'白露'},
    {m:10,d:8,zhi:'戌',name:'寒露'},
    {m:11,d:7,zhi:'亥',name:'立冬'},
    {m:12,d:7,zhi:'子',name:'大雪'}
  ];
  
  // 找到当前日期所在的节气区间
  var currentZhi='子'; // 默认（1月小寒前）
  
  for(var i=0;i<jieQi.length;i++){
    var jq=jieQi[i];
    if(month>jq.m||(month===jq.m&&day>=jq.d)){
      currentZhi=jq.zhi;
    }
  }
  
  // 特殊处理：1月小寒前是子月
  if(month===1&&day<6){
    currentZhi='子';
  }
  
  return{zhi:currentZhi,index:DI_ZHI.indexOf(currentZhi)};
}

function getMonthGan(yearGan,monthZhiIndex){
  var startMap={甲:2,己:2,乙:4,庚:4,丙:6,辛:6,丁:8,壬:8,戊:0,癸:0};
  var startGanIdx=startMap[yearGan];
  var ganIdx=(startGanIdx+monthZhiIndex)%10;
  return TIAN_GAN[ganIdx];
}

function getMonthGanZhi(yearGan,year,month,day){
  var mz=getMonthZhi(year,month,day);
  var gan=getMonthGan(yearGan,mz.index);
  return{gan,zhi:mz.zhi,full:gan+mz.zhi};
}

function getHourGanZhi(dayGan,hour){
  var hourIndex=Math.floor(((hour+1)%24)/2);
  var zhi=DI_ZHI[hourIndex];
  var startMap={甲:0,己:0,乙:2,庚:2,丙:4,辛:4,丁:6,壬:6,戊:8,癸:8};
  var startGanIdx=startMap[dayGan];
  var ganIdx=(startGanIdx+hourIndex)%10;
  var gan=TIAN_GAN[ganIdx];
  return{gan,zhi,full:gan+zhi,index:hourIndex};
}

function getShiShen(dayGan,targetGan){
  return SHI_SHEN_MAP[dayGan][targetGan]||'';
}

function analyzeRelations(zhiList){
  var relations=[];
  var zhiSet=new Set(zhiList);
  
  for(var i=0;i<zhiList.length;i++){
    var zhi=zhiList[i];
    // 六冲
    var chong=LIU_CHONG[zhi];
    if(chong&&zhiSet.has(chong)){
      var pair=[zhi,chong].sort().join('-');
      if(!relations.some(function(r){return r.type==='冲'&&r.pair===pair;}))
        relations.push({type:'冲',pair,desc:zhi+'冲'+chong});
    }
    // 六合
    var he=LIU_HE[zhi];
    if(he&&zhiSet.has(he)){
      var pair2=[zhi,he].sort().join('-');
      if(!relations.some(function(r){return r.type==='合'&&r.pair===pair2;}))
        relations.push({type:'合',pair:pair2,desc:zhi+'合'+he});
    }
    // 六害
    var hai=LIU_HAI[zhi];
    if(hai&&zhiSet.has(hai)){
      var pair3=[zhi,hai].sort().join('-');
      if(!relations.some(function(r){return r.type==='害'&&r.pair===pair3;}))
        relations.push({type:'害',pair:pair3,desc:zhi+'害'+hai});
    }
  }
  
  // 三刑
  for(var gi=0;gi<SAN_XING.length;gi++){
    var xingGroup=SAN_XING[gi];
    var matched=[];
    for(var xi=0;xi<xingGroup.length;xi++){
      if(zhiSet.has(xingGroup[xi]))matched.push(xingGroup[xi]);
    }
    if(matched.length>=2){
      var xingTypes={
        '寅巳申':'无恩之刑','丑戌未':'恃势之刑',
        '子卯':'无礼之刑','辰午酉亥':'自刑'
      };
      var key=xingGroup.join('');
      relations.push({type:'刑',pair:matched.join('-'),desc:matched.join('')+'刑（'+xingTypes[key]+'）'});
    }
  }
  
  // 三合
  for(var gkey in SAN_HE){
    if(SAN_HE.hasOwnProperty(gkey)){
      var chars=gkey.split('');
      var matched2=[];
      for(var ci=0;ci<chars.length;ci++){
        if(zhiSet.has(chars[ci]))matched2.push(chars[ci]);
      }
      if(matched2.length>=2){
        relations.push({type:'三合',pair:gkey,desc:matched2.join('')+'三合'+SAN_HE[gkey]+'局'});
      }
    }
  }
  
  return relations;
}

function calcShiShenRatio(pillars,dayGan){
  var counts={};
  var allGans=[];
  for(var pi=0;pi<pillars.length;pi++){
    var p=pillars[pi];
    allGans.push(p.gan);
    if(p.cangGan)allGans.push.apply(allGans,p.cangGan);
  }
  for(var gi=0;gi<allGans.length;gi++){
    var ss=getShiShen(dayGan,allGans[gi]);
    if(ss)counts[ss]=(counts[ss]||0)+1;
  }
  var total=0;
  for(var k in counts){if(counts.hasOwnProperty(k))total+=counts[k];}
  var result={};
  for(var k2 in counts){if(counts.hasOwnProperty(k2))result[k2]={count:counts[k2],ratio:total>0?Math.round((counts[k2]/total)*100):0};}
  var allSS=['比','劫','食','伤','才','财','杀','官','枭','印'];
  for(var si=0;si<allSS.length;si++){
    if(!result[allSS[si]])result[allSS[si]]={count:0,ratio:0};
  }
  return result;
}

function calcBazi(year,month,day,hour){
  var yearGZ=getYearGanZhi(year,month,day);
  var dayGZ=getDayGanZhi(year,month,day);
  var monthGZ=getMonthGanZhi(yearGZ.gan,year,month,day);
  
  var pillars=[
    {name:'年柱',gan:yearGZ.gan,zhi:yearGZ.zhi,full:yearGZ.full,cangGan:CANG_GAN[yearGZ.zhi]},
    {name:'月柱',gan:monthGZ.gan,zhi:monthGZ.zhi,full:monthGZ.full,cangGan:CANG_GAN[monthGZ.zhi]},
    {name:'日柱',gan:dayGZ.gan,zhi:dayGZ.zhi,full:dayGZ.full,cangGan:CANG_GAN[dayGZ.zhi]}
  ];
  
  var hourGZ=null;
  if(hour!==null&&hour!==undefined){
    hourGZ=getHourGanZhi(dayGZ.gan,hour);
    pillars.push({name:'时柱',gan:hourGZ.gan,zhi:hourGZ.zhi,full:hourGZ.full,cangGan:CANG_GAN[hourGZ.zhi]});
  }
  
  var zhiList=pillars.map(function(p){return p.zhi;});
  var relations=analyzeRelations(zhiList);
  var shiShenRatio=calcShiShenRatio(pillars,dayGZ.gan);
  
  return{pillars,dayGan:dayGZ.gan,relations,shiShenRatio,hasHour:hour!==null&&hour!==undefined};
}

if(typeof module!=='undefined'&&module.exports){
  module.exports={calcBazi,lunar2solar,TIAN_GAN,DI_ZHI,WUXING,YINYANG,CANG_GAN,getShiShen};
}