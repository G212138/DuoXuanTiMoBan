
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/Item/GameUI.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f73c56FnmVJYpv47A7O8GFZ', 'GameUI');
// game/scripts/UI/Item/GameUI.ts

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
var NetWork_1 = require("../../../../frame/scripts/Http/NetWork");
var ListenerManager_1 = require("../../../../frame/scripts/Manager/ListenerManager");
var SoundManager_1 = require("../../../../frame/scripts/Manager/SoundManager");
var SyncDataManager_1 = require("../../../../frame/scripts/Manager/SyncDataManager");
var T2M_1 = require("../../../../frame/scripts/SDK/T2M");
var Tools_1 = require("../../../../frame/scripts/Utils/Tools");
var UIHelp_1 = require("../../../../frame/scripts/Utils/UIHelp");
var EventType_1 = require("../../Data/EventType");
var EditorManager_1 = require("../../Manager/EditorManager");
var OptionNode_1 = require("./OptionNode");
var SoundConfig_1 = require("./SoundConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.option_panel = null;
        _this.option_prefab = null;
        _this.question_lbl = null;
        _this.question_img = null;
        _this.jiangbei = null;
        _this.title_lbl = null;
        _this.curLevel_lbl = null;
        _this.levelCount_lbl = null;
        _this.endLayer = null;
        _this.jiangbei_prefab = null;
        _this.zhadan_prefab = null;
        _this.end_item_prefab = null;
        _this.gameData = null;
        return _this;
    }
    GameUI.prototype.onLoad = function () {
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.GAME_RECONNECT, this.resetUI, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.GAME_REPLAY, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.CLICK_OPTION, this.handleClickOption, this);
        T2M_1.T2M.addSyncEventListener(EventType_1.EventType.NEXT_LEVEL, this.nextLevel.bind(this));
    };
    GameUI.prototype.onDestroy = function () {
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.GAME_RECONNECT, this.resetUI, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.GAME_REPLAY, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.CLICK_OPTION, this.handleClickOption, this);
        T2M_1.T2M.removeSyncEventListener(EventType_1.EventType.NEXT_LEVEL);
    };
    GameUI.prototype.handleEnterGame = function () {
        this.gameData = EditorManager_1.EditorManager.editorData.GameData[SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel];
        this.initUI();
    };
    GameUI.prototype.initUI = function () {
        var _this = this;
        this.gameData = EditorManager_1.EditorManager.editorData.GameData[SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel];
        UIHelp_1.UIHelp.showMask();
        this.node.getChildByName("btn_check").active = false;
        this.node.getChildByName("btn_check").opacity = 0;
        this.node.getChildByName("btn_check").getChildByName("btn_disable").active = false;
        this.jiangbei.opacity = 0;
        this.jiangbei.scale = 0;
        this.jiangbei.active = false;
        this.node.getChildByName("pipi_yanwu").active = false;
        this.endLayer.active = false;
        this.option_panel.removeAllChildren();
        this.option_panel.destroyAllChildren();
        for (var i = 0; i < this.gameData.opinion; i++) {
            var option = cc.instantiate(this.option_prefab);
            option.parent = this.option_panel;
            option.name = "option_" + i;
            option.getComponent(OptionNode_1.default).showInit(i);
        }
        var panel_width = this.gameData.opinion * 290 + (this.gameData.opinion - 1) * 30;
        if (panel_width > 1800) {
            this.option_panel.scale = 1800 / panel_width;
        }
        this.scheduleOnce(function () {
            _this.showQuestion();
            _this.node.getChildByName("btn_check").active = true;
            _this.node.getChildByName("btn_check").getChildByName("btn_disable").active = true;
        }, 1);
        cc.tween(this.node.getChildByName("btn_check")).delay(1.5).to(0.5, { opacity: 255 }).call(function () {
            UIHelp_1.UIHelp.closeMask();
        }).start();
        this.initTitle();
        this.initLevelProgress();
    };
    GameUI.prototype.initLevelProgress = function () {
        this.curLevel_lbl.node.parent.parent.active = EditorManager_1.EditorManager.editorData.GameData.length > 1;
        this.curLevel_lbl.string = (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel + 1).toString();
        this.levelCount_lbl.string = EditorManager_1.EditorManager.editorData.GameData.length.toString();
    };
    GameUI.prototype.initTitle = function () {
        this.title_lbl.string = this.gameData.questionText;
        if (this.gameData.questionText.length > 36) {
            this.title_lbl.node.width = this.title_lbl.fontSize * 36;
            this.title_lbl.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        }
        else {
            this.title_lbl.overflow = cc.Label.Overflow.NONE;
        }
        this.title_lbl.node.active = false;
        this.title_lbl.string = this.gameData.questionText;
        this.title_lbl.node.active = this.gameData.questionPic == "" && this.gameData.questionText != "";
        this.title_lbl.node.parent.getComponent(cc.Layout).updateLayout();
    };
    GameUI.prototype.resetUI = function () {
        this.initUI();
        this.handleOptionState();
        this.handleCheckBtnState();
        if (SyncDataManager_1.SyncDataManager.getSyncData().frameSyncData.isGameOver) {
            for (var i = 0; i < this.option_panel.childrenCount; i++) {
                var option = this.option_panel.children[i];
                option.active = false;
            }
            for (var i = 0; i < this.node.getChildByName("img_wutaipingmu").childrenCount; i++) {
                var timu = this.node.getChildByName("img_wutaipingmu").children[i];
                timu.opacity = 0;
            }
        }
    };
    GameUI.prototype.showQuestion = function () {
        if (this.gameData.questionPic == "") {
            this.question_lbl.node.active = true;
            this.question_img.node.active = false;
            this.question_lbl.string = this.gameData.questionText;
            cc.tween(this.question_lbl.node).delay(0.5).to(0.3, { opacity: 255 }).start();
        }
        else {
            this.question_lbl.node.active = false;
            this.question_img.node.active = true;
            cc.tween(this.question_img.node).delay(0.5).to(0.3, { opacity: 255 }).start();
            cc.resources.load("images/" + this.gameData.questionPic, cc.SpriteFrame, function (err, img) {
                this.question_img.spriteFrame = img;
            }.bind(this));
        }
    };
    GameUI.prototype.handleClickOption = function (data) {
        var seletedOption = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.seletedOption;
        if (seletedOption.indexOf(data) != -1) {
            seletedOption.splice(seletedOption.indexOf(data), 1);
        }
        else {
            seletedOption.push(data);
        }
        this.handleOptionState();
        this.handleCheckBtnState();
    };
    GameUI.prototype.handleOptionState = function () {
        for (var i = 0; i < this.option_panel.childrenCount; i++) {
            var option = this.option_panel.children[i];
            option.getComponent(OptionNode_1.default).option_check.active = false;
        }
        for (var i = 0; i < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.seletedOption.length; i++) {
            var option = this.option_panel.getChildByName("option_" + SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.seletedOption[i]);
            option.getComponent(OptionNode_1.default).option_check.active = true;
        }
    };
    GameUI.prototype.handleCheckBtnState = function () {
        var btn_check = this.node.getChildByName("btn_check");
        var btn_mask = btn_check.getChildByName("btn_disable");
        btn_mask.active = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.seletedOption.length < 1;
    };
    GameUI.prototype.onClickCheckBtn = function () {
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["点击音效"], false, false);
        UIHelp_1.UIHelp.showMask();
        //判断答案是否正确
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.seletedOption.length != this.gameData.answerId.length) {
            // console.log("答案错误");
            this.handleFalse();
        }
        else {
            var isTrue = true;
            for (var i = 0; i < SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.seletedOption.length; i++) {
                if (this.gameData.answerId.indexOf(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.seletedOption[i] + 1) == -1) {
                    isTrue = false;
                    break;
                }
            }
            if (isTrue) {
                // console.log("答案正确");
                this.handleTrue();
            }
            else {
                // console.log("答案错误");
                this.handleFalse();
            }
        }
    };
    GameUI.prototype.handleTrue = function () {
        var _this = this;
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.SUBMIT, true);
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.rightTimu[SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel] = true;
        for (var i = 0; i < this.node.getChildByName("img_wutaipingmu").childrenCount; i++) {
            var timu = this.node.getChildByName("img_wutaipingmu").children[i];
            cc.tween(timu).to(0.5, { opacity: 0 }).start();
        }
        for (var i = 0; i < this.option_panel.childrenCount; i++) {
            var option = this.option_panel.children[i];
            option.getComponent(OptionNode_1.default).showTrue();
        }
        this.jiangbei.opacity = 0;
        this.jiangbei.active = true;
        this.scheduleOnce(function () {
            cc.tween(_this.jiangbei).to(0.5, { opacity: 255, scale: 1 }).start();
            SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["快节奏成功音效"], false, false, false, function () {
                if (NetWork_1.NetWork.isMaster || !NetWork_1.NetWork.isSync) {
                    T2M_1.T2M.dispatch(EventType_1.EventType.NEXT_LEVEL, true);
                }
                // this.nextLevel();
            });
        }, 2);
        this.scheduleOnce(function () {
            SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["咻"], false, false, false);
        }, 0.5);
    };
    GameUI.prototype.handleFalse = function () {
        var _this = this;
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.SUBMIT, false);
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.rightTimu[SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel] = false;
        for (var i = 0; i < this.node.getChildByName("img_wutaipingmu").childrenCount; i++) {
            var timu = this.node.getChildByName("img_wutaipingmu").children[i];
            cc.tween(timu).to(0.5, { opacity: 0 }).start();
        }
        for (var i = 0; i < this.option_panel.childrenCount; i++) {
            var option = this.option_panel.children[i];
            var isSleted = SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.seletedOption.indexOf(i) != -1;
            option.getComponent(OptionNode_1.default).showFalse(isSleted);
        }
        this.scheduleOnce(function () {
            _this.node.getChildByName("pipi_yanwu").active = true;
            Tools_1.Tools.playSpine(_this.node.getChildByName("pipi_yanwu").getComponent(sp.Skeleton), 'effect_smoke1', false, function () {
                _this.node.getChildByName("pipi_yanwu").active = false;
                // this.nextLevel();
                if (NetWork_1.NetWork.isMaster || !NetWork_1.NetWork.isSync) {
                    T2M_1.T2M.dispatch(EventType_1.EventType.NEXT_LEVEL, true);
                }
            });
        }, 2.5);
        this.scheduleOnce(function () {
            SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["咻"], false, false, false);
        }, 0.5);
    };
    GameUI.prototype.nextLevel = function () {
        this.jiangbei.active = false;
        for (var i = 0; i < this.option_panel.childrenCount; i++) {
            var option = this.option_panel.children[i];
            option.active = false;
        }
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel + 1 >= EditorManager_1.EditorManager.editorData.GameData.length) {
            this.handleGameOver();
        }
        else {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel++;
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.seletedOption = [];
            this.initUI();
        }
    };
    GameUI.prototype.handleGameOver = function () {
        this.endLayer.active = true;
        var isAllRight = true;
        this.endLayer.getChildByName("panel").removeAllChildren();
        for (var i = 0; i < EditorManager_1.EditorManager.editorData.GameData.length; i++) {
            if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.rightTimu[i]) {
                var end_item = cc.instantiate(this.end_item_prefab);
                end_item.parent = this.endLayer.getChildByName("panel");
                end_item.getChildByName("lbl").getComponent(cc.Label).string = "第" + (i + 1) + "题";
                end_item.getChildByName("img_cuowu").active = false;
                end_item.getChildByName("title").getComponent(cc.Label).string = "正确";
            }
            else {
                var end_item = cc.instantiate(this.end_item_prefab);
                end_item.parent = this.endLayer.getChildByName("panel");
                end_item.getChildByName("lbl").getComponent(cc.Label).string = "第" + (i + 1) + "题";
                end_item.getChildByName("img_cuowu").active = true;
                end_item.getChildByName("title").getComponent(cc.Label).string = "错误";
                isAllRight = false;
            }
        }
        if (isAllRight) {
            // SoundManager.playEffect(SoundConfig.soudlist["激烈的掌声欢呼音效"], false, false, false, () => {
            // ListenerManager.dispatch(EventType.GAME_OVER);
            // });
            Tools_1.Tools.playSpine(this.endLayer.getChildByName("pipi").getComponent(sp.Skeleton), 'pipi_happy', true);
        }
        else {
            // SoundManager.playEffect(SoundConfig.soudlist["稀稀拉拉的掌声音效"], false, false, false, () => {
            // ListenerManager.dispatch(EventType.GAME_OVER);
            // });
            Tools_1.Tools.playSpine(this.endLayer.getChildByName("pipi").getComponent(sp.Skeleton), 'pipi_embarrassed', true);
        }
        this.scheduleOnce(function () {
            ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.GAME_OVER);
        }, 3);
    };
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "option_panel", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameUI.prototype, "option_prefab", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "question_lbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameUI.prototype, "question_img", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "jiangbei", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "title_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "curLevel_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "levelCount_lbl", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "endLayer", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameUI.prototype, "jiangbei_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameUI.prototype, "zhadan_prefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameUI.prototype, "end_item_prefab", void 0);
    GameUI = __decorate([
        ccclass
    ], GameUI);
    return GameUI;
}(cc.Component));
exports.default = GameUI;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXEdhbWVVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrRUFBaUU7QUFDakUscUZBQW9GO0FBQ3BGLCtFQUE4RTtBQUM5RSxxRkFBb0Y7QUFDcEYseURBQXdEO0FBQ3hELCtEQUE4RDtBQUM5RCxpRUFBZ0U7QUFDaEUsa0RBQWlEO0FBQ2pELDZEQUFzRTtBQUN0RSwyQ0FBc0M7QUFDdEMsNkNBQTRDO0FBRXRDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBMlNDO1FBeFNXLGtCQUFZLEdBQVksSUFBSSxDQUFDO1FBRTdCLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBRWhDLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRTlCLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRS9CLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUUzQixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUU5QixvQkFBYyxHQUFhLElBQUksQ0FBQztRQUVoQyxjQUFRLEdBQVksSUFBSSxDQUFDO1FBRXpCLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBRWxDLG1CQUFhLEdBQWMsSUFBSSxDQUFDO1FBRWhDLHFCQUFlLEdBQWMsSUFBSSxDQUFDO1FBRWxDLGNBQVEsR0FBYSxJQUFJLENBQUM7O0lBZ1J0QyxDQUFDO0lBOVFHLHVCQUFNLEdBQU47UUFDSSxpQ0FBZSxDQUFDLEVBQUUsQ0FBQyxxQkFBUyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JFLGlDQUFlLENBQUMsRUFBRSxDQUFDLHFCQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxPQUFPLEVB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RCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDO0lBdFNEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7Z0RBQ21CO0lBRXJDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7aURBQ29CO0lBRXhDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0RBQ21CO0lBRXRDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ21CO0lBRXZDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7NENBQ2U7SUFFakM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzs2Q0FDZ0I7SUFFbkM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnREFDbUI7SUFFdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDcUI7SUFFeEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs0Q0FDZTtJQUVqQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNzQjtJQUUxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNvQjtJQUV4QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO21EQUNzQjtJQXpCekIsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQTJTMUI7SUFBRCxhQUFDO0NBM1NELEFBMlNDLENBM1NtQyxFQUFFLENBQUMsU0FBUyxHQTJTL0M7a0JBM1NvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7IE5ldFdvcmsgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9IdHRwL05ldFdvcmtcIjtcclxuaW1wb3J0IHsgTGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9MaXN0ZW5lck1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU291bmRNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9Tb3VuZE1hbmFnZXJcIjtcclxuaW1wb3J0IHsgU3luY0RhdGFNYW5hZ2VyIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvTWFuYWdlci9TeW5jRGF0YU1hbmFnZXJcIjtcclxuaW1wb3J0IHsgVDJNIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvU0RLL1QyTVwiO1xyXG5pbXBvcnQgeyBUb29scyB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1V0aWxzL1Rvb2xzXCI7XHJcbmltcG9ydCB7IFVJSGVscCB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1V0aWxzL1VJSGVscFwiO1xyXG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tIFwiLi4vLi4vRGF0YS9FdmVudFR5cGVcIjtcclxuaW1wb3J0IHsgRWRpdG9yTWFuYWdlciwgR2FtZURhdGEgfSBmcm9tIFwiLi4vLi4vTWFuYWdlci9FZGl0b3JNYW5hZ2VyXCI7XHJcbmltcG9ydCBPcHRpb25Ob2RlIGZyb20gXCIuL09wdGlvbk5vZGVcIjtcclxuaW1wb3J0IHsgU291bmRDb25maWcgfSBmcm9tIFwiLi9Tb3VuZENvbmZpZ1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG9wdGlvbl9wYW5lbDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBvcHRpb25fcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbl9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uX2ltZzogY2MuU3ByaXRlID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBqaWFuZ2JlaTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHRpdGxlX2xibDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBjdXJMZXZlbF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgbGV2ZWxDb3VudF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSBlbmRMYXllcjogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSBqaWFuZ2JlaV9wcmVmYWI6IGNjLlByZWZhYiA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxyXG4gICAgcHJpdmF0ZSB6aGFkYW5fcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgZW5kX2l0ZW1fcHJlZmFiOiBjYy5QcmVmYWIgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgZ2FtZURhdGE6IEdhbWVEYXRhID0gbnVsbDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5FTlRFUl9HQU1FLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5HQU1FX1JFQ09OTkVDVCwgdGhpcy5yZXNldFVJLCB0aGlzKTtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub24oRXZlbnRUeXBlLkdBTUVfUkVQTEFZLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5DTElDS19PUFRJT04sIHRoaXMuaGFuZGxlQ2xpY2tPcHRpb24sIHRoaXMpO1xyXG4gICAgICAgIFQyTS5hZGRTeW5jRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTkVYVF9MRVZFTCwgdGhpcy5uZXh0TGV2ZWwuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25EZXN0cm95KCkge1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vZmYoRXZlbnRUeXBlLkVOVEVSX0dBTUUsIHRoaXMuaGFuZGxlRW50ZXJHYW1lLCB0aGlzKTtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub2ZmKEV2ZW50VHlwZS5HQU1FX1JFQ09OTkVDVCwgdGhpcy5yZXNldFVJLCB0aGlzKTtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub2ZmKEV2ZW50VHlwZS5HQU1FX1JFUExBWSwgdGhpcy5oYW5kbGVFbnRlckdhbWUsIHRoaXMpO1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vZmYoRXZlbnRUeXBlLkNMSUNLX09QVElPTiwgdGhpcy5oYW5kbGVDbGlja09wdGlvbiwgdGhpcyk7XHJcbiAgICAgICAgVDJNLnJlbW92ZVN5bmNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5ORVhUX0xFVkVMKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVudGVyR2FtZSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVEYXRhID0gRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLkdhbWVEYXRhW1N5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1ckxldmVsXTtcclxuICAgICAgICB0aGlzLmluaXRVSSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFVJKCkge1xyXG4gICAgICAgIHRoaXMuZ2FtZURhdGEgPSBFZGl0b3JNYW5hZ2VyLmVkaXRvckRhdGEuR2FtZURhdGFbU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuY3VyTGV2ZWxdO1xyXG4gICAgICAgIFVJSGVscC5zaG93TWFzaygpO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9jaGVja1wiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJidG5fY2hlY2tcIikub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2NoZWNrXCIpLmdldENoaWxkQnlOYW1lKFwiYnRuX2Rpc2FibGVcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5qaWFuZ2JlaS5vcGFjaXR5ID0gMDtcclxuICAgICAgICB0aGlzLmppYW5nYmVpLnNjYWxlID0gMDtcclxuICAgICAgICB0aGlzLmppYW5nYmVpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInBpcGlfeWFud3VcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5lbmRMYXllci5hY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdGhpcy5vcHRpb25fcGFuZWwucmVtb3ZlQWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLm9wdGlvbl9wYW5lbC5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZURhdGEub3BpbmlvbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb24gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm9wdGlvbl9wcmVmYWIpO1xyXG4gICAgICAgICAgICBvcHRpb24ucGFyZW50ID0gdGhpcy5vcHRpb25fcGFuZWw7XHJcbiAgICAgICAgICAgIG9wdGlvbi5uYW1lID0gXCJvcHRpb25fXCIgKyBpO1xyXG4gICAgICAgICAgICBvcHRpb24uZ2V0Q29tcG9uZW50KE9wdGlvbk5vZGUpLnNob3dJbml0KGkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhbmVsX3dpZHRoID0gdGhpcy5nYW1lRGF0YS5vcGluaW9uICogMjkwICsgKHRoaXMuZ2FtZURhdGEub3BpbmlvbiAtIDEpICogMzA7XHJcbiAgICAgICAgaWYgKHBhbmVsX3dpZHRoID4gMTgwMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbl9wYW5lbC5zY2FsZSA9IDE4MDAgLyBwYW5lbF93aWR0aDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zaG93UXVlc3Rpb24oKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2NoZWNrXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9jaGVja1wiKS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9kaXNhYmxlXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiYnRuX2NoZWNrXCIpKS5kZWxheSgxLjUpLnRvKDAuNSwgeyBvcGFjaXR5OiAyNTUgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIFVJSGVscC5jbG9zZU1hc2soKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuaW5pdFRpdGxlKCk7XHJcbiAgICAgICAgdGhpcy5pbml0TGV2ZWxQcm9ncmVzcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdExldmVsUHJvZ3Jlc3MoKSB7XHJcbiAgICAgICAgdGhpcy5jdXJMZXZlbF9sYmwubm9kZS5wYXJlbnQucGFyZW50LmFjdGl2ZSA9IEVkaXRvck1hbmFnZXIuZWRpdG9yRGF0YS5HYW1lRGF0YS5sZW5ndGggPiAxO1xyXG4gICAgICAgIHRoaXMuY3VyTGV2ZWxfbGJsLnN0cmluZyA9IChTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJMZXZlbCArIDEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdGhpcy5sZXZlbENvdW50X2xibC5zdHJpbmcgPSBFZGl0b3JNYW5hZ2VyLmVkaXRvckRhdGEuR2FtZURhdGEubGVuZ3RoLnRvU3RyaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VGl0bGUoKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZV9sYmwuc3RyaW5nID0gdGhpcy5nYW1lRGF0YS5xdWVzdGlvblRleHQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEucXVlc3Rpb25UZXh0Lmxlbmd0aCA+IDM2KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGVfbGJsLm5vZGUud2lkdGggPSB0aGlzLnRpdGxlX2xibC5mb250U2l6ZSAqIDM2O1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlX2xibC5vdmVyZmxvdyA9IGNjLkxhYmVsLk92ZXJmbG93LlJFU0laRV9IRUlHSFQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZV9sYmwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5OT05FO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRpdGxlX2xibC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGl0bGVfbGJsLnN0cmluZyA9IHRoaXMuZ2FtZURhdGEucXVlc3Rpb25UZXh0O1xyXG4gICAgICAgIHRoaXMudGl0bGVfbGJsLm5vZGUuYWN0aXZlID0gdGhpcy5nYW1lRGF0YS5xdWVzdGlvblBpYyA9PSBcIlwiICYmIHRoaXMuZ2FtZURhdGEucXVlc3Rpb25UZXh0ICE9IFwiXCI7XHJcbiAgICAgICAgdGhpcy50aXRsZV9sYmwubm9kZS5wYXJlbnQuZ2V0Q29tcG9uZW50KGNjLkxheW91dCkudXBkYXRlTGF5b3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldFVJKCkge1xyXG4gICAgICAgIHRoaXMuaW5pdFVJKCk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25TdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hlY2tCdG5TdGF0ZSgpO1xyXG5cclxuICAgICAgICBpZiAoU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuZnJhbWVTeW5jRGF0YS5pc0dhbWVPdmVyKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25fcGFuZWwuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gdGhpcy5vcHRpb25fcGFuZWwuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgICAgICBvcHRpb24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfd3V0YWlwaW5nbXVcIikuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGltdSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ193dXRhaXBpbmdtdVwiKS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgICAgIHRpbXUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93UXVlc3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURhdGEucXVlc3Rpb25QaWMgPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uX2xibC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25faW1nLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25fbGJsLnN0cmluZyA9IHRoaXMuZ2FtZURhdGEucXVlc3Rpb25UZXh0O1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnF1ZXN0aW9uX2xibC5ub2RlKS5kZWxheSgwLjUpLnRvKDAuMywgeyBvcGFjaXR5OiAyNTUgfSkuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uX2xibC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uX2ltZy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMucXVlc3Rpb25faW1nLm5vZGUpLmRlbGF5KDAuNSkudG8oMC4zLCB7IG9wYWNpdHk6IDI1NSB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICBjYy5yZXNvdXJjZXMubG9hZChcImltYWdlcy9cIiArIHRoaXMuZ2FtZURhdGEucXVlc3Rpb25QaWMsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBpbWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25faW1nLnNwcml0ZUZyYW1lID0gaW1nO1xyXG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUNsaWNrT3B0aW9uKGRhdGEpIHtcclxuICAgICAgICBsZXQgc2VsZXRlZE9wdGlvbiA9IFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNlbGV0ZWRPcHRpb247XHJcbiAgICAgICAgaWYgKHNlbGV0ZWRPcHRpb24uaW5kZXhPZihkYXRhKSAhPSAtMSkge1xyXG4gICAgICAgICAgICBzZWxldGVkT3B0aW9uLnNwbGljZShzZWxldGVkT3B0aW9uLmluZGV4T2YoZGF0YSksIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGV0ZWRPcHRpb24ucHVzaChkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPcHRpb25TdGF0ZSgpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ2hlY2tCdG5TdGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlT3B0aW9uU3RhdGUoKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbl9wYW5lbC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHRoaXMub3B0aW9uX3BhbmVsLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBvcHRpb24uZ2V0Q29tcG9uZW50KE9wdGlvbk5vZGUpLm9wdGlvbl9jaGVjay5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zZWxldGVkT3B0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb24gPSB0aGlzLm9wdGlvbl9wYW5lbC5nZXRDaGlsZEJ5TmFtZShcIm9wdGlvbl9cIiArIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNlbGV0ZWRPcHRpb25baV0pO1xyXG4gICAgICAgICAgICBvcHRpb24uZ2V0Q29tcG9uZW50KE9wdGlvbk5vZGUpLm9wdGlvbl9jaGVjay5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUNoZWNrQnRuU3RhdGUoKSB7XHJcbiAgICAgICAgbGV0IGJ0bl9jaGVjayA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJ0bl9jaGVja1wiKTtcclxuICAgICAgICBsZXQgYnRuX21hc2sgPSBidG5fY2hlY2suZ2V0Q2hpbGRCeU5hbWUoXCJidG5fZGlzYWJsZVwiKTtcclxuICAgICAgICBidG5fbWFzay5hY3RpdmUgPSBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zZWxldGVkT3B0aW9uLmxlbmd0aCA8IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQ2hlY2tCdG4oKSB7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLngrnlh7vpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgVUlIZWxwLnNob3dNYXNrKCk7XHJcbiAgICAgICAgLy/liKTmlq3nrZTmoYjmmK/lkKbmraPnoa5cclxuICAgICAgICBpZiAoU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2VsZXRlZE9wdGlvbi5sZW5ndGggIT0gdGhpcy5nYW1lRGF0YS5hbnN3ZXJJZC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCLnrZTmoYjplJnor69cIik7XHJcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRmFsc2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaXNUcnVlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5zZWxldGVkT3B0aW9uLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nYW1lRGF0YS5hbnN3ZXJJZC5pbmRleE9mKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnNlbGV0ZWRPcHRpb25baV0gKyAxKSA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlzVHJ1ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpc1RydWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwi562U5qGI5q2j56GuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVUcnVlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuetlOahiOmUmeivr1wiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRmFsc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZVRydWUoKSB7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5TVUJNSVQsIHRydWUpO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnJpZ2h0VGltdVtTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJMZXZlbF0gPSB0cnVlO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1nX3d1dGFpcGluZ211XCIpLmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdGltdSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ193dXRhaXBpbmdtdVwiKS5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGltdSkudG8oMC41LCB7IG9wYWNpdHk6IDAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbl9wYW5lbC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHRoaXMub3B0aW9uX3BhbmVsLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBvcHRpb24uZ2V0Q29tcG9uZW50KE9wdGlvbk5vZGUpLnNob3dUcnVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuamlhbmdiZWkub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgdGhpcy5qaWFuZ2JlaS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5qaWFuZ2JlaSkudG8oMC41LCB7IG9wYWNpdHk6IDI1NSwgc2NhbGU6IDEgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLlv6voioLlpY/miJDlip/pn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChOZXRXb3JrLmlzTWFzdGVyIHx8ICFOZXRXb3JrLmlzU3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgIFQyTS5kaXNwYXRjaChFdmVudFR5cGUuTkVYVF9MRVZFTCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIHRoaXMubmV4dExldmVsKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDIpO1xyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLlkrtcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgIH0sIDAuNSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVGYWxzZSgpIHtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIuZGlzcGF0Y2goRXZlbnRUeXBlLlNVQk1JVCwgZmFsc2UpO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnJpZ2h0VGltdVtTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJMZXZlbF0gPSBmYWxzZTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltZ193dXRhaXBpbmdtdVwiKS5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHRpbXUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWdfd3V0YWlwaW5nbXVcIikuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRpbXUpLnRvKDAuNSwgeyBvcGFjaXR5OiAwIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vcHRpb25fcGFuZWwuY2hpbGRyZW5Db3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBvcHRpb24gPSB0aGlzLm9wdGlvbl9wYW5lbC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbGV0IGlzU2xldGVkID0gU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2VsZXRlZE9wdGlvbi5pbmRleE9mKGkpICE9IC0xO1xyXG4gICAgICAgICAgICBvcHRpb24uZ2V0Q29tcG9uZW50KE9wdGlvbk5vZGUpLnNob3dGYWxzZShpc1NsZXRlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGlwaV95YW53dVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBUb29scy5wbGF5U3BpbmUodGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicGlwaV95YW53dVwiKS5nZXRDb21wb25lbnQoc3AuU2tlbGV0b24pLCAnZWZmZWN0X3Ntb2tlMScsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJwaXBpX3lhbnd1XCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5uZXh0TGV2ZWwoKTtcclxuICAgICAgICAgICAgICAgIGlmIChOZXRXb3JrLmlzTWFzdGVyIHx8ICFOZXRXb3JrLmlzU3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgIFQyTS5kaXNwYXRjaChFdmVudFR5cGUuTkVYVF9MRVZFTCwgdHJ1ZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgMi41KTtcclxuICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi5ZK7XCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB9LCAwLjUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgbmV4dExldmVsKCkge1xyXG4gICAgICAgIHRoaXMuamlhbmdiZWkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9wdGlvbl9wYW5lbC5jaGlsZHJlbkNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IHRoaXMub3B0aW9uX3BhbmVsLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICBvcHRpb24uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJMZXZlbCArIDEgPj0gRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLkdhbWVEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUdhbWVPdmVyKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuY3VyTGV2ZWwrKztcclxuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuc2VsZXRlZE9wdGlvbiA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmluaXRVSSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUdhbWVPdmVyKCkge1xyXG4gICAgICAgIHRoaXMuZW5kTGF5ZXIuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgaXNBbGxSaWdodCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5lbmRMYXllci5nZXRDaGlsZEJ5TmFtZShcInBhbmVsXCIpLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBFZGl0b3JNYW5hZ2VyLmVkaXRvckRhdGEuR2FtZURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnJpZ2h0VGltdVtpXSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZF9pdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmRfaXRlbV9wcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgZW5kX2l0ZW0ucGFyZW50ID0gdGhpcy5lbmRMYXllci5nZXRDaGlsZEJ5TmFtZShcInBhbmVsXCIpO1xyXG4gICAgICAgICAgICAgICAgZW5kX2l0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYmxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuesrFwiICsgKGkgKyAxKSArIFwi6aKYXCI7XHJcbiAgICAgICAgICAgICAgICBlbmRfaXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ19jdW93dVwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGVuZF9pdGVtLmdldENoaWxkQnlOYW1lKFwidGl0bGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuato+ehrlwiO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGVuZF9pdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5lbmRfaXRlbV9wcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgZW5kX2l0ZW0ucGFyZW50ID0gdGhpcy5lbmRMYXllci5nZXRDaGlsZEJ5TmFtZShcInBhbmVsXCIpO1xyXG4gICAgICAgICAgICAgICAgZW5kX2l0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJsYmxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuesrFwiICsgKGkgKyAxKSArIFwi6aKYXCI7XHJcbiAgICAgICAgICAgICAgICBlbmRfaXRlbS5nZXRDaGlsZEJ5TmFtZShcImltZ19jdW93dVwiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZW5kX2l0ZW0uZ2V0Q2hpbGRCeU5hbWUoXCJ0aXRsZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi6ZSZ6K+vXCI7XHJcbiAgICAgICAgICAgICAgICBpc0FsbFJpZ2h0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzQWxsUmlnaHQpIHtcclxuICAgICAgICAgICAgLy8gU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLmv4Dng4jnmoTmjozlo7DmrKLlkbzpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5HQU1FX09WRVIpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuZW5kTGF5ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJwaXBpXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbiksICdwaXBpX2hhcHB5JywgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3RbXCLnqIDnqIDmi4nmi4nnmoTmjozlo7Dpn7PmlYhcIl0sIGZhbHNlLCBmYWxzZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgLy8gTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5HQU1FX09WRVIpO1xyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuZW5kTGF5ZXIuZ2V0Q2hpbGRCeU5hbWUoXCJwaXBpXCIpLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbiksICdwaXBpX2VtYmFycmFzc2VkJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5HQU1FX09WRVIpO1xyXG4gICAgICAgIH0sIDMpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=