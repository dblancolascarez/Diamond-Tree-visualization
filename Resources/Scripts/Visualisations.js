(function(){
    var _createClass=function(){
        function defineProperties(target,props){
            for(var i=0;i<props.length;i++){
                var descriptor=props[i];
                descriptor.enumerable=descriptor.enumerable||false;
                descriptor.configurable=true;
                if("value"in descriptor)descriptor.writable=true;
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
            throw new TypeError("Cannot call a class as a function");
        }
    }
    
    function _possibleConstructorReturn(self,call){
        if(!self){
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
        }
        return call&&(typeof call==="object"||typeof call==="function")?call:self;
    }
    
    function _inherits(subClass,superClass){
        if(typeof superClass!=="function"&&superClass!==null){
            throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);
        }
        subClass.prototype=Object.create(superClass&&superClass.prototype,{
            constructor:{
                value:subClass,
                enumerable:false,
                writable:true,
                configurable:true
            }
        });

        if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;
    }
    
    (function(){
        var radius=0.1;
        var colors={
            branch:13789470,
            labelBG:13789470,
            labelBorder:5974793,
            leaf:65280,
            leafHighlighted:8978312,
            leafCollapsed:5635925
        };
        
        var NodeShape=function(_VIZ3D$NodeShape){
            _inherits(NodeShape,_VIZ3D$NodeShape);
            function NodeShape(gfx,node,scale){
                _classCallCheck(this,NodeShape);
                
                if(!scale)scale=1;
                var _this=_possibleConstructorReturn(this,(NodeShape.__proto__||Object.getPrototypeOf(NodeShape)).call(this,gfx,node,function(){
                    this.scale=scale;
                    this.leafColor=VIZ3D.Color.fromInt(colors.leaf)
                        .setValue(0.3+node.getDepth()/gfx.getTree().getHeight()*0.7)
                        .getInt();
                    this.sphere=new VIZ3D.Sphere(gfx,radius,this.leafColor);
                    this.branch=new VIZ3D.Line(gfx,null,null,0.03,colors.branch);
                    this.branch.storeInSpatialTree=true
                }));
                
                _this.setScale(_this.scale);
                _this.addShape(_this.sphere);
                _this.addShape(_this.branch);
                _this.onMousePress(function(down,data){
                    if(!down&&this.graphics.dragging<10&&(!data||data.button==0)){
                        this.focus();
                        this.graphics.dragging=false;return true
                    }
                });
                
                var This=_this;
                _this.dragDist=0;
                _this.sphere.onHover(function(over){
                    if(over)This.highlight();
                    else This.dehighlight()
                }).onMousePress(function(down,event){
                    if(down&&event&&event.button==2){
                        var focusedShape=this.graphics.getShape("focused");
                        if(focusedShape){
                            var shapes=focusedShape.getAncestors();
                            if(shapes.indexOf(This)!=-1||focusedShape==This)return
                        }
                        This.dragDist=this.graphics.getCamera().translateWorldToScreenLoc(This.getLoc()).getZ();
                        this.graphics.dragShape(This);
                        return true;
                    }});return _this
                }
                
                _createClass(NodeShape,[{
                    key:"getRadius",
                    value:function getRadius(){
                        return this.scale*radius
                    }
                }, {
                    key:"__onDrag",
                    value:function __onDrag(loc,pointer){
                        if(pointer=="mouse"){
                            var mouseLoc=this.graphics.getMouseScreenLoc();
                            var loc=this.graphics.getCamera().translateScreenToWorldLoc(mouseLoc.getX(),mouseLoc.getY(),this.dragDist
                            );
                            this.setLoc(loc).updateTransform();
                        }
                        
                        else{
                            this.setLoc(loc).updateTransform();
                        }
                        if(this.getParent())this.relativeLoc=new VIZ3D.Vec(this.getLoc()).sub(this.getParent().getLoc());
                        var children=this.getChildren();
                        for(var i=0;i<children.length;i++){
                            children[i].updateLoc();
                        }
                    }
                }, {
                    key:"__createChildNodeShape",
                    value:function __createChildNodeShape(node,parent){
                        var parentDescCount=node.getParent()&&node.getParent().getSubtreeNodeCount()||node.getSubtreeNodeCount();
                        var descPer=node.getSubtreeNodeCount()/parentDescCount;
                        var scale=parent.scale/1.6/(1-Math.log(descPer)/Math.log(30));
                        return new(this.__getClass())(this.getGraphics(),node,scale);
                    }
                }, {
                    key:"__connectParent",value:function __connectParent(parent){parent=parent||this.getParent();
                        var length=this.graphics.branchLength.getValue()/100;
                        var pitch=this.graphics.branchAngle.getValue()/180*Math.PI;
                        if(parent){
                            var nodeCount=parent.getNode().getChildren().length;
                            this.setLoc(parent.getLoc());
                            var f=this.scale;
                            var vec=new VIZ3D.Vec().setLength(length*f*Math.sqrt(1+nodeCount/40));
                            vec.setYaw(Math.PI*2*(this.getIndex()+0.5)/nodeCount+parent.getRot().getY()).setPitch(pitch).add(0,length*0.2*f*Math.sqrt(nodeCount/60),0);
                            vec.setLength(vec.getLength()*(1+1*this.getIndex()/nodeCount));
                            if(nodeCount==1)vec.setX(0).setZ(0);
                            vec.addLength(parent.getRadius());
                            this.getRot().setY(vec.getRot().getY());
                            this.getLoc().add(vec);this.relativeLoc=vec;
                            this.branch.setEndPoint(parent.getLoc()).updateTransform();
                            var This=this;
                            parent.getLoc().onChange(function(){
                                This.branch.setEndPoint(parent.getLoc());
                            })
                        } else{
                            this.branch.setEndPoint(new VIZ3D.XYZ(0,-length,0));
                            this.relativeLoc=new VIZ3D.Vec(0,0,0);
                        } 
                        this.version=this.graphics.version;
                    }
                },{
                    key:"updateLoc",
                    value:function updateLoc(parent){
                        if(this.getParent())this.setLoc(this.getParent().getLoc());
                        else this.setLoc(0,0,0);
                        this.getLoc().add(this.relativeLoc);
                        this.updateTransform();this.branch.updateTransform();
                        this.branch.getEndPoint();
                        var children=this.getChildren();
                        for(var i=0;i<children.length;i++){
                            children[i].updateLoc();
                        }
                    }
                },{
                    key:"__show",
                    value:function __show(){
                        if(this.version!=this.graphics.version){
                            var parent=this.node.getParent();
                            this.__connectParent(parent&&parent.getShape(this.graphics.getUID()));
                        }
                        this.updateLoc();
                    }
                },{
                    key:"__stateChanged",
                    value:function __stateChanged(field,val,oldState){
                        if(field=="focused"&&val==true){
                            this.getGraphics().getCamera().setTargetLoc(this).setTargetScale(this);
                            this.showFamily(Infinity,this.graphics.layers)
                        }
                        this.sphere.setColor(this.state.highlighted?colors.leafHighlighted:this.state.expanded?this.leafColor:colors.leafCollapsed);
                        if(field=="highlighted"){
                            if(!this.label)this.createLabel();
                            if(val==true)this.addShape(this.label);
                            else this.removeShape(this.label);
                        }
                    }
                },{
                    key:"createLabel",
                    value:function createLabel(){
                        var bg=colors.labelBG.toString(16);
                        var border=colors.labelBorder.toString(16);
                        this.label=new VIZ3D.HtmlShape(this.graphics,"<span style='"+
                        "background-color: #"+bg+";"+
                        "padding: 5px;"+
                        "display: inline-block;"+
                        "border: 2px solid #"+border+";"+
                        "border-radius: 10px;"+"'>"+
                        this.getNode().getName()+"</span>");
                        this.label.getVRoffset().add(0,this.sphere.getRadius()*2,0);
                        this.label.setVRhitboxEnabled(false);
                    }
                }]);
                
                return NodeShape;
            }(VIZ3D.NodeShape);
            var Tree=function(_VIZ3D$Visualisation){
                _inherits(Tree,_VIZ3D$Visualisation);
                function Tree(container,tree,options){
                    _classCallCheck(this,Tree);
                    var _this2=_possibleConstructorReturn(this,(Tree.__proto__||Object.getPrototypeOf(Tree)).call(this,container,tree,options));
                    var This=_this2;
                    var camera=_this2.getCamera();
                    camera.setDistance(1.2);
                    var autoRotate=true;
                    _this2.onUpdate(function(){
                        if(autoRotate&&options.getValue("Auto rotation"))camera.getRot().add(0,options.getValue("Rotation speed")/30,0)});
                        This.dragging=false;
                        _this2.onMousePress(function(down,event){if(event&&event.button==0)This.dragging=down?1:false});
                        This.oldMousePos={x:0,y:0};_this2.onMouseMove(function(pos){
                            if(This.dragging){This.dragging++;var dx=pos.x-This.oldMousePos.x;
                                var dy=pos.y-This.oldMousePos.y;camera.getRot().add(-dy/100,-dx/100,0);
                            }
                            This.oldMousePos.x=pos.x;This.oldMousePos.y=pos.y;autoRotate=pos.x<0||pos.y<0||pos.x>this.getWidth()||pos.y>this.getHeight()});
                            var distObj=$({dist:camera.getDistance()});
                            var targetDist=camera.getDistance();
                            _this2.onMouseScroll(function(scroll,event){
                                if(event){targetDist-=scroll/1000;
                                targetDist=Math.max(targetDist,0.2);
                                distObj.stop(true).animate({dist:targetDist},{easing:"linear",duration:200,step:function step(val){camera.setDistance(val)}});
                            }
                        });
                        
                        var lights=[];
                        for(var i=0;i<6;i++){
                            var light=new VIZ3D.PointLight(_this2,16777215,0.1,500).setLoc(Math.random()-0.5,Math.random()*0.5,Math.random()-0.5).add();
                            light.getVelo().set((Math.random()-0.5)*0.5,(Math.random()-0.5)*0.5,(Math.random()-0.5)*0.5);
                            light.__registerUpdateListener();
                            lights.push(light);
                        }
                        
                        _this2.onUpdate(function(){
                            for(var i=0;i<lights.length;i++){
                                var light=lights[i];
                                if(light.getX()>0.5)light.getVelo().add(-0.005,0,0);
                                if(light.getX()<-0.5)light.getVelo().add(0.005,0,0);
                                if(light.getY()>0.5)light.getVelo().add(0,-0.005,0);
                                if(light.getY()<-0)light.getVelo().add(0,0.005,0);
                                if(light.getZ()>0.5)light.getVelo().add(0,0,-0.005);
                                if(light.getZ()<-0.5)light.getVelo().add(0,0,0.005)
                            }
                        });
                            
                        new VIZ3D.PointLight(_this2,16777215,0.6,500).setLoc(0.5,3,0).add();                            var focused=VisualisationHandler.getSynchronisationData().focused||_this2.getShapesRoot()[0].getNode();
                        _this2.synchronizeNode("focused",focused);
                        return _this2
                    }
                    
                    _createClass(Tree,[{
                        key:"__getNodeShapeClass",
                        value:function __getNodeShapeClass(){
                            return NodeShape;
                        }
                    },{
                        key:"__setupOptions",
                        value:function __setupOptions(options){
                            var This=this;this.version=0;
                            var refocus=function refocus(){
                                var focused=This.getShape("focused");
                                if(focused){
                                    focused.__show();
                                    This.setShapeState("focused",focused);
                                }
                            };
                            
                            options.add(new Options.Button("parent").setIcon("arrow-up").setDescription("Go to the parent of the current node").onClick(function(){
                                var current=This.getShape("focused");
                                var parent=current.getNode().getParent();
                                if(parent)This.synchronizeNode("focused",parent);
                            }));
                            
                            options.add(new Options.Boolean("Auto rotation").setDescription("Whether or not to auto rotate the visualisation when not focused").setValue(true));options.add(new Options.Number("Rotation speed").setDescription("The rotation speed when the mouse is not in the window").setValue(0.5));
                            options.add(new Options.Number("Maximum node count",1,50,20000).setDescription("The maximum number of nodes to show at once").onChange(function(val){
                                This.maxNodeCount=val;
                                refocus();
                            }).setValue(200));
                            options.add(new Options.Number("Layer count",1,1,20).setDescription("The number of descendant layers to show of the focused node").onChange(function(val){
                                This.layers=val;
                                refocus();
                            }).setValue(4));
                            this.branchLength=new Options.Number("Branch length",1,1,100).setDescription("The length o the branch lengths in the visualization").onChange(function(val){
                                This.version+=1;refocus();
                            }).setValue(30);
                            options.add(this.branchLength);
                            this.branchAngle=new Options.Number("Branch angle",1,-90,90).setDescription("The upwards angle that a branch has").onChange(function(val){
                                This.version+=1;
                                refocus();
                            }).setValue(18);
                            options.add(this.branchAngle);
                            window.options=options;
                        }
                    },{
                        key:"__setupRoot",value:function __setupRoot(){
                            var node=this.tree.getRoot();
                            var clas=this.__getNodeShapeClass(Visualisation2d.classes,node);
                            var shape=new clas(this,node,1,true);
                            return shape.add();
                        }
                    }]);
                    
                    return Tree;
                }(VIZ3D.Visualisation);
                
                Math.seed=function(s){
                    return function(){
                        s=Math.sin(s)*10000;
                        return s-Math.floor(s)}};
                    })(); (function(){
                        var defaultRadius=100;
                        var gap=100;
                        var decrease=0.7;
                        var colors=[1513432,16711680,6464000,16700042,8990258,569503,14024959];
                        var NodeShape=function(_VIZ2D$NodeShape){
                            _inherits(NodeShape,_VIZ2D$NodeShape);
                            function NodeShape(gfx,node){
                                _classCallCheck(this,NodeShape);
                                var _this3=_possibleConstructorReturn(this,(NodeShape.__proto__||Object.getPrototypeOf(NodeShape)).call(this,gfx,node,function(){}));
                                _this3.polygon=new VIZ2D.Polygon(gfx,_this3.points,colors[(_this3.getDepth()-1)%colors.length]);
                                _this3.addShape(_this3.polygon);
                                _this3.onClick(function(data){
                                    this.focus();
                                });
                                
                                _this3.label=new VIZ2D.HtmlShape(gfx,node.getName());
                                _this3.onHover(function(over){
                                    if(over){
                                        this.highlight();
                                    } else{
                                        this.dehighlight();
                                    }
                                });
                                
                                return _this3
                            }
                            
                            _createClass(NodeShape,[{
                                key:"__stateChanged",
                                value:function __stateChanged(field,val,oldState){
                                    if(field=="highlighted"){
                                        if(val){
                                            this.addShape(this.label);
                                        }else{
                                            this.removeShape(this.label);
                                        }
                                    }
                                    if(field=="focused"){
                                        if(val){
                                            var camera=this.getVisualisation().getCamera();
                                            camera.setTargetLoc(this);
                                            camera.setTargetRot(0,0,this.angle+Math.PI/2);
                                            camera.setTargetScale(2/this.scale);
                                            this.showFamily(Infinity,this.getVisualisation().layers);
                                            if(!this.getParent()){
                                                var children=this.getNode().getChildren();
                                                if(children.length==2){
                                                    camera.setTargetRot(0,0,this.angle+Math.PI/6);
                                                }
                                                else if(children.length==1){
                                                    camera.setTargetRot(0,0,this.angle+11*Math.PI/6);
                                                }
                                            }
                                        }
                                    }
                                }
                            },{
                                key:"__connectParent",
                                value:function __connectParent(parent){
                                    if(parent){
                                        this.scale=Math.pow(decrease,this.getNode().getDepth());
                                        this.radiusA=parent.radiusA+gap*this.scale;
                                        this.sector=parent.childSector;
                                        var children=this.getNode().getChildren();
                                        this.childSector=this.sector/children.length;
                                        this.angle=parent.angle+this.sector*(this.getIndex()+0.5)-0.5*parent.sector;
                                        this.setLoc(Math.cos(this.angle)*this.radiusA,Math.sin(this.angle)*this.radiusA);
                                        var scale=Math.pow(decrease,this.getDepth()+1);
                                        var radiusA=this.radiusA+gap*scale;var lower=this.angle-this.sector/2;
                                        var upper=this.angle+this.sector/2;
                                        var xUpper=Math.cos(upper)*radiusA-this.getX();
                                        var yUpper=Math.sin(upper)*radiusA-this.getY();
                                        var xLower=Math.cos(lower)*radiusA-this.getX();
                                        var yLower=Math.sin(lower)*radiusA-this.getY();
                                        this.points=[0,0,xLower,yLower];
                                        for(var i=0;i<children.length;i++){
                                            var sector=this.childSector;
                                            var angle=this.angle+sector*(i+0.5)-0.5*this.sector;
                                            var x=Math.cos(angle)*radiusA-this.getX();
                                            var y=Math.sin(angle)*radiusA-this.getY();
                                            this.points.push(x,y);
                                        }
                                        this.points.push(xUpper,yUpper);
                                        }
                                        else{
                                            var children=this.getNode().getChildren();
                                            this.scale=1;
                                            this.radiusA=defaultRadius;
                                            this.sector=2*Math.PI;
                                            this.childSector=2*Math.PI/Math.max(3,children.length);
                                            if(children.length>2){
                                                this.angle=0;
                                            }
                                            else if(children.length==2){
                                                this.angle=11*Math.PI/6;
                                            }
                                            else{
                                                this.angle=Math.PI/6;
                                            }
                                            this.points=[];
                                            for(var i=0;i<Math.max(3,children.length);i++){
                                                var scale=Math.pow(decrease,this.getDepth()+1);
                                                var radiusA=this.radiusA+gap*scale;
                                                var sector=this.childSector;
                                                var angle=this.angle+sector*(i+0.5)-0.5*this.sector;
                                                var x=Math.cos(angle)*radiusA-this.getX();
                                                var y=Math.sin(angle)*radiusA-this.getY();
                                                this.points.push(x,y);
                                            }
                                        }
                                    }
                                }]);
                                
                                return NodeShape;
                            }(VIZ2D.NodeShape);
                            
                            var Diamond=function(_VIZ2D$Visualisation){
                                _inherits(Diamond,_VIZ2D$Visualisation);
                                
                                function Diamond(container,tree,options){
                                    _classCallCheck(this,Diamond);
                                    
                                    var _this4=_possibleConstructorReturn(this,(Diamond.__proto__||Object.getPrototypeOf(Diamond)).call(this,container,tree,options));
                                    var focused=VisualisationHandler.getSynchronisationData().focused||_this4.getShapesRoot()[0].getNode();
                                    _this4.synchronizeNode("focused",focused);
                                    return _this4;
                                }
                                
                                _createClass(Diamond,[{
                                    key:"__getNodeShapeClass",
                                    value:function __getNodeShapeClass(){
                                        return NodeShape;
                                    }
                                },{
                                    key:"__setupOptions",
                                    value:function __setupOptions(options){
                                        var This=this;
                                        this.version=0;
                                        var refocus=function refocus(){
                                            var focused=This.getShape("focused");
                                            if(focused){
                                                focused.__show();
                                                This.setShapeState("focused",focused);
                                            }
                                        };
                                        
                                        options.add(new Options
                                            .Button("whole")
                                            .setIcon("dot-circle")
                                            .setDescription("View the whole visualization")
                                            .onClick(function(){
                                                This.getTree().getRoot().getShape(This.getUID()).focus();
                                            }));
                                            
                                        options.add(new Options.Number("Maximum node count",1,50,10000)
                                            .setDescription("The number of nodes showing on the screen")
                                            .onChange(function(val){
                                                This.maxNodeCount=val;
                                                refocus();
                                            })
                                            .setValue(1000));
                                        
                                        options.add(new Options.Number("Number of layers")
                                            .setDescription("The number of layers shown")
                                            .onChange(function(val){
                                                This.layers=val;
                                                refocus();
                                            })
                                        .setValue(5));
                                    }
                                }]);
                                
                                return Diamond;
                            
                            }(VIZ2D.Visualisation);
                            
                            Diamond.description={
                                name:"Diamond Tree",
                                description:"Diamond Tree is a 2D visualization which aims to make the best use of screen estate. To arrive at an impressive diamond tree a process of three stages lies ahead. Firstly, a general - not detailed - design of the tree is generated where in its center always a polygon is situated. The latter one's number of sides is equal to the number of children of the root. Secondly, the existing design is detailed further by changing the sizes of each node according to the size of the sub tree rooted at it. Finally, the visualization is optimized continuously until it efficiently uses the given space. In this visualization all the nodes except for the root appear as arcs whose distances from the latter are equal if they are in the same level. A data set which has less than 5'000 data points suits the diamond tree best (if you want it to be fully shown in the screen), but even if this is satisfied, if the tree is not somehow balanced then this visualization is not the one you should go for. However, data sets until 300'000 are guaranteed to be visualized by VizWick, but for them the user needs to interact, zoom in and out, or select a node in order to walk through the set.",
                                image:"Resources/Images/Visualizations/Diamond.png"
                            };
                            
                            VisualisationHandler.registerVisualisation(Diamond);
                        })();;
                        
                        (function(){
                            var colors={
                                labelBG:13789470,
                                labelBorder:5974793
                            };
                            
                            function HSVtoInt(h,s,v){
                                var r,g,b,i,f,p,q,t;
                                if(arguments.length===1){
                                    s=h.s,
                                    v=h.v,
                                    h=h.h;
                                }
                                i=Math.floor(h*6);
                                f=h*6-i;
                                p=v*(1-s);
                                q=v*(1-f*s);
                                t=v*(1-(1-f)*s);
                                switch(i%6){
                                    case 0:
                                        r=v,
                                        g=t,
                                        b=p;
                                        break;
                                    case 1:
                                        r=q,
                                        g=v,
                                        b=p;
                                        break;
                                    case 2:
                                        r=p,
                                        g=v,
                                        b=t;
                                        break;
                                    case 3:
                                        r=p,
                                        g=q,
                                        b=v;
                                        break;
                                    case 4:
                                        r=t,
                                        g=p,
                                        b=v;
                                        break;
                                    case 5:
                                        r=v,
                                        g=p,
                                        b=q;
                                        break;
                                }
                                return(Math.round(r*255)<<16)+(Math.round(g*255)<<8)+Math.round(b*255);
                            }
                            
                            var initWidth=30;
                            
                            var NodeShape=function(_VIZ2D$NodeShape2){
                                _inherits(NodeShape,_VIZ2D$NodeShape2);

                                function NodeShape(gfx,node,scale){
                                    _classCallCheck(this,NodeShape);
                                    var _this5=_possibleConstructorReturn(this,(NodeShape.__proto__||Object.getPrototypeOf(NodeShape)).call(this,gfx,node,function(){
                                        this.scale=scale||1;
                                        this.angle=0.5;
                                    }));
                                    
                                    _this5.setScale(_this5.scale);
                                    _this5.color=HSVtoInt(_this5.getDepth()/6,1,1);
                                    _this5.circle=new VIZ2D.Circle(gfx,30,_this5.color);
                                    _this5.addShape(_this5.circle);
                                    var bg=colors.labelBG.toString(16);
                                    var border=colors.labelBorder.toString(16);
                                    _this5.text=new VIZ2D.HtmlShape(gfx,"<span style='"+
                                    "background-color: #"+bg+";"+
                                    "padding: 5px;"+
                                    "display: inline-block;"+
                                    "border: 2px solid #"+border+";"+
                                    "border-radius: 10px;"+
                                    "'>"+
                                    _this5.getNode().getName()+"</span>");
                                    _this5.text.setScale(1);
                                    _this5.onHover(function(enter){
                                        if(enter){
                                            this.highlight();
                                        }
                                        else{
                                            this.dehighlight();
                                        }
                                    });
                                    
                                    _this5.onClick(function(){
                                        this.clicked=true;
                                        this.focus();
                                    });
                                    
                                    return _this5;
                                }
                                
                                _createClass(NodeShape,[{
                                    key:"__stateChanged",
                                    value:function __stateChanged(field,val,oldState){
                                        if(field=="focused"&&val==true){
                                            if(!this.clicked){
                                                this.getVisualisation().camera.setLoc(this.getWorldLoc());
                                                this.getVisualisation().camera.setScale(20/this.scale);
                                                this.getVisualisation().updateScreen();
                                            }
                                            else{
                                                this.clicked=false;
                                            }
                                        }
                                        if(field=="highlighted")if(val==true){
                                            this.addShape(this.text);
                                        }
                                        else{
                                            this.removeShape(this.text);
                                        }
                                    }
                                },{
                                    key:"__connectParent",
                                    value:function __connectParent(parent){
                                        if(parent){
                                            var offset=0;
                                            for(var i=0;i<this.getIndex();i++){
                                                offset=offset+parent.getChildren()[i].scale;
                                            }
                                            this.angle=0;
                                            this.angle=(offset+0.5*this.scale)/parent.scale;
                                            this.setAngle((this.angle*2+0.5)*Math.PI);
                                            var w=initWidth*(parent.scale*0.9-this.scale);
                                            this.setLoc(new VIZ2D.Vec(parent.getLoc()).add(w*Math.cos(this.angle*2*Math.PI),w*Math.sin(this.angle*2*Math.PI),0));
                                        }
                                    }
                                },{
                                    key:"__createChildNodeShape",
                                    value:function __createChildNodeShape(node,parent){
                                        var scale=parent.scale*0.9/parent.getNode().getChildren().length;return new(this.__getClass())(this.getGraphics(),node,scale);
                                    }
                                }]);
                                
                                return NodeShape;
                            }(VIZ2D.NodeShape);
                        })();
                        
                        (function(){
                            var colors={
                                labelBG:13789470,
                                labelBorder:5974793};
                                var initWidth=100;
                                var NodeShape=function(_VIZ2D$NodeShape3){
                                    _inherits(NodeShape,_VIZ2D$NodeShape3);
                                    function NodeShape(gfx,node,scale){
                                        _classCallCheck(this,NodeShape);
                                        var _this7=_possibleConstructorReturn(this,(NodeShape.__proto__||Object.getPrototypeOf(NodeShape)).call(this,gfx,node,function(){
                                            this.scale=scale||1;
                                            this.angle=0.75}));
                                            _this7.setScale(_this7.scale);
                                            _this7.lit=new VIZ2D.Circle(gfx,36,16776960);
                                            _this7.circle=new VIZ2D.Circle(gfx,30,16711680);
                                            _this7.addShape(_this7.circle);
                                            var bg=colors.labelBG.toString(16);
                                            var border=colors.labelBorder.toString(16);
                                            _this7.text=new VIZ2D.HtmlShape(gfx,"<span style='"+
                                            "background-color: #"+bg+";"+
                                            "padding: 5px;"+
                                            "display: inline-block;"+
                                            "border: 2px solid #"+border+";"+
                                            "border-radius: 10px;"+
                                            "'>"+
                                            _this7.getNode().getName()+"</span>");
                                            _this7.text.setScale(1);
                                            _this7.setZ(-_this7.getNode().getDepth());
                                            _this7.onHover(function(enter){
                                                if(enter){
                                                    this.highlight()}else{this.dehighlight();
                                                }
                                            });
                                            _this7.ret=new VIZ2D.Circle(gfx,10,65280);
                                            _this7.ret.setLoc(-20,0);
                                            _this7.addShape(_this7.ret);
                                            var This=_this7;
                                            _this7.ret.onClick(function(){
                                                This.createParent();
                                                var p=This.getParent();
                                                if(p){
                                                    this.getGraphics().setFocussed(p);
                                                    this.getGraphics().select(This);
                                                }
                                                
                                                return true;
                                            });
                                            
                                            _this7.onClick(function(){
                                                this.getGraphics().setFocussed(this);
                                                this.getGraphics().select(this.children[0]);
                                            });
                                            
                                            _this7.__stateChanged("expanded");
                                            return _this7;
                                        }
                                        
                                        _createClass(NodeShape,[{
                                            key:"__stateChanged",
                                            value:function __stateChanged(field,val,oldState){
                                                if(field=="focused"&&val==true){
                                                    this.getGraphics().getCamera().setTarget(this,this,4/this.getWorldScale());
                                                    this.showFamily(2,this.getVisualisation().layers);
                                                }
                                                if(field=="expanded")this.circle.setColor(this.state.expanded?255:16711680);
                                                if(field=="highlighted")if(val==true){this.text.setLoc(0,-40/(this.getGraphics().getCamera().scale*this.getWorldScale()),0);
                                                this.addShape(this.text);
                                            }
                                            else{
                                                this.removeShape(this.text);
                                            }
                                        }
                                    },{
                                        key:"__connectParent",
                                        value:function __connectParent(parent){
                                            if(parent){
                                                var offset=0;
                                                var children=parent.getNode().getChildren();
                                                var UID=this.graphics.getUID();
                                                for(var i=0;i<this.getIndex();i++){
                                                    var child=children[i];
                                                    var shape=child.getShape(UID);
                                                    if(!shape)shape=parent.__createChildNodeShape(child,parent);
                                                    offset=offset+shape.scale}this.angle=parent.angle-0.3+0.6*((offset+0.5*this.scale)/parent.scale);
                                                    this.setAngle((this.angle*2+0.5)*Math.PI);
                                                    var w=initWidth*parent.scale;
                                                    this.setLoc(new VIZ2D.Vec(parent.getLoc()).add(w*Math.cos(this.angle*2*Math.PI),w*Math.sin(this.angle*2*Math.PI),0));
                                                    var v=new VIZ2D.Vec(parent.getLoc()).sub(this.getLoc());
                                                    v.setAngle(0);
                                                    v.setLength(30*parent.scale/this.scale);
                                                    var k=new VIZ2D.Vec(parent.getLoc()).sub(this.getLoc()).mul(1/this.scale).setAngle(0.5*Math.PI).add(v);
                                                    var l=new VIZ2D.Vec(parent.getLoc()).sub(this.getLoc()).mul(1/this.scale).setAngle(0.5*Math.PI).sub(v);
                                                    this.connection=new VIZ2D.Polygon(this.getGraphics(),[0,0,k.x,k.y,l.x,l.y],7798784);this.connection.setZ(-150);
                                                    this.addShape(this.connection);
                                                }
                                            }
                                        },{
                                            key:"__createChildNodeShape",
                                            value:function __createChildNodeShape(node,parent){
                                                var scale=parent.scale*node.getSubtreeNodeCount()/node.getParent().getSubtreeNodeCount();
                                                return new(this.__getClass())(this.getGraphics(),node,scale);
                                            }
                                        },{
                                            key:"select",
                                            value:function select(){this.text.setLoc(0,-40/(this.getGraphics().getCamera().scale*this.getWorldScale()),0);
                                            this.addShape(this.lit);
                                            this.lit.setZ(-100);this.addShape(this.text);
                                        }
                                    },{
                                        key:"unselect"
                                        ,value:function unselect(){
                                            this.removeShape(this.lit);
                                            this.removeShape(this.text);
                                        }
                                    }
                                ]);
                                
                                return NodeShape;
                            }(VIZ2D.NodeShape);;
                        })();
                        
                        (function(){
                            var NodeShape=function(_VIZ2D$NodeShape4){
                                _inherits(NodeShape,_VIZ2D$NodeShape4);
                                
                                function NodeShape(gfx,node){
                                    _classCallCheck(this,NodeShape);
                                    var _this9=_possibleConstructorReturn(this,(NodeShape.__proto__||Object.getPrototypeOf(NodeShape)).call(this,gfx,node));
                                    _this9.radialBand=new VIZ2D.RadialBand(gfx,0,30,0,2*Math.PI,16711680);
                                    _this9.addShape(_this9.radialBand);
                                    _this9.onClick(function(data){
                                        if(this.isRoot()){
                                            var parentNode=this.getNode().getParent();
                                            var parentShape=parentNode&&parentNode.getShape(this.getVisualisation().getUID());
                                            if(parentShape)parentShape.focus();
                                        }
                                        else{
                                            this.focus();
                                        }
                                        return true;
                                    });
                                    
                                    _this9.onHover(function(over){
                                        if(over){this.highlight();
                                        }
                                        else{
                                            this.dehighlight();
                                        }
                                    });
                                    return _this9;
                                }
                                
                                _createClass(NodeShape,[{
                                    key:"__stateChanged",
                                    value:function __stateChanged(field,val,oldState){
                                        if(field=="focused"&&val==true){
                                            this.getVisualisation().centeralizeNode(this.getNode());
                                        }
                                    }
                                },{
                                    key:"calcPDCount_setLayersNumbers",
                                    value:function calcPDCount_setLayersNumbers(){
                                        this.PDCount=1;
                                        var childArr=this.getChildren();
                                        var lhca=this.getVisualisation().layerHeadCountArr;
                                        for(var i=0;i<childArr.length;i++){
                                            var layerNumber=childArr[i].layerNumber=this.layerNumber+1;
                                            this.PDCount+=childArr[i].calcPDCount_setLayersNumbers();
                                            lhca[layerNumber]=lhca[layerNumber]+1||1;
                                        }
                                        return this.PDCount;
                                    }
                                },{
                                    key:"getPDCount",
                                    value:function getPDCount(){
                                        return this.PDCount;
                                    }
                                },{
                                    key:"calcChildLayer_PDCount",
                                    value:function calcChildLayer_PDCount(){
                                        if(this.PDCount){
                                            return this.PDCount-1;
                                        }
                                    }
                                },{
                                    key:"calcChildLayer_Thickness"
                                    ,value:function calcChildLayer_Thickness(){
                                        var childLayer_Thickness=60;
                                        var childLayerPopulation=this.getVisualisation().layerHeadCountArr[this.layerNumber+1];
                                        var avgPixelPerNode=this.radialBand.getOutRadius()*2*Math.PI/childLayerPopulation;
                                        if(avgPixelPerNode<2){
                                            childLayer_Thickness=120;
                                        }
                                        else if(avgPixelPerNode<8){
                                            childLayer_Thickness=90;
                                        }
                                        return childLayer_Thickness;
                                    }
                                },{
                                    key:"setPropertiesDescendants",
                                    value:function setPropertiesDescendants(){
                                        var nextStartAngle=this.radialBand.getStartAngle();
                                        var childrenArr=this.getChildren();
                                        var childlayerThickness=this.calcChildLayer_Thickness();
                                        for(var i=0;i<childrenArr.length;i++){
                                            var child=childrenArr[i];
                                            child.radialBand.resetProperties();
                                            child.radialBand.setInRadius(this.radialBand.getInRadius()+this.radialBand.getThickness()+2);
                                            child.radialBand.setThickness(childlayerThickness);
                                            child.radialBand.setStartAngle(nextStartAngle);
                                            var aSize=this.radialBand.getSize()*(child.getPDCount()/this.calcChildLayer_PDCount());
                                            child.radialBand.setSize(aSize);
                                            nextStartAngle+=aSize;child.setPropertiesDescendants();
                                            child.radialBand.setColor(new VIZ2D.Color.fromHSV(Math.random(),1,1).getInt());
                                        };
                                    }
                                }]);
                                
                                return NodeShape;
                            }(VIZ2D.NodeShape);
                        })();;
                    })();