import{l as N,d as B,a as z,D as me,m as le,b,w as m,v as g,u as s,o as h,c as y,e as i,f as r,V as f,g as l,t as x,h as A,i as _,j as T,k as ae,n as U,p as V,q as K,F as O,r as te,s as M,x as ge,y as ce,z as w,A as pe,B as de,C as H,E as re,G as ne,H as be,I as fe,J as Ae,K as ye,L as J,M as oe,N as ue,O as he,P as ke,Q as ve,R as we,S as _e,T as xe}from"./vendor.08b318ad.js";const Ce=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function o(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerpolicy&&(c.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?c.credentials="include":n.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(n){if(n.ep)return;n.ep=!0;const c=o(n);fetch(n.href,c)}};Ce();const Q=N.createInstance({storeName:"writer-settings",description:"Settings data"}),j=B("settings",{state:()=>({headline_scheme:null,formatting_options:null,notice_boards:null,copy_allowed:null,primary_color:null,primary_text_color:null}),getters:{primaryColorCss:e=>e.primary_color?"#"+e.primary_color:"",primaryTextColorCss:e=>e.primary_text_color?"#"+e.primary_text_color:"",primaryTextColorFullCss:e=>e.primary_text_color?"color: #"+e.primary_text_color+";":""},actions:{setData(e){this.headline_scheme=e.headline_scheme,this.formatting_options=e.formatting_options,this.notice_boards=e.notice_boards,this.copy_allowed=e.copy_allowed,this.primary_color=e.primary_color,this.primary_text_color=e.primary_text_color},async clearStorage(){try{await Q.clear()}catch(e){console.log(e)}},async loadFromStorage(){try{const e=await Q.getItem("settings");this.setData(e)}catch(e){console.log(e)}},async loadFromData(e){try{await Q.setItem("settings",e),this.setData(e)}catch(t){console.log(t)}}}}),P=N.createInstance({storeName:"writer-layout",description:"Layout data"}),G=B("layout",{state:()=>({expandedColumn:"left",leftContent:"instructions",rightContent:"essay",showTimer:!0}),getters:{isLeftExpanded:e=>e.expandedColumn=="left",isRightExpanded:e=>e.expandedColumn=="right",isLeftVisible:e=>e.expandedColumn!="right",isRightVisible:e=>e.expandedColumn!="left",isInstructionsSelected:e=>e.leftContent=="instructions",isResourcesSelected:e=>e.leftContent=="resources",isInstructionsVisible:e=>e.expandedColumn!="right"&&e.leftContent=="instructions",isResourcesVisible:e=>e.expandedColumn!="right"&&e.leftContent=="resources",isEssayVisible:e=>e.expandedColumn!="left"&&e.rightContent=="essay"},actions:{async clearStorage(){try{await P.clear()}catch(e){console.log(e)}},async loadFromStorage(){try{const e=await P.getItem("layout");e&&(this.expandedColumn=e.expandedColumn,this.rightContent=e.rightContent,this.showTimer=e.showTimer)}catch(e){console.log(e)}},async saveToStorage(){try{await P.setItem("layout",{expandedColumn:this.expandedColumn,leftContent:this.leftContent,rightContent:this.rightContent,showTimer:this.showTimer})}catch(e){console.log(e)}},showInstructions(){this.setLeftVisible(),this.leftContent="instructions",this.saveToStorage()},showResources(){this.setLeftVisible(),this.leftContent="resources",this.saveToStorage()},showEssay(){this.setRightVisible(),this.rightContent="essay",this.saveToStorage()},setLeftVisible(){this.isLeftVisible||(this.expandedColumn="left",this.saveToStorage())},setRightVisible(){this.isRightVisible||(this.expandedColumn="right",this.saveToStorage())},setLeftExpanded(e){this.expandedColumn=e?"left":"none",this.saveToStorage()},setRightExpanded(e){this.expandedColumn=e?"right":"none",this.saveToStorage()},toggleTimer(){this.showTimer=!this.showTimer,this.saveToStorage()}}}),C=N.createInstance({storeName:"writer-resources",description:"Resource data"}),$=B("resources",{state:()=>({keys:[],resources:[],activeKey:""}),getters:{hasResources:e=>e.resources.length>0,activeTitle(e){const t=e.resources.find(o=>o.key==e.activeKey);return t?t.title:""},getResource(e){return t=>e.resources.find(o=>o.key==t)},isActive(e){return t=>e.activeKey==t.key}},actions:{async clearStorage(){try{await C.clear()}catch(e){console.log(e)}},async loadFromStorage(){var e;try{const t=await C.getItem("resourceKeys");t&&(this.keys=JSON.parse(t)),this.activeKey=(e=await C.getItem("activeKey"))!=null?e:[],this.resources=[];let o=0;for(;o<this.keys.length;){let a=await C.getItem(this.keys[o]);this.resources.push(a),o++}await this.loadFiles()}catch(t){console.log(t)}},async loadFromData(e){const t=D();try{await C.clear(),this.keys=[],this.resources=[];let o=0;for(;o<e.length;){let a=e[o];a.url=t.resourceUrl(a.key),this.resources.push(a),this.keys.push(a.key),await C.setItem(a.key,a),o++}await C.setItem("resourceKeys",JSON.stringify(this.keys)),await C.setItem("activeKey",this.activeKey),await this.loadFiles()}catch(o){console.log(o)}},async selectResource(e){this.activeKey=e.key,await C.setItem("activeKey",this.activeKey)},async loadFiles(){let e=0;for(;e<this.keys.length;){let t=this.getResource(this.keys[e]),o=null;if(t.type=="file")try{console.log("preload "+t.title+"..."),o=await z(t.url,{responseType:"blob",timeout:6e4}),t.objectUrl=URL.createObjectURL(o.data),console.log("finished. ")}catch(a){return console.error(a),!1}e++}}}}),p=N.createInstance({storeName:"writer-essay",description:"Essay data"}),F=new me,X=1e3,Se=5e3,Ie=5e3,De=10,Ee=1e3,Y={storedContent:"",storedHash:"",history:[],lastStoredIndex:-1,lastSentIndex:-1,lastSentHash:"",currentContent:"",sumOfDistances:0,lastCheck:0,lastSave:0,lastSending:0};let R=0,ie=0;const L=B("essay",{state:()=>Y,getters:{hasHistory:e=>e.history.length>0,historyLength:e=>e.history.length,openSendings:e=>e.lastStoredIndex-e.lastSentIndex,unsentHistory(e){let t=[],o=e.lastSentIndex+1;for(;o<e.history.length;)t.push(e.history[o]),o++;return t},formatTimestamp(){return e=>new Date(e).toISOString().slice(0,19).replace("T"," ")},formatIndex(){return e=>e.toString().padStart(9,"0")},makeHash(){return(e,t)=>le(e+t)}},actions:{async clearStorage(){try{await p.clear()}catch(e){console.log(e)}},addToHistory(e,t=0){let o=this.history.push(e)-1;return e.is_delta?this.sumOfDistances+=t:this.sumOfDistances=0,o},async loadFromData(e){var t,o,a;R=1;try{this.$state=Y,this.currentContent=(t=e.content)!=null?t:"",this.storedContent=(o=e.content)!=null?o:"",this.storedHash=(a=e.hash)!=null?a:"",await p.clear(),await p.setItem("storedContent",this.storedContent),await p.setItem("storedHash",this.storedHash);let n=0;for(;n<e.steps.length;){let c=e.steps[n],d={is_delta:c.is_delta,timestamp:c.timestamp,content:c.content,hash_before:c.hash_before,hash_after:c.hash_after};this.addToHistory(d),await p.setItem(this.formatIndex(n),d),n++}this.lastStoredIndex=this.history.length-1,this.lastSentIndex=this.history.length-1,this.lastSentHash=this.storedHash,await p.setItem("lastStoredIndex",this.lastStoredIndex),await p.setItem("lastSentIndex",this.lastSentIndex),await p.setItem("lastSentHash",this.lastSentHash)}catch(n){console.log(n)}R=0,setInterval(this.updateContent,X)},async loadFromStorage(){var e,t,o,a,n;R=1;try{this.$state=Y,this.lastStoredIndex=(e=await p.getItem("lastStoredIndex"))!=null?e:-1,this.lastSentIndex=(t=await p.getItem("lastSentIndex"))!=null?t:-1,this.lastSentHash=(o=await p.getItem("lastSentHash"))!=null?o:"",this.storedContent=(a=await p.getItem("storedContent"))!=null?a:"",this.storedHash=(n=await p.getItem("storedHash"))!=null?n:"",this.currentContent=this.storedContent;let c=0;for(;c<=this.lastStoredIndex;){let d=await p.getItem(this.formatIndex(c));if(d==null)break;this.addToHistory(d),c++}}catch(c){console.log(c)}R=0,setInterval(this.updateContent,X)},async updateContent(e=!1){const t=D(),o=Date.now();if(!(o-this.lastCheck<X||R++||S().writingEndReached)){try{const n=this.currentContent+"";let c=null;if(n!=this.storedContent){const d=this.makeHash(n,t.serverTime(o));let u=F.diff_main(this.storedContent,n);F.diff_cleanupEfficiency(u);const k=F.diff_levenshtein(u),v=F.patch_toText(F.patch_make(this.storedContent,u)),W=F.patch_apply(F.patch_fromText(v),this.storedContent);this.history.length==0||v.length>n.length||this.sumOfDistances+k>Ee||W[0]!=n?c={is_delta:0,timestamp:t.serverTime(o),content:n,hash_before:this.storedHash,hash_after:d}:(k>=De||o-this.lastSave>Se)&&(c={is_delta:1,timestamp:t.serverTime(o),content:v,hash_before:this.storedHash,hash_after:d}),c!==null&&(this.lastStoredIndex=this.addToHistory(c,k),this.lastSave=o,this.storedContent=n,this.storedHash=d,await p.setItem("storedContent",this.storedContent),await p.setItem("storedHash",this.storedHash),await p.setItem(this.formatIndex(this.lastStoredIndex),c),await p.setItem("lastStoredIndex",this.lastStoredIndex),console.log("Delta:",c.is_delta,"| Distance (sum): ",k,"(",this.sumOfDistances,")","| Editor: ",e,"| Duration:",Date.now()-o,"ms"))}this.lastCheck=o,this.sendUpdate()}catch(n){console.error(n)}R=0}},async sendUpdate(){if(Date.now()-this.lastSending<Ie||ie++)return;let e=[],t=this.lastSentIndex,o=this.lastSentHash,a=this.lastSentIndex+1;for(;a<this.history.length;)e.push(this.history[a]),o=this.history[a].hash_after,t=a++;e.length>0&&(await D().saveWritingStepsToBackend(e)&&(this.lastSentIndex=t,await p.setItem("lastSentIndex",t),await p.setItem("lastSentHash",o)),this.lastSending=Date.now()),ie=!1},async hasUnsentSavingsInStorage(){var e,t;return this.lastStoredIndex=(e=await p.getItem("lastStoredIndex"))!=null?e:-1,this.lastSentIndex=(t=await p.getItem("lastSentIndex"))!=null?t:-1,this.lastStoredIndex>this.lastSentIndex},async hasHashInStorage(e){var t;return this.lastSentHash=(t=await p.getItem("lastSentHash"))!=null?t:"",e==this.lastSentHash}}}),I=N.createInstance({storeName:"writer-alerts",description:"Alert Messages"}),se=B("alerts",{state:()=>({keys:[],alerts:[],activeKey:"",showAllAlerts:!1}),getters:{countAlerts:e=>e.alerts.length,hasAlerts:e=>e.alerts.length>0,hasActiveAlert:e=>e.activeKey!="",activeMessage(e){const t=e.alerts.find(o=>o.key==e.activeKey);return t?t.message:""},getAlert(e){return t=>e.alerts.find(o=>o.key==t)},formatTimestamp(){return e=>new Date(e*1e3).toLocaleString()}},actions:{showAlerts(){this.showAllAlerts=!0},hideAlert(){this.activeKey="",this.showAllAlerts=!1},async clearStorage(){try{await I.clear()}catch(e){console.log(e)}},async loadFromStorage(){var e;try{const t=await I.getItem("alertKeys");t&&(this.keys=JSON.parse(t)),this.activeKey=(e=await I.getItem("activeKey"))!=null?e:"",this.alerts=[];let o=0;for(;o<this.alerts.length;){let a=await I.getItem(this.keys[o]);this.alerts.push(a),o++}}catch(t){console.log(t)}},async loadFromData(e){try{await I.clear();let t=[],o=[],a=0;for(;a<e.length;){let n=e[a];typeof this.getAlert(n.key)=="undefined"&&(this.activeKey=n.key),o.push(n),t.push(n.key),await I.setItem(n.key,n),a++}this.keys=t,this.alerts=o,await I.setItem("alertKeys",JSON.stringify(this.keys)),await I.setItem("activeKey",this.activeKey)}catch(t){console.log(t)}}}}),D=B("api",{state:()=>({backendUrl:"",returnUrl:"",userKey:"",environmentKey:"",dataToken:"",fileToken:"",timeOffset:0,initialized:!1,review:!1,showInitFailure:!1,showReplaceConfirmation:!1,showReloadConfirmation:!1,showFinalizeFailure:!1,showAuthorizeFailure:!1}),getters:{requestConfig(e){return function(t){let o=e.backendUrl,a=new URLSearchParams,n=o.search(/\?+/);return n!=-1&&(a=new URLSearchParams(o.substr(n)),o=o.substr(0,n)),a.append("LongEssayUser",e.userKey),a.append("LongEssayEnvironment",e.environmentKey),a.append("LongEssaySignature",le(e.userKey+e.environmentKey+t)),{baseURL:o,params:a,timeout:3e4,responseType:"json",responseEncoding:"utf8"}}},resourceUrl(){return function(e){const t=this.requestConfig(this.fileToken);return t.baseURL+"/file/"+e+"?"+t.params.toString()}},serverTime(e){return t=>t==0?0:Math.floor((t-e.timeOffset)/1e3)}},actions:{async init(){var a;let e=!1,t=b.get("LongEssayHash");if(this.backendUrl=localStorage.getItem("writerBackendUrl"),this.returnUrl=localStorage.getItem("writerReturnUrl"),this.userKey=localStorage.getItem("writerUserKey"),this.environmentKey=localStorage.getItem("writerEnvironmentKey"),this.dataToken=localStorage.getItem("writerDataToken"),this.fileToken=localStorage.getItem("writerFileToken"),this.timeOffset=Math.floor((a=localStorage.getItem("writerTimeOffset"))!=null?a:0),!!b.get("LongEssayUser")&&b.get("LongEssayUser")!==this.userKey&&(this.userKey=b.get("LongEssayUser"),e=!0),!!b.get("LongEssayEnvironment")&&b.get("LongEssayEnvironment")!==this.environmentKey&&(this.environmentKey=b.get("LongEssayEnvironment"),e=!0),!!b.get("LongEssayBackend")&&b.get("LongEssayBackend")!==this.backendUrl&&(this.backendUrl=b.get("LongEssayBackend")),!!b.get("LongEssayReturn")&&b.get("LongEssayReturn")!==this.returnUrl&&(this.returnUrl=b.get("LongEssayReturn")),!!b.get("LongEssayToken")&&b.get("LongEssayToken")!==this.dataToken&&(this.dataToken=b.get("LongEssayToken")),!this.backendUrl||!this.returnUrl||!this.userKey||!this.environmentKey||!this.dataToken){this.showInitFailure=!0;return}const o=L();e?await o.hasUnsentSavingsInStorage()?(console.log("init: new context, open savings"),this.showReplaceConfirmation=!0):(console.log("init: new context, no open savings"),await this.loadDataFromBackend()):t?await o.hasHashInStorage(t)?(console.log("init: same context, same hash"),await this.loadDataFromStorage()):await o.hasUnsentSavingsInStorage()?(console.log("init: same context, hashes differ, open savings"),this.showReloadConfirmation=!0):(console.log("init: same context, hashes differ, no open savings"),await this.loadDataFromBackend()):await o.hasUnsentSavingsInStorage()?(console.log("init: same context, no server hash, open savings"),await this.loadDataFromStorage()):(console.log("init: same context, no server hash, no open savings"),await this.loadDataFromBackend()),setInterval(this.checkUpdate,5e3)},async loadDataFromStorage(){console.log("loadDataFromStorage..."),this.updateConfig();const e=j(),t=S(),o=$(),a=L(),n=G();await e.loadFromStorage(),await t.loadFromStorage(),await o.loadFromStorage(),await a.loadFromStorage(),await n.loadFromStorage(),this.initialized=!0},async loadDataFromBackend(){console.log("loadDataFromBackend..."),this.updateConfig();let e={};try{e=await z.get("/data",this.requestConfig(this.dataToken)),this.setTimeOffset(e),this.refreshToken(e)}catch(c){console.error(c),this.showInitFailure=!0;return}const t=j(),o=S(),a=$(),n=L();await t.loadFromData(e.data.settings),await o.loadFromData(e.data.task),await a.loadFromData(e.data.resources),await n.loadFromData(e.data.essay),e.data.essay.started||await this.sendStart(),this.initialized=!0},async checkUpdate(){let e={};try{e=await z.get("/update",this.requestConfig(this.dataToken)),this.setTimeOffset(e),this.refreshToken(e)}catch(a){return console.error(a),!1}await S().loadFromData(e.data.task),await se().loadFromData(e.data.alerts)},async sendStart(){let e={},t={started:this.serverTime(Date.now())};try{return e=await z.put("/start",t,this.requestConfig(this.dataToken)),this.setTimeOffset(e),this.refreshToken(e),!0}catch(o){return console.error(o),this.showInitFailure=!0,!1}},async saveWritingStepsToBackend(e){let t={},o={steps:e};try{return t=await z.put("/steps",o,this.requestConfig(this.dataToken)),this.setTimeOffset(t),this.refreshToken(t),!0}catch(a){return console.error(a),!1}},async saveFinalContentToBackend(e,t,o,a){let n={},c={steps:e,content:t,hash:o,authorized:a};try{return n=await z.put("/final",c,this.requestConfig(this.dataToken)),this.refreshToken(n),!0}catch(d){return console.error(d),!1}},updateConfig(){b.remove("LongEssayBackend"),b.remove("LongEssayReturn"),b.remove("LongEssayUser"),b.remove("LongEssayEnvironment"),b.remove("LongEssayToken"),b.remove("LongEssayHash"),localStorage.setItem("writerBackendUrl",this.backendUrl),localStorage.setItem("writerReturnUrl",this.returnUrl),localStorage.setItem("writerUserKey",this.userKey),localStorage.setItem("writerEnvironmentKey",this.environmentKey),localStorage.setItem("writerDataToken",this.dataToken),localStorage.setItem("writerFileToken",this.fileToken)},setTimeOffset(e){const t=e.headers.longessaytime*1e3,o=Date.now();this.timeOffset=o-t,localStorage.setItem("writerTimeOffset",this.timeOffset)},refreshToken(e){e.headers.longessaydatatoken&&(this.dataToken=e.headers.longessaydatatoken,localStorage.setItem("writerDataToken",this.dataToken)),e.headers.longessayfiletoken&&(this.fileToken=e.headers.longessayfiletoken,localStorage.setItem("writerFileToken",this.fileToken))},async finalize(e){const t=j(),o=S(),a=$(),n=L(),c=G();if((e||n.openSendings>0)&&!await this.saveFinalContentToBackend(n.unsentHistory,n.storedContent,n.storedHash,e)){this.showFinalizeFailure=!0,this.showAuthorizeFailure=e;return}await t.clearStorage(),await o.clearStorage(),await a.clearStorage(),await n.clearStorage(),await c.clearStorage(),localStorage.clear(),window.location=this.returnUrl}}}),ee=N.createInstance({storeName:"writer-task",description:"Task data"}),S=B("task",{state:()=>({title:null,writer_name:null,instructions:null,writing_end:null,remaining_time:null}),getters:{hasWritingEnd:e=>!!e.writing_end,writingEndReached:e=>e.remaining_time===0},actions:{setData(e){this.title=e.title,this.instructions=e.instructions,this.writer_name=e.writer_name,this.writing_end=e.writing_end},async clearStorage(){try{await ee.clear()}catch(e){console.log(e)}},async loadFromStorage(){try{const e=await ee.getItem("task");this.setData(e)}catch(e){console.log(e)}this.updateRemainingTime(),setInterval(this.updateRemainingTime,1e3)},async loadFromData(e){try{await ee.setItem("task",e),this.setData(e)}catch(t){console.log(t)}this.updateRemainingTime(),setInterval(this.updateRemainingTime,1e3)},updateRemainingTime(){const e=D();this.writing_end?this.remaining_time=Math.max(0,this.writing_end-e.serverTime(Date.now())):this.remaining_time=null,this.writingEndReached&&(e.review=!0)}}}),Fe={setup(e){const t=S(),o=G();function a(n){const c=("00"+Math.floor(n)%60).slice(-2),d=("00"+Math.floor(n/60)%60).slice(-2),u=("00"+Math.floor(n/3600)%24).slice(-2),k=Math.floor(n/86400);return k>1?k+" Tage "+u+" Stunden":k>0?k+" Tag "+u+" Stunden":u!="00"?u+":"+d+":"+c+" Stunden":d!="00"?d+":"+c+" Minuten":c+" Sekunden"}return(n,c)=>m((h(),y(A,{onClick:c[0]||(c[0]=d=>s(o).toggleTimer())},{default:i(()=>[r(f,{left:"",icon:"mdi-clock-outline"}),m(l("span",null,x(a(s(t).remaining_time)),513),[[g,s(o).showTimer]])]),_:1},512)),[[g,!s(t).writingEndReached]])}},Le=M(" Nachricht der Aufsicht: "),Te=l("span",null,"OK",-1),Be=M(" Nachrichten der Aufsicht: "),Re=l("br",null,null,-1),ze=l("span",null,"OK",-1),He={setup(e){const t=se();return(o,a)=>(h(),_(O,null,[m(r(A,{onClick:a[0]||(a[0]=n=>s(t).showAlerts())},{default:i(()=>[r(f,{left:"",icon:"mdi-bell-outline"}),m(l("span",null,"1 Nachricht",512),[[g,s(t).countAlerts==1]]),m(l("span",null,x(s(t).countAlerts)+" Nachrichten",513),[[g,s(t).countAlerts>1]])]),_:1},512),[[g,s(t).hasAlerts]]),r(K,{persistent:"",modelValue:s(t).hasActiveAlert,"onUpdate:modelValue":a[2]||(a[2]=n=>s(t).hasActiveAlert=n)},{default:i(()=>[r(T,null,{default:i(()=>[r(ae,null,{default:i(()=>[Le]),_:1}),r(U,null,{default:i(()=>[l("p",null,x(s(t).activeMessage),1)]),_:1}),r(V,null,{default:i(()=>[r(A,{onClick:a[1]||(a[1]=n=>s(t).hideAlert())},{default:i(()=>[r(f,{left:"",icon:"mdi-check"}),Te]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(K,{persistent:"",modelValue:s(t).showAllAlerts,"onUpdate:modelValue":a[4]||(a[4]=n=>s(t).showAllAlerts=n)},{default:i(()=>[r(T,null,{default:i(()=>[r(ae,null,{default:i(()=>[Be]),_:1}),r(U,null,{default:i(()=>[(h(!0),_(O,null,te(s(t).alerts,n=>(h(),_(O,{key:n.key},[l("p",null,[l("strong",null,x(s(t).formatTimestamp(n.time)),1)]),l("p",null,x(n.message),1),Re],64))),128))]),_:1}),r(V,null,{default:i(()=>[r(A,{onClick:a[3]||(a[3]=n=>s(t).hideAlert())},{default:i(()=>[r(f,{left:"",icon:"mdi-check"}),ze]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}},Ue=l("span",null,"Beenden ...",-1),Ve=M("Unterbrechen"),Ke=M("Vorschau / Abgabe ..."),Oe={setup(e){const t=D(),o=S(),a=se();function n(){var c;return(o.writer_name==null?"":o.writer_name+", ")+((c=o.title)!=null?c:"")}return(c,d)=>(h(),y(ne,{elevation:"1",color:"white",density:"compact"},{default:i(()=>[r(ge,null,{default:i(()=>[M(x(n()),1)]),_:1}),r(ce),s(a).hasAlerts?(h(),y(He,{key:0})):w("",!0),s(o).hasWritingEnd?(h(),y(Fe,{key:1})):w("",!0),m(r(A,null,{default:i(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),Ue,r(pe,{activator:"parent",anchor:"bottom end",origin:"end top"},{default:i(()=>[r(T,null,{default:i(()=>[r(de,null,{default:i(()=>[r(H,{href:s(t).returnUrl},{default:i(()=>[r(re,null,{default:i(()=>[Ve]),_:1})]),_:1},8,["href"]),r(H,{onClick:d[0]||(d[0]=u=>s(t).review=!0)},{default:i(()=>[r(re,null,{default:i(()=>[Ke]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},512),[[g,!s(t).review]])]),_:1}))}};var q=(e,t)=>{const o=e.__vccOpts||e;for(const[a,n]of t)o[a]=n;return o};const $e={setup(e){const t=G(),o=$();function a(){document.getElementById("app-navigation-drawer").dispatchEvent(new Event("mouseenter"))}function n(){document.getElementById("app-navigation-drawer").dispatchEvent(new Event("mouseleave"))}function c(u){u.type=="url"?window.open(u.source,"long-essay-writer-resource-"+u.key):(o.selectResource(u),t.showResources())}function d(u){switch(u.type){case"url":return o.isActive(u)&&t.isResourcesVisible?"mdi-file-link":"mdi-file-link-outline";default:return o.isActive(u)&&t.isResourcesVisible?"mdi-file":"mdi-file-outline"}}return(u,k)=>(h(),y(Ae,{id:"app-navigation-drawer",elevation:"2",color:"grey-lighten-4",width:"500",permanent:"",rail:"","expand-on-hover":""},{default:i(()=>[r(de,{color:"grey-lighten-4"},{default:i(()=>[r(H,{onClick:k[0]||(k[0]=v=>{s(t).showInstructions(),n()}),"prepend-icon":s(t).isInstructionsVisible?"mdi-text-box":"mdi-text-box-outline",title:"Aufgabenstellung"},null,8,["prepend-icon"]),r(H,{onClick:k[1]||(k[1]=v=>{s(t).showEssay(),n()}),"prepend-icon":s(t).isEssayVisible?"mdi-file-edit":"mdi-file-edit-outline",title:"Essay schreiben"},null,8,["prepend-icon"]),m(r(be,null,{activator:i(({props:v})=>[r(H,fe(v,{onMouseenter:k[2]||(k[2]=W=>a()),"prepend-icon":s(t).isResourcesVisible?"mdi-book-open":"mdi-book-open-outline",title:"Material"}),null,16,["prepend-icon"])]),default:i(()=>[(h(!0),_(O,null,te(s(o).resources,v=>(h(),y(H,{onClick:W=>{c(v),n()},"prepend-icon":d(v),title:v.title,key:v.key},null,8,["onClick","prepend-icon","title"]))),128))]),_:1},512),[[g,s(o).hasResources]])]),_:1})]),_:1}))}};var Ne=q($e,[["__scopeId","data-v-bbfa5284"]]);const Me={setup(e){const t=L();return(o,a)=>(h(),y(ne,{position:"bottom",height:"48",color:"grey-lighten-5",elevation:"1"},{default:i(()=>[M(" \xC4nderungen: "+x(s(t).historyLength)+" | Zu senden: "+x(s(t).openSendings),1)]),_:1}))}};const je=["innerHTML"],Ge={setup(e){const t=S();return(o,a)=>(h(),_("div",{id:"app-instructions",innerHTML:s(t).instructions},null,8,je))}};var qe=q(Ge,[["__scopeId","data-v-68e1ed10"]]);const Je={class:"resources"},Ze={key:0},We=["data"],Qe={setup(e){const t=$();return(o,a)=>(h(),_("div",Je,[(h(!0),_(O,null,te(s(t).resources,n=>(h(),_(O,{key:n.key},[n.type=="file"?m((h(),_("div",Ze,[n.mimetype=="application/pdf"?(h(),_("object",{key:0,type:"application/pdf",data:n.objectUrl,width:"100%",height:"100%"},null,8,We)):w("",!0)],512)),[[g,s(t).isActive(n)]]):w("",!0)],64))),128))]))}};var Pe=q(Qe,[["__scopeId","data-v-2e61ae4e"]]);var Xe=`/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */
.mce-content-body .mce-item-anchor {
  background: transparent url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D'8'%20height%3D'12'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20d%3D'M0%200L8%200%208%2012%204.09117821%209%200%2012z'%2F%3E%3C%2Fsvg%3E%0A") no-repeat center;
  cursor: default;
  display: inline-block;
  height: 12px !important;
  padding: 0 2px;
  -webkit-user-modify: read-only;
  -moz-user-modify: read-only;
  -webkit-user-select: all;
  -moz-user-select: all;
  -ms-user-select: all;
      user-select: all;
  width: 8px !important;
}
.mce-content-body .mce-item-anchor[data-mce-selected] {
  outline-offset: 1px;
}
.tox-comments-visible .tox-comment {
  background-color: #fff0b7;
}
.tox-comments-visible .tox-comment--active {
  background-color: #ffe168;
}
.tox-checklist > li:not(.tox-checklist--hidden) {
  list-style: none;
  margin: 0.25em 0;
}
.tox-checklist > li:not(.tox-checklist--hidden)::before {
  content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-unchecked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2215%22%20height%3D%2215%22%20x%3D%22.5%22%20y%3D%22.5%22%20fill-rule%3D%22nonzero%22%20stroke%3D%22%234C4C4C%22%20rx%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A");
  cursor: pointer;
  height: 1em;
  margin-left: -1.5em;
  margin-top: 0.125em;
  position: absolute;
  width: 1em;
}
.tox-checklist li:not(.tox-checklist--hidden).tox-checklist--checked::before {
  content: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cg%20id%3D%22checklist-checked%22%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%234099FF%22%20fill-rule%3D%22nonzero%22%20rx%3D%222%22%2F%3E%3Cpath%20id%3D%22Path%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20d%3D%22M11.5703186%2C3.14417309%20C11.8516238%2C2.73724603%2012.4164781%2C2.62829933%2012.83558%2C2.89774797%20C13.260121%2C3.17069355%2013.3759736%2C3.72932262%2013.0909105%2C4.14168582%20L7.7580587%2C11.8560195%20C7.43776896%2C12.3193404%206.76483983%2C12.3852142%206.35607322%2C11.9948725%20L3.02491697%2C8.8138662%20C2.66090143%2C8.46625845%202.65798871%2C7.89594698%203.01850234%2C7.54483354%20C3.373942%2C7.19866177%203.94940006%2C7.19592841%204.30829608%2C7.5386474%20L6.85276923%2C9.9684299%20L11.5703186%2C3.14417309%20Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A");
}
[dir=rtl] .tox-checklist > li:not(.tox-checklist--hidden)::before {
  margin-left: 0;
  margin-right: -1.5em;
}
/* stylelint-disable */
/* http://prismjs.com/ */
/**
 * prism.js default theme for JavaScript, CSS and HTML
 * Based on dabblet (http://dabblet.com)
 * @author Lea Verou
 */
code[class*="language-"],
pre[class*="language-"] {
  color: black;
  background: none;
  text-shadow: 0 1px white;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
pre[class*="language-"]::-moz-selection,
pre[class*="language-"] ::-moz-selection,
code[class*="language-"]::-moz-selection,
code[class*="language-"] ::-moz-selection {
  text-shadow: none;
  background: #b3d4fc;
}
pre[class*="language-"]::selection,
pre[class*="language-"] ::selection,
code[class*="language-"]::selection,
code[class*="language-"] ::selection {
  text-shadow: none;
  background: #b3d4fc;
}
@media print {
  code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }
}
/* Code blocks */
pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}
:not(pre) > code[class*="language-"],
pre[class*="language-"] {
  background: #f5f2f0;
}
/* Inline code */
:not(pre) > code[class*="language-"] {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
}
.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: slategray;
}
.token.punctuation {
  color: #999;
}
.namespace {
  opacity: 0.7;
}
.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol,
.token.deleted {
  color: #905;
}
.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin,
.token.inserted {
  color: #690;
}
.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  color: #9a6e3a;
  background: hsla(0, 0%, 100%, 0.5);
}
.token.atrule,
.token.attr-value,
.token.keyword {
  color: #07a;
}
.token.function,
.token.class-name {
  color: #DD4A68;
}
.token.regex,
.token.important,
.token.variable {
  color: #e90;
}
.token.important,
.token.bold {
  font-weight: bold;
}
.token.italic {
  font-style: italic;
}
.token.entity {
  cursor: help;
}
/* stylelint-enable */
.mce-content-body {
  overflow-wrap: break-word;
  word-wrap: break-word;
}
.mce-content-body .mce-visual-caret {
  background-color: black;
  background-color: currentColor;
  position: absolute;
}
.mce-content-body .mce-visual-caret-hidden {
  display: none;
}
.mce-content-body *[data-mce-caret] {
  left: -1000px;
  margin: 0;
  padding: 0;
  position: absolute;
  right: auto;
  top: 0;
}
.mce-content-body .mce-offscreen-selection {
  left: -2000000px;
  max-width: 1000000px;
  position: absolute;
}
.mce-content-body *[contentEditable=false] {
  cursor: default;
}
.mce-content-body *[contentEditable=true] {
  cursor: text;
}
.tox-cursor-format-painter {
  cursor: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%0A%20%20%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23000%22%20fill-rule%3D%22nonzero%22%20d%3D%22M15%2C6%20C15%2C5.45%2014.55%2C5%2014%2C5%20L6%2C5%20C5.45%2C5%205%2C5.45%205%2C6%20L5%2C10%20C5%2C10.55%205.45%2C11%206%2C11%20L14%2C11%20C14.55%2C11%2015%2C10.55%2015%2C10%20L15%2C9%20L16%2C9%20L16%2C12%20L9%2C12%20L9%2C19%20C9%2C19.55%209.45%2C20%2010%2C20%20L11%2C20%20C11.55%2C20%2012%2C19.55%2012%2C19%20L12%2C14%20L18%2C14%20L18%2C7%20L15%2C7%20L15%2C6%20Z%22%2F%3E%0A%20%20%20%20%3Cpath%20fill%3D%22%23000%22%20fill-rule%3D%22nonzero%22%20d%3D%22M1%2C1%20L8.25%2C1%20C8.66421356%2C1%209%2C1.33578644%209%2C1.75%20L9%2C1.75%20C9%2C2.16421356%208.66421356%2C2.5%208.25%2C2.5%20L2.5%2C2.5%20L2.5%2C8.25%20C2.5%2C8.66421356%202.16421356%2C9%201.75%2C9%20L1.75%2C9%20C1.33578644%2C9%201%2C8.66421356%201%2C8.25%20L1%2C1%20Z%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A"), default;
}
.mce-content-body figure.align-left {
  float: left;
}
.mce-content-body figure.align-right {
  float: right;
}
.mce-content-body figure.image.align-center {
  display: table;
  margin-left: auto;
  margin-right: auto;
}
.mce-preview-object {
  border: 1px solid gray;
  display: inline-block;
  line-height: 0;
  margin: 0 2px 0 2px;
  position: relative;
}
.mce-preview-object .mce-shim {
  background: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.mce-preview-object[data-mce-selected="2"] .mce-shim {
  display: none;
}
.mce-object {
  background: transparent url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%3E%3Cpath%20d%3D%22M4%203h16a1%201%200%200%201%201%201v16a1%201%200%200%201-1%201H4a1%201%200%200%201-1-1V4a1%201%200%200%201%201-1zm1%202v14h14V5H5zm4.79%202.565l5.64%204.028a.5.5%200%200%201%200%20.814l-5.64%204.028a.5.5%200%200%201-.79-.407V7.972a.5.5%200%200%201%20.79-.407z%22%2F%3E%3C%2Fsvg%3E%0A") no-repeat center;
  border: 1px dashed #aaa;
}
.mce-pagebreak {
  border: 1px dashed #aaa;
  cursor: default;
  display: block;
  height: 5px;
  margin-top: 15px;
  page-break-before: always;
  width: 100%;
}
@media print {
  .mce-pagebreak {
    border: 0;
  }
}
.tiny-pageembed .mce-shim {
  background: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.tiny-pageembed[data-mce-selected="2"] .mce-shim {
  display: none;
}
.tiny-pageembed {
  display: inline-block;
  position: relative;
}
.tiny-pageembed--21by9,
.tiny-pageembed--16by9,
.tiny-pageembed--4by3,
.tiny-pageembed--1by1 {
  display: block;
  overflow: hidden;
  padding: 0;
  position: relative;
  width: 100%;
}
.tiny-pageembed--21by9 {
  padding-top: 42.857143%;
}
.tiny-pageembed--16by9 {
  padding-top: 56.25%;
}
.tiny-pageembed--4by3 {
  padding-top: 75%;
}
.tiny-pageembed--1by1 {
  padding-top: 100%;
}
.tiny-pageembed--21by9 iframe,
.tiny-pageembed--16by9 iframe,
.tiny-pageembed--4by3 iframe,
.tiny-pageembed--1by1 iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.mce-content-body[data-mce-placeholder] {
  position: relative;
}
.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
  color: rgba(34, 47, 62, 0.7);
  content: attr(data-mce-placeholder);
  position: absolute;
}
.mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before {
  left: 1px;
}
.mce-content-body[dir=rtl][data-mce-placeholder]:not(.mce-visualblocks)::before {
  right: 1px;
}
.mce-content-body div.mce-resizehandle {
  background-color: #4099ff;
  border-color: #4099ff;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  height: 10px;
  position: absolute;
  width: 10px;
  z-index: 1298;
}
.mce-content-body div.mce-resizehandle:hover {
  background-color: #4099ff;
}
.mce-content-body div.mce-resizehandle:nth-of-type(1) {
  cursor: nwse-resize;
}
.mce-content-body div.mce-resizehandle:nth-of-type(2) {
  cursor: nesw-resize;
}
.mce-content-body div.mce-resizehandle:nth-of-type(3) {
  cursor: nwse-resize;
}
.mce-content-body div.mce-resizehandle:nth-of-type(4) {
  cursor: nesw-resize;
}
.mce-content-body .mce-resize-backdrop {
  z-index: 10000;
}
.mce-content-body .mce-clonedresizable {
  cursor: default;
  opacity: 0.5;
  outline: 1px dashed black;
  position: absolute;
  z-index: 10001;
}
.mce-content-body .mce-clonedresizable.mce-resizetable-columns th,
.mce-content-body .mce-clonedresizable.mce-resizetable-columns td {
  border: 0;
}
.mce-content-body .mce-resize-helper {
  background: #555;
  background: rgba(0, 0, 0, 0.75);
  border: 1px;
  border-radius: 3px;
  color: white;
  display: none;
  font-family: sans-serif;
  font-size: 12px;
  line-height: 14px;
  margin: 5px 10px;
  padding: 5px;
  position: absolute;
  white-space: nowrap;
  z-index: 10002;
}
.tox-rtc-user-selection {
  position: relative;
}
.tox-rtc-user-cursor {
  bottom: 0;
  cursor: default;
  position: absolute;
  top: 0;
  width: 2px;
}
.tox-rtc-user-cursor::before {
  background-color: inherit;
  border-radius: 50%;
  content: '';
  display: block;
  height: 8px;
  position: absolute;
  right: -3px;
  top: -3px;
  width: 8px;
}
.tox-rtc-user-cursor:hover::after {
  background-color: inherit;
  border-radius: 100px;
  box-sizing: border-box;
  color: #fff;
  content: attr(data-user);
  display: block;
  font-size: 12px;
  font-weight: bold;
  left: -5px;
  min-height: 8px;
  min-width: 8px;
  padding: 0 12px;
  position: absolute;
  top: -11px;
  white-space: nowrap;
  z-index: 1000;
}
.tox-rtc-user-selection--1 .tox-rtc-user-cursor {
  background-color: #2dc26b;
}
.tox-rtc-user-selection--2 .tox-rtc-user-cursor {
  background-color: #e03e2d;
}
.tox-rtc-user-selection--3 .tox-rtc-user-cursor {
  background-color: #f1c40f;
}
.tox-rtc-user-selection--4 .tox-rtc-user-cursor {
  background-color: #3598db;
}
.tox-rtc-user-selection--5 .tox-rtc-user-cursor {
  background-color: #b96ad9;
}
.tox-rtc-user-selection--6 .tox-rtc-user-cursor {
  background-color: #e67e23;
}
.tox-rtc-user-selection--7 .tox-rtc-user-cursor {
  background-color: #aaa69d;
}
.tox-rtc-user-selection--8 .tox-rtc-user-cursor {
  background-color: #f368e0;
}
.tox-rtc-remote-image {
  background: #eaeaea url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2236%22%20height%3D%2212%22%20viewBox%3D%220%200%2036%2012%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20r%3D%223%22%20fill%3D%22rgba(0%2C%200%2C%200%2C%20.2)%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22r%22%20values%3D%223%3B5%3B3%22%20calcMode%3D%22linear%22%20dur%3D%221s%22%20repeatCount%3D%22indefinite%22%20%2F%3E%0A%20%20%3C%2Fcircle%3E%0A%20%20%3Ccircle%20cx%3D%2218%22%20cy%3D%226%22%20r%3D%223%22%20fill%3D%22rgba(0%2C%200%2C%200%2C%20.2)%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22r%22%20values%3D%223%3B5%3B3%22%20calcMode%3D%22linear%22%20begin%3D%22.33s%22%20dur%3D%221s%22%20repeatCount%3D%22indefinite%22%20%2F%3E%0A%20%20%3C%2Fcircle%3E%0A%20%20%3Ccircle%20cx%3D%2230%22%20cy%3D%226%22%20r%3D%223%22%20fill%3D%22rgba(0%2C%200%2C%200%2C%20.2)%22%3E%0A%20%20%20%20%3Canimate%20attributeName%3D%22r%22%20values%3D%223%3B5%3B3%22%20calcMode%3D%22linear%22%20begin%3D%22.66s%22%20dur%3D%221s%22%20repeatCount%3D%22indefinite%22%20%2F%3E%0A%20%20%3C%2Fcircle%3E%0A%3C%2Fsvg%3E%0A") no-repeat center center;
  border: 1px solid #ccc;
  min-height: 240px;
  min-width: 320px;
}
.mce-match-marker {
  background: #aaa;
  color: #fff;
}
.mce-match-marker-selected {
  background: #39f;
  color: #fff;
}
.mce-match-marker-selected::-moz-selection {
  background: #39f;
  color: #fff;
}
.mce-match-marker-selected::selection {
  background: #39f;
  color: #fff;
}
.mce-content-body img[data-mce-selected],
.mce-content-body video[data-mce-selected],
.mce-content-body audio[data-mce-selected],
.mce-content-body object[data-mce-selected],
.mce-content-body embed[data-mce-selected],
.mce-content-body table[data-mce-selected] {
  outline: 3px solid #b4d7ff;
}
.mce-content-body hr[data-mce-selected] {
  outline: 3px solid #b4d7ff;
  outline-offset: 1px;
}
.mce-content-body *[contentEditable=false] *[contentEditable=true]:focus {
  outline: 3px solid #b4d7ff;
}
.mce-content-body *[contentEditable=false] *[contentEditable=true]:hover {
  outline: 3px solid #b4d7ff;
}
.mce-content-body *[contentEditable=false][data-mce-selected] {
  cursor: not-allowed;
  outline: 3px solid #b4d7ff;
}
.mce-content-body.mce-content-readonly *[contentEditable=true]:focus,
.mce-content-body.mce-content-readonly *[contentEditable=true]:hover {
  outline: none;
}
.mce-content-body *[data-mce-selected="inline-boundary"] {
  background-color: #b4d7ff;
}
.mce-content-body .mce-edit-focus {
  outline: 3px solid #b4d7ff;
}
.mce-content-body td[data-mce-selected],
.mce-content-body th[data-mce-selected] {
  position: relative;
}
.mce-content-body td[data-mce-selected]::-moz-selection,
.mce-content-body th[data-mce-selected]::-moz-selection {
  background: none;
}
.mce-content-body td[data-mce-selected]::selection,
.mce-content-body th[data-mce-selected]::selection {
  background: none;
}
.mce-content-body td[data-mce-selected] *,
.mce-content-body th[data-mce-selected] * {
  outline: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}
.mce-content-body td[data-mce-selected]::after,
.mce-content-body th[data-mce-selected]::after {
  background-color: rgba(180, 215, 255, 0.7);
  border: 1px solid rgba(180, 215, 255, 0.7);
  bottom: -1px;
  content: '';
  left: -1px;
  mix-blend-mode: multiply;
  position: absolute;
  right: -1px;
  top: -1px;
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .mce-content-body td[data-mce-selected]::after,
  .mce-content-body th[data-mce-selected]::after {
    border-color: rgba(0, 84, 180, 0.7);
  }
}
.mce-content-body img::-moz-selection {
  background: none;
}
.mce-content-body img::selection {
  background: none;
}
.ephox-snooker-resizer-bar {
  background-color: #b4d7ff;
  opacity: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.ephox-snooker-resizer-cols {
  cursor: col-resize;
}
.ephox-snooker-resizer-rows {
  cursor: row-resize;
}
.ephox-snooker-resizer-bar.ephox-snooker-resizer-bar-dragging {
  opacity: 1;
}
.mce-spellchecker-word {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D'4'%20height%3D'4'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20stroke%3D'%23ff0000'%20fill%3D'none'%20stroke-linecap%3D'round'%20stroke-opacity%3D'.75'%20d%3D'M0%203L2%201%204%203'%2F%3E%3C%2Fsvg%3E%0A");
  background-position: 0 calc(100% + 1px);
  background-repeat: repeat-x;
  background-size: auto 6px;
  cursor: default;
  height: 2rem;
}
.mce-spellchecker-grammar {
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D'4'%20height%3D'4'%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%3E%3Cpath%20stroke%3D'%2300A835'%20fill%3D'none'%20stroke-linecap%3D'round'%20d%3D'M0%203L2%201%204%203'%2F%3E%3C%2Fsvg%3E%0A");
  background-position: 0 calc(100% + 1px);
  background-repeat: repeat-x;
  background-size: auto 6px;
  cursor: default;
}
.mce-toc {
  border: 1px solid gray;
}
.mce-toc h2 {
  margin: 4px;
}
.mce-toc li {
  list-style-type: none;
}
table[style*="border-width: 0px"],
.mce-item-table:not([border]),
.mce-item-table[border="0"],
table[style*="border-width: 0px"] td,
.mce-item-table:not([border]) td,
.mce-item-table[border="0"] td,
table[style*="border-width: 0px"] th,
.mce-item-table:not([border]) th,
.mce-item-table[border="0"] th,
table[style*="border-width: 0px"] caption,
.mce-item-table:not([border]) caption,
.mce-item-table[border="0"] caption {
  border: 1px dashed #bbb;
}
.mce-visualblocks p,
.mce-visualblocks h1,
.mce-visualblocks h2,
.mce-visualblocks h3,
.mce-visualblocks h4,
.mce-visualblocks h5,
.mce-visualblocks h6,
.mce-visualblocks div:not([data-mce-bogus]),
.mce-visualblocks section,
.mce-visualblocks article,
.mce-visualblocks blockquote,
.mce-visualblocks address,
.mce-visualblocks pre,
.mce-visualblocks figure,
.mce-visualblocks figcaption,
.mce-visualblocks hgroup,
.mce-visualblocks aside,
.mce-visualblocks ul,
.mce-visualblocks ol,
.mce-visualblocks dl {
  background-repeat: no-repeat;
  border: 1px dashed #bbb;
  margin-left: 3px;
  padding-top: 10px;
}
.mce-visualblocks p {
  background-image: url(data:image/gif;base64,R0lGODlhCQAJAJEAAAAAAP///7u7u////yH5BAEAAAMALAAAAAAJAAkAAAIQnG+CqCN/mlyvsRUpThG6AgA7);
}
.mce-visualblocks h1 {
  background-image: url(data:image/gif;base64,R0lGODlhDQAKAIABALu7u////yH5BAEAAAEALAAAAAANAAoAAAIXjI8GybGu1JuxHoAfRNRW3TWXyF2YiRUAOw==);
}
.mce-visualblocks h2 {
  background-image: url(data:image/gif;base64,R0lGODlhDgAKAIABALu7u////yH5BAEAAAEALAAAAAAOAAoAAAIajI8Hybbx4oOuqgTynJd6bGlWg3DkJzoaUAAAOw==);
}
.mce-visualblocks h3 {
  background-image: url(data:image/gif;base64,R0lGODlhDgAKAIABALu7u////yH5BAEAAAEALAAAAAAOAAoAAAIZjI8Hybbx4oOuqgTynJf2Ln2NOHpQpmhAAQA7);
}
.mce-visualblocks h4 {
  background-image: url(data:image/gif;base64,R0lGODlhDgAKAIABALu7u////yH5BAEAAAEALAAAAAAOAAoAAAIajI8HybbxInR0zqeAdhtJlXwV1oCll2HaWgAAOw==);
}
.mce-visualblocks h5 {
  background-image: url(data:image/gif;base64,R0lGODlhDgAKAIABALu7u////yH5BAEAAAEALAAAAAAOAAoAAAIajI8HybbxIoiuwjane4iq5GlW05GgIkIZUAAAOw==);
}
.mce-visualblocks h6 {
  background-image: url(data:image/gif;base64,R0lGODlhDgAKAIABALu7u////yH5BAEAAAEALAAAAAAOAAoAAAIajI8HybbxIoiuwjan04jep1iZ1XRlAo5bVgAAOw==);
}
.mce-visualblocks div:not([data-mce-bogus]) {
  background-image: url(data:image/gif;base64,R0lGODlhEgAKAIABALu7u////yH5BAEAAAEALAAAAAASAAoAAAIfjI9poI0cgDywrhuxfbrzDEbQM2Ei5aRjmoySW4pAAQA7);
}
.mce-visualblocks section {
  background-image: url(data:image/gif;base64,R0lGODlhKAAKAIABALu7u////yH5BAEAAAEALAAAAAAoAAoAAAI5jI+pywcNY3sBWHdNrplytD2ellDeSVbp+GmWqaDqDMepc8t17Y4vBsK5hDyJMcI6KkuYU+jpjLoKADs=);
}
.mce-visualblocks article {
  background-image: url(data:image/gif;base64,R0lGODlhKgAKAIABALu7u////yH5BAEAAAEALAAAAAAqAAoAAAI6jI+pywkNY3wG0GBvrsd2tXGYSGnfiF7ikpXemTpOiJScasYoDJJrjsG9gkCJ0ag6KhmaIe3pjDYBBQA7);
}
.mce-visualblocks blockquote {
  background-image: url(data:image/gif;base64,R0lGODlhPgAKAIABALu7u////yH5BAEAAAEALAAAAAA+AAoAAAJPjI+py+0Knpz0xQDyuUhvfoGgIX5iSKZYgq5uNL5q69asZ8s5rrf0yZmpNkJZzFesBTu8TOlDVAabUyatguVhWduud3EyiUk45xhTTgMBBQA7);
}
.mce-visualblocks address {
  background-image: url(data:image/gif;base64,R0lGODlhLQAKAIABALu7u////yH5BAEAAAEALAAAAAAtAAoAAAI/jI+pywwNozSP1gDyyZcjb3UaRpXkWaXmZW4OqKLhBmLs+K263DkJK7OJeifh7FicKD9A1/IpGdKkyFpNmCkAADs=);
}
.mce-visualblocks pre {
  background-image: url(data:image/gif;base64,R0lGODlhFQAKAIABALu7uwAAACH5BAEAAAEALAAAAAAVAAoAAAIjjI+ZoN0cgDwSmnpz1NCueYERhnibZVKLNnbOq8IvKpJtVQAAOw==);
}
.mce-visualblocks figure {
  background-image: url(data:image/gif;base64,R0lGODlhJAAKAIAAALu7u////yH5BAEAAAEALAAAAAAkAAoAAAI0jI+py+2fwAHUSFvD3RlvG4HIp4nX5JFSpnZUJ6LlrM52OE7uSWosBHScgkSZj7dDKnWAAgA7);
}
.mce-visualblocks figcaption {
  border: 1px dashed #bbb;
}
.mce-visualblocks hgroup {
  background-image: url(data:image/gif;base64,R0lGODlhJwAKAIABALu7uwAAACH5BAEAAAEALAAAAAAnAAoAAAI3jI+pywYNI3uB0gpsRtt5fFnfNZaVSYJil4Wo03Hv6Z62uOCgiXH1kZIIJ8NiIxRrAZNMZAtQAAA7);
}
.mce-visualblocks aside {
  background-image: url(data:image/gif;base64,R0lGODlhHgAKAIABAKqqqv///yH5BAEAAAEALAAAAAAeAAoAAAItjI+pG8APjZOTzgtqy7I3f1yehmQcFY4WKZbqByutmW4aHUd6vfcVbgudgpYCADs=);
}
.mce-visualblocks ul {
  background-image: url(data:image/gif;base64,R0lGODlhDQAKAIAAALu7u////yH5BAEAAAEALAAAAAANAAoAAAIXjI8GybGuYnqUVSjvw26DzzXiqIDlVwAAOw==);
}
.mce-visualblocks ol {
  background-image: url(data:image/gif;base64,R0lGODlhDQAKAIABALu7u////yH5BAEAAAEALAAAAAANAAoAAAIXjI8GybH6HHt0qourxC6CvzXieHyeWQAAOw==);
}
.mce-visualblocks dl {
  background-image: url(data:image/gif;base64,R0lGODlhDQAKAIABALu7u////yH5BAEAAAEALAAAAAANAAoAAAIXjI8GybEOnmOvUoWznTqeuEjNSCqeGRUAOw==);
}
.mce-visualblocks:not([dir=rtl]) p,
.mce-visualblocks:not([dir=rtl]) h1,
.mce-visualblocks:not([dir=rtl]) h2,
.mce-visualblocks:not([dir=rtl]) h3,
.mce-visualblocks:not([dir=rtl]) h4,
.mce-visualblocks:not([dir=rtl]) h5,
.mce-visualblocks:not([dir=rtl]) h6,
.mce-visualblocks:not([dir=rtl]) div:not([data-mce-bogus]),
.mce-visualblocks:not([dir=rtl]) section,
.mce-visualblocks:not([dir=rtl]) article,
.mce-visualblocks:not([dir=rtl]) blockquote,
.mce-visualblocks:not([dir=rtl]) address,
.mce-visualblocks:not([dir=rtl]) pre,
.mce-visualblocks:not([dir=rtl]) figure,
.mce-visualblocks:not([dir=rtl]) figcaption,
.mce-visualblocks:not([dir=rtl]) hgroup,
.mce-visualblocks:not([dir=rtl]) aside,
.mce-visualblocks:not([dir=rtl]) ul,
.mce-visualblocks:not([dir=rtl]) ol,
.mce-visualblocks:not([dir=rtl]) dl {
  margin-left: 3px;
}
.mce-visualblocks[dir=rtl] p,
.mce-visualblocks[dir=rtl] h1,
.mce-visualblocks[dir=rtl] h2,
.mce-visualblocks[dir=rtl] h3,
.mce-visualblocks[dir=rtl] h4,
.mce-visualblocks[dir=rtl] h5,
.mce-visualblocks[dir=rtl] h6,
.mce-visualblocks[dir=rtl] div:not([data-mce-bogus]),
.mce-visualblocks[dir=rtl] section,
.mce-visualblocks[dir=rtl] article,
.mce-visualblocks[dir=rtl] blockquote,
.mce-visualblocks[dir=rtl] address,
.mce-visualblocks[dir=rtl] pre,
.mce-visualblocks[dir=rtl] figure,
.mce-visualblocks[dir=rtl] figcaption,
.mce-visualblocks[dir=rtl] hgroup,
.mce-visualblocks[dir=rtl] aside,
.mce-visualblocks[dir=rtl] ul,
.mce-visualblocks[dir=rtl] ol,
.mce-visualblocks[dir=rtl] dl {
  background-position-x: right;
  margin-right: 3px;
}
.mce-nbsp,
.mce-shy {
  background: #aaa;
}
.mce-shy::after {
  content: '-';
}
body {
  font-family: sans-serif;
}
table {
  border-collapse: collapse;
}
`,Ye=`/**\r
 * Copied from tinymce/skins/content/default/content.css\r
 * Used by Essay, Instructions and Review Components\r
 */\r
\r
.mce-content-body, #app-instructions, #review-text {\r
    font-family: Serif;\r
    font-size: 16px;\r
}\r
\r
table {\r
    border-collapse: collapse;\r
}\r
/* Apply a default padding if legacy cellpadding attribute is missing */\r
table:not([cellpadding]) th,\r
table:not([cellpadding]) td {\r
    padding: 0.4rem;\r
}\r
/* Set default table styles if a table has a positive border attribute\r
   and no inline css */\r
table[border]:not([border="0"]):not([style*="border-width"]) th,\r
table[border]:not([border="0"]):not([style*="border-width"]) td {\r
    border-width: 1px;\r
}\r
/* Set default table styles if a table has a positive border attribute\r
   and no inline css */\r
table[border]:not([border="0"]):not([style*="border-style"]) th,\r
table[border]:not([border="0"]):not([style*="border-style"]) td {\r
    border-style: solid;\r
}\r
/* Set default table styles if a table has a positive border attribute\r
   and no inline css */\r
table[border]:not([border="0"]):not([style*="border-color"]) th,\r
table[border]:not([border="0"]):not([style*="border-color"]) td {\r
    border-color: #ccc;\r
}\r
figure {\r
    display: table;\r
    margin: 1rem auto;\r
}\r
figure figcaption {\r
    color: #999;\r
    display: block;\r
    margin-top: 0.25rem;\r
    text-align: center;\r
}\r
hr {\r
    border-color: #ccc;\r
    border-style: solid;\r
    border-width: 1px 0 0 0;\r
}\r
code {\r
    background-color: #e8e8e8;\r
    border-radius: 3px;\r
    padding: 0.1rem 0.2rem;\r
}\r
\r
`;const et={setup(e){const t=L(),o=j();function a(){switch(o.formatting_options){case"full":return"undo redo | formatselect | bold italic underline | bullist numlist | removeformat | charmap";case"medium":return"undo redo | bold italic underline | bullist numlist | removeformat | charmap";case"minimal":return"undo redo | bold italic underline | removeformat | charmap";case"none":default:return"undo redo | charmap"}}const n="essay";return(c,d)=>(h(),y(s(ye),{id:n,modelValue:s(t).currentContent,"onUpdate:modelValue":d[0]||(d[0]=u=>s(t).currentContent=u),onChange:d[1]||(d[1]=u=>s(t).updateContent(!0)),onKeyup:d[2]||(d[2]=u=>s(t).updateContent(!0)),"api-key":"no-api-key",init:{height:"100%",menubar:!1,plugins:"lists charmap",toolbar:a(),custom_undo_redo_levels:10,skin:!1,content_css:!1,content_style:s(Xe).toString()+`
`+s(Ye).toString()}},null,8,["modelValue","init"]))}};const Z=e=>(ue("data-v-439538ca"),e=e(),he(),e),tt={class:"container"},nt={class:"col-header"},ot={class:"text-h6"},st={class:"col-content"},at=Z(()=>l("span",null,"Mein Text",-1)),rt=Z(()=>l("span",null,"Erweitern",-1)),it=Z(()=>l("div",{class:"col-header"},[l("h2",{class:"text-h6"},"Mein Text")],-1)),lt={class:"col-content"},ct=Z(()=>l("span",null,"Erweitern",-1)),dt={setup(e){const t=G(),o=$();return(a,n)=>(h(),y(oe,{"fill-height":""},{default:i(()=>[l("div",tt,[m(l("div",{class:J(["column",{colExpanded:s(t).isLeftExpanded,colNormal:!s(t).isLeftExpanded}])},[l("div",nt,[m(l("h2",ot,"Aufgabenstellung",512),[[g,s(t).isInstructionsVisible]]),m(l("h2",{class:"text-h6"},x(s(o).activeTitle),513),[[g,s(t).isResourcesVisible]])]),l("div",st,[m(r(qe,null,null,512),[[g,s(t).isInstructionsVisible]]),m(r(Pe,null,null,512),[[g,s(t).isResourcesVisible]])]),l("div",{class:J(["col-footer text-right",{footerExpanded:s(t).isLeftExpanded,footerNormal:!s(t).isLeftExpanded}])},[m(r(A,{class:"ma-2",onClick:n[0]||(n[0]=c=>s(t).setLeftExpanded(!1))},{default:i(()=>[r(f,{icon:"mdi-chevron-left"}),at]),_:1},512),[[g,s(t).isLeftExpanded]]),m(r(A,{class:"ma-2",onClick:n[1]||(n[1]=c=>s(t).setLeftExpanded(!0))},{default:i(()=>[rt,r(f,{icon:"mdi-chevron-right"})]),_:1},512),[[g,!s(t).isLeftExpanded]])],2)],2),[[g,s(t).isLeftVisible]]),m(l("div",{class:J(["column",{colExpanded:s(t).isRightExpanded,colNormal:!s(t).isRightExpanded}])},[it,l("div",lt,[r(et)]),l("div",{class:J(["col-footer text-left",{footerExpanded:s(t).isRightExpanded,footerNormal:!s(t).isRightExpanded}])},[m(r(A,{class:"ma-2",onClick:n[2]||(n[2]=c=>s(t).setRightExpanded(!0))},{default:i(()=>[r(f,{icon:"mdi-chevron-left"}),ct]),_:1},512),[[g,!s(t).isRightExpanded]]),m(r(A,{class:"ma-2",onClick:n[3]||(n[3]=c=>s(t).setRightExpanded(!1))},{default:i(()=>[m(l("span",null,"Aufgabenstellung",512),[[g,s(t).isInstructionsSelected]]),m(l("span",null,x(s(o).activeTitle),513),[[g,s(t).isResourcesSelected]]),r(f,{icon:"mdi-chevron-right"})]),_:1},512),[[g,s(t).isRightExpanded]])],2)],2),[[g,s(t).isRightVisible]])])]),_:1}))}};var ut=q(dt,[["__scopeId","data-v-439538ca"]]);const ht=l("p",null,"Lade Daten...",-1),mt=l("span",null,"Beenden ...",-1),gt=l("p",null,"Beim Laden der Daten ist ein Fehler aufgetreten. Die Anwendung kann nicht gestartet werden.",-1),pt=l("span",null,"Beenden",-1),bt=l("p",null,"In Ihrem Browser sind Eingaben eines anderen Benutzers oder einer anderen Aufgabe vorhanden, die noch nicht \xFCbertragen wurden. Durch das Laden werden diese Eingaben gel\xF6scht.",-1),ft=l("p",null,"M\xF6chten Sie die neue Aufgabe laden?",-1),At=l("span",null,"Laden",-1),yt=l("span",null,"Abbrechen",-1),kt=l("p",null,"In Ihrem Browser sind Eingaben vorhanden, die noch nicht \xFCbertragen wurden. Die letzte im System gespeicherte Eingabe scheint aber nicht aus diesem Browser zu stammen. Das kann z.B. passieren, wenn Ihre Netzverbindung unterbrochen wurde und Sie anschlie\xDFend in einem anderen Browser weitergearbeitet haben. Durch das Laden werden Ihre Eingaben im Browser \xFCberschrieben.",-1),vt=l("p",null,"M\xF6chten Sie die Eingabe vom System laden?",-1),wt=l("span",null,"Laden",-1),_t=l("span",null,"Abbrechen",-1),xt={setup(e){const t=D();return(o,a)=>(h(),y(oe,{"fill-height":""},{default:i(()=>[r(ne,{elevation:"1",color:"white",density:"compact"},{default:i(()=>[ht,r(ce),r(A,{href:s(t).returnUrl},{default:i(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),mt]),_:1},8,["href"])]),_:1}),r(K,{persistent:"",modelValue:s(t).showInitFailure,"onUpdate:modelValue":a[0]||(a[0]=n=>s(t).showInitFailure=n)},{default:i(()=>[r(T,null,{default:i(()=>[r(U,null,{default:i(()=>[gt]),_:1}),r(V,null,{default:i(()=>[r(A,{href:s(t).returnUrl},{default:i(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),pt]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(K,{persistent:"",modelValue:s(t).showReplaceConfirmation,"onUpdate:modelValue":a[2]||(a[2]=n=>s(t).showReplaceConfirmation=n)},{default:i(()=>[r(T,null,{default:i(()=>[r(U,null,{default:i(()=>[bt,ft]),_:1}),r(V,null,{default:i(()=>[r(A,{onClick:a[1]||(a[1]=n=>s(t).loadDataFromBackend())},{default:i(()=>[r(f,{left:"",icon:"mdi-reload"}),At]),_:1}),r(A,{href:s(t).returnUrl},{default:i(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),yt]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(K,{persistent:"",modelValue:s(t).showReloadConfirmation,"onUpdate:modelValue":a[4]||(a[4]=n=>s(t).showReloadConfirmation=n)},{default:i(()=>[r(T,null,{default:i(()=>[r(U,null,{default:i(()=>[kt,vt]),_:1}),r(V,null,{default:i(()=>[r(A,{onClick:a[3]||(a[3]=n=>s(t).loadDataFromBackend())},{default:i(()=>[r(f,{left:"",icon:"mdi-reload"}),wt]),_:1}),r(A,{href:s(t).returnUrl},{default:i(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),_t]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};const E=e=>(ue("data-v-efa91f96"),e=e(),he(),e),Ct={class:"container"},St={class:"column"},It={class:"col-header bg-grey-lighten-4"},Dt=E(()=>l("h2",{class:"text-h6"},"Ihre Bearbeitungszeit ist beendet",-1)),Et=E(()=>l("p",null,"Es ist keine weitere Eingabe m\xF6glich. Bitte \xFCberpr\xFCfen Sie, ob Sie den Text in dieser Form zur Bewertung abgeben m\xF6chten.",-1)),Ft=[Dt,Et],Lt={class:"col-header bg-grey-lighten-4"},Tt=E(()=>l("h2",{class:"text-h6"},"Abgabe-Text",-1)),Bt=E(()=>l("p",null,"Bitte \xFCberpr\xFCfen Sie, ob Sie den Text in dieser Form zur Bwertung abgeben m\xF6chten. Nach der Abgabe ist keine weitere Bearbeitung mehr m\xF6glich!",-1)),Rt=[Tt,Bt],zt={class:"col-content"},Ht=["innerHTML"],Ut={class:"col-footer text-right bg-grey-lighten-4"},Vt=E(()=>l("span",null,"Ohne Abgabe beenden",-1)),Kt=E(()=>l("span",null,"Weiter bearbeiten",-1)),Ot=E(()=>l("span",null,"Sp\xE4ter versuchen",-1)),$t=E(()=>l("span",null,"Ohne Speichern beenden",-1)),Nt={setup(e){const t=D(),o=L(),a=S(),n=j();return(c,d)=>(h(),y(oe,{"fill-height":""},{default:i(()=>[l("div",Ct,[l("div",St,[m(l("div",It,Ft,512),[[g,s(a).writingEndReached]]),m(l("div",Lt,Rt,512),[[g,!s(a).writingEndReached]]),l("div",zt,[l("div",{class:"review-text",innerHTML:s(o).storedContent},null,8,Ht)]),l("div",Ut,[r(A,{class:"ma-2",onClick:d[0]||(d[0]=u=>s(t).finalize(!0)),color:s(n).primaryColorCss},{default:i(()=>[r(f,{color:s(n).primaryTextColorCss,icon:"mdi-file-send-outline"},null,8,["color"]),l("span",{style:ke(s(n).primaryTextColorFullCss)},"Zur Bewertung abgeben",4)]),_:1},8,["color"]),m(r(A,{class:"ma-2",onClick:d[1]||(d[1]=u=>s(t).finalize(!1))},{default:i(()=>[r(f,{icon:"mdi-logout-variant"}),Vt]),_:1},512),[[g,s(a).writingEndReached]]),m(r(A,{class:"ma-2",onClick:d[2]||(d[2]=u=>s(t).review=!1)},{default:i(()=>[r(f,{icon:"mdi-file-edit-outline"}),Kt]),_:1},512),[[g,!s(a).writingEndReached]])])])]),r(K,{persistent:"",modelValue:s(t).showFinalizeFailure,"onUpdate:modelValue":d[4]||(d[4]=u=>s(t).showFinalizeFailure=u)},{default:i(()=>[r(T,null,{default:i(()=>[r(U,null,{default:i(()=>[m(l("p",null,"Beim Speichern der Abgabe ist ein Fehler aufgetreten. Bitte versuchen Sie es sp\xE4ter noch einmal.",512),[[g,s(t).showAuthorizeFailure]]),m(l("p",null,"Beim Speichern Ihrer letzten \xC4nderungen ist ein Fehler aufgetreten. Bitte versuchen Sie es sp\xE4ter noch einmal.",512),[[g,!s(t).showFinalizeFailure]])]),_:1}),r(V,null,{default:i(()=>[r(A,{onClick:d[3]||(d[3]=u=>s(t).showFinalizeFailure=!1)},{default:i(()=>[r(f,{left:"",icon:"mdi-close"}),Ot]),_:1}),r(A,{href:s(t).returnUrl},{default:i(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),$t]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};var Mt=q(Nt,[["__scopeId","data-v-efa91f96"]]);const jt={setup(e){const t=D();return t.init(),(o,a)=>(h(),y(ve,{"fill-height":""},{default:i(()=>[s(t).initialized?w("",!0):(h(),y(xt,{key:0})),s(t).initialized?(h(),y(Oe,{key:1})):w("",!0),s(t).initialized?(h(),y(Me,{key:2})):w("",!0),s(t).initialized&&!s(t).review?(h(),y(Ne,{key:3})):w("",!0),s(t).initialized&&!s(t).review?(h(),y(ut,{key:4})):w("",!0),s(t).initialized&&s(t).review?(h(),y(Mt,{key:5})):w("",!0)]),_:1}))}};var Gt=we();_e(jt).use(xe()).use(Gt).mount("#app");
