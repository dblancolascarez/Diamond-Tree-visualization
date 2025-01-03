(function() {
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor)
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor
        }
    }();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function")
        }
    }
    var Tree = function() {
        function Tree(input) {
            _classCallCheck(this, Tree);
            console.log("Constructing tree");
            this.root = new TreeNode(input);
            this.root.__setTree(this);
            console.log("Calculating values");
            this.root.__calculateHeight();
            this.root.__calculateDepth();
            this.root.__calculateSubtreeNodeCount();
            this.depth = this.root.getHeight();
            console.log("Tree constructed")
        }
        _createClass(Tree, [{
            key: "__recalculateValues",
            value: function __recalculateValues() {
                this.root.__calculateDepth();
                this.root.__calculateHeight();
                this.root.__calculateSubtreeNodeCount()
            }
        }, {
            key: "__setRoot",
            value: function __setRoot(rootinput) {
                this.root = rootinput;
                rootinput.__setTree(this);
                return this
            }
        }, {
            key: "getRoot",
            value: function getRoot() {
                return this.root
            }
        }, {
            key: "getHeight",
            value: function getHeight() {
                return this.depth
            }
        }, {
            key: "getDepth",
            value: function getDepth() {
                return this.depth
            }
        }]);
        return Tree
    }();
    window.Tree = Tree;;
    var TreeNode = function() {
        function TreeNode(input, inputparent) {
            _classCallCheck(this, TreeNode);
            this.depth;
            this.height;
            this.value;
            this.shapes = {};
            this.children = [];
            this.deletelistener = [];
            this.addlistener = [];
            this.insertlistener = [];
            if (inputparent) {
                this.parentnode = inputparent;
                this.parentnode.__addChild(this)
            }
            if (input.name) this.__setName(input.name);
            if (input.value) this.__setvalue(input.value);
            if (input.data) this.__setData(input.data);
            if (input.movedchildren) {
                this.children = input.movedchildren;
                for (var i = 0; i < input.movedchildren.length; i++) {
                    input.movedchildren.__updateParent(this)
                }
            }
            if (input.children) {
                for (var i = 0; i < input.children.length; i++) {
                    new TreeNode(input.children[i], this)
                }
            }
        }
        _createClass(TreeNode, [{
            key: "__setName",
            value: function __setName(newname) {
                this.name = newname;
                return this
            }
        }, {
            key: "getName",
            value: function getName() {
                return this.name
            }
        }, {
            key: "__addChild",
            value: function __addChild(childnode) {
                this.children.push(childnode);
                return this
            }
        }, {
            key: "getParent",
            value: function getParent() {
                return this.parentnode
            }
        }, {
            key: "addNode",
            value: function addNode(newnode) {
                this.addednode = new TreeNode(newnode, this);
                this.updateParentPath();
                this.addednode.__calculateDepth();
                this.addednode.__calculateHeight();
                this.addednode.__calculateSubTreeNodeCount();
                this.__triggerAddListener();
                return this
            }
        }, {
            key: "getRoot",
            value: function(_getRoot) {
                function getRoot() {
                    return _getRoot.apply(this, arguments)
                }
                getRoot.toString = function() {
                    return _getRoot.toString()
                };
                return getRoot
            }(function() {
                if (this.parentnode != undefined) return getRoot(parentnode);
                else return this
            })
        }, {
            key: "__setTree",
            value: function __setTree(treeinput) {
                this.tree = treeinput;
                return this
            }
        }, {
            key: "getTree",
            value: function getTree() {
                if (this.tree) return this.tree;
                else return this.getRoot().getTree()
            }
        }, {
            key: "getChildren",
            value: function getChildren() {
                return this.children
            }
        }, {
            key: "__removeChild",
            value: function __removeChild(oldchild) {
                var index = this.children.indexOf(oldchild);
                this.children.splice(index, 1)
            }
        }, {
            key: "addShape",
            value: function addShape(visualisation, newshape) {
                this.shapes[visualisation] = newshape;
                return this
            }
        }, {
            key: "removeShape",
            value: function removeShape(visualisation) {
                if (this.shapes[visualisation]) this.shapes[visualisation] = undefined;
                return this
            }
        }, {
            key: "getShapes",
            value: function getShapes() {
                return this.shapes
            }
        }, {
            key: "getShape",
            value: function getShape(visualisation) {
                if (this.shapes[visualisation]) return this.shapes[visualisation];
                else return
            }
        }, {
            key: "forwardToShapes",
            value: function forwardToShapes(forwardfunction, ignore) {
                if (!ignore) ignore = [];
                if (!(ignore instanceof Array)) ignore = [ignore];
                var args = Array.from(arguments);
                args.pop();
                args.pop();
                var keys = Object.keys(this.shapes);
                for (var i = 0; i < keys.length; i++) {
                    var shape = this.shapes[keys[i]];
                    if (ignore.indexOf(shape) == -1) forwardfunction.apply(shape, args)
                }
            }
        }, {
            key: "__setValue",
            value: function __setValue(newvalue) {
                this.value = newvalue;
                return this
            }
        }, {
            key: "getValue",
            value: function getValue() {
                return this.value
            }
        }, {
            key: "getSmallestChild",
            value: function getSmallestChild() {
                var smallest;
                for (var i = 0; i < children.length; i++) {
                    if (!smallest.getValue()) smallest = children[i];
                    if (smallest.getValue() > children[i].getValue()) smallest = children[i]
                }
                return smallest
            }
        }, {
            key: "getLargestChild",
            value: function getLargestChild() {
                var largest;
                for (var i = 0; i < children.length; i++) {
                    if (!largest.getValue()) largest = children[i];
                    if (largest.getValue() < children[i].getValue()) largest = children[i]
                }
                return largest
            }
        }, {
            key: "__calculateDepth",
            value: function __calculateDepth() {
                if (this.parentnode) {
                    this.depth = this.parentnode.getDepth() + 1
                } else {
                    this.depth = 1
                }
                if (this.children.length > 0) {
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].__calculateDepth()
                    }
                }
            }
        }, {
            key: "getDepth",
            value: function getDepth() {
                return this.depth
            }
        }, {
            key: "__calculateHeight",
            value: function __calculateHeight() {
                this.largestheight = 0;
                if (this.children.length > 0) {
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].__calculateHeight();
                        if (this.largestheight < this.children[i].getHeight()) this.largestheight = this.children[i].getHeight()
                    }
                }
                this.height = this.largestheight + 1;
                return this
            }
        }, {
            key: "getHeight",
            value: function getHeight() {
                return this.height
            }
        }, {
            key: "__calculateSubtreeNodeCount",
            value: function __calculateSubtreeNodeCount() {
                this.subtreenodecount = 1;
                if (this.children.length > 0) {
                    for (var i = 0; i < this.children.length; i++) {
                        this.children[i].__calculateSubtreeNodeCount();
                        this.subtreenodecount = this.subtreenodecount + this.children[i].getSubtreeNodeCount()
                    }
                }
                return this
            }
        }, {
            key: "getSubtreeNodeCount",
            value: function getSubtreeNodeCount() {
                return this.subtreenodecount
            }
        }, {
            key: "__setData",
            value: function __setData(inputdata) {
                this.data = inputdata;
                return this
            }
        }, {
            key: "getData",
            value: function getData() {
                return this.data
            }
        }, {
            key: "insertNode",
            value: function insertNode(insert) {
                this.insert.movedchildren = this.children;
                this.children = [insert];
                new TreeNode(insert, this);
                this.__updateParentPath();
                this.__calculateDepth();
                this.__triggerInsertListener()
            }
        }, {
            key: "__updateParent",
            value: function __updateParent(newparent) {
                this.parentnode = newparent
            }
        }, {
            key: "deleteNode",
            value: function deleteNode() {
                for (var i = 0; i < children.length; i++) {
                    this.parentnode.addChild(this.children[i]);
                    this.children[i].__updateParent(this.parentnode)
                }
                this.parentnode.__removeChild(this);
                this.__updateParentPath();
                this.__calculateDepth();
                this.__triggerDeleteListener()
            }
        }, {
            key: "__updateParentPath",
            value: function __updateParentPath() {
                this.subtreenodecount = 1;
                if (this.children.length > 0) {
                    for (var i = 0; i < this.children.length; i++) {
                        this.subtreenodecount = this.subtreenodecount + this.children[i].getSubtreeNodeCount()
                    }
                }
                this.__recalculateHeight()
            }
        }, {
            key: "__recalculateHeight",
            value: function __recalculateHeight() {
                this.largestheight = 0;
                if (this.children.length > 0) {
                    for (var i = 0; i < this.children.length; i++) {
                        if (this.largestheight < this.children[i].getHeight()) this.largestheight = this.children[i].getHeight()
                    }
                }
                this.height = this.largestheight + 1;
                return this
            }
        }, {
            key: "addAddListener",
            value: function addAddListener(listener) {
                this.addlistener.push(listener)
            }
        }, {
            key: "deleteAddListener",
            value: function deleteAddListener(listener) {
                var index = this.addListener.indexOf(listener);
                if (index != -1) this.addListener.splice(index, 1)
            }
        }, {
            key: "__triggerAddListener",
            value: function __triggerAddListener() {
                for (var i = 0; i < this.addListener.length; i++) {
                    this.addListener[i].apply(this, arguments)
                }
                return this
            }
        }, {
            key: "addDeleteListener",
            value: function addDeleteListener(listener) {
                this.deletelistener.push(listener)
            }
        }, {
            key: "deleteDeleteListener",
            value: function deleteDeleteListener(listener) {
                var index = this.deleteListener.indexOf(listener);
                if (index != -1) this.deleteListener.splice(index, 1)
            }
        }, {
            key: "__triggerDeleteListener",
            value: function __triggerDeleteListener() {
                for (var i = 0; i < this.deleteListener.length; i++) {
                    this.deleteListener[i].apply(this, arguments)
                }
                return this
            }
        }, {
            key: "addInsertListener",
            value: function addInsertListener(listener) {
                this.insertlistener.push(listener)
            }
        }, {
            key: "deleteInsertListener",
            value: function deleteInsertListener(listener) {
                var index = this.insertListener.indexOf(listener);
                if (index != -1) this.insertListener.splice(index, 1)
            }
        }, {
            key: "__triggerInsertListener",
            value: function __triggerInsertListener() {
                for (var i = 0; i < this.insertListener.length; i++) {
                    this.insertListener[i].apply(this, arguments)
                }
                return this
            }
        }, {
            key: "getSiblingCount",
            value: function getSiblingCount() {
                return this.getParent().getChildren.length - 1
            }
        }, {
            key: "getSubTreeNodeCountN",
            value: function getSubTreeNodeCountN(n) {
                var localsubtreenodecount = 1;
                if (this.children.length > 0 && n > 0) {
                    for (var i = 0; i < this.children.length; i++) {
                        localsubtreenodecount = localsubtreenodecount + this.children[i].getSubtreeNodeCountN(n)
                    }
                }
                return localsubtreenodecount
            }
        }]);
        return TreeNode
    }();;
})();