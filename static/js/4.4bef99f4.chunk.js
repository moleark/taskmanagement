(this.webpackJsonptaskmanagement=this.webpackJsonptaskmanagement||[]).push([[4],{150:function(e,t,n){"use strict";n.r(t),n.d(t,"ChangePasswordPage",(function(){return u}));var r=n(0),a=n(15),o=n(20),s=function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=function(e,t,n,r){return new(n||(n=Promise))((function(a,o){function s(e){try{c(r.next(e))}catch(t){o(t)}}function i(e){try{c(r.throw(e))}catch(t){o(t)}}function c(e){var t;e.done?a(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,i)}c((r=r.apply(e,t||[])).next())}))},c=function(e,t){var n,r,a,o,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:i(0),throw:i(1),return:i(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function i(o){return function(i){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(a=(a=s.trys).length>0&&a[a.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){s.label=o[1];break}if(6===o[0]&&s.label<a[1]){s.label=a[1],a=o;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(o);break}a[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(i){o=[6,i],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,i])}}},u=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.schema=[{name:"orgPassword",type:"string",maxLength:60,required:!0},{name:"newPassword",type:"string",maxLength:60,required:!0},{name:"newPassword1",type:"string",maxLength:60,required:!0},{name:"submit",type:"submit"}],t.uiSchema={items:{orgPassword:{widget:"password",label:"\u539f\u5bc6\u7801",placeholder:"\u8f93\u5165\u539f\u6765\u7684\u5bc6\u7801"},newPassword:{widget:"password",label:"\u65b0\u5bc6\u7801",placeholder:"\u8f93\u5165\u65b0\u8bbe\u7684\u5bc6\u7801"},newPassword1:{widget:"password",label:"\u786e\u8ba4\u5bc6\u7801",placeholder:"\u518d\u6b21\u8f93\u5165\u65b0\u8bbe\u5bc6\u7801"},submit:{widget:"button",label:"\u63d0\u4ea4",className:"btn btn-primary"}}},t.onSubmit=function(e,n){return i(t,void 0,void 0,(function(){var e,t,s,i;return c(this,(function(c){switch(c.label){case 0:return e=n.data,t=e.orgPassword,s=e.newPassword,i=e.newPassword1,s!==i?(n.setError("newPassword1","\u65b0\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"),[2]):[4,new o.c("tv/",void 0).changePassword({orgPassword:t,newPassword:s})];case 1:return!1===c.sent()?(n.setError("orgPassword","\u539f\u5bc6\u7801\u9519\u8bef"),[2]):(a.nav.replace(r.createElement(a.Page,{header:"\u4fee\u6539\u5bc6\u7801",back:"close"},r.createElement("div",{className:"m-3  text-success"},"\u5bc6\u7801\u4fee\u6539\u6210\u529f\uff01"))),[2])}}))}))},t}return s(t,e),t.prototype.render=function(){return r.createElement(a.Page,{header:"\u4fee\u6539\u5bc6\u7801"},r.createElement(a.Form,{className:"m-3",schema:this.schema,uiSchema:this.uiSchema,onButtonClick:this.onSubmit,fieldLabelSize:2}))},t}(r.Component)}}]);
//# sourceMappingURL=4.4bef99f4.chunk.js.map