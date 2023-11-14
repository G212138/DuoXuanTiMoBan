
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
            id: 0,
            questionText: "测试题1：下面哪些是单数?",
            questionPic: "",
            opinion: 8,
            answer: [1, 3, 5, 7],
            opinionPara: [
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
            answer: [1, 3],
            opinionPara: [
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcRGF0YVxcQ29uc3RWYWx1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUFBO0lBMkVBLENBQUM7SUExRTBCLHNCQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsMEJBQTBCO0lBQzlDLHFCQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVTtJQUM3Qix3QkFBYSxHQUFHLDZCQUE2QixDQUFDLENBQUMsdUNBQXVDO0lBQ3RGLG1CQUFRLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyw2QkFBNkI7SUFDMUQsa0JBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7SUFFOUIsMkJBQWdCLEdBQUc7UUFDdEM7WUFDSSxFQUFFLEVBQUUsQ0FBQztZQUNMLFlBQVksRUFBRSxlQUFlO1lBQzdCLFdBQVcsRUFBRSxFQUFFO1lBQ2YsT0FBTyxFQUFFLENBQUM7WUFDVixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDakIsV0FBVyxFQUFDO2dCQUNSO29CQUNJLFdBQVcsRUFBRSxHQUFHO29CQUNoQixVQUFVLEVBQUUsRUFBRTtpQkFDakI7Z0JBQ0Q7b0JBQ0ksV0FBVyxFQUFFLEdBQUc7b0JBQ2hCLFVBQVUsRUFBRSxFQUFFO2lCQUNqQjtnQkFDRDtvQkFDSSxXQUFXLEVBQUUsR0FBRztvQkFDaEIsVUFBVSxFQUFFLEVBQUU7aUJBQ2pCO2dCQUNEO29CQUNJLFdBQVcsRUFBRSxHQUFHO29CQUNoQixVQUFVLEVBQUUsRUFBRTtpQkFDakI7Z0JBQ0Q7b0JBQ0ksV0FBVyxFQUFFLEdBQUc7b0JBQ2hCLFVBQVUsRUFBRSxFQUFFO2lCQUNqQjtnQkFDRDtvQkFDSSxXQUFXLEVBQUUsR0FBRztvQkFDaEIsVUFBVSxFQUFFLEVBQUU7aUJBQ2pCO2dCQUNEO29CQUNJLFdBQVcsRUFBRSxHQUFHO29CQUNoQixVQUFVLEVBQUUsRUFBRTtpQkFDakI7Z0JBQ0Q7b0JBQ0ksV0FBVyxFQUFFLEdBQUc7b0JBQ2hCLFVBQVUsRUFBRSxFQUFFO2lCQUNqQjthQUNKO1NBQ0o7UUFDRDtZQUNJLEVBQUUsRUFBRSxDQUFDO1lBQ0wsWUFBWSxFQUFFLGVBQWU7WUFDN0IsV0FBVyxFQUFFLFVBQVU7WUFDdkIsT0FBTyxFQUFFLENBQUM7WUFDVixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1lBQ2IsV0FBVyxFQUFDO2dCQUNSO29CQUNJLFdBQVcsRUFBRSxHQUFHO29CQUNoQixVQUFVLEVBQUUsYUFBYTtpQkFDNUI7Z0JBQ0Q7b0JBQ0ksV0FBVyxFQUFFLEdBQUc7b0JBQ2hCLFVBQVUsRUFBRSxFQUFFO2lCQUNqQjtnQkFDRDtvQkFDSSxXQUFXLEVBQUUsR0FBRztvQkFDaEIsVUFBVSxFQUFFLGdCQUFnQjtpQkFDL0I7Z0JBQ0Q7b0JBQ0ksV0FBVyxFQUFFLEdBQUc7b0JBQ2hCLFVBQVUsRUFBRSxFQUFFO2lCQUNqQjthQUNKO1NBQ0o7S0FDSixDQUFBO0lBQ0wsaUJBQUM7Q0EzRUQsQUEyRUMsSUFBQTtBQTNFWSxnQ0FBVSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDb25zdFZhbHVlIHtcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IElTX0VESVRJT05TID0gdHJ1ZTsgLy/mmK/lkKbkuLrlj5HluIPniYjmnKzvvIznlKjkuo7mlbDmja7kuIrmiqUg5Y+KIGxvZ+i+k+WHuuaOp+WItlxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgSVNfVEVBQ0hFUiA9IHRydWU7IC8v5piv5ZCm5Li65pWZ5biI56uv54mI5pysXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBDb3Vyc2V3YXJlS2V5ID0gJ0Rhblh1YW5Nb0Jhbl83bnMyRWgzSzZzMk5COCc7IC8v5q+P5Liq6K++5Lu25ZSv5LiA55qEa2V5IOW3peeoi+WQjSsxNOS9jemaj+acuuWtl+espuS4suOAgu+8iOiEmuacrOWIm+W7uuW3peeoi+aXtuiHquWKqOeUn+aIkO+8iVxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgR2FtZU5hbWUgPSAnMjAyM1/lsI/pq5jlr5Jf5Y2V6YCJ6aKY5qih5p2/JzsgLy/muLjmiI/lkI3kuK3mlofmj4/ov7DvvIznlKjkuo7mlbDmja7kuIrmiqUgIO+8iOiEmuacrOWIm+W7uuW3peeoi+aXtui+k+WFpe+8iVxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU3ViamVjdCA9IDE7IC8v5a2m56eR77yIMeeQhuenkSAy6K+t5paHIDPoi7Hor63vvIlcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgZGVmYXVsdExldmVsRGF0YSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICBxdWVzdGlvblRleHQ6IFwi5rWL6K+V6aKYMe+8muS4i+mdouWTquS6m+aYr+WNleaVsD9cIixcbiAgICAgICAgICAgIHF1ZXN0aW9uUGljOiBcIlwiLFxuICAgICAgICAgICAgb3BpbmlvbjogOCxcbiAgICAgICAgICAgIGFuc3dlcjogWzEsMyw1LDddLFxuICAgICAgICAgICAgb3BpbmlvblBhcmE6W1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3BpbmlvblRleHQ6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICBvcGluaW9uUGljOiBcIlwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcGluaW9uVGV4dDogXCIyXCIsXG4gICAgICAgICAgICAgICAgICAgIG9waW5pb25QaWM6IFwiXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9waW5pb25UZXh0OiBcIjNcIixcbiAgICAgICAgICAgICAgICAgICAgb3BpbmlvblBpYzogXCJcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3BpbmlvblRleHQ6IFwiNFwiLFxuICAgICAgICAgICAgICAgICAgICBvcGluaW9uUGljOiBcIlwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcGluaW9uVGV4dDogXCI1XCIsXG4gICAgICAgICAgICAgICAgICAgIG9waW5pb25QaWM6IFwiXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9waW5pb25UZXh0OiBcIjZcIixcbiAgICAgICAgICAgICAgICAgICAgb3BpbmlvblBpYzogXCJcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb3BpbmlvblRleHQ6IFwiN1wiLFxuICAgICAgICAgICAgICAgICAgICBvcGluaW9uUGljOiBcIlwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcGluaW9uVGV4dDogXCI4XCIsXG4gICAgICAgICAgICAgICAgICAgIG9waW5pb25QaWM6IFwiXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICBxdWVzdGlvblRleHQ6IFwi5rWL6K+V6aKYMu+8muS4i+mdouWTquS6m+aYr+WbvueJhz9cIixcbiAgICAgICAgICAgIHF1ZXN0aW9uUGljOiBcImJ0bi1ob3UyXCIsXG4gICAgICAgICAgICBvcGluaW9uOiA0LFxuICAgICAgICAgICAgYW5zd2VyOiBbMSwzXSxcbiAgICAgICAgICAgIG9waW5pb25QYXJhOltcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9waW5pb25UZXh0OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgb3BpbmlvblBpYzogXCJpbWdfeGlhbmdwaVwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcGluaW9uVGV4dDogXCIyXCIsXG4gICAgICAgICAgICAgICAgICAgIG9waW5pb25QaWM6IFwiXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9waW5pb25UZXh0OiBcIjNcIixcbiAgICAgICAgICAgICAgICAgICAgb3BpbmlvblBpYzogXCJpbWdfZm5hZ2RhamluZ1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcGluaW9uVGV4dDogXCI0XCIsXG4gICAgICAgICAgICAgICAgICAgIG9waW5pb25QaWM6IFwiXCIsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgXVxufVxuIl19