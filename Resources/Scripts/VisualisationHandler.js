(function(){
    var _createClass=function(){
        function defineProperties(target,props){
            for(var i=0;i<props.length;i++){
                var descriptor=props[i];
                descriptor.enumerable=descriptor.enumerable||false;
                descriptor.configurable=true;
                if('value'in descriptor)descriptor.writable=true;
                Object.defineProperty(target,descriptor.key,descriptor);
            }
        }
        return function(Constructor,protoProps,staticProps){
            if(protoProps)defineProperties(Constructor.prototype,protoProps);
            if(staticProps)defineProperties(Constructor,staticProps);
            return Constructor;
        }
    }();
    
    function _classCallCheck(instance,Constructor){
        if(!(instance instanceof Constructor)){
            throw new TypeError('Cannot call a class as a function');
        }
    }
    function makeTreeObj(input) {
        var semicolonCounter = 0;
        var scanner = true;
        var stack = [];
        var rootOfRoot = {
            name: null,
            parent: null,
            children: []
        };
        var regex = ',(); ';
        rootOfRoot.name = 'rootOfRoot';
        var node = rootOfRoot;
        var subNode;
    
        for (var i = input.length - 1; i >= 0; i--) {
            if (scanner == true) {
                var n = input.charAt(i);
                switch (n) {
                    case ')':
                        stack.push(node);
                        node = subNode;
                        break;
                    case '(':
                        node = stack.pop();
                        break;
                    case ',':
                        break;
                    case ';':
                        if (++semicolonCounter > 1) scanner = false;
                        break;
                    case ' ':
                        break;
                    case '\n':
                        break;
                    case '\t':
                        break;
                    default:
                        subNode = {
                            name: '',
                            parent: null,
                            children: []
                        };
                        subNode.name = n;
                        var j = i - 1;
                        while (regex.indexOf(input[j]) == -1 && j >= 0) {
                            subNode.name = input[j] + subNode.name;
                            j--;
                        }
                        i = j + 1;
                        subNode.parent = node;
                        if (!node.children) {
                            node.children = [];
                        }
                        node.children.push(subNode);
                        break;
                }
            } else {
                // Unhandled characters or invalid input, possibly logging or throwing an error.
            }
        }
    
        return rootOfRoot.children[0] || { name: 'missing data', children: [] };
    };

    
                
                var VisualisationArea=function(){
                    function VisualisationArea(areaName,areaElement,optionsCreationListener){
                        _classCallCheck(this,VisualisationArea);
                        this.areaName=areaName;
                        this.areaElement=areaElement;
                        this.optionsCreationListener=optionsCreationListener;
                        this.wasInVR=false;
                    }
                    _createClass(VisualisationArea,[{
                        key:'setVisualisation',
                        value:function setVisualisation(visualisationClass){
                            this.deleteVisualisation();
                            this.visualisationClass=visualisationClass;
                            var tree=VisualisationHandler.getTree();
                            if(tree){
                                this.options=new Options;
                                this.visualisation=new visualisationClass(this.areaElement,tree,this.options);
                                this.optionsCreationListener&&this.optionsCreationListener(this.options,this.visualisation);
                                    console.info('Visualisation \''+visualisationClass.description.name+'\' created');
                                }
                                return this;
                            }
                        },{
                            key:'deleteVisualisation',
                            value:function deleteVisualisation(){
                                if(this.visualisation){
                                    this.visualisation.destroy();
                                    this.visualisation=null;
                                }
                                return this;
                            }
                        },{
                            key:'refreshVisualisation',
                            value:function refreshVisualisation(){
                                this.visualisationClass&&this.setVisualisation(this.visualisationClass);
                                return this;
                            }
                        },{
                            key:'getVisualisation',
                            value:function getVisualisation(){
                                return this.visualisation;
                            }
                        },{
                            key:'syncSelectedNodes'
                            ,value:function syncSelectedNodes(){}
                        },{
                            key:'syncFocusedNodes'
                            ,value:function syncFocusedNodes(){}
                        }]);
                        return VisualisationArea;
                    }();;
                    
                    window.VisualisationHandler=new(function(){
                        function VisualisationHandler(){
                            _classCallCheck(this,VisualisationHandler);
                            this.visAreaCollection={};
                            this.visClassCollection={};
                            this.tree=null;
                            this.synchronisationData={selected:null,highlighted:null,focused:null};
                            this.selectedNodeListeners=[];
                            this.treeListeners=[]
                        }
                        _createClass(VisualisationHandler,[{
                            key:'createVisArea'
                            ,value:function createVisArea(areaName,areaElement,optionsCreationListener){
                                var visArea=new VisualisationArea(areaName,areaElement,optionsCreationListener);
                                this.visAreaCollection[areaName]=visArea;
                                return visArea;
                            }
                        },{
                            key:'getVisArea',
                            value:function getVisArea(areaName){
                                return this.visAreaCollection[areaName];
                            }
                        },{
                            key:'getExistingVisAreas'
                            ,value:function getExistingVisAreas(){
                                var existingVisAreas=[];
                                var names=Object.keys(this.visAreaCollection);
                                for(var i=0;i<names.length;i++){
                                    var visAreaName=names[i];
                                    existingVisAreas.push(this.visAreaCollection[visAreaName]);
                                };
                                return existingVisAreas;
                            }
                        },{
                            key:'getExistingVisualisations'
                            ,value:function getExistingVisualisations(){
                                var existingVisualisations=[];
                                var areas=this.getExistingVisAreas();
                                for(var i=0;i<areas.length;i++){
                                    var visArea=areas[i];
                                    visArea.visualisation&&existingVisualisations.push(visArea.visualisation);
                                }
                                return existingVisualisations;
                            }
                        },{
                            key:'setVisualisationForArea'
                            ,value:function setVisualisationForArea(areaName,visClassName){
                                var area=this.getVisArea(areaName)
                                ;var clas=this.getVisualisationClass(visClassName);
                                if(!area)console.log('Unknown area: '+areaName);
                                else if(!clas)console.log('Unknown visualisation: '+visClassName);
                                else area.setVisualisation(clas);
                                return this;
                            }
                        },{
                            key:'getTree',
                            value:function getTree(){
                                return this.tree;
                            }
                        },{
                            key:'setTree',
                            value:function setTree(tree){
                                this.tree=tree;
                                var fields=Object.keys(this.synchronisationData);
                                for(var i=0;i<fields.length;i++){
                                    this.synchronisationData[fields[i]]=null;
                                }
                                var areas=this.getExistingVisAreas();
                                for(var i=0;i<areas.length;i++){
                                    var visArea=areas[i];
                                    visArea.deleteVisualisation();
                                }
                                for(var i=0;i<areas.length;i++){
                                    var visArea=areas[i];
                                    visArea.refreshVisualisation();
                                }for(var i=0;i<this.treeListeners.length;i++){
                                    this.treeListeners[i].call(this,tree);
                                }
                                return this;
                            }
                        },{
                            key:'readBlob'
                            ,value:function readBlob(blob,callback){
                                var reader=new FileReader;
                                reader.readAsText(blob);
                                var This=this;reader.onload=function(){
                                    This.readText(reader.result);
                                    if(callback)callback();
                                };
                                return this;
                            }
                        },{
                            key:'readText'
                            ,value:function readText(text){
                                this.treeSourceText=text;
                                var obj=makeTreeObj(text);
                                this.setTree(new Tree(obj));
                            }
                        },{
                            key:'addTreeListener',
                            value:function addTreeListener(func){
                                var index=this.treeListeners.indexOf(func);
                                if(index==-1)this.treeListeners.push(func);
                                return this;
                            }
                        },{
                            key:'removeTreeListener',
                            value:function removeTreeListener(func)
                            {var index=this.treeListeners.indexOf(func);
                                if(index!=-1)this.treeListeners.splice(index,1);
                                return this;
                            }
                        },{
                            key:'registerVisualisation'
                            ,value:function registerVisualisation(aClass){
                                this.visClassCollection[aClass.getDescription().name.toLowerCase()]=aClass;
                                return this;
                            }
                        },{
                            key:'getVisualisationClass'
                            ,value:function getVisualisationClass(visClassName){
                                return this.visClassCollection[visClassName.toLowerCase()];
                            }
                        },{
                            key:'getVisualisationTypes',
                            value:function getVisualisationTypes(){
                                return Object.keys(this.visClassCollection);
                            }
                        },{
                            key:'synchronizeNode',value:function synchronizeNode(type,node,sourceViz){
                                this.synchronisationData[type]=node;
                                var visualisations=this.getExistingVisualisations();
                                for(var i=0;i<visualisations.length;i++){
                                    var vis=visualisations[i];
                                    if(vis!=sourceViz)vis.synchronizeNode(type,node,true);
                                }
                                if(type=='highlighted'||!this.synchronisationData.higlighted&&type=='focused'){
                                    var dataNode=this.synchronisationData.highlighted||this.synchronisationData.focused;
                                    for(var i=0;i<this.selectedNodeListeners.length;i++){
                                        var listener=this.selectedNodeListeners[i];
                                        listener.call(this,dataNode);
                                    }
                                }
                                return this;
                            }
                        },{
                            key:'getSynchronisationData',
                            value:function getSynchronisationData(){
                                return this.synchronisationData;
                            }
                        },{
                            key:'addSelectedNodeListener',
                            value:function addSelectedNodeListener(func){
                                var index=this.selectedNodeListeners.indexOf(func);
                                if(index==-1)this.selectedNodeListeners.push(func);return this;
                            }
                        },{
                            key:'removeSelectedNodeListener',
                            value:function removeSelectedNodeListener(func){
                                var index=this.selectedNodeListeners.indexOf(func);
                                if(index!=-1)this.selectedNodeListeners.splice(index,1);
                                return this;
                            }
                        }]);
                        return VisualisationHandler;
                    }());;
                })();