(function() {
    (function() {
        function addHandle(container) {
            var handle = $("<div class=resizeHandle>" + "<div class=resizeHandleInner>" + "<div class=resizeHandleInnerDisplay></div>" + "</div>" + "</div>");
            var isVertical = container.is(".vertical");
            handle.mousedown(function(e) {
                var This = $(this);
                var handleIndex = Math.floor(This.index() / 2);
                moveFunc = function moveFunc(x, y) {
                    var pos = container.offset();
                    if (isVertical) per = (y - pos.top) / container.height();
                    else per = (x - pos.left) / container.width();
                    setHandlePer(container, handleIndex, per, true)
                };
                releaseFunc = function releaseFunc() {
                    var next = This.next();
                    var prev = This.prev();
                    triggerFinishResize(next);
                    triggerFinishResize(prev)
                };
                e.stopImmediatePropagation()
            });
            container.append(handle)
        }

        function addContent(container, content) {
            var content = $(content);
            var childCount = Math.ceil(container.children().length / 2);
            var sizePer = 1 / (childCount + 1);
            var resizeOldPer = 1 - sizePer;
            var sizes = getSizes(container);
            for (var i = 0; i < sizes.length; i++) {
                sizes[i] *= resizeOldPer
            }
            sizes.push(sizePer);
            if (childCount != 0) addHandle(container);
            container.append(content);
            content.addClass("resizeContent");
            content.on("resize", function(e) {
                e.stopPropagation()
            }).on("finishResize", function(e) {
                e.stopPropagation()
            });
            content.data("size", {
                width: content.width(),
                height: content.height()
            });
            updateContentSizes(container)
        }

        function removeContent(content) {
            var container = content.parent();
            var size = getContentSize(content);
            var resizeOldPer = 1 / (1 - size);
            var sizes = getSizes(container);
            console.log(content.index());
            sizes.splice(content.index() / 2, 1);
            for (var i = 0; i < sizes.length; i++) {
                sizes[i] *= resizeOldPer
            }
            var handle = content.prev();
            if (handle.length == 0) handle = content.next();
            handle.remove();
            content.remove();
            updateContentSizes(container)
        }

        function updateContentSizes(container, dontCallRelaseEvent, forceFCallinishEvent) {
            var sizes = getSizes(container);
            var children = container.children();
            var isVertical = container.is(".vertical");
            var perLeft = 100;
            for (var i = 0; i < sizes.length; i++) {
                var size = sizes[i];
                var content = $(children[i * 2]);
                var oldSize = content.data("size");
                var per = Math.round(size * 1000) / 10;
                perLeft -= per;
                if (i == sizes.length - 1) per += perLeft;
                var oldTransition = content.css("transition");
                content.css("transition", "none");
                if (isVertical) content.height(per + "%");
                else content.width(per + "%");
                content.css("transition", oldTransition);
                var newSize = {
                    width: content.width(),
                    height: content.height()
                };
                if (oldSize.width != newSize.width || oldSize.height != newSize.height) {
                    triggerResize(content);
                    if (!dontCallRelaseEvent) triggerFinishResize(content)
                } else if (forceFCallinishEvent) {
                    triggerFinishResize(content)
                }
            }
        }

        function getSizes(container) {
            if (!container[0].sizes) container[0].sizes = [];
            return container[0].sizes
        }

        function getContentSize(content) {
            var container = content.parent();
            var sizes = getSizes(container);
            return sizes[content.index() / 2]
        }

        function setHandlePer(container, index, per, dontCallRelaseEvent) {
            var sizes = getSizes(container);
            for (var i = 0; i < index; i++) {
                per -= sizes[i]
            }
            var total = 1;
            for (var i = 0; i < index; i++) {
                total -= sizes[i]
            }
            for (var i = index + 2; i < sizes.length; i++) {
                total -= sizes[i]
            }
            var minSize = 0.3 / sizes.length;
            sizes[index] = Math.min(Math.max(minSize, per), total - minSize);
            sizes[index + 1] = total - sizes[index];
            updateContentSizes(container, dontCallRelaseEvent)
        }

        function triggerResize(content) {
            var newSize = {
                width: content.width(),
                height: content.height()
            };
            content.add(content.find(".resizeContainer, canvas")).trigger("resize", {
                newSize: newSize,
                oldSize: content.data("size")
            });
            content.data("size", newSize)
        }

        function triggerFinishResize(content) {
            var newSize = {
                width: content.width(),
                height: content.height()
            };
            content.add(content.find(".resizeContainer, canvas")).trigger("finishResize", newSize)
        }
        $.fn.resizeContainer = function(action) {
            var args = arguments;
            $(this).each(function() {
                var t = $(this);
                if (action == "resize") {
                    setHandlePer(t, args[1], args[2])
                } else if (action == "add") {
                    addContent(t, args[1])
                } else if (action == "remove") {
                    removeContent($(args[1]))
                } else {
                    var data = args[0] || {};
                    t.addClass("resizeContainer");
                    if (data.vertical) t.addClass("vertical");
                    else t.addClass("horizontal");
                    var contents = t.children();
                    contents.remove();
                    contents.each(function() {
                        addContent(t, this)
                    });
                    t.on("resize", function() {
                        updateContentSizes(t, true)
                    });
                    t.on("finishResize", function() {
                        updateContentSizes(t, false, true)
                    })
                }
            })
        };
        $("head").append("<style>" + ".resizeContainer{" + "   position: relative;" + "}" + ".horizontal>.resizeContent{" + "   display: inline-block;" + "   overflow: hidden;" + "   vertical-align: top;" + "   height: 100%;" + "}" + ".horizontal>.resizeHandle{" + "   display: inline-block;" + "   width: 0px;" + "   position: relative;" + "   height: 100%;" + "}" + ".horizontal>.resizeHandle>.resizeHandleInner{" + "   z-index: 1000;" + "   left: -5px;" + "   right: -5px;" + "   top: 0px;" + "   bottom: 0px;" + "   position: absolute;" + "   cursor: w-resize;" + "}" + ".horizontal>.resizeHandle>.resizeHandleInner>.resizeHandleInnerDisplay{" + "   position: absolute;" + "   right: 5px;" + "   top: 0px;" + "   bottom: 0px;" + "   width: 1px;" + "   background-color: black;" + "}" + ".vertical>.resizeContent{" + "   overflow: hidden;" + "}" + ".vertical>.resizeHandle{" + "   height: 0px;" + "   width: 100%;" + "   position: absolute;" + "}" + ".vertical>.resizeHandle>.resizeHandleInner{" + "   z-index: 1000;" + "   top: -5px;" + "   bottom: -5px;" + "   left: 0px;" + "   right: 0px;" + "   position: absolute;" + "   cursor: n-resize;" + "}" + ".vertical>.resizeHandle>.resizeHandleInner>.resizeHandleInnerDisplay{" + "   position: absolute;" + "   bottom: 5px;" + "   right: 0px;" + "   left: 0px;" + "   height: 1px;" + "   background-color: black;" + "}" + "</style>");
        var moveFunc;
        var releaseFunc;
        $(document).mouseup(function(e) {
            if (releaseFunc) {
                releaseFunc();
                e.stopImmediatePropagation()
            }
            releaseFunc = null;
            moveFunc = null
        }).mousemove(function(e) {
            if (moveFunc) {
                moveFunc(e.clientX, e.clientY);
                e.stopImmediatePropagation();
                e.preventDefault()
            }
        });
        var timeout = null;
        var block = false;
        $(window).resize(function(e) {
            if (!block) {
                block = true;
                var containers = $(".resizeContainer").filter(function() {
                    return $(this).parents(".resizeContainer").length == 0
                });
                containers.trigger("resize");
                timeout = setTimeout(function() {
                    containers.trigger("finishResize")
                }, 400);
                block = false
            }
        })
    })();;
})();