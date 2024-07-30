"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditEnvAsJson = EditEnvAsJson;
exports.EditEnvGet = EditEnvGet;
exports.EditEnvLoad = EditEnvLoad;
exports.EditEnvSet = EditEnvSet;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EditEnv = /*#__PURE__*/function () {
  function EditEnv(filePath) {
    _classCallCheck(this, EditEnv);
    this.filePath = filePath;
    this.originalContent = _fs["default"].readFileSync(this.filePath, 'utf-8');
  }
  return _createClass(EditEnv, [{
    key: "get",
    value: function get() {
      return this.originalContent;
    }
  }, {
    key: "load",
    value: function load() {
      return this.parse();
    }
  }, {
    key: "parse",
    value: function parse() {
      var lines = this.originalContent.split('\n');
      var envConfig = {};
      lines.forEach(function (line) {
        var match = line.match(/^([^#\n=]+)=([^#\n]*)/);
        if (match) {
          envConfig[match[1].trim()] = match[2].trim();
        }
      });
      return envConfig;
    }
  }, {
    key: "edit",
    value: function edit(key, value) {
      var regex = new RegExp("^(".concat(key, "=.*)$"), 'm');
      if (regex.test(this.originalContent)) {
        this.originalContent = this.originalContent.replace(regex, "".concat(key, "=").concat(value));
      } else {
        this.originalContent += "\n".concat(key, "=").concat(value);
      }
    }
  }, {
    key: "save",
    value: function save() {
      _fs["default"].writeFileSync(this.filePath, this.originalContent, 'utf-8');
    }
  }]);
}();
function EditEnvGet(filePath, key) {
  var envEditor = new EditEnv(filePath);
  return envEditor.load()[key];
}
function EditEnvLoad(filePath) {
  var envEditor = new EditEnv(filePath);
  return envEditor.get();
}
function EditEnvAsJson(filePath) {
  var envEditor = new EditEnv(filePath);
  return envEditor.parse();
}
function EditEnvSet(filePath, key, value) {
  var envEditor = new EditEnv(filePath);
  envEditor.edit(key, value);
  envEditor.save();
  process.env[key] = value;
}