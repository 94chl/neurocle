(this.webpackJsonpneurocle=this.webpackJsonpneurocle||[]).push([[0],{101:function(t,e,n){"use strict";n.r(e);var o=n(5),r=n.n(o),i=n(61),s=n.n(i),c=(n(91),n(32)),a=n.n(c),l=n(75),u=n.n(l),h=n(0),p=n(4),d=n(10),j=n(72),b=n.n(j),y=n(36),f=n(47),O=n(67),x=Object(O.b)({name:"canvas",initialState:{shapeType:"rect",strokeColor:"#000000",strokeWidth:5,fillColor:"#000000",fillColorTransparency:!0,shapes:[],layersHistory:[],layersNow:-1,layersHistoryLimit:40},reducers:{seShapeType:function(t,e){var n=e.payload;t.shapeType=n},setColor:function(t,e){var n=e.payload;t[n.target]=n.value},setFillColorTransparency:function(t){t.fillColorTransparency=!t.fillColorTransparency},setStrokeWidth:function(t,e){var n=e.payload;t.strokeWidth=n},setShapes:function(t,e){var n=e.payload;t.shapes=n},setLayersHitory:function(t,e){var n=e.payload;t.layersHistory=n},setLayersNow:function(t,e){var n=e.payload;t.layersNow=n}}}),v=function(t,e){var n=Object(o.useState)((function(){var n=JSON.parse(localStorage.getItem(t));return n||e})),r=Object(d.a)(n,2),i=r[0],s=r[1];return[i,function(e){var n="function"===typeof e?e(i):e;s(n),localStorage.setItem(t,JSON.stringify(n))}]},g=n(9),k=b.a.container,C=b.a.stage,w=function(){var t=Object(o.useState)({width:0,height:0}),e=Object(d.a)(t,2),n=e[0],r=e[1],i=Object(o.useRef)(null);Object(o.useEffect)((function(){i.current&&r({width:i.current.clientWidth,height:i.current.clientHeight});var t=function(){r({width:i.current.clientWidth,height:i.current.clientHeight})};return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]);var s=Object(f.b)(),c=Object(f.c)((function(t){return t.canvas})),l=c.shapes,u=c.shapeType,j=c.strokeColor,b=c.strokeWidth,O=c.fillColor,w=c.fillColorTransparency,_=c.layersHistory,m=c.layersNow,S=c.layersHistoryLimit,T=v("storedLayersHistory",[]),W=Object(d.a)(T,2),N=W[0],B=W[1],L=v("storedLayersNow",-1),H=Object(d.a)(L,2),I=H[0],A=H[1];Object(o.useEffect)((function(){N[I]<0&&A(N.length-1),!_.length&&N.length&&(s(x.actions.setLayersHitory(N)),s(x.actions.setLayersNow(I)),s(x.actions.setShapes(N[I]?N[I]:[])))}),[]);var M=Object(o.useState)([]),E=Object(d.a)(M,2),D=E[0],F=E[1],R=Object(o.useState)({type:u,x:0,y:0,width:0,height:0,points:[],strokeColor:j,strokeWidth:b,fillColor:O,fillColorTransparency:w}),J=Object(d.a)(R,2),z=J[0],P=J[1],G=Object(o.useRef)(!1),X=Object(o.useRef)(!1);Object(o.useEffect)((function(){X.current=!!["spline","polygon"].includes(u)}),[u]);var Y=function(t){F([].concat(Object(p.a)(D),[t.pageX,t.pageY])),G.current=!0},q=function(){P({type:u,x:0,y:0,width:0,height:0,points:[],strokeColor:j,strokeWidth:b,fillColor:O,fillColorTransparency:w}),F([]),G.current=!G.current},K=function(t){if(!t||X.current){var e=Object(p.a)(l),n=m<S-1?_.filter((function(t,e){return e<=m})):_.filter((function(t,e){return _.length-S+1<=e&&e<S}));if(t&&X.current){var o=Object(h.a)(Object(h.a)({},z),{},{points:D.slice(0,D.length-2)});e.push(o)}else e.push(z);s(x.actions.setShapes(e)),n.push(e),B(n),s(x.actions.setLayersHitory(n));var r=m+1<S-1?m+1:S-1;A(r),s(x.actions.setLayersNow(r)),q()}else q()};return Object(g.jsx)("div",{className:a()(k),ref:i,onMouseDown:function(t){return 0===t.button&&!X.current&&Y(t)},onMouseUp:function(){return!X.current&&K(!1)},onClick:function(t){return X.current&&Y(t)},onMouseMove:function(t){return G.current&&function(t){F([].concat(Object(p.a)(D.slice(0,D.length>2?D.length-2:2)),[t.pageX,t.pageY]));var e=D[0]-D[D.length-2],n=D[1]-D[D.length-1],o=e<0?D[0]:D[D.length-2],r=n<0?D[1]:D[D.length-1],i={type:u,x:"ellipse"===u?o+Math.abs(e)/2:o,y:"ellipse"===u?r+Math.abs(n)/2:r,width:Math.abs(e),height:Math.abs(n),points:Object(p.a)(D),strokeColor:j,strokeWidth:b,fillColor:O,fillColorTransparency:w};P(i)}(t)},onDoubleClick:function(){return X.current&&K(!1)},onKeyDown:function(t){return"Escape"===t.key&&K(!0)},tabIndex:"0",children:Object(g.jsx)(y.e,{className:a()(C),width:n.width,height:n.height,children:Object(g.jsxs)(y.b,{children:[l&&l.map((function(t,e){return"line"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(y.c,{stroke:t.strokeColor,strokeWidth:t.strokeWidth,points:t.points},"".concat(t.type,"-").concat(e)):"spline"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(y.c,{stroke:t.strokeColor,strokeWidth:t.strokeWidth,points:t.points,tension:.5},"".concat(t.type,"-").concat(e)):"ellipse"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(y.a,{fill:t.fillColorTransparency?"transparent":t.fillColor,stroke:t.strokeColor,strokeWidth:t.strokeWidth,x:t.x,y:t.y,width:t.width,height:t.height},"".concat(t.type,"-").concat(e)):"rect"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(y.d,{fill:t.fillColorTransparency?"transparent":t.fillColor,stroke:t.strokeColor,strokeWidth:t.strokeWidth,x:t.x,y:t.y,width:t.width,height:t.height},"".concat(t.type,"-").concat(e)):"polygon"===(null===t||void 0===t?void 0:t.type)?Object(g.jsx)(y.c,{fill:t.fillColorTransparency?"transparent":t.fillColor,stroke:t.strokeColor,strokeWidth:t.strokeWidth,points:t.points,closed:!0},"".concat(t.type,"-").concat(e)):void 0})),"line"===u&&Object(g.jsx)(y.c,{stroke:j,strokeWidth:b,points:z.points}),"spline"===u&&Object(g.jsx)(y.c,{stroke:j,strokeWidth:b,points:D,tension:.5}),"ellipse"===u&&Object(g.jsx)(y.a,{fill:w?"transparent":O,stroke:j,strokeWidth:b,x:z.x,y:z.y,width:z.width,height:z.height}),"rect"===u&&Object(g.jsx)(y.d,{fill:w?"transparent":O,stroke:j,strokeWidth:b,x:z.x,y:z.y,width:z.width,height:z.height}),"polygon"===u&&Object(g.jsx)(y.c,{fill:w?"transparent":O,stroke:j,strokeWidth:b,points:D,closed:!0})]})})})},_=n(56),m=n.n(_),S=m.a.container,T=m.a.shapeButtonBox,W=m.a.customInputBox,N=m.a.controlButtonBox,B=m.a.guideBox,L=function(){var t=Object(f.b)(),e=Object(f.c)((function(t){return t.canvas})),n=e.shapes,o=e.shapeType,r=e.strokeColor,i=e.strokeWidth,s=e.fillColor,c=e.fillColorTransparency,l=e.layersHistory,u=e.layersNow,h=e.layersHistoryLimit,p=v("storedLayersHistory",[]),j=Object(d.a)(p,2),b=(j[0],j[1]),y=v("storedLayersNow",-1),O=Object(d.a)(y,2),k=(O[0],O[1]),C=function(e){t(x.actions.seShapeType(e))},w=function(e,n){t(x.actions.setColor({target:n,value:e.target.value}))};return Object(g.jsxs)("div",{className:a()(S),children:[Object(g.jsx)(F,{onClick:function(){try{throw new Error("Sentry Test Error")}catch(t){console.error(t)}},children:"\uc5d0\ub7ec\ubc1c\uc0dd"}),Object(g.jsxs)("div",{className:a()(T),children:[Object(g.jsx)("h3",{children:"\ub4dc\ub85c\uc789 \ud0c0\uc785"}),Object(g.jsxs)("div",{children:[Object(g.jsx)(F,{onClick:function(){return C("line")},isActive:"line"===o,children:"\uc9c1\uc120"}),Object(g.jsx)(F,{onClick:function(){return C("spline")},isActive:"spline"===o,children:"\uace1\uc120"}),Object(g.jsx)(F,{onClick:function(){return C("ellipse")},isActive:"ellipse"===o,children:"\uc6d0"}),Object(g.jsx)(F,{onClick:function(){return C("rect")},isActive:"rect"===o,children:"\uc9c1\uc0ac\uac01\ud615"}),Object(g.jsx)(F,{onClick:function(){return C("polygon")},isActive:"polygon"===o,children:"\ub2e4\uac01\ud615"})]})]}),Object(g.jsxs)("div",{className:a()(W),children:[Object(g.jsx)("h3",{children:"\ub4dc\ub85c\uc789 \uc635\uc158"}),Object(g.jsxs)("div",{children:[Object(g.jsx)(z,{inputId:"strokeColor",onChange:function(t){return w(t,"strokeColor")},value:r,inputOption:{type:"color"},children:"\ud14c\ub450\ub9ac \uc0c9\uc0c1"}),Object(g.jsx)(z,{inputId:"strokeWidth",onChange:function(e){return function(e){var n=parseInt(e.target.value);t(x.actions.setStrokeWidth(n>50?50:n<5?5:n))}(e)},value:i,inputOption:{type:"number",min:5,max:50},children:"\ud14c\ub450\ub9ac \ub450\uaed8"}),Object(g.jsx)(z,{inputId:"fillColor",onChange:function(t){return w(t,"fillColor")},value:s,inputOption:{type:"color"},children:"\ucc44\uc6b0\uae30 \uc0c9\uc0c1"}),Object(g.jsx)(z,{inputId:"fillColorTransparency",onChange:function(){t(x.actions.setFillColorTransparency())},value:0,inputOption:{type:"checkbox",checked:c},children:"\ucc44\uc6b0\uae30 \uc5c6\uc74c"})]})]}),Object(g.jsxs)("div",{className:a()(N),children:[Object(g.jsx)("h3",{children:"\ud3b8\uc9d1"}),Object(g.jsxs)("div",{children:[Object(g.jsx)(F,{onClick:function(){var e=u>=0?u>l.length-1?l.length-1:u-1:-1;k(e),t(x.actions.setLayersNow(e)),t(x.actions.setShapes(e>-1?l[e]:[]))},isActive:!1,isDisable:u<0,children:"undo"}),Object(g.jsx)(F,{onClick:function(){var e=u<l.length-1?u+1:l.length-1;k(e),t(x.actions.setLayersNow(e)),t(x.actions.setShapes(e>-1?l[e]:[]))},isActive:!1,isDisable:u>=l.length-1,children:"redo"}),Object(g.jsx)(F,{onClick:function(){return n.length&&function(){var e=l.filter((function(t,e){return e<=u}));e.push([]),t(x.actions.setShapes([])),t(x.actions.setLayersHitory(e)),b(e);var n=u+1<h-1?u+1:h-1;t(x.actions.setLayersNow(n)),k(n)}()},isActive:!1,isDisable:!n.length,children:"clear"}),Object(g.jsx)(F,{onClick:function(){window.confirm("\ucd08\uae30\ud654 \ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?")&&(t(x.actions.setShapes([])),t(x.actions.setLayersHitory([])),b([]),t(x.actions.setLayersNow(-1)),k(-1))},isActive:!1,children:"reset"})]})]}),Object(g.jsxs)("div",{className:a()(B),children:[Object(g.jsx)("h3",{children:"\uc0ac\uc6a9 \uc815\ubcf4"}),Object(g.jsxs)("ul",{children:[Object(g.jsxs)("li",{children:[Object(g.jsx)("span",{children:"esc:"}),Object(g.jsx)("span",{children:"\uc9c4\ud589 \uc911\uc778 \uc791\uc5c5 \ucde8\uc18c"})]}),Object(g.jsxs)("li",{children:[Object(g.jsx)("span",{children:"\ub354\ube14\ud074\ub9ad:"}),Object(g.jsx)("span",{children:"\uc9c4\ud589 \uc911\uc778 \uc791\uc5c5(\uace1\uc120, \ub2e4\uac01\ud615)\uc744 \ud574\ub2f9 \uc704\uce58\uc5d0\uc11c \uc644\ub8cc"})]})]})]})]})},H=n(13),I=n(69),A=n.n(I),M=A.a.button,E=A.a.active,D=A.a.disable,F=function(t){var e,n=t.onClick,o=t.isActive,r=t.isDisable,i=t.style,s=t.children;return Object(g.jsx)("button",{onClick:n,className:a()(M,(e={},Object(H.a)(e,E,o),Object(H.a)(e,D,r),e)),disabled:r,style:i,children:s})},R=n(78),J=n.n(R).a.container,z=function(t){var e=t.style,n=t.inputOption,o=t.inputId,r=t.onChange,i=t.value,s=t.children;return Object(g.jsxs)("div",{className:a()(J),style:e,children:[Object(g.jsx)("label",{htmlFor:o,children:s}),Object(g.jsx)("input",Object(h.a)({id:o,onChange:r,value:i},n))]})},P=u.a.container;var G=function(){return Object(g.jsxs)("div",{className:a()(P),children:[Object(g.jsx)(w,{}),Object(g.jsx)(L,{})]})},X=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,118)).then((function(e){var n=e.getCLS,o=e.getFID,r=e.getFCP,i=e.getLCP,s=e.getTTFB;n(t),o(t),r(t),i(t),s(t)}))},Y=Object(O.a)({reducer:{canvas:x.reducer}}),q=n(113),K=n(114),Q=n(115);q.a({dsn:"https://2b40a7e129417643627963bd11e55402@o4507158840999936.ingest.us.sentry.io/4507158845325312",integrations:[K.a(),Q.a()],tracesSampleRate:1,tracePropagationTargets:["localhost",/^https:\/\/yourserver\.io\/api/],replaysSessionSampleRate:.1,replaysOnErrorSampleRate:1}),s.a.render(Object(g.jsx)(r.a.StrictMode,{children:Object(g.jsx)(f.a,{store:Y,children:Object(g.jsx)(G,{})})}),document.getElementById("root")),X()},56:function(t,e,n){t.exports={container:"Tool_container__1Szw6",shapeButtonBox:"Tool_shapeButtonBox__3ZrH2",customInputBox:"Tool_customInputBox__5O10G",controlButtonBox:"Tool_controlButtonBox__1dCPk",guideBox:"Tool_guideBox__1njCz"}},69:function(t,e,n){t.exports={button:"Button_button__17x3e",active:"Button_active__15qMB",disable:"Button_disable__M3pI4"}},72:function(t,e,n){t.exports={container:"Canvas_container__1Vfbb",stage:"Canvas_stage__35f8o"}},75:function(t,e,n){t.exports={container:"App_container__eSJ6i"}},78:function(t,e,n){t.exports={container:"CustomInput_container__1QDtG"}},91:function(t,e,n){}},[[101,1,2]]]);
//# sourceMappingURL=main.3c5cb24c.chunk.js.map