(this.webpackJsonpneurocle=this.webpackJsonpneurocle||[]).push([[0],{12:function(t,e,n){t.exports={container:"Tool_container__1Szw6",shapeButtonBox:"Tool_shapeButtonBox__3ZrH2",customInputBox:"Tool_customInputBox__5O10G",controlButtonBox:"Tool_controlButtonBox__1dCPk",guideBox:"Tool_guideBox__1njCz"}},20:function(t,e,n){t.exports={button:"Button_button__17x3e",active:"Button_active__15qMB",disable:"Button_disable__M3pI4"}},21:function(t,e,n){t.exports={container:"Canvas_container__1Vfbb",stage:"Canvas_stage__35f8o"}},23:function(t,e,n){t.exports={container:"App_container__eSJ6i"}},26:function(t,e,n){t.exports={container:"CustomInput_container__1QDtG"}},30:function(t,e,n){},38:function(t,e,n){"use strict";n.r(e);var o=n(1),i=n.n(o),s=n(15),r=n.n(s),c=(n(30),n(4)),a=n.n(c),l=n(23),h=n.n(l),u=n(8),d=n(10),p=n(5),j=n(21),b=n.n(j),f=n(6),y=n(9),O=n(19),x=Object(O.b)({name:"canvas",initialState:{shapeType:"rect",strokeColor:"#000000",strokeWidth:5,fillColor:"#000000",fillColorTransparency:!0,shapes:[],layersHistory:[],layersNow:-1,layersHistoryLimit:40},reducers:{seShapeType:function(t,e){var n=e.payload;t.shapeType=n},setColor:function(t,e){var n=e.payload;t[n.target]=n.value},setFillColorTransparency:function(t){t.fillColorTransparency=!t.fillColorTransparency},setStrokeWidth:function(t,e){var n=e.payload;t.strokeWidth=n},setShapes:function(t,e){var n=e.payload;t.shapes=n},setLayersHitory:function(t,e){var n=e.payload;t.layersHistory=n},setLayersNow:function(t,e){var n=e.payload;t.layersNow=n}}}),v=function(t,e){var n=Object(o.useState)((function(){return JSON.parse(localStorage.getItem(t))||e})),i=Object(p.a)(n,2),s=i[0],r=i[1];return[s,function(e){var n="function"===typeof e?e(s):e;r(n),localStorage.setItem(t,JSON.stringify(n))}]},g=n(2),k=b.a.container,C=b.a.stage,w=function(){var t=Object(o.useState)({width:0,height:0}),e=Object(p.a)(t,2),n=e[0],i=e[1],s=Object(o.useRef)(null);Object(o.useEffect)((function(){s.current&&i({width:s.current.clientWidth,height:s.current.clientHeight});var t=function(){i({width:s.current.clientWidth,height:s.current.clientHeight})};return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[s]);var r=Object(y.b)(),c=Object(y.c)((function(t){return t.canvas})),l=c.shapes,h=c.shapeType,j=c.strokeColor,b=c.strokeWidth,O=c.fillColor,w=c.fillColorTransparency,_=c.layersHistory,m=c.layersNow,T=c.layersHistoryLimit,W=v("storedLayersHistory",[]),S=Object(p.a)(W,2),N=S[0],B=S[1],L=v("storedLayersNow",-1),H=Object(p.a)(L,2),I=H[0],A=H[1];Object(o.useEffect)((function(){N[I]||A(N.length-1),!_.length&&N.length>0&&(r(x.actions.setLayersHitory(N)),r(x.actions.setLayersNow(I)),r(x.actions.setShapes(N[I]?N[I]:[])))}),[]);var M=Object(o.useState)([]),D=Object(p.a)(M,2),E=D[0],F=D[1],J=Object(o.useState)({type:h,x:0,y:0,width:0,height:0,points:[],strokeColor:j,strokeWidth:b,fillColor:O,fillColorTransparency:w}),z=Object(p.a)(J,2),P=z[0],G=z[1],X=Object(o.useState)(!1),Y=Object(p.a)(X,2),q=Y[0],K=Y[1],Q=Object(o.useState)(!1),R=Object(p.a)(Q,2),U=R[0],V=R[1];Object(o.useEffect)((function(){["spline","polygon"].includes(h)?V(!0):V(!1)}),[h]);var Z=function(t){F([].concat(Object(d.a)(E),[t.pageX,t.pageY])),K(!0)},$=function(){G({type:h,x:0,y:0,width:0,height:0,points:[],strokeColor:j,strokeWidth:b,fillColor:O,fillColorTransparency:w}),F([]),K(!1)},tt=function(t){if(!t||U){var e=Object(d.a)(l),n=m<T?_.filter((function(t,e){return e<m})):_.filter((function(t,e){return e>0&&e<T}));if(t&&U){var o=Object(u.a)(Object(u.a)({},P),{},{points:E.slice(0,E.length-2)});e.push(o)}else e.push(P);r(x.actions.setShapes(e)),n.push(e),B(n),r(x.actions.setLayersHitory(n));var i=m+1<T-1?m+1:T-1;A(i),r(x.actions.setLayersNow(i)),$()}else $()};return Object(g.jsx)("div",{className:a()(k),ref:s,onMouseDown:function(t){return 0===t.button&&!U&&Z(t)},onMouseUp:function(){return!U&&tt(!1)},onClick:function(t){return U&&Z(t)},onMouseMove:function(t){return q&&function(t){F([].concat(Object(d.a)(E.slice(0,E.length>2?E.length-2:2)),[t.pageX,t.pageY]));var e=E[0]-E[E.length-2],n=E[1]-E[E.length-1],o=e<0?E[0]:E[E.length-2],i=n<0?E[1]:E[E.length-1],s={type:h,x:"ellipse"===h?o+Math.abs(e)/2:o,y:"ellipse"===h?i+Math.abs(n)/2:i,width:Math.abs(e),height:Math.abs(n),points:Object(d.a)(E),strokeColor:j,strokeWidth:b,fillColor:O,fillColorTransparency:w};G(s)}(t)},onDoubleClick:function(){return U&&tt(!1)},onKeyDown:function(t){return"Escape"===t.key&&tt(!0)},tabIndex:"0",children:Object(g.jsx)(f.e,{className:a()(C),width:n.width,height:n.height,children:Object(g.jsxs)(f.b,{children:[l&&l.map((function(t,e){return"line"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(f.c,{stroke:t.strokeColor,strokeWidth:t.strokeWidth,points:t.points},"".concat(t.type,"-").concat(e)):"spline"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(f.c,{stroke:t.strokeColor,strokeWidth:t.strokeWidth,points:t.points,tension:.5},"".concat(t.type,"-").concat(e)):"ellipse"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(f.a,{fill:t.fillColorTransparency?"transparent":t.fillColor,stroke:t.strokeColor,strokeWidth:t.strokeWidth,x:t.x,y:t.y,width:t.width,height:t.height},"".concat(t.type,"-").concat(e)):"rect"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(f.d,{fill:t.fillColorTransparency?"transparent":t.fillColor,stroke:t.strokeColor,strokeWidth:t.strokeWidth,x:t.x,y:t.y,width:t.width,height:t.height},"".concat(t.type,"-").concat(e)):"polygon"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(f.c,{fill:t.fillColorTransparency?"transparent":t.fillColor,stroke:t.strokeColor,strokeWidth:t.strokeWidth,points:t.points,closed:!0},"".concat(t.type,"-").concat(e)):void 0})),"line"===h&&Object(g.jsx)(f.c,{stroke:j,strokeWidth:b,points:P.points}),"spline"===h&&Object(g.jsx)(f.c,{stroke:j,strokeWidth:b,points:E,tension:.5}),"ellipse"===h&&Object(g.jsx)(f.a,{fill:w?"transparent":O,stroke:j,strokeWidth:b,x:P.x,y:P.y,width:P.width,height:P.height}),"rect"===h&&Object(g.jsx)(f.d,{fill:w?"transparent":O,stroke:j,strokeWidth:b,x:P.x,y:P.y,width:P.width,height:P.height}),"polygon"===h&&Object(g.jsx)(f.c,{fill:w?"transparent":O,stroke:j,strokeWidth:b,points:E,closed:!0})]})})})},_=n(12),m=n.n(_),T=m.a.container,W=m.a.shapeButtonBox,S=m.a.customInputBox,N=m.a.controlButtonBox,B=m.a.guideBox,L=function(){var t=Object(y.b)(),e=Object(y.c)((function(t){return t.canvas})),n=e.shapes,o=e.shapeType,i=e.strokeColor,s=e.strokeWidth,r=e.fillColor,c=e.fillColorTransparency,l=e.layersHistory,h=e.layersNow,u=e.layersHistoryLimit,d=v("storedLayersHistory",[]),j=Object(p.a)(d,2),b=(j[0],j[1]),f=v("storedLayersNow",-1),O=Object(p.a)(f,2),k=(O[0],O[1]),C=function(e){t(x.actions.seShapeType(e))},w=function(e,n){t(x.actions.setColor({target:n,value:e.target.value}))};return Object(g.jsxs)("div",{className:a()(T),children:[Object(g.jsxs)("div",{className:a()(W),children:[Object(g.jsx)("h3",{children:"\ub4dc\ub85c\uc789 \ud0c0\uc785"}),Object(g.jsxs)("div",{children:[Object(g.jsx)(F,{onClick:function(){return C("line")},isActive:"line"===o,children:"\uc9c1\uc120"}),Object(g.jsx)(F,{onClick:function(){return C("spline")},isActive:"spline"===o,children:"\uace1\uc120"}),Object(g.jsx)(F,{onClick:function(){return C("ellipse")},isActive:"ellipse"===o,children:"\uc6d0"}),Object(g.jsx)(F,{onClick:function(){return C("rect")},isActive:"rect"===o,children:"\uc9c1\uc0ac\uac01\ud615"}),Object(g.jsx)(F,{onClick:function(){return C("polygon")},isActive:"polygon"===o,children:"\ub2e4\uac01\ud615"})]})]}),Object(g.jsxs)("div",{className:a()(S),children:[Object(g.jsx)("h3",{children:"\ub4dc\ub85c\uc789 \uc635\uc158"}),Object(g.jsxs)("div",{children:[Object(g.jsx)(P,{inputId:"strokeColor",onChange:function(t){return w(t,"strokeColor")},value:i,inputOption:{type:"color"},children:"\ud14c\ub450\ub9ac \uc0c9\uc0c1"}),Object(g.jsx)(P,{inputId:"strokeWidth",onChange:function(e){return function(e){var n=parseInt(e.target.value);t(x.actions.setStrokeWidth(n>50?50:n<5?5:n))}(e)},value:s,inputOption:{type:"number",min:5,max:50},children:"\ud14c\ub450\ub9ac \ub450\uaed8"}),Object(g.jsx)(P,{inputId:"fillColor",onChange:function(t){return w(t,"fillColor")},value:r,inputOption:{type:"color"},children:"\ucc44\uc6b0\uae30 \uc0c9\uc0c1"}),Object(g.jsx)(P,{inputId:"fillColorTransparency",onChange:function(){t(x.actions.setFillColorTransparency())},value:0,inputOption:{type:"checkbox",checked:c},children:"\ucc44\uc6b0\uae30 \uc5c6\uc74c"})]})]}),Object(g.jsxs)("div",{className:a()(N),children:[Object(g.jsx)("h3",{children:"\ud3b8\uc9d1"}),Object(g.jsxs)("div",{children:[Object(g.jsx)(F,{onClick:function(){var e=h>=0?h>l.length-1?l.length-1:h-1:-1;k(e),t(x.actions.setLayersNow(e)),t(x.actions.setShapes(e>-1?l[e]:[]))},isActive:!1,isDisable:h<0,children:"undo"}),Object(g.jsx)(F,{onClick:function(){var e=h<l.length-1?h+1:l.length-1;k(e),t(x.actions.setLayersNow(e)),t(x.actions.setShapes(e>-1?l[e]:[]))},isActive:!1,isDisable:h>=l.length-1,children:"redo"}),Object(g.jsx)(F,{onClick:function(){return n.length&&function(){var e=l.filter((function(t,e){return e<=h}));e.push([]),t(x.actions.setShapes([])),t(x.actions.setLayersHitory(e)),b(e);var n=h+1<u-1?h+1:u-1;t(x.actions.setLayersNow(n)),k(n)}()},isActive:!1,isDisable:!n.length,children:"clear"}),Object(g.jsx)(F,{onClick:function(){window.confirm("\ucd08\uae30\ud654 \ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")&&(t(x.actions.setShapes([])),t(x.actions.setLayersHitory([])),b([]),t(x.actions.setLayersNow(-1)),k(-1))},isActive:!1,children:"reset"})]})]}),Object(g.jsxs)("div",{className:a()(B),children:[Object(g.jsx)("h3",{children:"\uc0ac\uc6a9 \uc815\ubcf4"}),Object(g.jsxs)("ul",{children:[Object(g.jsxs)("li",{children:[Object(g.jsx)("span",{children:"esc:"}),Object(g.jsx)("span",{children:"\uc9c4\ud589 \uc911\uc778 \uc791\uc5c5 \ucde8\uc18c"})]}),Object(g.jsxs)("li",{children:[Object(g.jsx)("span",{children:"\ub354\ube14\ud074\ub9ad:"}),Object(g.jsx)("span",{children:"\uc9c4\ud589 \uc911\uc778 \uc791\uc5c5(\uace1\uc120, \ub2e4\uac01\ud615)\uc744 \ud574\ub2f9 \uc704\uce58\uc5d0\uc11c \uc644\ub8cc"})]})]})]})]})},H=n(3),I=n(20),A=n.n(I),M=A.a.button,D=A.a.active,E=A.a.disable,F=function(t){var e,n=t.onClick,o=t.isActive,i=t.isDisable,s=t.style,r=t.children;return Object(g.jsx)("button",{onClick:n,className:a()(M,(e={},Object(H.a)(e,D,o),Object(H.a)(e,E,i),e)),disabled:i,style:s,children:r})},J=n(26),z=n.n(J).a.container,P=function(t){var e=t.style,n=t.inputOption,o=t.inputId,i=t.onChange,s=t.value,r=t.children;return Object(g.jsxs)("div",{className:a()(z),style:e,children:[Object(g.jsx)("label",{htmlFor:o,children:r}),Object(g.jsx)("input",Object(u.a)({id:o,onChange:i,value:s},n))]})},G=h.a.container;var X=function(){return Object(g.jsxs)("div",{className:a()(G),children:[Object(g.jsx)(w,{}),Object(g.jsx)(L,{})]})},Y=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,40)).then((function(e){var n=e.getCLS,o=e.getFID,i=e.getFCP,s=e.getLCP,r=e.getTTFB;n(t),o(t),i(t),s(t),r(t)}))},q=Object(O.a)({reducer:{canvas:x.reducer}});r.a.render(Object(g.jsx)(i.a.StrictMode,{children:Object(g.jsx)(y.a,{store:q,children:Object(g.jsx)(X,{})})}),document.getElementById("root")),Y()}},[[38,1,2]]]);
//# sourceMappingURL=main.77a5af18.chunk.js.map