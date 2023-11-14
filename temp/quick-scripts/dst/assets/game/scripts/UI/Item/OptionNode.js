
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXE9wdGlvbk5vZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUZBQW9GO0FBQ3BGLCtFQUE4RTtBQUM5RSxxRkFBb0Y7QUFDcEYsK0RBQThEO0FBQzlELGtEQUFpRDtBQUNqRCw2REFBc0U7QUFDdEUsNkNBQTRDO0FBR3RDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXdDLDhCQUFZO0lBQXBEO1FBQUEscUVBa0pDO1FBaEpXLGdCQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGNBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBRTlCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLFdBQUssR0FBZ0IsSUFBSSxDQUFDO1FBRTFCLFVBQUksR0FBZ0IsSUFBSSxDQUFDO1FBRTFCLGlCQUFXLEdBQVksSUFBSSxDQUFDO1FBRTNCLGdCQUFVLEdBQWEsSUFBSSxDQUFDO1FBRTVCLGdCQUFVLEdBQWMsSUFBSSxDQUFDO1FBRTlCLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTVCLGlCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGNBQVEsR0FBYSxJQUFJLENBQUM7UUFDMUIsWUFBTSxHQUFZLEtBQUssQ0FBQzs7SUEwSHBDLENBQUM7SUF4SFUsNkJBQVEsR0FBZixVQUFnQixLQUFhO1FBQTdCLGlCQXlCQztRQXhCRyxJQUFJLENBQUMsUUFBUSxHQUFHLDZCQUFhLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxpQ0FBZSxDQUFDLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6RyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsTUFBTSxHQUFH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Q0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNpQjtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO2dEQUNlO0lBRXJDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7cURBQ29CO0lBRXRDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7b0RBQ21CO0lBRXJDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUM7NkNBQ1k7SUFFbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQzs0Q0FDVztJQUVqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNpQjtJQUVuQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNpQjtJQUVwQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2tEQUNpQjtJQUVyQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO29EQUNrQjtJQXBCbkIsVUFBVTtRQUQ5QixPQUFPO09BQ2EsVUFBVSxDQWtKOUI7SUFBRCxpQkFBQztDQWxKRCxBQWtKQyxDQWxKdUMsRUFBRSxDQUFDLFNBQVMsR0FrSm5EO2tCQWxKb0IsVUFBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpc3RlbmVyTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvTGlzdGVuZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvU291bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFN5bmNEYXRhTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvU3luY0RhdGFNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFRvb2xzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvVXRpbHMvVG9vbHNcIjtcclxuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL0RhdGEvRXZlbnRUeXBlXCI7XHJcbmltcG9ydCB7IEVkaXRvck1hbmFnZXIsIEdhbWVEYXRhIH0gZnJvbSBcIi4uLy4uL01hbmFnZXIvRWRpdG9yTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZENvbmZpZyB9IGZyb20gXCIuL1NvdW5kQ29uZmlnXCI7XHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbk5vZGUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGltZ196aGFkYW46IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KHNwLlNrZWxldG9uKVxyXG4gICAgcHJpdmF0ZSBhbmlfcGlwaTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGltZ193dXRhaWRvbmc6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHpoYW5kYW5fbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwcml2YXRlIHlhbnd1OiBzcC5Ta2VsZXRvbiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwcml2YXRlIGJvb206IHNwLlNrZWxldG9uID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIG9wdGlvbl9ub2RlOiBjYy5Ob2RlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgb3B0aW9uX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgb3B0aW9uX2ltZzogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHVibGljIG9wdGlvbl9jaGVjazogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBcclxuICAgIHByaXZhdGUgb3B0aW9uSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGdhbWVEYXRhOiBHYW1lRGF0YSA9IG51bGw7XHJcbiAgICBwcml2YXRlIGlzVHJ1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBzaG93SW5pdChpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IEVkaXRvck1hbmFnZXIuZWRpdG9yRGF0YS5HYW1lRGF0YVtTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJMZXZlbF07XHJcbiAgICAgICAgdGhpcy5vcHRpb25JbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMuaXNUcnVlID0gdGhpcy5nYW1lRGF0YS5hbnN3ZXJJZC5pbmRleE9mKGluZGV4ICsgMSkgIT0gLTE7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW1nX3d1dGFpZG9uZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMubm9kZSkudG8oMC4yLCB7IHNjYWxlWDogMSB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5pbWdfd3V0YWlkb25nLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmFuaV9waXBpLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuYW5pX3BpcGksICdwaXBpX2RvbmdsaSBjaHVsYWkgaGFwcHknLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuYW5pX3BpcGksICdwaXBpX2NhdGNoJywgdHJ1ZSwgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcHRpb25fbm9kZS5zY2FsZVggPSAwO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5vcHRpb25fbm9kZSkudG8oMC4zLCB7IHNjYWxlWDogMSB9KS5jYWxsKCgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdE9wdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdE9wdGlvbigpIHtcclxuICAgICAgICBsZXQgb3B0aW9uRGF0YSA9IHRoaXMuZ2FtZURhdGEuYW5zd2VyW3RoaXMub3B0aW9uSW5kZXhdO1xyXG4gICAgICAgIGlmIChvcHRpb25EYXRhLm9waW5pb25QaWMgPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbl9pbWcubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25fbGJsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25fbGJsLnN0cmluZyA9IG9wdGlvbkRhdGEub3BpbmlvblRleHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25faW1nLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25fbGJsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGNjLnJlc291cmNlcy5sb2FkKFwiaW1hZ2VzL1wiICsgb3B0aW9uRGF0YS5vcGluaW9uUGljLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgaW1nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbl9pbWcuc3ByaXRlRnJhbWUgPSBpbWc7XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uQ2xpY2tPcHRpb24oKSB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5DTElDS19PUFRJT04sIHRoaXMub3B0aW9uSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93VHJ1ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1RydWUpIHtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuYW5pX3BpcGksICdwaXBpX2NhdGNoX21laWRvbmcnLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFuaV9waXBpLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1nX3d1dGFpZG9uZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm9wdGlvbl9ub2RlKS50bygwLjQsIHsgc2NhbGVYOiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpoYW5kYW5fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1RydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuemhhbmRhbl9ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3p1YW5zaGlcIikueCA9IC0xMDA7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ196dWFuc2hpXCIpKS50bygxLCB7IHk6IC00NjAsIGFuZ2xlOiAzNjAgfSkuY2FsbCgoKSA9PiB7IH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBUb29scy5wbGF5U3BpbmUodGhpcy5hbmlfcGlwaSwgJ3BpcGlfaGFwcHlfbWVpZG9uZycsIHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfemhhZGFuXCIpLnggPSAwO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfemhhZGFuXCIpKS50bygxLCB7IHk6IC02NTAsIGFuZ2xlOiAzNjAgfSkuZGVsYXkoMC4zKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueIhueCuOmfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55YW53dS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMueWFud3UsICdkb25nbGkgeWFud3UnLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnlhbnd1Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5hbmlfcGlwaS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5pbWdfd3V0YWlkb25nLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93RmFsc2UoaXNTbGV0ZWQ6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoaXNTbGV0ZWQpIHtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuYW5pX3BpcGksICdwaXBpX2NhdGNoX21laWRvbmcnLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmFuaV9waXBpLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuaW1nX3d1dGFpZG9uZy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy50d2Vlbih0aGlzLm9wdGlvbl9ub2RlKS50bygwLjQsIHsgc2NhbGVYOiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnpoYW5kYW5fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1RydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuemhhbmRhbl9ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3p1YW5zaGlcIikueCA9IGlzU2xldGVkID8gLTEwMCA6IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgZW5kWSA9IGlzU2xldGVkID8gLTQ2MCA6IC02NTA7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ196dWFuc2hpXCIpKS50bygxLCB7IHk6IGVuZFksIGFuZ2xlOiAzNjAgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1NsZXRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ19kb25nemhvbmdfemhhZGFuXCIpKS5kZWxheSgxKS5iZXppZXJUbygwLjUsIGNjLnYyKDAsIC02NTApLCBjYy52MigtNTAsIDApLCBjYy52MigtMTAwLCAtNDYwKSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aGFkYW5fYm9vbVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfZG9uZ3pob25nX3poYWRhblwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xzLnBsYXlTcGluZSh0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ6aGFkYW5fYm9vbVwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCAnZWZmZWN0X2Jvb20nLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIueIhueCuOmfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIFRvb2xzLnBsYXlTcGluZSh0aGlzLmFuaV9waXBpLCAncGlwaV9oYXBweV9tZWlkb25nJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUb29scy5wbGF5U3BpbmUodGhpcy5hbmlfcGlwaSwgJ3BpcGlfZW1iYXJyYXNzZWRfbWVpZG9uZycsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfemhhZGFuXCIpLnggPSBpc1NsZXRlZCA/IC0xMDAgOiAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZFkgPSBpc1NsZXRlZCA/IC00NjAgOiAtNjUwO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy56aGFuZGFuX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfemhhZGFuXCIpKS50bygxLCB7IHk6IGVuZFksIGFuZ2xlOiAzNjAgfSkuZGVsYXkoMC4zKS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU2xldGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54iG54K46Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55YW53dS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFRvb2xzLnBsYXlTcGluZSh0aGlzLnlhbnd1LCAnZG9uZ2xpIHlhbnd1JywgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueWFud3Uubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnpoYW5kYW5fbm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ196aGFkYW5cIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLniIbngrjpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInpoYWRhbl9ib29tXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInpoYWRhbl9ib29tXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbiksICdlZmZlY3RfYm9vbScsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0sIDIuNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==