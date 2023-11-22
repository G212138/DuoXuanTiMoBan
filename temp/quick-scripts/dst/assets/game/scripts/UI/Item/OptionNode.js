
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/Item/OptionNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
        _this.icon = null;
        _this.icon_1 = null;
        _this.icon_img = [];
        _this.optionIndex = 0;
        _this.gameData = null;
        _this.isTrue = false;
        return _this;
    }
    OptionNode.prototype.showInit = function (index) {
        var _this = this;
        this.icon_1.node.active = false;
        this.gameData = EditorManager_1.EditorManager.editorData.GameData[SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel];
        this.optionIndex = index;
        this.isTrue = this.gameData.answerId.indexOf(index + 1) != -1;
        this.icon.spriteFrame = this.icon_img[index];
        this.icon_1.spriteFrame = this.icon_img[index];
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
                    _this.icon_1.node.active = true;
                    _this.ani_pipi.node.active = false;
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
            this.ani_pipi.node.active = true;
            Tools_1.Tools.playSpine(this.ani_pipi, 'pipi_catch', true);
        }
        else {
            this.ani_pipi.node.active = false;
            this.img_wutaidong.active = true;
        }
        cc.tween(this.option_node).to(0.4, { scaleX: 0 }).call(function () {
            _this.zhandan_node.active = true;
            if (_this.isTrue) {
                _this.zhandan_node.getChildByName("img_zuanshi").x = -90;
                cc.tween(_this.zhandan_node.getChildByName("img_zuanshi")).to(1, { y: -450, angle: 720 * 2 }).call(function () { }).start();
                // Tools.playSpine(this.ani_pipi, 'pipi_happy_meidong', true);
            }
            else {
                _this.zhandan_node.getChildByName("img_zhadan").x = 0;
                _this.zhandan_node.getChildByName("img_zhadan").active = true;
                cc.tween(_this.zhandan_node.getChildByName("img_zhadan")).to(1, { y: -430, angle: 720 * 2 }).delay(0.3).call(function () {
                    _this.node.getChildByName("zhadan_boom").active = true;
                    _this.zhandan_node.getChildByName("img_dongzhong_zhadan").active = false;
                    _this.zhandan_node.getChildByName("img_zhadan").active = false;
                    Tools_1.Tools.playSpine(_this.node.getChildByName("zhadan_boom").getComponent(sp.Skeleton), 'effect_boom', false);
                    SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["爆炸音效"], false, false, false);
                    // SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false);
                    // this.yanwu.node.active = true;
                    // Tools.playSpine(this.yanwu, 'dongli yanwu', false, () => {
                    //     this.yanwu.node.active = false;
                    // });
                }).start();
                // this.ani_pipi.node.active = false;
                // this.img_wutaidong.active = true;
            }
        }).start();
    };
    OptionNode.prototype.showFalse = function (isSleted) {
        var _this = this;
        if (isSleted) {
            this.ani_pipi.node.active = true;
            Tools_1.Tools.playSpine(this.ani_pipi, 'pipi_catch', true);
        }
        else {
            this.ani_pipi.node.active = false;
            this.img_wutaidong.active = true;
        }
        cc.tween(this.option_node).to(0.4, { scaleX: 0 }).call(function () {
            _this.zhandan_node.active = true;
            if (_this.isTrue) {
                _this.zhandan_node.getChildByName("img_zuanshi").x = isSleted ? -90 : 0;
                var endY = isSleted ? -460 : -650;
                cc.tween(_this.zhandan_node.getChildByName("img_zuanshi")).to(1, { y: -450, angle: 720 * 2 }).call(function () {
                    if (!isSleted) {
                        // cc.tween(this.zhandan_node.getChildByName("img_dongzhong_zhadan")).delay(1).bezierTo(0.5, cc.v2(0, -650), cc.v2(-50, 0), cc.v2(-100, -460)).call(() => {
                        // this.node.getChildByName("boom").active = true;
                        // this.zhandan_node.getChildByName("img_dongzhong_zhadan").active = false;
                        // Tools.playSpine(this.node.getChildByName("boom").getComponent(sp.Skeleton), 'effect_boom', false);
                        // SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false);
                        // }).start();
                    }
                }).start();
                Tools_1.Tools.playSpine(_this.ani_pipi, 'pipi_happy', true);
            }
            else {
                Tools_1.Tools.playSpine(_this.ani_pipi, 'pipi_embarrassed', true);
                _this.zhandan_node.getChildByName("img_zhadan").active = true;
                _this.zhandan_node.getChildByName("img_zhadan").x = isSleted ? -90 : 0;
                var endY = isSleted ? -460 : -650;
                cc.tween(_this.zhandan_node.getChildByName("img_zhadan")).to(1, { y: -430, angle: 720 * 2 }).delay(0.3).call(function () {
                    if (!isSleted) {
                        _this.zhandan_node.getChildByName("img_zhadan").active = false;
                        _this.node.getChildByName("boom").active = true;
                        // this.zhandan_node.getChildByName("img_dongzhong_zhadan").active = false;
                        Tools_1.Tools.playSpine(_this.node.getChildByName("boom").getComponent(sp.Skeleton), 'effect_boom', false);
                        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["爆炸音效"], false, false, false, (function () {
                            _this.node.getChildByName("boom").active = false;
                        }));
                        // SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false);
                        // this.yanwu.node.active = true;
                        // Tools.playSpine(this.yanwu, 'dongli yanwu', false, () => {
                        //     this.yanwu.node.active = false;
                        // });
                    }
                    else {
                        _this.zhandan_node.getChildByName("img_zhadan").active = false;
                        _this.node.getChildByName("zhadan_boom").active = true;
                        // this.zhandan_node.getChildByName("img_dongzhong_zhadan").active = false;
                        Tools_1.Tools.playSpine(_this.node.getChildByName("zhadan_boom").getComponent(sp.Skeleton), 'effect_boom', false);
                        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["爆炸音效"], false, false, false, (function () {
                            _this.node.getChildByName("zhadan_boom").active = false;
                        }));
                    }
                }).start();
                // this.scheduleOnce(() => {
                //     this.zhandan_node.getChildByName("img_zhadan").active = false;
                //     SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false);
                //     this.node.getChildByName("zhadan_boom").active = true;
                //     Tools.playSpine(this.node.getChildByName("zhadan_boom").getComponent(sp.Skeleton), 'effect_boom', false);
                // }, 2.5);
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
    __decorate([
        property(cc.Sprite)
    ], OptionNode.prototype, "icon", void 0);
    __decorate([
        property(cc.Sprite)
    ], OptionNode.prototype, "icon_1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], OptionNode.prototype, "icon_img", void 0);
    OptionNode = __decorate([
        ccclass
    ], OptionNode);
    return OptionNode;
}(cc.Component));
exports.default = OptionNode;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXE9wdGlvbk5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUZBQW9GO0FBQ3BGLCtFQUE4RTtBQUM5RSxxRkFBb0Y7QUFDcEYsK0RBQThEO0FBQzlELGtEQUFpRDtBQUNqRCw2REFBc0U7QUFDdEUsNkNBQTRDO0FBR3RDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBbUxDO1FBakxXLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRTlCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQUssR0FBZ0IsSUFBSSxDQUFDO1FBRTFCLFVBQUksR0FBZ0IsSUFBSSxDQUFDO1FBRTFCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRTVCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTlCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTVCLFVBQUksR0FBYyxJQUFJLENBQUM7UUFFdkIsWUFBTSxHQUFjLElBQUksQ0FBQztRQUV6QixjQUFRLEdBQXFCLEVBQUUsQ0FBQztRQUVoQyxpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixjQUFRLEdBQWEsSUFBSSxDQUFDO1FBQzFCLFlBQU0sR0FBWSxLQUFLLENBQUM7O0lBcUpwQyxDQUFDO0lBbkpVLDZCQUFRLEdBQWYsVUFBZ0IsS0FBYTtRQUE3QixpQkE0QkM7UUEzQkcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLDZCQUFhLENB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QUNZO0lBRWxDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7NENBQ1c7SUFFakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzttREFDaUI7SUFFbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDaUI7SUFFcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQztrREFDaUI7SUFFckM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDa0I7SUFFcEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FDVztJQUUvQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzhDQUNhO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0RBQ2U7SUExQnZCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FtTDlCO0lBQUQsaUJBQUM7Q0FuTEQsQUFtTEMsQ0FuTHVDLEVBQUUsQ0FBQyxTQUFTLEdBbUxuRDtrQkFuTG9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0ZW5lck1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL0xpc3RlbmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTeW5jRGF0YU1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1N5bmNEYXRhTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1V0aWxzL1Rvb2xzXCI7XHJcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gXCIuLi8uLi9EYXRhL0V2ZW50VHlwZVwiO1xyXG5pbXBvcnQgeyBFZGl0b3JNYW5hZ2VyLCBHYW1lRGF0YSB9IGZyb20gXCIuLi8uLi9NYW5hZ2VyL0VkaXRvck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRDb25maWcgfSBmcm9tIFwiLi9Tb3VuZENvbmZpZ1wiO1xyXG5cclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25Ob2RlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBpbWdfemhhZGFuOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShzcC5Ta2VsZXRvbilcclxuICAgIHByaXZhdGUgYW5pX3BpcGk6IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBpbWdfd3V0YWlkb25nOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSB6aGFuZGFuX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgcHJpdmF0ZSB5YW53dTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgcHJpdmF0ZSBib29tOiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBvcHRpb25fbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIG9wdGlvbl9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIG9wdGlvbl9pbWc6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHB1YmxpYyBvcHRpb25fY2hlY2s6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaWNvbjogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGljb25fMTogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHByaXZhdGUgaWNvbl9pbWc6IGNjLlNwcml0ZUZyYW1lW10gPSBbXTtcclxuXHJcbiAgICBwcml2YXRlIG9wdGlvbkluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBnYW1lRGF0YTogR2FtZURhdGEgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBpc1RydWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwdWJsaWMgc2hvd0luaXQoaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaWNvbl8xLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IEVkaXRvck1hbmFnZXIuZWRpdG9yRGF0YS5HYW1lRGF0YVtTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJMZXZlbF07XHJcbiAgICAgICAgdGhpcy5vcHRpb25JbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuaXNUcnVlID0gdGhpcy5nYW1lRGF0YS5hbnN3ZXJJZC5pbmRleE9mKGluZGV4ICsgMSkgIT0gLTE7XHJcbiAgICAgICAgdGhpcy5pY29uLnNwcml0ZUZyYW1lID0gdGhpcy5pY29uX2ltZ1tpbmRleF07XHJcbiAgICAgICAgdGhpcy5pY29uXzEuc3ByaXRlRnJhbWUgPSB0aGlzLmljb25faW1nW2luZGV4XTtcclxuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuW2ldLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmltZ193dXRhaWRvbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKDAuMiwgeyBzY2FsZVg6IDEgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1nX3d1dGFpZG9uZy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5hbmlfcGlwaS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIFRvb2xzLnBsYXlTcGluZSh0aGlzLmFuaV9waXBpLCAncGlwaV9kb25nbGkgY2h1bGFpIGhhcHB5JywgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIFRvb2xzLnBsYXlTcGluZSh0aGlzLmFuaV9waXBpLCAncGlwaV9jYXRjaCcsIHRydWUsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uX25vZGUuc2NhbGVYID0gMDtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMub3B0aW9uX25vZGUpLnRvKDAuMywgeyBzY2FsZVg6IDEgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pY29uXzEubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pX3BpcGkubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5pbml0T3B0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0T3B0aW9uKCkge1xyXG4gICAgICAgIGxldCBvcHRpb25EYXRhID0gdGhpcy5nYW1lRGF0YS5hbnN3ZXJbdGhpcy5vcHRpb25JbmRleF07XHJcbiAgICAgICAgaWYgKG9wdGlvbkRhdGEub3BpbmlvblBpYyA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3B0aW9uX2ltZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbl9sYmwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbl9sYmwuc3RyaW5nID0gb3B0aW9uRGF0YS5vcGluaW9uVGV4dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbl9pbWcubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbl9sYmwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgY2MucmVzb3VyY2VzLmxvYWQoXCJpbWFnZXMvXCIgKyBvcHRpb25EYXRhLm9waW5pb25QaWMsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBpbWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9uX2ltZy5zcHJpdGVGcmFtZSA9IGltZztcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGlja09wdGlvbigpIHtcclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueCueWHu+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIuZGlzcGF0Y2goRXZlbnRUeXBlLkNMSUNLX09QVElPTiwgdGhpcy5vcHRpb25JbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dUcnVlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVHJ1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFuaV9waXBpLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuYW5pX3BpcGksICdwaXBpX2NhdGNoJywgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5hbmlfcGlwaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltZ193dXRhaWRvbmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5vcHRpb25fbm9kZSkudG8oMC40LCB7IHNjYWxlWDogMCB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy56aGFuZGFuX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNUcnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ196dWFuc2hpXCIpLnggPSAtOTA7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ196dWFuc2hpXCIpKS50bygxLCB7IHk6IC00NTAsIGFuZ2xlOiA3MjAgKiAyIH0pLmNhbGwoKCkgPT4geyB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9vbHMucGxheVNwaW5lKHRoaXMuYW5pX3BpcGksICdwaXBpX2hhcHB5X21laWRvbmcnLCB0cnVlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuemhhbmRhbl9ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3poYWRhblwiKS54ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuemhhbmRhbl9ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3poYWRhblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfemhhZGFuXCIpKS50bygxLCB7IHk6IC00MzAsIGFuZ2xlOiA3MjAgKiAyIH0pLmRlbGF5KDAuMykuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiemhhZGFuX2Jvb21cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19kb25nemhvbmdfemhhZGFuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuemhhbmRhbl9ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3poYWRhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBUb29scy5wbGF5U3BpbmUodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiemhhZGFuX2Jvb21cIikuZ2V0Q29tcG9uZW50KHNwLlNrZWxldG9uKSwgJ2VmZmVjdF9ib29tJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54iG54K46Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueIhueCuOmfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy55YW53dS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9vbHMucGxheVNwaW5lKHRoaXMueWFud3UsICdkb25nbGkgeWFud3UnLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnlhbnd1Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5hbmlfcGlwaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pbWdfd3V0YWlkb25nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RmFsc2UoaXNTbGV0ZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoaXNTbGV0ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbmlfcGlwaS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIFRvb2xzLnBsYXlTcGluZSh0aGlzLmFuaV9waXBpLCAncGlwaV9jYXRjaCcsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pX3BpcGkubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5pbWdfd3V0YWlkb25nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMub3B0aW9uX25vZGUpLnRvKDAuNCwgeyBzY2FsZVg6IDAgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuemhhbmRhbl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfenVhbnNoaVwiKS54ID0gaXNTbGV0ZWQgPyAtOTAgOiAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFkgPSBpc1NsZXRlZCA/IC00NjAgOiAtNjUwO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfenVhbnNoaVwiKSkudG8oMSwgeyB5OiAtNDUwLCBhbmdsZTogNzIwICogMiB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU2xldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNjLnR3ZWVuKHRoaXMuemhhbmRhbl9ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX2Rvbmd6aG9uZ196aGFkYW5cIikpLmRlbGF5KDEpLmJlemllclRvKDAuNSwgY2MudjIoMCwgLTY1MCksIGNjLnYyKC01MCwgMCksIGNjLnYyKC0xMDAsIC00NjApKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm9vbVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19kb25nemhvbmdfemhhZGFuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUb29scy5wbGF5U3BpbmUodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm9vbVwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCAnZWZmZWN0X2Jvb20nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54iG54K46Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuYW5pX3BpcGksICdwaXBpX2hhcHB5JywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5wbGF5U3BpbmUodGhpcy5hbmlfcGlwaSwgJ3BpcGlfZW1iYXJyYXNzZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuemhhbmRhbl9ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3poYWRhblwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfemhhZGFuXCIpLnggPSBpc1NsZXRlZCA/IC05MCA6IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kWSA9IGlzU2xldGVkID8gLTQ2MCA6IC02NTA7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ196aGFkYW5cIikpLnRvKDEsIHsgeTogLTQzMCwgYW5nbGU6IDcyMCAqIDIgfSkuZGVsYXkoMC4zKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU2xldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuemhhbmRhbl9ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3poYWRhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm9vbVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19kb25nemhvbmdfemhhZGFuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUb29scy5wbGF5U3BpbmUodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm9vbVwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCAnZWZmZWN0X2Jvb20nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54iG54K46Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYm9vbVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueIhueCuOmfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMueWFud3Uubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUb29scy5wbGF5U3BpbmUodGhpcy55YW53dSwgJ2RvbmdsaSB5YW53dScsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLnlhbnd1Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuemhhbmRhbl9ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3poYWRhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiemhhZGFuX2Jvb21cIikuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfZG9uZ3pob25nX3poYWRhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInpoYWRhbl9ib29tXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbiksICdlZmZlY3RfYm9vbScsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLniIbngrjpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UsICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aGFkYW5fYm9vbVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgdGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfemhhZGFuXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54iG54K46Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aGFkYW5fYm9vbVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFRvb2xzLnBsYXlTcGluZSh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aGFkYW5fYm9vbVwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCAnZWZmZWN0X2Jvb20nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAvLyB9LCAyLjUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgIH1cclxufVxyXG4iXX0=