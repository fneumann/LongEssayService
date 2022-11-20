import{l as N,d as B,a as z,D as ge,m as ce,b as y,w as u,v as h,u as n,o as g,c as k,e as l,f as r,V as f,g as i,t as C,h as A,i as x,j as T,k as ae,n as U,p as V,q as K,F as O,r as ne,s as M,x as pe,y as de,z as _,A as be,B as ue,C as H,E as re,G as oe,H as fe,I as Ae,J as ye,K as ke,L as J,M as se,N as he,O as me,P as ie,Q as ve,R as we,S as _e,T as xe}from"./vendor.d266e6c9.js";const Ce=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function s(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerpolicy&&(c.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?c.credentials="include":o.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(o){if(o.ep)return;o.ep=!0;const c=s(o);fetch(o.href,c)}};Ce();const P=N.createInstance({storeName:"writer-settings",description:"Settings data"}),j=B("settings",{state:()=>({headline_scheme:null,formatting_options:null,notice_boards:null,copy_allowed:null,primary_color:null,primary_text_color:null}),getters:{primaryColorCss:e=>e.primary_color?"#"+e.primary_color:"",primaryTextColorCss:e=>e.primary_text_color?"#"+e.primary_text_color:"",primaryTextColorFullCss:e=>e.primary_text_color?"color: #"+e.primary_text_color+";":""},actions:{setData(e){this.headline_scheme=e.headline_scheme,this.formatting_options=e.formatting_options,this.notice_boards=e.notice_boards,this.copy_allowed=e.copy_allowed,this.primary_color=e.primary_color,this.primary_text_color=e.primary_text_color},async clearStorage(){try{await P.clear()}catch(e){console.log(e)}},async loadFromStorage(){try{const e=await P.getItem("settings");this.setData(e)}catch(e){console.log(e)}},async loadFromData(e){try{await P.setItem("settings",e),this.setData(e)}catch(t){console.log(t)}}}}),X=N.createInstance({storeName:"writer-layout",description:"Layout data"}),G=B("layout",{state:()=>({expandedColumn:"left",leftContent:"instructions",rightContent:"essay",showTimer:!0}),getters:{isLeftExpanded:e=>e.expandedColumn=="left",isRightExpanded:e=>e.expandedColumn=="right",isLeftVisible:e=>e.expandedColumn!="right",isRightVisible:e=>e.expandedColumn!="left",isInstructionsSelected:e=>e.leftContent=="instructions",isResourcesSelected:e=>e.leftContent=="resources",isInstructionsVisible:e=>e.expandedColumn!="right"&&e.leftContent=="instructions",isResourcesVisible:e=>e.expandedColumn!="right"&&e.leftContent=="resources",isEssayVisible:e=>e.expandedColumn!="left"&&e.rightContent=="essay"},actions:{async clearStorage(){try{await X.clear()}catch(e){console.log(e)}},async loadFromStorage(){try{const e=await X.getItem("layout");e&&(this.expandedColumn=e.expandedColumn,this.rightContent=e.rightContent,this.showTimer=e.showTimer)}catch(e){console.log(e)}},async saveToStorage(){try{await X.setItem("layout",{expandedColumn:this.expandedColumn,leftContent:this.leftContent,rightContent:this.rightContent,showTimer:this.showTimer})}catch(e){console.log(e)}},showInstructions(){this.setLeftVisible(),this.leftContent="instructions",this.saveToStorage()},showResources(){this.setLeftVisible(),this.leftContent="resources",this.saveToStorage()},showEssay(){this.setRightVisible(),this.rightContent="essay",this.saveToStorage()},setLeftVisible(){this.isLeftVisible||(this.expandedColumn="left",this.saveToStorage())},setRightVisible(){this.isRightVisible||(this.expandedColumn="right",this.saveToStorage())},setLeftExpanded(e){this.expandedColumn=e?"left":"none",this.saveToStorage()},setRightExpanded(e){this.expandedColumn=e?"right":"none",this.saveToStorage()},toggleTimer(){this.showTimer=!this.showTimer,this.saveToStorage()}}}),S=N.createInstance({storeName:"writer-resources",description:"Resource data"}),$=B("resources",{state:()=>({keys:[],resources:[],activeKey:""}),getters:{hasResources:e=>e.resources.length>0,activeTitle(e){const t=e.resources.find(s=>s.key==e.activeKey);return t?t.title:""},getResource(e){return t=>e.resources.find(s=>s.key==t)},isActive(e){return t=>e.activeKey==t.key}},actions:{async clearStorage(){try{await S.clear()}catch(e){console.log(e)}},async loadFromStorage(){var e;try{const t=await S.getItem("resourceKeys");t&&(this.keys=JSON.parse(t)),this.activeKey=(e=await S.getItem("activeKey"))!=null?e:[],this.resources=[];let s=0;for(;s<this.keys.length;){let a=await S.getItem(this.keys[s]);this.resources.push(a),s++}await this.loadFiles()}catch(t){console.log(t)}},async loadFromData(e){const t=E();try{await S.clear(),this.keys=[],this.resources=[];let s=0;for(;s<e.length;){let a=e[s];a.url=t.resourceUrl(a.key),this.resources.push(a),this.keys.push(a.key),await S.setItem(a.key,a),s++}await S.setItem("resourceKeys",JSON.stringify(this.keys)),await S.setItem("activeKey",this.activeKey),await this.loadFiles()}catch(s){console.log(s)}},async selectResource(e){this.activeKey=e.key,await S.setItem("activeKey",this.activeKey)},async loadFiles(){let e=0;for(;e<this.keys.length;){let t=this.getResource(this.keys[e]),s=null;if(t.type=="file")try{console.log("preload "+t.title+"..."),s=await z(t.url,{responseType:"blob",timeout:6e4}),t.objectUrl=URL.createObjectURL(s.data),console.log("finished. ")}catch(a){return console.error(a),!1}e++}}}}),b=N.createInstance({storeName:"writer-essay",description:"Essay data"}),L=new ge,Y=1e3,Se=5e3,Ie=5e3,De=10,Ee=1e3,ee={storedContent:"",storedHash:"",history:[],lastStoredIndex:-1,lastSentIndex:-1,lastSentHash:"",currentContent:"",sumOfDistances:0,lastCheck:0,lastSave:0,lastSending:0};let R=0,le=0;const F=B("essay",{state:()=>ee,getters:{hasHistory:e=>e.history.length>0,historyLength:e=>e.history.length,openSendings:e=>e.lastStoredIndex-e.lastSentIndex,unsentHistory(e){let t=[],s=e.lastSentIndex+1;for(;s<e.history.length;)t.push(e.history[s]),s++;return t},formatTimestamp(){return e=>new Date(e).toISOString().slice(0,19).replace("T"," ")},formatIndex(){return e=>e.toString().padStart(9,"0")},makeHash(){return(e,t)=>ce(e+t)}},actions:{async clearStorage(){try{await b.clear()}catch(e){console.log(e)}},addToHistory(e,t=0){let s=this.history.push(e)-1;return e.is_delta?this.sumOfDistances+=t:this.sumOfDistances=0,s},async loadFromData(e){var t,s,a;R=1;try{this.$state=ee,this.currentContent=(t=e.content)!=null?t:"",this.storedContent=(s=e.content)!=null?s:"",this.storedHash=(a=e.hash)!=null?a:"",await b.clear(),await b.setItem("storedContent",this.storedContent),await b.setItem("storedHash",this.storedHash);let o=0;for(;o<e.steps.length;){let c=e.steps[o],d={is_delta:c.is_delta,timestamp:c.timestamp,content:c.content,hash_before:c.hash_before,hash_after:c.hash_after};this.addToHistory(d),await b.setItem(this.formatIndex(o),d),o++}this.lastStoredIndex=this.history.length-1,this.lastSentIndex=this.history.length-1,this.lastSentHash=this.storedHash,await b.setItem("lastStoredIndex",this.lastStoredIndex),await b.setItem("lastSentIndex",this.lastSentIndex),await b.setItem("lastSentHash",this.lastSentHash)}catch(o){console.log(o)}R=0,setInterval(this.updateContent,Y)},async loadFromStorage(){var e,t,s,a,o;R=1;try{this.$state=ee,this.lastStoredIndex=(e=await b.getItem("lastStoredIndex"))!=null?e:-1,this.lastSentIndex=(t=await b.getItem("lastSentIndex"))!=null?t:-1,this.lastSentHash=(s=await b.getItem("lastSentHash"))!=null?s:"",this.storedContent=(a=await b.getItem("storedContent"))!=null?a:"",this.storedHash=(o=await b.getItem("storedHash"))!=null?o:"",this.currentContent=this.storedContent;let c=0;for(;c<=this.lastStoredIndex;){let d=await b.getItem(this.formatIndex(c));if(d==null)break;this.addToHistory(d),c++}}catch(c){console.log(c)}R=0,setInterval(this.updateContent,Y)},async updateContent(e=!1){const t=E(),s=Date.now();if(!(s-this.lastCheck<Y||R++||I().writingEndReached)){try{const o=this.currentContent+"";let c=null;if(o!=this.storedContent){const d=this.makeHash(o,t.serverTime(s));let m=L.diff_main(this.storedContent,o);L.diff_cleanupEfficiency(m);const p=L.diff_levenshtein(m),v=L.patch_toText(L.patch_make(this.storedContent,m)),Q=L.patch_apply(L.patch_fromText(v),this.storedContent);this.history.length==0||v.length>o.length||this.sumOfDistances+p>Ee||Q[0]!=o?c={is_delta:0,timestamp:t.serverTime(s),content:o,hash_before:this.storedHash,hash_after:d}:(p>=De||s-this.lastSave>Se)&&(c={is_delta:1,timestamp:t.serverTime(s),content:v,hash_before:this.storedHash,hash_after:d}),c!==null&&(this.lastStoredIndex=this.addToHistory(c,p),this.lastSave=s,this.storedContent=o,this.storedHash=d,await b.setItem("storedContent",this.storedContent),await b.setItem("storedHash",this.storedHash),await b.setItem(this.formatIndex(this.lastStoredIndex),c),await b.setItem("lastStoredIndex",this.lastStoredIndex),console.log("Delta:",c.is_delta,"| Distance (sum): ",p,"(",this.sumOfDistances,")","| Editor: ",e,"| Duration:",Date.now()-s,"ms"))}this.lastCheck=s,this.sendUpdate()}catch(o){console.error(o)}R=0}},async sendUpdate(){if(Date.now()-this.lastSending<Ie||le++)return;let e=[],t=this.lastSentIndex,s=this.lastSentHash,a=this.lastSentIndex+1;for(;a<this.history.length;)e.push(this.history[a]),s=this.history[a].hash_after,t=a++;e.length>0&&(await E().saveWritingStepsToBackend(e)&&(this.lastSentIndex=t,await b.setItem("lastSentIndex",t),await b.setItem("lastSentHash",s)),this.lastSending=Date.now()),le=!1},async hasUnsentSavingsInStorage(){var e,t;return this.lastStoredIndex=(e=await b.getItem("lastStoredIndex"))!=null?e:-1,this.lastSentIndex=(t=await b.getItem("lastSentIndex"))!=null?t:-1,this.lastStoredIndex>this.lastSentIndex},async hasHashInStorage(e){var t;return this.lastSentHash=(t=await b.getItem("lastSentHash"))!=null?t:"",e==this.lastSentHash}}}),D=N.createInstance({storeName:"writer-alerts",description:"Alert Messages"}),W=B("alerts",{state:()=>({keys:[],alerts:[],activeKey:"",showAllAlerts:!1}),getters:{countAlerts:e=>e.alerts.length,hasAlerts:e=>e.alerts.length>0,hasActiveAlert:e=>e.activeKey!="",activeMessage(e){const t=e.alerts.find(s=>s.key==e.activeKey);return t?t.message:""},getAlert(e){return t=>e.alerts.find(s=>s.key==t)},formatTimestamp(){return e=>new Date(e*1e3).toLocaleString()}},actions:{showAlerts(){this.showAllAlerts=!0},hideAlert(){this.activeKey="",this.showAllAlerts=!1},async clearStorage(){try{await D.clear()}catch(e){console.log(e)}},async loadFromStorage(){var e;try{const t=await D.getItem("alertKeys");t&&(this.keys=JSON.parse(t)),this.activeKey=(e=await D.getItem("activeKey"))!=null?e:"",this.alerts=[];let s=0;for(;s<this.alerts.length;){let a=await D.getItem(this.keys[s]);this.alerts.push(a),s++}}catch(t){console.log(t)}},async loadFromData(e){try{await D.clear();let t=[],s=[],a=0;for(;a<e.length;){let o=e[a];typeof this.getAlert(o.key)=="undefined"&&(this.activeKey=o.key),s.push(o),t.push(o.key),await D.setItem(o.key,o),a++}this.keys=t,this.alerts=s,await D.setItem("alertKeys",JSON.stringify(this.keys)),await D.setItem("activeKey",this.activeKey)}catch(t){console.log(t)}}}}),E=B("api",{state:()=>({backendUrl:"",returnUrl:"",userKey:"",environmentKey:"",dataToken:"",fileToken:"",timeOffset:0,initialized:!1,review:!1,showInitFailure:!1,showReplaceConfirmation:!1,showReloadConfirmation:!1,showFinalizeFailure:!1,showAuthorizeFailure:!1}),getters:{requestConfig(e){return function(t){let s=e.backendUrl,a=new URLSearchParams,o=s.search(/\?+/);return o!=-1&&(a=new URLSearchParams(s.substr(o)),s=s.substr(0,o)),a.append("LongEssayUser",e.userKey),a.append("LongEssayEnvironment",e.environmentKey),a.append("LongEssaySignature",ce(e.userKey+e.environmentKey+t)),{baseURL:s,params:a,timeout:3e4,responseType:"json",responseEncoding:"utf8"}}},resourceUrl(){return function(e){const t=this.requestConfig(this.fileToken);return t.baseURL+"/file/"+e+"?"+t.params.toString()}},serverTime(e){return t=>t==0?0:Math.floor((t-e.timeOffset)/1e3)}},actions:{async init(){var a;let e=!1,t=y.get("LongEssayHash");if(this.backendUrl=localStorage.getItem("writerBackendUrl"),this.returnUrl=localStorage.getItem("writerReturnUrl"),this.userKey=localStorage.getItem("writerUserKey"),this.environmentKey=localStorage.getItem("writerEnvironmentKey"),this.dataToken=localStorage.getItem("writerDataToken"),this.fileToken=localStorage.getItem("writerFileToken"),this.timeOffset=Math.floor((a=localStorage.getItem("writerTimeOffset"))!=null?a:0),!!y.get("LongEssayUser")&&y.get("LongEssayUser")!==this.userKey&&(this.userKey=y.get("LongEssayUser"),e=!0),!!y.get("LongEssayEnvironment")&&y.get("LongEssayEnvironment")!==this.environmentKey&&(this.environmentKey=y.get("LongEssayEnvironment"),e=!0),!!y.get("LongEssayBackend")&&y.get("LongEssayBackend")!==this.backendUrl&&(this.backendUrl=y.get("LongEssayBackend")),!!y.get("LongEssayReturn")&&y.get("LongEssayReturn")!==this.returnUrl&&(this.returnUrl=y.get("LongEssayReturn")),!!y.get("LongEssayToken")&&y.get("LongEssayToken")!==this.dataToken&&(this.dataToken=y.get("LongEssayToken")),!this.backendUrl||!this.returnUrl||!this.userKey||!this.environmentKey||!this.dataToken){this.showInitFailure=!0;return}const s=F();e?await s.hasUnsentSavingsInStorage()?(console.log("init: new context, open savings"),this.showReplaceConfirmation=!0):(console.log("init: new context, no open savings"),await this.loadDataFromBackend()):t?await s.hasHashInStorage(t)?(console.log("init: same context, same hash"),await this.loadDataFromStorage()):await s.hasUnsentSavingsInStorage()?(console.log("init: same context, hashes differ, open savings"),this.showReloadConfirmation=!0):(console.log("init: same context, hashes differ, no open savings"),await this.loadDataFromBackend()):await s.hasUnsentSavingsInStorage()?(console.log("init: same context, no server hash, open savings"),await this.loadDataFromStorage()):(console.log("init: same context, no server hash, no open savings"),await this.loadDataFromBackend()),setInterval(this.checkUpdate,5e3)},async loadDataFromStorage(){console.log("loadDataFromStorage..."),this.updateConfig();const e=j(),t=I(),s=$(),a=F(),o=G();await e.loadFromStorage(),await t.loadFromStorage(),await s.loadFromStorage(),await a.loadFromStorage(),await o.loadFromStorage(),await this.checkUpdate(),this.initialized=!0},async loadDataFromBackend(){console.log("loadDataFromBackend..."),this.updateConfig();let e={};try{e=await z.get("/data",this.requestConfig(this.dataToken)),this.setTimeOffset(e),this.refreshToken(e)}catch(c){console.error(c),this.showInitFailure=!0;return}const t=j(),s=I(),a=$(),o=F();await t.loadFromData(e.data.settings),await s.loadFromData(e.data.task),await a.loadFromData(e.data.resources),await o.loadFromData(e.data.essay),e.data.essay.started||await this.sendStart(),this.initialized=!0},async checkUpdate(){let e={};try{e=await z.get("/update",this.requestConfig(this.dataToken)),this.setTimeOffset(e),this.refreshToken(e)}catch(a){return console.error(a),!1}await I().loadFromData(e.data.task),await W().loadFromData(e.data.alerts)},async sendStart(){let e={},t={started:this.serverTime(Date.now())};try{return e=await z.put("/start",t,this.requestConfig(this.dataToken)),this.setTimeOffset(e),this.refreshToken(e),!0}catch(s){return console.error(s),this.showInitFailure=!0,!1}},async saveWritingStepsToBackend(e){let t={},s={steps:e};try{return t=await z.put("/steps",s,this.requestConfig(this.dataToken)),this.setTimeOffset(t),this.refreshToken(t),!0}catch(a){return console.error(a),!1}},async saveFinalContentToBackend(e,t,s,a){let o={},c={steps:e,content:t,hash:s,authorized:a};try{return o=await z.put("/final",c,this.requestConfig(this.dataToken)),this.refreshToken(o),!0}catch(d){return console.error(d),!1}},updateConfig(){y.remove("LongEssayBackend"),y.remove("LongEssayReturn"),y.remove("LongEssayUser"),y.remove("LongEssayEnvironment"),y.remove("LongEssayToken"),y.remove("LongEssayHash"),localStorage.setItem("writerBackendUrl",this.backendUrl),localStorage.setItem("writerReturnUrl",this.returnUrl),localStorage.setItem("writerUserKey",this.userKey),localStorage.setItem("writerEnvironmentKey",this.environmentKey),localStorage.setItem("writerDataToken",this.dataToken),localStorage.setItem("writerFileToken",this.fileToken)},setTimeOffset(e){const t=e.headers.longessaytime*1e3,s=Date.now();this.timeOffset=s-t,localStorage.setItem("writerTimeOffset",this.timeOffset)},refreshToken(e){e.headers.longessaydatatoken&&(this.dataToken=e.headers.longessaydatatoken,localStorage.setItem("writerDataToken",this.dataToken)),e.headers.longessayfiletoken&&(this.fileToken=e.headers.longessayfiletoken,localStorage.setItem("writerFileToken",this.fileToken))},async finalize(e){const t=j(),s=I(),a=$(),o=F(),c=G(),d=W();if((e||o.openSendings>0)&&!await this.saveFinalContentToBackend(o.unsentHistory,o.storedContent,o.storedHash,e)){this.review=!0,this.showFinalizeFailure=!0,this.showAuthorizeFailure=e;return}await t.clearStorage(),await s.clearStorage(),await a.clearStorage(),await o.clearStorage(),await c.clearStorage(),await d.clearStorage(),localStorage.clear(),window.location=this.returnUrl}}}),te=N.createInstance({storeName:"writer-task",description:"Task data"}),I=B("task",{state:()=>({title:null,writer_name:null,instructions:null,writing_end:null,writing_excluded:null,remaining_time:null}),getters:{hasWritingEnd:e=>!!e.writing_end,writingEndReached:e=>e.remaining_time===0,isExcluded:e=>e.writing_excluded>0},actions:{setData(e){this.title=e.title,this.instructions=e.instructions,this.writer_name=e.writer_name,this.writing_end=e.writing_end,this.writing_excluded=e.writing_excluded},async clearStorage(){try{await te.clear()}catch(e){console.log(e)}},async loadFromStorage(){try{const e=await te.getItem("task");this.setData(e)}catch(e){console.log(e)}this.updateRemainingTime(),setInterval(this.updateRemainingTime,1e3)},async loadFromData(e){try{await te.setItem("task",e),this.setData(e)}catch(t){console.log(t)}this.updateRemainingTime(),setInterval(this.updateRemainingTime,1e3)},updateRemainingTime(){const e=E();this.writing_end?this.remaining_time=Math.max(0,this.writing_end-e.serverTime(Date.now())):this.remaining_time=null,(this.writingEndReached||this.isExcluded)&&(e.review=!0)}}}),Le={setup(e){const t=I(),s=G();function a(o){const c=("00"+Math.floor(o)%60).slice(-2),d=("00"+Math.floor(o/60)%60).slice(-2),m=("00"+Math.floor(o/3600)%24).slice(-2),p=Math.floor(o/86400);return p>1?p+" Tage "+m+" Stunden":p>0?p+" Tag "+m+" Stunden":m!="00"?m+":"+d+":"+c+" Stunden":d!="00"?d+":"+c+" Minuten":c+" Sekunden"}return(o,c)=>u((g(),k(A,{onClick:c[0]||(c[0]=d=>n(s).toggleTimer())},{default:l(()=>[r(f,{left:"",icon:"mdi-clock-outline"}),u(i("span",null,C(a(n(t).remaining_time)),513),[[h,n(s).showTimer]])]),_:1},512)),[[h,!n(t).writingEndReached]])}},Fe=M(" Nachricht der Aufsicht: "),Te=i("span",null,"OK",-1),Be=M(" Nachrichten der Aufsicht: "),Re=i("br",null,null,-1),ze=i("span",null,"OK",-1),He={setup(e){const t=W();return(s,a)=>(g(),x(O,null,[u(r(A,{onClick:a[0]||(a[0]=o=>n(t).showAlerts())},{default:l(()=>[r(f,{left:"",icon:"mdi-bell-outline"}),u(i("span",null,"1 Nachricht",512),[[h,n(t).countAlerts==1]]),u(i("span",null,C(n(t).countAlerts)+" Nachrichten",513),[[h,n(t).countAlerts>1]])]),_:1},512),[[h,n(t).hasAlerts]]),r(K,{persistent:"",modelValue:n(t).hasActiveAlert,"onUpdate:modelValue":a[2]||(a[2]=o=>n(t).hasActiveAlert=o)},{default:l(()=>[r(T,null,{default:l(()=>[r(ae,null,{default:l(()=>[Fe]),_:1}),r(U,null,{default:l(()=>[i("p",null,C(n(t).activeMessage),1)]),_:1}),r(V,null,{default:l(()=>[r(A,{onClick:a[1]||(a[1]=o=>n(t).hideAlert())},{default:l(()=>[r(f,{left:"",icon:"mdi-check"}),Te]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(K,{persistent:"",modelValue:n(t).showAllAlerts,"onUpdate:modelValue":a[4]||(a[4]=o=>n(t).showAllAlerts=o)},{default:l(()=>[r(T,null,{default:l(()=>[r(ae,null,{default:l(()=>[Be]),_:1}),r(U,null,{default:l(()=>[(g(!0),x(O,null,ne(n(t).alerts,o=>(g(),x(O,{key:o.key},[i("p",null,[i("strong",null,C(n(t).formatTimestamp(o.time)),1)]),i("p",null,C(o.message),1),Re],64))),128))]),_:1}),r(V,null,{default:l(()=>[r(A,{onClick:a[3]||(a[3]=o=>n(t).hideAlert())},{default:l(()=>[r(f,{left:"",icon:"mdi-check"}),ze]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])],64))}},Ue=i("span",null,"Beenden ...",-1),Ve=M("Unterbrechen"),Ke=M("Vorschau / Abgabe ..."),Oe={setup(e){const t=E(),s=I(),a=W();function o(){var c;return(s.writer_name==null?"":s.writer_name+", ")+((c=s.title)!=null?c:"")}return(c,d)=>(g(),k(oe,{elevation:"1",color:"white",density:"compact"},{default:l(()=>[r(pe,null,{default:l(()=>[M(C(o()),1)]),_:1}),r(de),n(a).hasAlerts?(g(),k(He,{key:0})):_("",!0),n(s).hasWritingEnd?(g(),k(Le,{key:1})):_("",!0),u(r(A,null,{default:l(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),Ue,r(be,{activator:"parent",anchor:"bottom end",origin:"end top"},{default:l(()=>[r(T,null,{default:l(()=>[r(ue,null,{default:l(()=>[r(H,{onClick:d[0]||(d[0]=m=>n(t).finalize(!1))},{default:l(()=>[r(re,null,{default:l(()=>[Ve]),_:1})]),_:1}),r(H,{onClick:d[1]||(d[1]=m=>n(t).review=!0)},{default:l(()=>[r(re,null,{default:l(()=>[Ke]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1},512),[[h,!n(t).review]])]),_:1}))}};var q=(e,t)=>{const s=e.__vccOpts||e;for(const[a,o]of t)s[a]=o;return s};const $e={setup(e){const t=G(),s=$();function a(){document.getElementById("app-navigation-drawer").dispatchEvent(new Event("mouseenter"))}function o(){document.getElementById("app-navigation-drawer").dispatchEvent(new Event("mouseleave"))}function c(m){m.type=="url"?window.open(m.source,"long-essay-writer-resource-"+m.key):(s.selectResource(m),t.showResources())}function d(m){switch(m.type){case"url":return s.isActive(m)&&t.isResourcesVisible?"mdi-file-link":"mdi-file-link-outline";default:return s.isActive(m)&&t.isResourcesVisible?"mdi-file":"mdi-file-outline"}}return(m,p)=>(g(),k(ye,{id:"app-navigation-drawer",elevation:"2",color:"grey-lighten-4",width:"500",permanent:"",rail:"","expand-on-hover":""},{default:l(()=>[r(ue,{color:"grey-lighten-4"},{default:l(()=>[r(H,{onClick:p[0]||(p[0]=v=>{n(t).showInstructions(),o()}),"prepend-icon":n(t).isInstructionsVisible?"mdi-text-box":"mdi-text-box-outline",title:"Aufgabenstellung"},null,8,["prepend-icon"]),r(H,{onClick:p[1]||(p[1]=v=>{n(t).showEssay(),o()}),"prepend-icon":n(t).isEssayVisible?"mdi-file-edit":"mdi-file-edit-outline",title:"Essay schreiben"},null,8,["prepend-icon"]),u(r(fe,null,{activator:l(({props:v})=>[r(H,Ae(v,{onMouseenter:p[2]||(p[2]=Q=>a()),"prepend-icon":n(t).isResourcesVisible?"mdi-book-open":"mdi-book-open-outline",title:"Material"}),null,16,["prepend-icon"])]),default:l(()=>[(g(!0),x(O,null,ne(n(s).resources,v=>(g(),k(H,{onClick:Q=>{c(v),o()},"prepend-icon":d(v),title:v.title,key:v.key},null,8,["onClick","prepend-icon","title"]))),128))]),_:1},512),[[h,n(s).hasResources]])]),_:1})]),_:1}))}};var Ne=q($e,[["__scopeId","data-v-bbfa5284"]]);const Me={setup(e){const t=F();return(s,a)=>(g(),k(oe,{position:"bottom",height:"48",color:"grey-lighten-5",elevation:"1"},{default:l(()=>[M(" \xC4nderungen: "+C(n(t).historyLength)+" | Zu senden: "+C(n(t).openSendings),1)]),_:1}))}};const je=["innerHTML"],Ge={setup(e){const t=I();return(s,a)=>(g(),x("div",{id:"app-instructions",innerHTML:n(t).instructions},null,8,je))}};var qe=q(Ge,[["__scopeId","data-v-68e1ed10"]]);const Je={class:"resources"},We={key:0},Ze=["data"],Qe={setup(e){const t=$();return(s,a)=>(g(),x("div",Je,[(g(!0),x(O,null,ne(n(t).resources,o=>(g(),x(O,{key:o.key},[o.type=="file"?u((g(),x("div",We,[o.mimetype=="application/pdf"?(g(),x("object",{key:0,type:"application/pdf",data:o.objectUrl,width:"100%",height:"100%"},null,8,Ze)):_("",!0)],512)),[[h,n(t).isActive(o)]]):_("",!0)],64))),128))]))}};var Pe=q(Qe,[["__scopeId","data-v-2e61ae4e"]]);var Xe=`/**
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
`;const et={setup(e){const t=F(),s=j();function a(){switch(s.formatting_options){case"full":return"undo redo | formatselect | bold italic underline | bullist numlist | removeformat | charmap | paste";case"medium":return"undo redo | bold italic underline | bullist numlist | removeformat | charmap | paste";case"minimal":return"undo redo | bold italic underline | removeformat | charmap | paste";case"none":default:return"undo redo | charmap |paste"}}function o(){switch(s.formatting_options){case"full":return"p/div,br,strong/b,em/i,u,ol,ul,li,h1,h2,h3,h4,h5,h6,pre";case"medium":return"p/div,br,strong/b,em/i,u,ol,ul,li";case"minimal":return"p/div,p/li,br,strong/b,em/i,u";case"none":default:return"p/div,p/li,br"}}function c(){return{underline:{inline:"u",remove:"all"}}}const d="essay";return(m,p)=>(g(),k(n(ke),{id:d,modelValue:n(t).currentContent,"onUpdate:modelValue":p[0]||(p[0]=v=>n(t).currentContent=v),onChange:p[1]||(p[1]=v=>n(t).updateContent(!0)),onKeyup:p[2]||(p[2]=v=>n(t).updateContent(!0)),"api-key":"no-api-key",init:{height:"100%",menubar:!1,plugins:"lists charmap paste",toolbar:a(),valid_elements:o(),formats:c(),custom_undo_redo_levels:10,skin:!1,content_css:!1,content_style:n(Xe).toString()+`
`+n(Ye).toString(),paste_block_drop:!0}},null,8,["modelValue","init"]))}};const Z=e=>(he("data-v-439538ca"),e=e(),me(),e),tt={class:"container"},nt={class:"col-header"},ot={class:"text-h6"},st={class:"col-content"},at=Z(()=>i("span",null,"Mein Text",-1)),rt=Z(()=>i("span",null,"Erweitern",-1)),it=Z(()=>i("div",{class:"col-header"},[i("h2",{class:"text-h6"},"Mein Text")],-1)),lt={class:"col-content"},ct=Z(()=>i("span",null,"Erweitern",-1)),dt={setup(e){const t=G(),s=$();return(a,o)=>(g(),k(se,{"fill-height":""},{default:l(()=>[i("div",tt,[u(i("div",{class:J(["column",{colExpanded:n(t).isLeftExpanded,colNormal:!n(t).isLeftExpanded}])},[i("div",nt,[u(i("h2",ot,"Aufgabenstellung",512),[[h,n(t).isInstructionsVisible]]),u(i("h2",{class:"text-h6"},C(n(s).activeTitle),513),[[h,n(t).isResourcesVisible]])]),i("div",st,[u(r(qe,null,null,512),[[h,n(t).isInstructionsVisible]]),u(r(Pe,null,null,512),[[h,n(t).isResourcesVisible]])]),i("div",{class:J(["col-footer text-right",{footerExpanded:n(t).isLeftExpanded,footerNormal:!n(t).isLeftExpanded}])},[u(r(A,{class:"ma-2",onClick:o[0]||(o[0]=c=>n(t).setLeftExpanded(!1))},{default:l(()=>[r(f,{icon:"mdi-chevron-left"}),at]),_:1},512),[[h,n(t).isLeftExpanded]]),u(r(A,{class:"ma-2",onClick:o[1]||(o[1]=c=>n(t).setLeftExpanded(!0))},{default:l(()=>[rt,r(f,{icon:"mdi-chevron-right"})]),_:1},512),[[h,!n(t).isLeftExpanded]])],2)],2),[[h,n(t).isLeftVisible]]),u(i("div",{class:J(["column",{colExpanded:n(t).isRightExpanded,colNormal:!n(t).isRightExpanded}])},[it,i("div",lt,[r(et)]),i("div",{class:J(["col-footer text-left",{footerExpanded:n(t).isRightExpanded,footerNormal:!n(t).isRightExpanded}])},[u(r(A,{class:"ma-2",onClick:o[2]||(o[2]=c=>n(t).setRightExpanded(!0))},{default:l(()=>[r(f,{icon:"mdi-chevron-left"}),ct]),_:1},512),[[h,!n(t).isRightExpanded]]),u(r(A,{class:"ma-2",onClick:o[3]||(o[3]=c=>n(t).setRightExpanded(!1))},{default:l(()=>[u(i("span",null,"Aufgabenstellung",512),[[h,n(t).isInstructionsSelected]]),u(i("span",null,C(n(s).activeTitle),513),[[h,n(t).isResourcesSelected]]),r(f,{icon:"mdi-chevron-right"})]),_:1},512),[[h,n(t).isRightExpanded]])],2)],2),[[h,n(t).isRightVisible]])])]),_:1}))}};var ut=q(dt,[["__scopeId","data-v-439538ca"]]);const ht=i("p",null,"Lade Daten...",-1),mt=i("span",null,"Beenden ...",-1),gt=i("p",null,"Beim Laden der Daten ist ein Fehler aufgetreten. Die Anwendung kann nicht gestartet werden.",-1),pt=i("span",null,"Beenden",-1),bt=i("p",null,"In Ihrem Browser sind Eingaben eines anderen Benutzers oder einer anderen Aufgabe vorhanden, die noch nicht \xFCbertragen wurden. Durch das Laden werden diese Eingaben gel\xF6scht.",-1),ft=i("p",null,"M\xF6chten Sie die neue Aufgabe laden?",-1),At=i("span",null,"Laden",-1),yt=i("span",null,"Abbrechen",-1),kt=i("p",null,"In Ihrem Browser sind Eingaben vorhanden, die noch nicht \xFCbertragen wurden. Die letzte im System gespeicherte Eingabe scheint aber nicht aus diesem Browser zu stammen. Das kann z.B. passieren, wenn Ihre Netzverbindung unterbrochen wurde und Sie anschlie\xDFend in einem anderen Browser weitergearbeitet haben. Durch das Laden werden Ihre Eingaben im Browser \xFCberschrieben.",-1),vt=i("p",null,"M\xF6chten Sie die Eingabe vom System laden?",-1),wt=i("span",null,"Laden",-1),_t=i("span",null,"Abbrechen",-1),xt={setup(e){const t=E();return(s,a)=>(g(),k(se,{"fill-height":""},{default:l(()=>[r(oe,{elevation:"1",color:"white",density:"compact"},{default:l(()=>[ht,r(de),r(A,{href:n(t).returnUrl},{default:l(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),mt]),_:1},8,["href"])]),_:1}),r(K,{persistent:"",modelValue:n(t).showInitFailure,"onUpdate:modelValue":a[0]||(a[0]=o=>n(t).showInitFailure=o)},{default:l(()=>[r(T,null,{default:l(()=>[r(U,null,{default:l(()=>[gt]),_:1}),r(V,null,{default:l(()=>[r(A,{href:n(t).returnUrl},{default:l(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),pt]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(K,{persistent:"",modelValue:n(t).showReplaceConfirmation,"onUpdate:modelValue":a[2]||(a[2]=o=>n(t).showReplaceConfirmation=o)},{default:l(()=>[r(T,null,{default:l(()=>[r(U,null,{default:l(()=>[bt,ft]),_:1}),r(V,null,{default:l(()=>[r(A,{onClick:a[1]||(a[1]=o=>n(t).loadDataFromBackend())},{default:l(()=>[r(f,{left:"",icon:"mdi-reload"}),At]),_:1}),r(A,{href:n(t).returnUrl},{default:l(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),yt]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"]),r(K,{persistent:"",modelValue:n(t).showReloadConfirmation,"onUpdate:modelValue":a[4]||(a[4]=o=>n(t).showReloadConfirmation=o)},{default:l(()=>[r(T,null,{default:l(()=>[r(U,null,{default:l(()=>[kt,vt]),_:1}),r(V,null,{default:l(()=>[r(A,{onClick:a[3]||(a[3]=o=>n(t).loadDataFromBackend())},{default:l(()=>[r(f,{left:"",icon:"mdi-reload"}),wt]),_:1}),r(A,{href:n(t).returnUrl},{default:l(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),_t]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};const w=e=>(he("data-v-d56a1e56"),e=e(),me(),e),Ct={class:"container"},St={class:"column"},It=w(()=>i("div",{class:"col-header bg-grey-lighten-4"},[i("h2",{class:"text-h6",style:{color:"#f00000"}},"Ihre letzten Eingaben wurden noch nicht gespeichert!"),i("p",null,"Bitte warten sie, bis eine Speicherung wieder m\xF6glich ist. Wenden Sie sich gegebenenfalls an die Aufsicht.")],-1)),Dt={class:"col-content"},Et=["innerHTML"],Lt={class:"col-footer text-right bg-grey-lighten-4"},Ft=w(()=>i("span",null,"Weiter bearbeiten",-1)),Tt=w(()=>i("span",null,"Ohne Speichern beenden",-1)),Bt={class:"column"},Rt={class:"col-header bg-grey-lighten-4"},zt=w(()=>i("h2",{class:"text-h6"},"Sie wurden von der Bearbeitung ausgeschlossen.",-1)),Ht=w(()=>i("p",null,"Es ist keine weitere Eingabe m\xF6glich.",-1)),Ut=[zt,Ht],Vt={class:"col-header bg-grey-lighten-4"},Kt=w(()=>i("h2",{class:"text-h6"},"Ihre Bearbeitungszeit ist beendet",-1)),Ot=w(()=>i("p",null,"Es ist keine weitere Eingabe m\xF6glich. Bitte \xFCberpr\xFCfen Sie, ob Sie den Text in dieser Form zur Bewertung abgeben m\xF6chten.",-1)),$t=[Kt,Ot],Nt={class:"col-header bg-grey-lighten-4"},Mt=w(()=>i("h2",{class:"text-h6"},"Abgabe-Text",-1)),jt=w(()=>i("p",null,"Bitte \xFCberpr\xFCfen Sie, ob Sie den Text in dieser Form zur Bewertung abgeben m\xF6chten. Nach der Abgabe ist keine weitere Bearbeitung mehr m\xF6glich!",-1)),Gt=[Mt,jt],qt={class:"col-content"},Jt=["innerHTML"],Wt={class:"col-footer text-right bg-grey-lighten-4"},Zt=w(()=>i("span",null,"Ohne Abgabe beenden",-1)),Qt=w(()=>i("span",null,"Weiter bearbeiten",-1)),Pt=w(()=>i("span",null,"Sp\xE4ter versuchen",-1)),Xt=w(()=>i("span",null,"Ohne Speichern beenden",-1)),Yt={setup(e){const t=E(),s=F(),a=I(),o=j();return(c,d)=>(g(),k(se,{"fill-height":""},{default:l(()=>[i("div",Ct,[u(i("div",St,[It,i("div",Dt,[i("div",{class:"review-text",innerHTML:n(s).storedContent},null,8,Et)]),i("div",Lt,[r(A,{class:"ma-2",color:n(o).primaryColorCss,onClick:d[0]||(d[0]=m=>n(t).finalize(!1))},{default:l(()=>[r(f,{color:n(o).primaryTextColorCss,icon:"mdi-refresh"},null,8,["color"]),i("span",{style:ie(n(o).primaryTextColorFullCss)},"Erneut versuchen",4)]),_:1},8,["color"]),u(r(A,{class:"ma-2",onClick:d[1]||(d[1]=m=>n(t).review=!1)},{default:l(()=>[r(f,{icon:"mdi-file-edit-outline"}),Ft]),_:1},512),[[h,!n(a).writingEndReached&&!n(a).isExcluded]]),r(A,{class:"ma-2",href:n(t).returnUrl},{default:l(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),Tt]),_:1},8,["href"])])],512),[[h,n(s).openSendings>0]]),u(i("div",Bt,[u(i("div",Rt,Ut,512),[[h,n(a).isExcluded]]),u(i("div",Vt,$t,512),[[h,n(a).writingEndReached&&!n(a).isExcluded]]),u(i("div",Nt,Gt,512),[[h,!n(a).writingEndReached&&!n(a).isExcluded]]),i("div",qt,[i("div",{class:"review-text",innerHTML:n(s).storedContent},null,8,Jt)]),i("div",Wt,[u(r(A,{class:"ma-2",onClick:d[2]||(d[2]=m=>n(t).finalize(!0)),color:n(o).primaryColorCss},{default:l(()=>[r(f,{color:n(o).primaryTextColorCss,icon:"mdi-file-send-outline"},null,8,["color"]),i("span",{style:ie(n(o).primaryTextColorFullCss)},"Zur Bewertung abgeben",4)]),_:1},8,["color"]),[[h,!n(a).isExcluded]]),u(r(A,{class:"ma-2",onClick:d[3]||(d[3]=m=>n(t).finalize(!1))},{default:l(()=>[r(f,{icon:"mdi-logout-variant"}),Zt]),_:1},512),[[h,n(a).writingEndReached||n(a).isExcluded]]),u(r(A,{class:"ma-2",onClick:d[4]||(d[4]=m=>n(t).review=!1)},{default:l(()=>[r(f,{icon:"mdi-file-edit-outline"}),Qt]),_:1},512),[[h,!n(a).writingEndReached&&!n(a).isExcluded]])])],512),[[h,n(s).openSendings<=0]])]),r(K,{persistent:"",modelValue:n(t).showFinalizeFailure,"onUpdate:modelValue":d[6]||(d[6]=m=>n(t).showFinalizeFailure=m)},{default:l(()=>[r(T,null,{default:l(()=>[r(U,null,{default:l(()=>[u(i("p",null,"Beim Speichern der Abgabe ist ein Fehler aufgetreten. Bitte versuchen Sie es sp\xE4ter noch einmal.",512),[[h,n(t).showAuthorizeFailure]]),u(i("p",null,"Beim Speichern Ihrer letzten \xC4nderungen ist ein Fehler aufgetreten. Bitte versuchen Sie es sp\xE4ter noch einmal.",512),[[h,!n(t).showAuthorizeFailure]])]),_:1}),r(V,null,{default:l(()=>[r(A,{onClick:d[5]||(d[5]=m=>n(t).showFinalizeFailure=!1)},{default:l(()=>[r(f,{left:"",icon:"mdi-close"}),Pt]),_:1}),r(A,{href:n(t).returnUrl},{default:l(()=>[r(f,{left:"",icon:"mdi-logout-variant"}),Xt]),_:1},8,["href"])]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1}))}};var en=q(Yt,[["__scopeId","data-v-d56a1e56"]]);const tn={setup(e){const t=E();return t.init(),(s,a)=>(g(),k(ve,{"fill-height":""},{default:l(()=>[n(t).initialized?_("",!0):(g(),k(xt,{key:0})),n(t).initialized?(g(),k(Oe,{key:1})):_("",!0),n(t).initialized?(g(),k(Me,{key:2})):_("",!0),n(t).initialized&&!n(t).review?(g(),k(Ne,{key:3})):_("",!0),n(t).initialized&&!n(t).review?(g(),k(ut,{key:4})):_("",!0),n(t).initialized&&n(t).review?(g(),k(en,{key:5})):_("",!0)]),_:1}))}};var nn=we();_e(tn).use(xe()).use(nn).mount("#app");
