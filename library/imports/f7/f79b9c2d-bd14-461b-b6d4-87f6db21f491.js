"use strict";
cc._RF.push(module, 'f79b9wtvRRGG7bUh/bbIfSR', 'OptionKuang');
// game/scripts/UI/Item/OptionKuang.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ListenerManager_1 = require("../../../../frame/scripts/Manager/ListenerManager");
var SoundManager_1 = require("../../../../frame/scripts/Manager/SoundManager");
var UIHelp_1 = require("../../../../frame/scripts/Utils/UIHelp");
var EventType_1 = require("../../Data/EventType");
var SoundConfig_1 = require("./SoundConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OptionKuang = /** @class */ (function (_super) {
    __extends(OptionKuang, _super);
    function OptionKuang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.img = null;
        _this.img_true = null;
        _this.img_wrong = null;
        _this.isTrueAnswer = false;
        _this.index = 0;
        return _this;
    }
    OptionKuang.prototype.init = function (index, text, img, isTrueAnswer) {
        this.index = index;
        this.text.string = text;
        if (img == "") {
            this.img.node.active = false;
        }
        else {
            this.text.node.active = false;
            this.img.node.active = true;
        }
        this.isTrueAnswer = isTrueAnswer;
    };
    OptionKuang.prototype.onClickOption = function () {
        UIHelp_1.UIHelp.showMask();
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.CLICK_OPTION, this.isTrueAnswer);
        var soundName = this.isTrueAnswer ? "正确音效" : "错误音效";
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist[soundName], false, false, false);
        this.img_true.active = this.isTrueAnswer;
        this.img_wrong.active = !this.isTrueAnswer;
    };
    __decorate([
        property(cc.Label)
    ], OptionKuang.prototype, "text", void 0);
    __decorate([
        property(cc.Sprite)
    ], OptionKuang.prototype, "img", void 0);
    __decorate([
        property(cc.Node)
    ], OptionKuang.prototype, "img_true", void 0);
    __decorate([
        property(cc.Node)
    ], OptionKuang.prototype, "img_wrong", void 0);
    OptionKuang = __decorate([
        ccclass
    ], OptionKuang);
    return OptionKuang;
}(cc.Component));
exports.default = OptionKuang;

cc._RF.pop();