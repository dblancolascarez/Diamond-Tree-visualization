(function() {
    var _get = function get(object, property, receiver) {
        if (object === null) object = Function.prototype;
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);
            if (parent === null) {
                return undefined
            } else {
                return get(parent, property, receiver)
            }
        } else if ("value" in desc) {
            return desc.value
        } else {
            var getter = desc.get;
            if (getter === undefined) {
                return undefined
            }
            return getter.call(receiver)
        }
    };
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

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass)
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function")
        }
    }
    var Option = function() {
        function Option(name, type) {
            _classCallCheck(this, Option);
            this.name = name;
            this.type = type;
            this.description = "";
            this.listeners = []
        }
        _createClass(Option, [{
            key: "getName",
            value: function getName() {
                return this.name
            }
        }, {
            key: "getType",
            value: function getType() {
                return this.type
            }
        }, {
            key: "getDescription",
            value: function getDescription() {
                return this.description
            }
        }, {
            key: "getValue",
            value: function getValue() {
                return this.value
            }
        }, {
            key: "setDescription",
            value: function setDescription(description) {
                this.description = description;
                return this
            }
        }, {
            key: "setValue",
            value: function setValue(value) {
                var oldValue = this.value;
                this.value = value;
                this.__triggerChange(oldValue);
                return this
            }
        }, {
            key: "onChange",
            value: function onChange(listener) {
                var index = this.listeners.indexOf(listener);
                if (index == -1) this.listeners.push(listener);
                return this
            }
        }, {
            key: "offChange",
            value: function offChange(listener) {
                var index = this.listeners.indexOf(listener);
                if (index != -1) this.listeners.splice(index, 1);
                return this
            }
        }, {
            key: "__triggerChange",
            value: function __triggerChange(oldValue) {
                for (var i = 0; i < this.listeners.length; i++) {
                    this.listeners[i].call(this, this.getValue(), oldValue)
                }
            }
        }]);
        return Option
    }();;
    var BooleanOption = function(_Option) {
        _inherits(BooleanOption, _Option);

        function BooleanOption(name) {
            _classCallCheck(this, BooleanOption);
            return _possibleConstructorReturn(this, (BooleanOption.__proto__ || Object.getPrototypeOf(BooleanOption)).call(this, name, "boolean"))
        }
        return BooleanOption
    }(Option);;
    var ButtonOption = function(_Option2) {
        _inherits(ButtonOption, _Option2);

        function ButtonOption(name) {
            _classCallCheck(this, ButtonOption);
            var _this2 = _possibleConstructorReturn(this, (ButtonOption.__proto__ || Object.getPrototypeOf(ButtonOption)).call(this, name, "button"));
            _this2.clickListeners = [];
            _this2.iconListeners = [];
            return _this2
        }
        _createClass(ButtonOption, [{
            key: "getIcon",
            value: function getIcon() {
                return this.icon
            }
        }, {
            key: "setIcon",
            value: function setIcon(iconName) {
                this.icon = iconName;
                for (var i = 0; i < this.iconListeners.length; i++) {
                    this.iconListeners[i].call(this, iconName)
                }
                return this
            }
        }, {
            key: "onIconChange",
            value: function onIconChange(listener) {
                var index = this.iconListeners.indexOf(listener);
                if (index == -1) this.iconListeners.push(listener);
                return this
            }
        }, {
            key: "offIconChange",
            value: function offIconChange(listener) {
                var index = this.iconListeners.indexOf(listener);
                if (index != -1) this.iconListeners.splice(index, 1);
                return this
            }
        }, {
            key: "getText",
            value: function getText() {
                return this.getValue()
            }
        }, {
            key: "setText",
            value: function setText(text) {
                return this.setValue(text)
            }
        }, {
            key: "onTextChange",
            value: function onTextChange(func) {
                return this.onChange(func)
            }
        }, {
            key: "offTextChange",
            value: function offTextChange(func) {
                return this.offChange(func)
            }
        }, {
            key: "onClick",
            value: function onClick(listener) {
                var index = this.clickListeners.indexOf(listener);
                if (index == -1) this.clickListeners.push(listener);
                return this
            }
        }, {
            key: "offClick",
            value: function offClick(listener) {
                var index = this.clickListeners.indexOf(listener);
                if (index != -1) this.clickListeners.splice(index, 1);
                return this
            }
        }, {
            key: "triggerClick",
            value: function triggerClick() {
                for (var i = 0; i < this.clickListeners.length; i++) {
                    this.clickListeners[i].call(this)
                }
            }
        }]);
        return ButtonOption
    }(Option);;
    var LabelOption = function(_Option3) {
        _inherits(LabelOption, _Option3);

        function LabelOption(name) {
            _classCallCheck(this, LabelOption);
            return _possibleConstructorReturn(this, (LabelOption.__proto__ || Object.getPrototypeOf(LabelOption)).call(this, name, "label"))
        }
        _createClass(LabelOption, [{
            key: "getText",
            value: function getText() {
                return this.getValue()
            }
        }, {
            key: "setText",
            value: function setText(text) {
                return this.setValue(text)
            }
        }, {
            key: "onTextChange",
            value: function onTextChange(func) {
                return this.onChange(func)
            }
        }, {
            key: "offTextChange",
            value: function offTextChange(func) {
                return this.offChange(func)
            }
        }]);
        return LabelOption
    }(Option);;
    var NumberOption = function(_Option4) {
        _inherits(NumberOption, _Option4);

        function NumberOption(name, step, min, max) {
            _classCallCheck(this, NumberOption);
            var _this4 = _possibleConstructorReturn(this, (NumberOption.__proto__ || Object.getPrototypeOf(NumberOption)).call(this, name, "number"));
            _this4.step = step || 0.0001;
            _this4.min = min || -Infinity;
            _this4.max = max || Infinity;
            return _this4
        }
        _createClass(NumberOption, [{
            key: "getMin",
            value: function getMin() {
                return this.min
            }
        }, {
            key: "getStep",
            value: function getStep() {
                return this.step
            }
        }, {
            key: "getMax",
            value: function getMax() {
                return this.max
            }
        }, {
            key: "setValue",
            value: function setValue(value) {
                value = Math.max(this.min, Math.min(this.max, Math.floor(value / this.step) * this.step));
                return _get(NumberOption.prototype.__proto__ || Object.getPrototypeOf(NumberOption.prototype), "setValue", this).call(this, value)
            }
        }]);
        return NumberOption
    }(Option);;
    var StateOption = function(_Option5) {
        _inherits(StateOption, _Option5);

        function StateOption(name, options) {
            _classCallCheck(this, StateOption);
            var _this5 = _possibleConstructorReturn(this, (StateOption.__proto__ || Object.getPrototypeOf(StateOption)).call(this, name, "state"));
            _this5.options = options;
            return _this5
        }
        _createClass(StateOption, [{
            key: "getOptions",
            value: function getOptions() {
                return this.options
            }
        }]);
        return StateOption
    }(Option);;
    var TextOption = function(_Option6) {
        _inherits(TextOption, _Option6);

        function TextOption(name) {
            _classCallCheck(this, TextOption);
            return _possibleConstructorReturn(this, (TextOption.__proto__ || Object.getPrototypeOf(TextOption)).call(this, name, "text"))
        }
        return TextOption
    }(Option);;
    var Options = function() {
        function Options() {
            _classCallCheck(this, Options);
            this.options = {};
            this.listeners = []
        }
        _createClass(Options, [{
            key: "destroy",
            value: function destroy() {
                var keys = Object.keys(this.options);
                for (var i = 0; i < keys.length; i++) {
                    var option = this.getOption(keys[i]);
                    this.remove(option)
                }
                return this
            }
        }, {
            key: "setValue",
            value: function setValue(name, value) {
                var option = this.getOption(name);
                if (option) option.setValue(value);
                return this
            }
        }, {
            key: "getOption",
            value: function getOption(name) {
                return this.options[name]
            }
        }, {
            key: "getValue",
            value: function getValue(name) {
                return this.getOption(name).getValue()
            }
        }, {
            key: "addOption",
            value: function addOption(option) {
                var name = option.getName();
                if (!this.options[name]) {
                    this.options[name] = option;
                    this.__updateOptions("create", option)
                }
                return this
            }
        }, {
            key: "add",
            value: function add(option) {
                return this.addOption(option)
            }
        }, {
            key: "removeOption",
            value: function removeOption(option) {
                var name = option.getName();
                if (this.options[name] == option) {
                    delete this.options[name];
                    this.__updateOptions("delete", option)
                }
                return this
            }
        }, {
            key: "remove",
            value: function remove(option) {
                return this.removeOption(option)
            }
        }, {
            key: "__updateOptions",
            value: function __updateOptions(eventType, option) {
                for (var i = 0; i < this.listeners.length; i++) {
                    var l = this.listeners[i];
                    l.call(this, eventType, option)
                }
                return this
            }
        }, {
            key: "onOptionsChange",
            value: function onOptionsChange(listener) {
                var index = this.listeners.indexOf(listener);
                if (index == -1) {
                    this.listeners.push(listener);
                    var keys = Object.keys(this.options);
                    for (var i = 0; i < keys.length; i++) {
                        var option = this.options[keys[i]];
                        listener.call(this, "create", option)
                    }
                }
                return this
            }
        }, {
            key: "offOptionsChange",
            value: function offOptionsChange(listener) {
                var index = this.listeners.indexOf(listener);
                if (index != -1) this.listeners.splice(index, 1);
                return this
            }
        }]);
        return Options
    }();
    window.Options = Options;
    Options.Boolean = BooleanOption;
    Options.Button = ButtonOption;
    Options.Label = LabelOption;
    Options.Number = NumberOption;
    Options.State = StateOption;
    Options.Text = TextOption;;
    var getXYZ = function getXYZ(x, y, z) {
        if (x.x != null || x.y != null || x.z != null) {
            return {
                x: x.x || 0,
                y: x.y || 0,
                z: x.z || 0
            }
        }
        if (x.x != null || x.y != null || x.z != null) {
            return {
                x: x.x || 0,
                y: x.y || 0,
                z: x.z || 0
            }
        }
        if (x !== undefined && y === undefined && z === undefined) {
            return {
                x: x,
                y: x,
                z: x
            }
        }
        return {
            x: x || 0,
            y: y || 0,
            z: z || 0
        }
    };
    var XYZ = function() {
        function XYZ(x, y, z) {
            _classCallCheck(this, XYZ);
            this.l = [];
            this.set(x || 0, y, z)
        }
        _createClass(XYZ, [{
            key: "onChange",
            value: function onChange(func) {
                this.l.push(func);
                return this
            }
        }, {
            key: "offChange",
            value: function offChange(func) {
                var index = this.l.indexOf(func);
                if (index != -1) this.l.splice(index, 1);
                return this
            }
        }, {
            key: "__fireEvent",
            value: function __fireEvent(old) {
                for (var i = 0; i < this.l.length; i++) {
                    this.l[i].call(this, this, old || this)
                }
            }
        }, {
            key: "set",
            value: function set(x, y, z) {
                var old = {
                    x: this.x,
                    y: this.y,
                    z: this.z
                };
                var xyz = getXYZ(x, y, z);
                this.x = xyz.x;
                this.y = xyz.y;
                this.z = xyz.z;
                this.__fireEvent(old);
                return this
            }
        }, {
            key: "setX",
            value: function setX(x) {
                return this.set(x, this.y, this.z)
            }
        }, {
            key: "getX",
            value: function getX() {
                return this.x
            }
        }, {
            key: "setY",
            value: function setY(y) {
                return this.set(this.x, y, this.z)
            }
        }, {
            key: "getY",
            value: function getY() {
                return this.y
            }
        }, {
            key: "setZ",
            value: function setZ(z) {
                return this.set(this.x, this.y, z)
            }
        }, {
            key: "getZ",
            value: function getZ() {
                return this.z
            }
        }, {
            key: "add",
            value: function add(x, y, z) {
                var xyz = getXYZ(x, y, z);
                return this.set(this.x + xyz.x, this.y + xyz.y, this.z + xyz.z)
            }
        }, {
            key: "sub",
            value: function sub(x, y, z) {
                var xyz = getXYZ(x, y, z);
                return this.set(this.x - xyz.x, this.y - xyz.y, this.z - xyz.z)
            }
        }, {
            key: "mul",
            value: function mul(x, y, z) {
                var xyz = getXYZ(x, y, z);
                return this.set(this.x * xyz.x, this.y * xyz.y, this.z * xyz.z)
            }
        }, {
            key: "div",
            value: function div(x, y, z) {
                var xyz = getXYZ(x, y, z);
                return this.set(this.x / xyz.x, this.y / xyz.y, this.z / xyz.z)
            }
        }, {
            key: "mod",
            value: function mod(x, y, z) {
                var xyz = getXYZ(x, y, z);
                return this.set(xyz.x == 0 ? this.x : this.x % xyz.x, xyz.y == 0 ? this.y : this.y % xyz.y, xyz.z == 0 ? this.z : this.z % xyz.z)
            }
        }, {
            key: "equals",
            value: function equals(x, y, z) {
                var xyz = getXYZ(x, y, z);
                return xyz.x == this.x && xyz.y == this.y && xyz.z == this.z
            }
        }, {
            key: "getVecTo",
            value: function getVecTo(x, y, z) {
                return new Vec(x, y, z).sub(this)
            }
        }]);
        return XYZ
    }();;
    var getXYZ = function getXYZ(x, y, z) {
        if (x.x != null || x.y != null || x.z != null) {
            return {
                x: x.x || 0,
                y: x.y || 0,
                z: x.z || 0
            }
        }
        if (x.x != null || x.y != null || x.z != null) {
            return {
                x: x.x || 0,
                y: x.y || 0,
                z: x.z || 0
            }
        }
        if (x !== undefined && y === undefined && z === undefined) {
            return {
                x: x,
                y: x,
                z: x
            }
        }
        return {
            x: x || 0,
            y: y || 0,
            z: z || 0
        }
    };
    var Vec = function(_XYZ) {
        _inherits(Vec, _XYZ);

        function Vec(x, y, z) {
            _classCallCheck(this, Vec);
            return _possibleConstructorReturn(this, (Vec.__proto__ || Object.getPrototypeOf(Vec)).call(this, x, y, z))
        }
        _createClass(Vec, [{
            key: "isNonZero",
            value: function isNonZero(modifier) {
                modifier = modifier || 1;
                return Math.abs(this.x) > 1e-3 * modifier || Math.abs(this.y) > 1e-3 * modifier || Math.abs(this.z) > 1e-3 * modifier
            }
        }, {
            key: "setAngle",
            value: function setAngle(angle) {
                var zAxisDist = Math.sqrt(this.x * this.x + this.y * this.y);
                var p = Math.atan2(this.z, zAxisDist);
                var length = this.getLength();
                return this.set(Math.cos(angle) * Math.cos(p) * length, Math.sin(angle) * Math.cos(p) * length, Math.sin(p) * length)
            }
        }, {
            key: "getAngle",
            value: function getAngle() {
                return Math.atan2(this.y, this.x)
            }
        }, {
            key: "addAngle",
            value: function addAngle(angle) {
                return this.setAngle(this.getAngle() + angle)
            }
        }, {
            key: "setPYL",
            value: function setPYL(pitch, yaw, length) {
                return this.set(Math.cos(yaw) * Math.cos(pitch) * length, Math.sin(pitch) * length, -Math.sin(yaw) * Math.cos(pitch) * length)
            }
        }, {
            key: "setYaw",
            value: function setYaw(yaw) {
                var pitch = this.getPitch();
                var length = this.getLength();
                return this.setPYL(pitch, yaw, length)
            }
        }, {
            key: "getYaw",
            value: function getYaw() {
                return Math.atan2(-this.z, this.x)
            }
        }, {
            key: "addYaw",
            value: function addYaw(yaw) {
                return this.setYaw(this.getYaw() + yaw)
            }
        }, {
            key: "setPitch",
            value: function setPitch(pitch) {
                var yaw = this.getYaw();
                var length = this.getLength();
                return this.setPYL(pitch, yaw, length)
            }
        }, {
            key: "getPitch",
            value: function getPitch() {
                var yAxisDist = Math.sqrt(this.x * this.x + this.z * this.z);
                return Math.atan2(this.y, yAxisDist)
            }
        }, {
            key: "addPitch",
            value: function addPitch(pitch) {
                return this.setPitch(this.getPitch() + pitch)
            }
        }, {
            key: "setLength",
            value: function setLength(length) {
                var yaw = this.getYaw();
                var pitch = this.getPitch();
                return this.setPYL(pitch, yaw, length)
            }
        }, {
            key: "getLength",
            value: function getLength() {
                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
            }
        }, {
            key: "addLength",
            value: function addLength(length) {
                return this.setLength(this.getLength() + length)
            }
        }, {
            key: "subLength",
            value: function subLength(length) {
                return this.setLength(Math.max(0, this.getLength() - length))
            }
        }, {
            key: "rotate",
            value: function rotate(x, y, z) {
                var XYZ = getXYZ(x, y, z);
                this.addYaw(XYZ.y);
                this.addPitch(XYZ.z);
                return this
            }
        }, {
            key: "getVecToLineSegment",
            value: function getVecToLineSegment(xStart, yStart, zStart, xEnd, yEnd, zEnd) {
                if (xStart instanceof XYZ) {
                    var dir = v3.set(yStart, zStart, xEnd).sub(xStart);
                    var lineVec = this.getVecToLine(dir, xStart, dir.getLength());
                    if (lineVec !== null) return lineVec;
                    var startVec = this.getVecToPoint(xStart);
                    var endVec = this.getVecToPoint(yStart, zStart, xEnd);
                    return startVec.getLength() < endVec.getLength() ? startVec : endVec
                } else {
                    var dir = v3.set(xEnd, yEnd, zEnd).sub(xStart, yStart, zStart);
                    var lineVec = this.getVecToLine(dir, xStart, yStart, zStart, dir.getLength());
                    if (lineVec !== null) return lineVec;
                    var startVec = this.getVecToPoint(xStart, yStart, zStart);
                    var endVec = this.getVecToPoint(xEnd, yEnd, zEnd);
                    return startVec.getLength() < endVec.getLength() ? startVec : endVec
                }
            }
        }, {
            key: "getVecToLine",
            value: function getVecToLine(xDir, yDir, zDir, xOffset, yOffset, zOffset, end) {
                var vec = v1.set(xDir, yDir, zDir);
                var point = new Vec(this);
                if (xDir instanceof XYZ) {
                    if (yDir instanceof XYZ) {
                        point.sub(yDir);
                        end = zDir
                    } else if (yDir != null && zDir != null) {
                        point.sub(yDir, zDir, xOffset);
                        end = yOffset
                    } else {
                        end = yDir
                    }
                } else {
                    if (xOffset instanceof XYZ) {
                        point.sub(xOffset);
                        end = yOffset
                    } else if (xOffset != null && yOffset != null) {
                        point.sub(xOffset, yOffset, zOffset)
                    } else {
                        end = xOffset
                    }
                }
                var yaw = vec.getYaw();
                var pitch = vec.getPitch();
                var projection = v2.set(point);
                projection.addYaw(-yaw);
                projection.setZ(0);
                projection.addPitch(-pitch);
                projection.setY(0);
                if (end != null) {
                    if (projection.getX() < 0) return null;
                    if (projection.getX() > end) return null
                }
                projection.addPitch(pitch).addYaw(yaw);
                return point.sub(projection).mul(-1)
            }
        }, {
            key: "getVecToPoint",
            value: function getVecToPoint(x, y, z) {
                return new Vec(x, y, z).sub(this)
            }
        }, {
            key: "getProjectionOnLine",
            value: function getProjectionOnLine(xDir, yDir, zDir, xOffset, yOffset, zOffset, end) {
                var vec = new Vec(xDir, yDir, zDir);
                var point = new Vec(this);
                if (xDir instanceof XYZ) {
                    if (yDir instanceof XYZ) {
                        point.sub(yDir);
                        end = zDir
                    } else if (yDir != null && zDir != null) {
                        point.sub(yDir, zDir, xOffset);
                        end = yOffset
                    } else {
                        end = yDir
                    }
                } else {
                    if (xOffset instanceof XYZ) {
                        point.sub(xOffset);
                        end = yOffset
                    } else if (xOffset != null && yOffset != null) {
                        point.sub(xOffset, yOffset, zOffset)
                    } else {
                        end = xOffset
                    }
                }
                var yaw = vec.getYaw();
                var pitch = vec.getPitch();
                var projection = v2.set(point);
                projection.addYaw(-yaw);
                projection.setZ(0);
                projection.addPitch(-pitch);
                projection.setY(0);
                if (end != null) {
                    if (projection.getX() < 0) return null;
                    if (projection.getX() > end) return null
                }
                return vec.setLength(projection.getLength()).mul(projection.getX() < 0 ? -1 : 1)
            }
        }, {
            key: "getRot",
            value: function getRot() {
                return new Vec(0, this.getYaw(), this.getPitch())
            }
        }, {
            key: "getLookAt",
            value: function getLookAt() {
                return new Vec(1, 0, 0).setPitch(this.getX()).setYaw(this.getY())
            }
        }]);
        return Vec
    }(XYZ);
    var v1 = new Vec;
    var v2 = new Vec;
    var v3 = new Vec;;
    var Color = function() {
        function Color(red, green, blue, alpha) {
            _classCallCheck(this, Color);
            this.red = red || 0;
            this.green = green || 0;
            this.blue = blue || 0;
            this.alpha = alpha || 1
        }
        _createClass(Color, [{
            key: "a",
            value: function a(alpha) {
                if (alpha != undefined) return this.setAlpha(alpha);
                else return this.getAlpha()
            }
        }, {
            key: "r",
            value: function r(red) {
                if (red != undefined) return this.setRed(red);
                else return this.getRed()
            }
        }, {
            key: "g",
            value: function g(green) {
                if (green != undefined) return this.setGreen(green);
                else return this.getGreen()
            }
        }, {
            key: "b",
            value: function b(blue) {
                if (blue != undefined) return this.setBlue(blue);
                else return this.getBlue()
            }
        }, {
            key: "h",
            value: function h(hue) {
                if (hue != undefined) return this.setHue(hue);
                else return this.getHue()
            }
        }, {
            key: "s",
            value: function s(saturation) {
                if (saturation != undefined) return this.setSaturation(saturation);
                else return this.getSaturation()
            }
        }, {
            key: "v",
            value: function v(value) {
                if (value != undefined) return this.setValue(value);
                else return this.getValue()
            }
        }, {
            key: "setAlpha",
            value: function setAlpha(alpha) {
                this.alpha = alpha;
                return this
            }
        }, {
            key: "setRed",
            value: function setRed(red) {
                this.red = red;
                return this
            }
        }, {
            key: "setGreen",
            value: function setGreen(green) {
                this.green = green;
                return this
            }
        }, {
            key: "setBlue",
            value: function setBlue(blue) {
                this.blue = blue;
                return this
            }
        }, {
            key: "setRGB",
            value: function setRGB(rgb) {
                this.red = rgb[0];
                this.green = rgb[1];
                this.blue = rgb[2];
                return this
            }
        }, {
            key: "setHue",
            value: function setHue(hue) {
                var hsv = this.getHSV();
                hsv[0] = hue;
                return this.setHSV(hsv)
            }
        }, {
            key: "setSaturation",
            value: function setSaturation(saturation) {
                var hsv = this.getHSV();
                hsv[1] = saturation;
                return this.setHSV(hsv)
            }
        }, {
            key: "setValue",
            value: function setValue(value) {
                var hsv = this.getHSV();
                hsv[2] = value;
                return this.setHSV(hsv)
            }
        }, {
            key: "setHSV",
            value: function setHSV(hsv) {
                return this.setRGB(hsvToRgb(hsv))
            }
        }, {
            key: "setInt",
            value: function setInt(color) {
                this.red = (color >> 16) % 256;
                this.green = (color >> 8) % 256;
                this.blue = color % 256;
                return this
            }
        }, {
            key: "getAlpha",
            value: function getAlpha() {
                return this.alpha
            }
        }, {
            key: "getRed",
            value: function getRed() {
                return this.red
            }
        }, {
            key: "getGreen",
            value: function getGreen() {
                return this.green
            }
        }, {
            key: "getBlue",
            value: function getBlue() {
                return this.blue
            }
        }, {
            key: "getRGB",
            value: function getRGB() {
                return [this.red, this.green, this.blue]
            }
        }, {
            key: "getHue",
            value: function getHue() {
                return this.getHSV()[0]
            }
        }, {
            key: "getSaturation",
            value: function getSaturation() {
                return this.getHSV()[1]
            }
        }, {
            key: "getValue",
            value: function getValue() {
                return this.getHSV()[2]
            }
        }, {
            key: "getHSV",
            value: function getHSV() {
                return rgbToHsv([this.red, this.green, this.blue])
            }
        }, {
            key: "getInt",
            value: function getInt() {
                return (Math.round(255 - this.alpha * 255) << 24) + (Math.round(this.red) << 16) + (Math.round(this.green) << 8) + Math.round(this.blue)
            }
        }, {
            key: "getRGBInt",
            value: function getRGBInt() {
                return (Math.round(this.red) << 16) + (Math.round(this.green) << 8) + Math.round(this.blue)
            }
        }, {
            key: "mix",
            value: function mix(color, per) {
                if (!(color instanceof Array)) color = color.getRGB();
                this.setRGB(_mix(this.getRGB(), color, per));
                return this
            }
        }, {
            key: "mixLinear",
            value: function mixLinear(color, per) {
                if (!(color instanceof Array)) color = color.getRGB();
                this.setRGB(_mixLinear(this.getRGB(), color, per));
                return this
            }
        }], [{
            key: "fromHSV",
            value: function fromHSV(hue, saturation, value, alpha) {
                return new Color(0, 0, 0).setHSV([hue, saturation, value]).setAlpha(alpha == undefined ? 1 : alpha)
            }
        }, {
            key: "fromInt",
            value: function fromInt(color) {
                return new Color(0, 0, 0).setInt(color)
            }
        }]);
        return Color
    }();
    var hueColors = [
        [255, 0, 0],
        [255, 255, 0],
        [0, 255, 0],
        [0, 255, 255],
        [0, 0, 255],
        [255, 0, 255]
    ];
    var rgbToHsv = function rgbToHsv(rgb) {
        var p = [
            [0, rgb[0]],
            [1, rgb[1]],
            [2, rgb[2]]
        ];
        p.sort(function(a, b) {
            return a[1] - b[1]
        });
        var l = hueColors.length;
        for (var i = 0; i < l; i++) {
            var c1 = hueColors[i];
            var c2 = hueColors[(i + 1) % l];
            if (c1[p[0][0]] != c2[p[0][0]] || c1[p[0][0]] != 0) continue;
            if (c1[p[2][0]] != c2[p[2][0]] || c1[p[2][0]] != 255) continue;
            if (c1[p[1][0]] == c2[p[1][0]]) continue;
            var saturation = 1 - p[0][1] / p[2][1];
            if (isNaN(saturation)) saturation = 0;
            var value = p[2][1] / 255;
            var dif = p[2][1] - p[0][1];
            var per = (p[1][1] - p[0][1]) / dif;
            if (i % 2 == 1) per = 1 - per;
            var hue = per / l + i / l;
            if (isNaN(hue)) hue = 0;
            var ret = [hue, saturation, value];
            return ret
        }
    };
    var hsvToRgb = function hsvToRgb(hsv) {
        var l = hueColors.length;
        var index = Math.floor(hsv[0] * l);
        var per = hsv[0] * l % 1;
        var c1 = hueColors[index % l];
        var c2 = hueColors[(index + 1) % l];
        var color = _mixLinear(c1, c2, per);
        color = _mixLinear([255, 255, 255], color, hsv[1]);
        return _mixLinear([0, 0, 0], color, hsv[2])
    };
    var _mix = function _mix(color1, color2, per) {
        var r = Math.sqrt(Math.pow(color2[0], 2) * per + Math.pow(color1[0], 2) * (1 - per));
        var g = Math.sqrt(Math.pow(color2[1], 2) * per + Math.pow(color1[1], 2) * (1 - per));
        var b = Math.sqrt(Math.pow(color2[2], 2) * per + Math.pow(color1[2], 2) * (1 - per));
        var a = Math.sqrt(Math.pow(color2[3], 2) * per + Math.pow(color1[3], 2) * (1 - per));
        if (isNaN(a)) a = 255;
        return [Math.round(r), Math.round(g), Math.round(b), Math.round(a)]
    };
    var _mixLinear = function _mixLinear(color1, color2, per) {
        var r = color2[0] * per + color1[0] * (1 - per);
        var g = color2[1] * per + color1[1] * (1 - per);
        var b = color2[2] * per + color1[2] * (1 - per);
        var a = color2[3] * per + color1[3] * (1 - per);
        if (isNaN(a)) a = 255;
        return [Math.round(r), Math.round(g), Math.round(b), Math.round(a)]
    };
    var AbstractCamera = function() {
        function AbstractCamera(graphics) {
            _classCallCheck(this, AbstractCamera);
            this.graphics = graphics;
            this.loc = new XYZ(0, 0, 0);
            this.rot = new Vec(0, 0, 0);
            this.velo = new Vec(0, 0, 0);
            this.rotVelo = new Vec(0, 0, 0);
            this.scale = 1;
            this.scaleVelo = 0;
            this.target = {};
            this.speed = {
                scale: 600,
                rot: 600,
                loc: 600
            };
            this.targetForce = {
                scale: 2,
                rot: 3,
                loc: 3
            };
            this.targetFriction = {
                scale: 0.8,
                rot: 0.8,
                loc: 0.8
            };
            this.targetFullRotations = false;
            var This = this;
            this.loc.onChange(function() {
                This.graphics.__updateHtmlShapesLoc()
            });
            this.rot.onChange(function() {
                This.graphics.__updateHtmlShapesLoc()
            });
            var This = this;
            graphics.onUpdate(function(time) {
                if (This.target.loc) {
                    var delta = This.loc.getVecTo(This.target.loc);
                    This.velo.add(delta.mul(time * This.targetForce.loc))
                }
                if (This.target.rot) {
                    var delta = This.rot.getVecTo(This.target.rot);
                    if (!this.targetFullRotations) delta.mod(Math.PI * 2).add(Math.PI * 3).mod(Math.PI * 2).sub(Math.PI);
                    This.rotVelo.add(delta.mul(time * This.targetForce.rot))
                }
                if (This.target.scale) {
                    var delta = This.target.scale - This.scale;
                    This.scaleVelo += delta * time * This.targetForce.scale
                }
                This.velo.mul(1 - This.targetFriction.loc);
                This.rotVelo.mul(1 - This.targetFriction.rot);
                This.scaleVelo *= 1 - This.targetFriction.scale;
                if (This.velo.getLength() > 1e-6 / This.getScale()) This.loc.add(new Vec(This.velo).mul(time * This.speed.loc));
                if (This.rotVelo.getLength() > 1e-6) This.rot.add(new Vec(This.rotVelo).mul(time * This.speed.rot));
                if (Math.abs(This.scaleVelo) > 1e-5) This.setScale(This.scale + This.scaleVelo * time * This.speed.scale)
            });
            this.windowSizeScaleFactor = 1
        }
        _createClass(AbstractCamera, [{
            key: "__updateLoc",
            value: function __updateLoc() {}
        }, {
            key: "setWindowSize",
            value: function setWindowSize(width, height) {
                var ratio = width / height;
                if (ratio > 16 / 9) {
                    this.windowSizeScaleFactor = height / 1080
                } else {
                    this.windowSizeScaleFactor = width / 1920
                }
                this.setScale(this.getScale());
                return this
            }
        }, {
            key: "getTotalScale",
            value: function getTotalScale() {
                return this.scale * this.windowSizeScaleFactor
            }
        }, {
            key: "setX",
            value: function setX(x) {
                this.loc.setX(x);
                return this
            }
        }, {
            key: "getX",
            value: function getX() {
                return this.loc.getX()
            }
        }, {
            key: "setY",
            value: function setY(y) {
                this.loc.setY(y);
                return this
            }
        }, {
            key: "getY",
            value: function getY() {
                return this.loc.getY()
            }
        }, {
            key: "setZ",
            value: function setZ(z) {
                this.loc.setZ(z);
                return this
            }
        }, {
            key: "getZ",
            value: function getZ() {
                return this.loc.getZ()
            }
        }, {
            key: "setLoc",
            value: function setLoc(x, y, z) {
                this.loc.set(x, y, z);
                return this
            }
        }, {
            key: "getLoc",
            value: function getLoc() {
                return this.loc
            }
        }, {
            key: "setXRot",
            value: function setXRot(x) {
                this.rot.setX(x);
                return this
            }
        }, {
            key: "getXRot",
            value: function getXRot() {
                return this.rot.getX()
            }
        }, {
            key: "setYRot",
            value: function setYRot(y) {
                this.rot.setY(y);
                return this
            }
        }, {
            key: "getYRot",
            value: function getYRot() {
                return this.rot.getY()
            }
        }, {
            key: "setZRot",
            value: function setZRot(z) {
                this.rot.setZ(z);
                return this
            }
        }, {
            key: "getZRot",
            value: function getZRot() {
                return this.rot.getZ()
            }
        }, {
            key: "setRot",
            value: function setRot(x, y, z) {
                this.rot.set(x, y, z);
                return this
            }
        }, {
            key: "getRot",
            value: function getRot() {
                return this.rot
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                this.scale = scale;
                this.graphics.__updateHtmlShapesLoc();
                return this
            }
        }, {
            key: "getScale",
            value: function getScale() {
                return this.scale
            }
        }, {
            key: "getVelo",
            value: function getVelo() {
                return this.velo
            }
        }, {
            key: "getRotVelo",
            value: function getRotVelo() {
                return this.rotVelo()
            }
        }, {
            key: "setScaleVelo",
            value: function setScaleVelo(scaleVelo) {
                this.scaleVelo = scaleVelo;
                return this
            }
        }, {
            key: "getScaleVelo",
            value: function getScaleVelo() {
                return this.scaleVelo
            }
        }, {
            key: "setTargetLoc",
            value: function setTargetLoc(x, y, z) {
                if (x instanceof AbstractShape) x = x.getLoc();
                if (x.x == null) x = new XYZ(x, y, z);
                this.target.loc = x;
                return this
            }
        }, {
            key: "setTargetRot",
            value: function setTargetRot(x, y, z) {
                if (x instanceof AbstractShape) x = x.getRot();
                if (x.x == null) x = new XYZ(x, y, z);
                this.target.rot = x;
                return this
            }
        }, {
            key: "setTargetScale",
            value: function setTargetScale(scale) {
                if (scale instanceof AbstractShape) scale = 1 / scale.getScale();
                this.target.scale = scale;
                return this
            }
        }, {
            key: "setTarget",
            value: function setTarget(loc, rot, scale) {
                this.setTargetLoc(loc);
                this.setTargetRot(rot);
                this.setTargetScale(scale);
                return this
            }
        }, {
            key: "setTargetFullRotations",
            value: function setTargetFullRotations(rotations) {
                this.targetFullRotations = rotations;
                return this
            }
        }, {
            key: "getTargetFullRotations",
            value: function getTargetFullRotations() {
                return this.targetFullRotations
            }
        }, {
            key: "translateScreenToWorldLoc",
            value: function translateScreenToWorldLoc(x, y, z) {}
        }, {
            key: "translateWorldToScreenLoc",
            value: function translateWorldToScreenLoc(x, y, z) {}
        }]);
        return AbstractCamera
    }();;
    var AbstractGraphics = function() {
        function AbstractGraphics(width, height, container, preInit) {
            _classCallCheck(this, AbstractGraphics);
            if (preInit instanceof Function) preInit.call(this);
            this.updateListeners = [];
            this.background = 0;
            if (!height) {
                if (!width) width = $("body");
                if (!container) container = width;
                width = $(container).width();
                height = $(container).height()
            }
            this.size = {
                width: width,
                height: height
            };
            if (!container) container = $("body");
            this.container = $(container);
            this.listeners = {
                mouseClick: [],
                mousePress: [],
                mouseScroll: [],
                mouseMove: [],
                keyPress: []
            };
            this.DOMEventListeners = {};
            this.pressedKeys = {};
            this.shapes = {
                visible: [],
                alive: [],
                active: [],
                html: []
            };
            this.maxNodeCount = 12;
            this.spatialTree = new rbush3d(16, [".aabb.minX", ".aabb.minY", ".aabb.minZ", ".aabb.maxX", ".aabb.maxY", ".aabb.maxZ"]);;
            this.UID = Math.floor(Math.random() * Math.pow(10, 10));
            if (window.debuggingging) this.__setupFpsCounter()
        }
        _createClass(AbstractGraphics, [{
            key: "getCamera",
            value: function getCamera() {
                return this.camera
            }
        }, {
            key: "getSpatialTree",
            value: function getSpatialTree() {
                return this.spatialTree
            }
        }, {
            key: "getUID",
            value: function getUID() {
                return this.UID
            }
        }, {
            key: "__setupFpsCounter",
            value: function __setupFpsCounter() {
                var stats = this.stats = new Stats;
                this.stats.showPanel(0);
                this.getContainer().append(stats.domElement);
                $(stats.domElement).css("position", "absolute")
            }
        }, {
            key: "search",
            value: function search(loc, radius, filter) {
                var tree = this.getSpatialTree();
                if (tree) {
                    var results = tree.search({
                        minX: loc.getX() - radius,
                        minY: loc.getY() - radius,
                        minZ: loc.getZ() - radius,
                        maxX: loc.getX() + radius,
                        maxY: loc.getY() + radius,
                        maxZ: loc.getZ() + radius
                    });
                    if (filter) return results.filter(filter);
                    return results
                }
                return []
            }
        }, {
            key: "pause",
            value: function pause(fully) {}
        }, {
            key: "start",
            value: function start() {}
        }, {
            key: "destroy",
            value: function destroy() {
                for (var i = this.shapes.html.length - 1; i >= 0; i--) {
                    this.shapes.html[i].remove()
                }
            }
        }, {
            key: "getWidth",
            value: function getWidth(canvas) {
                if (canvas) return this.getCanvas().width();
                return this.size.width
            }
        }, {
            key: "getHeight",
            value: function getHeight(canvas) {
                if (canvas) return this.getCanvas().height();
                return this.size.height
            }
        }, {
            key: "getContainer",
            value: function getContainer() {
                return this.container
            }
        }, {
            key: "getCanvas",
            value: function getCanvas() {
                return this.getContainer().find("canvas")
            }
        }, {
            key: "onUpdate",
            value: function onUpdate(listener) {
                var index = this.updateListeners.indexOf(listener);
                if (index == -1) this.updateListeners.push(listener);
                return this
            }
        }, {
            key: "offUpdate",
            value: function offUpdate(listener) {
                var index = this.updateListeners.indexOf(listener);
                if (index != -1) this.updateListeners.splice(index, 1);
                return this
            }
        }, {
            key: "__onUpdate",
            value: function __onUpdate(delta) {
                if (this.stats) this.stats.begin();
                for (var i = 0; i < this.updateListeners.length; i++) {
                    this.updateListeners[i].apply(this, arguments)
                }
                for (var i = 0; i < this.shapes.active.length; i++) {
                    this.shapes.active[i].__triggerUpdate(delta)
                }
                if (this.stats) this.stats.end();
                return this
            }
        }, {
            key: "add",
            value: function add(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    arguments[i].add()
                }
                return this
            }
        }, {
            key: "remove",
            value: function remove(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    arguments[i].remove()
                }
                return this
            }
        }, {
            key: "addShape",
            value: function addShape(shape) {
                return this.add.apply(this, arguments)
            }
        }, {
            key: "removeShape",
            value: function removeShape(shape) {
                return this.remove.apply(this, arguments)
            }
        }, {
            key: "__registerShape",
            value: function __registerShape(shape) {
                this.getShapes().push(shape);
                this.getShapes(true).push(shape)
            }
        }, {
            key: "__deregisterShape",
            value: function __deregisterShape(shape, fully) {
                var shapes = this.getShapes();
                var index = shapes.indexOf(shape);
                if (index != -1) shapes.splice(index, 1);
                if (fully) {
                    var shapes = this.getShapes(true);
                    var index = shapes.indexOf(shape);
                    if (index != -1) shapes.splice(index, 1)
                }
            }
        }, {
            key: "getShapes",
            value: function getShapes(allShapes) {
                if (allShapes) return this.shapes.visible;
                return this.shapes.alive
            }
        }, {
            key: "activateShape",
            value: function activateShape(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    var shape = arguments[i];
                    var index = this.shapes.active.indexOf(shape);
                    if (index == -1) this.shapes.active.push(shape)
                }
                return this
            }
        }, {
            key: "deactivateShape",
            value: function deactivateShape(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    var shape = arguments[i];
                    var index = this.shapes.active.indexOf(shape);
                    if (index != -1) this.shapes.active.splice(index, 1)
                }
                return this
            }
        }, {
            key: "setBackground",
            value: function setBackground(color) {
                this.background = color;
                return this
            }
        }, {
            key: "getBackground",
            value: function getBackground() {
                return this.background
            }
        }, {
            key: "getMouseScreenLoc",
            value: function getMouseScreenLoc() {}
        }, {
            key: "getMouseVec",
            value: function getMouseVec(x, y, z) {}
        }, {
            key: "getMouseLoc",
            value: function getMouseLoc() {}
        }, {
            key: "getMousePressed",
            value: function getMousePressed() {}
        }, {
            key: "isKeyPressed",
            value: function isKeyPressed(key) {
                return !!this.pressedKeys[key.toLowerCase()]
            }
        }, {
            key: "getShapesHtml",
            value: function getShapesHtml() {
                return this.shapes.html
            }
        }, {
            key: "__updateHtmlShapesLoc",
            value: function __updateHtmlShapesLoc() {
                for (var i = 0; i < this.shapes.html.length; i++) {
                    this.shapes.html[i].__updateLoc()
                }
            }
        }, {
            key: "__registerListener",
            value: function __registerListener(type, listener) {
                if (this.listeners[type].indexOf(listener) == -1) this.listeners[type].push(listener);
                return this
            }
        }, {
            key: "__deregisterListener",
            value: function __deregisterListener(type, listener) {
                var index = this.listeners[type].indexOf(listener);
                if (index != -1) this.listeners[type].splice(index, 1);
                return this
            }
        }, {
            key: "__triggerListener",
            value: function __triggerListener(type) {
                var args = Array.from(arguments);
                args.shift();
                var ls = this.listeners[type];
                for (var i = 0; i < ls.length; i++) {
                    ls[i].apply(this, args)
                }
                return this
            }
        }, {
            key: "onClick",
            value: function onClick(func) {
                return this.__registerListener("mouseClick", func)
            }
        }, {
            key: "offClick",
            value: function offClick(func) {
                return this.__deregisterListener("mouseClick", func)
            }
        }, {
            key: "__triggerClick",
            value: function __triggerClick(event) {
                return this.__triggerListener("mouseClick", event)
            }
        }, {
            key: "onMousePress",
            value: function onMousePress(func) {
                return this.__registerListener("mousePress", func)
            }
        }, {
            key: "offMousePress",
            value: function offMousePress(func) {
                return this.__deregisterListener("mousePress", func)
            }
        }, {
            key: "__triggerMousePress",
            value: function __triggerMousePress(down, event) {
                return this.__triggerListener("mousePress", down, event)
            }
        }, {
            key: "onMouseScroll",
            value: function onMouseScroll(func) {
                return this.__registerListener("mouseScroll", func)
            }
        }, {
            key: "offMouseScroll",
            value: function offMouseScroll(func) {
                return this.__deregisterListener("mouseScroll", func)
            }
        }, {
            key: "__triggerMouseScroll",
            value: function __triggerMouseScroll(amount, event) {
                return this.__triggerListener("mouseScroll", amount, event)
            }
        }, {
            key: "onMouseMove",
            value: function onMouseMove(func) {
                return this.__registerListener("mouseMove", func)
            }
        }, {
            key: "offMouseMove",
            value: function offMouseMove(func) {
                return this.__deregisterListener("mouseMove", func)
            }
        }, {
            key: "__triggerMouseMove",
            value: function __triggerMouseMove(pos, event) {
                return this.__triggerListener("mouseMove", pos, event)
            }
        }, {
            key: "onKeyPress",
            value: function onKeyPress(func) {
                return this.__registerListener("keyPress", func)
            }
        }, {
            key: "offKeyPress",
            value: function offKeyPress(func) {
                return this.__deregisterListener("keyPress", func)
            }
        }, {
            key: "__triggerKeyPress",
            value: function __triggerKeyPress(down, key, event) {
                if (down) this.pressedKeys[key.toLowerCase()] = true;
                else delete this.pressedKeys[key.toLowerCase()];
                return this.__triggerListener("keyPress", down, key, event)
            }
        }]);
        return AbstractGraphics
    }();
    AbstractGraphics.getDescription = function() {
        return this.description
    };
    AbstractGraphics.description = {
        name: "VIS" + Math.floor(Math.random() * Math.pow(10, 6)),
        description: "",
        image: ""
    };;
    var AbstractShape = function() {
        function AbstractShape(graphics, preInit) {
            _classCallCheck(this, AbstractShape);
            this.storeInSpatialTree = false;
            if (preInit) preInit.call(this);
            this.graphics = graphics;
            this.transform = {
                loc: new XYZ(0, 0, 0),
                rot: new XYZ(0, 0, 0),
                scale: 1,
                scaleListeners: []
            };
            this.velo = {
                loc: new Vec(0, 0, 0),
                rot: new Vec(0, 0, 0),
                scale: 0
            };
            this.speedFactor = 1;
            this.aabb = {
                minX: 0,
                maxX: 0,
                minY: 0,
                maxY: 0,
                minZ: 0,
                maxZ: 0
            };
            this.color = 0;
            this.isRendered = false;
            this.isRenderedListeners = [];
            this.isAlive = false;
            this.listeners = {
                update: [],
                mouseClick: [],
                mouseHover: [],
                mousePress: [],
                mouseScroll: [],
                mouseMove: [],
                keyPress: []
            };
            this.target = {
                loc: null,
                rot: null,
                scale: null,
                friction: {
                    loc: 0.8,
                    rot: 0.8,
                    scale: 0.7
                },
                speed: {
                    loc: 1,
                    rot: 1,
                    scale: 2
                },
                callback: {
                    loc: null,
                    rot: null,
                    scale: null
                }
            };
            this.updatesDisabled = false;
            this.interactionsDisabled = false;
            var This = this;
            this.transform.loc.onChange(function() {
                This.__updateAABB()
            });
            this.velo.loc.onChange(function() {
                This.__updateUpdates()
            });
            this.__updateAABB()
        }
        _createClass(AbstractShape, [{
            key: "__onDrag",
            value: function __onDrag(location) {}
        }, {
            key: "__registerUpdateListener",
            value: function __registerUpdateListener() {
                return this.onUpdate(this.__onUpdate)
            }
        }, {
            key: "__deregisterUpdateListener",
            value: function __deregisterUpdateListener() {
                return this.offUpdate(this.__onUpdate)
            }
        }, {
            key: "__onUpdate",
            value: function __onUpdate(deltaTime) {
                var velo = this.getVelo();
                if (velo.isNonZero(this.getScale())) this.getLoc().add(new Vec(velo).mul(deltaTime * this.speedFactor));
                var velo = this.getRotVelo();
                if (velo.isNonZero()) this.getRot().add(new Vec(velo).mul(deltaTime * this.speedFactor));
                var velo = this.getScaleVelo();
                if (Math.abs(velo) > 1e-3 * this.getScale()) this.setScale(this.getScale() + velo * deltaTime * this.speedFactor);
                if (this.target.loc != null) {
                    var delta = this.getVecTo(this.target.loc instanceof Function ? this.target.loc.call(this) : this.target.loc);
                    var velo = this.getVelo().mul(this.target.friction.loc).add(delta.mul(this.target.speed.loc));
                    if (delta.getLength() < 1 * this.getScale() && velo.getLength() < 150 * this.getScale() && this.target.callback.loc) {
                        this.target.callback.loc.call(this);
                        this.target.callback.loc = null
                    }
                }
                if (this.target.rot != null) {
                    var delta = this.getRot().getVecTo(this.target.rot instanceof Function ? this.target.rot.call(this) : this.target.rot);
                    var velo = this.getRotVelo().mul(this.target.friction.rot).add(delta.mul(this.target.speed.rot));
                    if (delta.getLength() < 0.1 && velo.getLength() < 0.1 && this.target.callback.rot) {
                        this.target.callback.rot.call(this);
                        this.target.callback.rot = null
                    }
                }
                if (this.target.scale != null) {
                    var delta = (this.target.scale instanceof Function ? this.target.scale.call(this) : this.target.scale) - this.getScale();
                    this.setScaleVelo(this.getScaleVelo() * this.target.friction.scale + delta * this.target.speed.scale);
                    if (delta < 0.01 * Math.max(0.01, this.getScale()) && Math.abs(this.getScaleVelo()) < 0.05 * Math.max(0.01, this.getScale()) && this.target.callback.scale) {
                        this.target.callback.scale.call(this);
                        this.target.callback.scale = null
                    }
                }
                return this
            }
        }, {
            key: "setX",
            value: function setX(x) {
                this.transform.loc.setX(x);
                return this
            }
        }, {
            key: "getX",
            value: function getX() {
                return this.transform.loc.getX()
            }
        }, {
            key: "setY",
            value: function setY(y) {
                this.transform.loc.setY(y);
                return this
            }
        }, {
            key: "getY",
            value: function getY() {
                return this.transform.loc.getY()
            }
        }, {
            key: "setZ",
            value: function setZ(z) {
                this.transform.loc.setZ(z);
                return this
            }
        }, {
            key: "getZ",
            value: function getZ() {
                return this.transform.loc.getZ()
            }
        }, {
            key: "setLoc",
            value: function setLoc(x, y, z) {
                this.transform.loc.set(x, y, z);
                return this
            }
        }, {
            key: "getLoc",
            value: function getLoc() {
                return this.transform.loc
            }
        }, {
            key: "getAbsoluteX",
            value: function getAbsoluteX() {}
        }, {
            key: "getAbsoluteY",
            value: function getAbsoluteY() {}
        }, {
            key: "setXRot",
            value: function setXRot(x) {
                this.transform.rot.setX(x);
                return this
            }
        }, {
            key: "getXRot",
            value: function getXRot() {
                return this.transform.rot.getX()
            }
        }, {
            key: "setYRot",
            value: function setYRot(y) {
                this.transform.rot.setY(y);
                return this
            }
        }, {
            key: "getYRot",
            value: function getYRot() {
                return this.transform.rot.getY()
            }
        }, {
            key: "setZRot",
            value: function setZRot(z) {
                this.transform.rot.setZ(z);
                return this
            }
        }, {
            key: "getZRot",
            value: function getZRot() {
                return this.transform.rot.getZ()
            }
        }, {
            key: "setRot",
            value: function setRot(x, y, z) {
                this.transform.rot.set(x, y, z);
                return this
            }
        }, {
            key: "getRot",
            value: function getRot() {
                return this.transform.rot
            }
        }, {
            key: "getScale",
            value: function getScale() {
                return this.transform.scale
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                this.transform.scale = scale;
                this.__updateAABB();
                this.__triggerScaleChange();
                return this
            }
        }, {
            key: "onScaleChange",
            value: function onScaleChange(func) {
                var index = this.transform.scaleListeners.indexOf(func);
                if (index == -1) this.transform.scaleListeners.push(func);
                return this
            }
        }, {
            key: "offScaleChange",
            value: function offScaleChange(func) {
                var index = this.transform.scaleListeners.indexOf(func);
                if (index != -1) this.transform.scaleListeners.splice(index, 1);
                return this
            }
        }, {
            key: "__triggerScaleChange",
            value: function __triggerScaleChange() {
                for (var i = 0; i < this.transform.scaleListeners.length; i++) {
                    this.transform.scaleListeners[i].call(this, this.transform.scale)
                }
            }
        }, {
            key: "getVelo",
            value: function getVelo() {
                return this.velo.loc
            }
        }, {
            key: "getRotVelo",
            value: function getRotVelo() {
                return this.velo.rot
            }
        }, {
            key: "getScaleVelo",
            value: function getScaleVelo() {
                return this.velo.scale
            }
        }, {
            key: "setScaleVelo",
            value: function setScaleVelo(scaleVelo) {
                this.velo.scale = scaleVelo;
                return this
            }
        }, {
            key: "setTargetLoc",
            value: function setTargetLoc(loc, friction, speed, onReach) {
                if (typeof friction == "function") {
                    onReach = friction;
                    friction = null
                } else if (typeof speed == "function") {
                    onReach = speed;
                    speed = null
                }
                this.getVelo().setLength(0);
                this.target.loc = loc;
                if (friction != null) this.target.friction.loc = friction;
                if (speed) this.target.speed.loc = speed;
                if (onReach) this.target.callback.loc = onReach;
                return this
            }
        }, {
            key: "setTargetRot",
            value: function setTargetRot(rot, friction, speed, onReach) {
                if (typeof friction == "function") {
                    onReach = friction;
                    friction = null
                } else if (typeof speed == "function") {
                    onReach = speed;
                    speed = null
                }
                this.target.rot = rot;
                if (friction != null) this.target.friction.rot = friction;
                if (speed) this.target.speed.rot = speed;
                if (onReach) this.target.callback.rot = onReach;
                return this
            }
        }, {
            key: "setTargetScale",
            value: function setTargetScale(scale, friction, speed, onReach) {
                if (typeof friction == "function") {
                    onReach = friction;
                    friction = null
                } else if (typeof speed == "function") {
                    onReach = speed;
                    speed = null
                }
                this.target.scale = scale;
                if (friction != null) this.target.friction.scale = friction;
                if (speed) this.target.speed.scale = speed;
                if (onReach) this.target.callback.scale = onReach;
                return this
            }
        }, {
            key: "setColor",
            value: function setColor(color) {
                this.color = color;
                this.setAlpha(1 - Math.floor(color / 16777215) / 255);
                return this
            }
        }, {
            key: "getColor",
            value: function getColor() {
                return this.color
            }
        }, {
            key: "setAlpha",
            value: function setAlpha(alpha) {
                this.alpha = alpha;
                return this
            }
        }, {
            key: "getAlpha",
            value: function getAlpha() {
                return this.alpha
            }
        }, {
            key: "__registerListener",
            value: function __registerListener(type, listener) {
                if (this.listeners[type].indexOf(listener) == -1) this.listeners[type].push(listener);
                this.__updateInteraction();
                return this
            }
        }, {
            key: "__deregisterListener",
            value: function __deregisterListener(type, listener) {
                var index = this.listeners[type].indexOf(listener);
                if (index != -1) this.listeners[type].splice(index, 1);
                this.__updateInteraction();
                return this
            }
        }, {
            key: "__triggerListener",
            value: function __triggerListener(type) {
                var args = Array.from(arguments);
                args.shift();
                var ls = this.listeners[type];
                for (var i = 0; i < ls.length; i++) {
                    if (ls[i].apply(this, args)) return true
                }
            }
        }, {
            key: "onClick",
            value: function onClick(func) {
                return this.__registerListener("mouseClick", func)
            }
        }, {
            key: "offClick",
            value: function offClick(func) {
                return this.__deregisterListener("mouseClick", func)
            }
        }, {
            key: "__triggerClick",
            value: function __triggerClick(event) {
                return this.__triggerListener("mouseClick", event)
            }
        }, {
            key: "onHover",
            value: function onHover(func) {
                return this.__registerListener("mouseHover", func)
            }
        }, {
            key: "offHover",
            value: function offHover(func) {
                return this.__deregisterListener("mouseHover", func)
            }
        }, {
            key: "__triggerHover",
            value: function __triggerHover(hover, event) {
                return this.__triggerListener("mouseHover", hover, event)
            }
        }, {
            key: "onMousePress",
            value: function onMousePress(func) {
                return this.__registerListener("mousePress", func)
            }
        }, {
            key: "offMousePress",
            value: function offMousePress(func) {
                return this.__deregisterListener("mousePress", func)
            }
        }, {
            key: "__triggerMousePress",
            value: function __triggerMousePress(down, event) {
                return this.__triggerListener("mousePress", down, event)
            }
        }, {
            key: "onMouseScroll",
            value: function onMouseScroll(func) {
                return this.__registerListener("mouseScroll", func)
            }
        }, {
            key: "offMouseScroll",
            value: function offMouseScroll(func) {
                return this.__deregisterListener("mouseScroll", func)
            }
        }, {
            key: "__triggerMouseScroll",
            value: function __triggerMouseScroll(amount, event) {
                return this.__triggerListener("mouseScroll", amount, event)
            }
        }, {
            key: "onMouseMove",
            value: function onMouseMove(func) {
                return this.__registerListener("mouseMove", func)
            }
        }, {
            key: "offMouseMove",
            value: function offMouseMove(func) {
                return this.__deregisterListener("mouseMove", func)
            }
        }, {
            key: "__triggerMouseMove",
            value: function __triggerMouseMove(pos, event) {
                return this.__triggerListener("mouseMove", pos, event)
            }
        }, {
            key: "onKeyPress",
            value: function onKeyPress(func) {
                return this.__registerListener("keyPress", func)
            }
        }, {
            key: "offKeyPress",
            value: function offKeyPress(func) {
                return this.__deregisterListener("keyPress", func)
            }
        }, {
            key: "__triggerKeyPress",
            value: function __triggerKeyPress(down, key, event) {
                return this.__triggerListener("keyPress", down, key, event)
            }
        }, {
            key: "__updateInteraction",
            value: function __updateInteraction(internally) {
                if (!this.interactionDisabled)
                    if (this.listeners.mouseClick.length == 0 && this.listeners.mouseHover.length == 0 && this.listeners.mousePress.length == 0 && this.listeners.mouseScroll.length == 0 && this.listeners.mouseMove.length == 0 && this.listeners.keyPress.length == 0) this.disableInteraction(true);
                    else this.enableInteraction(true)
            }
        }, {
            key: "enableInteraction",
            value: function enableInteraction(internally) {
                if (!internally) this.interactionsDisabled = false
            }
        }, {
            key: "disableInteraction",
            value: function disableInteraction(internally) {
                if (!internally) this.interactionsDisabled = true
            }
        }, {
            key: "onUpdate",
            value: function onUpdate(listener) {
                if (this.listeners.update.indexOf(listener) == -1) this.listeners.update.push(listener);
                this.__updateUpdates();
                return this
            }
        }, {
            key: "offUpdate",
            value: function offUpdate(listener) {
                var index = this.listeners.update.indexOf(listener);
                if (index != -1) this.listeners.update.splice(index, 1);
                this.__updateUpdates();
                return this
            }
        }, {
            key: "__triggerUpdate",
            value: function __triggerUpdate() {
                for (var i = 0; i < this.listeners.update.length; i++) {
                    this.listeners.update[i].apply(this, arguments)
                }
                return this
            }
        }, {
            key: "__updateUpdates",
            value: function __updateUpdates() {
                if (!this.updatesDisabled)
                    if (this.listeners.update.length == 0) this.disableUpdates(true);
                    else this.enableUpdates(true)
            }
        }, {
            key: "enableUpdates",
            value: function enableUpdates(internally) {
                if (!internally) this.updatesDisabled = false;
                this.graphics.activateShape(this);
                return this
            }
        }, {
            key: "disableUpdates",
            value: function disableUpdates(internally) {
                if (!internally) this.updatesDisabled = true;
                this.graphics.deactivateShape(this);
                return this
            }
        }, {
            key: "__setParentShape",
            value: function __setParentShape(parent) {
                this.parentShape = parent;
                this.__triggerRenderChange();
                var tree = this.__getTree();
                if (parent) {
                    this.__updateAABB();
                    if (tree && this.storeInSpatialTree) tree.insert(this)
                } else {
                    if (tree && this.storeInSpatialTree) tree.remove(this)
                }
                return this
            }
        }, {
            key: "getParentShape",
            value: function getParentShape() {
                return this.parentShape
            }
        }, {
            key: "getWorldLoc",
            value: function getWorldLoc() {
                return this.getLoc()
            }
        }, {
            key: "getWorldScale",
            value: function getWorldScale() {
                return this.getScale()
            }
        }, {
            key: "getWorldAngle",
            value: function getWorldAngle() {
                return this.getAngle()
            }
        }, {
            key: "getGraphics",
            value: function getGraphics() {
                return this.graphics
            }
        }, {
            key: "add",
            value: function add() {
                this.graphics.__registerShape(this);
                this.__updateUpdates();
                var tree = this.__getTree();
                if (tree && this.storeInSpatialTree) tree.insert(this);
                this.isRendered = true;
                this.isAlive = true;
                this.__triggerRenderChange();
                return this
            }
        }, {
            key: "remove",
            value: function remove(dontDelete) {
                this.graphics.__deregisterShape(this);
                this.isAlive = false;
                if (dontDelete) return this;
                return this.__delete()
            }
        }, {
            key: "__delete",
            value: function __delete() {
                if (!this.isAlive) {
                    this.graphics.__deregisterShape(this, true);
                    this.disableUpdates(true);
                    var tree = this.__getTree();
                    if (tree && this.storeInSpatialTree) tree.remove(this);
                    this.isRendered = false;
                    this.__triggerRenderChange();
                    return this
                }
            }
        }, {
            key: "getIsRendered",
            value: function getIsRendered() {
                return this.isRendered
            }
        }, {
            key: "getIsAlive",
            value: function getIsAlive() {
                return this.isAlive
            }
        }, {
            key: "onRendererChange",
            value: function onRendererChange(func) {
                var index = this.isRenderedListeners.indexOf(func);
                if (index == -1) this.isRenderedListeners.push(func);
                return this
            }
        }, {
            key: "offRendererChange",
            value: function offRendererChange(func) {
                var index = this.isRenderedListeners.indexOf(func);
                if (index != -1) this.isRenderedListeners.splice(index, 1);
                return this
            }
        }, {
            key: "__triggerRenderChange",
            value: function __triggerRenderChange() {
                if (this.parentShape) {
                    this.isRendered = this.parentShape.isRendered;
                    this.isAlive = this.isRendered
                }
                if (window.debugging == 2) this.__updateAABB();
                for (var i = 0; i < this.isRenderedListeners.length; i++) {
                    this.isRenderedListeners[i].call(this, this.isRendered)
                }
            }
        }, {
            key: "getVecTo",
            value: function getVecTo(x, y, z) {
                if (x instanceof AbstractShape) x = x.getLoc();
                return new Vec(x, y, z).sub(this.getLoc())
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                return 0
            }
        }, {
            key: "__getRadiusPadding",
            value: function __getRadiusPadding() {
                return this.__getRadius() * this.getWorldScale() / 2
            }
        }, {
            key: "__getTree",
            value: function __getTree() {
                return this.graphics.getSpatialTree()
            }
        }, {
            key: "__updateAABB",
            value: function __updateAABB() {
                if (this.storeInSpatialTree) {
                    var minRad = this.__getRadius() * this.getWorldScale();
                    var loc = this.getWorldLoc();
                    if (this.aabb.minX > loc.getX() - minRad || this.aabb.minY > loc.getY() - minRad || this.aabb.minZ > loc.getZ() - minRad || this.aabb.maxX < loc.getX() + minRad || this.aabb.maxY < loc.getY() + minRad || this.aabb.maxZ < loc.getZ() + minRad) {
                        var tree = this.__getTree();
                        if (tree) tree.remove(this);
                        var maxRad = minRad + this.__getRadiusPadding();
                        this.aabb = {
                            minX: loc.getX() - maxRad,
                            minY: loc.getY() - maxRad,
                            minZ: loc.getZ() - maxRad,
                            maxX: loc.getX() + maxRad,
                            maxY: loc.getY() + maxRad,
                            maxZ: loc.getZ() + maxRad
                        };
                        if (tree) tree.insert(this)
                    }
                    if (window.debugging == 2) {
                        if (!this.aabbCube) {
                            if (this instanceof Shape3d) this.aabbCube = new Cuboid3d(this.graphics, 0, 0, 0, 255).setAlpha(0.15);
                            if (this instanceof Shape2d) this.aabbCube = new Rectangle2d(this.graphics, 0, 0, 255).setAlpha(0.15)
                        }
                        if (this instanceof Shape3d) this.aabbCube.setSize(this.aabb.maxX - this.aabb.minX, this.aabb.maxY - this.aabb.minY, this.aabb.maxZ - this.aabb.minZ).setLoc((this.aabb.maxX + this.aabb.minX) / 2, (this.aabb.maxY + this.aabb.minY) / 2, (this.aabb.maxZ + this.aabb.minZ) / 2).updateTransform();
                        if (this instanceof Shape3d) {
                            if (!this.aabbCube.isRendered && this.isRendered) this.graphics.__getScene().add(this.aabbCube.mesh);
                            if (this.aabbCube.isRendered && !this.isRendered) this.graphics.__getScene().remove(this.aabbCube.mesh)
                        }
                    }
                }
                return this
            }
        }, {
            key: "search",
            value: function search(radius, filter) {
                var tree = this.__getTree();
                if (tree) {
                    var loc = this.getWorldLoc();
                    var results = tree.search({
                        minX: loc.getX() - radius,
                        minY: loc.getY() - radius,
                        minZ: loc.getZ() - radius,
                        maxX: loc.getX() + radius,
                        maxY: loc.getY() + radius,
                        maxZ: loc.getZ() + radius
                    });
                    var This = this;
                    if (filter) return results.filter(function(val) {
                        return val != This && filter.call(val, val)
                    });
                    return results.filter(function(val) {
                        return val != This
                    })
                }
                return []
            }
        }]);
        return AbstractShape
    }();;
    var AbstractNodeShape = function(_AbstractShape) {
        _inherits(AbstractNodeShape, _AbstractShape);

        function AbstractNodeShape() {
            _classCallCheck(this, AbstractNodeShape);
            return _possibleConstructorReturn(this, (AbstractNodeShape.__proto__ || Object.getPrototypeOf(AbstractNodeShape)).call(this))
        }
        _createClass(AbstractNodeShape, [{
            key: "__setupNodeShape",
            value: function __setupNodeShape(node) {
                this.node = node;
                this.connectionHasBeenSetup = false;
                this.parent = null;
                this.children = [];
                this.__init();
                this.state = {
                    expanded: this.node.getChildren().length == 0,
                    selected: false,
                    highlighted: false,
                    focused: false,
                    dragged: false
                };
                var parent = this.__getParentFromNode();
                this.__connectParent(parent)
            }
        }, {
            key: "getNode",
            value: function getNode() {
                return this.node
            }
        }, {
            key: "destroy",
            value: function destroy(callback) {
                this.getNode().removeShape(this.graphics.getUID(), this);
                this.destroyCallback = callback;
                this.remove();
                this.graphics.__deregisterShapeNode(this);
                return this
            }
        }, {
            key: "getVisualisation",
            value: function getVisualisation() {
                return this.getGraphics()
            }
        }, {
            key: "__show",
            value: function __show() {}
        }, {
            key: "__hide",
            value: function __hide() {
                return true
            }
        }, {
            key: "__stateChanged",
            value: function __stateChanged(field, val, oldState) {}
        }, {
            key: "__connectParent",
            value: function __connectParent(parent) {}
        }, {
            key: "__changeState",
            value: function __changeState(field, value) {
                var oldState = Object.assign({}, this.state);
                this.state[field] = value;
                var changed = oldState[field] != this.state[field];
                this.__stateChanged(changed ? field : null, changed ? value : null, oldState);
                return this
            }
        }, {
            key: "__getClass",
            value: function __getClass(node) {
                var getFromGFX = this.graphics.__getNodeShapeClass;
                if (getFromGFX) return getFromGFX.call(this.graphics, Visualisation2d.classes, node);
                return this.__proto__.constructor
            }
        }, {
            key: "__init",
            value: function __init() {
                var UID = this.graphics.getUID();
                var prevShape = this.node.getShape(UID);
                this.graphics.__registerShapeNode(this);
                if (prevShape == this) return;
                if (prevShape != null) {
                    console.warn("A shape in the tree got overwritten", prevShape);
                    prevShape.remove()
                }
                this.node.addShape(UID, this)
            }
        }, {
            key: "__addNode",
            value: function __addNode() {
                if (this.children.length == 0) {
                    this.graphics.__registerShapeLeave(this);
                    this.graphics.__registerShapeRoot(this);
                    if (this.__getChildNodes().length != this.children.length) this.graphics.__registerShapeCollapsed(this);
                    this.__changeState("expanded", this.node.getChildren().length == 0);
                    var parent = this.__getParentFromNode(true);
                    if (parent) this.__setParent(parent);
                    var children = this.__getChildrenFromNode(true);
                    for (var i = 0; i < children.length; i++) {
                        this.__addChild(children[i])
                    }
                    this.__stateChanged(null, null, this.state);
                    this.__show()
                }
                return this
            }
        }, {
            key: "__removeNode",
            value: function __removeNode() {
                return !this.__hide()
            }
        }, {
            key: "__deleteNode",
            value: function __deleteNode() {
                parent = this.getParent();
                if (parent && parent.__removeChild) parent.__removeChild(this);
                for (var i = 0; i < this.children.length; i++) {
                    this.children[i].__setParent(null)
                }
                this.__setParent(null);
                this.children = [];
                this.graphics.__deregisterShapeRoot(this);
                this.graphics.__deregisterShapeCollapsed(this);
                this.graphics.__deregisterShapeLeave(this);
                if (this.destroyCallback) {
                    this.destroyCallback();
                    delete this.destroyCallback
                }
                return this
            }
        }, {
            key: "__setParent",
            value: function __setParent(parentShape) {
                if (this.parent != parentShape) {
                    this.parent = parentShape;
                    if (parentShape) {
                        parentShape.__addChild(this);
                        this.graphics.__deregisterShapeRoot(this)
                    } else {
                        this.graphics.__registerShapeRoot(this)
                    }
                }
                return this
            }
        }, {
            key: "__addChild",
            value: function __addChild(childShape) {
                var index = this.children.indexOf(childShape);
                if (index == -1) {
                    this.children.push(childShape);
                    childShape.__setParent(this);
                    if (this.children.length == 1) this.graphics.__deregisterShapeLeave(this);
                    if (this.__getChildNodes().length == this.children.length) {
                        this.graphics.__deregisterShapeCollapsed(this);
                        this.__changeState("expanded", true)
                    }
                }
                return this
            }
        }, {
            key: "__removeChild",
            value: function __removeChild(childShape) {
                var index = this.children.indexOf(childShape);
                if (index != -1) {
                    if (this.__getChildNodes().length == this.children.length) this.graphics.__registerShapeCollapsed(this);
                    this.children.splice(index, 1);
                    if (this.getIsAlive()) {
                        if (this.children.length == 0) this.graphics.__registerShapeLeave(this);
                        this.__changeState("expanded", false)
                    }
                }
                return this
            }
        }, {
            key: "getParent",
            value: function getParent(onlyAlive) {
                if (!onlyAlive || this.parent && this.parent.getIsAlive()) return this.parent
            }
        }, {
            key: "isParent",
            value: function isParent(shape) {
                return this.parent == shape
            }
        }, {
            key: "isRoot",
            value: function isRoot() {
                return !this.parent
            }
        }, {
            key: "isLeave",
            value: function isLeave() {
                return this.children.length == 0
            }
        }, {
            key: "getChildren",
            value: function getChildren(onlyAlive) {
                if (!onlyAlive) return this.children;
                var ret = [];
                for (var i = 0; i < this.children.length; i++) {
                    var child = this.children[i];
                    if (child.getIsAlive()) ret.push(child)
                }
                return ret
            }
        }, {
            key: "isChild",
            value: function isChild(shape) {
                return this.children.indexOf(shape) != -1
            }
        }, {
            key: "getAncestors",
            value: function getAncestors(depth, onlyAlive) {
                if (depth == null) depth = Infinity;
                if (depth <= 0) return [];
                var ret = [];
                var p = this.getParent(onlyAlive);
                if (p) {
                    ret.push(p);
                    ret.push.apply(ret, p.getAncestors(depth - 1))
                }
                return ret
            }
        }, {
            key: "getAncestorsTo",
            value: function getAncestorsTo(shape) {
                var ret = [];
                var p = this.getParent();
                if (p && p != shape) {
                    ret.push(p);
                    ret.push.apply(ret, p.getAncestors(depth - 1))
                }
                return ret
            }
        }, {
            key: "getDescendants",
            value: function getDescendants(depth, onlyAlive) {
                if (depth == null) depth = Infinity;
                if (depth <= 0) return [];
                var ret = [];
                var children = this.getChildren(onlyAlive);
                ret.push.apply(ret, children);
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    ret.push.apply(ret, child.getDescendants(depth - 1))
                }
                return ret
            }
        }, {
            key: "getConnectedNodeShape",
            value: function getConnectedNodeShape(onlyAlive) {
                var parent = this.getParent(onlyAlive);
                if (parent) return parent;
                return this.getChildren(onlyAlive)[0]
            }
        }, {
            key: "__getParentFromNode",
            value: function __getParentFromNode(requiresRendered) {
                var parentNode = this.__getParentNode();
                if (parentNode) {
                    var shape = parentNode.getShape(this.graphics.getUID());
                    return shape.getIsRendered() || !requiresRendered ? shape : undefined
                }
            }
        }, {
            key: "__getChildrenFromNode",
            value: function __getChildrenFromNode(requiresRendered) {
                var UID = this.graphics.getUID();
                var children = [];
                var nodeChildren = this.__getChildNodes();
                if (nodeChildren) {
                    for (var i = 0; i < nodeChildren.length; i++) {
                        var shape = nodeChildren[i].getShape(UID);
                        if (shape && (shape.getIsRendered() || !requiresRendered)) children.push(shape)
                    }
                }
                return children
            }
        }, {
            key: "__getMissingChildNodes",
            value: function __getMissingChildNodes() {
                var UID = this.graphics.getUID();
                var children = [];
                var nodeChildren = this.__getChildNodes();
                if (nodeChildren) {
                    for (var i = 0; i < nodeChildren.length; i++) {
                        var shape = nodeChildren[i].getShape(UID);
                        if (!shape || !shape.getIsRendered()) children.push(nodeChildren[i])
                    }
                }
                return children
            }
        }, {
            key: "__getChildNodes",
            value: function __getChildNodes() {
                return this.node.getChildren()
            }
        }, {
            key: "__getParentNode",
            value: function __getParentNode() {
                return this.node.getParent()
            }
        }, {
            key: "getDepth",
            value: function getDepth() {
                return this.node.getDepth()
            }
        }, {
            key: "getIndex",
            value: function getIndex() {
                return this.__getParentNode() ? this.__getParentNode().getChildren().indexOf(this.node) : 0
            }
        }, {
            key: "__createChildNodeShape",
            value: function __createChildNodeShape(node, parent) {
                return new(this.__getClass(node))(this.getGraphics(), node)
            }
        }, {
            key: "createParent",
            value: function createParent(dontAdd) {
                if (!this.getParent()) {
                    var UID = this.graphics.getUID();
                    var parentNode = this.__getParentNode();
                    if (parentNode) {
                        var shape = parentNode.getShape(UID);
                        if (!dontAdd) shape.add();
                        return shape
                    }
                }
            }
        }, {
            key: "createAncestors",
            value: function createAncestors(depth, dontAdd) {
                if (depth == null) depth = 1;
                var ret = [];
                if (depth >= 1) {
                    var p = this.createParent(dontAdd);
                    if (p) ret.push(p);
                    var p = this.getParent();
                    if (p) ret.push.apply(ret, p.createAncestors(depth - 1))
                }
                return ret
            }
        }, {
            key: "destroyParent",
            value: function destroyParent() {
                var parent = this.getParent();
                if (parent) {
                    return parent.remove()
                }
            }
        }, {
            key: "destroyAncestors",
            value: function destroyAncestors(depth, fully, keep) {
                if (depth == null) depth = 0;
                var ret = [];
                var parent = this.getParent();
                if (parent && parent != keep) {
                    if (fully) ret.push.apply(ret, parent.destroyDescendants(0, [this]));
                    ret.push.apply(ret, parent.destroyAncestors(depth - 1, fully));
                    if (depth <= 0) ret.push(parent.remove())
                }
                return ret
            }
        }, {
            key: "createChild",
            value: function createChild(node, dontAdd) {
                var UID = this.graphics.getUID();
                if (!node) {
                    var missingChildNodes = this.__getMissingChildNodes();
                    node = missingChildNodes[0]
                }
                if (node) {
                    var shape = node.getShape(UID);
                    if (!shape) shape = this.__createChildNodeShape(node, this);
                    if (!dontAdd) shape.add();
                    return shape
                }
            }
        }, {
            key: "createChildren",
            value: function createChildren(dontAdd) {
                var UID = this.graphics.getUID();
                var missingChildNodes = this.__getMissingChildNodes();
                var ret = [];
                for (var i = 0; i < missingChildNodes.length; i++) {
                    var node = missingChildNodes[i];
                    var shape = node.getShape(UID);
                    if (!shape) shape = this.__createChildNodeShape(node, this);
                    if (!dontAdd) shape.add();
                    ret.push(shape)
                }
                return ret
            }
        }, {
            key: "createDescendants",
            value: function createDescendants(depth, dontAdd) {
                if (depth == null) depth = 1;
                var ret = [];
                var UID = this.graphics.getUID();
                var shapes = this.graphics.getShapes();
                var max = this.graphics.getMaxNodeCount();
                var que = [{
                    depth: depth,
                    shape: this
                }];
                outer: while (que.length > 0) {
                    var data = que.shift();
                    var pShape = data.shape;
                    var children = pShape.__getChildNodes();
                    for (var i = 0; i < children.length; i++) {
                        var node = children[i];
                        var shape = node.getShape(UID);
                        if (!shape) shape = pShape.__createChildNodeShape(node, pShape);
                        if (!shape.getIsRendered()) {
                            if (!dontAdd) shape.add();
                            ret.push(shape)
                        }
                        if (data.depth > 1) que.push({
                            depth: data.depth - 1,
                            shape: shape
                        });
                        if (shapes.length > max) break outer
                    }
                }
                return ret
            }
        }, {
            key: "destroyChildren",
            value: function destroyChildren(keep) {
                var children = this.getChildren();
                for (var i = children.length - 1; i >= 0; i--) {
                    var child = children[i];
                    if (!keep || keep.indexOf(child) == -1) child.remove()
                }
                return children
            }
        }, {
            key: "destroyDescendants",
            value: function destroyDescendants(depth, keep) {
                if (depth == null) depth = 0;
                if (keep && !(keep instanceof Array)) keep = [keep];
                var ret = [];
                var children = this.getChildren();
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (!keep || keep.indexOf(child) == -1) ret.push.apply(ret, child.destroyDescendants(depth - 1, keep))
                }
                if (depth <= 0) ret.push.apply(ret, this.destroyChildren(keep));
                else {
                    var shapes = this.graphics.getShapes();
                    var max = this.graphics.getMaxNodeCount();
                    var children = this.getChildren();
                    while (shapes.length > max && children.length > 0) {
                        children[0].remove()
                    }
                }
                return ret
            }
        }, {
            key: "showFamily",
            value: function showFamily(ancestorCount, descendantCount) {
                this.destroyAncestors(0, true);
                this.createAncestors(ancestorCount);
                this.destroyDescendants(0);
                this.createDescendants(descendantCount);
                return this
            }
        }, {
            key: "highlight",
            value: function highlight() {
                if (!this.state.highlighted) this.graphics.setShapeState("highlighted", this)
            }
        }, {
            key: "dehighlight",
            value: function dehighlight(forwarded) {
                if (this.state.highlighted) this.graphics.setShapeState("highlighted", null)
            }
        }, {
            key: "select",
            value: function select(forwarded) {
                if (!this.state.selected) this.graphics.setShapeState("selected", this)
            }
        }, {
            key: "deselect",
            value: function deselect(forwarded) {
                if (this.state.selected) this.graphics.setShapeState("selected", null)
            }
        }, {
            key: "focus",
            value: function focus() {
                if (!this.state.focused) this.graphics.setShapeState("focused", this)
            }
        }, {
            key: "defocus",
            value: function defocus() {
                if (this.state.focused) this.graphics.setShapeState("focused", null)
            }
        }]);
        return AbstractNodeShape
    }(AbstractShape);;
    var AbstractVisualisation = function(_AbstractGraphics) {
        _inherits(AbstractVisualisation, _AbstractGraphics);

        function AbstractVisualisation() {
            _classCallCheck(this, AbstractVisualisation);
            return _possibleConstructorReturn(this, (AbstractVisualisation.__proto__ || Object.getPrototypeOf(AbstractVisualisation)).call(this))
        }
        _createClass(AbstractVisualisation, [{
            key: "__setupVisualisation",
            value: function __setupVisualisation(tree, options) {
                this.tree = tree;
                this.options = options;
                this.shapes.root = [];
                this.shapes.leave = [];
                this.shapes.collapsed = [];
                this.shapes.node = [];
                this.shapes.unique = {
                    focused: null,
                    selected: null,
                    dragging: null,
                    highlighted: null
                };
                this.maxNodeCount = 1000;
                this.__setupOptions(options);
                this.__setupRoot();
                this.DOMEventListeners.mouseUp = function(event) {
                    if (this.shapes.unique.dragging) {
                        this.shapes.unique.dragging.__changeState("dragged", false);
                        event.preventDefault();
                        event.stopImmediatePropagation()
                    }
                    this.shapes.unique.dragging = null
                }.bind(this);
                $(document).on("mouseup", this.DOMEventListeners.mouseUp)
            }
        }, {
            key: "getTree",
            value: function getTree() {
                return this.tree
            }
        }, {
            key: "getOptions",
            value: function getOptions() {
                return this.options
            }
        }, {
            key: "__setupOptions",
            value: function __setupOptions(options) {}
        }, {
            key: "setMaxNodeCount",
            value: function setMaxNodeCount(count) {
                this.maxNodeCount = count;
                return this
            }
        }, {
            key: "getMaxNodeCount",
            value: function getMaxNodeCount() {
                return this.maxNodeCount
            }
        }, {
            key: "synchronizeNode",
            value: function synchronizeNode(type, node, forwarded) {
                var shape = node && node.getShape(this.getUID());
                if (this.shapes.unique[type]) this.shapes.unique[type].__changeState(type, false);
                if (type == "focused" && node && (!shape || !shape.isRendered)) {
                    shape = this.createNodeShape(node).add();
                    if (!shape.getConnectedNodeShape()) {
                        for (var i = this.shapes.root.length - 1; i >= 0; i--) {
                            var root = this.shapes.root[i];
                            if (root != shape) {
                                root.destroyDescendants(0, shape);
                                root.remove()
                            }
                        }
                    }
                }
                this.shapes.unique[type] = shape;
                if (shape) shape.__changeState(type, true);
                if (!forwarded) VisualisationHandler.synchronizeNode(type, node, this);
                return this
            }
        }, {
            key: "setShapeState",
            value: function setShapeState(type, shape) {
                var node = shape && shape.getNode && shape.getNode();
                this.synchronizeNode(type, node);
                return this
            }
        }, {
            key: "getShape",
            value: function getShape(state) {
                return this.shapes.unique[state]
            }
        }, {
            key: "dragShape",
            value: function dragShape(shape) {
                if (this.shapes.unique.dragging) this.shapes.unique.dragging.__changeState("dragged", false);
                this.shapes.unique.dragging = shape;
                if (shape) shape.__changeState("dragged", true);
                return this
            }
        }, {
            key: "__onUpdate",
            value: function __onUpdate(deltaTime) {
                if (this.shapes.unique.dragging) this.shapes.unique.dragging.__onDrag(this.getMouseLoc());
                _get(AbstractVisualisation.prototype.__proto__ || Object.getPrototypeOf(AbstractVisualisation.prototype), "__onUpdate", this).call(this, deltaTime)
            }
        }, {
            key: "__getNodeShapeClass",
            value: function __getNodeShapeClass(VIZ, node) {}
        }, {
            key: "createNodeShape",
            value: function createNodeShape(node) {
                var UID = this.getUID();
                var shape = node.getShape(UID);
                if (shape) {
                    return shape
                } else {
                    var path = [node];
                    var p = node.getParent();
                    while (p && !p.getShape(UID)) {
                        path.unshift(p);
                        p = p.getParent()
                    }
                    for (var i = 0; i < path.length; i++) {
                        var node = path[i];
                        var parent = node.getParent();
                        var parentShape = parent.getShape(UID);
                        var nodeShape = parentShape.createChild(node, true);
                        path.splice(i, 1, nodeShape)
                    }
                    return path[path.length - 1]
                }
            }
        }, {
            key: "__destroy",
            value: function __destroy(callback) {
                var This = this;
                var finish = function finish() {
                    This.getCanvas().remove();
                    This.pause(true);
                    This.options.destroy();
                    if (callback) callback.call(This)
                };
                var nodes = this.getShapesNode();
                var destroyLeft = nodes.length;
                var countFunc = function countFunc() {};
                for (var i = nodes.length - 1; i >= 0; i--) {
                    nodes[i].destroy(countFunc)
                }
                finish()
            }
        }, {
            key: "__registerShapeType",
            value: function __registerShapeType(type, shape) {
                var shapes = this.__getShapesType(type);
                var index = shapes.indexOf(shape);
                if (index == -1) shapes.push(shape);
                return this
            }
        }, {
            key: "__deregisterShapeType",
            value: function __deregisterShapeType(type, shape) {
                var shapes = this.__getShapesType(type);
                var index = shapes.indexOf(shape);
                if (index != -1) shapes.splice(index, 1);
                return this
            }
        }, {
            key: "__getShapesType",
            value: function __getShapesType(type) {
                return this.shapes[type]
            }
        }, {
            key: "__registerShapeRoot",
            value: function __registerShapeRoot(shape) {
                return this.__registerShapeType("root", shape)
            }
        }, {
            key: "__deregisterShapeRoot",
            value: function __deregisterShapeRoot(shape) {
                return this.__deregisterShapeType("root", shape)
            }
        }, {
            key: "getShapesRoot",
            value: function getShapesRoot() {
                return this.__getShapesType("root")
            }
        }, {
            key: "__registerShapeLeave",
            value: function __registerShapeLeave(shape) {
                return this.__registerShapeType("leave", shape)
            }
        }, {
            key: "__deregisterShapeLeave",
            value: function __deregisterShapeLeave(shape) {
                return this.__deregisterShapeType("leave", shape)
            }
        }, {
            key: "getShapesLeave",
            value: function getShapesLeave() {
                return this.__getShapesType("leave")
            }
        }, {
            key: "__registerShapeCollapsed",
            value: function __registerShapeCollapsed(shape) {
                return this.__registerShapeType("collapsed", shape)
            }
        }, {
            key: "__deregisterShapeCollapsed",
            value: function __deregisterShapeCollapsed(shape) {
                return this.__deregisterShapeType("collapsed", shape)
            }
        }, {
            key: "getShapesCollapsed",
            value: function getShapesCollapsed() {
                return this.__getShapesType("collapsed")
            }
        }, {
            key: "__registerShapeNode",
            value: function __registerShapeNode(shape) {
                return this.__registerShapeType("node", shape)
            }
        }, {
            key: "__deregisterShapeNode",
            value: function __deregisterShapeNode(shape) {
                return this.__deregisterShapeType("node", shape)
            }
        }, {
            key: "getShapesNode",
            value: function getShapesNode() {
                return this.__getShapesType("node")
            }
        }, {
            key: "growTree",
            value: function growTree(growNodes, shrinkNodes) {
                if (!(growNodes instanceof Array))
                    if (!growNodes) growNodes = this.getShapesCollapsed();
                    else growNodes = [growNodes];
                if (!(shrinkNodes instanceof Array))
                    if (!shrinkNodes) shrinkNodes = this.getShapesRoot();
                    else shrinkNodes = [shrinkNodes];
                var ret;
                var growNode = growNodes[0];
                for (var j = 1; j < growNodes.length; j++) {
                    var gn = growNodes[j];
                    if (gn.getDepth() < growNode.getDepth()) growNode = gn
                }
                if (growNode) ret = growNode.createChild();
                if (this.getShapes().length > this.maxNodeCount) {
                    var shrinkNode = shrinkNodes[0];
                    for (var j = 1; j < shrinkNodes.length; j++) {
                        var sn = shrinkNodes[j];
                        if (sn.getDepth() < shrinkNode.getDepth()) shrinkNode = sn
                    }
                    if (shrinkNode) shrinkNode.remove()
                }
                return ret
            }
        }, {
            key: "shrinkTree",
            value: function shrinkTree(growNodes, shrinkNodes) {
                if (!(growNodes instanceof Array))
                    if (!growNodes) growNodes = this.getShapesRoot();
                    else growNodes = [growNodes];
                if (!(shrinkNodes instanceof Array))
                    if (!shrinkNodes) shrinkNodes = this.getShapesLeave();
                    else shrinkNodes = [shrinkNodes];
                var ret;
                var growNode = growNodes[0];
                for (var j = 1; j < growNodes.length; j++) {
                    var gn = growNodes[j];
                    if (gn.getDepth() > growNode.getDepth()) growNode = gn
                }
                if (growNode) ret = growNode.createParent();
                if (this.getShapes().length > this.maxNodeCount) {
                    var shrinkNode = shrinkNodes[0];
                    for (var j = 1; j < shrinkNodes.length; j++) {
                        var sn = shrinkNodes[j];
                        if (sn.getDepth() > shrinkNode.getDepth()) shrinkNode = sn
                    }
                    if (shrinkNode) shrinkNode.remove()
                }
                return ret
            }
        }]);
        return AbstractVisualisation
    }(AbstractGraphics);;
    var Camera2d = function(_AbstractCamera) {
        _inherits(Camera2d, _AbstractCamera);

        function Camera2d(graphics) {
            _classCallCheck(this, Camera2d);
            var _this10 = _possibleConstructorReturn(this, (Camera2d.__proto__ || Object.getPrototypeOf(Camera2d)).call(this, graphics));
            _this10.stage = graphics.__getStage();
            var This = _this10;
            _this10.loc.onChange(_this10.__updateLoc.bind(_this10));
            _this10.rot.onChange(_this10.__updateLoc.bind(_this10));
            _this10.loc.set(0, 0, 0);
            return _this10
        }
        _createClass(Camera2d, [{
            key: "__updateLoc",
            value: function __updateLoc() {
                var angle = -this.getZRot();
                var vec = new Vec(this.loc).mul(-this.getTotalScale()).addAngle(angle).add(this.graphics.getWidth() / 2, this.graphics.getHeight() / 2);
                this.stage.rotation = angle;
                this.stage.x = vec.getX();
                this.stage.y = vec.getY()
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                _get(Camera2d.prototype.__proto__ || Object.getPrototypeOf(Camera2d.prototype), "setScale", this).call(this, scale);
                this.stage.scale.set(this.getTotalScale());
                this.__updateLoc();
                return this
            }
        }, {
            key: "translateScreenToWorldLoc",
            value: function translateScreenToWorldLoc(x, y, z) {
                var vec = new Vec(x, y, z);
                var size = new XYZ(this.graphics.getWidth(), this.graphics.getHeight());
                return vec.sub(size.mul(0.5)).div(this.getTotalScale()).addAngle(this.getZRot()).add(this.getLoc())
            }
        }, {
            key: "translateWorldToScreenLoc",
            value: function translateWorldToScreenLoc(x, y, z) {
                var vec = new Vec(x, y, z);
                var size = new XYZ(this.graphics.getWidth(), this.graphics.getHeight());
                return vec.sub(this.getLoc()).addAngle(-this.getZRot()).mul(this.getTotalScale()).add(size.mul(0.5))
            }
        }]);
        return Camera2d
    }(AbstractCamera);;
    var Graphics2d = function(_AbstractGraphics2) {
        _inherits(Graphics2d, _AbstractGraphics2);

        function Graphics2d(width, height, container, preInit) {
            _classCallCheck(this, Graphics2d);
            var _this11 = _possibleConstructorReturn(this, (Graphics2d.__proto__ || Object.getPrototypeOf(Graphics2d)).call(this, width, height, container, preInit));
            _this11.app = new PIXI.Application(_this11.getWidth(), _this11.getHeight(), {
                transparent: true,
                antialias: true
            });
            var This = _this11;
            $(_this11.app.view).addClass("pixi").attr("oncontextmenu", "return false;");
            _this11.container.append(_this11.app.view);
            _this11.container.on("finishResize, resize", function(event, size) {
                var newSize = {
                    width: This.container.width(),
                    height: This.container.height()
                };
                This.app.renderer.resize(newSize.width, newSize.height);
                This.size = newSize;
                This.camera.setWindowSize(newSize.width, newSize.height);
                This.camera.__updateLoc()
            });
            var m = _this11.app.renderer.plugins.interaction;
            m.interactionDOMElement.removeEventListener("pointerleave", m.onPointerOut, true);
            _this11.updating = true;
            var last = Date.now();
            var delta = 1 / 30;
            _this11.app.ticker.add(function() {
                var now = Date.now();
                if ((now - last) / 1000 > delta) {
                    if (This.updating) This.__onUpdate(delta);
                    last += delta * 1000;
                    if (now - last > 2000) last = now
                }
            });
            _this11.app.stage = new PIXI.display.Stage;
            _this11.app.stage.group.enableSort = true;
            _this11.group = new PIXI.display.Group(1, true);
            _this11.stage = new PIXI.display.Layer(_this11.group);
            var bigNumber = Math.pow(10, 10);
            _this11.stage.hitArea = new PIXI.Rectangle(-bigNumber / 2, -bigNumber / 2, bigNumber, bigNumber);
            _this11.app.stage.addChild(_this11.stage);
            {
                _this11.mouse = {
                    x: 0,
                    y: 0,
                    pressed: false
                };
                var mouseMove = function mouseMove(data) {
                    This.mouse.x = data.data.global.x;
                    This.mouse.y = data.data.global.y;
                    This.mouse.clientX = data.data.originalEvent.clientX;
                    This.mouse.clientY = data.data.originalEvent.clientY;
                    This.__triggerMouseMove(new XYZ(data.data.global.x, data.data.global.y), data)
                };
                var mouseDown = function mouseDown(data) {
                    This.mouse.pressed = true;
                    This.__triggerMousePress(true, data)
                };
                var mouseUp = function mouseUp(data) {
                    This.mouse.pressed = false;
                    This.__triggerMousePress(false, data);
                    This.__triggerClick(data)
                };
                var mouseScroll = function mouseScroll(data) {
                    This.__triggerMouseScroll(data.data.originalEvent.originalEvent.wheelDeltaY, data)
                };
                var keyPress = function keyPress(data) {
                    var key = data.data.originalEvent.key;
                    This.__triggerKeyPress(data.data.originalEvent.type == "keydown", key ? key.toLowerCase() : key, data)
                };
                _this11.app.stage.interactive = true;
                _this11.app.stage.on("mousedown", mouseDown).on("touchstart", mouseDown).on("mouseup", mouseUp).on("mouseupoutside", mouseUp).on("touchend", mouseUp).on("touchendoutside", mouseUp).on("mousemove", mouseMove).on("touchmove", mouseMove).on("scroll", mouseScroll).on("keypress", keyPress)
            } {
                _this11.DOMEventListeners.scroll = function(event) {
                    var offset = This.getCanvas().offset();
                    if (event.clientX < offset.left || event.clientX > offset.left + This.getWidth() || event.clientY < offset.top || event.clientY > offset.top + This.getHeight()) return;
                    var interactionData = m.getInteractionDataForPointerId(event);
                    var interactionEvent = m.configureInteractionEventForDOMEvent(m.eventData, event, interactionData);
                    m.processInteractive(interactionEvent, m.renderer._lastObjectRendered, function(interactionEvent, displayObject, hit) {
                        if (hit) {
                            m.dispatchEvent(displayObject, "scroll", interactionEvent)
                        }
                    }, true)
                };
                _this11.DOMEventListeners.keypress = function(event) {
                    var interactionData = m.getInteractionDataForPointerId(event);
                    event.key = keyNames[event.keyCode] || event.key;
                    if (event.type == "keyup") delete This.pressedKeys[event.key.toLowerCase()];
                    event.clientX = This.mouse.clientX;
                    event.clientY = This.mouse.clientY;
                    var offset = This.getCanvas().offset();
                    if (event.clientX < offset.left || event.clientX > offset.left + This.getWidth() || event.clientY < offset.top || event.clientY > offset.top + This.getHeight()) return;
                    var interactionEvent = m.configureInteractionEventForDOMEvent(m.eventData, event, interactionData);
                    m.processInteractive(interactionEvent, m.renderer._lastObjectRendered, function(interactionEvent, displayObject, hit) {
                        if (hit) {
                            m.dispatchEvent(displayObject, "keypress", interactionEvent)
                        }
                    }, true)
                };
                _this11.DOMEventListeners.mousedown = function(event) {
                    event.clientX = This.mouse.clientX;
                    event.clientY = This.mouse.clientY;
                    var offset = This.getCanvas().offset();
                    if (event.clientX < offset.left || event.clientX > offset.left + This.getWidth() || event.clientY < offset.top || event.clientY > offset.top + This.getHeight()) return;
                    event.preventDefault()
                };
                $(window).on("wheel", _this11.DOMEventListeners.scroll);
                $(window).on("keydown", _this11.DOMEventListeners.keypress);
                $(window).on("keyup", _this11.DOMEventListeners.keypress);
                $(window).on("mousedown", _this11.DOMEventListeners.mousedown)
            }
            _this11.camera = new Camera2d(_this11);
            _this11.camera.setWindowSize(_this11.getWidth(), _this11.getHeight());
            return _this11
        }
        _createClass(Graphics2d, [{
            key: "getCanvas",
            value: function getCanvas() {
                return this.getContainer().find("canvas.pixi")
            }
        }, {
            key: "destroy",
            value: function destroy() {
                $(window).off("wheel", this.DOMEventListeners.scroll);
                $(window).off("keydown", this.DOMEventListeners.keypress);
                $(window).off("keyup", this.DOMEventListeners.keypress);
                $(window).off("mousedown", this.DOMEventListeners.mousedown);
                _get(Graphics2d.prototype.__proto__ || Object.getPrototypeOf(Graphics2d.prototype), "destroy", this).call(this)
            }
        }, {
            key: "pause",
            value: function pause(fully) {
                if (!fully) {
                    this.updating = false
                } else {
                    this.app.stop()
                }
            }
        }, {
            key: "start",
            value: function start() {
                this.updating = true;
                this.app.start()
            }
        }, {
            key: "__getStage",
            value: function __getStage() {
                return this.app.stage
            }
        }, {
            key: "__getGroup",
            value: function __getGroup() {
                return this.group
            }
        }, {
            key: "__getRenderer",
            value: function __getRenderer() {
                return this.app.renderer
            }
        }, {
            key: "getMouseScreenLoc",
            value: function getMouseScreenLoc() {
                return this.mouse
            }
        }, {
            key: "getMouseLoc",
            value: function getMouseLoc() {
                return this.camera.translateScreenToWorldLoc(this.getMouseScreenLoc())
            }
        }, {
            key: "getMouseVec",
            value: function getMouseVec(x, y) {
                var xyz;
                if (x instanceof AbstractShape) xyz = new Vec(x.getWorldLoc());
                else xyz = new Vec(x, y);
                var pos = this.getMouseLoc();
                return xyz.sub(pos)
            }
        }, {
            key: "getMousePressed",
            value: function getMousePressed() {
                return this.mouse.pressed
            }
        }]);
        return Graphics2d
    }(AbstractGraphics);;
    var Shape2d = function(_AbstractShape2) {
        _inherits(Shape2d, _AbstractShape2);

        function Shape2d(graphics, color, preInit) {
            _classCallCheck(this, Shape2d);
            var _this12 = _possibleConstructorReturn(this, (Shape2d.__proto__ || Object.getPrototypeOf(Shape2d)).call(this, graphics, preInit));
            _this12.gfx = _this12.__createGfx();
            _this12.setColor(color);
            _this12.gfx.zIndex = 0;
            var This = _this12;
            var oldZ = 0;
            _this12.getLoc().onChange(function() {
                This.gfx.x = this.getX();
                This.gfx.y = this.getY();
                var newZ = this.getZ();
                if (oldZ != newZ) {
                    This.__updateZOrder();
                    oldZ = newZ
                }
            });
            _this12.getRot().onChange(function() {
                This.gfx.rotation = this.getZ()
            });
            {
                _this12.gfx.on("mouseover", function(data) {
                    if (This.__triggerHover(true, data)) data.stopPropagation()
                });
                _this12.gfx.on("mouseout", function(data) {
                    if (This.__triggerHover(false, data)) data.stopPropagation()
                });
                _this12.gfx.on("click", function(data) {
                    if (This.__triggerClick(data)) data.stopPropagation()
                });
                var mouseDown = function mouseDown(data) {
                    if (This.__triggerMousePress(true, data)) data.stopPropagation()
                };
                var mouseUp = function mouseUp(data) {
                    if (This.__triggerMousePress(false, data)) data.stopPropagation()
                };
                var mouseMove = function mouseMove(data) {
                    if (This.__triggerMouseMove(new XYZ(data.data.global.x, data.data.global.y), data)) data.stopPropagation()
                };
                var mouseScroll = function mouseScroll(data) {
                    if (This.__triggerMouseScroll(data.data.originalEvent.originalEvent.wheelDeltaY, data)) data.stopPropagation()
                };
                var keyPress = function keyPress(data) {
                    var key = data.data.originalEvent.key;
                    if (This.__triggerKeyPress(data.data.originalEvent.type == "keydown", key ? key.toLowerCase() : key, data)) data.stopPropagation()
                };
                _this12.gfx.on("mousedown", mouseDown).on("touchstart", mouseDown).on("mouseup", mouseUp).on("mouseupoutside", mouseUp).on("touchend", mouseUp).on("touchendoutside", mouseUp).on("mousemove", mouseMove).on("touchmove", mouseMove).on("scroll", mouseScroll).on("keypress", keyPress)
            }
            return _this12
        }
        _createClass(Shape2d, [{
            key: "__redraw",
            value: function __redraw() {}
        }, {
            key: "__getGfx",
            value: function __getGfx() {
                return this.gfx
            }
        }, {
            key: "__createGfx",
            value: function __createGfx() {
                return new PIXI.Graphics
            }
        }, {
            key: "__updateZOrder",
            value: function __updateZOrder() {
                var zOrder = -this.getZ();
                this.gfx.zOrder = zOrder;
                if (this.parentShape) this.gfx.parentGroup = this.parentShape.__getGroup();
                else this.gfx.parentGroup = this.graphics.__getGroup()
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                this.gfx.scale.set(scale);
                return _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "setScale", this).call(this, scale)
            }
        }, {
            key: "getAbsoluteX",
            value: function getAbsoluteX() {
                return this.gfx.worldTransform.tx
            }
        }, {
            key: "getAbsoluteY",
            value: function getAbsoluteY() {
                return this.gfx.worldTransform.ty
            }
        }, {
            key: "getWorldLoc",
            value: function getWorldLoc() {
                if (this.parentShape) {
                    var p = this.parentShape;
                    var vec = new Vec(this.getLoc());
                    vec.mul(p.getScale()).addAngle(p.getAngle());
                    vec.add(p.getWorldLoc());
                    return vec
                }
                return this.getLoc()
            }
        }, {
            key: "getWorldScale",
            value: function getWorldScale() {
                if (this.parentShape) return this.getScale() * this.getWorldScale();
                return _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "getWorldScale", this).call(this)
            }
        }, {
            key: "getWorldAngle",
            value: function getWorldAngle() {
                if (this.parentShape) return this.getAngle() + this.getWorldAngle();
                return _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "getWorldAngle", this).call(this)
            }
        }, {
            key: "isVisible",
            value: function isVisible() {
                var loc = this.getWorldLoc();
                var graphics = this.getGraphics();
                var camera = graphics.getCamera();
                var camLoc = camera.getLoc();
                var x = loc.getX() - camLoc.getX();
                var y = loc.getY() - camLoc.getY();
                var w = graphics.getWidth() / 2 / camera.getTotalScale();
                var h = graphics.getHeight() / 2 / camera.getTotalScale();
                var r = this.__getRadius() * this.getWorldScale();
                return x + r > -w && x - r < w && y + r > -h && y - r < h
            }
        }, {
            key: "setAngle",
            value: function setAngle(angle) {
                return this.setZRot(angle)
            }
        }, {
            key: "getAngle",
            value: function getAngle() {
                return this.getZRot()
            }
        }, {
            key: "setColor",
            value: function setColor(color) {
                _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "setColor", this).call(this, color);
                this.__redraw();
                return this
            }
        }, {
            key: "setAlpha",
            value: function setAlpha(alpha) {
                this.gfx.alpha = alpha;
                return _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "setAlpha", this).call(this, alpha)
            }
        }, {
            key: "enableInteraction",
            value: function enableInteraction(internally) {
                this.gfx.interactive = true;
                _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "enableInteraction", this).call(this, internally)
            }
        }, {
            key: "disableInteraction",
            value: function disableInteraction(internally) {
                this.gfx.interactive = false;
                _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "disableInteraction", this).call(this, internally)
            }
        }, {
            key: "add",
            value: function add() {
                _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "add", this).call(this);
                this.graphics.__getStage().addChild(this.gfx);
                this.__updateZOrder();
                return this
            }
        }, {
            key: "__delete",
            value: function __delete() {
                this.graphics.__getStage().removeChild(this.gfx);
                _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "__delete", this).call(this)
            }
        }, {
            key: "__setParentShape",
            value: function __setParentShape(parent) {
                _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "__setParentShape", this).call(this, parent);
                this.__updateZOrder();
                return this
            }
        }, {
            key: "__onUpdate",
            value: function __onUpdate(deltaTime) {
                this.getVelo().setZ(0);
                if (this.target.loc) {
                    var delta = this.getVecTo(this.target.loc instanceof Function ? this.target.loc.call(this) : this.target.loc).setZ(0);
                    var velo = this.getVelo();
                    if (delta.getLength() < 1 * this.getScale() && velo.getLength() < 150 * this.getScale() && this.target.callback.loc) {
                        this.target.callback.loc.call(this);
                        this.target.callback.loc = null
                    }
                }
                return _get(Shape2d.prototype.__proto__ || Object.getPrototypeOf(Shape2d.prototype), "__onUpdate", this).call(this, deltaTime)
            }
        }]);
        return Shape2d
    }(AbstractShape);;
    var CompoundShape2d = function(_Shape2d) {
        _inherits(CompoundShape2d, _Shape2d);

        function CompoundShape2d(graphics, preInit) {
            _classCallCheck(this, CompoundShape2d);
            var _this13 = _possibleConstructorReturn(this, (CompoundShape2d.__proto__ || Object.getPrototypeOf(CompoundShape2d)).call(this, graphics, null, preInit));
            _this13.shapes = [];
            var This = _this13;
            _this13.getLoc().onChange(function() {
                for (var i = 0; i < This.shapes.length; i++) {
                    This.shapes[i].getLoc().__fireEvent()
                }
            });
            _this13.getRot().onChange(function() {
                for (var i = 0; i < This.shapes.length; i++) {
                    This.shapes[i].getLoc().__fireEvent()
                }
            });
            return _this13
        }
        _createClass(CompoundShape2d, [{
            key: "__createGfx",
            value: function __createGfx() {
                return new PIXI.Sprite
            }
        }, {
            key: "addShape",
            value: function addShape(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    var shape = arguments[i];
                    if (this.shapes.indexOf(shape) == -1) {
                        this.shapes.push(shape);
                        shape.__setParentShape(this)
                    }
                }
                this.__redraw();
                return this
            }
        }, {
            key: "removeShape",
            value: function removeShape(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    var shape = arguments[i];
                    var index = this.shapes.indexOf(shape);
                    if (index != -1) {
                        this.shapes.splice(index, 1);
                        shape.__setParentShape(null)
                    }
                }
                this.__redraw();
                return this
            }
        }, {
            key: "__redraw",
            value: function __redraw() {
                var aabb = {
                    minX: Infinity,
                    maxX: -Infinity,
                    minY: Infinity,
                    maxY: -Infinity
                };
                var ix, ax, iy, ay;
                for (var i = 0; i < this.shapes.length; i++) {
                    var shape = this.shapes[i];
                    var r = shape.__getRadius() * shape.getScale();
                    var l = shape.getLoc();
                    if ((ax = l.getX() + r) > aabb.maxX) aabb.maxX = ax;
                    if ((ix = l.getX() - r) < aabb.minX) aabb.minX = ix;
                    if ((ay = l.getY() + r) > aabb.maxY) aabb.maxY = ay;
                    if ((iy = l.getY() - r) < aabb.minY) aabb.minY = iy
                }
                var rt = PIXI.RenderTexture.create(aabb.maxX - aabb.minX, aabb.maxY - aabb.minY);
                for (var i = 0; i < this.shapes.length; i++) {
                    var shape = this.shapes[i];
                    shape.gfx.x -= aabb.minX;
                    shape.gfx.y -= aabb.minY;
                    this.graphics.__getRenderer().render(shape.gfx, rt, false);
                    shape.gfx.x += aabb.minX;
                    shape.gfx.y += aabb.minY
                }
                this.gfx.setTexture(rt);
                this.size = {
                    width: Math.max(-aabb.minX, aabb.maxX) * 2,
                    height: Math.max(-aabb.minY, aabb.maxY) * 2
                };
                this.gfx.pivot.x = -aabb.minX;
                this.gfx.pivot.y = -aabb.minY
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                var x = this.size.width / 2;
                var y = this.size.height / 2;
                return Math.sqrt(x * x + y * y)
            }
        }, {
            key: "__triggerScaleChange",
            value: function __triggerScaleChange() {
                _get(CompoundShape2d.prototype.__proto__ || Object.getPrototypeOf(CompoundShape2d.prototype), "__triggerScaleChange", this).call(this);
                for (var i = 0; i < this.shapes.length; i++) {
                    this.shapes[i].__triggerScaleChange()
                }
            }
        }, {
            key: "__triggerRenderChange",
            value: function __triggerRenderChange() {
                _get(CompoundShape2d.prototype.__proto__ || Object.getPrototypeOf(CompoundShape2d.prototype), "__triggerRenderChange", this).call(this);
                for (var i = 0; i < this.shapes.length; i++) {
                    this.shapes[i].__triggerRenderChange()
                }
            }
        }]);
        return CompoundShape2d
    }(Shape2d);;
    var ShapeGroup2d = function(_Shape2d2) {
        _inherits(ShapeGroup2d, _Shape2d2);

        function ShapeGroup2d(graphics, preInit) {
            _classCallCheck(this, ShapeGroup2d);
            var _this14 = _possibleConstructorReturn(this, (ShapeGroup2d.__proto__ || Object.getPrototypeOf(ShapeGroup2d)).call(this, graphics, null, preInit));
            _this14.shapes = [];
            _this14.radius = 0;
            var This = _this14;
            _this14.getLoc().onChange(function() {
                for (var i = 0; i < This.shapes.length; i++) {
                    This.shapes[i].getLoc().__fireEvent()
                }
            });
            _this14.getRot().onChange(function() {
                for (var i = 0; i < This.shapes.length; i++) {
                    This.shapes[i].getLoc().__fireEvent()
                }
            });
            _this14.group = new PIXI.display.Group(1, true);
            return _this14
        }
        _createClass(ShapeGroup2d, [{
            key: "__createGfx",
            value: function __createGfx() {
                var layer = new PIXI.display.Layer(this.group);
                layer.group.enableSort = true;
                return layer
            }
        }, {
            key: "__getGroup",
            value: function __getGroup() {
                return this.group
            }
        }, {
            key: "getShapes",
            value: function getShapes() {
                return this.shapes
            }
        }, {
            key: "addShape",
            value: function addShape(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    var shape = arguments[i];
                    if (this.shapes.indexOf(shape) == -1) {
                        this.gfx.addChild(shape.gfx);
                        this.shapes.push(shape);
                        shape.__setParentShape(this)
                    }
                }
                this.__updateRadius();
                return this
            }
        }, {
            key: "removeShape",
            value: function removeShape(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    var shape = arguments[i];
                    this.gfx.removeChild(shape.gfx);
                    var index = this.shapes.indexOf(shape);
                    if (index != -1) {
                        this.shapes.splice(index, 1);
                        shape.__setParentShape(null)
                    }
                }
                this.__updateRadius();
                return this
            }
        }, {
            key: "__updateRadius",
            value: function __updateRadius() {
                this.radius = 0;
                for (var i = 0; i < this.shapes.length; i++) {
                    var shape = this.shapes[i];
                    this.radius = Math.max(this.radius, new Vec(shape.getLoc()).getLength() + shape.__getRadius() * shape.getScale())
                }
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                return this.radius
            }
        }, {
            key: "__triggerScaleChange",
            value: function __triggerScaleChange() {
                _get(ShapeGroup2d.prototype.__proto__ || Object.getPrototypeOf(ShapeGroup2d.prototype), "__triggerScaleChange", this).call(this);
                for (var i = 0; i < this.shapes.length; i++) {
                    this.shapes[i].__triggerScaleChange()
                }
            }
        }, {
            key: "__triggerRenderChange",
            value: function __triggerRenderChange() {
                _get(ShapeGroup2d.prototype.__proto__ || Object.getPrototypeOf(ShapeGroup2d.prototype), "__triggerRenderChange", this).call(this);
                for (var i = 0; i < this.shapes.length; i++) {
                    this.shapes[i].__triggerRenderChange()
                }
            }
        }]);
        return ShapeGroup2d
    }(Shape2d);;
    var NodeShape2d = function(_ShapeGroup2d) {
        _inherits(NodeShape2d, _ShapeGroup2d);

        function NodeShape2d(graphics, node, preInit) {
            _classCallCheck(this, NodeShape2d);
            var _this15 = _possibleConstructorReturn(this, (NodeShape2d.__proto__ || Object.getPrototypeOf(NodeShape2d)).call(this, graphics, preInit));
            _this15.__setupNodeShape(node);
            return _this15
        }
        _createClass(NodeShape2d, [{
            key: "add",
            value: function add() {
                var ret = _get(NodeShape2d.prototype.__proto__ || Object.getPrototypeOf(NodeShape2d.prototype), "add", this).call(this);
                this.__addNode();
                return ret
            }
        }, {
            key: "remove",
            value: function remove() {
                return _get(NodeShape2d.prototype.__proto__ || Object.getPrototypeOf(NodeShape2d.prototype), "remove", this).call(this, this.__removeNode())
            }
        }, {
            key: "__delete",
            value: function __delete() {
                this.__deleteNode();
                return _get(NodeShape2d.prototype.__proto__ || Object.getPrototypeOf(NodeShape2d.prototype), "__delete", this).call(this)
            }
        }]);
        return NodeShape2d
    }(ShapeGroup2d);
    var keys = Object.getOwnPropertyNames(AbstractNodeShape.prototype);
    for (var i = 0; i < keys.length; i++) {
        NodeShape2d.prototype[keys[i]] = AbstractNodeShape.prototype[keys[i]]
    };
    var HtmlShape2d = function(_Shape2d3) {
        _inherits(HtmlShape2d, _Shape2d3);

        function HtmlShape2d(graphics, html, preInit) {
            _classCallCheck(this, HtmlShape2d);
            var _this16 = _possibleConstructorReturn(this, (HtmlShape2d.__proto__ || Object.getPrototypeOf(HtmlShape2d)).call(this, graphics, null, preInit));
            _this16.element = $("<div class='HTMLshape noselect' style=display:inline-block;position:absolute;color:white;z-index:1000>" + "</div>");
            _this16.setHtml(html);
            _this16.setContainer(graphics.getContainer());
            _this16.setInteractive(false);
            _this16.visCont = graphics.getCanvas();
            var This = _this16;
            _this16.getLoc().onChange(function() {
                This.__updateLoc()
            });
            return _this16
        }
        _createClass(HtmlShape2d, [{
            key: "setInteractive",
            value: function setInteractive(interactive) {
                this.interactive = interactive;
                if (interactive) this.element.addClass("interactive").css("pointer-events", "all");
                else this.element.removeClass("interactive").css("pointer-events", "none");
                return this
            }
        }, {
            key: "getInteractive",
            value: function getInteractive() {
                return this.interactive
            }
        }, {
            key: "setContainer",
            value: function setContainer(container) {
                this.container = $(container);
                return this
            }
        }, {
            key: "getContainer",
            value: function getContainer() {
                return this.container
            }
        }, {
            key: "setHtml",
            value: function setHtml(html) {
                this.element.html(html);
                return this
            }
        }, {
            key: "getHtml",
            value: function getHtml() {
                return this.element.contents()
            }
        }, {
            key: "getElement",
            value: function getElement() {
                return this.element
            }
        }, {
            key: "__addToPage",
            value: function __addToPage() {
                this.getContainer().append(this.element);
                var shapes = this.graphics.getShapesHtml();
                if (shapes.indexOf(this) == -1) shapes.push(this);
                this.__updateLoc();
                return this
            }
        }, {
            key: "__removeFromPage",
            value: function __removeFromPage() {
                this.element.remove();
                var shapes = this.graphics.getShapesHtml();
                var index = shapes.indexOf(this);
                if (index != -1) shapes.splice(index, 1);
                return this
            }
        }, {
            key: "add",
            value: function add() {
                _get(HtmlShape2d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape2d.prototype), "add", this).call(this);
                this.__addToPage();
                return this
            }
        }, {
            key: "remove",
            value: function remove() {
                this.__removeFromPage();
                return _get(HtmlShape2d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape2d.prototype), "remove", this).call(this)
            }
        }, {
            key: "__setParentShape",
            value: function __setParentShape(shape) {
                var ret = _get(HtmlShape2d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape2d.prototype), "__setParentShape", this).call(this, shape);
                if (shape) this.__addToPage();
                else this.__removeFromPage();
                return ret
            }
        }, {
            key: "__triggerRenderChange",
            value: function __triggerRenderChange() {
                _get(HtmlShape2d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape2d.prototype), "__triggerRenderChange", this).call(this);
                if (this.isRendered) this.__addToPage();
                else this.__removeFromPage()
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                _get(HtmlShape2d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape2d.prototype), "setScale", this).call(this, scale);
                this.element.css("transform", "scale(" + Math.floor(scale * 100) / 100 + ")");
                return this
            }
        }, {
            key: "__updateLoc",
            value: function __updateLoc() {
                var loc = this.getGraphics().getCamera().translateWorldToScreenLoc(this.getWorldLoc());
                var o = this.visCont.offset();
                o.left += loc.getX() - this.element.width() * this.transform.scale / 2;
                o.top += loc.getY() - this.element.height() * this.transform.scale / 2;
                this.element.offset(o);
                return this
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                var dx = this.element.width() / 2;
                var dy = this.element.height() / 2;
                return Math.sqrt(dx * dx + dy * dy)
            }
        }]);
        return HtmlShape2d
    }(Shape2d);;
    var circlePrecision = 5;
    var Circle2d = function(_Shape2d4) {
        _inherits(Circle2d, _Shape2d4);

        function Circle2d(graphics, radius, color, preInit) {
            _classCallCheck(this, Circle2d);
            var _this17 = _possibleConstructorReturn(this, (Circle2d.__proto__ || Object.getPrototypeOf(Circle2d)).call(this, graphics, color, preInit));
            _this17.setRadius(radius);
            return _this17
        }
        _createClass(Circle2d, [{
            key: "__redraw",
            value: function __redraw() {
                this.gfx.clear();
                this.gfx.beginFill(this.color);
                this.gfx.drawCircle(0, 0, circlePrecision);
                this.gfx.endFill();
                this.gfx.scale.set(this.getScale() * this.radius / circlePrecision);
                this.gfx.hitArea = new PIXI.Circle(0, 0, circlePrecision)
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                _get(Circle2d.prototype.__proto__ || Object.getPrototypeOf(Circle2d.prototype), "setScale", this).call(this, scale);
                this.gfx.scale.set(this.getScale() * this.radius / circlePrecision);
                return this
            }
        }, {
            key: "setRadius",
            value: function setRadius(radius) {
                this.radius = radius;
                this.__redraw();
                this.__updateAABB();
                return this
            }
        }, {
            key: "getRadius",
            value: function getRadius() {
                return this.radius
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                return this.radius
            }
        }]);
        return Circle2d
    }(Shape2d);;
    var RadialBand2d = function(_Shape2d5) {
        _inherits(RadialBand2d, _Shape2d5);

        function RadialBand2d(graphics, inRadius, thickness, startAngle, size, color) {
            _classCallCheck(this, RadialBand2d);
            var _this18 = _possibleConstructorReturn(this, (RadialBand2d.__proto__ || Object.getPrototypeOf(RadialBand2d)).call(this, graphics, color));
            _this18.setSize(size);
            _this18.setInRadius(inRadius);
            _this18.setStartAngle(startAngle);
            _this18.setThickness(thickness);
            return _this18
        }
        _createClass(RadialBand2d, [{
            key: "masterRedraw",
            value: function masterRedraw() {
                if (this.inRadius != null && this.thickness != null && this.startAngle != null && this.size != null && this.color != null) {
                    this.__redraw()
                }
                return this
            }
        }, {
            key: "__redraw",
            value: function __redraw() {
                if (this.thickness != null) {
                    this.gfx.clear();
                    this.gfx.beginFill(this.color);
                    this.gfx.arc(0, 0, this.inRadius, this.startAngle, this.getEndAngle(), false);
                    this.gfx.arc(0, 0, this.getOutRadius(), this.getEndAngle(), this.startAngle, true);
                    this.gfx.lineTo(0 + this.inRadius * Math.cos(this.startAngle), 0 + this.inRadius * Math.sin(this.startAngle));
                    this.gfx.endFill();
                    if (this.size == 2 * Math.PI && this.inRadius == 0) {
                        this.gfx.hitArea = new PIXI.Circle(0, 0, this.getOutRadius())
                    } else {
                        var points = this.getPoints();
                        this.gfx.hitArea = new PIXI.Polygon(points)
                    }
                }
            }
        }, {
            key: "getPoints",
            value: function getPoints() {
                var startAngle = this.getEndAngle();
                var endAngle = this.startAngle;
                var outRadius = this.getOutRadius();
                var pixelPrecision = 30;
                var coordinatesArr = [];
                var i = 0;
                coordinatesArr[i++] = this.inRadius * Math.cos(startAngle);
                coordinatesArr[i++] = this.inRadius * Math.sin(startAngle);
                coordinatesArr[i++] = outRadius * Math.cos(startAngle);
                coordinatesArr[i++] = outRadius * Math.sin(startAngle);
                var delta = Math.abs(startAngle - endAngle);
                var numOfPieces = Math.floor(delta * this.getOutRadius() / pixelPrecision);
                delta = delta / numOfPieces;
                var workingAngle = startAngle - delta;
                while (workingAngle > endAngle) {
                    coordinatesArr[i++] = outRadius * Math.cos(workingAngle);
                    coordinatesArr[i++] = outRadius * Math.sin(workingAngle);
                    workingAngle -= delta
                }
                coordinatesArr[i++] = outRadius * Math.cos(endAngle);
                coordinatesArr[i++] = outRadius * Math.sin(endAngle);
                coordinatesArr[i++] = this.inRadius * Math.cos(endAngle);
                coordinatesArr[i++] = this.inRadius * Math.sin(endAngle);
                delta = Math.abs(startAngle - endAngle);
                numOfPieces = Math.floor(delta * this.inRadius / pixelPrecision);
                delta = delta / numOfPieces;
                workingAngle = endAngle + delta;
                while (workingAngle < startAngle) {
                    coordinatesArr[i++] = this.inRadius * Math.cos(workingAngle);
                    coordinatesArr[i++] = this.inRadius * Math.sin(workingAngle);
                    workingAngle += delta
                }
                coordinatesArr.length = i;
                return coordinatesArr
            }
        }, {
            key: "setStartAngle",
            value: function setStartAngle(angle) {
                this.startAngle = angle;
                this.masterRedraw();
                return this
            }
        }, {
            key: "getStartAngle",
            value: function getStartAngle() {
                return this.startAngle
            }
        }, {
            key: "setInRadius",
            value: function setInRadius(inRadius) {
                this.inRadius = inRadius;
                this.masterRedraw();
                return this
            }
        }, {
            key: "getInRadius",
            value: function getInRadius() {
                return this.inRadius
            }
        }, {
            key: "setThickness",
            value: function setThickness(thickness) {
                this.thickness = thickness;
                this.masterRedraw();
                return this
            }
        }, {
            key: "getThickness",
            value: function getThickness() {
                return this.thickness
            }
        }, {
            key: "setSize",
            value: function setSize(size) {
                this.size = size;
                this.masterRedraw();
                return this
            }
        }, {
            key: "getSize",
            value: function getSize() {
                return this.size
            }
        }, {
            key: "getOutRadius",
            value: function getOutRadius() {
                return this.thickness + this.inRadius
            }
        }, {
            key: "getEndAngle",
            value: function getEndAngle() {
                return this.startAngle + this.size
            }
        }, {
            key: "resetProperties",
            value: function resetProperties() {
                this.setInRadius(null);
                this.setSize(null);
                this.setStartAngle(null);
                this.setThickness(null);
                return this
            }
        }]);
        return RadialBand2d
    }(Shape2d);;
    var Line2d = function(_Shape2d6) {
        _inherits(Line2d, _Shape2d6);

        function Line2d(graphics, startPoint, endPoint, width, color) {
            _classCallCheck(this, Line2d);
            var _this19 = _possibleConstructorReturn(this, (Line2d.__proto__ || Object.getPrototypeOf(Line2d)).call(this, graphics, color));
            _this19.setWidth(width);
            _this19.startPoint = _this19.getLoc();
            _this19.endPoint = new XYZ(0, 0, 0);
            var This = _this19;
            _this19.startPoint.onChange(function() {
                This.__redraw()
            });
            _this19.getRot().onChange(function() {
                This.__redraw()
            });
            _this19.setStartPoint(startPoint);
            _this19.endPoint.onChange(function() {
                This.__redraw()
            });
            _this19.setEndPoint(endPoint);
            return _this19
        }
        _createClass(Line2d, [{
            key: "__redraw",
            value: function __redraw() {
                this.gfx.clear();
                this.gfx.lineStyle(this.width, this.color);
                this.gfx.moveTo(0, 0);
                var delta = new Vec(this.endPoint).sub(this.getWorldLoc()).setZ(0);
                if (this.parentShape) {
                    if (this.offsetShape) delta.add(this.offsetShape.getWorldLoc());
                    delta.div(this.parentShape.getWorldScale());
                    delta.addAngle(-this.parentShape.getWorldAngle());
                    if (this.offsetShape) {
                        delta.mul(this.offsetShape.getWorldScale());
                        delta.addAngle(this.offsetShape.getWorldAngle())
                    }
                }
                this.gfx.lineTo(delta.getX(), delta.getY());
                this.gfx.endFill()
            }
        }, {
            key: "setWidth",
            value: function setWidth(width) {
                this.width = width;
                this.__redraw();
                return this
            }
        }, {
            key: "setStartPoint",
            value: function setStartPoint(startX, startY) {
                this.startPoint.set(startX, startY);
                return this
            }
        }, {
            key: "setEndPoint",
            value: function setEndPoint(endX, endY) {
                this.endPoint.set(endX, endY);
                return this
            }
        }, {
            key: "setOffsetAncestor",
            value: function setOffsetAncestor(shape) {
                this.offsetShape = shape;
                return this
            }
        }, {
            key: "getWidth",
            value: function getWidth() {
                return this.width
            }
        }, {
            key: "getStartPoint",
            value: function getStartPoint() {
                return this.startPoint
            }
        }, {
            key: "getEndPoint",
            value: function getEndPoint() {
                return this.endPoint
            }
        }, {
            key: "getOffsetAncestor",
            value: function getOffsetAncestor() {
                return this.offsetShape
            }
        }, {
            key: "__triggerScaleChange",
            value: function __triggerScaleChange() {
                _get(Line2d.prototype.__proto__ || Object.getPrototypeOf(Line2d.prototype), "__triggerScaleChange", this).call(this);
                this.__redraw()
            }
        }]);
        return Line2d
    }(Shape2d);;
    var TextShape2d = function(_Shape2d7) {
        _inherits(TextShape2d, _Shape2d7);

        function TextShape2d(graphics, text, color, font, size, preInit) {
            _classCallCheck(this, TextShape2d);
            var _this20 = _possibleConstructorReturn(this, (TextShape2d.__proto__ || Object.getPrototypeOf(TextShape2d)).call(this, graphics, color, function() {
                this.text = text;
                this.color = color;
                this.font = font;
                this.size = size;
                this.align = align;
                if (preInit) preInit.call(this)
            }));
            var This = _this20;
            _this20.getLoc().onChange(function() {
                This.gfx.x -= 0.5 * This.gfx.width;
                This.gfx.y -= 0.5 * This.gfx.height
            });
            return _this20
        }
        _createClass(TextShape2d, [{
            key: "__createGfx",
            value: function __createGfx() {
                var data = {
                    fontFamily: "Arial",
                    fontSize: 24,
                    fill: 65280,
                    align: "left"
                };
                if (this.font) data.fontFamily = this.font;
                if (this.color) data.fill = this.color;
                if (this.font) data.fontFamily = this.font;
                if (this.align) data.align = this.align;
                return new PIXI.Text(this.text, data)
            }
        }, {
            key: "setColor",
            value: function setColor(color) {
                if (color != null) {
                    _get(TextShape2d.prototype.__proto__ || Object.getPrototypeOf(TextShape2d.prototype), "setColor", this).call(this, color);
                    this.gfx.style.fill = color
                }
                return this
            }
        }]);
        return TextShape2d
    }(Shape2d);;
    var ImageShape2d = function(_Shape2d8) {
        _inherits(ImageShape2d, _Shape2d8);

        function ImageShape2d(graphics, source, width, height) {
            _classCallCheck(this, ImageShape2d);
            var _this21 = _possibleConstructorReturn(this, (ImageShape2d.__proto__ || Object.getPrototypeOf(ImageShape2d)).call(this, graphics, null, function() {
                this.source = source
            }));
            _this21.setWidth(width);
            _this21.setHeight(height);
            var This = _this21;
            _this21.getLoc().onChange(function() {
                This.gfx.x -= 0.5 * This.gfx.width;
                This.gfx.y -= 0.5 * This.gfx.height
            });
            return _this21
        }
        _createClass(ImageShape2d, [{
            key: "__createGfx",
            value: function __createGfx() {
                return new PIXI.Sprite.from(this.source)
            }
        }, {
            key: "setWidth",
            value: function setWidth(width) {
                this.gfx.width = width;
                return this
            }
        }, {
            key: "setHeight",
            value: function setHeight(height) {
                this.gfx.height = height;
                return this
            }
        }, {
            key: "getWidth",
            value: function getWidth() {
                return this.width
            }
        }, {
            key: "getHeight",
            value: function getHeight() {
                return this.height
            }
        }]);
        return ImageShape2d
    }(Shape2d);;
    var Rectangle2d = function(_Shape2d9) {
        _inherits(Rectangle2d, _Shape2d9);

        function Rectangle2d(graphics, width, height, color) {
            _classCallCheck(this, Rectangle2d);
            var _this22 = _possibleConstructorReturn(this, (Rectangle2d.__proto__ || Object.getPrototypeOf(Rectangle2d)).call(this, graphics, color));
            _this22.setWidth(width);
            _this22.setHeight(height);
            return _this22
        }
        _createClass(Rectangle2d, [{
            key: "__redraw",
            value: function __redraw() {
                this.gfx.clear();
                this.gfx.beginFill(this.color);
                this.gfx.drawRect(-0.5 * this.width, -0.5 * this.height, this.width, this.height);
                this.gfx.endFill();
                this.gfx.hitArea = new PIXI.Rectangle(-0.5 * this.width, -0.5 * this.height, this.width, this.height)
            }
        }, {
            key: "setWidth",
            value: function setWidth(width) {
                this.width = width;
                this.__redraw();
                return this
            }
        }, {
            key: "setHeight",
            value: function setHeight(height) {
                this.height = height;
                this.__redraw();
                return this
            }
        }, {
            key: "getWidth",
            value: function getWidth() {
                return this.width
            }
        }, {
            key: "getHeight",
            value: function getHeight() {
                return this.height
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                return Math.sqrt(this.width * this.width + this.height * this.height) / 2
            }
        }]);
        return Rectangle2d
    }(Shape2d);;
    var RoundedRectangle2d = function(_Shape2d10) {
        _inherits(RoundedRectangle2d, _Shape2d10);

        function RoundedRectangle2d(graphics, width, height, radius, color) {
            _classCallCheck(this, RoundedRectangle2d);
            var _this23 = _possibleConstructorReturn(this, (RoundedRectangle2d.__proto__ || Object.getPrototypeOf(RoundedRectangle2d)).call(this, graphics, color));
            _this23.setWidth(width);
            _this23.setHeight(height);
            _this23.setRadius(radius);
            return _this23
        }
        _createClass(RoundedRectangle2d, [{
            key: "__redraw",
            value: function __redraw() {
                this.gfx.clear();
                this.gfx.beginFill(this.color);
                this.gfx.drawRoundedRect(-0.5 * this.width, -0.5 * this.height, this.width, this.height, this.radius);
                this.gfx.endFill();
                this.gfx.hitArea = new PIXI.RoundedRectangle(-0.5 * this.width, -0.5 * this.height, this.width, this.height, this.radius)
            }
        }, {
            key: "setRadius",
            value: function setRadius(radius) {
                this.radius = radius;
                this.__redraw();
                return this
            }
        }, {
            key: "setWidth",
            value: function setWidth(width) {
                this.width = width;
                this.__redraw();
                return this
            }
        }, {
            key: "setHeight",
            value: function setHeight(height) {
                this.height = height;
                this.__redraw();
                return this
            }
        }, {
            key: "getWidth",
            value: function getWidth() {
                return this.width
            }
        }, {
            key: "getHeight",
            value: function getHeight() {
                return this.height
            }
        }, {
            key: "getRadius",
            value: function getRadius() {
                return this.radius
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                return (Math.sqrt((this.height - 2 * this.radius) * (this.height - 2 * this.radius) + (this.width - 2 * this.radius) * (this.width - 2 * this.radius)) + 2 * this.radius) / 2
            }
        }]);
        return RoundedRectangle2d
    }(Shape2d);;
    var Polygon2d = function(_Shape2d11) {
        _inherits(Polygon2d, _Shape2d11);

        function Polygon2d(graphics, points, color) {
            _classCallCheck(this, Polygon2d);
            var _this24 = _possibleConstructorReturn(this, (Polygon2d.__proto__ || Object.getPrototypeOf(Polygon2d)).call(this, graphics, color));
            _this24.setPoints(points);
            return _this24
        }
        _createClass(Polygon2d, [{
            key: "__redraw",
            value: function __redraw() {
                this.gfx.clear();
                this.gfx.beginFill(this.color);
                this.gfx.drawPolygon(this.points);
                this.gfx.endFill();
                this.gfx.hitArea = new PIXI.Polygon(this.points)
            }
        }, {
            key: "setPoints",
            value: function setPoints(points) {
                this.points = points;
                this.__redraw();
                return this
            }
        }, {
            key: "getPoints",
            value: function getPoints() {
                return this.points
            }
        }, {
            key: "__getPoints",
            value: function __getPoints() {
                return this.points
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                var radius = 0;
                for (var i = 0; i < this.points.length - 1; i += 2) {
                    var corner = new Vec(this.points[i], this.points[i + 1], 0);
                    var dist = corner.getLength();
                    if (dist > radius) {
                        radius = dist
                    }
                }
                return radius
            }
        }]);
        return Polygon2d
    }(Shape2d);;
    var Ellipse2d = function(_Shape2d12) {
        _inherits(Ellipse2d, _Shape2d12);

        function Ellipse2d(graphics, width, height, color) {
            _classCallCheck(this, Ellipse2d);
            var _this25 = _possibleConstructorReturn(this, (Ellipse2d.__proto__ || Object.getPrototypeOf(Ellipse2d)).call(this, graphics, color));
            _this25.setWidth(width);
            _this25.setHeight(height);
            return _this25
        }
        _createClass(Ellipse2d, [{
            key: "__redraw",
            value: function __redraw() {
                this.gfx.clear();
                this.gfx.beginFill(this.color);
                this.gfx.drawEllipse(-0.5 * this.width, -0.5 * this.height, this.width, this.height);
                this.gfx.hitArea = new PIXI.Ellipse(-0.5 * this.width, -0.5 * this.height, this.width, this.height)
            }
        }, {
            key: "setWidth",
            value: function setWidth(width) {
                this.width = width;
                this.__redraw();
                return this
            }
        }, {
            key: "setHeight",
            value: function setHeight(height) {
                this.height = height;
                this.__redraw();
                return this
            }
        }, {
            key: "getWidth",
            value: function getWidth() {
                return this.width
            }
        }, {
            key: "getHeight",
            value: function getHeight() {
                return this.height
            }
        }, {
            key: "getRadius",
            value: function getRadius() {
                return this.radius
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                if (this.width >= this.height) {
                    return this.width
                }
                return this.height
            }
        }]);
        return Ellipse2d
    }(Shape2d);;
    var Visualisation2d = function(_Graphics2d) {
        _inherits(Visualisation2d, _Graphics2d);

        function Visualisation2d(container, tree, options, preInit) {
            _classCallCheck(this, Visualisation2d);
            var _this26 = _possibleConstructorReturn(this, (Visualisation2d.__proto__ || Object.getPrototypeOf(Visualisation2d)).call(this, null, null, container, preInit));
            _this26.__setupVisualisation(tree, options);
            return _this26
        }
        _createClass(Visualisation2d, [{
            key: "destroy",
            value: function destroy(callback) {
                this.__destroy(callback);
                _get(Visualisation2d.prototype.__proto__ || Object.getPrototypeOf(Visualisation2d.prototype), "destroy", this).call(this)
            }
        }, {
            key: "__setupRoot",
            value: function __setupRoot() {
                var node = this.tree.getRoot();
                var clas = this.__getNodeShapeClass(Visualisation2d.classes, node);
                var shape = new clas(this, node);
                return shape.add()
            }
        }, {
            key: "__setupOptions",
            value: function __setupOptions(options) {
                var This = this
            }
        }, {
            key: "__onUpdate",
            value: function __onUpdate() {
                return AbstractVisualisation.prototype.__onUpdate.apply(this, arguments)
            }
        }]);
        return Visualisation2d
    }(Graphics2d);
    var keys = Object.getOwnPropertyNames(AbstractVisualisation.prototype);
    for (var i = 0; i < keys.length; i++) {
        if (!Visualisation2d.prototype[keys[i]]) Visualisation2d.prototype[keys[i]] = AbstractVisualisation.prototype[keys[i]]
    }
    window.Visualisation2d = Visualisation2d;
    Visualisation2d.classes = window.VIZ2D = {
        Visualisation: Visualisation2d,
        XYZ: XYZ,
        Vec: Vec,
        Color: Color,
        Shape: Shape2d,
        CompoundShape: CompoundShape2d,
        ShapeGroup: ShapeGroup2d,
        NodeShape: NodeShape2d,
        HtmlShape: HtmlShape2d,
        Circle: Circle2d,
        Line: Line2d,
        TextShape: TextShape2d,
        ImageShape: ImageShape2d,
        Rectangle: Rectangle2d,
        RoundedRectangle: RoundedRectangle2d,
        Polygon: Polygon2d,
        Ellipse: Ellipse2d,
        RadialBand: RadialBand2d
    };;
    var Camera3d = function(_AbstractCamera2) {
        _inherits(Camera3d, _AbstractCamera2);

        function Camera3d(graphics, threeCamera) {
            _classCallCheck(this, Camera3d);
            var _this27 = _possibleConstructorReturn(this, (Camera3d.__proto__ || Object.getPrototypeOf(Camera3d)).call(this, graphics, threeCamera));
            _this27.camera = threeCamera;
            _this27.setFOV(50);
            _this27.setDistance(1.5);
            var This = _this27;
            _this27.getLoc().onChange(function() {
                This.__updateLoc()
            });
            _this27.getRot().onChange(function() {
                this.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.x));
                This.camera.rotation.set(This.getXRot(), This.getYRot(), This.getZRot(), "YZX");
                This.__updateLoc()
            });
            _this27.rayCaster = new THREE.Raycaster;
            _this27.__updateLoc();
            return _this27
        }
        _createClass(Camera3d, [{
            key: "__updateLoc",
            value: function __updateLoc() {
                var vec = new Vec(this.getLoc());
                var dist = this.distance / this.getTotalScale();
                vec.sub(this.getRot().getLookAt().addYaw(Math.PI / 2).setLength(dist));
                var n = 10;
                this.camera.far = dist + n / this.getScale();
                this.camera.near = Math.max(1e-3 / this.getScale(), dist - n / this.getScale());
                this.camera.updateProjectionMatrix();
                this.camera.position.set(vec.getX(), vec.getY(), vec.getZ())
            }
        }, {
            key: "setWindowSize",
            value: function setWindowSize(width, height) {
                _get(Camera3d.prototype.__proto__ || Object.getPrototypeOf(Camera3d.prototype), "setWindowSize", this).call(this, width, height);
                this.windowSizeScaleFactor /= width / 1920;
                this.width = width;
                this.height = height;
                this.setFOV(this.getFOV());
                this.camera.aspect = width / height;
                this.__updateLoc();
                this.setScale(this.getScale());
                return this
            }
        }, {
            key: "setDistance",
            value: function setDistance(distance) {
                this.distance = distance;
                this.__updateLoc();
                this.graphics.__updateHtmlShapesLoc();
                return this
            }
        }, {
            key: "getDistance",
            value: function getDistance() {
                return this.distance
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                var ret = _get(Camera3d.prototype.__proto__ || Object.getPrototypeOf(Camera3d.prototype), "setScale", this).call(this, scale);
                this.__updateLoc();
                this.graphics.__updateHtmlShapesLoc();
                return ret
            }
        }, {
            key: "setFOV",
            value: function setFOV(fov) {
                this.fov = fov;
                var tanFOV = Math.tan(Math.PI / 180 * this.fov / 2);
                this.camera.fov = 360 / Math.PI * Math.atan(tanFOV * (this.height / this.width));
                this.camera.updateProjectionMatrix();
                return this
            }
        }, {
            key: "getFOV",
            value: function getFOV() {
                return this.fov
            }
        }, {
            key: "rayTrace",
            value: function rayTrace(x, y, getAllData) {
                if (typeof y != "number") {
                    getAllData = y;
                    y = null
                }
                var vec = new Vec(x, y);
                var vec2 = new THREE.Vector2(vec.getX() / this.graphics.getWidth() * 2 - 1, -(vec.getY() / this.graphics.getHeight() * 2 - 1));
                this.rayCaster.setFromCamera(vec2, this.camera);
                var intersects = this.rayCaster.intersectObjects(this.graphics.__getScene().children, true);
                var ret = [];
                for (var i = 0; i < intersects.length; i++) {
                    var intersect = intersects[i];
                    var mesh = intersect.object;
                    if (getAllData) {
                        if (mesh.userData && mesh.userData.shape) intersect.shape = mesh.userData.shape;
                        ret.push(intersect)
                    } else if (mesh.userData && mesh.userData.shape) ret.push(mesh.userData.shape)
                }
                return ret
            }
        }, {
            key: "translateScreenToWorldLoc",
            value: function translateScreenToWorldLoc(x, y, z) {
                var vec = new Vec(x, y, z);
                var vec2 = new THREE.Vector2(vec.getX() / this.graphics.getWidth() * 2 - 1, -(vec.getY() / this.graphics.getHeight() * 2 - 1));
                this.rayCaster.setFromCamera(vec2, this.camera);
                var vector = new THREE.Vector3;
                this.rayCaster.ray.at(vec.getZ() - this.distance / this.getTotalScale(), vector);
                return new Vec(vector)
            }
        }, {
            key: "translateWorldToScreenLoc",
            value: function translateWorldToScreenLoc(x, y, z) {
                var vec = new Vec(x, y, z);
                var size = new XYZ(this.graphics.getWidth(), this.graphics.getHeight());
                var vector = new THREE.Vector3(vec.getX(), vec.getY(), vec.getZ());
                vector.project(this.camera);
                var depth = vec.sub(this.camera.position).getLength();
                return new Vec((vector.x * 0.5 + 0.5) * size.getX(), (-vector.y * 0.5 + 0.5) * size.getY(), depth + this.distance / this.getTotalScale())
            }
        }]);
        return Camera3d
    }(AbstractCamera);;
    var tempMatrix = new THREE.Matrix4;
    var vec3 = new THREE.Vector3;
    var quaternion = new THREE.Quaternion;
    var euler = new THREE.Euler;
    window.VRCamera = new(function() {
        function VRCamera3d() {
            _classCallCheck(this, VRCamera3d);
            this.listeners = {
                available: [],
                connected: [],
                controllerConnected: []
            };
            this.state = {
                available: false,
                connected: false,
                controller1Connected: false,
                controller2Connected: false
            };
            this.hmd = null;
            this.controller1 = null;
            this.controller2 = null;
            this.__update = this.__update.bind(this);
            this.__render = this.__render.bind(this);
            this.transform = {
                scale: 1,
                loc: new XYZ,
                rot: new Vec
            };
            this.transformOffset = {
                scale: 1,
                loc: new XYZ,
                rot: new Vec
            };
            if (this.hasVRSupport()) {
                this.__setup();
                this.renderer = new THREE.WebGLRenderer({
                    antialias: true
                });
                this.renderer.setClearColor("#000000");
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(this.getWidth(), this.getHeight());
                this.renderer.vr.enabled = true;
                this.renderer.vr.standing = true;
                var This = this;
                $(function() {
                    var canvas = $(This.renderer.domElement);
                    canvas.addClass("VRrenderer");
                    $("body").append(canvas);
                    canvas.css({
                        "position": "absolute",
                        "left": 0,
                        "top": 0,
                        "z-index": -1
                    })
                });
                this.scene = new THREE.Scene;
                this.visualisationScene = new THREE.Object3D;
                this.camera = new THREE.PerspectiveCamera(75, this.getWidth() / this.getHeight(), 0.1, 1000);
                this.scene.add(this.camera);
                this.rayCaster = new THREE.Raycaster;
                this.rayCastGroup = new THREE.Group;
                this.rayCastGroup.add(this.visualisationScene);
                this.scene.add(this.rayCastGroup);
                this.defaultPointerDist = 0.2
            }
        }
        _createClass(VRCamera3d, [{
            key: "getWidth",
            value: function getWidth() {
                return 1
            }
        }, {
            key: "getHeight",
            value: function getHeight() {
                return 1
            }
        }, {
            key: "hasVRSupport",
            value: function hasVRSupport() {
                return !!navigator.getVRDisplays
            }
        }, {
            key: "getCanvas",
            value: function getCanvas() {
                return $(this.renderer.domElement)
            }
        }, {
            key: "__setup",
            value: function __setup() {
                var This = this;
                window.addEventListener("vrdisplayconnect", function(event) {
                    This.__hmdFound(event.display)
                }, false);
                window.addEventListener("vrdisplaydisconnect", function(event) {
                    This.__hmdNotFound()
                }, false);
                window.addEventListener("vrdisplaypresentchange", function(event) {
                    if (event.display.isPresenting) This.__hmdConnected();
                    else This.__hmdDisconnected()
                }, false);
                window.addEventListener("vrdisplayactivate", function(event) {}, false);
                window.addEventListener("vr controller connected", function(event) {
                    This.__controllerConnected(event.detail)
                });
                navigator.getVRDisplays().then(function(displays) {
                    if (displays.length > 0) {
                        This.__hmdFound(displays[0])
                    } else {
                        This.__hmdNotFound()
                    }
                })
            }
        }, {
            key: "onAvailableListener",
            value: function onAvailableListener(listener) {
                var index = this.listeners.available.indexOf(listener);
                if (index == -1) this.listeners.available.push(listener);
                listener.call(this, this.state.available);
                return this
            }
        }, {
            key: "offAvailableListener",
            value: function offAvailableListener(listener) {
                var index = this.listeners.available.indexOf(listener);
                if (index != -1) this.listeners.available.splice(index, 1);
                return this
            }
        }, {
            key: "onConnectedListener",
            value: function onConnectedListener(listener) {
                var index = this.listeners.connected.indexOf(listener);
                if (index == -1) this.listeners.connected.push(listener);
                listener.call(this, this.state.connected);
                return this
            }
        }, {
            key: "offConnectedListener",
            value: function offConnectedListener(listener) {
                var index = this.listeners.connected.indexOf(listener);
                if (index != -1) this.listeners.connected.splice(index, 1);
                return this
            }
        }, {
            key: "onControllerConnectedListener",
            value: function onControllerConnectedListener(listener) {
                var index = this.listeners.controllerConnected.indexOf(listener);
                if (index == -1) this.listeners.controllerConnected.push(listener);
                listener.call(this, this.state.controllerConnected);
                return this
            }
        }, {
            key: "offControllerConnectedListener",
            value: function offControllerConnectedListener(listener) {
                var index = this.listeners.controllerConnected.indexOf(listener);
                if (index != -1) this.listeners.controllerConnected.splice(index, 1);
                return this
            }
        }, {
            key: "__hmdFound",
            value: function __hmdFound(hmd) {
                this.hmd = hmd;
                this.state.available = true;
                for (var i = 0; i < this.listeners.available.length; i++) {
                    this.listeners.available[i].call(this, true)
                }
            }
        }, {
            key: "__hmdNotFound",
            value: function __hmdNotFound() {
                this.state.available = false;
                for (var i = 0; i < this.listeners.available.length; i++) {
                    this.listeners.available[i].call(this, false)
                }
            }
        }, {
            key: "__hmdConnected",
            value: function __hmdConnected() {
                this.state.connected = true;
                for (var i = 0; i < this.listeners.connected.length; i++) {
                    this.listeners.connected[i].call(this, true)
                }
                this.renderer.vr.setDevice(this.hmd);
                this.renderer.animate(this.__render)
            }
        }, {
            key: "__hmdDisconnected",
            value: function __hmdDisconnected() {
                this.state.connected = false;
                for (var i = 0; i < this.listeners.connected.length; i++) {
                    this.listeners.connected[i].call(this, false)
                }
                this.renderer.vr.setDevice(null);
                this.renderer.animate(null)
            }
        }, {
            key: "__controllerConnected",
            value: function __controllerConnected(controller) {
                var controllerID = controller.name.match(/left/i) ? 1 : controller.name.match(/right/i) ? 2 : this.state.controller1Connected ? 2 : 1;
                this.state["controller" + controllerID + "Connected"] = true;
                for (var i = 0; i < this.listeners.controllerConnected.length; i++) {
                    this.listeners.controllerConnected[i].call(this, true, controllerID)
                }
                this["controller" + controllerID] = controller;
                var This = this;
                this.scene.add(controller);
                controller.userData.id = controllerID;
                controller.standingMatrix = this.renderer.vr.getStandingMatrix();
                controller.head = this.camera;
                var colors = {
                    line: {
                        normal: 16711680,
                        hover: 16711680,
                        press: 16711680
                    },
                    pointer: {
                        normal: 16711680,
                        hover: 255,
                        press: 65280
                    }
                };
                var lineGeometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -1)]);
                var lineMaterial = new THREE.LineBasicMaterial({
                    color: colors.line.normal
                });
                var line = new THREE.Line(lineGeometry, lineMaterial);
                line.scale.z = this.defaultPointerDist;
                controller.add(line);
                controller.userData.line = line;
                var pointerGeometry = new THREE.SphereGeometry(0.005, 32, 32);
                var pointerMaterial = new THREE.MeshPhongMaterial({
                    color: colors.pointer.normal
                });
                var pointer = new THREE.Mesh(pointerGeometry, pointerMaterial);
                pointer.position.z = -this.defaultPointerDist;
                controller.add(pointer);
                controller.userData.pointer = pointer;
                controller.userData.colors = colors;
                controller.userData.pressedButtons = {
                    primary: false,
                    grip: false
                };
                controller.userData.scroll = 0;
                controller.userData.movePointer = 0;
                controller.userData.length = this.defaultPointerDist;
                controller.addEventListener("primary press began", function(event) {
                    This.__setButtonPressed(controller, "primary")
                });
                controller.addEventListener("grip press began", function(event) {
                    This.__setButtonPressed(controller, "grip")
                });
                controller.addEventListener("primary press ended", function(event) {
                    This.__setButtonReleased(controller, "primary")
                });
                controller.addEventListener("grip press ended", function(event) {
                    This.__setButtonReleased(controller, "grip")
                });
                var buttonPress = function buttonPress(event) {
                    This.__setButtonPressed(controller, "rescale")
                };
                var buttonRelease = function buttonRelease(event) {
                    This.__setButtonReleased(controller, "rescale")
                };
                controller.addEventListener("A press began", buttonPress);
                controller.addEventListener("B press began", buttonPress);
                controller.addEventListener("X press began", buttonPress);
                controller.addEventListener("Y press began", buttonPress);
                controller.addEventListener("A press ended", buttonRelease);
                controller.addEventListener("B press ended", buttonRelease);
                controller.addEventListener("X press ended", buttonRelease);
                controller.addEventListener("Y press ended", buttonRelease);
                var scroll = function scroll(event) {
                    controller.userData.scroll = event.axes[0];
                    controller.userData.movePointer = event.axes[1]
                };
                controller.addEventListener("thumbstick axes changed", scroll);
                controller.addEventListener("disconnected", function(event) {
                    This.__controlledDisconnected(controller)
                })
            }
        }, {
            key: "__controlledDisconnected",
            value: function __controlledDisconnected(controller) {
                var controllerID = controller == this.controller1 ? 1 : 2;
                this.state["controller" + controllerID + "Connected"] = false;
                for (var i = 0; i < this.listeners.controllerConnected.length; i++) {
                    this.listeners.controllerConnected[i].call(this, false, controllerID)
                }
                controller.parent.remove(controller)
            }
        }, {
            key: "enterVR",
            value: function enterVR() {
                if (this.hasVRSupport()) {
                    if (this.hmd) {
                        if (!this.hmd.isPresenting) {
                            this.hmd.requestPresent([{
                                source: this.renderer.domElement
                            }]);
                            if (!this.visualisation) {
                                this.setVisualisation(this.selectedVisualisation)
                            }
                        } else console.warn("already in VR")
                    } else console.warn("no HMD connected")
                }
            }
        }, {
            key: "leaveVR",
            value: function leaveVR() {
                if (this.hasVRSupport()) {
                    if (this.hmd) {
                        if (this.hmd.isPresenting) {
                            this.selectedVisualisation = this.visualisation;
                            this.setVisualisation(null);
                            this.hmd.exitPresent()
                        } else console.warn("not yet in VR")
                    } else console.warn("no HMD connected")
                }
            }
        }, {
            key: "isInVR",
            value: function isInVR() {
                return this.state.connected
            }
        }, {
            key: "__render",
            value: function __render() {
                if (this.hasVRSupport()) {
                    var now = Date.now();
                    var delta = (now - this.lastRender) / 1000;
                    if (this.visualisation) {
                        this.visualisation.__resetTransform();
                        this.visualisation.__interpolate(true)
                    }
                    this.__updateTransform();
                    THREE.VRController.update();
                    if (this.visualisation) {
                        if (this.controller1) {
                            var pos = this.__getControllerPosRelativeToScene(this.controller1);
                            this.visualisation.__setHand("hand1", pos, this.controller1.userData.pressedButtons.primary)
                        }
                        if (this.controller2) {
                            var pos = this.__getControllerPosRelativeToScene(this.controller2);
                            this.visualisation.__setHand("hand2", pos, this.controller2.userData.pressedButtons.primary)
                        }
                    }
                    var controllers = [];
                    if (this.controller1) controllers.push(this.controller1);
                    if (this.controller2) controllers.push(this.controller2);
                    for (var i = 0; i < controllers.length; i++) {
                        var controller = controllers[i];
                        var ud = controller.userData;
                        var line = ud.line;
                        var pointer = ud.pointer;
                        if (ud.movePointer != 0) {
                            var prop = ud.anchor || ud.dragging ? "dragLength" : "length";
                            var newLength = ud[prop] - ud.movePointer * delta * 1;
                            newLength = Math.max(this.defaultPointerDist, Math.min(4, newLength));
                            ud[prop] = newLength;
                            line.scale.z = newLength;
                            pointer.position.z = -newLength
                        }
                        if (!ud.anchor && !ud.dragging) {
                            var intersects = this.__getControllerIntersects(controller);
                            var intersection = intersects.shift();
                            var object = intersection && intersection.object;
                            while (object && object.userData.ignore) {
                                intersection = intersects.shift();
                                object = intersection && intersection.object
                            }
                            if (intersection && intersection.distance < ud.length) {
                                this.__setHover(controller, object);
                                ud.dragLength = intersection.distance;
                                line.scale.z = intersection.distance;
                                pointer.position.z = -intersection.distance
                            } else {
                                this.__setHover(controller, null);
                                line.scale.z = ud.length;
                                pointer.position.z = -ud.length
                            }
                        }
                    }
                    if (this.visualisation) {
                        if (this.controller1 && this.controller1.userData.anchor && this.controller2 && this.controller2.userData.anchor) {
                            var p = this.visualisation.VRproperties;
                            var old1 = this.controller1.userData.anchor;
                            var new1 = this.__getWorldPosition(this.controller1.userData.pointer).sub(p.offset);
                            var old2 = this.controller2.userData.anchor;
                            var new2 = this.__getWorldPosition(this.controller2.userData.pointer).sub(p.offset);
                            var oldGrip = new Vec(old1).sub(old2).setY(0);
                            var newGrip = new Vec(new1).sub(new2).setY(0);
                            var offset = new Vec(this.transform.loc).sub(old1);
                            var scale = newGrip.getLength() / oldGrip.getLength();
                            var angle = newGrip.getYaw() - oldGrip.getYaw();
                            var loc = new Vec(offset).mul(scale).addYaw(angle).sub(offset);
                            var movement = new Vec(new1).sub(old1).mul(1, 0.5, 1).add(0, (new2.getY() - old2.getY()) / 2, 0);
                            loc.add(movement);
                            this.transformOffset.scale = scale;
                            this.transformOffset.rot.setY(angle);
                            this.transformOffset.loc.set(loc);
                            this.__updateTransform()
                        } else if (this.controller1 && this.controller1.userData.anchor) {
                            var p = this.visualisation.VRproperties;
                            var vec = this.__getWorldPosition(this.controller1.userData.pointer).sub(this.controller1.userData.anchor).sub(p.offset);
                            this.transformOffset.loc.set(vec);
                            this.__updateTransform()
                        } else if (this.controller2 && this.controller2.userData.anchor) {
                            var p = this.visualisation.VRproperties;
                            var vec = this.__getWorldPosition(this.controller2.userData.pointer).sub(this.controller2.userData.anchor).sub(p.offset);
                            this.transformOffset.loc.set(vec);
                            this.__updateTransform()
                        }
                    }
                    this.__updateTransform();
                    this.renderer.render(this.scene, this.camera);
                    this.lastRender = now
                }
            }
        }, {
            key: "__update",
            value: function __update() {
                var controllers = [];
                if (this.controller1) controllers.push(this.controller1);
                if (this.controller2) controllers.push(this.controller2);
                for (var i = 0; i < controllers.length; i++) {
                    var controller = controllers[i];
                    if (this.visualisation) {
                        if (controller.userData.hover != null) {
                            if (controller.userData.scroll != 0) {
                                var delta = controller.userData.scroll * -100;
                                var caught = this.visualisation.__dispatchEvent(function() {
                                    return this.__triggerMouseScroll(delta)
                                }, controller.userData.hover.userData.shape);
                                if (!caught) this.visualisation.__triggerMouseScroll(delta)
                            }
                            if (controller.userData.primaryChanged) {
                                controller.userData.primaryChanged = false;
                                var pressed = controller.userData.pressedButtons.primary;
                                var caught = this.visualisation.__dispatchEvent(function() {
                                    if (!pressed) this.__triggerClick();
                                    return this.__triggerMousePress(pressed)
                                }, controller.userData.hover.userData.shape);
                                if (!caught) this.visualisation.__triggerMousePress(pressed)
                            }
                        } else {
                            if (controller.userData.scroll != 0) {
                                var delta = controller.userData.scroll * -100;
                                this.visualisation.__triggerMouseScroll(delta)
                            }
                            if (controller.userData.primaryChanged) {
                                controller.userData.primaryChanged = false;
                                if (!pressed) this.visualisation.__triggerClick();
                                this.visualisation.__triggerMousePress(pressed)
                            }
                        }
                    }
                }
            }
        }, {
            key: "__applyTransformOffset",
            value: function __applyTransformOffset() {
                var p = this.visualisation.VRproperties;
                this.transform.scale *= this.transformOffset.scale;
                this.transform.loc.add(this.transformOffset.loc);
                this.transform.rot.add(this.transformOffset.rot);
                this.transformOffset.scale = 1;
                this.transformOffset.loc.set(0, 0, 0);
                this.transformOffset.rot.set(0, 0, 0);
                if (this.controller1 && this.controller1.userData.anchor) {
                    this.controller1.userData.anchor = this.__getWorldPosition(this.controller1.userData.pointer).sub(p.offset)
                }
                if (this.controller2 && this.controller2.userData.anchor) {
                    this.controller2.userData.anchor = this.__getWorldPosition(this.controller2.userData.pointer).sub(p.offset)
                }
            }
        }, {
            key: "__updateTransform",
            value: function __updateTransform() {
                if (this.visualisation) {
                    var p = this.visualisation.VRproperties;
                    var scene = this.visualisation.__getScene();
                    scene.scale.set(p.scale * this.transform.scale * this.transformOffset.scale, p.scale * this.transform.scale * this.transformOffset.scale, p.scale * this.transform.scale * this.transformOffset.scale);
                    scene.position.set(p.offset.getX() + this.transform.loc.getX() + this.transformOffset.loc.getX(), p.offset.getY() + this.transform.loc.getY() + this.transformOffset.loc.getY(), p.offset.getZ() + this.transform.loc.getZ() + this.transformOffset.loc.getZ());
                    scene.rotation.set(this.transform.rot.getX() + this.transformOffset.rot.getX(), this.transform.rot.getY() + this.transformOffset.rot.getY(), this.transform.rot.getZ() + this.transformOffset.rot.getZ());
                    scene.updateMatrixWorld()
                }
            }
        }, {
            key: "__getControllerIntersects",
            value: function __getControllerIntersects(controller) {
                tempMatrix.identity().extractRotation(controller.matrixWorld);
                this.rayCaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
                this.rayCaster.ray.direction.set(0, 0, -1).applyMatrix4(tempMatrix);
                return this.rayCaster.intersectObjects(this.rayCastGroup.children, true)
            }
        }, {
            key: "__setHover",
            value: function __setHover(controller, object) {
                if (controller.userData.hover != object) {
                    var oldHover = controller.userData.hover;
                    if (oldHover) {
                        var shape = oldHover.userData.shape
                    }
                    controller.userData.hover = object;
                    var newHover = object;
                    if (newHover) {
                        var shape = newHover.userData.shape;
                        if (this.visualisation) this.visualisation.__dispatchHoverEvent(shape, "hand" + controller.userData.id)
                    } else {
                        if (this.visualisation) this.visualisation.__dispatchHoverEvent(null, "hand" + controller.userData.id)
                    }
                    this.__updateControllerStyle(controller)
                }
            }
        }, {
            key: "__setButtonPressed",
            value: function __setButtonPressed(controller, button) {
                controller.userData.pressedButtons[button] = true;
                this.__updateControllerStyle(controller);
                if (button == "rescale" && this.visualisation) {
                    this.__applyTransformOffset();
                    var p = this.visualisation.VRproperties;
                    controller.userData.anchor = this.__getWorldPosition(controller.userData.pointer).sub(p.offset)
                }
                if (button == "primary") controller.userData.primaryChanged = true;
                if (button == "grip" && this.visualisation && this.visualisation.dragShape) {
                    var shape = controller.userData.hover;
                    shape = shape && shape.userData.shape;
                    while (shape && !(shape instanceof NodeShape3d)) {
                        shape = shape.parentShape
                    }
                    if (shape) {
                        this.visualisation.dragShape(shape, "hand" + controller.userData.id);
                        controller.userData.dragging = shape;
                        var dist = new Vec(shape.getWorldLoc()).sub(this.__getWorldPosition(controller.userData.pointer)).getLength();
                        controller.userData.dragLength = dist;
                        controller.userData.line.scale.z += dist;
                        controller.userData.pointer.position.z -= dist
                    }
                }
            }
        }, {
            key: "__setButtonReleased",
            value: function __setButtonReleased(controller, button) {
                controller.userData.pressedButtons[button] = false;
                this.__updateControllerStyle(controller);
                if (button == "rescale") {
                    controller.userData.anchor = null;
                    this.__applyTransformOffset()
                }
                if (button == "primary") controller.userData.primaryChanged = true;
                if (button == "grip" && this.visualisation && this.visualisation.dragShape) {
                    this.visualisation.dragShape(null, "hand" + controller.userData.id);
                    controller.userData.dragging = null
                }
            }
        }, {
            key: "__updateControllerStyle",
            value: function __updateControllerStyle(controller) {
                var lineC = controller.userData.colors.line.normal;
                var pointerC = controller.userData.colors.pointer.normal;
                if (controller.userData.pressedButtons.primary) {
                    lineC = controller.userData.colors.line.press;
                    pointerC = controller.userData.colors.pointer.press
                } else if (controller.userData.hover) {
                    lineC = controller.userData.colors.line.hover;
                    pointerC = controller.userData.colors.pointer.hover
                }
                controller.userData.line.material.color.setHex(lineC);
                controller.userData.pointer.material.color.setHex(pointerC)
            }
        }, {
            key: "__getControllerPosRelativeToScene",
            value: function __getControllerPosRelativeToScene(controller) {
                controller.userData.pointer.getWorldPosition(vec3);
                var rel = new Vec(vec3);
                var scene = this.visualisation.__getScene();
                scene.getWorldPosition(vec3);
                rel.sub(vec3).div(scene.scale.x).rotate(new Vec(-scene.rotation.x, -scene.rotation.y, -scene.rotation.z));
                return rel
            }
        }, {
            key: "__getWorldPosition",
            value: function __getWorldPosition(object) {
                object.getWorldPosition(vec3);
                return new Vec(vec3)
            }
        }, {
            key: "__getScenePosition",
            value: function __getScenePosition(object) {
                object.getWorldPosition(vec3);
                var rel = new Vec(vec3);
                this.visualisationS.__getScene().getWorldPosition(vec3);
                rel.sub(vec3).div(this.visualisationScene.scale.x);
                return rel
            }
        }, {
            key: "setVisualisation",
            value: function setVisualisation(visualisation) {
                if (this.hasVRSupport()) {
                    if (this.visualisation) {
                        var scene = this.visualisation.__getScene();
                        this.visualisationScene.remove(scene);
                        this.visualisation.offUpdate(this.__update);
                        this.visualisation.__disableVR()
                    }
                    if (this.hmd && this.hmd.isPresenting) {
                        this.visualisation = visualisation;
                        if (this.visualisation) {
                            var scene = this.visualisation.__getScene();
                            this.visualisationScene.add(scene);
                            this.visualisation.onUpdate(this.__update);
                            this.visualisation.__enableVR()
                        }
                    } else {
                        this.selectedVisualisation = visualisation
                    }
                }
                return this
            }
        }, {
            key: "getVisualisation",
            value: function getVisualisation() {
                return this.visualisation
            }
        }]);
        return VRCamera3d
    }());;
    var Graphics3d = function(_AbstractGraphics3) {
        _inherits(Graphics3d, _AbstractGraphics3);

        function Graphics3d(width, height, container) {
            _classCallCheck(this, Graphics3d);
            var _this28 = _possibleConstructorReturn(this, (Graphics3d.__proto__ || Object.getPrototypeOf(Graphics3d)).call(this, width, height, container));
            _this28.container.on("finishResize, resize", function(event, size) {
                var newSize = {
                    width: This.container.width(),
                    height: This.container.height()
                };
                This.size = newSize;
                This.camera.setWindowSize(newSize.width, newSize.height);
                This.renderer.setSize(newSize.width, newSize.height)
            });
            _this28.scene = new THREE.Scene;
            var camera = new THREE.PerspectiveCamera(75, _this28.getWidth() / _this28.getHeight(), 0.001, 2);
            _this28.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            });
            _this28.renderer.setClearColor("#000000", 0);
            _this28.renderer.setSize(_this28.getWidth(), _this28.getHeight());
            _this28.container.append($(_this28.renderer.domElement).addClass("three").attr("oncontextmenu", "return false;"));
            var This = _this28;
            _this28.renderListeners = [];
            _this28.updating = true;
            _this28.rendering = 1;
            _this28.lastUpdate = Date.now();
            _this28.lastRender = Date.now();
            _this28.deltaTime = 1 / 30;
            _this28.tick = 0;
            _this28.renderFunc = function() {
                if (This.rendering == 1) requestAnimationFrame(This.renderFunc);
                if (This.rendering == 2) This.rendering = 0;
                var now = Date.now();
                if ((now - This.lastUpdate) / 1000 > This.deltaTime) {
                    This.__resetTransform();
                    This.tick++;
                    This.lastUpdate += This.deltaTime * 1000;
                    if (now - This.lastUpdate > 2000) This.lastUpdate = now;
                    This.__interpolate();
                    if (This.updating) This.__onUpdate(This.deltaTime);
                    This.renderer.render(This.scene, camera)
                } else {}
                This.lastRender = now
            };
            _this28.renderFunc();
            _this28.ambientLight = {
                color: 16777215,
                intensity: 0.3,
                light: new THREE.AmbientLight(16777215)
            };
            _this28.ambientLight.light.intensity = _this28.ambientLight.intensity;
            _this28.scene.add(_this28.ambientLight.light);
            _this28.camera = new Camera3d(_this28, camera);
            _this28.camera.setWindowSize(_this28.getWidth(), _this28.getHeight());
            _this28.VRproperties = {
                enabled: true,
                scale: 1.5,
                offset: new XYZ(0.2, 0.2, 0.2)
            };
            _this28.pointers = {
                types: ["mouse"],
                mouse: new XYZ,
                hand1: new XYZ,
                hand2: new XYZ
            };
            for (var i = 0; i < 3; i++) {
                var pointer = _this28.pointers[["mouse", "hand1", "hand2"][i]];
                pointer.pressed = false;
                pointer.hoverShapes = []
            } {
                var canvas = _this28.getCanvas();
                _this28.DOMEventListeners.mousemove = function(event) {
                    This.__resetTransform();
                    var offset = canvas.offset();
                    This.pointers.mouse.x = event.pageX - offset.left;
                    This.pointers.mouse.y = event.pageY - offset.top;
                    var pos = new Vec(This.pointers.mouse);
                    This.__dispatchEvent(function() {
                        this.__triggerMouseMove(pos, event)
                    });
                    This.__triggerMouseMove(pos, event);
                    var shape = This.camera.rayTrace(This.pointers.mouse.x, This.pointers.mouse.y)[0];
                    var m = This.pointers.mouse;
                    if (m.x >= 0 && m.y >= 0 && m.x <= This.getWidth() && m.y <= This.getHeight()) This.__dispatchHoverEvent(shape, "mouse", event);
                    else This.__dispatchHoverEvent(null, "mouse", event)
                };
                _this28.DOMEventListeners.scroll = function(event) {
                    This.__resetTransform();
                    var delta = event.originalEvent.wheelDeltaY || event.originalEvent.deltaY * -40;
                    var caught = This.__dispatchEvent(function() {
                        return this.__triggerMouseScroll(delta, event)
                    });
                    var m = This.pointers.mouse;
                    if (!caught && m.x >= 0 && m.y >= 0 && m.x <= This.getWidth() && m.y <= This.getHeight()) This.__triggerMouseScroll(delta, event)
                };
                _this28.DOMEventListeners.keypress = function(event) {
                    This.__resetTransform();
                    event.key = keyNames[event.keyCode] || event.key;
                    if (event.type == "keyup") delete This.pressedKeys[event.key.toLowerCase()];
                    var isKeyDown = event.type == "keydown";
                    var key = event.key;
                    var keyCode = key ? key.toLowerCase() : key;
                    var caught = This.__dispatchEvent(function() {
                        return this.__triggerKeyPress(isKeyDown, keyCode, event)
                    });
                    var m = This.pointers.mouse;
                    if (!caught && m.x >= 0 && m.y >= 0 && m.x <= This.getWidth() && m.y <= This.getHeight()) This.__triggerKeyPress(isKeyDown, keyCode, event)
                };
                var startedIn = false;
                _this28.DOMEventListeners.mousepress = function(event) {
                    This.__resetTransform();
                    var isMouseDown = event.type == "mousedown";
                    if ($(event.target).is("canvas")) event.preventDefault();
                    var caught = This.__dispatchEvent(function() {
                        if (!isMouseDown) this.__triggerClick(event);
                        return this.__triggerMousePress(isMouseDown, event)
                    });
                    var m = This.pointers.mouse;
                    if (m.x >= 0 && m.y >= 0 && m.x <= This.getWidth() && m.y <= This.getHeight() || startedIn) {
                        if (startedIn) event.preventDefault();
                        if (!caught) {
                            if (!isMouseDown) This.__triggerClick(event);
                            This.__triggerMousePress(isMouseDown, event)
                        }
                        startedIn = isMouseDown
                    }
                };
                $(window).on("wheel", _this28.DOMEventListeners.scroll);
                $(window).on("keydown", _this28.DOMEventListeners.keypress);
                $(window).on("keyup", _this28.DOMEventListeners.keypress);
                $(window).on("mousemove", _this28.DOMEventListeners.mousemove);
                $(window).on("mousedown", _this28.DOMEventListeners.mousepress);
                $(window).on("mouseup", _this28.DOMEventListeners.mousepress)
            }
            return _this28
        }
        _createClass(Graphics3d, [{
            key: "getRenderer",
            value: function getRenderer() {
                return this.renderer
            }
        }, {
            key: "getCanvas",
            value: function getCanvas() {
                return this.getContainer().find("canvas.three")
            }
        }, {
            key: "__resetTransform",
            value: function __resetTransform() {
                this.scene.position.set(0, 0, 0);
                this.scene.scale.set(1, 1, 1);
                this.scene.rotation.set(0, 0, 0);
                this.scene.updateMatrixWorld()
            }
        }, {
            key: "onRender",
            value: function onRender(listener) {
                var index = this.renderListeners.indexOf(listener);
                if (index == -1) this.renderListeners.push(listener);
                return this
            }
        }, {
            key: "offRender",
            value: function offRender(listener) {
                var index = this.renderListeners.indexOf(listener);
                if (index != -1) this.renderListeners.splice(index, 1);
                return this
            }
        }, {
            key: "__onRender",
            value: function __onRender(delta, per) {
                for (var i = 0; i < this.renderListeners.length; i++) {
                    this.renderListeners[i].apply(this, arguments)
                }
                return this
            }
        }, {
            key: "__interpolate",
            value: function __interpolate(fromVR) {
                var now = Date.now();
                var delta = (now - this.lastUpdate) / this.deltaTime / 1000;
                this.__onRender(now - this.lastRender, delta);
                var shapes = this.getShapes();
                for (var i = 0; i < shapes.length; i++) {
                    var shape = shapes[i];
                    shape.__interpolate(delta)
                }
                for (var i = 0; i < this.shapes.html.length; i++) {
                    var h = this.shapes.html[i];
                    if (!fromVR) {
                        h.mesh.visible = false
                    } else if (h.isRendered) {
                        h.mesh.visible = true
                    }
                }
            }
        }, {
            key: "destroy",
            value: function destroy() {
                $(window).off("wheel", this.DOMEventListeners.scroll);
                $(window).off("keydown", this.DOMEventListeners.keypress);
                $(window).off("keyup", this.DOMEventListeners.keypress);
                $(window).off("mousemove", this.DOMEventListeners.mousemove);
                $(window).off("mousedown", this.DOMEventListeners.mousepress);
                $(window).off("mouseup", this.DOMEventListeners.mousepress);
                if (this.inVR) {
                    VRCamera.setVisualisation(null)
                };
                _get(Graphics3d.prototype.__proto__ || Object.getPrototypeOf(Graphics3d.prototype), "destroy", this).call(this)
            }
        }, {
            key: "__dispatchEvent",
            value: function __dispatchEvent(func, pos) {
                var que;
                if (pos instanceof AbstractShape) {
                    que = [pos]
                } else {
                    if (!pos) pos = this.pointers.mouse;
                    que = this.camera.rayTrace(pos.x, pos.y)
                }
                while (que.length > 0) {
                    var shape = que.shift();
                    var parentShape = shape.getParentShape();
                    if (parentShape) que.unshift(parentShape);
                    if (!shape.interactionsDisabled && func.call(shape)) return true
                }
                return false
            }
        }, {
            key: "__dispatchHoverEvent",
            value: function __dispatchHoverEvent(shape, pointer, event) {
                if (this.pointers.types.indexOf(pointer) == -1) pointer = "mouse";
                pointer = this.pointers[pointer];
                var oldHoverCode = pointer.hoverCode;
                var newHoverCode = Math.floor(Math.pow(10, 6) * Math.random()) + "";
                pointer.hoverCode = newHoverCode;
                var shapes = pointer.hoverShapes;
                while (shape) {
                    shape.__hoverCodes.push(newHoverCode);
                    if (shapes.indexOf(shape) == -1) {
                        shapes.push(shape);
                        shape.__triggerHover(true, event)
                    }
                    shape = shape.getParentShape()
                }
                for (var i = shapes.length - 1; i >= 0; i--) {
                    var shape = shapes[i];
                    var oldCodeIndex = shape.__hoverCodes.indexOf(oldHoverCode);
                    if (oldCodeIndex != -1) shape.__hoverCodes.splice(oldCodeIndex, 1);
                    if (shape.__hoverCodes.indexOf(newHoverCode) == -1) {
                        var index = shapes.indexOf(shape);
                        if (index != -1) shapes.splice(index, 1);
                        if (shape.__hoverCodes.length == 0) shape.__triggerHover(false, event)
                    }
                }
            }
        }, {
            key: "pause",
            value: function pause(fully) {
                this.lastUpdate = Date.now() + 2000;
                if (!fully) {
                    this.updating = false
                } else {
                    if (this.rendering == 1) this.rendering = 2
                }
                return this
            }
        }, {
            key: "start",
            value: function start() {
                this.lastUpdate = Date.now();
                this.updating = true;
                var wasNotRendering = this.rendering == 0;
                this.rendering = 1;
                if (wasNotRendering) this.renderFunc();
                return this
            }
        }, {
            key: "__getScene",
            value: function __getScene() {
                return this.scene
            }
        }, {
            key: "__getRenderer",
            value: function __getRenderer() {
                return this.renderer
            }
        }, {
            key: "setAmbientLightIntensity",
            value: function setAmbientLightIntensity(intensity) {
                this.ambientLight.intensity = intensity;
                this.ambientLight.light.intensity = intensity;
                return this
            }
        }, {
            key: "getAmbientLightIntensity",
            value: function getAmbientLightIntensity() {
                return this.ambientLight.intensity
            }
        }, {
            key: "setAmbientLightColor",
            value: function setAmbientLightColor(color) {
                this.ambientLight.color = color;
                this.ambientLight.light.color.set(color);
                return this
            }
        }, {
            key: "getAmbientLightColor",
            value: function getAmbientLightColor() {
                return this.ambientLight.color
            }
        }, {
            key: "getMouseScreenLoc",
            value: function getMouseScreenLoc() {
                return this.pointers.mouse
            }
        }, {
            key: "getMouseLoc",
            value: function getMouseLoc(distance, pointer) {
                if (typeof distance == "string") {
                    pointer = distance;
                    distance = null
                }
                if (this.pointers.types.indexOf(pointer) == -1) pointer = "mouse";
                if (pointer != "mouse") return this.pointers[pointer];
                return this.camera.translateScreenToWorldLoc(this.getMouseScreenLoc().setZ(distance != null ? distance : 0))
            }
        }, {
            key: "getMouseVec",
            value: function getMouseVec(x, y, z) {
                var xyz;
                if (x instanceof AbstractShape) xyz = new Vec(x.getWorldLoc());
                else xyz = new Vec(x, y, z);
                var closest = new Vec(xyz).sub(this.getMouseLoc());
                for (var i = 1; i < this.pointers.types.length; i++) {
                    var type = this.pointers.types[i];
                    var pos = this.getMouseLoc(null, type);
                    var vec = new Vec(xyz).sub(pos);
                    if (vec.getLength() < closest.getLength()) closest = vec
                }
                return vec
            }
        }, {
            key: "getMousePressed",
            value: function getMousePressed(pointer) {
                if (this.pointers.types.indexOf(pointer) == -1) pointer = "mouse";
                return this.pointers[pointer].pressed
            }
        }, {
            key: "__enableVR",
            value: function __enableVR() {
                this.pointers.types = ["mouse", "hand1", "hand2"];
                this.inVR = true
            }
        }, {
            key: "__disableVR",
            value: function __disableVR() {
                this.pointers.types = ["mouse"];
                this.inVR = false
            }
        }, {
            key: "isInVR",
            value: function isInVR() {
                return this.inVR
            }
        }, {
            key: "__setHand",
            value: function __setHand(pointer, pos, pressed) {
                var p = this.pointers[pointer];
                p.set(pos);
                p.pressed = pressed
            }
        }]);
        return Graphics3d
    }(AbstractGraphics);;
    var vec3 = new THREE.Vector3;
    var quaternion = new THREE.Quaternion;
    var euler = new THREE.Euler;
    var Shape3d = function(_AbstractShape3) {
        _inherits(Shape3d, _AbstractShape3);

        function Shape3d(graphics, color, preInit) {
            _classCallCheck(this, Shape3d);
            var _this29 = _possibleConstructorReturn(this, (Shape3d.__proto__ || Object.getPrototypeOf(Shape3d)).call(this, graphics, preInit));
            _this29.__createMaterial();
            _this29.__createShape();
            _this29.__createMesh();
            _this29.setColor(color);
            var This = _this29;
            _this29.getLoc().onChange(function() {
                This.__markDirty()
            });
            _this29.getRot().onChange(function(old) {
                This.__markDirty()
            });
            _this29.prevTransform = {
                loc: new XYZ,
                rot: new Vec,
                scale: 1
            };
            _this29.__hoverCodes = [];
            return _this29
        }
        _createClass(Shape3d, [{
            key: "__createShape",
            value: function __createShape() {}
        }, {
            key: "__createMaterial",
            value: function __createMaterial() {
                this.material = new THREE.MeshPhongMaterial({
                    color: "#000000"
                });
                return this
            }
        }, {
            key: "__createMesh",
            value: function __createMesh() {
                if (this.geometry) {
                    this.mesh = new THREE.Mesh(this.geometry, this.material);
                    this.mesh.userData = {
                        shape: this
                    }
                }
            }
        }, {
            key: "__interpolate",
            value: function __interpolate(delta) {
                if (this.prevTransform.tick >= this.graphics.tick) {
                    if (this.prevTransform.tick == this.graphics.tick) this.updateTransform();
                    else {
                        this.__setMeshRot(delta);
                        this.__setMeshLoc(delta);
                        this.__setMeshScale(delta)
                    }
                }
            }
        }, {
            key: "updateTransform",
            value: function updateTransform() {
                this.prevTransform.rot.set(this.transform.rot);
                this.prevTransform.loc.set(this.transform.loc);
                this.prevTransform.scale = this.transform.scale;
                this.__setMeshRot(0);
                this.__setMeshLoc(0);
                this.__setMeshScale(0);
                return this
            }
        }, {
            key: "__setMeshRot",
            value: function __setMeshRot(per) {
                var prevRot = this.prevTransform.rot;
                var rot = this.transform.rot;
                this.mesh.rotation.set(prevRot.x * (1 - per) + rot.x * per, prevRot.y * (1 - per) + rot.y * per, prevRot.z * (1 - per) + rot.z * per, "YZX")
            }
        }, {
            key: "__setMeshLoc",
            value: function __setMeshLoc(per) {
                var prevLoc = this.prevTransform.loc;
                var loc = this.transform.loc;
                this.mesh.position.set(prevLoc.x * (1 - per) + loc.x * per, prevLoc.y * (1 - per) + loc.y * per, prevLoc.z * (1 - per) + loc.z * per)
            }
        }, {
            key: "__setMeshScale",
            value: function __setMeshScale(per) {
                var scale = this.prevTransform.scale * (1 - per) + this.transform.scale * per;
                this.mesh.scale.set(scale, scale, scale)
            }
        }, {
            key: "__markDirty",
            value: function __markDirty() {
                this.prevTransform.tick = this.graphics.tick + 1
            }
        }, {
            key: "getAbsoluteX",
            value: function getAbsoluteX() {
                var camera = this.getGraphics().getCamera();
                return camera.translateWorldToScreenLoc(this.getWorldLoc()).getX()
            }
        }, {
            key: "getAbsoluteY",
            value: function getAbsoluteY() {
                var camera = this.getGraphics().getCamera();
                return camera.translateWorldToScreenLoc(this.getWorldLoc()).getY()
            }
        }, {
            key: "getWorldLoc",
            value: function getWorldLoc() {
                this.mesh.getWorldPosition(vec3);
                return new XYZ(vec3)
            }
        }, {
            key: "getWorldScale",
            value: function getWorldScale() {
                this.mesh.getWorldScale(vec3);
                return vec3.x
            }
        }, {
            key: "getWorldRot",
            value: function getWorldRot() {
                this.mesh.getWorldQuaternion(quaternion);
                euler.setFromQuaternion(quaternion);
                return new XYZ(euler._x, euler._y, euler._z)
            }
        }, {
            key: "getWorldAngle",
            value: function getWorldAngle() {
                return this.getWorldRotation()
            }
        }, {
            key: "setColor",
            value: function setColor(color) {
                this.material.color.setHex(color);
                return _get(Shape3d.prototype.__proto__ || Object.getPrototypeOf(Shape3d.prototype), "setColor", this).call(this, color)
            }
        }, {
            key: "setAlpha",
            value: function setAlpha(alpha) {
                this.material.opacity = alpha;
                this.material.transparent = alpha != 1;
                return _get(Shape3d.prototype.__proto__ || Object.getPrototypeOf(Shape3d.prototype), "setAlpha", this).call(this, alpha)
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                this.__markDirty();
                _get(Shape3d.prototype.__proto__ || Object.getPrototypeOf(Shape3d.prototype), "setScale", this).call(this, scale);
                return this
            }
        }, {
            key: "add",
            value: function add() {
                _get(Shape3d.prototype.__proto__ || Object.getPrototypeOf(Shape3d.prototype), "add", this).call(this);
                this.graphics.__getScene().add(this.mesh);
                this.mesh.updateMatrixWorld();
                this.updateTransform();
                this.__updateAABB();
                return this
            }
        }, {
            key: "__delete",
            value: function __delete() {
                this.graphics.__getScene().remove(this.mesh);
                _get(Shape3d.prototype.__proto__ || Object.getPrototypeOf(Shape3d.prototype), "__delete", this).call(this)
            }
        }, {
            key: "__setParentShape",
            value: function __setParentShape(parent) {
                _get(Shape3d.prototype.__proto__ || Object.getPrototypeOf(Shape3d.prototype), "__setParentShape", this).call(this, parent);
                this.mesh.updateMatrixWorld();
                this.updateTransform();
                return this
            }
        }, {
            key: "setVRhitboxEnabled",
            value: function setVRhitboxEnabled(enabled) {
                this.mesh.userData.ignore = !enabled;
                return this
            }
        }]);
        return Shape3d
    }(AbstractShape);;
    var Cuboid3d = function(_Shape3d) {
        _inherits(Cuboid3d, _Shape3d);

        function Cuboid3d(graphics, width, height, depth, color, preInit) {
            _classCallCheck(this, Cuboid3d);
            var _this30 = _possibleConstructorReturn(this, (Cuboid3d.__proto__ || Object.getPrototypeOf(Cuboid3d)).call(this, graphics, color, function() {
                this.size = new XYZ(width, height, depth);
                if (height && height.call) height.call(this);
                if (preInit && preInit.call) preInit.call(this)
            }));
            _this30.prevTransform.size = new XYZ;
            var This = _this30;
            _this30.size.onChange(function() {
                This.__markDirty()
            });
            _this30.setScale(1);
            _this30.updateTransform();
            return _this30
        }
        _createClass(Cuboid3d, [{
            key: "__createShape",
            value: function __createShape() {
                this.geometry = Cuboid3d.geometry
            }
        }, {
            key: "__setMeshScale",
            value: function __setMeshScale(per) {
                var scale = this.prevTransform.scale * (1 - per) + this.transform.scale * per;
                var oldSize = this.prevTransform.size;
                var size = this.size;
                this.mesh.scale.x = scale * (oldSize.x * (1 - per) + size.x * per);
                this.mesh.scale.y = scale * (oldSize.y * (1 - per) + size.y * per);
                this.mesh.scale.z = scale * (oldSize.z * (1 - per) + size.z * per)
            }
        }, {
            key: "updateTransform",
            value: function updateTransform() {
                this.prevTransform.size.set(this.size);
                return _get(Cuboid3d.prototype.__proto__ || Object.getPrototypeOf(Cuboid3d.prototype), "updateTransform", this).call(this)
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                _get(Cuboid3d.prototype.__proto__ || Object.getPrototypeOf(Cuboid3d.prototype), "setScale", this).call(this, scale);
                this.setSize(this.getSize());
                return this
            }
        }, {
            key: "getWorldScale",
            value: function getWorldScale() {
                this.mesh.getWorldScale(vec3);
                return vec3.x / this.size.getX()
            }
        }, {
            key: "setSize",
            value: function setSize(width, height, depth) {
                this.size.set(width, height, depth);
                return this
            }
        }, {
            key: "getSize",
            value: function getSize() {
                return this.size
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                var x = this.size.getX() / 2;
                var y = this.size.getY() / 2;
                var z = this.size.getZ() / 2;
                return Math.sqrt(x * x + y * y + z * z)
            }
        }]);
        return Cuboid3d
    }(Shape3d);
    Cuboid3d.geometry = new THREE.BoxGeometry(1, 1, 1);;
    var Line3d = function(_Shape3d2) {
        _inherits(Line3d, _Shape3d2);

        function Line3d(graphics, startPoint, endPoint, width, color, ratio, preInit) {
            _classCallCheck(this, Line3d);
            var _this31 = _possibleConstructorReturn(this, (Line3d.__proto__ || Object.getPrototypeOf(Line3d)).call(this, graphics, color, function() {
                this.widthRatio = ratio || 1;
                if (preInit) preInit.call(this)
            }));
            var l = _this31.getLoc().l;
            l.splice(l.length - 1, 1);
            _this31.line = _this31.mesh;
            _this31.mesh = new THREE.Object3D;
            _this31.mesh.add(_this31.line);
            _this31.line.rotation.set(Math.PI / 2, Math.PI / 2, 0, "YZX");
            _this31.setWidth(width);
            _this31.startPoint = _this31.getLoc();
            _this31.endPoint = new XYZ(0, 0, 0);
            var This = _this31;
            _this31.startPoint.onChange(function() {
                This.__markDirty()
            });
            _this31.endPoint.onChange(function() {
                This.__markDirty();
                This.__updateAABB()
            });
            if (startPoint) _this31.setStartPoint(startPoint);
            if (endPoint) _this31.setEndPoint(endPoint);
            _this31.prevTransform.startPoint = new XYZ(_this31.startPoint);
            _this31.prevTransform.width = _this31.width;
            _this31.prevTransform.endPoint = new XYZ(_this31.endPoint);
            return _this31
        }
        _createClass(Line3d, [{
            key: "__createShape",
            value: function __createShape() {
                if (Line3d.geometry[this.widthRatio]) this.geometry = Line3d.geometry[this.widthRatio];
                else {
                    this.geometry = Line3d.geometry[this.widthRatio] = new THREE.CylinderGeometry(1, this.widthRatio, 1, 32);
                    this.geometry.translate(0, 0.5, 0)
                }
            }
        }, {
            key: "__interpolate",
            value: function __interpolate(delta) {
                if (this.prevTransform.tick >= this.graphics.tick) {
                    if (this.prevTransform.tick == this.graphics.tick) this.updateTransform();
                    else {
                        this.__setPoints(delta);
                        this.__setMeshScale(delta)
                    }
                }
            }
        }, {
            key: "updateTransform",
            value: function updateTransform() {
                this.prevTransform.startPoint.set(this.startPoint);
                this.prevTransform.endPoint.set(this.endPoint);
                this.prevTransform.scale = this.transform.scale;
                this.prevTransform.width = this.width;
                this.__setPoints(0);
                this.__setMeshScale(0);
                this.__updateAABB();
                return this
            }
        }, {
            key: "__setPoints",
            value: function __setPoints(per) {
                var prevStart = this.prevTransform.startPoint;
                var start = this.startPoint;
                var prevEnd = this.prevTransform.endPoint;
                var end = this.endPoint;
                this.__updateTransform(new XYZ(prevStart.x * (1 - per) + start.x * per, prevStart.y * (1 - per) + start.y * per, prevStart.z * (1 - per) + start.z * per), new XYZ(prevEnd.x * (1 - per) + end.x * per, prevEnd.y * (1 - per) + end.y * per, prevEnd.z * (1 - per) + end.z * per))
            }
        }, {
            key: "__setMeshScale",
            value: function __setMeshScale(per) {
                var scale = this.prevTransform.scale * (1 - per) + this.transform.scale * per;
                this.mesh.scale.set(scale, scale, scale);
                var width = this.prevTransform.width * (1 - per) + this.width * per;
                if (this.parentShape) width *= this.parentShape.getWorldScale();
                this.line.scale.x = this.line.scale.z = width
            }
        }, {
            key: "__updateTransform",
            value: function __updateTransform(start, end) {
                var vec = new Vec(start);
                if (this.parentShape) vec.add(this.parentShape.getWorldLoc());
                if (this.offsetShape) vec.sub(this.offsetShape.getWorldLoc());
                this.mesh.position.set(vec.getX(), vec.getY(), vec.getZ());
                vec.sub(end).mul(-1);
                this.setRot(vec.getRot());
                this.mesh.rotation.set(this.getXRot(), this.getYRot(), this.getZRot(), "YZX");
                this.line.scale.y = vec.getLength() / this.getScale()
            }
        }, {
            key: "__setParentShape",
            value: function __setParentShape(parent) {
                this.isRendered = parent.isRendered;
                _get(Line3d.prototype.__proto__ || Object.getPrototypeOf(Line3d.prototype), "__setParentShape", this).call(this, parent);
                this.__triggerRenderChange();
                return this
            }
        }, {
            key: "__triggerRenderChange",
            value: function __triggerRenderChange() {
                _get(Line3d.prototype.__proto__ || Object.getPrototypeOf(Line3d.prototype), "__triggerRenderChange", this).call(this);
                if (this.isRendered) {
                    this.graphics.__getScene().add(this.mesh)
                } else {
                    this.graphics.__getScene().remove(this.mesh)
                }
            }
        }, {
            key: "setWidth",
            value: function setWidth(width) {
                this.width = width;
                this.__markDirty();
                return this
            }
        }, {
            key: "setStartPoint",
            value: function setStartPoint(startX, startY, startZ) {
                this.startPoint.set(startX, startY, startZ);
                return this
            }
        }, {
            key: "setEndPoint",
            value: function setEndPoint(endX, endY, endZ) {
                this.endPoint.set(endX, endY, endZ);
                return this
            }
        }, {
            key: "setOffsetAncestor",
            value: function setOffsetAncestor(shape) {
                this.offsetShape = shape;
                return this
            }
        }, {
            key: "getWidth",
            value: function getWidth() {
                return this.width
            }
        }, {
            key: "getStartPoint",
            value: function getStartPoint() {
                return this.startPoint
            }
        }, {
            key: "getEndPoint",
            value: function getEndPoint() {
                return this.endPoint
            }
        }, {
            key: "getOffsetAncestor",
            value: function getOffsetAncestor() {
                return this.offsetShape
            }
        }, {
            key: "__triggerScaleChange",
            value: function __triggerScaleChange() {
                _get(Line3d.prototype.__proto__ || Object.getPrototypeOf(Line3d.prototype), "__triggerScaleChange", this).call(this);
                this.setWidth(this.getWidth())
            }
        }, {
            key: "__getRadiusPadding",
            value: function __getRadiusPadding() {
                return this.getWidth() * this.getWorldScale()
            }
        }, {
            key: "__updateAABB",
            value: function __updateAABB() {
                if (this.storeInSpatialTree) {
                    var minRad = this.__getRadius() * this.getWorldScale();
                    var loc = this.getWorldLoc();
                    var loc2 = this.getEndPoint();
                    if (this.aabb.minX > Math.min(loc.getX(), loc2.getX()) || this.aabb.minY > Math.min(loc.getY(), loc2.getY()) || this.aabb.minZ > Math.min(loc.getZ(), loc2.getZ()) || this.aabb.maxX < Math.max(loc.getX(), loc2.getX()) || this.aabb.maxY < Math.max(loc.getY(), loc2.getY()) || this.aabb.maxZ < Math.max(loc.getZ(), loc2.getZ())) {
                        var tree = this.__getTree();
                        if (tree) tree.remove(this);
                        var padding = this.__getRadiusPadding();
                        this.aabb = {
                            minX: Math.min(loc.getX(), loc2.getX()) - padding,
                            minY: Math.min(loc.getY(), loc2.getY()) - padding,
                            minZ: Math.min(loc.getZ(), loc2.getZ()) - padding,
                            maxX: Math.max(loc.getX(), loc2.getX()) + padding,
                            maxY: Math.max(loc.getY(), loc2.getY()) + padding,
                            maxZ: Math.max(loc.getZ(), loc2.getZ()) + padding
                        };
                        if (tree) tree.insert(this)
                    }
                    if (window.debugging == 2) {
                        if (!this.aabbCube) {
                            this.aabbCube = new Cuboid3d(this.graphics, 0, 0, 0, 16711680).setAlpha(0.15)
                        }
                        this.aabbCube.setSize(this.aabb.maxX - this.aabb.minX, this.aabb.maxY - this.aabb.minY, this.aabb.maxZ - this.aabb.minZ).setLoc((this.aabb.maxX + this.aabb.minX) / 2, (this.aabb.maxY + this.aabb.minY) / 2, (this.aabb.maxZ + this.aabb.minZ) / 2).updateTransform();
                        if (!this.aabbCube.isRendered && this.isRendered) this.graphics.__getScene().add(this.aabbCube.mesh);
                        if (this.aabbCube.isRendered && !this.isRendered) this.graphics.__getScene().remove(this.aabbCube.mesh)
                    }
                }
                return this
            }
        }]);
        return Line3d
    }(Shape3d);
    Line3d.geometry = {};;
    var ImageShape3d = function(_Shape3d3) {
        _inherits(ImageShape3d, _Shape3d3);

        function ImageShape3d(gfx, source, width, height, initFunc) {
            _classCallCheck(this, ImageShape3d);
            var _this32 = _possibleConstructorReturn(this, (ImageShape3d.__proto__ || Object.getPrototypeOf(ImageShape3d)).call(this, gfx, 16777215, function() {
                this.size = new XYZ(width, height, 1);
                this.source = source;
                if (initFunc) initFunc.call(this)
            }));
            _this32.prevTransform.size = new XYZ;
            var This = _this32;
            _this32.size.onChange(function() {
                This.__markDirty()
            });
            _this32.setScale(1);
            _this32.updateTransform();
            return _this32
        }
        _createClass(ImageShape3d, [{
            key: "__createMaterial",
            value: function __createMaterial() {
                if (this.source) this.texture = new THREE.TextureLoader().load(this.source);
                this.material = new THREE.SpriteMaterial({
                    map: this.texture,
                    color: 16777215,
                    transparent: true,
                    depthWrite: true
                })
            }
        }, {
            key: "__createMesh",
            value: function __createMesh() {
                this.mesh = new THREE.Sprite(this.material);
                this.mesh.userData = {
                    shape: this
                }
            }
        }, {
            key: "setTexture",
            value: function setTexture(texture) {
                this.texture = texture;
                this.material.map = this.texture;
                return this
            }
        }, {
            key: "setSource",
            value: function setSource(source) {
                this.source = source;
                return this.setTexture(new THREE.TextureLoader().load(source))
            }
        }, {
            key: "getTexture",
            value: function getTexture() {
                return this.texture
            }
        }, {
            key: "getSource",
            value: function getSource() {
                return this.source
            }
        }, {
            key: "__setMeshScale",
            value: function __setMeshScale(per) {
                var scale = this.prevTransform.scale * (1 - per) + this.transform.scale * per;
                var oldSize = this.prevTransform.size;
                var size = this.size;
                this.mesh.scale.x = scale * (oldSize.x * (1 - per) + size.x * per);
                this.mesh.scale.y = scale * (oldSize.y * (1 - per) + size.y * per);
                this.mesh.scale.z = scale * (oldSize.z * (1 - per) + size.z * per)
            }
        }, {
            key: "updateTransform",
            value: function updateTransform() {
                this.prevTransform.size.set(this.size);
                return _get(ImageShape3d.prototype.__proto__ || Object.getPrototypeOf(ImageShape3d.prototype), "updateTransform", this).call(this)
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                _get(ImageShape3d.prototype.__proto__ || Object.getPrototypeOf(ImageShape3d.prototype), "setScale", this).call(this, scale);
                this.setSize(this.getSize());
                return this
            }
        }, {
            key: "getWorldScale",
            value: function getWorldScale() {
                this.mesh.getWorldScale(vec3);
                return vec3.x / this.size.getX()
            }
        }, {
            key: "setSize",
            value: function setSize(width, height, depth) {
                this.size.set(width, height, depth);
                return this
            }
        }, {
            key: "getSize",
            value: function getSize() {
                return this.size
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                var x = this.size.getX() / 2;
                var y = this.size.getY() / 2;
                return Math.sqrt(x * x + y * y)
            }
        }]);
        return ImageShape3d
    }(Shape3d);;
    var TextShape3d = function(_ImageShape3d) {
        _inherits(TextShape3d, _ImageShape3d);

        function TextShape3d(gfx, text, color, font, height, align) {
            _classCallCheck(this, TextShape3d);
            var _this33 = _possibleConstructorReturn(this, (TextShape3d.__proto__ || Object.getPrototypeOf(TextShape3d)).call(this, gfx, null, 0.2, 0.2, function() {
                this.text = text;
                this.color = color;
                this.font = font || "arial";
                this.height = height || 0.1;
                this.align = align || "center"
            }));
            _this33.refresh();
            return _this33
        }
        _createClass(TextShape3d, [{
            key: "setText",
            value: function setText(text) {
                this.text = text;
                this.refresh();
                return this
            }
        }, {
            key: "refresh",
            value: function refresh() {
                var c = document.createElement("canvas");
                c.width = 5;
                var n = 400;
                c.height = n;
                var ctx = c.getContext("2d");
                ctx.font = n + "px " + this.font;
                ctx.fillStyle = "white";
                ctx.textAlignt = this.align;
                c.width = ctx.measureText(this.text).width;
                this.ratio = c.width / c.height;
                ctx.font = n + "px " + this.font;
                ctx.fillStyle = "white";
                ctx.textAlignt = this.align;
                ctx.fillText(this.text, 0, n * 0.7);
                var dataUrl = c.toDataURL();
                this.setSource(dataUrl);
                this.setHeight(this.getHeight());
                return this
            }
        }, {
            key: "setHeight",
            value: function setHeight(height) {
                this.size.set(this.ratio * height, height, 1);
                return this
            }
        }, {
            key: "getHeight",
            value: function getHeight() {
                return this.size.getY()
            }
        }]);
        return TextShape3d
    }(ImageShape3d);;
    var Sphere3d = function(_Shape3d4) {
        _inherits(Sphere3d, _Shape3d4);

        function Sphere3d(graphics, radius, color, preInit) {
            _classCallCheck(this, Sphere3d);
            var _this34 = _possibleConstructorReturn(this, (Sphere3d.__proto__ || Object.getPrototypeOf(Sphere3d)).call(this, graphics, color, function() {
                this.radius = radius;
                if (preInit && preInit.call) preInit.call(this)
            }));
            _this34.prevTransform.radius = radius;
            _this34.setScale(1);
            return _this34
        }
        _createClass(Sphere3d, [{
            key: "__createShape",
            value: function __createShape() {
                this.geometry = Sphere3d.geometry
            }
        }, {
            key: "updateTransform",
            value: function updateTransform() {
                this.prevTransform.radius = this.radius;
                _get(Sphere3d.prototype.__proto__ || Object.getPrototypeOf(Sphere3d.prototype), "updateTransform", this).call(this);
                return this
            }
        }, {
            key: "__setMeshScale",
            value: function __setMeshScale(per) {
                var scale = this.prevTransform.scale * this.prevTransform.radius * (1 - per) + this.transform.scale * this.radius * per;
                this.mesh.scale.set(scale, scale, scale)
            }
        }, {
            key: "getWorldScale",
            value: function getWorldScale() {
                this.mesh.getWorldScale(vec3);
                return vec3.x / this.radius
            }
        }, {
            key: "setRadius",
            value: function setRadius(radius) {
                this.radius = radius;
                this.__markDirty();
                return this
            }
        }, {
            key: "getRadius",
            value: function getRadius() {
                return this.radius
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                return this.getRadius()
            }
        }]);
        return Sphere3d
    }(Shape3d);
    Sphere3d.geometry = new THREE.SphereGeometry(1, 32, 32);
    var ShapeGroup3d = function(_Shape3d5) {
        _inherits(ShapeGroup3d, _Shape3d5);

        function ShapeGroup3d(graphics, preInit) {
            _classCallCheck(this, ShapeGroup3d);
            var _this35 = _possibleConstructorReturn(this, (ShapeGroup3d.__proto__ || Object.getPrototypeOf(ShapeGroup3d)).call(this, graphics, null, preInit));
            _this35.shapes = [];
            _this35.radius = 0;
            var This = _this35;
            _this35.getLoc().onChange(function() {
                for (var i = 0; i < This.shapes.length; i++) {
                    This.shapes[i].getLoc().__fireEvent()
                }
            });
            _this35.getRot().onChange(function() {
                for (var i = 0; i < This.shapes.length; i++) {
                    This.shapes[i].getLoc().__fireEvent()
                }
            });
            return _this35
        }
        _createClass(ShapeGroup3d, [{
            key: "__createMesh",
            value: function __createMesh() {
                this.mesh = new THREE.Object3D;
                this.mesh.userData = {
                    shape: this
                }
            }
        }, {
            key: "getShapes",
            value: function getShapes() {
                return this.shapes
            }
        }, {
            key: "addShape",
            value: function addShape(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    var shape = arguments[i];
                    if (this.shapes.indexOf(shape) == -1) {
                        this.mesh.add(shape.mesh);
                        this.shapes.push(shape);
                        shape.__setParentShape(this)
                    }
                }
                this.__updateRadius();
                return this
            }
        }, {
            key: "removeShape",
            value: function removeShape(shape) {
                for (var i = 0; i < arguments.length; i++) {
                    var shape = arguments[i];
                    this.mesh.remove(shape.mesh);
                    var index = this.shapes.indexOf(shape);
                    if (index != -1) {
                        this.shapes.splice(index, 1);
                        shape.__setParentShape(null)
                    }
                }
                this.__updateRadius();
                return this
            }
        }, {
            key: "__updateRadius",
            value: function __updateRadius() {
                this.radius = 0;
                for (var i = 0; i < this.shapes.length; i++) {
                    var shape = this.shapes[i];
                    this.radius = Math.max(this.radius, new Vec(shape.getLoc()).getLength() + shape.__getRadius())
                }
            }
        }, {
            key: "__getRadius",
            value: function __getRadius() {
                return this.radius
            }
        }, {
            key: "__triggerScaleChange",
            value: function __triggerScaleChange() {
                _get(ShapeGroup3d.prototype.__proto__ || Object.getPrototypeOf(ShapeGroup3d.prototype), "__triggerScaleChange", this).call(this);
                for (var i = 0; i < this.shapes.length; i++) {
                    this.shapes[i].__triggerScaleChange()
                }
            }
        }, {
            key: "__triggerRenderChange",
            value: function __triggerRenderChange() {
                _get(ShapeGroup3d.prototype.__proto__ || Object.getPrototypeOf(ShapeGroup3d.prototype), "__triggerRenderChange", this).call(this);
                for (var i = 0; i < this.shapes.length; i++) {
                    this.shapes[i].__triggerRenderChange()
                }
            }
        }, {
            key: "__interpolate",
            value: function __interpolate(per) {
                _get(ShapeGroup3d.prototype.__proto__ || Object.getPrototypeOf(ShapeGroup3d.prototype), "__interpolate", this).call(this, per);
                for (var i = 0; i < this.shapes.length; i++) {
                    this.shapes[i].__interpolate(per)
                }
            }
        }, {
            key: "updateTransform",
            value: function updateTransform(dontCarry) {
                _get(ShapeGroup3d.prototype.__proto__ || Object.getPrototypeOf(ShapeGroup3d.prototype), "updateTransform", this).call(this);
                if (!dontCarry)
                    for (var i = 0; i < this.shapes.length; i++) {
                        this.shapes[i].updateTransform()
                    }
                return this
            }
        }]);
        return ShapeGroup3d
    }(Shape3d);;
    var NodeShape3d = function(_ShapeGroup3d) {
        _inherits(NodeShape3d, _ShapeGroup3d);

        function NodeShape3d(graphics, node, preInit) {
            _classCallCheck(this, NodeShape3d);
            var _this36 = _possibleConstructorReturn(this, (NodeShape3d.__proto__ || Object.getPrototypeOf(NodeShape3d)).call(this, graphics, preInit));
            _this36.__setupNodeShape(node);
            return _this36
        }
        _createClass(NodeShape3d, [{
            key: "add",
            value: function add() {
                var ret = _get(NodeShape3d.prototype.__proto__ || Object.getPrototypeOf(NodeShape3d.prototype), "add", this).call(this);
                this.__addNode();
                return ret
            }
        }, {
            key: "remove",
            value: function remove() {
                return _get(NodeShape3d.prototype.__proto__ || Object.getPrototypeOf(NodeShape3d.prototype), "remove", this).call(this, this.__removeNode())
            }
        }, {
            key: "__delete",
            value: function __delete() {
                this.__deleteNode();
                return _get(NodeShape3d.prototype.__proto__ || Object.getPrototypeOf(NodeShape3d.prototype), "__delete", this).call(this)
            }
        }]);
        return NodeShape3d
    }(ShapeGroup3d);
    var keys = Object.getOwnPropertyNames(AbstractNodeShape.prototype);
    for (var i = 0; i < keys.length; i++) {
        NodeShape3d.prototype[keys[i]] = AbstractNodeShape.prototype[keys[i]]
    };
    var HtmlShape3d = function(_ImageShape3d2) {
        _inherits(HtmlShape3d, _ImageShape3d2);

        function HtmlShape3d(gfx, html, preInit) {
            _classCallCheck(this, HtmlShape3d);
            var _this37 = _possibleConstructorReturn(this, (HtmlShape3d.__proto__ || Object.getPrototypeOf(HtmlShape3d)).call(this, gfx, null, 0, 0.2, function() {
                this.element = $("<div class='HTMLshape noselect' style=display:inline-block;position:absolute;z-index:1000>" + "<span class=HTMLshapeContent style=display:inline-block;color:white>" + "</span>" + "</div>").offset({
                    left: -1000,
                    top: -1000
                });
                this.visCont = gfx.getCanvas();
                var This = this;
                this.vrOffset = new XYZ(0, 0, 0).onChange(function() {
                    This.__markDirty()
                });
                if (preInit) preInit.call(this)
            }));
            _this37.setHtml(html);
            _this37.setContainer(gfx.getContainer());
            _this37.setInteractive(false);
            var This = _this37;
            _this37.getLoc().onChange(function() {
                This.__markDirty()
            });
            _this37.refresh();
            return _this37
        }
        _createClass(HtmlShape3d, [{
            key: "refresh",
            value: function refresh() {
                var This = this;
                var el = this.getElement().children().first().clone();
                $(".HtmlShapeTextureCreator").append(el);
                html2canvas(el[0], {
                    scale: 6,
                    onrendered: function onrendered(canvas) {
                        var dataUrl = canvas.toDataURL();
                        This.ratio = canvas.width / canvas.height;
                        This.setSource(dataUrl);
                        This.setHeight(This.getHeight());
                        el.remove()
                    }
                });
                return this
            }
        }, {
            key: "setHeight",
            value: function setHeight(height) {
                this.size.set(this.ratio * height, height, 1);
                return this
            }
        }, {
            key: "getHeight",
            value: function getHeight() {
                return this.size.getY()
            }
        }, {
            key: "setInteractive",
            value: function setInteractive(interactive) {
                this.interactive = interactive;
                if (interactive) this.element.addClass("interactive").css("pointer-events", "all");
                else this.element.removeClass("interactive").css("pointer-events", "none");
                return this
            }
        }, {
            key: "getInteractive",
            value: function getInteractive() {
                return this.interactive
            }
        }, {
            key: "getVRoffset",
            value: function getVRoffset() {
                return this.vrOffset
            }
        }, {
            key: "__setMeshLoc",
            value: function __setMeshLoc(per) {
                this.__updateLoc();
                var prevLoc = this.prevTransform.loc;
                var loc = this.transform.loc;
                this.mesh.position.set(prevLoc.x * (1 - per) + loc.x * per + this.vrOffset.x, prevLoc.y * (1 - per) + loc.y * per + this.vrOffset.y, prevLoc.z * (1 - per) + loc.z * per + this.vrOffset.z)
            }
        }, {
            key: "setContainer",
            value: function setContainer(container) {
                this.container = $(container);
                return this
            }
        }, {
            key: "getContainer",
            value: function getContainer() {
                return this.container
            }
        }, {
            key: "setHtml",
            value: function setHtml(html) {
                this.element.children().first().html(html);
                return this
            }
        }, {
            key: "getHtml",
            value: function getHtml() {
                return this.element.children().first().contents()
            }
        }, {
            key: "getElement",
            value: function getElement() {
                return this.element
            }
        }, {
            key: "__addToPage",
            value: function __addToPage() {
                this.getContainer().append(this.element);
                var shapes = this.graphics.getShapesHtml();
                if (shapes.indexOf(this) == -1) shapes.push(this);
                this.__updateLoc();
                return this
            }
        }, {
            key: "__removeFromPage",
            value: function __removeFromPage() {
                this.element.remove();
                var shapes = this.graphics.getShapesHtml();
                var index = shapes.indexOf(this);
                if (index != -1) shapes.splice(index, 1);
                return this
            }
        }, {
            key: "add",
            value: function add() {
                _get(HtmlShape3d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape3d.prototype), "add", this).call(this);
                this.__addToPage();
                return this
            }
        }, {
            key: "remove",
            value: function remove() {
                this.__removeFromPage();
                return _get(HtmlShape3d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape3d.prototype), "remove", this).call(this)
            }
        }, {
            key: "__setParentShape",
            value: function __setParentShape(shape) {
                var ret = _get(HtmlShape3d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape3d.prototype), "__setParentShape", this).call(this, shape);
                if (shape) this.__addToPage();
                else this.__removeFromPage();
                return ret
            }
        }, {
            key: "__triggerRenderChange",
            value: function __triggerRenderChange() {
                _get(HtmlShape3d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape3d.prototype), "__triggerRenderChange", this).call(this);
                if (this.isRendered) this.__addToPage();
                else this.__removeFromPage()
            }
        }, {
            key: "setScale",
            value: function setScale(scale) {
                _get(HtmlShape3d.prototype.__proto__ || Object.getPrototypeOf(HtmlShape3d.prototype), "setScale", this).call(this, scale);
                this.element.css("transform", "scale(" + Math.floor(scale * 100) / 100 + ")");
                return this
            }
        }, {
            key: "__updateLoc",
            value: function __updateLoc() {
                var loc = this.getGraphics().getCamera().translateWorldToScreenLoc(this.getWorldLoc().sub(new Vec(this.vrOffset).mul((this.parentShape ? this.parentShape.getWorldScale() : 1) * this.getScale())));
                var o = this.visCont.offset();
                o.left += loc.getX() - this.element.width() * this.transform.scale / 2;
                o.top += loc.getY() - this.element.height() * this.transform.scale / 2;
                this.element.offset(o);
                return this
            }
        }]);
        return HtmlShape3d
    }(ImageShape3d);
    $("html").append("<div class=HtmlShapeTextureCreator style=height:0;overflow:hidden;></div>");;
    var PointLight3d = function(_Shape3d6) {
        _inherits(PointLight3d, _Shape3d6);

        function PointLight3d(graphics, color, intensity, distance, decay, preInit) {
            _classCallCheck(this, PointLight3d);
            var _this38 = _possibleConstructorReturn(this, (PointLight3d.__proto__ || Object.getPrototypeOf(PointLight3d)).call(this, graphics, color, function() {
                this.color = typeof color == "number" ? color : 16777215;
                this.intensity = typeof intensity == "number" ? intensity : 1;
                this.distance = typeof distance == "number" ? distance : 5;
                this.decay = typeof decay == "number" ? decay : 1;
                if (color && color.call) color.call(this);
                if (intensity && intensity.call) intensity.call(this);
                if (distance && distance.call) distance.call(this);
                if (decay && decay.call) decay.call(this);
                if (preInit && preInit.call) preInit.call(this)
            }));
            if (window.debugging) {
                var geometry = new THREE.SphereGeometry(0.005, 32, 32);
                var material = new THREE.MeshBasicMaterial(16777215);
                var sphere = new THREE.Mesh(geometry, material);
                sphere.userData.ignore = true;
                _this38.mesh.add(sphere)
            }
            return _this38
        }
        _createClass(PointLight3d, [{
            key: "__createShape",
            value: function __createShape() {}
        }, {
            key: "__createMaterial",
            value: function __createMaterial() {}
        }, {
            key: "__createMesh",
            value: function __createMesh() {
                this.mesh = new THREE.PointLight(this.color, this.intensity, this.distance, this.decay);
                return this
            }
        }, {
            key: "setIntensity",
            value: function setIntensity(intensity) {
                this.intensity = intensity;
                this.mesh.power = intensity * 4 * Math.PI;
                return this
            }
        }, {
            key: "getIntensity",
            value: function getIntensity() {
                return this.intensity
            }
        }, {
            key: "setDistance",
            value: function setDistance(distance) {
                this.distance = distance;
                this.mesh.distance = distance;
                return this
            }
        }, {
            key: "getDistance",
            value: function getDistance() {
                return this.distance
            }
        }, {
            key: "setDecay",
            value: function setDecay(decay) {
                this.decay = decay;
                this.mesh.decay = decay;
                return this
            }
        }, {
            key: "getDecay",
            value: function getDecay() {
                return this.decay
            }
        }, {
            key: "setColor",
            value: function setColor(color) {
                this.mesh.color.setHex(color);
                this.color = color;
                return this
            }
        }]);
        return PointLight3d
    }(Shape3d);;
    var Visualisation3d = function(_Graphics3d) {
        _inherits(Visualisation3d, _Graphics3d);

        function Visualisation3d(container, tree, options, preInit) {
            _classCallCheck(this, Visualisation3d);
            var _this39 = _possibleConstructorReturn(this, (Visualisation3d.__proto__ || Object.getPrototypeOf(Visualisation3d)).call(this, null, null, container, preInit));
            _this39.__setupVisualisation(tree, options);
            _this39.shapes.unique.dragging = {
                hand1: null,
                hand2: null,
                mouse: null
            };
            _this39.maxNodeCount = 500;
            $(document).off("mouseup", _this39.DOMEventListeners.mouseUp);
            _this39.DOMEventListeners.mouseUp = function(event) {
                if (this.shapes.unique.dragging.mouse) {
                    this.shapes.unique.dragging.mouse.__changeState("dragged", false);
                    event.preventDefault();
                    event.stopImmediatePropagation()
                }
                this.shapes.unique.dragging.mouse = null
            }.bind(_this39);
            $(document).on("mouseup", _this39.DOMEventListeners.mouseUp);
            return _this39
        }
        _createClass(Visualisation3d, [{
            key: "getShape",
            value: function getShape(state, pointer) {
                var s = this.shapes.unique[state];
                if (state == "dragging") s = s[pointer];
                return s
            }
        }, {
            key: "destroy",
            value: function destroy(callback) {
                this.__destroy(callback);
                _get(Visualisation3d.prototype.__proto__ || Object.getPrototypeOf(Visualisation3d.prototype), "destroy", this).call(this)
            }
        }, {
            key: "__setupRoot",
            value: function __setupRoot() {
                var node = this.tree.getRoot();
                var clas = this.__getNodeShapeClass(Visualisation3d.classes, node);
                var shape = new clas(this, node);
                return shape.add()
            }
        }, {
            key: "dragShape",
            value: function dragShape(shape, pointer) {
                if (this.pointers.types.indexOf(pointer) == -1) pointer = "mouse";
                if (this.shapes.unique.dragging[pointer]) this.shapes.unique.dragging[pointer].__changeState("dragged", false);
                this.shapes.unique.dragging[pointer] = shape;
                if (shape) shape.__changeState("dragged", true);
                return this
            }
        }, {
            key: "__onUpdate",
            value: function __onUpdate(deltaTime) {
                if (this.shapes.unique.dragging) {
                    if (this.shapes.unique.dragging.mouse) this.shapes.unique.dragging.mouse.__onDrag(this.getMouseLoc(), "mouse");
                    if (this.shapes.unique.dragging.hand1 && this.pointers.hand1) this.shapes.unique.dragging.hand1.__onDrag(this.pointers.hand1, "hand1");
                    if (this.shapes.unique.dragging.hand2 && this.pointers.hand2) this.shapes.unique.dragging.hand2.__onDrag(this.pointers.hand2, "hand2")
                }
                _get(Visualisation3d.prototype.__proto__ || Object.getPrototypeOf(Visualisation3d.prototype), "__onUpdate", this).call(this, deltaTime)
            }
        }, {
            key: "__setupOptions",
            value: function __setupOptions(options) {
                var This = this
            }
        }]);
        return Visualisation3d
    }(Graphics3d);
    var keys = Object.getOwnPropertyNames(AbstractVisualisation.prototype);
    for (var i = 0; i < keys.length; i++) {
        if (!Visualisation3d.prototype[keys[i]]) Visualisation3d.prototype[keys[i]] = AbstractVisualisation.prototype[keys[i]]
    }
    window.Visualisation3d = Visualisation3d;
    Visualisation3d.classes = window.VIZ3D = {
        Visualisation: Visualisation3d,
        XYZ: XYZ,
        Vec: Vec,
        Color: Color,
        Shape: Shape3d,
        ShapeGroup: ShapeGroup3d,
        NodeShape: NodeShape3d,
        HtmlShape: HtmlShape3d,
        PointLight: PointLight3d,
        Sphere: Sphere3d,
        Line: Line3d,
        TextShape: TextShape3d,
        ImageShape: ImageShape3d,
        Cuboid: Cuboid3d
    };;
})();