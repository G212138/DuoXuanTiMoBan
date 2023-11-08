
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/Data/ConstValue.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'b2ee0BC2l1Pp47nuM279OIO', 'ConstValue');
// game/scripts/Data/ConstValue.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstValue = void 0;
var ConstValue = /** @class */ (function () {
    function ConstValue() {
    }
    ConstValue.IS_EDITIONS = true; //是否为发布版本，用于数据上报 及 log输出控制
    ConstValue.IS_TEACHER = true; //是否为教师端版本
    ConstValue.CoursewareKey = 'DanXuanMoBan_7ns2Eh3K6s2NB8'; //每个课件唯一的key 工程名+14位随机字符串。（脚本创建工程时自动生成）
    ConstValue.GameName = '2023_小高寒_单选题模板'; //游戏名中文描述，用于数据上报  （脚本创建工程时输入）
    ConstValue.Subject = 1; //学科（1理科 2语文 3英语）
    ConstValue.defaultLevelData = [
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
    ];
    return ConstValue;
}());
exports.ConstValue = ConstValue;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcRGF0YVxcQ29uc3RWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBeUVBLENBQUM7SUF4RTBCLHNCQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsMEJBQTBCO0lBQzlDLHFCQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVTtJQUM3Qix3QkFBYSxHQUFHLDZCQUE2QixDQUFDLENBQUMsdUNBQXVDO0lBQ3RGLG1CQUFRLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyw2QkFBNkI7SUFDMUQsa0JBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7SUFFOUIsMkJBQWdCLEdBQUc7UUFDdEM7WUFDSSxZQUFZLEVBQUUsWUFBWTtZQUMxQixXQUFXLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxDQUFDO1lBQ1YsTUFBTSxFQUFFLENBQUM7WUFDVCxZQUFZLEVBQUUsSUFBSTtZQUNsQixXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEtBQUs7WUFDbkIsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsS0FBSztZQUNuQixXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1NBQ2xCO1FBQ0Q7WUFDSSxZQUFZLEVBQUUseUJBQXlCO1lBQ3ZDLFdBQVcsRUFBRSxFQUFFO1lBQ2YsT0FBTyxFQUFFLENBQUM7WUFDVixNQUFNLEVBQUUsQ0FBQztZQUNULFlBQVksRUFBRSxHQUFHO1lBQ2pCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEdBQUc7WUFDakIsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEVBQUU7WUFDaEIsV0FBVyxFQUFFLEVBQUU7U0FDbEI7UUFDRDtZQUNJLFlBQVksRUFBRSwwQkFBMEI7WUFDeEMsV0FBVyxFQUFFLEVBQUU7WUFDZixPQUFPLEVBQUUsQ0FBQztZQUNWLE1BQU0sRUFBRSxDQUFDO1lBQ1QsWUFBWSxFQUFFLFNBQVM7WUFDdkIsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsU0FBUztZQUN2QixXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxVQUFVO1lBQ3hCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLFVBQVU7WUFDeEIsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsRUFBRTtZQUNoQixXQUFXLEVBQUUsRUFBRTtTQUNsQjtRQUNEO1lBQ0ksWUFBWSxFQUFFLDZEQUE2RDtZQUMzRSxXQUFXLEVBQUUsRUFBRTtZQUNmLE9BQU8sRUFBRSxDQUFDO1lBQ1YsTUFBTSxFQUFFLENBQUM7WUFDVCxZQUFZLEVBQUUsS0FBSztZQUNuQixXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxLQUFLO1lBQ25CLFdBQVcsRUFBRSxFQUFFO1lBQ2YsWUFBWSxFQUFFLEtBQUs7WUFDbkIsV0FBVyxFQUFFLEVBQUU7WUFDZixZQUFZLEVBQUUsS0FBSztZQUNuQixXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFdBQVcsRUFBRSxFQUFFO1NBQ2xCO0tBQ0osQ0FBQTtJQUNMLGlCQUFDO0NBekVELEFBeUVDLElBQUE7QUF6RVksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ29uc3RWYWx1ZSB7XG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBJU19FRElUSU9OUyA9IHRydWU7IC8v5piv5ZCm5Li65Y+R5biD54mI5pys77yM55So5LqO5pWw5o2u5LiK5oqlIOWPiiBsb2fovpPlh7rmjqfliLZcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IElTX1RFQUNIRVIgPSB0cnVlOyAvL+aYr+WQpuS4uuaVmeW4iOerr+eJiOacrFxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgQ291cnNld2FyZUtleSA9ICdEYW5YdWFuTW9CYW5fN25zMkVoM0s2czJOQjgnOyAvL+avj+S4quivvuS7tuWUr+S4gOeahGtleSDlt6XnqIvlkI0rMTTkvY3pmo/mnLrlrZfnrKbkuLLjgILvvIjohJrmnKzliJvlu7rlt6XnqIvml7boh6rliqjnlJ/miJDvvIlcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEdhbWVOYW1lID0gJzIwMjNf5bCP6auY5a+SX+WNlemAiemimOaooeadvyc7IC8v5ri45oiP5ZCN5Lit5paH5o+P6L+w77yM55So5LqO5pWw5o2u5LiK5oqlICDvvIjohJrmnKzliJvlu7rlt6XnqIvml7bovpPlhaXvvIlcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFN1YmplY3QgPSAxOyAvL+Wtpuenke+8iDHnkIbnp5EgMuivreaWhyAz6Iux6K+t77yJXG5cbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IGRlZmF1bHRMZXZlbERhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHF1ZXN0aW9uVGV4dDogXCLku6XkuIvlk6rkvY3mmK/llJDmnJ3or5fkuro/XCIsXG4gICAgICAgICAgICBxdWVzdGlvblBpYzogXCJcIixcbiAgICAgICAgICAgIG9waW5pb246IDQsXG4gICAgICAgICAgICBhbnN3ZXI6IDQsXG4gICAgICAgICAgICBvcGluaW9uVGV4dDE6IFwi5bGI5Y6fXCIsXG4gICAgICAgICAgICBvcGluaW9uUGljMTogXCJcIixcbiAgICAgICAgICAgIG9waW5pb25UZXh0MjogXCLmnY7kvK9cIixcbiAgICAgICAgICAgIG9waW5pb25QaWMyOiBcIlwiLFxuICAgICAgICAgICAgb3BpbmlvblRleHQzOiBcIuWUkOWbveW8ulwiLFxuICAgICAgICAgICAgb3BpbmlvblBpYzM6IFwiXCIsXG4gICAgICAgICAgICBvcGluaW9uVGV4dDQ6IFwi6aqG5a6+546LXCIsXG4gICAgICAgICAgICBvcGluaW9uUGljNDogXCJcIixcbiAgICAgICAgICAgIG9waW5pb25UZXh0NTogXCJcIixcbiAgICAgICAgICAgIG9waW5pb25QaWM1OiBcIlwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBxdWVzdGlvblRleHQ6IFwi5Zyo6K++5aCC6YeM5a2m5LmgMzDnp5Is5bCx562J5LqO5Zyo546w5a6e5Lit6L+H5LqG5Y2K5YiG6ZKf44CCXCIsXG4gICAgICAgICAgICBxdWVzdGlvblBpYzogXCJcIixcbiAgICAgICAgICAgIG9waW5pb246IDIsXG4gICAgICAgICAgICBhbnN3ZXI6IDIsXG4gICAgICAgICAgICBvcGluaW9uVGV4dDE6IFwi6ZSZXCIsXG4gICAgICAgICAgICBvcGluaW9uUGljMTogXCJcIixcbiAgICAgICAgICAgIG9waW5pb25UZXh0MjogXCLlr7lcIixcbiAgICAgICAgICAgIG9waW5pb25QaWMyOiBcIlwiLFxuICAgICAgICAgICAgb3BpbmlvblRleHQzOiBcIlwiLFxuICAgICAgICAgICAgb3BpbmlvblBpYzM6IFwiXCIsXG4gICAgICAgICAgICBvcGluaW9uVGV4dDQ6IFwiXCIsXG4gICAgICAgICAgICBvcGluaW9uUGljNDogXCJcIixcbiAgICAgICAgICAgIG9waW5pb25UZXh0NTogXCJcIixcbiAgICAgICAgICAgIG9waW5pb25QaWM1OiBcIlwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBxdWVzdGlvblRleHQ6IFwiTGVkdSBsZXQgbWUgaGFwcHkgKCAgICApXCIsXG4gICAgICAgICAgICBxdWVzdGlvblBpYzogXCJcIixcbiAgICAgICAgICAgIG9waW5pb246IDQsXG4gICAgICAgICAgICBhbnN3ZXI6IDMsXG4gICAgICAgICAgICBvcGluaW9uVGV4dDE6IFwicGxheWluZ1wiLFxuICAgICAgICAgICAgb3BpbmlvblBpYzE6IFwiXCIsXG4gICAgICAgICAgICBvcGluaW9uVGV4dDI6IFwicmVhZGluZ1wiLFxuICAgICAgICAgICAgb3BpbmlvblBpYzI6IFwiXCIsXG4gICAgICAgICAgICBvcGluaW9uVGV4dDM6IFwic3R1ZHlpbmdcIixcbiAgICAgICAgICAgIG9waW5pb25QaWMzOiBcIlwiLFxuICAgICAgICAgICAgb3BpbmlvblRleHQ0OiBcInNsZWVwaW5nXCIsXG4gICAgICAgICAgICBvcGluaW9uUGljNDogXCJcIixcbiAgICAgICAgICAgIG9waW5pb25UZXh0NTogXCJcIixcbiAgICAgICAgICAgIG9waW5pb25QaWM1OiBcIlwiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBxdWVzdGlvblRleHQ6IFwi5Zyo57uE57uH5bm85YS/6K6k6K+G5b2i54q25pe2LOadjuiAgeW4iOivtDrigJzor7flsI/mnIvlj4vmib7mib7mlZnlrqTph4zmnInlnIblvaLlkozmraPmlrnlvaLnmoTnianlk4HjgILigJ3mnY7ogIHluIjnmoTlgZrms5XkvZPnjrDkuoblubzlhL/mlZnogrLnibnngrnnmoQoICAgKVwiLFxuICAgICAgICAgICAgcXVlc3Rpb25QaWM6IFwiXCIsXG4gICAgICAgICAgICBvcGluaW9uOiA0LFxuICAgICAgICAgICAgYW5zd2VyOiA0LFxuICAgICAgICAgICAgb3BpbmlvblRleHQxOiBcIuWfuuehgOaAp1wiLFxuICAgICAgICAgICAgb3BpbmlvblBpYzE6IFwiXCIsXG4gICAgICAgICAgICBvcGluaW9uVGV4dDI6IFwi5pW05L2T5oCnXCIsXG4gICAgICAgICAgICBvcGluaW9uUGljMjogXCJcIixcbiAgICAgICAgICAgIG9waW5pb25UZXh0MzogXCLmtYXmmL7mgKdcIixcbiAgICAgICAgICAgIG9waW5pb25QaWMzOiBcIlwiLFxuICAgICAgICAgICAgb3BpbmlvblRleHQ0OiBcIueUn+a0u+aAp1wiLFxuICAgICAgICAgICAgb3BpbmlvblBpYzQ6IFwiXCIsXG4gICAgICAgICAgICBvcGluaW9uVGV4dDU6IFwiXCIsXG4gICAgICAgICAgICBvcGluaW9uUGljNTogXCJcIixcbiAgICAgICAgfSxcbiAgICBdXG59XG4iXX0=