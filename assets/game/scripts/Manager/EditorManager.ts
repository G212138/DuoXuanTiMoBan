/**编辑器数据类 */

/**
 * 编辑器数据，根据游戏自定义内部数据
 */
class EditorData {
    // 是否开启星级评
    public isStarCount: boolean = true;
    // 是否开启再玩一次
    public isReplay: boolean = true;
    // 是否自动播放题干语音
    public isPlayTitle: boolean = true;
    // 可重玩次数
    public replayCount: number = 1;
    // 关卡总数
    public levelCount: number = 1;
    // 总步数
    public stepCount: number = 0;
    // 课件等级 0：幼小  1：小低  2：小高
    public coursewareLevel: number = 2;

    // TODO 自定义数据
    public GameData: GameData[] = [];
}

export class GameData {
    public id :number = 0; //唯一编号，同时根据id的数量，取得题目数量
    public questionText :string = ""; //题干文本，可编辑文字，最多30个字，如果为空就隐藏题干区域；
    public questionPic :string = ""; //中央题版配图，图片文件的分辨率固定；
    public opinion: number = 0; //选项数量，数量为2~5个
    public answer: number = 1; //正确答案1~5，只能为单数，分别从左往右对应；
    public opinionText1: string = ""; //选项1的文本，最多10个字
    public opinionPic1: string = ""; //选项1的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
    public opinionText2: string = ""; //选项2的文本，最多10个字
    public opinionPic2: string = ""; //选项2的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
    public opinionText3: string = ""; //选项3的文本，最多10个字
    public opinionPic3: string = ""; //选项3的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
    public opinionText4: string = ""; //选项4的文本，最多10个字
    public opinionPic4: string = ""; //选项4的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
    public opinionText5: string = ""; //选项5的文本，最多10个字
    public opinionPic5: string = ""; //选项5的图片，总选项的数量会影响分辨率的尺寸，当同时配置了文本和图片时，只显示图片
}

class EditorManagerClass {
    private static _instance: EditorManagerClass;

    static getInstance() {
        if (this._instance == null) {
            this._instance = new EditorManagerClass();
        }
        return this._instance;
    }

    /** 编辑器数据 */
    public editorData: EditorData = new EditorData();

    constructor() {}

    /**
     * 是否支持题目编辑
     */
    public isSupportEdit(): boolean {
        let keys = Object.getOwnPropertyNames(this.editorData);

        return keys.length > 7;
    }

    /**
     * 获取关卡总数
     */
    public getLevelCount() {
        return this.editorData.levelCount;
    }

    /**
     * 设置关卡总数
     */
    public setLevelCount(num: number) {
        this.editorData.levelCount = num;
    }

    /**
     * 获取总步数
     */
    public getStepCount() {
        return this.editorData.stepCount || this.getLevelCount();
    }

    /**
     * 设置总步数
     */
    public setStepCount(num: number) {
        this.editorData.stepCount = num;
    }

    /**
     * 获取课件等级
     * 需要各个游戏根据实际情况设置正确的数值
     * 课件等级 0：幼小  1：小低  2：小高
     */
    public getCoursewareLevel() {
        return this.editorData.coursewareLevel;
    }

    /**
     * 获取编辑器数据
     */
    public getData(): EditorData {
        return this.editorData;
    }

    /**
     * 根据网络请求结果设置编辑器数据
     * @param {EditorData} data
     */
    public setData(data: EditorData) {
        this.editorData = data;
    }
}

export const EditorManager = EditorManagerClass.getInstance();
