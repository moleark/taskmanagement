(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{75:function(e,t,r){"use strict";r.r(t),r.d(t,"ChangePasswordPage",function(){return h});var n=r(1),a=r.n(n),s=r(2),o=r(4),c=r(5),u=r(3),i=r(6),d=r(10),w=r(0),l=r(9),m=r(15),b=function(e,t,r,n){return new(r||(r=Promise))(function(a,s){function o(e){try{u(n.next(e))}catch(t){s(t)}}function c(e){try{u(n.throw(e))}catch(t){s(t)}}function u(e){e.done?a(e.value):new r(function(t){t(e.value)}).then(o,c)}u((n=n.apply(e,t||[])).next())})},h=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).apply(this,arguments))).schema=[{name:"orgPassword",type:"string",maxLength:60,required:!0},{name:"newPassword",type:"string",maxLength:60,required:!0},{name:"newPassword1",type:"string",maxLength:60,required:!0},{name:"submit",type:"button"}],e.uiSchema={items:{orgPassword:{label:"\u539f\u5bc6\u7801",placeholder:"\u8f93\u5165\u539f\u6765\u7684\u5bc6\u7801"},newPassword:{label:"\u65b0\u5bc6\u7801",placeholder:"\u8f93\u5165\u65b0\u8bbe\u7684\u5bc6\u7801"},newPassword1:{label:"\u786e\u8ba4\u5bc6\u7801",placeholder:"\u518d\u6b21\u8f93\u5165\u65b0\u8bbe\u5bc6\u7801"},submit:{widget:"button",label:"\u63d0\u4ea4",className:"btn btn-primary"}}},e.onSubmit=function(t,r){return b(Object(d.a)(Object(d.a)(e)),void 0,void 0,a.a.mark(function e(){var t,n,s,o,c;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=r.data,n=t.orgPassword,s=t.newPassword,o=t.newPassword1,s===o){e.next=4;break}return r.setError("newPassword1","\u65b0\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165"),e.abrupt("return");case 4:return c=new m.b("tv/",void 0),e.next=7,c.changePassword({orgPassword:n,newPassword:s});case 7:if(!1!==e.sent){e.next=11;break}return r.setError("orgPassword","\u539f\u5bc6\u7801\u9519\u8bef"),e.abrupt("return");case 11:return l.t.replace(w.createElement(l.k,{header:"\u4fee\u6539\u5bc6\u7801",back:"close"},w.createElement("div",{className:"m-3  text-success"},"\u5bc6\u7801\u4fee\u6539\u6210\u529f\uff01"))),e.abrupt("return");case 13:case"end":return e.stop()}},e)}))},e}return Object(i.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return w.createElement(l.k,{header:"\u4fee\u6539\u5bc6\u7801"},w.createElement(l.e,{className:"m-3",schema:this.schema,uiSchema:this.uiSchema,onButtonClick:this.onSubmit,fieldLabelSize:2}))}}]),t}(w.Component)}}]);
//# sourceMappingURL=1.328fe5ed.chunk.js.map