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
const accuracyColor = [
  "#f48fb1",
  "#ec407a",
  "#d81b60",
  "#ad1457"
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
  let [name,setName] = useState('某某某');
  let [foundNumb,setFoundNumb] = useState(100);
  let [found,setFound] = useState('100');
  let [unit,setUnit] = useState(0);
  let [guarantee,setGuarantee] = useState(65);
  let [robust,setRobust] = useState(25);
  let [radio,setRadio] = useState(10);
  let [days,setDays] = useState(0);
  let [guaranteeTypeStatic,setGuaranteeTypeStatic] = useState(9.2);
  let [robustTypeIncrease,setRobustTypeIncrease] = useState(25);
  let [radioTypeIncrease,setRadioTypeIncrease] = useState(35);
  let [datefrom,setDateFrom] = useState(null);
  let [dateto,setDateTo] = useState(null);
  let [accuracy,setAccuracy] = useState(0.01);
  useEffect(()=>{
    canvasApp([guarantee,robust,radio,days]);
  },[guarantee,robust,radio,days])
  return (
    <div style={{width:'100vw',height:'100vh',display:'flex',alignItems:'center',flexDirection:'column'}}>
      <div style={{width:'90vw',height:'250px',marginTop:'100px',backgroundColor:'white',border:'solid 3px '+borderColor,borderRadius:'10px'}}>
        <div style={{width:'100%',height:'50px',backgroundColor:edit?secondaryColor:primaryColor,borderRadius:'6px 6px 0 0',display:'flex',alignItems:'center'}}>
          <div>
            <span className='web-font'>姓名：</span>
            {
              edit?<input className='web-input-font' type='text' style={{border:'solid 2px white',borderRadius:'5px',height:'28px',width:'150px'}} value={name} onChange={(e)=>{setName(e.currentTarget.value)}}/>:<span className='web-font'>{name}</span>
            }
          </div>
          <div style={{marginLeft:'16px'}}>
            <span className='web-font'>资金投入：</span>
            {
              edit?<input className='web-input-font' type='text' style={{border:'solid 2px white',borderRadius:'5px',height:'28px',width:'150px'}} value={found} onChange={(e)=>{
                setFoundNumb(e.currentTarget.value.replace(/[^\d]/g,''))
                setFound(e.currentTarget.value.replace(/[^\d]/g,'').replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,"));
              }}/>:<span className='web-font'>{found}</span>
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
          <div style={{marginLeft:'16px'}}>
            {edit?
            <>
              <span className='web-font'>从</span>
              <input className='web-select-date-font' id='date-from' type='date' style={{height:'30px',width:'150px',border:'solid 2px white',borderRadius:'5px'}} onChange={(e)=>{setDateFrom(e.currentTarget.value)}}/>
              <span className='web-font'>至</span>
              <input className='web-select-date-font' id='date-to' type='date' style={{height:'30px',width:'150px',border:'solid 2px white',borderRadius:'5px'}} onChange={(e)=>{setDateTo(e.currentTarget.value)}}/>
              {datefrom&&dateto?
              <>
                <span className='web-font'>共计</span>
                <span className='web-font'>{GetNumberOfDays(datefrom,dateto)}</span>
                <span className='web-font'>天</span>
              </>:null}
            </>:
            <>
              <span className='web-font'>从</span>
              <span className='web-font'>{datefrom}</span>
              <span className='web-font'>至</span>
              <span className='web-font'>{dateto}</span>
              {datefrom&&dateto?
              <>
                <span className='web-font'>共计</span>
                <span className='web-font'>{GetNumberOfDays(datefrom,dateto)}</span>
                <span className='web-font'>天</span>
              </>:null}
            </>
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
          <div style={{width:'25%',height:'100%',display:'flex',alignItems:'center'}}>
            <div style={{width:'75px',height:'160px'}}>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#2683c6',marginRight:'8px'}}/>
                <span className='sector-font'>保障</span>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#1cade4',marginRight:'8px'}}/>
                <span className='sector-font'>稳健</span>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#1de9b6',marginRight:'8px'}}/>
                <span className='sector-font'>激进</span>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'20px',marginRight:'8px',display:'flex',alignItems:'flex-end',marginTop:'-6px'}}>
                  <div style={{width:'5px',height:'5px',backgroundColor:'#f48fb1',marginRight:'2px'}}/>
                  <div style={{width:'5px',height:'10px',backgroundColor:'#ec407a',marginRight:'2px'}}/>
                  <div style={{width:'5px',height:'15px',backgroundColor:'#d81b60',marginRight:'2px'}}/>
                </div>
                <span className='sector-font'>精度</span>
              </div>
            </div>
            <div style={{width:'120px',height:'160px'}}>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                {guarantee<=0?<div style={{width:'15px',height:'15px',marginRight:'4px'}}></div>:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(guarantee<=0) {setGuarantee(0);return;} 
                 setRadio(radio+accuracy);
                 setGuarantee(guarantee-accuracy)
                  }}>
               <span className='sector-font'>-</span>
               </div>}
               <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'16px',marginRight:'16px',justifyContent:'center'}}>
                <span className='sector-font' style={{color:'#2683c6'}}>{guarantee.toFixed(2)}</span><span className='sector-font' style={{color:'#2683c6'}}>%</span>
                </div>
                {(guarantee+robust)>=100?null:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(guarantee>=100) {setGuarantee(100);return;} 
                 setRadio(radio-accuracy);
                 setGuarantee(guarantee+accuracy)
                  }}>
               <span className='sector-font'>+</span>
               </div>}
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                {robust<=0?<div style={{width:'15px',height:'15px',marginRight:'4px'}}></div>:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(robust<=0) {setRobust(0);return;}
                 setRadio(radio+accuracy);
                 setRobust(robust-accuracy)
                  }}>
               <span className='sector-font'>-</span>
               </div>}
               <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'16px',marginRight:'16px',justifyContent:'center'}}>
                <span className='sector-font' style={{color:'#1cade4'}}>{robust.toFixed(2)}</span><span className='sector-font' style={{color:'#1cade4'}}>%</span>
                </div>
                {(guarantee+robust)>=100?null:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(robust>=100) {setRobust(100);return;} 
                 setRadio(radio-accuracy);
                 setRobust(robust+accuracy)
                  }}>
               <span className='sector-font'>+</span>
               </div>}     
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'16px',marginRight:'16px',justifyContent:'center'}}>
                <span className='sector-font' style={{color:'#1de9b6'}}>{radio.toFixed(2)}</span><span className='sector-font' style={{color:'#1de9b6'}}>%</span>
                </div>
              </div>
            <div style={{width:'120px',height:'160px'}}>
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <select className='web-select-type-font' onChange={(e)=>{
                setAccuracy(Number(e.currentTarget.value))
              }} style={{color:accuracyColor[1],border:'solid 2px white',borderRadius:'10px',width:'60px',height:'36px'}}>
                <option>0.01</option>
                <option>0.1</option>
                <option>1</option>
                <option>10</option>
              </select>
            </div>
            </div>
            </div>
            {foundNumb!=0?
            <div style={{width:'100px',height:'160px',marginLeft:'16px'}}>
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
            <span className='sector-font' style={{color:'#2683c6'}}>{(guarantee/100*foundNumb).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}</span><span className='sector-font'>{unitSticker[unit]}</span>
            </div>
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
            <span className='sector-font' style={{color:'#1cade4'}}>{(robust/100*foundNumb).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}</span><span className='sector-font'>{unitSticker[unit]}</span>
            </div>
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
            <span className='sector-font' style={{color:'#1de9b6'}}>{(radio/100*foundNumb).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}</span><span className='sector-font'>{unitSticker[unit]}</span>
            </div>
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
            </div>
          </div>:null}
          </div>
          <div style={{width:'20%',height:'100%',display:'flex',alignItems:'center'}}>
          <div style={{width:'35px',height:'160px'}}>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#2683c6',marginRight:'8px'}}/>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#1cade4',marginRight:'8px'}}/>
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                <div style={{width:'20px',height:'10px',backgroundColor:'#1de9b6',marginRight:'8px'}}/>
              </div>
          </div>
          <div style={{width:'100px',height:'160px'}}>
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
              <select className='web-select-type-font'  style={{border:'solid 2px white',borderRadius:'10px',width:'85px',height:'36px'}}>
                <option>定融固收</option>
              </select>
            </div>
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
              <select className='web-select-type-font'  style={{border:'solid 2px white',borderRadius:'10px',width:'85px',height:'36px'}}>
                <option>稳健增值</option>
              </select>
            </div>
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
              <select className='web-select-type-font'  style={{border:'solid 2px white',borderRadius:'10px',width:'85px',height:'36px'}}>
                <option>激进增值</option>
              </select>
            </div>
          </div>
          <div style={{width:'120px',height:'160px'}}>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                {guaranteeTypeStatic<=-100?<div style={{width:'15px',height:'15px',marginRight:'4px'}}></div>:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(guaranteeTypeStatic<=-100) {setGuaranteeTypeStatic(-100);return;} 
                 setGuaranteeTypeStatic(guaranteeTypeStatic-accuracy)
                  }}>
               <span className='sector-font'>-</span>
               </div>}
                <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'16px',marginRight:'16px',justifyContent:'center'}}>
                <span className='sector-font' style={{color:'#2683c6'}}>{guaranteeTypeStatic.toFixed(2)}</span><span className='sector-font' style={{color:'#2683c6'}}>%</span>
                </div>
                {(guaranteeTypeStatic)>=100?null:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(guaranteeTypeStatic>=100) {setGuaranteeTypeStatic(100);return;} 
                 setGuaranteeTypeStatic(guaranteeTypeStatic+accuracy)
                  }}>
               <span className='sector-font'>+</span>
               </div>}
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                {robustTypeIncrease<=-100?<div style={{width:'15px',height:'15px',marginRight:'4px'}}></div>:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(robustTypeIncrease<=-100) {setRobustTypeIncrease(-100);return;} 
                 setRobustTypeIncrease(robustTypeIncrease-accuracy)
                  }}>
               <span className='sector-font'>-</span>
               </div>}
               <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'16px',marginRight:'16px',justifyContent:'center'}}>
                <span className='sector-font' style={{color:'#1cade4'}}>{robustTypeIncrease.toFixed(2)}</span><span className='sector-font' style={{color:'#1cade4'}}>%</span>
                </div>
                {(robustTypeIncrease)>=100?null:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(robustTypeIncrease>=100) {setRobustTypeIncrease(100);return;} 
                 setRobustTypeIncrease(robustTypeIncrease+accuracy)
                  }}>
               <span className='sector-font'>+</span>
               </div>}     
              </div>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
                {radioTypeIncrease<=-100?<div style={{width:'15px',height:'15px',marginRight:'4px'}}></div>:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(radioTypeIncrease<=-100) {setRadioTypeIncrease(-100);return;} 
                 setRadioTypeIncrease(radioTypeIncrease-accuracy)
                  }}>
               <span className='sector-font'>-</span>
               </div>}
               <div style={{width:'45px',height:'15px',display:'flex',marginLeft:'16px',marginRight:'16px',justifyContent:'center'}}>
                <span className='sector-font' style={{color:'#1de9b6'}}>{radioTypeIncrease.toFixed(2)}</span><span className='sector-font' style={{color:'#1de9b6'}}>%</span>
                </div>
                {(radioTypeIncrease)>=100?null:
                <div style={{width:'15px',height:'15px',display:'flex',border:'solid 2px #546e7a',borderRadius:'5px',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
                onClick={()=>{
                 if(radioTypeIncrease>=100) {setRadioTypeIncrease(100);return;} 
                 setRadioTypeIncrease(radioTypeIncrease+accuracy)
                  }}>
               <span className='sector-font'>+</span>
               </div>}
              </div>
            </div>
          </div>
          <div style={{width:'15%',height:'100%',display:'flex',alignItems:'center'}}>
          <div style={{width:'100px',height:'160px'}}>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                <span className='sector-font'>年化收益率：</span>
              </div>
              {foundNumb!=0&&datefrom&&dateto&&GetNumberOfDays(datefrom,dateto)>0?
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
              <pre style={{margin:0}} className='sector-font'>年  收益率：</pre>
              </div>:
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <pre style={{margin:0}} className='sector-font' style={{color:'#cfd8dc'}}>年  收益率 </pre>
              </div>}
          </div>
          <div style={{width:'100px',height:'160px'}}>
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span className='sector-font' style={{color:'#2683c6'}}>{((guarantee/100*guaranteeTypeStatic/100+robust/100*robustTypeIncrease/100+radio/100*radioTypeIncrease/100)*100).toFixed(2)}</span><span className='sector-font' style={{color:'#2683c6'}}>%</span>
              </div>
              {foundNumb!=0&&datefrom&&dateto&&GetNumberOfDays(datefrom,dateto)>0?
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span className='sector-font' style={{color:'#2683c6'}}>{
              (((((guarantee/100*guaranteeTypeStatic/100+robust/100*robustTypeIncrease/100+radio/100*radioTypeIncrease/100)*foundNumb)*GetNumberOfDays(datefrom,dateto)/365)/foundNumb)*100).toFixed(2)
              }</span><span className='sector-font' style={{color:'#2683c6'}}>%</span>
              </div>:
              null
              }
          </div>
          </div>
          <div style={{width:'25%',height:'100%',display:'flex',alignItems:'center'}}>
          <div style={{width:'100px',height:'160px'}}>
            {foundNumb!=0?
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span className='sector-font'>年化收益：</span>
          </div>:
          <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          <span className='sector-font' style={{color:'#cfd8dc'}}>年化收益</span>
          </div>}
              {foundNumb!=0&&datefrom&&dateto&&GetNumberOfDays(datefrom,dateto)>0?
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
              <span className='sector-font'>实际收益：</span>
            </div>:
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span className='sector-font' style={{color:'#cfd8dc'}}>实际收益</span>
          </div>}
          {foundNumb!=0&&datefrom&&dateto&&GetNumberOfDays(datefrom,dateto)>0?
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
              <span className='sector-font'>预计本利：</span>
            </div>:
            <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <span className='sector-font' style={{color:'#cfd8dc'}}>预计本利</span>
          </div>}
          </div>
          <div style={{width:'100px',height:'160px'}}>
              {foundNumb!=0?
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
              <span className='sector-font' style={{color:'#2683c6'}}>{
                String(((guarantee/100*guaranteeTypeStatic/100+robust/100*robustTypeIncrease/100+radio/100*radioTypeIncrease/100)*foundNumb).toFixed(2)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
              }</span><span className='sector-font'>{unitSticker[unit]}</span>
              </div>:null}
              {foundNumb!=0&&datefrom&&dateto&&GetNumberOfDays(datefrom,dateto)>0?
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
              <span className='sector-font' style={{color:'#2683c6'}}>{
              ((((guarantee/100*guaranteeTypeStatic/100+robust/100*robustTypeIncrease/100+radio/100*radioTypeIncrease/100)*foundNumb)*GetNumberOfDays(datefrom,dateto)/365).toFixed(2)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
              }</span><span className='sector-font'>{unitSticker[unit]}</span>
              </div>:null}
              {foundNumb!=0&&datefrom&&dateto&&GetNumberOfDays(datefrom,dateto)>0?
              <div style={{width:'100%',height:'25%',display:'flex',alignItems:'center'}}>
              <span className='sector-font' style={{color:'#2683c6'}}>{
              ((((guarantee/100*guaranteeTypeStatic/100+robust/100*robustTypeIncrease/100+radio/100*radioTypeIncrease/100)*foundNumb)*GetNumberOfDays(datefrom,dateto)/365+Number(foundNumb)).toFixed(2)).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
              }</span><span className='sector-font'>{unitSticker[unit]}</span>
              </div>:null}
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

function GetNumberOfDays(date1,date2){//获得天数
  //date1：开始日期，date2结束日期
  var a1 = Date.parse(new Date(date1));
  var a2 = Date.parse(new Date(date2));
  var day = parseInt((a2-a1)/ (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
  return day
};