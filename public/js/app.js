let currentBazi=null,currentPrompt=null,currentImageUrl=null,currentDescription=null;
const pages={input:document.getElementById('page-input'),loading:document.getElementById('page-loading'),result:document.getElementById('page-result')};
const form=document.getElementById('bazi-form');
const yearSelect=document.getElementById('year');
const monthSelect=document.getElementById('month');
const daySelect=document.getElementById('day');
const hourSelect=document.getElementById('hour');
const btnSolar=document.getElementById('btn-solar');
const btnLunar=document.getElementById('btn-lunar');
const yearLabel=document.getElementById('year-label');
const monthLabel=document.getElementById('month-label');
const dayLabel=document.getElementById('day-label');
const resultImage=document.getElementById('result-image');
const infoPanel=document.getElementById('info-panel');
const btnInfo=document.getElementById('btn-info');
const btnCloseInfo=document.getElementById('btn-close-info');
const btnRegenerate=document.getElementById('btn-regenerate');
const btnDownload=document.getElementById('btn-download');
const toast=document.getElementById('toast');

let isLunarMode=false;

function init(){
  const currentYear=new Date().getFullYear();
  for(let y=1950;y<=currentYear;y++){
    const opt=document.createElement('option');
    opt.value=y;opt.textContent=y;
    yearSelect.appendChild(opt)
  }
  yearSelect.value=2000;
  for(let m=1;m<=12;m++){
    const opt=document.createElement('option');
    opt.value=m;opt.textContent=m;
    monthSelect.appendChild(opt)
  }
  monthSelect.value=1;
  updateDays();
  yearSelect.addEventListener('change',updateDays);
  monthSelect.addEventListener('change',updateDays);
  btnSolar.addEventListener('click',()=>setCalendarMode(false));
  btnLunar.addEventListener('click',()=>setCalendarMode(true));
  form.addEventListener('submit',handleSubmit);
  btnInfo.addEventListener('click',()=>toggleInfoPanel(true));
  btnCloseInfo.addEventListener('click',()=>toggleInfoPanel(false));
  btnRegenerate.addEventListener('click',handleRegenerate);
  btnDownload.addEventListener('click',handleDownload);
  document.addEventListener('click',(e)=>{
    if(infoPanel.classList.contains('open')&&!infoPanel.contains(e.target)&&e.target!==btnInfo)toggleInfoPanel(false)
  })
}

function setCalendarMode(lunar){
  isLunarMode=lunar;
  btnSolar.classList.toggle('active',!lunar);
  btnLunar.classList.toggle('active',lunar);
  yearLabel.textContent=lunar?'农历年':'年';
  monthLabel.textContent=lunar?'农历月':'月';
  dayLabel.textContent=lunar?'农历日':'日';
  updateDays();
}

function updateDays(){
  const year=parseInt(yearSelect.value),month=parseInt(monthSelect.value);
  let daysInMonth;
  if(isLunarMode){
    // 农历月份天数：29或30天
    const lm=typeof leapMonth!=='undefined'?leapMonth(year):0;
    daysInMonth=((typeof monthDays!=='undefined'?monthDays(year,month):29)>0)?monthDays(year,month):30;
  }else{
    daysInMonth=new Date(year,month,0).getDate();
  }
  const currentDay=parseInt(daySelect.value)||1;
  daySelect.innerHTML='';
  for(let d=1;d<=daysInMonth;d++){
    const opt=document.createElement('option');
    opt.value=d;opt.textContent=d;
    daySelect.appendChild(opt)
  }
  daySelect.value=Math.min(currentDay,daysInMonth);
}

function showPage(pageName){
  Object.values(pages).forEach(p=>p.classList.remove('active'));
  pages[pageName].classList.add('active')
}

function showToast(msg){
  toast.textContent=msg;toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),2500)
}

