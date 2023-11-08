
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/game/scripts/UI/Item/OptionKuang.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f79b9wtvRRGG7bUh/bbIfSR', 'OptionKuang');
// game/scripts/UI/Item/OptionKuang.ts

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
var ListenerManager_1 = require("../../../../frame/scripts/Manager/ListenerManager");
var SoundManager_1 = require("../../../../frame/scripts/Manager/SoundManager");
var UIHelp_1 = require("../../../../frame/scripts/Utils/UIHelp");
var EventType_1 = require("../../Data/EventType");
var SoundConfig_1 = require("./SoundConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var OptionKuang = /** @class */ (function (_super) {
    __extends(OptionKuang, _super);
    function OptionKuang() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.text = null;
        _this.img = null;
        _this.img_true = null;
        _this.img_wrong = null;
        _this.isTrueAnswer = false;
        _this.index = 0;
        return _this;
    }
    OptionKuang.prototype.init = function (index, text, img, isTrueAnswer) {
        this.index = index;
        this.text.string = text;
        if (img == "") {
            this.img.node.active = false;
        }
        else {
            this.text.node.active = false;
            this.img.node.active = true;
        }
        this.isTrueAnswer = isTrueAnswer;
    };
    OptionKuang.prototype.onClickOption = function () {
        UIHelp_1.UIHelp.showMask();
        ListenerManager_1.ListenerManager.dispatch(EventType_1.EventType.CLICK_OPTION, this.isTrueAnswer);
        var soundName = this.isTrueAnswer ? "正确音效" : "错误音效";
        SoundManager_1.SoundManager.playEffect(SoundConfig_1.SoundConfig.soudlist[soundName], false, false, false);
        this.img_true.active = this.isTrueAnswer;
        this.img_wrong.active = !this.isTrueAnswer;
    };
    __decorate([
        property(cc.Label)
    ], OptionKuang.prototype, "text", void 0);
    __decorate([
        property(cc.Sprite)
    ], OptionKuang.prototype, "img", void 0);
    __decorate([
        property(cc.Node)
    ], OptionKuang.prototype, "img_true", void 0);
    __decorate([
        property(cc.Node)
    ], OptionKuang.prototype, "img_wrong", void 0);
    OptionKuang = __decorate([
        ccclass
    ], OptionKuang);
    return OptionKuang;
}(cc.Component));
exports.default = OptionKuang;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ2FtZVxcc2NyaXB0c1xcVUlcXEl0ZW1cXE9wdGlvbkt1YW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFGQUFvRjtBQUNwRiwrRUFBOEU7QUFDOUUsaUVBQWdFO0FBQ2hFLGtEQUFpRDtBQUNqRCw2Q0FBNEM7QUFFdEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBeUMsK0JBQVk7SUFBckQ7UUFBQSxxRUFvQ0M7UUFqQ1csVUFBSSxHQUFhLElBQUksQ0FBQztRQUV0QixTQUFHLEdBQWMsSUFBSSxDQUFDO1FBRXRCLGNBQVEsR0FBWSxJQUFJLENBQUM7UUFFekIsZUFBUyxHQUFZLElBQUksQ0FBQztRQUUxQixrQkFBWSxHQUFZLEtBQUssQ0FBQztRQUM5QixXQUFLLEdBQVcsQ0FBQyxDQUFDOztJQXdCOUIsQ0FBQztJQXRCVSwwQkFBSSxHQUFYLFVBQVksS0FBYSxFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsWUFBcUI7UUFDdkUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRTtZQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDaEM7YUFBTTtZQUNILElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUMvQjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxtQ0FBYSxHQUFwQjtRQUNJLGVBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsQixpQ0FBZSxDQUFDLFFBQVEsQ0FBQyxxQkFBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEUsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDcEQsMkJBQVksQ0FBQyxVQUFVLENBQUMseUJBQVcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMvQyxDQUFDO0lBOUJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ1c7SUFFOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0Q0FDVTtJQUU5QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNlO0lBRWpDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7a0RBQ2dCO0lBVGpCLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FvQy9CO0lBQUQsa0JBQUM7Q0FwQ0QsQUFvQ0MsQ0FwQ3dDLEVBQUUsQ0FBQyxTQUFTLEdBb0NwRDtrQkFwQ29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0ZW5lck1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL0xpc3RlbmVyTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9NYW5hZ2VyL1NvdW5kTWFuYWdlclwiO1xyXG5pbXBvcnQgeyBVSUhlbHAgfSBmcm9tIFwiLi4vLi4vLi4vLi4vZnJhbWUvc2NyaXB0cy9VdGlscy9VSUhlbHBcIjtcclxuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSBcIi4uLy4uL0RhdGEvRXZlbnRUeXBlXCI7XHJcbmltcG9ydCB7IFNvdW5kQ29uZmlnIH0gZnJvbSBcIi4vU291bmRDb25maWdcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25LdWFuZyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSB0ZXh0OiBjYy5MYWJlbCA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBpbWc6IGNjLlNwcml0ZSA9IG51bGw7XHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgaW1nX3RydWU6IGNjLk5vZGUgPSBudWxsO1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGltZ193cm9uZzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBpc1RydWVBbnN3ZXI6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgcHVibGljIGluaXQoaW5kZXg6IG51bWJlciwgdGV4dDogc3RyaW5nLCBpbWc6IHN0cmluZywgaXNUcnVlQW5zd2VyOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgIHRoaXMudGV4dC5zdHJpbmcgPSB0ZXh0O1xyXG4gICAgICAgIGlmIChpbWcgPT0gXCJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmltZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGV4dC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmltZy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNUcnVlQW5zd2VyID0gaXNUcnVlQW5zd2VyO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNsaWNrT3B0aW9uKCkge1xyXG4gICAgICAgIFVJSGVscC5zaG93TWFzaygpO1xyXG4gICAgICAgIExpc3RlbmVyTWFuYWdlci5kaXNwYXRjaChFdmVudFR5cGUuQ0xJQ0tfT1BUSU9OLCB0aGlzLmlzVHJ1ZUFuc3dlcik7XHJcbiAgICAgICAgbGV0IHNvdW5kTmFtZSA9IHRoaXMuaXNUcnVlQW5zd2VyID8gXCLmraPnoa7pn7PmlYhcIiA6IFwi6ZSZ6K+v6Z+z5pWIXCI7XHJcbiAgICAgICAgU291bmRNYW5hZ2VyLnBsYXlFZmZlY3QoU291bmRDb25maWcuc291ZGxpc3Rbc291bmROYW1lXSwgZmFsc2UsIGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5pbWdfdHJ1ZS5hY3RpdmUgPSB0aGlzLmlzVHJ1ZUFuc3dlcjtcclxuICAgICAgICB0aGlzLmltZ193cm9uZy5hY3RpdmUgPSAhdGhpcy5pc1RydWVBbnN3ZXI7ICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIl19