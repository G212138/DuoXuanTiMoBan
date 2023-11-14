"use strict";
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
        this.title_lbl.node.active = true;
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
        }, 3);
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
        for (var i = 0; i < EditorManager_1.EditorManager.editorData.GameData.length; i++) {
            if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.rightTimu[i]) {
                var jiangbei = cc.instantiate(this.jiangbei_prefab);
                jiangbei.parent = this.endLayer.getChildByName("panel");
            }
            else {
                var zhadan = cc.instantiate(this.zhadan_prefab);
                zhadan.parent = this.endLayer.getChildByName("panel");
                isAllRight = false;
            }
        }
        if (isAllRight) {
            SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["激烈的掌声欢呼音效"], false, false, false, function () {
                ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.GAME_OVER);
            });
            Tools_1.Tools.playSpine(this.endLayer.getChildByName("pipi").getComponent(sp.Skeleton), 'pipi_happy_meidong', true);
        }
        else {
            SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["稀稀拉拉的掌声音效"], false, false, false, function () {
                ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.GAME_OVER);
            });
            Tools_1.Tools.playSpine(this.endLayer.getChildByName("pipi").getComponent(sp.Skeleton), 'pipi_embarrassed_meidong', true);
        }
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
    GameUI = __decorate([
        ccclass
    ], GameUI);
    return GameUI;
}(cc.Component));
exports.default = GameUI;

cc._RF.pop();