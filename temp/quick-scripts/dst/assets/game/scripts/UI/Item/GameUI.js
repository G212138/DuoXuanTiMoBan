
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXEdhbWVVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBaUU7QUFDakUscUZBQW9GO0FBQ3BGLCtFQUE4RTtBQUM5RSxxRkFBb0Y7QUFDcEYseURBQXdEO0FBQ3hELCtEQUE4RDtBQUM5RCxpRUFBZ0U7QUFDaEUsa0RBQWlEO0FBQ2pELDZEQUFzRTtBQUN0RSw2Q0FBd0M7QUFDeEMsNkNBQTRDO0FBRXRDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQW9DLDBCQUFZO0lBQWhEO1FBQUEscUVBMlFDO1FBelFXLFlBQU0sR0FBZ0IsSUFBSSxDQUFDO1FBRTNCLGVBQVMsR0FBWSxJQUFJLENBQUM7UUFFMUIsbUJBQWEsR0FBWSxJQUFJLENBQUM7UUFFOUIsaUJBQVcsR0FBWSxJQUFJLENBQUM7UUFFNUIsbUJBQWEsR0FBYyxJQUFJLENBQUM7UUFFaEMsZ0JBQVUsR0FBYSxJQUFJLENBQUM7UUFFNUIsa0JBQVksR0FBYyxJQUFJLENBQUM7UUFFL0IsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFFL0IsaUJBQVcsR0FBYSxJQUFJLENBQUM7UUFFN0IsbUJBQWEsR0FBYSxJQUFJLENBQUM7UUFFL0IsY0FBUSxHQUFhLElBQUksQ0FBQztRQUMxQiw4QkFBd0IsR0FBVyxHQUFHLENBQUM7UUFDdkMsd0JBQWtCLEdBQVcsRUFBRSxDQUFDO1FBQ2hDLDRCQUFzQixHQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLHNCQUFnQixHQUFXLENBQUMsR0FBRyxDQUFDOztJQWlQNUMsQ0FBQztJQS9PRyx1QkFBTSxHQUFOO1FBQ0ksaUNBQWUsQ0FBQyxFQUFFLENBQUMscUJBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMs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dCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXRXb3JrIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvSHR0cC9OZXRXb3JrXCI7XHJcbmltcG9ydCB7IExpc3RlbmVyTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvTGlzdGVuZXJNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvU291bmRNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFN5bmNEYXRhTWFuYWdlciB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL01hbmFnZXIvU3luY0RhdGFNYW5hZ2VyXCI7XHJcbmltcG9ydCB7IFQyTSB9IGZyb20gXCIuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1NESy9UMk1cIjtcclxuaW1wb3J0IHsgVG9vbHMgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9VdGlscy9Ub29sc1wiO1xyXG5pbXBvcnQgeyBVSUhlbHAgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9VdGlscy9VSUhlbHBcIjtcclxuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL0RhdGEvRXZlbnRUeXBlXCI7XHJcbmltcG9ydCB7IEVkaXRvck1hbmFnZXIsIEdhbWVEYXRhIH0gZnJvbSBcIi4uLy4uL01hbmFnZXIvRWRpdG9yTWFuYWdlclwiO1xyXG5pbXBvcnQgT3B0aW9uS3VhbmcgZnJvbSBcIi4vT3B0aW9uS3VhbmdcIjtcclxuaW1wb3J0IHsgU291bmRDb25maWcgfSBmcm9tIFwiLi9Tb3VuZENvbmZpZ1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVVSSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBAcHJvcGVydHkoc3AuU2tlbGV0b24pXHJcbiAgICBwcml2YXRlIGJnX2FuaTogc3AuU2tlbGV0b24gPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGJ0bl9zdGFydDogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcXVlc3Rpb25fbm9kZTogY2MuTm9kZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgb3B0aW9uX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlByZWZhYilcclxuICAgIHByaXZhdGUgb3B0aW9uX3ByZWZhYjogY2MuUHJlZmFiID0gbnVsbDtcclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgdGl0bGVfdGV4dDogY2MuTGFiZWwgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgcXVlc3Rpb25faW1nOiBjYy5TcHJpdGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbl90ZXh0OiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxiX2N1ckxldmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGxiX2xldmVsQ291bnQ6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIGdhbWVEYXRhOiBHYW1lRGF0YSA9IG51bGw7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uX25vZGVfc3RhcnRfcG9zWTogbnVtYmVyID0gOTAwO1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbl9ub2RlX3Bvc1k6IG51bWJlciA9IDkwO1xyXG4gICAgcHJpdmF0ZSBvcHRpb25fbm9kZV9zdGFydF9wb3NZOiBudW1iZXIgPSAtMTAwMDtcclxuICAgIHByaXZhdGUgb3B0aW9uX25vZGVfcG9zWTogbnVtYmVyID0gLTQwMDtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5FTlRFUl9HQU1FLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5HQU1FX1JFQ09OTkVDVCwgdGhpcy5yZXNldFVJLCB0aGlzKTtcclxuICAgICAgICBMaXN0ZW5lck1hbmFnZXIub24oRXZlbnRUeXBlLkdBTUVfUkVQTEFZLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9uKEV2ZW50VHlwZS5DTElDS19PUFRJT04sIHRoaXMuaGFuZGxlQ2xpY2tPcHRpb24sIHRoaXMpO1xyXG4gICAgICAgIFQyTS5hZGRTeW5jRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuQ0hBTkdFX0FOSSwgdGhpcy5UMk1fY2hhbmdlQW5pLmJpbmQodGhpcykpO1xyXG4gICAgICAgIFQyTS5hZGRTeW5jRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTkVYVF9MRVZFTCwgdGhpcy5uZXh0TGV2ZWwuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgVDJNLmFkZFN5bmNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5TSE9XX1FVRVNUSU9OLCB0aGlzLmhhbmRsZVNob3dRdWVzdGlvbi5iaW5kKHRoaXMpKTtcclxuICAgICAgICBUMk0uYWRkU3luY0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlNZTkNfR0FNRV9PVkVSLCB0aGlzLnN5bmNHYW1lT3Zlci5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9mZihFdmVudFR5cGUuRU5URVJfR0FNRSwgdGhpcy5oYW5kbGVFbnRlckdhbWUsIHRoaXMpO1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vZmYoRXZlbnRUeXBlLkdBTUVfUkVDT05ORUNULCB0aGlzLnJlc2V0VUksIHRoaXMpO1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5vZmYoRXZlbnRUeXBlLkdBTUVfUkVQTEFZLCB0aGlzLmhhbmRsZUVudGVyR2FtZSwgdGhpcyk7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLm9mZihFdmVudFR5cGUuQ0xJQ0tfT1BUSU9OLCB0aGlzLmhhbmRsZUNsaWNrT3B0aW9uLCB0aGlzKTtcclxuICAgICAgICBUMk0ucmVtb3ZlU3luY0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLkNIQU5HRV9BTkkpO1xyXG4gICAgICAgIFQyTS5yZW1vdmVTeW5jRXZlbnRMaXN0ZW5lcihFdmVudFR5cGUuTkVYVF9MRVZFTCk7XHJcbiAgICAgICAgVDJNLnJlbW92ZVN5bmNFdmVudExpc3RlbmVyKEV2ZW50VHlwZS5TSE9XX1FVRVNUSU9OKTtcclxuICAgICAgICBUMk0ucmVtb3ZlU3luY0V2ZW50TGlzdGVuZXIoRXZlbnRUeXBlLlNZTkNfR0FNRV9PVkVSKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVudGVyR2FtZSgpIHtcclxuICAgICAgICBUb29scy5wbGF5U3BpbmUodGhpcy5iZ19hbmksIFwiQkdcIiwgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5nYW1lRGF0YSA9IEVkaXRvck1hbmFnZXIuZWRpdG9yRGF0YS5HYW1lRGF0YVtTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJMZXZlbF07XHJcbiAgICAgICAgdGhpcy5pbml0VUkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRVSSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImluaXRVSVwiLCB0aGlzLmdhbWVEYXRhKTtcclxuICAgICAgICB0aGlzLmluaXRUaXRsZSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdExldmVsUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmluaXRRdWVzdGlvbigpO1xyXG4gICAgICAgIHRoaXMuaW5pdE9wdGlvbigpO1xyXG5cclxuICAgICAgICB0aGlzLmJ0bl9zdGFydC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0Lm9wYWNpdHkgPSAwO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25fbm9kZS55ID0gdGhpcy5xdWVzdGlvbl9ub2RlX3N0YXJ0X3Bvc1k7XHJcbiAgICAgICAgdGhpcy5vcHRpb25fbm9kZS55ID0gdGhpcy5vcHRpb25fbm9kZV9zdGFydF9wb3NZO1xyXG4gICAgICAgIFRvb2xzLnBsYXlTcGluZSh0aGlzLmJnX2FuaSwgXCJCRzEtMVwiLCB0cnVlKTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJBbmkgPSBcIkJHMS0xXCI7XHJcbiAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuYW5pTG9vcCA9IHRydWU7XHJcbiAgICAgICAgLy/mkq3mlL7nmq7nmq7or63pn7PvvJrigJzliKvot5HvvIHigJ1cclxuICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIuWIq+i3kVwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ0bl9zdGFydCkudG8oMC41LCB7IG9wYWNpdHk6IDI1NSB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXRVSSgpIHtcclxuICAgICAgICB0aGlzLmdhbWVEYXRhID0gRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLkdhbWVEYXRhW1N5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1ckxldmVsXTtcclxuICAgICAgICB0aGlzLmluaXRUaXRsZSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdExldmVsUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmluaXRRdWVzdGlvbigpO1xyXG4gICAgICAgIHRoaXMuaW5pdE9wdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0LmFjdGl2ZSA9ICFTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5pc1N0YXJ0O1xyXG4gICAgICAgIFRvb2xzLnBsYXlTcGluZSh0aGlzLmJnX2FuaSwgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuY3VyQW5pLCBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5hbmlMb29wKTtcclxuICAgICAgICBpZiAoU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuaXNTdGFydCkge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uX25vZGUueSA9IHRoaXMucXVlc3Rpb25fbm9kZV9wb3NZO1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbl9ub2RlLnkgPSB0aGlzLm9wdGlvbl9ub2RlX3Bvc1k7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25fbm9kZS5nZXRDaGlsZEJ5TmFtZShcInFpZVwiKS54ID0gNDMwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoU3luY0RhdGFNYW5hZ2VyLnN5bmNEYXRhLmZyYW1lU3luY0RhdGEuaXNHYW1lT3Zlcikge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uX25vZGUueSA9IHRoaXMucXVlc3Rpb25fbm9kZV9zdGFydF9wb3NZO1xyXG4gICAgICAgICAgICB0aGlzLm9wdGlvbl9ub2RlLnkgPSB0aGlzLm9wdGlvbl9ub2RlX3N0YXJ0X3Bvc1k7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25fbm9kZS5nZXRDaGlsZEJ5TmFtZShcInFpZVwiKS54ID0gMzAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG5leHRMZXZlbCgpIHtcclxuICAgICAgICB0aGlzLmdhbWVEYXRhID0gRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLkdhbWVEYXRhW1N5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1ckxldmVsXTtcclxuICAgICAgICB0aGlzLmluaXRUaXRsZSgpO1xyXG4gICAgICAgIHRoaXMuaW5pdExldmVsUHJvZ3Jlc3MoKTtcclxuICAgICAgICB0aGlzLmluaXRRdWVzdGlvbigpO1xyXG4gICAgICAgIHRoaXMuaW5pdE9wdGlvbigpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlU2hvd1F1ZXN0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpbml0VGl0bGUoKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZV90ZXh0LnN0cmluZyA9IHRoaXMuZ2FtZURhdGEucXVlc3Rpb25UZXh0O1xyXG4gICAgICAgIGlmICh0aGlzLmdhbWVEYXRhLnF1ZXN0aW9uVGV4dC5sZW5ndGggPiAzNikge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlX3RleHQubm9kZS53aWR0aCA9IHRoaXMudGl0bGVfdGV4dC5mb250U2l6ZSAqIDM2O1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlX3RleHQub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5SRVNJWkVfSEVJR0hUO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGl0bGVfdGV4dC5vdmVyZmxvdyA9IGNjLkxhYmVsLk92ZXJmbG93Lk5PTkU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudGl0bGVfdGV4dC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudGl0bGVfdGV4dC5zdHJpbmcgPSB0aGlzLmdhbWVEYXRhLnF1ZXN0aW9uVGV4dDtcclxuICAgICAgICB0aGlzLnRpdGxlX3RleHQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudGl0bGVfdGV4dC5ub2RlLnBhcmVudC5nZXRDb21wb25lbnQoY2MuTGF5b3V0KS51cGRhdGVMYXlvdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRMZXZlbFByb2dyZXNzKCkge1xyXG4gICAgICAgIHRoaXMubGJfY3VyTGV2ZWwubm9kZS5wYXJlbnQucGFyZW50LmFjdGl2ZSA9IEVkaXRvck1hbmFnZXIuZWRpdG9yRGF0YS5HYW1lRGF0YS5sZW5ndGggPiAxO1xyXG4gICAgICAgIHRoaXMubGJfY3VyTGV2ZWwuc3RyaW5nID0gKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1ckxldmVsICsgMSkudG9TdHJpbmcoKTtcclxuICAgICAgICB0aGlzLmxiX2xldmVsQ291bnQuc3RyaW5nID0gRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLkdhbWVEYXRhLmxlbmd0aC50b1N0cmluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdFF1ZXN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25fdGV4dC5zdHJpbmcgPSB0aGlzLmdhbWVEYXRhLnF1ZXN0aW9uVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRPcHRpb24oKSB7XHJcbiAgICAgICAgdGhpcy5vcHRpb25fbm9kZS5kZXN0cm95QWxsQ2hpbGRyZW4oKTtcclxuICAgICAgICB0aGlzLm9wdGlvbl9ub2RlLnJlbW92ZUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVEYXRhLm9waW5pb247IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uID0gY2MuaW5zdGFudGlhdGUodGhpcy5vcHRpb25fcHJlZmFiKTtcclxuICAgICAgICAgICAgb3B0aW9uLm5hbWUgPSBcIm9wdGlvblwiICsgaTtcclxuICAgICAgICAgICAgb3B0aW9uLnBhcmVudCA9IHRoaXMub3B0aW9uX25vZGU7XHJcbiAgICAgICAgICAgIGxldCBjb20gPSBvcHRpb24uZ2V0Q29tcG9uZW50KE9wdGlvbkt1YW5nKTtcclxuICAgICAgICAgICAgbGV0IGlzVHJ1ZUFuc3dlciA9IHRoaXMuZ2FtZURhdGEuYW5zd2VyID09IGkgKyAxO1xyXG4gICAgICAgICAgICBjb20uaW5pdChpLCB0aGlzLmdhbWVEYXRhW1wib3BpbmlvblRleHRcIiArIChpICsgMSldLCB0aGlzLmdhbWVEYXRhW1wib3BpbmlvblBpY1wiICsgKGkgKyAxKV0sIGlzVHJ1ZUFuc3dlcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlQ2xpY2tPcHRpb24oZGF0YSkge1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5kaXNwYXRjaChFdmVudFR5cGUuU1VCTUlULCBkYXRhKTtcclxuICAgICAgICBjYy50d2Vlbih0aGlzLnF1ZXN0aW9uX25vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJxaWVcIikpLnRvKDAuNSwgeyB4OiAzMDAgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVRydWVBbmkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlV3JvbmdBbmkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVUcnVlQW5pKCkge1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLnR1cmVMZXZlbC5wdXNoKFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1ckxldmVsICsgMSk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5xdWVzdGlvbl9ub2RlKS5kZWxheSgwLjUpLnRvKDAuNSwgeyB5OiB0aGlzLnF1ZXN0aW9uX25vZGVfc3RhcnRfcG9zWSB9KS5zdGFydCgpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMub3B0aW9uX25vZGUpLmRlbGF5KDAuNSkudG8oMC41LCB7IHk6IHRoaXMub3B0aW9uX25vZGVfc3RhcnRfcG9zWSB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVOZXh0TGV2ZWwoKTtcclxuICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlV3JvbmdBbmkoKSB7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5xdWVzdGlvbl9ub2RlKS5kZWxheSgwLjUpLnRvKDAuNSwgeyB5OiB0aGlzLnF1ZXN0aW9uX25vZGVfc3RhcnRfcG9zWSB9KS5zdGFydCgpO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMub3B0aW9uX25vZGUpLmRlbGF5KDAuNSkudG8oMC41LCB7IHk6IHRoaXMub3B0aW9uX25vZGVfc3RhcnRfcG9zWSB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVOZXh0TGV2ZWwoZmFsc2UpO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVOZXh0TGV2ZWwoaXNUcnVlOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGxldCBiZ19hbmlfbmFtZSA9IGlzVHJ1ZSA/IFwiQkczXCIgOiBcIkJHNFwiO1xyXG4gICAgICAgIGlmIChTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJMZXZlbCArIDEgPj0gRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLkdhbWVEYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUdhbWVPdmVyKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuY3VyTGV2ZWwrKztcclxuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuY3VyQW5pID0gYmdfYW5pX25hbWU7XHJcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmFuaUxvb3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuYmdfYW5pLCBiZ19hbmlfbmFtZSwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChOZXRXb3JrLmlzTWFzdGVyIHx8ICFOZXRXb3JrLmlzU3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgIFQyTS5kaXNwYXRjaChFdmVudFR5cGUuQ0hBTkdFX0FOSSwgeyBuYW1lOiBcIkJHMlwiLCBsb29wOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgVDJNLmRpc3BhdGNoKEV2ZW50VHlwZS5ORVhUX0xFVkVMLCBudWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1ckFuaSA9IFwiQkcyXCI7XHJcbiAgICAgICAgICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5hbmlMb29wID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIFRvb2xzLnBsYXlTcGluZSh0aGlzLmJnX2FuaSwgXCJCRzJcIiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLm5leHRMZXZlbCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBUMk1fY2hhbmdlQW5pKGRhdGEpIHtcclxuICAgICAgICBUb29scy5wbGF5U3BpbmUodGhpcy5iZ19hbmksIGRhdGEubmFtZSwgZGF0YS5sb29wKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUdhbWVPdmVyKCkge1xyXG4gICAgICAgIGlmIChTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS50dXJlTGV2ZWwubGVuZ3RoID09IEVkaXRvck1hbmFnZXIuZWRpdG9yRGF0YS5HYW1lRGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuY3VyQW5pID0gXCJCRzNfd2luXCI7XHJcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmFuaUxvb3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuYmdfYW5pLCBcIkJHM193aW5cIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChOZXRXb3JrLmlzTWFzdGVyIHx8ICFOZXRXb3JrLmlzU3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgIFQyTS5kaXNwYXRjaChFdmVudFR5cGUuQ0hBTkdFX0FOSSwgeyBuYW1lOiBcIkJHM193aW4yXCIsIGxvb3A6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVDJNLmRpc3BhdGNoKEV2ZW50VHlwZS5TWU5DX0dBTUVfT1ZFUiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIuW/q+iKguWlj+aIkOWKn+mfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOZXRXb3JrLmlzTWFzdGVyIHx8ICFOZXRXb3JrLmlzU3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUMk0uZGlzcGF0Y2goRXZlbnRUeXBlLkNIQU5HRV9BTkksIHsgbmFtZTogXCJCRzNfd2luMlwiLCBsb29wOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUMk0uZGlzcGF0Y2goRXZlbnRUeXBlLlNZTkNfR0FNRV9PVkVSLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1ckFuaSA9IFwiQkczX3dpbjJcIjtcclxuICAgICAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmFuaUxvb3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9vbHMucGxheVNwaW5lKHRoaXMuYmdfYW5pLCBcIkJHM193aW4yXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5HQU1FX09WRVIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgU3luY0RhdGFNYW5hZ2VyLmdldFN5bmNEYXRhKCkuY3VzdG9tU3luY0RhdGEuY3VyQW5pID0gXCJCRzMmNF9sb3N0XCI7XHJcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmFuaUxvb3AgPSBmYWxzZTtcclxuICAgICAgICAgICAgVG9vbHMucGxheVNwaW5lKHRoaXMuYmdfYW5pLCBcIkJHMyY0X2xvc3RcIiwgZmFsc2UsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChOZXRXb3JrLmlzTWFzdGVyIHx8ICFOZXRXb3JrLmlzU3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgIFQyTS5kaXNwYXRjaChFdmVudFR5cGUuQ0hBTkdFX0FOSSwgeyBuYW1lOiBcIkJHMyY0X2xvc3QyXCIsIGxvb3A6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVDJNLmRpc3BhdGNoKEV2ZW50VHlwZS5TWU5DX0dBTUVfT1ZFUiwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBTb3VuZE1hbmFnZXIucGxheUVmZmVjdChTb3VuZENvbmZpZy5zb3VkbGlzdFtcIumVv+S4gOS6m+eahOWksei0pemfs+aViFwiXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChOZXRXb3JrLmlzTWFzdGVyIHx8ICFOZXRXb3JrLmlzU3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUMk0uZGlzcGF0Y2goRXZlbnRUeXBlLkNIQU5HRV9BTkksIHsgbmFtZTogXCJCRzNfd2luMlwiLCBsb29wOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUMk0uZGlzcGF0Y2goRXZlbnRUeXBlLlNZTkNfR0FNRV9PVkVSLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1ckFuaSA9IFwiQkczJjRfbG9zdDJcIjtcclxuICAgICAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmFuaUxvb3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgLy8gVG9vbHMucGxheVNwaW5lKHRoaXMuYmdfYW5pLCBcIkJHMyY0X2xvc3QyXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy8gTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5HQU1FX09WRVIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzeW5jR2FtZU92ZXIoKSB7XHJcbiAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEV2ZW50VHlwZS5HQU1FX09WRVIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25DbGlja1N0YXJ0KCkge1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmlzU3RhcnQgPSB0cnVlO1xyXG4gICAgICAgIFNvdW5kTWFuYWdlci5wbGF5RWZmZWN0KFNvdW5kQ29uZmlnLnNvdWRsaXN0W1wi54K55Ye76Z+z5pWIXCJdLCBmYWxzZSwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmJ0bl9zdGFydC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBTeW5jRGF0YU1hbmFnZXIuZ2V0U3luY0RhdGEoKS5jdXN0b21TeW5jRGF0YS5jdXJBbmkgPSBcIkJHMVwiO1xyXG4gICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmFuaUxvb3AgPSBmYWxzZTtcclxuICAgICAgICBUb29scy5wbGF5U3BpbmUodGhpcy5iZ19hbmksIFwiQkcxXCIsIGZhbHNlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChOZXRXb3JrLmlzTWFzdGVyIHx8ICFOZXRXb3JrLmlzU3luYykge1xyXG4gICAgICAgICAgICAgICAgVDJNLmRpc3BhdGNoKEV2ZW50VHlwZS5DSEFOR0VfQU5JLCB7IG5hbWU6IFwiQkcyXCIsIGxvb3A6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICBUMk0uZGlzcGF0Y2goRXZlbnRUeXBlLlNIT1dfUVVFU1RJT04sIG51bGwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmN1ckFuaSA9IFwiQkcyXCI7XHJcbiAgICAgICAgICAgIFN5bmNEYXRhTWFuYWdlci5nZXRTeW5jRGF0YSgpLmN1c3RvbVN5bmNEYXRhLmFuaUxvb3AgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyBUb29scy5wbGF5U3BpbmUodGhpcy5iZ19hbmksIFwiQkcyXCIsIHRydWUpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLmhhbmRsZVNob3dRdWVzdGlvbigpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaGFuZGxlU2hvd1F1ZXN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25fbm9kZS5nZXRDaGlsZEJ5TmFtZShcInFpZVwiKS54ID0gMzAwO1xyXG4gICAgICAgIGNjLnR3ZWVuKHRoaXMucXVlc3Rpb25fbm9kZSkudG8oMC41LCB7IHk6IHRoaXMucXVlc3Rpb25fbm9kZV9wb3NZIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICBVSUhlbHAuY2xvc2VNYXNrKCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMucXVlc3Rpb25fbm9kZS5nZXRDaGlsZEJ5TmFtZShcInFpZVwiKSkudG8oMC41LCB7IHg6IDQzMCB9KS5zdGFydCgpO1xyXG4gICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgY2MudHdlZW4odGhpcy5vcHRpb25fbm9kZSkudG8oMC41LCB7IHk6IHRoaXMub3B0aW9uX25vZGVfcG9zWSB9KS5zdGFydCgpO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=