(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7473e5bd"],{"404fa":function(e,t,o){"use strict";o.r(t);var n=o("7a23"),a={class:"goods"};function l(e,t,o,l,r,i){var c=Object(n["resolveComponent"])("page-search"),p=Object(n["resolveComponent"])("el-button"),s=Object(n["resolveComponent"])("el-image"),d=Object(n["resolveComponent"])("page-content");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",a,[Object(n["createVNode"])(c,{searchFormConfig:e.searchFormConfig},null,8,["searchFormConfig"]),Object(n["createVNode"])(d,{contentTableConfig:e.contentTableConfig,pageName:"goods"},{oldPrice:Object(n["withCtx"])((function(e){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])("￥"+e.row.oldPrice),1)]})),status:Object(n["withCtx"])((function(e){return[Object(n["createVNode"])(p,{size:"mini",plain:"",type:e.row.status?"success":"danger"},{default:Object(n["withCtx"])((function(){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])(e.row.status?"上架":"下架"),1)]})),_:2},1032,["type"])]})),image:Object(n["withCtx"])((function(e){return[Object(n["createVNode"])(s,{style:{width:"60px",height:"60px"},src:e.row.imgUrl,"preview-src-list":[e.row.imgUrl]},null,8,["src","preview-src-list"])]})),_:1},8,["contentTableConfig"])])}var r=o("fe8c"),i=o("3573"),c={formItems:[{field:"name",type:"input",label:"角色名称",placeholder:"请输入角色名称~"},{field:"intro",type:"input",label:"权限",placeholder:"请输入权限名称~"},{field:"createAt",type:"date",label:"创建时间",otherOptions:{startPlaceholder:"开始时间",endPlaceholder:"结束时间",type:"daterange"}}],labelWidth:"90px",itemStyle:{padding:"10px 40px"},colLayout:{xl:6,lg:8,md:12,sm:24,xs:24}},p={title:"商品列表",propList:[{prop:"name",label:"商品名称",minWidth:"100"},{prop:"oldPrice",label:"原价",minWidth:"80",slotName:"oldPrice"},{prop:"newPrice",label:"现价",minWidth:"80"},{prop:"status",label:"状态",minWidth:"80",slotName:"status"},{prop:"imgUrl",label:"图片",minWidth:"100",slotName:"image"},{prop:"inventoryCount",label:"库存",minWidth:"80"},{prop:"createAt",label:"创建时间",minWidth:"200",slotName:"createAt"},{prop:"updateAt",label:"更新时间",minWidth:"200",slotName:"updateAt"},{label:"操作",minWidth:"130",slotName:"handle"}],showIndexColum:!0,showSelectColum:!0},s=Object(n["defineComponent"])({name:"goods",components:{pageSearch:r["a"],pageContent:i["a"]},setup:function(){return{searchFormConfig:c,contentTableConfig:p}}}),d=o("6b0d"),m=o.n(d);const b=m()(s,[["render",l]]);t["default"]=b}}]);
//# sourceMappingURL=chunk-7473e5bd.79081d87.js.map