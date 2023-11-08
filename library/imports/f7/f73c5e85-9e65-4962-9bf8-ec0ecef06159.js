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
var OptionKuang_1 = require("./OptionKuang");
var SoundConfig_1 = require("./SoundConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameUI = /** @class */ (function (_super) {
    __extends(GameUI, _super);
    function GameUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg_ani = null;
        _this.btn_start = null;
        _this.question_node = null;
        _this.option_node = null;
        _this.option_prefab = null;
        _this.title_text = null;
        _this.question_img = null;
        _this.question_text = null;
        _this.lb_curLevel = null;
        _this.lb_levelCount = null;
        _this.gameData = null;
        _this.question_node_start_posY = 900;
        _this.question_node_posY = 90;
        _this.option_node_start_posY = -1000;
        _this.option_node_posY = -400;
        return _this;
    }
    GameUI.prototype.onLoad = function () {
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.GAME_RECONNECT, this.resetUI, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.GAME_REPLAY, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.on(EventType_1.EventType.CLICK_OPTION, this.handleClickOption, this);
        T2M_1.T2M.addSyncEventListener(EventType_1.EventType.CHANGE_ANI, this.T2M_changeAni.bind(this));
        T2M_1.T2M.addSyncEventListener(EventType_1.EventType.NEXT_LEVEL, this.nextLevel.bind(this));
        T2M_1.T2M.addSyncEventListener(EventType_1.EventType.SHOW_QUESTION, this.handleShowQuestion.bind(this));
        T2M_1.T2M.addSyncEventListener(EventType_1.EventType.SYNC_GAME_OVER, this.syncGameOver.bind(this));
    };
    GameUI.prototype.onDestroy = function () {
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.GAME_RECONNECT, this.resetUI, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.GAME_REPLAY, this.handleEnterGame, this);
        ListenerManager_1.ListenerManager.off(EventType_1.EventType.CLICK_OPTION, this.handleClickOption, this);
        T2M_1.T2M.removeSyncEventListener(EventType_1.EventType.CHANGE_ANI);
        T2M_1.T2M.removeSyncEventListener(EventType_1.EventType.NEXT_LEVEL);
        T2M_1.T2M.removeSyncEventListener(EventType_1.EventType.SHOW_QUESTION);
        T2M_1.T2M.removeSyncEventListener(EventType_1.EventType.SYNC_GAME_OVER);
    };
    GameUI.prototype.handleEnterGame = function () {
        Tools_1.Tools.playSpine(this.bg_ani, "BG", true);
        this.gameData = EditorManager_1.EditorManager.editorData.GameData[SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel];
        this.initUI();
    };
    GameUI.prototype.initUI = function () {
        var _this = this;
        console.log("initUI", this.gameData);
        this.initTitle();
        this.initLevelProgress();
        this.initQuestion();
        this.initOption();
        this.btn_start.active = true;
        this.btn_start.opacity = 0;
        this.question_node.y = this.question_node_start_posY;
        this.option_node.y = this.option_node_start_posY;
        Tools_1.Tools.playSpine(this.bg_ani, "BG1-1", true);
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni = "BG1-1";
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop = true;
        //播放皮皮语音：“别跑！”
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["别跑"], false, false, false, function () {
            cc.tween(_this.btn_start).to(0.5, { opacity: 255 }).start();
        });
    };
    GameUI.prototype.resetUI = function () {
        this.gameData = EditorManager_1.EditorManager.editorData.GameData[SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel];
        this.initTitle();
        this.initLevelProgress();
        this.initQuestion();
        this.initOption();
        this.btn_start.active = !SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.isStart;
        Tools_1.Tools.playSpine(this.bg_ani, SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni, SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop);
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.isStart) {
            this.question_node.y = this.question_node_posY;
            this.option_node.y = this.option_node_posY;
            this.question_node.getChildByName("qie").x = 430;
        }
        if (SyncDataManager_1.SyncDataManager.syncData.frameSyncData.isGameOver) {
            this.question_node.y = this.question_node_start_posY;
            this.option_node.y = this.option_node_start_posY;
            this.question_node.getChildByName("qie").x = 300;
        }
    };
    GameUI.prototype.nextLevel = function () {
        this.gameData = EditorManager_1.EditorManager.editorData.GameData[SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel];
        this.initTitle();
        this.initLevelProgress();
        this.initQuestion();
        this.initOption();
        this.handleShowQuestion();
    };
    GameUI.prototype.initTitle = function () {
        this.title_text.string = this.gameData.questionText;
        if (this.gameData.questionText.length > 36) {
            this.title_text.node.width = this.title_text.fontSize * 36;
            this.title_text.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        }
        else {
            this.title_text.overflow = cc.Label.Overflow.NONE;
        }
        this.title_text.node.active = false;
        this.title_text.string = this.gameData.questionText;
        this.title_text.node.active = true;
        this.title_text.node.parent.getComponent(cc.Layout).updateLayout();
    };
    GameUI.prototype.initLevelProgress = function () {
        this.lb_curLevel.node.parent.parent.active = EditorManager_1.EditorManager.editorData.GameData.length > 1;
        this.lb_curLevel.string = (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel + 1).toString();
        this.lb_levelCount.string = EditorManager_1.EditorManager.editorData.GameData.length.toString();
    };
    GameUI.prototype.initQuestion = function () {
        this.question_text.string = this.gameData.questionText;
    };
    GameUI.prototype.initOption = function () {
        this.option_node.destroyAllChildren();
        this.option_node.removeAllChildren();
        for (var i = 0; i < this.gameData.opinion; i++) {
            var option = cc.instantiate(this.option_prefab);
            option.name = "option" + i;
            option.parent = this.option_node;
            var com = option.getComponent(OptionKuang_1.default);
            var isTrueAnswer = this.gameData.answer == i + 1;
            com.init(i, this.gameData["opinionText" + (i + 1)], this.gameData["opinionPic" + (i + 1)], isTrueAnswer);
        }
    };
    GameUI.prototype.handleClickOption = function (data) {
        var _this = this;
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.SUBMIT, data);
        cc.tween(this.question_node.getChildByName("qie")).to(0.5, { x: 300 }).call(function () {
            if (data) {
                _this.handleTrueAni();
            }
            else {
                _this.handleWrongAni();
            }
        }).start();
    };
    GameUI.prototype.handleTrueAni = function () {
        var _this = this;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.tureLevel.push(SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel + 1);
        cc.tween(this.question_node).delay(0.5).to(0.5, { y: this.question_node_start_posY }).start();
        cc.tween(this.option_node).delay(0.5).to(0.5, { y: this.option_node_start_posY }).call(function () {
            _this.handleNextLevel();
        }).start();
    };
    GameUI.prototype.handleWrongAni = function () {
        var _this = this;
        cc.tween(this.question_node).delay(0.5).to(0.5, { y: this.question_node_start_posY }).start();
        cc.tween(this.option_node).delay(0.5).to(0.5, { y: this.option_node_start_posY }).call(function () {
            _this.handleNextLevel(false);
        }).start();
    };
    GameUI.prototype.handleNextLevel = function (isTrue) {
        if (isTrue === void 0) { isTrue = true; }
        var bg_ani_name = isTrue ? "BG3" : "BG4";
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel + 1 >= EditorManager_1.EditorManager.editorData.GameData.length) {
            this.handleGameOver();
        }
        else {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curLevel++;
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni = bg_ani_name;
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop = false;
            Tools_1.Tools.playSpine(this.bg_ani, bg_ani_name, false, function () {
                if (NetWork_1.NetWork.isMaster || !NetWork_1.NetWork.isSync) {
                    T2M_1.T2M.dispatch(EventType_1.EventType.CHANGE_ANI, { name: "BG2", loop: true });
                    T2M_1.T2M.dispatch(EventType_1.EventType.NEXT_LEVEL, null);
                }
                SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni = "BG2";
                SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop = true;
                // Tools.playSpine(this.bg_ani, "BG2", true);
                // this.nextLevel();
            });
        }
    };
    GameUI.prototype.T2M_changeAni = function (data) {
        Tools_1.Tools.playSpine(this.bg_ani, data.name, data.loop);
    };
    GameUI.prototype.handleGameOver = function () {
        if (SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.tureLevel.length == EditorManager_1.EditorManager.editorData.GameData.length) {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni = "BG3_win";
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop = false;
            Tools_1.Tools.playSpine(this.bg_ani, "BG3_win", false, function () {
                if (NetWork_1.NetWork.isMaster || !NetWork_1.NetWork.isSync) {
                    T2M_1.T2M.dispatch(EventType_1.EventType.CHANGE_ANI, { name: "BG3_win2", loop: true });
                    // T2M.dispatch(EventType.SYNC_GAME_OVER, null);
                }
                SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["快节奏成功音效"], false, false, false, function () {
                    if (NetWork_1.NetWork.isMaster || !NetWork_1.NetWork.isSync) {
                        // T2M.dispatch(EventType.CHANGE_ANI, { name: "BG3_win2", loop: true });
                        T2M_1.T2M.dispatch(EventType_1.EventType.SYNC_GAME_OVER, null);
                    }
                });
                SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni = "BG3_win2";
                SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop = true;
                // Tools.playSpine(this.bg_ani, "BG3_win2", true);
                // ListenerManager.dispatch(EventType.GAME_OVER);
            });
        }
        else {
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni = "BG3&4_lost";
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop = false;
            Tools_1.Tools.playSpine(this.bg_ani, "BG3&4_lost", false, function () {
                if (NetWork_1.NetWork.isMaster || !NetWork_1.NetWork.isSync) {
                    T2M_1.T2M.dispatch(EventType_1.EventType.CHANGE_ANI, { name: "BG3&4_lost2", loop: true });
                    // T2M.dispatch(EventType.SYNC_GAME_OVER, null);
                }
                SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["长一些的失败音效"], false, false, false, function () {
                    if (NetWork_1.NetWork.isMaster || !NetWork_1.NetWork.isSync) {
                        // T2M.dispatch(EventType.CHANGE_ANI, { name: "BG3_win2", loop: true });
                        T2M_1.T2M.dispatch(EventType_1.EventType.SYNC_GAME_OVER, null);
                    }
                });
                SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni = "BG3&4_lost2";
                SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop = true;
                // Tools.playSpine(this.bg_ani, "BG3&4_lost2", true);
                // ListenerManager.dispatch(EventType.GAME_OVER);
            });
        }
    };
    GameUI.prototype.syncGameOver = function () {
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.GAME_OVER);
    };
    GameUI.prototype.onClickStart = function () {
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.isStart = true;
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist["点击音效"], false, false, false);
        this.btn_start.active = false;
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni = "BG1";
        SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop = false;
        Tools_1.Tools.playSpine(this.bg_ani, "BG1", false, function () {
            if (NetWork_1.NetWork.isMaster || !NetWork_1.NetWork.isSync) {
                T2M_1.T2M.dispatch(EventType_1.EventType.CHANGE_ANI, { name: "BG2", loop: true });
                T2M_1.T2M.dispatch(EventType_1.EventType.SHOW_QUESTION, null);
            }
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.curAni = "BG2";
            SyncDataManager_1.SyncDataManager.getSyncData().customSyncData.aniLoop = true;
            // Tools.playSpine(this.bg_ani, "BG2", true);
            // this.handleShowQuestion();
        });
    };
    GameUI.prototype.handleShowQuestion = function () {
        var _this = this;
        this.question_node.getChildByName("qie").x = 300;
        cc.tween(this.question_node).to(0.5, { y: this.question_node_posY }).call(function () {
            UIHelp_1.UIHelp.closeMask();
            cc.tween(_this.question_node.getChildByName("qie")).to(0.5, { x: 430 }).start();
        }).start();
        cc.tween(this.option_node).to(0.5, { y: this.option_node_posY }).start();
    };
    __decorate([
        property(sp.Skeleton)
    ], GameUI.prototype, "bg_ani", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "btn_start", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "question_node", void 0);
    __decorate([
        property(cc.Node)
    ], GameUI.prototype, "option_node", void 0);
    __decorate([
        property(cc.Prefab)
    ], GameUI.prototype, "option_prefab", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "title_text", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameUI.prototype, "question_img", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "question_text", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "lb_curLevel", void 0);
    __decorate([
        property(cc.Label)
    ], GameUI.prototype, "lb_levelCount", void 0);
    GameUI = __decorate([
        ccclass
    ], GameUI);
    return GameUI;
}(cc.Component));
exports.default = GameUI;

cc._RF.pop();