// ===== 本地调试模式 =====
function showLocalDebugPanel(bazi, prompt, description){
  showPage('result');
  resultImage.style.display='none';
  
  // 清空result-page并插入调试面板
  const resultPage=document.getElementById('page-result');
  const existing=resultPage.querySelector('.local-debug-panel');
  if(existing)existing.remove();
  
  const panel=document.createElement('div');
  panel.className='local-debug-panel';
  panel.style.cssText='padding:20px;max-width:800px;margin:0 auto;background:#1a1a2e;color:#eee;border-radius:12px;font-family:monospace;';
  
  const pillarsHtml=bazi.pillars.map(p=>`<span style="display:inline-block;margin:4px;padding:8px 12px;background:#16213e;border-radius:6px;"><b>${p.name}</b> ${p.gan}${p.zhi}</span>`).join('');
  
  panel.innerHTML=`
    <h2 style="color:#e94560;margin-bottom:12px;">🛠 本地调试模式</h2>
    <div style="margin-bottom:16px;">${pillarsHtml}</div>
    <div style="margin-bottom:12px;"><b>日干：</b>${bazi.dayGan}</div>
    <div style="margin-bottom:16px;">
      <b>Prompt：</b>
      <pre style="background:#0f3460;padding:12px;border-radius:8px;white-space:pre-wrap;word-break:break-all;font-size:12px;">${prompt}</pre>
      <button id="btn-copy-prompt" style="margin-top:8px;padding:6px 14px;background:#e94560;color:#fff;border:none;border-radius:6px;cursor:pointer;">复制Prompt</button>
    </div>
    <div style="margin-bottom:16px;">
      <b>描述JSON：</b>
      <pre style="background:#0f3460;padding:12px;border-radius:8px;white-space:pre-wrap;word-break:break-all;font-size:12px;">${JSON.stringify(description,null,2)}</pre>
    </div>
    <div style="display:flex;gap:12px;">
      <button id="btn-local-random" style="padding:10px 20px;background:#533483;color:#fff;border:none;border-radius:8px;cursor:pointer;">重新随机</button>
      <button id="btn-local-back" style="padding:10px 20px;background:#16213e;color:#fff;border:none;border-radius:8px;cursor:pointer;">返回输入</button>
    </div>
  `;
  
  resultPage.appendChild(panel);
  
  document.getElementById('btn-copy-prompt').addEventListener('click',()=>{
    navigator.clipboard.writeText(prompt).then(()=>showToast('Prompt已复制'));
  });
  document.getElementById('btn-local-random').addEventListener('click',()=>{
    const y=1950+Math.floor(Math.random()*74);
    const m=1+Math.floor(Math.random()*12);
    const d=1+Math.floor(Math.random()*28);
    const h=Math.floor(Math.random()*12)*2;
    yearSelect.value=y;monthSelect.value=m;daySelect.value=d;hourSelect.value=h/2;
    handleSubmit({preventDefault:()=>{}});
  });
  document.getElementById('btn-local-back').addEventListener('click',()=>{
    panel.remove();
    resultImage.style.display='';
    showPage('input');
  });
}

async function handleSubmit(e){
  e.preventDefault();
  let year=parseInt(yearSelect.value),month=parseInt(monthSelect.value),day=parseInt(daySelect.value);
  
  // 农历转阳历
  if(isLunarMode){
    if(typeof lunar2solar==='undefined'){
      showToast('农历转换库加载失败');return;
    }
    const solar=lunar2solar(year,month,day,false);
    if(!solar){showToast('农历日期无效');return;}
    year=solar.year;month=solar.month;day=solar.day;
  }
  
  const hourVal=hourSelect.value;
  const hour=hourVal===''?null:parseInt(hourVal)*2;
  currentBazi=calcBazi(year,month,day,hour);
  const promptResult=generatePrompt(currentBazi);
  currentPrompt=promptResult.prompt;
  currentDescription=promptResult.description;
  
  // 本地文件模式调试
  if(location.protocol==='file:'){
    showLocalDebugPanel(currentBazi,currentPrompt,currentDescription);
    return;
  }
  
  showPage('loading');
  try{
    const response=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:currentPrompt})});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||'生成失败');
    currentImageUrl=extractImageUrl(data);
    if(!currentImageUrl)throw new Error('未获取到图片');
    resultImage.src=currentImageUrl;
    resultImage.onload=()=>{showPage('result');renderInfoPanel(currentDescription)};
    resultImage.onerror=()=>{showToast('图片加载失败，请重试');showPage('input')}
  }catch(err){
    console.error('生成出错:',err);
    showToast(err.message||'生成失败，请重试');
    showPage('input')
  }
}

function extractImageUrl(data){
  if(data.data&&data.data[0]&&data.data[0].url)return data.data[0].url;
  if(data.url)return data.url;
  if(data.image_url)return data.image_url;
  if(data.output&&data.output.url)return data.output.url;
  return null
}

