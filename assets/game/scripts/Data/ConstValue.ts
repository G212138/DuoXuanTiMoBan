export class ConstValue {
    public static readonly IS_EDITIONS = true; //是否为发布版本，用于数据上报 及 log输出控制
    public static readonly IS_TEACHER = true; //是否为教师端版本
    public static readonly CoursewareKey = 'DanXuanMoBan_7ns2Eh3K6s2NB8'; //每个课件唯一的key 工程名+14位随机字符串。（脚本创建工程时自动生成）
    public static readonly GameName = '2023_小高寒_单选题模板'; //游戏名中文描述，用于数据上报  （脚本创建工程时输入）
    public static readonly Subject = 1; //学科（1理科 2语文 3英语）

    public static readonly defaultLevelData = [
        {
            id: 0,
            questionText: "测试题1：下面哪些是单数?",
            questionPic: "",
            opinion: 8,
            answer: [1,3,5,7],
            opinionPara:[
                {
                    opinionText: "1",
                    opinionPic: "",
                },
                {
                    opinionText: "2",
                    opinionPic: "",
                },
                {
                    opinionText: "3",
                    opinionPic: "",
                },
                {
                    opinionText: "4",
                    opinionPic: "",
                },
                {
                    opinionText: "5",
                    opinionPic: "",
                },
                {
                    opinionText: "6",
                    opinionPic: "",
                },
                {
                    opinionText: "7",
                    opinionPic: "",
                },
                {
                    opinionText: "8",
                    opinionPic: "",
                },
            ]
        },
        {
            id: 1,
            questionText: "测试题2：下面哪些是图片?",
            questionPic: "btn-hou2",
            opinion: 4,
            answer: [1,3],
            opinionPara:[
                {
                    opinionText: "1",
                    opinionPic: "img_xiangpi",
                },
                {
                    opinionText: "2",
                    opinionPic: "",
                },
                {
                    opinionText: "3",
                    opinionPic: "img_fnagdajing",
                },
                {
                    opinionText: "4",
                    opinionPic: "",
                }
            ]
        }
    ]
}
