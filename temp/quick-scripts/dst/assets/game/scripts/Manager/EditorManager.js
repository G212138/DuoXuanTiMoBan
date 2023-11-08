
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
exports.EditorManager = exports.GameData = void 0;
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
        this.opinion = 0; //选项数量，数量为2~5个
        this.answer = 1; //正确答案1~5，只能为单数，分别从左往右对应；
        this.opinionText1 = ""; //选项1的文本，最多10个字
        this.opinionPic1 = ""; //选项1的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
        this.opinionText2 = ""; //选项2的文本，最多10个字
        this.opinionPic2 = ""; //选项2的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
        this.opinionText3 = ""; //选项3的文本，最多10个字
        this.opinionPic3 = ""; //选项3的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
        this.opinionText4 = ""; //选项4的文本，最多10个字
        this.opinionPic4 = ""; //选项4的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
        this.opinionText5 = ""; //选项5的文本，最多10个字
        this.opinionPic5 = ""; //选项5的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
    }
    return GameData;
}());
exports.GameData = GameData;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcTWFuYWdlclxcRWRpdG9yTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsWUFBWTs7O0FBRVo7O0dBRUc7QUFDSDtJQUFBO1FBQ0ksVUFBVTtRQUNILGdCQUFXLEdBQVksSUFBSSxDQUFDO1FBQ25DLFdBQVc7UUFDSixhQUFRLEdBQVksSUFBSSxDQUFDO1FBQ2hDLGFBQWE7UUFDTixnQkFBVyxHQUFZLElBQUksQ0FBQztRQUNuQyxRQUFRO1FBQ0QsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDL0IsT0FBTztRQUNBLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDOUIsTUFBTTtRQUNDLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDN0Isd0JBQXdCO1FBQ2pCLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBRW5DLGFBQWE7UUFDTixhQUFRLEdBQWUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFBRCxpQkFBQztBQUFELENBbEJBLEFBa0JDLElBQUE7QUFFRDtJQUFBO1FBQ1csT0FBRSxHQUFXLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtRQUN2QyxpQkFBWSxHQUFXLEVBQUUsQ0FBQyxDQUFDLGdDQUFnQztRQUMzRCxnQkFBVyxHQUFXLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQjtRQUM5QyxZQUFPLEdBQVcsQ0FBQyxDQUFDLENBQUMsY0FBYztRQUNuQyxXQUFNLEdBQVcsQ0FBQyxDQUFDLENBQUMseUJBQXlCO1FBQzdDLGlCQUFZLEdBQVcsRUFBRSxDQUFDLENBQUMsZUFBZTtRQUMxQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQyxDQUFDLDJDQUEyQztRQUNyRSxpQkFBWSxHQUFXLEVBQUUsQ0FBQyxDQUFDLGVBQWU7UUFDMUMsZ0JBQVcsR0FBVyxFQUFFLENBQUMsQ0FBQywyQ0FBMkM7UUFDckUsaUJBQVksR0FBVyxFQUFFLENBQUMsQ0FBQyxlQUFlO1FBQzFDLGdCQUFXLEdBQVcsRUFBRSxDQUFDLENBQUMsMkNBQTJDO1FBQ3JFLGlCQUFZLEdBQVcsRUFBRSxDQUFDLENBQUMsZUFBZTtRQUMxQyxnQkFBVyxHQUFXLEVBQUUsQ0FBQyxDQUFDLDJDQUEyQztRQUNyRSxpQkFBWSxHQUFXLEVBQUUsQ0FBQyxDQUFDLGVBQWU7UUFDMUMsZ0JBQVcsR0FBVyxFQUFFLENBQUMsQ0FBQywyQ0FBMkM7SUFDaEYsQ0FBQztJQUFELGVBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBO0FBaEJZLDRCQUFRO0FBa0JyQjtJQWFJO1FBSEEsWUFBWTtRQUNMLGVBQVUsR0FBZSxJQUFJLFVBQVUsRUFBRSxDQUFDO0lBRWxDLENBQUM7SUFWVCw4QkFBVyxHQUFsQjtRQUNJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQU9EOztPQUVHO0lBQ0ksMENBQWEsR0FBcEI7UUFDSSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXZELE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0ksMENBQWEsR0FBcEI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLDBDQUFhLEdBQXBCLFVBQXFCLEdBQVc7UUFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7T0FFRztJQUNJLHlDQUFZLEdBQW5CO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0QsQ0FBQztJQUVEOztPQUVHO0lBQ0kseUNBQVksR0FBbkIsVUFBb0IsR0FBVztRQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSwrQ0FBa0IsR0FBekI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNJLG9DQUFPLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7T0FHRztJQUNJLG9DQUFPLEdBQWQsVUFBZSxJQUFnQjtRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ0wseUJBQUM7QUFBRCxDQTNFQSxBQTJFQyxJQUFBO0FBRVksUUFBQSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvKirnvJbovpHlmajmlbDmja7nsbsgKi9cblxuLyoqXG4gKiDnvJbovpHlmajmlbDmja7vvIzmoLnmja7muLjmiI/oh6rlrprkuYnlhoXpg6jmlbDmja5cbiAqL1xuY2xhc3MgRWRpdG9yRGF0YSB7XG4gICAgLy8g5piv5ZCm5byA5ZCv5pif57qn6K+EXG4gICAgcHVibGljIGlzU3RhckNvdW50OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvLyDmmK/lkKblvIDlkK/lho3njqnkuIDmrKFcbiAgICBwdWJsaWMgaXNSZXBsYXk6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8vIOaYr+WQpuiHquWKqOaSreaUvumimOW5suivremfs1xuICAgIHB1YmxpYyBpc1BsYXlUaXRsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgLy8g5Y+v6YeN546p5qyh5pWwXG4gICAgcHVibGljIHJlcGxheUNvdW50OiBudW1iZXIgPSAxO1xuICAgIC8vIOWFs+WNoeaAu+aVsFxuICAgIHB1YmxpYyBsZXZlbENvdW50OiBudW1iZXIgPSAxO1xuICAgIC8vIOaAu+atpeaVsFxuICAgIHB1YmxpYyBzdGVwQ291bnQ6IG51bWJlciA9IDA7XG4gICAgLy8g6K++5Lu2562J57qnIDDvvJrlubzlsI8gIDHvvJrlsI/kvY4gIDLvvJrlsI/pq5hcbiAgICBwdWJsaWMgY291cnNld2FyZUxldmVsOiBudW1iZXIgPSAyO1xuXG4gICAgLy8gVE9ETyDoh6rlrprkuYnmlbDmja5cbiAgICBwdWJsaWMgR2FtZURhdGE6IEdhbWVEYXRhW10gPSBbXTtcbn1cblxuZXhwb3J0IGNsYXNzIEdhbWVEYXRhIHtcbiAgICBwdWJsaWMgaWQgOm51bWJlciA9IDA7IC8v5ZSv5LiA57yW5Y+377yM5ZCM5pe25qC55o2uaWTnmoTmlbDph4/vvIzlj5blvpfpopjnm67mlbDph49cbiAgICBwdWJsaWMgcXVlc3Rpb25UZXh0IDpzdHJpbmcgPSBcIlwiOyAvL+mimOW5suaWh+acrO+8jOWPr+e8lui+keaWh+Wtl++8jOacgOWkmjMw5Liq5a2X77yM5aaC5p6c5Li656m65bCx6ZqQ6JeP6aKY5bmy5Yy65Z+f77ybXG4gICAgcHVibGljIHF1ZXN0aW9uUGljIDpzdHJpbmcgPSBcIlwiOyAvL+S4reWkrumimOeJiOmFjeWbvu+8jOWbvueJh+aWh+S7tueahOWIhui+qOeOh+WbuuWumu+8m1xuICAgIHB1YmxpYyBvcGluaW9uOiBudW1iZXIgPSAwOyAvL+mAiemhueaVsOmHj++8jOaVsOmHj+S4ujJ+NeS4qlxuICAgIHB1YmxpYyBhbnN3ZXI6IG51bWJlciA9IDE7IC8v5q2j56Gu562U5qGIMX4177yM5Y+q6IO95Li65Y2V5pWw77yM5YiG5Yir5LuO5bem5b6A5Y+z5a+55bqU77ybXG4gICAgcHVibGljIG9waW5pb25UZXh0MTogc3RyaW5nID0gXCJcIjsgLy/pgInpobkx55qE5paH5pys77yM5pyA5aSaMTDkuKrlrZdcbiAgICBwdWJsaWMgb3BpbmlvblBpYzE6IHN0cmluZyA9IFwiXCI7IC8v6YCJ6aG5MeeahOWbvueJh++8jOaAu+mAiemhueeahOaVsOmHj+S8muW9seWTjeWIhui+qOeOh+eahOWwuuWvuO+8jOW9k+WQjOaXtumFjee9ruS6huaWh+acrOWSjOWbvueJh+aXtu+8jOWPquaYvuekuuWbvueJh1xuICAgIHB1YmxpYyBvcGluaW9uVGV4dDI6IHN0cmluZyA9IFwiXCI7IC8v6YCJ6aG5MueahOaWh+acrO+8jOacgOWkmjEw5Liq5a2XXG4gICAgcHVibGljIG9waW5pb25QaWMyOiBzdHJpbmcgPSBcIlwiOyAvL+mAiemhuTLnmoTlm77niYfvvIzmgLvpgInpobnnmoTmlbDph4/kvJrlvbHlk43liIbovqjnjofnmoTlsLrlr7jvvIzlvZPlkIzml7bphY3nva7kuobmlofmnKzlkozlm77niYfml7bvvIzlj6rmmL7npLrlm77niYdcbiAgICBwdWJsaWMgb3BpbmlvblRleHQzOiBzdHJpbmcgPSBcIlwiOyAvL+mAiemhuTPnmoTmlofmnKzvvIzmnIDlpJoxMOS4quWtl1xuICAgIHB1YmxpYyBvcGluaW9uUGljMzogc3RyaW5nID0gXCJcIjsgLy/pgInpobkz55qE5Zu+54mH77yM5oC76YCJ6aG555qE5pWw6YeP5Lya5b2x5ZON5YiG6L6o546H55qE5bC65a+477yM5b2T5ZCM5pe26YWN572u5LqG5paH5pys5ZKM5Zu+54mH5pe277yM5Y+q5pi+56S65Zu+54mHXG4gICAgcHVibGljIG9waW5pb25UZXh0NDogc3RyaW5nID0gXCJcIjsgLy/pgInpobk055qE5paH5pys77yM5pyA5aSaMTDkuKrlrZdcbiAgICBwdWJsaWMgb3BpbmlvblBpYzQ6IHN0cmluZyA9IFwiXCI7IC8v6YCJ6aG5NOeahOWbvueJh++8jOaAu+mAiemhueeahOaVsOmHj+S8muW9seWTjeWIhui+qOeOh+eahOWwuuWvuO+8jOW9k+WQjOaXtumFjee9ruS6huaWh+acrOWSjOWbvueJh+aXtu+8jOWPquaYvuekuuWbvueJh1xuICAgIHB1YmxpYyBvcGluaW9uVGV4dDU6IHN0cmluZyA9IFwiXCI7IC8v6YCJ6aG5NeeahOaWh+acrO+8jOacgOWkmjEw5Liq5a2XXG4gICAgcHVibGljIG9waW5pb25QaWM1OiBzdHJpbmcgPSBcIlwiOyAvL+mAiemhuTXnmoTlm77niYfvvIzmgLvpgInpobnnmoTmlbDph4/kvJrlvbHlk43liIbovqjnjofnmoTlsLrlr7jvvIzlvZPlkIzml7bphY3nva7kuobmlofmnKzlkozlm77niYfml7bvvIzlj6rmmL7npLrlm77niYdcbn1cblxuY2xhc3MgRWRpdG9yTWFuYWdlckNsYXNzIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEVkaXRvck1hbmFnZXJDbGFzcztcblxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IEVkaXRvck1hbmFnZXJDbGFzcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvKiog57yW6L6R5Zmo5pWw5o2uICovXG4gICAgcHVibGljIGVkaXRvckRhdGE6IEVkaXRvckRhdGEgPSBuZXcgRWRpdG9yRGF0YSgpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICog5piv5ZCm5pSv5oyB6aKY55uu57yW6L6RXG4gICAgICovXG4gICAgcHVibGljIGlzU3VwcG9ydEVkaXQoKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5lZGl0b3JEYXRhKTtcblxuICAgICAgICByZXR1cm4ga2V5cy5sZW5ndGggPiA3O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWFs+WNoeaAu+aVsFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRMZXZlbENvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3JEYXRhLmxldmVsQ291bnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5YWz5Y2h5oC75pWwXG4gICAgICovXG4gICAgcHVibGljIHNldExldmVsQ291bnQobnVtOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5lZGl0b3JEYXRhLmxldmVsQ291bnQgPSBudW07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W5oC75q2l5pWwXG4gICAgICovXG4gICAgcHVibGljIGdldFN0ZXBDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yRGF0YS5zdGVwQ291bnQgfHwgdGhpcy5nZXRMZXZlbENvdW50KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u5oC75q2l5pWwXG4gICAgICovXG4gICAgcHVibGljIHNldFN0ZXBDb3VudChudW06IG51bWJlcikge1xuICAgICAgICB0aGlzLmVkaXRvckRhdGEuc3RlcENvdW50ID0gbnVtO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOiOt+WPluivvuS7tuetiee6p1xuICAgICAqIOmcgOimgeWQhOS4qua4uOaIj+agueaNruWunumZheaDheWGteiuvue9ruato+ehrueahOaVsOWAvFxuICAgICAqIOivvuS7tuetiee6pyAw77ya5bm85bCPICAx77ya5bCP5L2OICAy77ya5bCP6auYXG4gICAgICovXG4gICAgcHVibGljIGdldENvdXJzZXdhcmVMZXZlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yRGF0YS5jb3Vyc2V3YXJlTGV2ZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+W57yW6L6R5Zmo5pWw5o2uXG4gICAgICovXG4gICAgcHVibGljIGdldERhdGEoKTogRWRpdG9yRGF0YSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvckRhdGE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog5qC55o2u572R57uc6K+35rGC57uT5p6c6K6+572u57yW6L6R5Zmo5pWw5o2uXG4gICAgICogQHBhcmFtIHtFZGl0b3JEYXRhfSBkYXRhXG4gICAgICovXG4gICAgcHVibGljIHNldERhdGEoZGF0YTogRWRpdG9yRGF0YSkge1xuICAgICAgICB0aGlzLmVkaXRvckRhdGEgPSBkYXRhO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IEVkaXRvck1hbmFnZXIgPSBFZGl0b3JNYW5hZ2VyQ2xhc3MuZ2V0SW5zdGFuY2UoKTtcbiJdfQ==