async function handleRegenerate(){
  if(!currentBazi)return;
  showPage('loading');
  const promptResult=generatePrompt(currentBazi);
  currentPrompt=promptResult.prompt;
  currentDescription=promptResult.description;
  try{
    const response=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt:currentPrompt})});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error||'生成失败');
    currentImageUrl=extractImageUrl(data);
    if(!currentImageUrl)throw new Error('未获取到图片');
    resultImage.src=currentImageUrl;
    resultImage.onload=()=>{showPage('result');renderInfoPanel(currentDescription)};
  }catch(err){showToast(err.message||'生成失败');showPage('result')}
}

function handleDownload(){
  if(!currentImageUrl)return;
  const link=document.createElement('a');
  link.href=currentImageUrl;
  link.download=`山水八字_${Date.now()}.png`;
  link.target='_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('已开始下载')
}

function toggleInfoPanel(show){
  if(show)infoPanel.classList.add('open');
  else infoPanel.classList.remove('open')
}

function renderInfoPanel(description){
  const{elements,relations}=description;
  const pillarsDisplay=document.getElementById('pillars-display');
  pillarsDisplay.innerHTML=currentBazi.pillars.map(p=>`<div class="pillar-item"><div class="pillar-label">${p.name}</div><div class="pillar-gan">${p.gan}</div><div class="pillar-zhi">${p.zhi}</div></div>`).join('');
  
  const elementsList=document.getElementById('elements-list');
  const ganWx={甲:'木',乙:'木',丙:'火',丁:'火',戊:'土',己:'土',庚:'金',辛:'金',壬:'水',癸:'水'};
  const wxIcon={'木':'🌲','火':'🔥','土':'⛰','金':'⚔','水':'💧'};
  elementsList.innerHTML=elements.map((el)=>{
    const layerName={'distant background':'远景','middle ground':'中景','foreground':'近景','atmospheric accent':'点缀'}[el.layer]||el.layer;
    const mainText=el.main.join('、');
    // 藏干显示带五行，如：癸(水)
    let cangText='';
    if(el.cang&&el.cang.length>0){
      const cangWithWx=el.cang.map(cg=>{
        const wx=ganWx[cg]||'';
        return wx?`${cg}(${wx})`:cg;
      });
      cangText=`（藏干：${cangWithWx.join('、')}）`;
    }
    const icon=wxIcon[ganWx[el.gan]]||'•';
    return`<div class="element-item"><div class="element-icon">${icon}</div><div class="element-text"><h5>${el.pillar} · ${el.gan}(${ganWx[el.gan]})${el.zhi} · ${layerName}</h5><p>${mainText}${cangText}</p></div></div>`
  }).join('');
  
  // 显示所有关系
  const relationList=document.getElementById('relation-list');
  const relationDesc={
    '冲':'对立分割：画面冷暖对冲，形成强烈张力',
    '刑':'压迫缠绕：元素互相制约，构图紧张',
    '害':'遮挡错位：表里不一，暗流涌动',
    '合':'融合环绕：元素和谐共生，互相连接',
    '三合':'三角和谐：三元素形成平衡共生关系',
    'default':'层次递进：各元素按远景→中景→近景自然排列，构图宁静和谐'
  };
  if(relations&&relations.length>0){
    relationList.innerHTML=relations.map(r=>{
      const desc=relationDesc[r.type]||r.desc;
      return`<div class="relation-box"><h5>画面关系 · ${r.desc}</h5><p>${desc}</p></div>`
    }).join('');
  }else{
    relationList.innerHTML=`<div class="relation-box"><h5>画面关系 · 层次递进</h5><p>${relationDesc.default}</p></div>`;
  }
  
  const shishenBars=document.getElementById('shishen-bars');
  const ssData=currentBazi.shiShenRatio;
  const ssOrder=['比','劫','食','伤','才','财','杀','官','枭','印'];
  const maxRatio=Math.max(...Object.values(ssData).map(d=>d.ratio));
  shishenBars.innerHTML=ssOrder.map(ss=>{
    const data=ssData[ss];
    const width=maxRatio>0?(data.ratio/maxRatio)*100:0;
    return`<div class="shishen-item"><div class="shishen-label">${ss}</div><div class="shishen-bar-bg"><div class="shishen-bar-fill ss-${ss}" style="width:${width}%"></div></div><div class="shishen-value">${data.ratio}%</div></div>`
  }).join('')
}

init();