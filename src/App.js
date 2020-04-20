import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const unitStr = [
  "人民币",
  "美元"
]
const unitSticker = [
  "￥",
  "＄"
]
const primaryColor = '#5c6bc0';
const secondaryColor = '#304ffe';
const borderColor = '#546e7a';
function App() {
  let [saveBtBk,setSaveBtBk] = useState(secondaryColor);
  let [saveFtColor,setSaveFtColor] = useState('white');
  let [editBtBk,setEditBtBk] = useState(primaryColor);
  let [editFtColor,setEditFtColor] = useState('white');
  let [edit,setEdit] = useState(true);
  let [name,setName] = useState('');
  let [foundNumb,setFoundNumb] = useState(0);
  let [found,setFound] = useState(0);
  let [unit,setUnit] = useState(0);
  let [guarantee,setGuarantee] = useState(65);
  let [robust,setRobust] = useState(25);
  let [radio,setRadio] = useState(10);
  let [days,setDays] = useState(0);
  useEffect(()=>{
    canvasApp([guarantee,robust,radio,days]);
  },[guarantee,robust,radio,days])
  return (
    <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',flexDirection:'column'}}>
      <div style={{width:'90vw',height:'300px',marginTop:'100px',backgroundColor:'white',border:'solid 3px '+borderColor,borderRadius:'10px'}}>
        <div style={{width:'100%',height:'50px',backgroundColor:edit?secondaryColor:primaryColor,borderRadius:'6px 6px 0 0',display:'flex',alignItems:'center'}}>
          <div>
            <span className='web-font'>姓名：</span>
            {
              edit?<input className='web-input-font' type='text' style={{border:'solid 2px white',borderRadius:'5px',height:'28px',width:'150px'}} value={name} onChange={(e)=>{setName(e.currentTarget.value)}}/>:<span className='web-font'>{name}</span>
            }
          </div>
          <div style={{marginLeft:'16px'}}>
            <span className='web-font'>总资产：</span>
            {
              edit?<input className='web-input-font' type='text' style={{border:'solid 2px white',borderRadius:'5px',height:'28px',width:'150px'}} value={found} onChange={(e)=>{
                setFoundNumb(e.currentTarget.value.replace(/[^\d]/g,''))
                setFound(e.currentTarget.value.replace(/[^\d]/g,'').replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,"))}}/>:<span className='web-font'>{found}</span>
            }
            {
              edit?
              <select  className='web-select-font' style={{marginLeft:'16px',border:'solid 2px white',borderRadius:'10px',width:'85px',height:'36px',backgroundColor:secondaryColor}}
                onChange={(e)=>{
                  let index = 0;
                  switch(e.target.value){
                    case unitStr[0]:
                      index = 0;
                      break;
                    case unitStr[1]:
                      index = 1;
                      break;
                    default:
                      index = 0;
                      break;
                  }
                  setUnit(index);
                  console.log(index)
                }}
                defaultValue={unitStr[unit]}
              >
              <option id={0} className='web-select-font'>{unitStr[0]}</option>
              <option id={1} className='web-select-font'>{unitStr[1]}</option>
              </select>
              :<span className='web-font'>{unitStr[unit]}</span>
            }
          </div>
          <div style={{marginLeft:'auto',marginRight:'8px'}}>
            
            {
              edit?<div style={{width:'80px',height:'36px',backgroundColor:saveBtBk,border:'solid 2px white',borderRadius:'5px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
              onMouseEnter={()=>{
                setSaveBtBk('white')
                setSaveFtColor(secondaryColor);
              }}
              onMouseLeave={()=>{
                setSaveBtBk(secondaryColor);
                setSaveFtColor('white')
              }}
              onClick={()=>{
                setEdit(false);
              }}
            >
              <span className='web-font' style={{color:saveFtColor}}>保存</span>
            </div>:
              <div style={{width:'80px',height:'36px',backgroundColor:editBtBk,border:'solid 2px white',borderRadius:'5px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
              onMouseEnter={()=>{
                setEditBtBk('white')
                setEditFtColor(primaryColor);
              }}
              onMouseLeave={()=>{
                setEditBtBk(primaryColor)
                setEditFtColor('white');
              }}
              onClick={()=>{
                setEdit(true);
              }}
              >
                <span className='web-font' style={{color:editFtColor}}>编辑</span>
              </div>
            }
          
          </div>
        </div>
        <div style={{width:'100%',height:'200px',display:'flex'}}>
        <canvas id='myCanvas' width="200" height="200"></canvas>
          <div style={{width:'30%',height:'100%',display:'flex',alignItems:'center'}}>
            <div style={{width:'100px',height:'160px'}}>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#2683c6',marginRight:'8px'}}/>
                <span className='sector-font'>保障金</span>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#1cade4',marginRight:'8px'}}/>
                <span className='sector-font'>稳健增值</span>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#1de9b6',marginRight:'8px'}}/>
                <span className='sector-font'>激进增值</span>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#fffff',marginRight:'8px'}}/>
                <span className='sector-font'>日常支出</span>
              </div>
            </div>
            <div style={{width:'100px',height:'160px'}}>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                {guarantee<=0?<div style={{width:'15px',height:'15px',marginRight:'4px'}}></div>:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(guarantee<=0) {setGuarantee(0);return;} 
                 setGuarantee(--guarantee)
                 setRadio(100-guarantee-robust);
                  }}>
               <span className='sector-font'>-</span>
               </div>}
                <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'8px',marginRight:'8px',justifyContent:'center'}}>
                <span className='sector-font'>{guarantee}</span><span className='sector-font'>%</span>
                </div>
                {(guarantee+robust)>=100?null:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(guarantee>=100) {setGuarantee(100);return;} 
                 setGuarantee(++guarantee)
                 setRadio(100-guarantee-robust);
                  }}>
               <span className='sector-font'>+</span>
               </div>}
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                {robust<=0?<div style={{width:'15px',height:'15px',marginRight:'4px'}}></div>:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(robust<=0) {setRobust(0);return;} 
                 setRobust(--robust)
                 setRadio(100-guarantee-robust);
                  }}>
               <span className='sector-font'>-</span>
               </div>}
                <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'8px',marginRight:'8px',justifyContent:'center'}}>
                <span className='sector-font'>{robust}</span><span className='sector-font'>%</span>
                </div>
                {(guarantee+robust)>=100?null:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(robust>=100) {setRobust(100);return;} 
                 setRobust(++robust)
                 setRadio(100-guarantee-robust);
                  }}>
               <span className='sector-font'>+</span>
               </div>}     
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {/* <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                 onClick={()=>{
                  if(radio<=0) {setRadio(0);return;} 
                  setRadio(--radio)
                   }}>
                <span className='sector-font'>-</span>
                </div> */}
                <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'8px',marginRight:'8px',justifyContent:'center'}}>
                <span className='sector-font'>{(radio)}</span><span className='sector-font'>%</span>
                </div>
                {/* <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                 onClick={()=>{
                  if(radio>=100) {setRadio(100);return;} 
                  setRadio(++radio)
                   }}>
                <span className='sector-font'>+</span>
                </div> */}
              </div>
              {/* <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                 onClick={()=>{
                  if(days<=0) {setDays(0);return;} 
                  setDays(--days)
                   }}>
                <span className='sector-font'>-</span>
                </div>
                <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'8px',marginRight:'8px',justifyContent:'center'}}>
                <span className='sector-font'>{days}</span><span className='sector-font'>%</span>
                </div>
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                 onClick={()=>{
                  if(days>=100) {setDays(100);return;} 
                  setDays(++days)
                   }}>
                <span className='sector-font'>+</span>
                </div>
              </div> */}
            </div>
            <div style={{width:'100px',height:'160px',marginLeft:'16px'}}>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
              <span className='sector-font'>{(guarantee/100*foundNumb).toFixed(2)}</span><span className='sector-font'>{unitSticker[unit]}</span>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
              <span className='sector-font'>{(robust/100*foundNumb).toFixed(2)}</span><span className='sector-font'>{unitSticker[unit]}</span>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
              <span className='sector-font'>{(radio/100*foundNumb).toFixed(2)}</span><span className='sector-font'>{unitSticker[unit]}</span>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// window.addEventListener('load', eventWindowLoaded, false);

