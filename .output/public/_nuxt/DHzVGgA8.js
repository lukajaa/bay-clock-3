import{f as J,L as m,g as q,s as I,l as H,o as n,c as r,a as S,F as E,B,i as x,t as d,n as P}from"./Cm_u7RMM.js";import{u as Q,c as U,a as X,s as Z,i as j,d as ee,r as te}from"./Cbwb8Jd8.js";const se={class:"flex min-h-[384px] w-full flex-row gap-4 overflow-x-scroll p-8"},ae={class:"text-center text-2xl font-semibold"},le={key:0,class:"text-xl font-semibold md:text-2xl"},oe={key:1,class:"text-lg font-semibold md:text-xl"},ne={class:"text-lg font-semibold md:text-xl"},re={key:0},ue={key:1},ve=J({__name:"schedule",setup(ie){Q();const D=m({}),L=U(),M=q(),{blockNames:b,clubs:_,activityDays:T,activitySchedule:u,activityName:p,immersiveName:w,hasSpecialFlex:$,flexBlock:C,specialFlexDay:G,specialFlexName:K,customSpecialFlexName:R,advisoryDay:k,showOneOnOnes:V}=I(L),{time:W}=I(M),Y=te,O=["Monday","Tuesday","Wednesday","Thursday","Friday"],N=["bg-blue-500","bg-red-500","bg-yellow-500","bg-green-500","bg-purple-500","bg-orange-500","bg-pink-500","bg-indigo-500","bg-cyan-500","bg-lime-500","bg-rose-500"],c=m({}),v=m(0),A=m(!1);return H(()=>{const h={};for(const g of O){const l=new Date(W.value),f=l.getDay(),i=l.getDate()-f+O.indexOf(g)+1;l.setDate(i);const t=X(l,"dddd");let F=!1,o={};for(const[a,e]of Object.entries(Y[t.value]))a==="Group Advisory/1-on-1s"?k.value?t.value===k.value?o["Group Advisory"]=e:V.value==="Yes"&&(o["Advisor 1-on-1"]=e):o[a]=e:a===C.value&&$.value==="Yes"&&t.value===G.value?o[R.value||K.value]=e:o[a]=e;for(const[a,e]of Object.entries(Z)){const s=new Date(a);l.toDateString()===s.toDateString()&&(o=e)}for(const a of j.dates){const e=new Date(a.start),s=new Date(a.end);l>=e&&l<=s&&(o=j.schedule,A.value=!0)}for(const[a,e]of Object.entries(ee)){const s=new Date(e.start),z=new Date(e.end);l>=s&&l<=z&&(o={[a]:{start:{hour:0,minute:0},end:{hour:23,minute:59}}},F=!0)}const y={};for(const[a,e]of Object.entries(o)){let s=a;b.value[s]?s=b.value[s]:s==="Lunch"?_.value[t.value]&&(s=_.value[t.value]):(s==="Immersive Morning"||s==="Immersive Afternoon")&&w.value&&(s=w.value),y[s]={start:`${e.start.hour>12?e.start.hour-12:e.start.hour}:${e.start.minute.toString().padStart(2,"0")}`,end:`${e.end.hour>12?e.end.hour-12:e.end.hour}:${e.end.minute.toString().padStart(2,"0")}`,length:e.end.hour*60+e.end.minute-(e.start.hour*60+e.start.minute)},c.value[s]||(c.value[s]=N[v.value],v.value++)}T.value[t.value]&&!F&&(y[p.value||"Activities + Sports/Drama"]={start:u.value[t.value].start,end:u.value[t.value].end,length:parseInt(u.value[t.value].end.split(":")[0])*60+parseInt(u.value[t.value].end.split(":")[1])-(parseInt(u.value[t.value].start.split(":")[0])*60+parseInt(u.value[t.value].start.split(":")[1]))},c.value[p.value||"Activities + Sports/Drama"]||(c.value[p.value||"Activities + Sports/Drama"]=N[v.value],v.value++)),h[g]=y}D.value=h}),(h,g)=>(n(),r("div",null,[S("div",se,[(n(!0),r(E,null,B(x(D),(l,f)=>(n(),r("div",{key:f,class:"flex w-2/3 flex-col gap-4 md:w-1/5"},[S("p",ae,d(f),1),(n(!0),r(E,null,B(l,(i,t)=>(n(),r("div",{key:t,class:P(["h-28 w-full rounded-lg pl-2 pt-1",x(c)[t]])},[x(A)&&(t.slice(0,6)==="REMOVE"||t.slice(0,6)==="DELETE")?(n(),r("p",le,d(t.slice(6)),1)):(n(),r("p",oe,d(t),1)),S("div",ne,[i.start==="0:00"&&i.end==="11:59"?(n(),r("p",re," All Day ")):(n(),r("p",ue,d(i.start)+" - "+d(i.end),1))])],2))),128))]))),128))])]))}});export{ve as default};
