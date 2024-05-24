(function() {
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    };

    var orAlert = alert;
    var alertID = 0;
    var transitionDuration = 400;
    window.alert = function(data) {
        if ((typeof data === "undefined" ? "undefined" : _typeof(data)) != "object") data = {
            message: data + ""
        };
        if (!data.type) data.type = "notify";
        if (!data.duration && data.type == "notify") data.duration = 5000;
        if (!data.okButtonText)
            if (data.type != "verify") data.okButtonText = "OK";
            else data.okButtonText = "continue";
        if (!data.cancelButtonText) data.cancelButtonText = "cancel";
        if (data.type == "hardAlert") {
            orAlert(data.message);
            if (data.callback) data.callback()
        } else {
            var ID = ++alertID;
            var element = loadTemplate(".alert");
            element.attr("ID", ID);
            element.find(".message").text(data.message);
            if (data.type == "notify") element.addClass("notify");
            if (data.type == "verify") element.addClass("verify");
            element.find(".okButton, .continueButton").text(data.okButtonText);
            element.find(".cancelButton").text(data.cancelButtonText);
            element.find(".okButton, .continueButton").click(function() {
                if (data.callback) data.callback();
                element[0].cancelCallback = null;
                window.clearAlert(ID)
            });
            element[0].cancelCallback = data.cancelCallback;
            element.find(".cancelButton").click(function() {
                if (data.cancelCallback) data.cancelCallback();
                element[0].cancelCallback = null;
                window.clearAlert(ID)
            });
            if (data.duration && data.duration < Infinity) {
                setTimeout(function() {
                    window.clearAlert(ID)
                }, data.duration)
            }
            if (data.type == "notify") {
                element.css("cursor", "pointer").click(function() {
                    window.clearAlert(ID)
                })
            }
            element.animate({
                height: element.find(".alertInner").outerHeight(true)
            }, {
                duration: transitionDuration
            });
            return ID
        }
    };
    window.clearAlert = function(alertID) {
        var element = $(".alert#" + alertID);
        if (element.length > 0) {
            element.animate({
                height: 0
            }, {
                duration: transitionDuration,
                complete: function complete() {
                    element.remove();
                    if (element[0].cancelCallback) {
                        element[0].cancelCallback()
                    }
                }
            })
        }
    };
    $(function() {
        initTemplates(".alert")
    });;
    $(function() {
        var body = $(".body-inner");
        $(".page").hide();
        $(".active").show();
        $("[gotoPage]").click(function() {
            var pageClass = $(this).attr("gotoPage");
            var nextPage = $("." + pageClass);
            var curPage = $(".active").removeClass("active");
            nextPage.addClass("active");
            $(".page").hide();
            curPage.show();
            nextPage.show();
            body.css("top", body.offset().top - curPage.offset().top);
            body.animate({
                top: body.offset().top - nextPage.offset().top
            }, 1000)
        });
        $(window).resize(function() {
            body.css("top", body.offset().top - $(".active").offset().top)
        })
    });;
    var previewData;
    var selectedIndex = 0;

    function selectIndex(index) {
        selectedIndex = index;
        var data = previewData[index];
        $(".vis-name").text(data.name);
        $(".vis-description").text(data.description);
        $(".photo-area").css("background-image", "url('" + data.image + "')");
        $(".dot.selected").removeClass("selected");
        $(".dot#" + index).addClass("selected")
    }
    $(function() {
        var visualisations = VisualisationHandler.getVisualisationTypes();
        for (var i = 0; i < visualisations.length; i++) {
            var visName = visualisations[i];
            previewData.push(VisualisationHandler.getVisualisationClass(visName).description)
        }
        for (var i = 0; i < previewData.length; i++) {
            var dot = $("<div class='dot' id='" + i + "'></div>");
            $(".dot-navigation").append(dot);
            if (i == 0) dot.addClass("selected")
        }
        $(".right-arrow").click(function() {
            selectIndex((selectedIndex + 1) % previewData.length)
        });
        $(".left-arrow").click(function() {
            selectIndex((selectedIndex - 1 + previewData.length) % previewData.length)
        });
        $(".dot").click(function() {
            selectIndex($(this).attr("id"))
        });
        selectIndex(0)
    });;
    window.dataSets = [];
    $(function() {
        $(".layout").resizeContainer({
            vertical: true
        });
        $(".top-layout-part, .bottom-layout-part").resizeContainer({
            vertical: false
        });
        var quadrants = $(".top-layout-part, .bottom-layout-part").find(".quadrant");
        quadrants.css("transition", "none");
        setTimeout(function() {
            quadrants.css("transition", "")
        });
        catchEvents($(".left-section"));
        $(".share-button").click(function() {
            alert({
                type: "verify",
                message: "If you create a shareable link your data set will become public. Are you sure you want to continue?",
                callback: function callback() {
                    var alertID = alert({
                        message: "Your data is currently being uploaded, please wait for a moment.",
                        duration: Infinity
                    });
                    share(function() {
                        clearAlert(alertID)
                    })
                }
            })
        });
        $(".collapse").click(function() {
            var duration = 500;
            $(".visualization-page").attr("id", "information-collapse");
            $(".left-section").animate({
                width: 10
            }, duration);
            $(".right-section").animate({
                width: $(window).width() - 25
            }, {
                duration: duration,
                complete: function complete() {
                    $(this).width("calc(100% - 25px)")
                }
            });
            updateVisualizationAreaSizes(duration)
        });
        $(".appear").click(function() {
            var duration = 500;
            $(".visualization-page").attr("id", "information-appear");
            $(".left-section").animate({
                width: 300
            }, duration);
            $(".right-section").animate({
                width: $(window).width() - 315
            }, {
                duration: duration,
                complete: function complete() {
                    $(this).width("calc(100% - 315px)")
                }
            });
            updateVisualizationAreaSizes(duration)
        });
        $(".two-button").click(function() {
            $("body").attr("id", "two");
            updateVisualizationAreaSizes(500);
            var bottomLeft = VisualisationHandler.getVisArea("bottom-left").getVisualisation();
            if (bottomLeft) bottomLeft.pause(true);
            var bottomRight = VisualisationHandler.getVisArea("bottom-right").getVisualisation();
            if (bottomRight) bottomLeft.pause(true)
        });
        $(".four-button").click(function() {
            $("body").attr("id", "four");
            updateVisualizationAreaSizes(500);
            VisualisationHandler.getExistingVisualisations().forEach(function(vis) {
                vis.start()
            })
        });
        $(".notch").click(function() {
            var optionPane = $(this).closest(".option-pane");
            var innerOptionPane = optionPane.find(".inner-option-pane");
            var duration = 500;
            if (optionPane.is("#notch")) {
                optionPane.animate({
                    height: Math.floor(innerOptionPane.outerHeight(true)) - 1
                }, {
                    duration: duration,
                    complete: function complete() {
                        $(this).height("auto")
                    }
                });
                optionPane.attr("id", "options")
            } else {
                optionPane.animate({
                    height: $(this).outerHeight(true)
                }, duration);
                optionPane.attr("id", "notch")
            }
        });
        $(".full-screen-button").click(function() {
            var body = $("body");
            if (body.is(".fullscreen")) {
                body.attr("class", body.attr("class").replace(/fullscreen.*/g, ""));
                VisualisationHandler.getExistingVisualisations().forEach(function(vis) {
                    vis.start()
                })
            } else {
                var quadrant = $(this).closest(".quadrant").attr("class").split(" ")[0];
                body.addClass("fullscreen").addClass("fullscreen-" + quadrant);
                VisualisationHandler.getExistingVisualisations().forEach(function(viz) {
                    viz.pause(true)
                });
                var viz = VisualisationHandler.getVisArea(quadrant).getVisualisation();
                if (viz) viz.start()
            }
            updateVisualizationAreaSizes(500)
        });
        $(".reset-button").click(function() {
            $(".top-layout-part, .bottom-layout-part").height("50%");
            $(".top-left, .top-right, .bottom-left, .bottom-right").width("50%");
            $(".layout, .top-layout-part, .bottom-layout-part").each(function() {
                this.sizes = [0.5, 0.5]
            });
            updateVisualizationAreaSizes(500)
        });
        var areaNames = ["top-left", "top-right", "bottom-left", "bottom-right"];
        var _loop = function _loop() {
            var areaName = areaNames[i];
            VisualisationHandler.createVisArea(areaName, $("." + areaName + " .visualization-area"), function(options, visualisation) {
                var quadrant = $("." + areaName);
                catchEvents(quadrant.find(".option-pane"));
                attachOptions(options, quadrant);
            })
        };
        for (var i = 0; i < areaNames.length; i++) {
            _loop()
        }
        var types = VisualisationHandler.getVisualisationTypes();
        for (var i = 0; i < types.length; i++) {
            var type = types[i].replace(/(^|\s)(.)/g, function(m, g1, g2) {
                return g1 + g2.toUpperCase()
            });
            $(".visualizations-inner").append("<div class='visualization-button noselect' vizID='" + type + "'>" + "<div class='center'>" + type + "</div>" + "</div>")
        }
        {
            var dragging = null;
            $(".visualizations-inner").children().each(function() {
                $(this).mousedown(function(event) {
                    event.preventDefault();
                    var This = $(this);
                    var offset = This.offset();
                    var elementCopy = This.clone().css({
                        position: "absolute",
                        zIndex: 2000
                    }).offset(offset);
                    $("body").append(elementCopy);
                    dragging = {
                        element: elementCopy,
                        original: This,
                        baseOffset: {
                            left: offset.left - event.clientX,
                            top: offset.top - event.clientY
                        }
                    };
                    This.css("opacity", 0);
                    $("body").addClass("dragging");
                    $(".quadrant").each(function() {
                        $(this).find(".drop-indicator").height("calc(100% - " + $(this).find(".option-pane").height() + "px)")
                    })
                })
            });
            $(window).mousemove(function(event) {
                if (dragging) {
                    var offset = {
                        left: event.clientX + dragging.baseOffset.left,
                        top: event.clientY + dragging.baseOffset.top
                    };
                    dragging.element.offset(offset);
                    if (dragging.overArea) dragging.overArea.removeClass("dropHover");
                    dragging.overArea = null;
                    var visualisationAreas = $(".visualization-area");
                    var size = {
                        width: dragging.element.width(),
                        height: dragging.element.height()
                    };
                    for (var i = 0; i < visualisationAreas.length; i++) {
                        var visualisationArea = $(visualisationAreas[i]);
                        var vPos = visualisationArea.offset();
                        var vSize = {
                            width: visualisationArea.width(),
                            height: visualisationArea.height()
                        };
                        if (vPos.left < offset.left + size.width && vPos.top < offset.top + size.height && vPos.left + vSize.width > offset.left && vPos.top + vSize.height > offset.top) {
                            var a = dragging.overArea = visualisationArea.closest(".quadrant").addClass("dropHover");
                            break
                        }
                    }
                }
            }).mouseup(function() {
                if (dragging) {
                    $("body").removeClass("dragging");
                    var duration = 1000;
                    var element = dragging.element;
                    if (dragging.overArea) {
                        dragging.overArea.removeClass("dropHover");
                        var visAreaName = dragging.overArea.find(".show-visualization");
                        var data = visAreaName.offset();
                        var properties = ["color", "background-color", "border-radius", "border-color", "border-width", "height", "font-size", "font"];
                        for (var i = 0; i < properties.length; i++) {
                            var prop = properties[i];
                            var val = visAreaName.css(prop);
                            if (val) data[prop] = val
                        }
                        element.css({
                            borderStyle: "solid"
                        }).animate(data, {
                            duration: duration,
                            complete: function complete() {
                                visAreaName.stop().find(".center").text(element.text());
                                visAreaName.css({
                                    opacity: 1
                                });
                                element.remove()
                            }
                        });
                        visAreaName.animate({
                            opacity: 0
                        }, duration);
                        dragging.original.animate({
                            opacity: 1
                        }, duration);
                        var areaID = dragging.overArea.closest(".quadrant").attr("class").split(" ")[0];
                        setTimeout(function() {
                            VisualisationHandler.setVisualisationForArea(areaID, element.attr("vizID"))
                        }, duration)
                    } else {
                        var original = dragging.original;
                        var orPos = original.offset();
                        element.animate(orPos, {
                            duration: duration,
                            complete: function complete() {
                                element.remove();
                                original.css("opacity", 1)
                            }
                        })
                    }
                    dragging = null
                }
            })
        }
        VisualisationHandler.addSelectedNodeListener(function(node) {
            var path = [];
            var n = node;
            while (n) {
                path.unshift(escHtml(n.getName()));
                n = n.getParent()
            }
            var children = [];
            var childList = node.getChildren();
            for (var i = 0; i < childList.length; i++) {
                children.push(escHtml(childList[i].getName()))
            }
            $(".stat.name .stat-value").text(node.getName());
            $(".stat.parent .stat-value").text(node.getParent() ? node.getParent().getName() : "");
            $(".stat.child-count .stat-value").text(children.length);
            $(".stat.depth .stat-value").text(node.getDepth());
            $(".stat.height .stat-value").text(node.getHeight());
            $(".stat.descendant-count .stat-value").text(node.getSubtreeNodeCount() - 1);
            var pathValue = $(".stat.path .stat-value");
            var curHeight = pathValue.height();
            var newHeight = pathValue.height("auto").html(path.join("\\<br>")).height();
            pathValue.stop().height(curHeight).animate({
                height: newHeight
            }, 300);
            var childrenValue = $(".stat.children .stat-value");
            var curHeight = childrenValue.height();
            var newHeight = childrenValue.height("auto").html(children.join("<br>")).height();
            childrenValue.stop().height(curHeight).animate({
                height: newHeight
            }, 300)
        });
        VisualisationHandler.addTreeListener(function(tree) {
            if (tree) {
                var root = tree.getRoot();
                $(".stat.general-height .stat-value").text(root.getHeight());
                $(".stat.general-node-count .stat-value").text(root.getSubtreeNodeCount());
                var size = VisualisationHandler.treeSourceText.length;
                var i = 0;
                while (size > 1024) {
                    size = Math.round(size / 1024);
                    i++
                }
                size = size + ["Bytes", "KB", "MB", "GB", "TB"][i];
                $(".stat.general-size .stat-value").text(size);
                var calcProperties = function calcProperties(node) {
                    var children = node.getChildren();
                    var leafCount = children.length == 0 ? 1 : 0;
                    var averageChildCount = children.length;
                    var subTreeSize = 1;
                    for (var i = 0; i < children.length; i++) {
                        var child = children[i];
                        var properties = calcProperties(child);
                        averageChildCount += properties[1] * properties[2];
                        subTreeSize += properties[2];
                        leafCount += properties[0]
                    }
                    averageChildCount /= subTreeSize;
                    return [leafCount, averageChildCount, subTreeSize]
                };
                var properties = calcProperties(root);
                $(".stat.general-average-child-count .stat-value").text(Math.round(properties[1] * 100) / 100);
                $(".stat.general-leaf-count .stat-value").text(properties[0])
            } else {
                $(".general-stats .stat-value").text("")
            }
        });
        $(".upload-button").click(function(e) {
            $(".select-data").addClass("visible");
            e.stopImmediatePropagation()
        });
        $(".visualization-page").click(function() {
            if ($(".select-data").offset().top > 0) $(".select-data").removeClass("visible")
        });
        $(".select-data").click(function(e) {
            e.stopImmediatePropagation()
        });
        $("input[type=file]").change(function() {
            var blob = this.files[0];
            $(".stat.general-name .stat-value").text(blob.name);
            console.log(blob);
            var alertID = alert({
                message: "Please hold on while the data is being read.",
                duration: Infinity
            });
            VisualisationHandler.readBlob(blob, function() {
                clearAlert(alertID);
                alert("The data has been read successfully." + (VisualisationHandler.getExistingVisualisations().length == 0 ? "\nPlease drag a visualization to a dedicated area to start visualizing your data." : ""))
            });
            $(".select-data").removeClass("visible");
            $(this).replaceWith("<input type=file>")
        });
        for (var i = 0; i < dataSets.length; i++) {
            var dataSet = dataSets[i];
            var el = $("<div class=\"example-data-set\">" + "<div class=\"example-data-set-name\">" + dataSet.name + "</div>" + "</div>");
            el.attr("id", i);
            el.css("background-image", "url('" + dataSet.image + "')");
            $(".example-data-sets").append(el);
            el.click(function() {
                var dataSet = dataSets[$(this).attr("id")];
                VisualisationHandler.readText(dataSet.data);
                $(".stat.general-name .stat-value").text(dataSet.name);
                alert("The data has been loaded successfully." + (VisualisationHandler.getExistingVisualisations().length == 0 ? "\nPlease drag a visualization to a dedicated area to start visualizing your data." : ""));
                $(".select-data").removeClass("visible")
            })
        }
    });

    function updateVisualizationAreaSizes(duration) {
        var updateSize = function updateSize() {
            $(".visualization-area").each(function() {
                var newSize = {
                    width: $(this).width(),
                    height: $(this).height()
                };
                $(this).trigger("resize", newSize)
            })
        };
        var intervalID = setInterval(updateSize, 1);
        setTimeout(function() {
            clearInterval(intervalID);
            updateSize()
        }, duration)
    }

    function escHtml(text) {
        return $("<div/>").text(text).html()
    }

    function catchEvents(element) {
        element.mousemove(function(e) {
            e.stopImmediatePropagation()
        }).mousedown(function(e) {
            e.stopImmediatePropagation()
        }).mouseup(function(e) {
            e.stopImmediatePropagation()
        })
    }

    function attachOptions(options, container) {
        options.onOptionsChange(function(type, option) {
            var name = option.getName();
            var camelCaseName = name.replace(/\s(.?)/g, function(all, g1) {
                return g1.toUpperCase()
            });
            var description = option.getDescription() || name;
            var el;
            if (type == "create") {
                var optionType = option.getType();
                switch (optionType) {
                    case "boolean":
                        el = $(optionTemplates.boolean);
                        el.find(".toggle").click(function() {
                            var on = $(this).is("#on");
                            $(this).attr("id", on ? "off" : "on");
                            option.setValue(!on)
                        }).attr("id", option.getValue() ? "on" : "off");
                        break;
                    case "button":
                        var icon = option.getIcon();
                        if (icon) {
                            el = $(optionTemplates.buttonIcon);
                            el.find(".fa").attr("class", "fa fa-" + icon);
                            option.onIconChange(function(icon) {
                                el.find(".fa").attr("class", "fa-" + icon).addClass("fa")
                            });
                            el.click(function() {
                                option.triggerClick()
                            });
                            el.addClass("option-for-" + camelCaseName);
                            el.attr("title", description);
                            container.find(".frequent-buttons").append(el);
                            return
                        } else {
                            el = $(optionTemplates.button);
                            option.onTextChange(function(text) {
                                el.find(".option-name").text(text)
                            });
                            el.click(function() {
                                option.triggerClick()
                            })
                        }
                        break;
                    case "number":
                        el = $(optionTemplates.number);
                        var updateValue = function updateValue() {
                            var value = $(this).val();
                            option.setValue(value);
                            $(this).val(option.getValue())
                        };
                        el.find("input").change(updateValue).blur(updateValue).val(option.getValue());
                        break;
                    default:
                        return;
                }
                el.addClass("option-for-" + camelCaseName);
                el.find(".option-name").text(name);
                el.attr("title", description);
                container.find(".option-columns").append(el)
            } else if (type == "delete") {
                container.find(".option-for-" + camelCaseName).remove()
            }
            if (container.find(".option-columns .option").length == 0) container.find(".no-options").show();
            else container.find(".no-options").hide()
        })
    }

})();