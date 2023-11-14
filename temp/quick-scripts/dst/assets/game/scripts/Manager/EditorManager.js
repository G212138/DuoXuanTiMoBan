
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/Manager/EditorManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '64363RgvXdCJJdpexRQv89P', 'EditorManager');
// game/scripts/Manager/EditorManager.ts

"use strict";
/**编辑器数据类 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorManager = exports.opinionPara = exports.GameData = void 0;
/**
 * 编辑器数据，根据游戏自定义内部数据
 */
var EditorData = /** @class */ (function () {
    function EditorData() {
        // 是否开启星级评
        this.isStarCount = true;
        // 是否开启再玩一次
        this.isReplay = true;
        // 是否自动播放题干语音
        this.isPlayTitle = true;
        // 可重玩次数
        this.replayCount = 1;
        // 关卡总数
        this.levelCount = 1;
        // 总步数
        this.stepCount = 0;
        // 课件等级 0：幼小  1：小低  2：小高
        this.coursewareLevel = 2;
        // TODO 自定义数据
        this.GameData = [];
    }
    return EditorData;
}());
var GameData = /** @class */ (function () {
    function GameData() {
        this.id = 0; //唯一编号，同时根据id的数量，取得题目数量
        this.questionText = ""; //题干文本，可编辑文字，最多30个字，如果为空就隐藏题干区域；
        this.questionPic = ""; //中央题版配图，图片文件的分辨率固定；
        this.opinion = 0; //选项数量，数量为2~8个
        this.answerId = []; //正确答案的id；
        this.answer = []; //多个正确答案的id；
    }
    return GameData;
}());
exports.GameData = GameData;
var opinionPara = /** @class */ (function () {
    function opinionPara() {
        this.id = 0; //选项id
        this.opinionText = ""; //选项的文本，最多10个字；
        this.opinionPic = ""; //选项的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片；
    }
    return opinionPara;
}());
exports.opinionPara = opinionPara;
var EditorManagerClass = /** @class */ (function () {
    function EditorManagerClass() {
        /** 编辑器数据 */
        this.editorData = new EditorData();
    }
    EditorManagerClass.getInstance = function () {
        if (this._instance == null) {
            this._instance = new EditorManagerClass();
        }
        return this._instance;
    };
    /**
     * 是否支持题目编辑
     */
    EditorManagerClass.prototype.isSupportEdit = function () {
        var keys = Object.getOwnPropertyNames(this.editorData);
        return keys.length > 7;
    };
    /**
     * 获取关卡总数
     */
    EditorManagerClass.prototype.getLevelCount = function () {
        return this.editorData.levelCount;
    };
    /**
     * 设置关卡总数
     */
    EditorManagerClass.prototype.setLevelCount = function (num) {
        this.editorData.levelCount = num;
    };
    /**
     * 获取总步数
     */
    EditorManagerClass.prototype.getStepCount = function () {
        return this.editorData.stepCount || this.getLevelCount();
    };
    /**
     * 设置总步数
     */
    EditorManagerClass.prototype.setStepCount = function (num) {
        this.editorData.stepCount = num;
    };
    /**
     * 获取课件等级
     * 需要各个游戏根据实际情况设置正确的数值
     * 课件等级 0：幼小  1：小低  2：小高
     */
    EditorManagerClass.prototype.getCoursewareLevel = function () {
        return this.editorData.coursewareLevel;
    };
    /**
     * 获取编辑器数据
     */
    EditorManagerClass.prototype.getData = function () {
        return this.editorData;
    };
    /**
     * 根据网络请求结果设置编辑器数据
     * @param {EditorData} data
     */
    EditorManagerClass.prototype.setData = function (data) {
        this.editorData = data;
    };
    return EditorManagerClass;
}());
exports.EditorManager = EditorManagerClass.getInstance();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcTWFuYWdlclxcRWRpdG9yTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsWUFBWTs7O0FBRVo7O0dBRUc7QUFDSDtJQUFBO1FBQ0ksVUFBVTtRQUNILGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQ25DLFdBQVc7UUFDSixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGFBQWE7UUFDTixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUNuQyxRQUFRO1FBQ0QsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDL0IsT0FBTztRQUNBLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDOUIsTUFBTTtRQUNDLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDN0Isd0JBQXdCO1FBQ2pCLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBRW5DLGFBQWE7UUFDTixhQUFRLEdBQWUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFBRCxpQkFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFFRDtJQUFBO1FBQ1csT0FBRSxHQUFXLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtRQUN2QyxpQkFBWSxHQUFXLEVBQUUsQ0FBQyxDQUFDLGdDQUFnQztRQUMzRCxnQkFBVyxHQUFXLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQjtRQUM5QyxZQUFPLEdBQVcsQ0FBQyxDQUFDLENBQUMsY0FBYztRQUNuQyxhQUFRLEdBQWEsRUFBRSxDQUFDLENBQUMsVUFBVTtRQUNuQyxXQUFNLEdBQWtCLEVBQUUsQ0FBQyxDQUFDLFlBQVk7SUFDbkQsQ0FBQztJQUFELGVBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQVBZLDRCQUFRO0FBU3JCO0lBQUE7UUFDVyxPQUFFLEdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUN0QixnQkFBVyxHQUFZLEVBQUUsQ0FBQyxDQUFDLGVBQWU7UUFDMUMsZUFBVSxHQUFZLEVBQUUsQ0FBQyxDQUFDLDJDQUEyQztJQUNoRixDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLGtDQUFXO0FBTXhCO0lBYUk7UUFIQSxZQUFZO1FBQ0wsZUFBVSxHQUFlLElBQUksVUFBVSxFQUFFLENBQUM7SUFFbEMsQ0FBQztJQVZULDhCQUFXLEdBQWxCO1FBQ0ksSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztTQUM3QztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBT0Q7O09BRUc7SUFDSSwwQ0FBYSxHQUFwQjtRQUNJLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdkQsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSSwwQ0FBYSxHQUFwQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDdEMsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMENBQWEsR0FBcEIsVUFBcUIsR0FBVztRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7SUFDckMsQ0FBQztJQUVEOztPQUVHO0lBQ0kseUNBQVksR0FBbkI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7O09BRUc7SUFDSSx5Q0FBWSxHQUFuQixVQUFvQixHQUFXO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLCtDQUFrQixHQUF6QjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0ksb0NBQU8sR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksb0NBQU8sR0FBZCxVQUFlLElBQWdCO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFDTCx5QkFBQztBQUFELENBM0VBLEFBMkVDLElBQUE7QUFFWSxRQUFBLGFBQWEsR0FBRyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8qKue8lui+keWZqOaVsOaNruexuyAqL1xuXG4vKipcbiAqIOe8lui+keWZqOaVsOaNru+8jOagueaNrua4uOaIj+iHquWumuS5ieWGhemDqOaVsOaNrlxuICovXG5jbGFzcyBFZGl0b3JEYXRhIHtcbiAgICAvLyDmmK/lkKblvIDlkK/mmJ/nuqfor4RcbiAgICBwdWJsaWMgaXNTdGFyQ291bnQ6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8vIOaYr+WQpuW8gOWQr+WGjeeOqeS4gOasoVxuICAgIHB1YmxpYyBpc1JlcGxheTogYm9vbGVhbiA9IHRydWU7XG4gICAgLy8g5piv5ZCm6Ieq5Yqo5pKt5pS+6aKY5bmy6K+t6Z+zXG4gICAgcHVibGljIGlzUGxheVRpdGxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvLyDlj6/ph43njqnmrKHmlbBcbiAgICBwdWJsaWMgcmVwbGF5Q291bnQ6IG51bWJlciA9IDE7XG4gICAgLy8g5YWz5Y2h5oC75pWwXG4gICAgcHVibGljIGxldmVsQ291bnQ6IG51bWJlciA9IDE7XG4gICAgLy8g5oC75q2l5pWwXG4gICAgcHVibGljIHN0ZXBDb3VudDogbnVtYmVyID0gMDtcbiAgICAvLyDor77ku7bnrYnnuqcgMO+8muW5vOWwjyAgMe+8muWwj+S9jiAgMu+8muWwj+mrmFxuICAgIHB1YmxpYyBjb3Vyc2V3YXJlTGV2ZWw6IG51bWJlciA9IDI7XG5cbiAgICAvLyBUT0RPIOiHquWumuS5ieaVsOaNrlxuICAgIHB1YmxpYyBHYW1lRGF0YTogR2FtZURhdGFbXSA9IFtdO1xufVxuXG5leHBvcnQgY2xhc3MgR2FtZURhdGEge1xuICAgIHB1YmxpYyBpZCA6bnVtYmVyID0gMDsgLy/llK/kuIDnvJblj7fvvIzlkIzml7bmoLnmja5pZOeahOaVsOmHj++8jOWPluW+l+mimOebruaVsOmHj1xuICAgIHB1YmxpYyBxdWVzdGlvblRleHQgOnN0cmluZyA9IFwiXCI7IC8v6aKY5bmy5paH5pys77yM5Y+v57yW6L6R5paH5a2X77yM5pyA5aSaMzDkuKrlrZfvvIzlpoLmnpzkuLrnqbrlsLHpmpDol4/popjlubLljLrln5/vvJtcbiAgICBwdWJsaWMgcXVlc3Rpb25QaWMgOnN0cmluZyA9IFwiXCI7IC8v5Lit5aSu6aKY54mI6YWN5Zu+77yM5Zu+54mH5paH5Lu255qE5YiG6L6o546H5Zu65a6a77ybXG4gICAgcHVibGljIG9waW5pb246IG51bWJlciA9IDA7IC8v6YCJ6aG55pWw6YeP77yM5pWw6YeP5Li6Mn445LiqXG4gICAgcHVibGljIGFuc3dlcklkOiBudW1iZXJbXSA9IFtdOyAvL+ato+ehruetlOahiOeahGlk77ybXG4gICAgcHVibGljIGFuc3dlcjogb3BpbmlvblBhcmFbXSA9IFtdOyAvL+WkmuS4quato+ehruetlOahiOeahGlk77ybXG59XG5cbmV4cG9ydCBjbGFzcyBvcGluaW9uUGFyYSB7XG4gICAgcHVibGljIGlkIDpudW1iZXIgPSAwOyAvL+mAiemhuWlkXG4gICAgcHVibGljIG9waW5pb25UZXh0IDogc3RyaW5nID0gXCJcIjsgLy/pgInpobnnmoTmlofmnKzvvIzmnIDlpJoxMOS4quWtl++8m1xuICAgIHB1YmxpYyBvcGluaW9uUGljIDogc3RyaW5nID0gXCJcIjsgLy/pgInpobnnmoTlm77niYfvvIzmgLvpgInpobnnmoTmlbDph4/kvJrlvbHlk43liIbovqjnjofnmoTlsLrlr7jvvIzlvZPlkIzml7bphY3nva7kuobmlofmnKzlkozlm77niYfml7bvvIzlj6rmmL7npLrlm77niYfvvJtcbn1cblxuY2xhc3MgRWRpdG9yTWFuYWdlckNsYXNzIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEVkaXRvck1hbmFnZXJDbGFzcztcblxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IEVkaXRvck1hbmFnZXJDbGFzcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvKiog57yW6L6R5Zmo5pWw5o2uICovXG4gICAgcHVibGljIGVkaXRvckRhdGE6IEVkaXRvckRhdGEgPSBuZXcgRWRpdG9yRGF0YSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5pSv5oyB6aKY55uu57yW6L6RXG4gICAgICovXG4gICAgcHVibGljIGlzU3VwcG9ydEVkaXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5lZGl0b3JEYXRhKTtcblxuICAgICAgICByZXR1cm4ga2V5cy5sZW5ndGggPiA3O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWFs+WNoeaAu+aVsFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRMZXZlbENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3JEYXRhLmxldmVsQ291bnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5YWz5Y2h5oC75pWwXG4gICAgICovXG4gICAgcHVibGljIHNldExldmVsQ291bnQobnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lZGl0b3JEYXRhLmxldmVsQ291bnQgPSBudW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5oC75q2l5pWwXG4gICAgICovXG4gICAgcHVibGljIGdldFN0ZXBDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yRGF0YS5zdGVwQ291bnQgfHwgdGhpcy5nZXRMZXZlbENvdW50KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5oC75q2l5pWwXG4gICAgICovXG4gICAgcHVibGljIHNldFN0ZXBDb3VudChudW06IG51bWJlcikge1xuICAgICAgICB0aGlzLmVkaXRvckRhdGEuc3RlcENvdW50ID0gbnVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluivvuS7tuetiee6p1xuICAgICAqIOmcgOimgeWQhOS4qua4uOaIj+agueaNruWunumZheaDheWGteiuvue9ruato+ehrueahOaVsOWAvFxuICAgICAqIOivvuS7tuetiee6pyAw77ya5bm85bCPICAx77ya5bCP5L2OICAy77ya5bCP6auYXG4gICAgICovXG4gICAgcHVibGljIGdldENvdXJzZXdhcmVMZXZlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yRGF0YS5jb3Vyc2V3YXJlTGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W57yW6L6R5Zmo5pWw5o2uXG4gICAgICovXG4gICAgcHVibGljIGdldERhdGEoKTogRWRpdG9yRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvckRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qC55o2u572R57uc6K+35rGC57uT5p6c6K6+572u57yW6L6R5Zmo5pWw5o2uXG4gICAgICogQHBhcmFtIHtFZGl0b3JEYXRhfSBkYXRhXG4gICAgICovXG4gICAgcHVibGljIHNldERhdGEoZGF0YTogRWRpdG9yRGF0YSkge1xuICAgICAgICB0aGlzLmVkaXRvckRhdGEgPSBkYXRhO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IEVkaXRvck1hbmFnZXIgPSBFZGl0b3JNYW5hZ2VyQ2xhc3MuZ2V0SW5zdGFuY2UoKTtcbiJdfQ==