// function eventWindowLoaded () {
//   //canvasApp(); //包含整个Canvas应用程序
// }
function canvasSupport (e) {
	  return !!e.getContext;
}
function canvasApp (proportion) {
  var myCanvas = document.getElementById('myCanvas');

  if (!canvasSupport(myCanvas)) {
	  return; 
	}
  
  var ctx = myCanvas.getContext('2d');
  myCanvas.height = myCanvas.height;
  
  console.log(proportion);
  // 封装一个扇形函数
  
  // ctx: Canvas绘图环境
  // x,y: 位移目标点
  // r: 圆弧半径
  // sDeg: 旋转起始角度
  // eDeg: 旋转终点角度
  
  function drawSector(ctx, x, y,r, sDeg, eDeg) {
    // 初始保存
    ctx.save();
    
    //位移到目标点
    ctx.translate(x, y);
    ctx.beginPath();
    
    // 画出圆弧
    ctx.arc(0, 0, r, sDeg, eDeg);
    
    // 再次保存以备旋转
    ctx.save();
    
    // 旋转至起始角度
    ctx.rotate(eDeg);
    
    // 移动到终点，准备连接终点与圆心
    ctx.moveTo(r, 0);
    
    // 连接到圆心
    ctx.lineTo(0, 0);
    
    // 还原
    ctx.restore();
    
    // 旋转至起点角度
    ctx.rotate(sDeg);
    
    // 从圆心连接到起点
    ctx.lineTo(r, 0);
    
    ctx.closePath();
    // 还原到最初保存的状态
    ctx.restore();
  }
  function draw(o){
    let deg = Math.PI / 180;
    for (var i = 0; i < o.sDeg.length; i++) {
      drawSector(ctx,o.x, o.y, o.r, o.sDeg[i] * deg, o.eDeg[i] * deg);
      ctx.fill();
      ctx.fillStyle = o.style[i];
    }
  }
  function drawScreen () {
    function convert(deg){
      let res = deg / 100 * 360 - 90;
      console.log(res);
      return res;
    }
    let guaranteeObj = {
      x: 100,
      y: 100,
      r: 80,
      sDeg: [-90,-90],
      eDeg: [-90,convert(proportion[0])],
      style: ['#2683c6']
    }
    let robustObj = {
      x: 100,
      y: 100,
      r: 80,
      sDeg: [-90,convert(proportion[0])],
      eDeg: [-90,convert(proportion[0]+proportion[1])],
      style: ['#1cade4']
    }
    let radioObj = {
      x: 100,
      y: 100,
      r: 80,
      sDeg: [-90,convert(proportion[0]+proportion[1])],
      eDeg: [-90,270],
      style: ['#1de9b6']
    }
    var mask = {
      x: 100,
      y: 100,
      r: 30,
      sDeg: [-90,-90],
      eDeg: [-90,270],
      style: ['#ffffff']
    }
    draw(guaranteeObj);
    draw(robustObj);
    draw(radioObj)
    draw(mask)
  }
  
  drawScreen();
  
}

