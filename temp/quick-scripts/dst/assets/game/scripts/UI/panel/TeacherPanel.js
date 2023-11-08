
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/panel/TeacherPanel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '70c27EBmWdPJYtgMQ9dyPZS', 'TeacherPanel');
// game/scripts/UI/panel/TeacherPanel.ts

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
var FrameMsgType_1 = require("../../../../frame/scripts/Data/FrameMsgType");
var ListenerManager_1 = require("../../../../frame/scripts/Manager/ListenerManager");
var ReportManager_1 = require("../../../../frame/scripts/Manager/ReportManager");
var UIManager_1 = require("../../../../frame/scripts/Manager/UIManager");
var BaseTeacherPanel_1 = require("../../../../frame/scripts/UI/Panel/BaseTeacherPanel");
var UIHelp_1 = require("../../../../frame/scripts/Utils/UIHelp");
var ConstValue_1 = require("../../Data/ConstValue");
var EditorManager_1 = require("../../Manager/EditorManager");
var GamePanel_1 = require("./GamePanel");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TeacherPanel = /** @class */ (function (_super) {
    __extends(TeacherPanel, _super);
    function TeacherPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toggle_stars = null;
        _this.toggle_replay = null;
        _this.toggle_titleAudio = null;
        _this._btn_save = null;
        _this._btn_view = null;
        return _this;
    }
    TeacherPanel.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    TeacherPanel.prototype.start = function () {
        _super.prototype.start.call(this);
        // 可编辑的游戏，不展示保存按钮
        var isEdit = EditorManager_1.EditorManager.isSupportEdit();
        if (this._btn_save) {
            this._btn_save.active = !isEdit;
        }
        // this._btn_save.active = true;
    };
    /**
     * 设置界面（这里已经拿到了网络请求数据）
     */
    TeacherPanel.prototype.setPanel = function () {
        _super.prototype.setPanel.call(this);
        this.toggle_stars.toggleItems[EditorManager_1.EditorManager.editorData.isStarCount ? 0 : 1].isChecked = true;
        this.toggle_replay.toggleItems[EditorManager_1.EditorManager.editorData.isReplay ? 0 : 1].isChecked = true;
        this.toggle_titleAudio.toggleItems[EditorManager_1.EditorManager.editorData.isPlayTitle ? 0 : 1].isChecked = true;
        //先默认设置几题题目
        EditorManager_1.EditorManager.editorData.GameData = [];
        for (var i = 0; i < 4; i++) {
            var gameData = new EditorManager_1.GameData();
            var defaultLevelData = ConstValue_1.ConstValue.defaultLevelData[i];
            gameData.questionText = defaultLevelData.questionText;
            gameData.questionPic = defaultLevelData.questionPic;
            gameData.opinion = defaultLevelData.opinion;
            gameData.answer = defaultLevelData.answer;
            gameData.opinionText1 = defaultLevelData.opinionText1;
            gameData.opinionPic1 = defaultLevelData.opinionPic1;
            gameData.opinionText2 = defaultLevelData.opinionText2;
            gameData.opinionPic2 = defaultLevelData.opinionPic2;
            gameData.opinionText3 = defaultLevelData.opinionText3;
            gameData.opinionPic3 = defaultLevelData.opinionPic3;
            gameData.opinionText4 = defaultLevelData.opinionText4;
            gameData.opinionPic4 = defaultLevelData.opinionPic4;
            gameData.opinionText5 = defaultLevelData.opinionText5;
            gameData.opinionPic5 = defaultLevelData.opinionPic5;
            EditorManager_1.EditorManager.editorData.GameData.push(gameData);
        }
    };
    // 星级评判开关
    TeacherPanel.prototype.onToggleStar = function (toggle) {
        var index = this.toggle_stars.toggleItems.indexOf(toggle);
        EditorManager_1.EditorManager.editorData.isStarCount = 0 === index;
    };
    // 重玩开关
    TeacherPanel.prototype.onToggleReplay = function (toggle) {
        var index = this.toggle_replay.toggleItems.indexOf(toggle);
        EditorManager_1.EditorManager.editorData.isReplay = 0 === index;
    };
    // 自动播放题干语音开关
    TeacherPanel.prototype.onToggleTitleAudio = function (toggle) {
        var index = this.toggle_titleAudio.toggleItems.indexOf(toggle);
        EditorManager_1.EditorManager.editorData.isPlayTitle = 0 === index;
    };
    // 保存课件按钮
    TeacherPanel.prototype.onBtnSaveClicked = function () {
        var isEdit = EditorManager_1.EditorManager.isSupportEdit();
        if (!isEdit || ReportManager_1.ReportManager.isAllOver) {
            UIHelp_1.UIHelp.showSubmissionPanel();
        }
        else {
            UIHelp_1.UIHelp.showTip('请先完成一遍题目');
        }
    };
    // 预览课件按钮
    TeacherPanel.prototype.onBtnViewClicked = function () {
        EditorManager_1.EditorManager.editorData.levelCount = EditorManager_1.EditorManager.editorData.GameData.length;
        if (-1 === EditorManager_1.EditorManager.getCoursewareLevel() ||
            null === EditorManager_1.EditorManager.getCoursewareLevel() ||
            void 0 === EditorManager_1.EditorManager.getCoursewareLevel()) {
            UIHelp_1.UIHelp.showTip('请先设置coursewareLevel');
        }
        else {
            ListenerManager_1.ListenerManager.dispatch(FrameMsgType_1.FrameMsgType.TEACHER_PANEL_LOADING, true);
            UIManager_1.UIManager.showUI(GamePanel_1.default);
        }
    };
    TeacherPanel.className = 'TeacherPanel';
    __decorate([
        property(cc.ToggleContainer)
    ], TeacherPanel.prototype, "toggle_stars", void 0);
    __decorate([
        property(cc.ToggleContainer)
    ], TeacherPanel.prototype, "toggle_replay", void 0);
    __decorate([
        property(cc.ToggleContainer)
    ], TeacherPanel.prototype, "toggle_titleAudio", void 0);
    TeacherPanel = __decorate([
        ccclass
    ], TeacherPanel);
    return TeacherPanel;
}(BaseTeacherPanel_1.default));
exports.default = TeacherPanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXHBhbmVsXFxUZWFjaGVyUGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNEVBQTJFO0FBQzNFLHFGQUFvRjtBQUNwRixpRkFBZ0Y7QUFDaEYseUVBQXdFO0FBQ3hFLHdGQUFtRjtBQUVuRixpRUFBZ0U7QUFDaEUsb0RBQW1EO0FBQ25ELDZEQUFzRTtBQUN0RSx5Q0FBb0M7QUFFOUIsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMEMsZ0NBQWdCO0lBQTFEO1FBQUEscUVBc0dDO1FBbEdXLGtCQUFZLEdBQXVCLElBQUksQ0FBQztRQUV4QyxtQkFBYSxHQUF1QixJQUFJLENBQUM7UUFFekMsdUJBQWlCLEdBQXVCLElBQUksQ0FBQztRQUU3QyxlQUFTLEdBQVksSUFBSSxDQUFDO1FBQzFCLGVBQVMsR0FBWSxJQUFJLENBQUM7O0lBMkZ0QyxDQUFDO0lBekZHLDZCQUFNLEdBQU47UUFDSSxpQkFBTSxNQUFNLFdBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsNEJBQUssR0FBTDtRQUNJLGlCQUFNLEtBQUssV0FBRSxDQUFDO1FBRWQsaUJBQWlCO1FBQ2pCLElBQU0sTUFBTSxHQUFHLDZCQUFhLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDN0MsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO1NBQ25DO1FBQ0QsZ0NBQWdDO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNILCtCQUFRLEdBQVI7UUFDSSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyw2QkFBYSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxD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LENBc0doQztJQUFELG1CQUFDO0NBdEdELEFBc0dDLENBdEd5QywwQkFBZ0IsR0FzR3pEO2tCQXRHb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZyYW1lTXNnVHlwZSB9IGZyb20gJy4uLy4uLy4uLy4uL2ZyYW1lL3NjcmlwdHMvRGF0YS9GcmFtZU1zZ1R5cGUnO1xuaW1wb3J0IHsgTGlzdGVuZXJNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL0xpc3RlbmVyTWFuYWdlcic7XG5pbXBvcnQgeyBSZXBvcnRNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1JlcG9ydE1hbmFnZXInO1xuaW1wb3J0IHsgVUlNYW5hZ2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1VJTWFuYWdlcic7XG5pbXBvcnQgQmFzZVRlYWNoZXJQYW5lbCBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1VJL1BhbmVsL0Jhc2VUZWFjaGVyUGFuZWwnO1xuaW1wb3J0IFN1Ym1pc3Npb25QYW5lbCBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1VJL1BhbmVsL1N1Ym1pc3Npb25QYW5lbCc7XG5pbXBvcnQgeyBVSUhlbHAgfSBmcm9tICcuLi8uLi8uLi8uLi9mcmFtZS9zY3JpcHRzL1V0aWxzL1VJSGVscCc7XG5pbXBvcnQgeyBDb25zdFZhbHVlIH0gZnJvbSAnLi4vLi4vRGF0YS9Db25zdFZhbHVlJztcbmltcG9ydCB7IEVkaXRvck1hbmFnZXIsIEdhbWVEYXRhIH0gZnJvbSAnLi4vLi4vTWFuYWdlci9FZGl0b3JNYW5hZ2VyJztcbmltcG9ydCBHYW1lUGFuZWwgZnJvbSAnLi9HYW1lUGFuZWwnO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVhY2hlclBhbmVsIGV4dGVuZHMgQmFzZVRlYWNoZXJQYW5lbCB7XG4gICAgcHVibGljIHN0YXRpYyBjbGFzc05hbWUgPSAnVGVhY2hlclBhbmVsJztcblxuICAgIEBwcm9wZXJ0eShjYy5Ub2dnbGVDb250YWluZXIpXG4gICAgcHJpdmF0ZSB0b2dnbGVfc3RhcnM6IGNjLlRvZ2dsZUNvbnRhaW5lciA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlRvZ2dsZUNvbnRhaW5lcilcbiAgICBwcml2YXRlIHRvZ2dsZV9yZXBsYXk6IGNjLlRvZ2dsZUNvbnRhaW5lciA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLlRvZ2dsZUNvbnRhaW5lcilcbiAgICBwcml2YXRlIHRvZ2dsZV90aXRsZUF1ZGlvOiBjYy5Ub2dnbGVDb250YWluZXIgPSBudWxsO1xuXG4gICAgcHJpdmF0ZSBfYnRuX3NhdmU6IGNjLk5vZGUgPSBudWxsO1xuICAgIHByaXZhdGUgX2J0bl92aWV3OiBjYy5Ob2RlID0gbnVsbDtcblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgLy8g5Y+v57yW6L6R55qE5ri45oiP77yM5LiN5bGV56S65L+d5a2Y5oyJ6ZKuXG4gICAgICAgIGNvbnN0IGlzRWRpdCA9IEVkaXRvck1hbmFnZXIuaXNTdXBwb3J0RWRpdCgpO1xuICAgICAgICBpZiAodGhpcy5fYnRuX3NhdmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2J0bl9zYXZlLmFjdGl2ZSA9ICFpc0VkaXQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5fYnRuX3NhdmUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7nlYzpnaLvvIjov5nph4zlt7Lnu4/mi7/liLDkuobnvZHnu5zor7fmsYLmlbDmja7vvIlcbiAgICAgKi9cbiAgICBzZXRQYW5lbCgpIHtcbiAgICAgICAgc3VwZXIuc2V0UGFuZWwoKTtcbiAgICAgICAgdGhpcy50b2dnbGVfc3RhcnMudG9nZ2xlSXRlbXNbRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLmlzU3RhckNvdW50ID8gMCA6IDFdLmlzQ2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMudG9nZ2xlX3JlcGxheS50b2dnbGVJdGVtc1tFZGl0b3JNYW5hZ2VyLmVkaXRvckRhdGEuaXNSZXBsYXkgPyAwIDogMV0uaXNDaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50b2dnbGVfdGl0bGVBdWRpby50b2dnbGVJdGVtc1tFZGl0b3JNYW5hZ2VyLmVkaXRvckRhdGEuaXNQbGF5VGl0bGUgPyAwIDogMV0uaXNDaGVja2VkID0gdHJ1ZTtcblxuICAgICAgICAvL+WFiOm7mOiupOiuvue9ruWHoOmimOmimOebrlxuICAgICAgICBFZGl0b3JNYW5hZ2VyLmVkaXRvckRhdGEuR2FtZURhdGEgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIGxldCBnYW1lRGF0YSA9IG5ldyBHYW1lRGF0YSgpO1xuICAgICAgICAgICAgbGV0IGRlZmF1bHRMZXZlbERhdGEgPSBDb25zdFZhbHVlLmRlZmF1bHRMZXZlbERhdGFbaV07XG4gICAgICAgICAgICBnYW1lRGF0YS5xdWVzdGlvblRleHQgPSBkZWZhdWx0TGV2ZWxEYXRhLnF1ZXN0aW9uVGV4dDtcbiAgICAgICAgICAgIGdhbWVEYXRhLnF1ZXN0aW9uUGljID0gZGVmYXVsdExldmVsRGF0YS5xdWVzdGlvblBpYztcbiAgICAgICAgICAgIGdhbWVEYXRhLm9waW5pb24gPSBkZWZhdWx0TGV2ZWxEYXRhLm9waW5pb247XG4gICAgICAgICAgICBnYW1lRGF0YS5hbnN3ZXIgPSBkZWZhdWx0TGV2ZWxEYXRhLmFuc3dlcjtcbiAgICAgICAgICAgIGdhbWVEYXRhLm9waW5pb25UZXh0MSA9IGRlZmF1bHRMZXZlbERhdGEub3BpbmlvblRleHQxO1xuICAgICAgICAgICAgZ2FtZURhdGEub3BpbmlvblBpYzEgPSBkZWZhdWx0TGV2ZWxEYXRhLm9waW5pb25QaWMxO1xuICAgICAgICAgICAgZ2FtZURhdGEub3BpbmlvblRleHQyID0gZGVmYXVsdExldmVsRGF0YS5vcGluaW9uVGV4dDI7XG4gICAgICAgICAgICBnYW1lRGF0YS5vcGluaW9uUGljMiA9IGRlZmF1bHRMZXZlbERhdGEub3BpbmlvblBpYzI7XG4gICAgICAgICAgICBnYW1lRGF0YS5vcGluaW9uVGV4dDMgPSBkZWZhdWx0TGV2ZWxEYXRhLm9waW5pb25UZXh0MztcbiAgICAgICAgICAgIGdhbWVEYXRhLm9waW5pb25QaWMzID0gZGVmYXVsdExldmVsRGF0YS5vcGluaW9uUGljMztcbiAgICAgICAgICAgIGdhbWVEYXRhLm9waW5pb25UZXh0NCA9IGRlZmF1bHRMZXZlbERhdGEub3BpbmlvblRleHQ0O1xuICAgICAgICAgICAgZ2FtZURhdGEub3BpbmlvblBpYzQgPSBkZWZhdWx0TGV2ZWxEYXRhLm9waW5pb25QaWM0O1xuICAgICAgICAgICAgZ2FtZURhdGEub3BpbmlvblRleHQ1ID0gZGVmYXVsdExldmVsRGF0YS5vcGluaW9uVGV4dDU7XG4gICAgICAgICAgICBnYW1lRGF0YS5vcGluaW9uUGljNSA9IGRlZmF1bHRMZXZlbERhdGEub3BpbmlvblBpYzU7XG5cbiAgICAgICAgICAgIEVkaXRvck1hbmFnZXIuZWRpdG9yRGF0YS5HYW1lRGF0YS5wdXNoKGdhbWVEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIOaYn+e6p+ivhOWIpOW8gOWFs1xuICAgIHB1YmxpYyBvblRvZ2dsZVN0YXIodG9nZ2xlOiBjYy5Ub2dnbGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy50b2dnbGVfc3RhcnMudG9nZ2xlSXRlbXMuaW5kZXhPZih0b2dnbGUpO1xuICAgICAgICBFZGl0b3JNYW5hZ2VyLmVkaXRvckRhdGEuaXNTdGFyQ291bnQgPSAwID09PSBpbmRleDtcbiAgICB9XG5cbiAgICAvLyDph43njqnlvIDlhbNcbiAgICBwdWJsaWMgb25Ub2dnbGVSZXBsYXkodG9nZ2xlOiBjYy5Ub2dnbGUpOiB2b2lkIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy50b2dnbGVfcmVwbGF5LnRvZ2dsZUl0ZW1zLmluZGV4T2YodG9nZ2xlKTtcbiAgICAgICAgRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLmlzUmVwbGF5ID0gMCA9PT0gaW5kZXg7XG4gICAgfVxuXG4gICAgLy8g6Ieq5Yqo5pKt5pS+6aKY5bmy6K+t6Z+z5byA5YWzXG4gICAgcHVibGljIG9uVG9nZ2xlVGl0bGVBdWRpbyh0b2dnbGU6IGNjLlRvZ2dsZSk6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnRvZ2dsZV90aXRsZUF1ZGlvLnRvZ2dsZUl0ZW1zLmluZGV4T2YodG9nZ2xlKTtcbiAgICAgICAgRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLmlzUGxheVRpdGxlID0gMCA9PT0gaW5kZXg7XG4gICAgfVxuXG4gICAgLy8g5L+d5a2Y6K++5Lu25oyJ6ZKuXG4gICAgcHVibGljIG9uQnRuU2F2ZUNsaWNrZWQoKSB7XG4gICAgICAgIGNvbnN0IGlzRWRpdCA9IEVkaXRvck1hbmFnZXIuaXNTdXBwb3J0RWRpdCgpO1xuICAgICAgICBpZiAoIWlzRWRpdCB8fCBSZXBvcnRNYW5hZ2VyLmlzQWxsT3Zlcikge1xuICAgICAgICAgICAgVUlIZWxwLnNob3dTdWJtaXNzaW9uUGFuZWwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFVJSGVscC5zaG93VGlwKCfor7flhYjlrozmiJDkuIDpgY3popjnm64nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDpooTop4jor77ku7bmjInpkq5cbiAgICBwdWJsaWMgb25CdG5WaWV3Q2xpY2tlZCgpIHtcbiAgICAgICAgRWRpdG9yTWFuYWdlci5lZGl0b3JEYXRhLmxldmVsQ291bnQgPSBFZGl0b3JNYW5hZ2VyLmVkaXRvckRhdGEuR2FtZURhdGEubGVuZ3RoO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAtMSA9PT0gRWRpdG9yTWFuYWdlci5nZXRDb3Vyc2V3YXJlTGV2ZWwoKSB8fFxuICAgICAgICAgICAgbnVsbCA9PT0gRWRpdG9yTWFuYWdlci5nZXRDb3Vyc2V3YXJlTGV2ZWwoKSB8fFxuICAgICAgICAgICAgdm9pZCAwID09PSBFZGl0b3JNYW5hZ2VyLmdldENvdXJzZXdhcmVMZXZlbCgpXG4gICAgICAgICkge1xuICAgICAgICAgICAgVUlIZWxwLnNob3dUaXAoJ+ivt+WFiOiuvue9rmNvdXJzZXdhcmVMZXZlbCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTGlzdGVuZXJNYW5hZ2VyLmRpc3BhdGNoKEZyYW1lTXNnVHlwZS5URUFDSEVSX1BBTkVMX0xPQURJTkcsIHRydWUpO1xuICAgICAgICAgICAgVUlNYW5hZ2VyLnNob3dVSShHYW1lUGFuZWwpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19