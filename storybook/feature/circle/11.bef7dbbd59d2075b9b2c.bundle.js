(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{1660:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);var taggedTemplateLiteral=__webpack_require__(1),taggedTemplateLiteral_default=__webpack_require__.n(taggedTemplateLiteral),styled_jsx_style=__webpack_require__(3),style_default=__webpack_require__.n(styled_jsx_style),react=__webpack_require__(0),react_default=__webpack_require__.n(react),react_hooks_esm=__webpack_require__(103),src=__webpack_require__(2),src_default=__webpack_require__.n(src),useResponsive=__webpack_require__(681),Spinner=__webpack_require__(1673),Dialog=__webpack_require__(125),Translate=__webpack_require__(106),toConsumableArray=__webpack_require__(424),toConsumableArray_default=__webpack_require__.n(toConsumableArray),es=__webpack_require__(1726),__jsx=react_default.a.createElement,InfiniteList_InfiniteList=function InfiniteList(_ref){var _window,data=_ref.data,loader=_ref.loader,loadMore=_ref.loadMore,renderer=_ref.renderer,totalCount=_ref.totalCount,_ref$defaultListHeigh=_ref.defaultListHeight,defaultListHeight=void 0===_ref$defaultListHeigh?10:_ref$defaultListHeigh,defaultListMaxHeight=_ref.defaultListMaxHeight,defaultRowHeight=_ref.defaultRowHeight,_ref$threshold=_ref.threshold,threshold=void 0===_ref$threshold?1:_ref$threshold,cache=new es.c({fixedWidth:!0,defaultHeight:defaultListHeight}),_useState=Object(react.useState)(defaultRowHeight?defaultRowHeight*data.length:defaultListHeight),listHeight=_useState[0],setListHeight=_useState[1],maxHeight=Object(react.useState)(defaultListMaxHeight||(null===(_window=window)||void 0===_window?void 0:_window.innerHeight)||defaultListHeight)[0],rowRenderer=function rowRenderer(_ref4){var index=_ref4.index,key=_ref4.key,parent=_ref4.parent,style=_ref4.style,datum=data[index],props={cache:cache,columnIndex:0,key:key,parent:parent,rowIndex:index};return __jsx(es.b,props,__jsx("div",{style:style},datum?renderer({index:index,datum:datum}):loader))},onRowsHaveRendered=function onRowsHaveRendered(){if(listHeight<maxHeight){var current=function calculate(){return toConsumableArray_default()(Array(data.length).keys()).reduce((function(sum,index){return sum+cache.getHeight(index,0)}),0)}();listHeight<current&&setListHeight(Math.min(maxHeight,current))}},count=(null==data?void 0:data.length)||0,rowCount=(totalCount||0)>count?count+1:count,listStyle={height:"".concat(Math.min(maxHeight,listHeight),"px")};return __jsx("div",{className:"infinite-list",style:listStyle},__jsx(es.d,{isRowLoaded:function isRowLoaded(_ref2){var index=_ref2.index;return!!data[index]},loadMoreRows:function loadMoreRows(_ref3){var startIndex=_ref3.startIndex;return loadMore((function(){return cache.clear(startIndex,0)}))},rowCount:totalCount,threshold:threshold},(function(_ref5){var _onRowsRendered=_ref5.onRowsRendered,registerChild=_ref5.registerChild;return __jsx(es.a,null,(function(_ref6){var width=_ref6.width,height=_ref6.height;return __jsx(es.e,{width:width,height:height,deferredMeasurementCache:cache,ref:registerChild,rowHeight:cache.rowHeight,rowRenderer:rowRenderer,rowCount:rowCount,onRowsRendered:function onRowsRendered(params){_onRowsRendered(params),onRowsHaveRendered()},overscanRowCount:0})}))})))};try{InfiniteList_InfiniteList.displayName="InfiniteList",InfiniteList_InfiniteList.__docgenInfo={description:"",displayName:"InfiniteList",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"T[]"}},loader:{defaultValue:null,description:"",name:"loader",required:!0,type:{name:"ReactNode"}},loadMore:{defaultValue:null,description:"",name:"loadMore",required:!0,type:{name:"(callback: () => void) => Promise<any>"}},renderer:{defaultValue:null,description:"",name:"renderer",required:!0,type:{name:"(props: RowRendererProps<T>) => ReactNode"}},totalCount:{defaultValue:null,description:"",name:"totalCount",required:!0,type:{name:"number"}},defaultListHeight:{defaultValue:{value:10},description:"",name:"defaultListHeight",required:!1,type:{name:"number"}},defaultListMaxHeight:{defaultValue:null,description:"",name:"defaultListMaxHeight",required:!1,type:{name:"number"}},defaultRowHeight:{defaultValue:null,description:"",name:"defaultRowHeight",required:!1,type:{name:"number"}},threshold:{defaultValue:{value:1},description:"",name:"threshold",required:!1,type:{name:"number"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Interaction/InfiniteList/index.tsx#InfiniteList"]={docgenInfo:InfiniteList_InfiniteList.__docgenInfo,name:"InfiniteList",path:"src/components/Interaction/InfiniteList/index.tsx#InfiniteList"})}catch(__react_docgen_typescript_loader_error){}var GQL_error=__webpack_require__(660),UserDigest=__webpack_require__(80),analytics=__webpack_require__(1670),defineProperty=__webpack_require__(6),defineProperty_default=__webpack_require__.n(defineProperty),objectWithoutProperties=__webpack_require__(41),objectWithoutProperties_default=__webpack_require__.n(objectWithoutProperties),get=__webpack_require__(158),get_default=__webpack_require__.n(get),set=__webpack_require__(1717),set_default=__webpack_require__.n(set),uniqBy=__webpack_require__(1718),uniqBy_default=__webpack_require__.n(uniqBy);function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){defineProperty_default()(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}var _defaultExport=[".container.jsx-1177686136{display:inline-block;padding-top:0.5rem;padding-left:1rem;line-height:inherit;text-align:left;}",".avatar-list.jsx-1177686136 .avatar{position:relative;border:1.5px solid #fff;}",".avatar-list.jsx-1177686136 .avatar+.avatar{margin-left:-0.5rem;}",".avatar-list.jsx-1177686136 .avatar:nth-child(1){z-index:5;}",".avatar-list.jsx-1177686136 .avatar:nth-child(2){z-index:4;}",".avatar-list.jsx-1177686136 .avatar:nth-child(3){z-index:3;}",".avatar-list.jsx-1177686136 .avatar:nth-child(4){z-index:2;}",".avatar-list.jsx-1177686136 .avatar:nth-child(5){z-index:1;}",".name-list.jsx-1177686136{margin-top:0.25rem;font-size:0.875rem;}",".name-list.jsx-1177686136 .highlight.jsx-1177686136{color:#0d6763;}",".dialog-appreciators-list.jsx-1177686136{padding:0.75rem 0;}",".dialog-appreciators-list.jsx-1177686136 .appreciation-amount.jsx-1177686136{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;box-sizing:content-box;min-width:1rem;height:1rem;margin-top:-2px;margin-right:-2px;font-size:0.75rem;font-weight:700;color:#fff;text-align:center;background:#0d6763;border:2px solid #fff;border-radius:1rem;}"];_defaultExport.__hash="1177686136";var styles=_defaultExport,Content_jsx=react_default.a.createElement;function _templateObject(){var data=taggedTemplateLiteral_default()(["\n  query ArticleAppreciators($mediaHash: String, $after: String) {\n    article(input: { mediaHash: $mediaHash }) {\n      id\n      appreciationsReceived(input: { first: 10, after: $after }) {\n        totalCount\n        pageInfo {\n          startCursor\n          endCursor\n          hasNextPage\n        }\n        edges {\n          cursor\n          node {\n            ... on Appreciation {\n              amount\n              sender {\n                ...UserDigestRichUserPublic\n                ...UserDigestRichUserPrivate\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n  ","\n  ","\n"]);return _templateObject=function _templateObject(){return data},data}var ARTICLE_APPRECIATORS=src_default()(_templateObject(),UserDigest.a.Rich.fragments.user.public,UserDigest.a.Rich.fragments.user.private);__webpack_exports__.default=function AppreciatorsDialogContent(_ref){var _data$article,_data$article2,mediaHash=_ref.mediaHash,closeDialog=_ref.closeDialog,isSmallUp=Object(useResponsive.a)("sm-up"),_useQuery=Object(react_hooks_esm.c)(ARTICLE_APPRECIATORS,{variables:{mediaHash:mediaHash}}),data=_useQuery.data,loading=_useQuery.loading,error=_useQuery.error,fetchMore=_useQuery.fetchMore,article=null==data?void 0:data.article,_ref2=(null==data||null===(_data$article=data.article)||void 0===_data$article?void 0:_data$article.appreciationsReceived)||{},edges=_ref2.edges,pageInfo=_ref2.pageInfo;if(loading)return Content_jsx(Spinner.a,null);if(error)return Content_jsx(GQL_error.a,{error:error});if(!edges||edges.length<=0||!pageInfo||!article)return null;var totalCount=(null==data||null===(_data$article2=data.article)||void 0===_data$article2?void 0:_data$article2.appreciationsReceived.totalCount)||0,defaultListMaxHeight=function calcContentMaxHeight(){if(window){return.01*window.innerHeight*90-16*(1.5+(isSmallUp?2.5:1.5)+1.5+1)}}();return Content_jsx(react_default.a.Fragment,null,Content_jsx(Dialog.a.Header,{title:Content_jsx(Translate.a,{zh_hant:"".concat(totalCount," 人讚賞了作品"),zh_hans:"".concat(totalCount," 人赞赏了作品")}),close:closeDialog,closeTextId:"close"}),Content_jsx(Dialog.a.Content,null,Content_jsx("div",{className:"jsx-".concat(styles.__hash)+" dialog-appreciators-list"},Content_jsx(InfiniteList_InfiniteList,{data:edges,defaultListMaxHeight:defaultListMaxHeight,defaultRowHeight:70,loader:Content_jsx(Spinner.a,null),loadMore:function loadMore(callback){return analytics.a.trackEvent("load_more",{type:"appreciators",location:edges.length}),fetchMore({variables:{after:pageInfo.endCursor},updateQuery:function updateQuery(previousResult,_ref4){var fetchMoreResult=_ref4.fetchMoreResult;return callback(),function mergeConnections(_ref){var oldData=_ref.oldData,newData=_ref.newData,path=_ref.path,_ref$dedupe=_ref.dedupe,dedupe=void 0!==_ref$dedupe&&_ref$dedupe;try{var _get2=get_default()(oldData,path),oldEdges=_get2.edges,oldPageInfo=_get2.pageInfo,rest=objectWithoutProperties_default()(_get2,["edges","pageInfo"]),_get3=get_default()(newData,path),newEdges=_get3.edges,newPageInfo=_get3.pageInfo,result=oldData;if(newPageInfo.endCursor!==oldPageInfo.endCursor){var copy=JSON.parse(JSON.stringify(result)),edges=dedupe?uniqBy_default()([].concat(toConsumableArray_default()(oldEdges),toConsumableArray_default()(newEdges)),(function(edge){return edge.node.id})):[].concat(toConsumableArray_default()(oldEdges),toConsumableArray_default()(newEdges));return set_default()(copy,path,_objectSpread(_objectSpread({},rest),{},{pageInfo:newPageInfo,edges:edges}))}return result}catch(err){return console.error("Cannot get edges from path, skipping",err),oldData}}({oldData:previousResult,newData:fetchMoreResult,path:"article.appreciationsReceived"})}})},renderer:function ListRow(_ref3){var index=_ref3.index,datum=_ref3.datum,node=datum.node,cursor=datum.cursor;return Content_jsx("div",{key:cursor,className:"jsx-".concat(styles.__hash)+" appreciator-item"},node.sender&&Content_jsx(UserDigest.a.Rich,{user:node.sender,avatarBadge:Content_jsx("span",{className:"jsx-".concat(styles.__hash)+" appreciation-amount"},node.amount),onClick:function onClick(){analytics.a.trackEvent("click_feed",{type:"appreciators",contentType:"user",styleType:"card",location:index})}}),Content_jsx(style_default.a,{id:styles.__hash},styles))},totalCount:totalCount})),Content_jsx(style_default.a,{id:styles.__hash},styles)))};try{Content.displayName="Content",Content.__docgenInfo={description:"",displayName:"Content",props:{mediaHash:{defaultValue:null,description:"",name:"mediaHash",required:!0,type:{name:"string"}},closeDialog:{defaultValue:null,description:"",name:"closeDialog",required:!0,type:{name:"() => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/Dialogs/AppreciatorsDialog/Content.tsx#Content"]={docgenInfo:Content.__docgenInfo,name:"Content",path:"src/components/Dialogs/AppreciatorsDialog/Content.tsx#Content"})}catch(__react_docgen_typescript_loader_error){}}}]);
//# sourceMappingURL=11.bef7dbbd59d2075b9b2c.bundle.js.map