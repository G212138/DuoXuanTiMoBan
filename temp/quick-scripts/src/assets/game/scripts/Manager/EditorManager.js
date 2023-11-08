"use strict";
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