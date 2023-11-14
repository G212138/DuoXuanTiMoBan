"use strict";
cc._RF.push(module, '67660d03iVK6qmMT2rQSAWK', 'OptionNode');
// game/scripts/UI/Item/OptionNode.ts

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
var SyncDataManager_1 = require("../../../../frame/scripts/Manager/SyncDataManager");
var Tools_1 = require("../../../../frame/scripts/Utils/Tools");
var EventType_1 = require("../../Data/EventType");
var EditorManager_1 = require("../../Manager/EditorManager");
var SoundConfig_1 = require("./SoundConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OptionNode = /** @class */ (function (_super) {
    __extends(OptionNode, _super);
    function OptionNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.img_zhadan = null;
        _this.ani_pipi = null;
        _this.img_wutaidong = null;
        _this.zhandan_node = null;
        _this.yanwu = null;
        _this.boom = null;
        _this.option_node = null;
        _this.option_lbl = null;
        _this.option_img = null;
        _this.option_check = null;
        _this.optionIndex = 0;
        _this.gameData = null;
        _this.isTrue = false;
        return _this;
    }
    OptionNode.prototype.showInit = function (index) {
        var _this = this;
        this.gameData = EditorManager_1.EditorManager.editorData.GameData[SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel];
        this.optionIndex = index;
        this.isTrue = this.gameData.answerId.indexOf(index + 1) != -1;
        this.node.scaleX = 0;
        for (var i = 0; i < this.node.childrenCount; i++) {
            this.node.children[i].active = false;
        }
        this.img_wutaidong.active = true;
        cc.tween(this.node).to(0.2, { scaleX: 1 }).call(function () {
            _this.img_wutaidong.active = false;
            _this.ani_pipi.node.active = true;
            Tools_1.Tools.playSpine(_this.ani_pipi, 'pipi_dongli chulai happy', false, function () {
                Tools_1.Tools.playSpine(_this.ani_pipi, 'pipi_catch', true, function () {
                });
                _this.option_node.active = true;
                _this.option_node.scaleX = 0;
                cc.tween(_this.option_node).to(0.3, { scaleX: 1 }).call(function () {
                }).start();
            });
        }).start();
        this.initOption();
    };
    OptionNode.prototype.initOption = function () {
        var optionData = this.gameData.answer[this.optionIndex];
        if (optionData.opinionPic == "") {
            this.option_img.node.active = false;
            this.option_lbl.node.active = true;
            this.option_lbl.string = optionData.opinionText;
        }
        else {
            this.option_img.node.active = true;
            this.option_lbl.node.active = false;
            cc.resources.load("images/" + optionData.opinionPic, cc.SpriteFrame, function (err, img) {
                this.option_img.spriteFrame = img;
            }.bind(this));
        }
    };
    OptionNode.prototype.onClickOption = function () {
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["点击音效"], false, false);
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.CLICK_OPTION, this.optionIndex);
    };
    OptionNode.prototype.showTrue = function () {
        var _this = this;
        if (this.isTrue) {
            Tools_1.Tools.playSpine(this.ani_pipi, 'pipi_catch_meidong', true);
        }
        else {
            this.ani_pipi.node.active = false;
            this.img_wutaidong.active = true;
        }
        cc.tween(this.option_node).to(0.4, { scaleX: 0 }).call(function () {
            _this.zhandan_node.active = true;
            if (_this.isTrue) {
                _this.zhandan_node.getChildByName("img_zuanshi").x = -100;
                cc.tween(_this.zhandan_node.getChildByName("img_zuanshi")).to(1, { y: -460, angle: 360 }).call(function () { }).start();
                // Tools.playSpine(this.ani_pipi, 'pipi_happy_meidong', true);
            }
            else {
                _this.zhandan_node.getChildByName("img_zhadan").x = 0;
                cc.tween(_this.zhandan_node.getChildByName("img_zhadan")).to(1, { y: -650, angle: 360 }).delay(0.3).call(function () {
                    SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["爆炸音效"], false, false, false);
                    _this.yanwu.node.active = true;
                    Tools_1.Tools.playSpine(_this.yanwu, 'dongli yanwu', false, function () {
                        _this.yanwu.node.active = false;
                    });
                }).start();
                // this.ani_pipi.node.active = false;
                // this.img_wutaidong.active = true;
            }
        }).start();
    };
    OptionNode.prototype.showFalse = function (isSleted) {
        var _this = this;
        if (isSleted) {
            Tools_1.Tools.playSpine(this.ani_pipi, 'pipi_catch_meidong', true);
        }
        else {
            this.ani_pipi.node.active = false;
            this.img_wutaidong.active = true;
        }
        cc.tween(this.option_node).to(0.4, { scaleX: 0 }).call(function () {
            _this.zhandan_node.active = true;
            if (_this.isTrue) {
                _this.zhandan_node.getChildByName("img_zuanshi").x = isSleted ? -100 : 0;
                var endY = isSleted ? -460 : -650;
                cc.tween(_this.zhandan_node.getChildByName("img_zuanshi")).to(1, { y: endY, angle: 360 }).call(function () {
                    if (!isSleted) {
                        cc.tween(_this.zhandan_node.getChildByName("img_dongzhong_zhadan")).delay(1).bezierTo(0.5, cc.v2(0, -650), cc.v2(-50, 0), cc.v2(-100, -460)).call(function () {
                            _this.node.getChildByName("zhadan_boom").active = true;
                            _this.zhandan_node.getChildByName("img_dongzhong_zhadan").active = false;
                            Tools_1.Tools.playSpine(_this.node.getChildByName("zhadan_boom").getComponent(sp.Skeleton), 'effect_boom', false);
                            SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["爆炸音效"], false, false, false);
                        }).start();
                    }
                }).start();
                Tools_1.Tools.playSpine(_this.ani_pipi, 'pipi_happy_meidong', true);
            }
            else {
                Tools_1.Tools.playSpine(_this.ani_pipi, 'pipi_embarrassed_meidong', true);
                _this.zhandan_node.getChildByName("img_zhadan").x = isSleted ? -100 : 0;
                var endY = isSleted ? -460 : -650;
                cc.tween(_this.zhandan_node.getChildByName("img_zhadan")).to(1, { y: endY, angle: 360 }).delay(0.3).call(function () {
                    if (!isSleted) {
                        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["爆炸音效"], false, false, false);
                        _this.yanwu.node.active = true;
                        Tools_1.Tools.playSpine(_this.yanwu, 'dongli yanwu', false, function () {
                            _this.yanwu.node.active = false;
                        });
                    }
                }).start();
                _this.scheduleOnce(function () {
                    _this.zhandan_node.getChildByName("img_zhadan").active = false;
                    SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["爆炸音效"], false, false, false);
                    _this.node.getChildByName("zhadan_boom").active = true;
                    Tools_1.Tools.playSpine(_this.node.getChildByName("zhadan_boom").getComponent(sp.Skeleton), 'effect_boom', false);
                }, 2.5);
            }
        }).start();
    };
    __decorate([
        property(cc.Node)
    ], OptionNode.prototype, "img_zhadan", void 0);
    __decorate([
        property(sp.Skeleton)
    ], OptionNode.prototype, "ani_pipi", void 0);
    __decorate([
        property(cc.Node)
    ], OptionNode.prototype, "img_wutaidong", void 0);
    __decorate([
        property(cc.Node)
    ], OptionNode.prototype, "zhandan_node", void 0);
    __decorate([
        property(sp.Skeleton)
    ], OptionNode.prototype, "yanwu", void 0);
    __decorate([
        property(sp.Skeleton)
    ], OptionNode.prototype, "boom", void 0);
    __decorate([
        property(cc.Node)
    ], OptionNode.prototype, "option_node", void 0);
    __decorate([
        property(cc.Label)
    ], OptionNode.prototype, "option_lbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], OptionNode.prototype, "option_img", void 0);
    __decorate([
        property(cc.Node)
    ], OptionNode.prototype, "option_check", void 0);
    OptionNode = __decorate([
        ccclass
    ], OptionNode);
    return OptionNode;
}(cc.Component));
exports.default = OptionNode;

cc._RF.pop();