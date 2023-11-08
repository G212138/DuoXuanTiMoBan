export class ConstValue {
    public static readonly IS_EDITIONS = true; //是否为发布版本，用于数据上报 及 log输出控制
    public static readonly IS_TEACHER = true; //是否为教师端版本
    public static readonly CoursewareKey = 'DanXuanMoBan_7ns2Eh3K6s2NB8'; //每个课件唯一的key 工程名+14位随机字符串。（脚本创建工程时自动生成）
    public static readonly GameName = '2023_小高寒_单选题模板'; //游戏名中文描述，用于数据上报  （脚本创建工程时输入）
    public static readonly Subject = 1; //学科（1理科 2语文 3英语）

    public static readonly defaultLevelData = [
        {
            questionText: "以下哪位是唐朝诗人?",
            questionPic: "",
            opinion: 4,
            answer: 4,
            opinionText1: "屈原",
            opinionPic1: "",
            opinionText2: "李伯",
            opinionPic2: "",
            opinionText3: "唐国强",
            opinionPic3: "",
            opinionText4: "骆宾王",
            opinionPic4: "",
            opinionText5: "",
            opinionPic5: "",
        },
        {
            questionText: "在课堂里学习30秒,就等于在现实中过了半分钟。",
            questionPic: "",
            opinion: 2,
            answer: 2,
            opinionText1: "错",
            opinionPic1: "",
            opinionText2: "对",
            opinionPic2: "",
            opinionText3: "",
            opinionPic3: "",
            opinionText4: "",
            opinionPic4: "",
            opinionText5: "",
            opinionPic5: "",
        },
        {
            questionText: "Ledu let me happy (    )",
            questionPic: "",
            opinion: 4,
            answer: 3,
            opinionText1: "playing",
            opinionPic1: "",
            opinionText2: "reading",
            opinionPic2: "",
            opinionText3: "studying",
            opinionPic3: "",
            opinionText4: "sleeping",
            opinionPic4: "",
            opinionText5: "",
            opinionPic5: "",
        },
        {
            questionText: "在组织幼儿认识形状时,李老师说:“请小朋友找找教室里有圆形和正方形的物品。”李老师的做法体现了幼儿教育特点的(   )",
            questionPic: "",
            opinion: 4,
            answer: 4,
            opinionText1: "基础性",
            opinionPic1: "",
            opinionText2: "整体性",
            opinionPic2: "",
            opinionText3: "浅显性",
            opinionPic3: "",
            opinionText4: "生活性",
            opinionPic4: "",
            opinionText5: "",
            opinionPic5: "",
        },
    ]
}
