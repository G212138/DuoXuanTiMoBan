
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/frame/scripts/Http/NetWork.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '9cd01aQNbFMUY4sUMN0yYH5', 'NetWork');
// frame/scripts/Http/NetWork.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetWork = exports.NetWorkClass = void 0;
var ConstValue_1 = require("../../../game/scripts/Data/ConstValue");
var UIManager_1 = require("../Manager/UIManager");
var GameMsg_1 = require("../SDK/GameMsg");
var UIHelp_1 = require("../Utils/UIHelp");
var NetWorkClass = /** @class */ (function () {
    function NetWorkClass() {
        //判断是否是线上   URL里不加参数则默认为测试环境
        this.isOnlineEnv = this.GetIsOnline() == 'online';
        //判断是否是pc预加载的协议    URL里不加参数则默认为非预加载
        this.isOwcr = this.GetBPreload();
        this.BASE = this.isOnlineEnv
            ? 'https://courseware-online.speiyou.com'
            : 'https://ceshi-courseware.speiyou.com';
        this.GET_QUESTION = this.BASE + '/get';
        this.GET_USER_PROGRESS = this.BASE + '/get/answer';
        this.GET_TITLE = this.BASE + '/get/title';
        this.ADD = this.BASE + '/add';
        this.MODIFY = this.BASE + '/modify';
        this.CLEAR = this.BASE + '/clear';
        this.empty = false; //清理脏数据的开关，在URL里面拼此参数 = true；
        //新课堂参数
        this.userId = null; //用户id
        this.chapterId = null; //直播讲id
        this.coursewareId = null; //题目信息   用于交互游戏自身查题目信息
        this.titleId = null; //交互游戏绑定id   绑定的时候用（监课平台）  学生端不传
        this.bLive = null; //是否是直播
        this.bPreload = null; //是否预加载  （cdn/zip)
        this.env = null; //运行环境（线上/测试）
        this.app = null; //App名称
        this.platform = null; //硬件平台信息（pc/iPad/android/androidPad/web）
        this.channel = null; //使用方(辅导端、学生端、未来黑板、配齐、教研云、……）
        this.browser = null; //浏览器信息（内核及版本）
        this.appVersion = null; //端的版本信息
        this.isTeacher = false; //是否为教师（通过同步的get_role返回的是否为'teacher'）
        this.isSync = false; //是否为同步（通过同步的get_is_sync返回是否为1/true）
        this.isOffline = 0; //是否为离线模式
        this.isMaster = null; //是否是主动发心跳的一方
        this.isSupportKeepPlay = false; //是否支持接着玩重新玩
        this.theRequest = null;
    }
    NetWorkClass.getInstance = function () {
        if (this.instance == null) {
            this.instance = new NetWorkClass();
        }
        return this.instance;
    };
    NetWorkClass.prototype.setIsSync = function (isSync) {
        isSync = isSync == null ? false : isSync;
        exports.NetWork.isSync = isSync;
    };
    NetWorkClass.prototype.setIsTeacher = function (role) {
        var isTeacher = role == 'teacher';
        exports.NetWork.isTeacher = isTeacher;
    };
    NetWorkClass.prototype.setIsPreload = function (isPreload) {
        isPreload = isPreload == null ? false : isPreload;
        UIManager_1.UIManager.isGameShowing = !isPreload;
    };
    NetWorkClass.prototype.setIsMaster = function (isMaster) {
        isMaster = isMaster == null ? false : isMaster;
        exports.NetWork.isMaster = isMaster;
    };
    NetWorkClass.prototype.setIsSupportKeepPlay = function (isSupportKeepPlay) {
        exports.NetWork.isSupportKeepPlay = isSupportKeepPlay;
        if (!isSupportKeepPlay) {
            exports.NetWork.isMaster = exports.NetWork.isTeacher;
        }
        console.log("isSupportKeepPlay: " + isSupportKeepPlay);
    };
    /**
     * 请求网络Post 0成功 1超时
     * @param url
     * @param openType
     * @param contentType
     * @param callback
     * @param params
     */
    NetWorkClass.prototype.httpRequest = function (url, openType, contentType, callback, params) {
        var _this = this;
        if (callback === void 0) { callback = null; }
        if (params === void 0) { params = ''; }
        //------------------离线模式-------------------------
        if (this.isOffline && url.substring(0, this.GET_QUESTION.length) == this.GET_QUESTION) {
            GameMsg_1.default.recv_json_data(function (data) {
                console.log('recv_json_data:', data);
                if (callback && data.jsonData.errcode == 0) {
                    callback(false, data.jsonData);
                }
                else {
                    UIHelp_1.UIHelp.showErrorPanel(data.jsonData.errmsg + ',请联系客服！', '', '', '确定', function () {
                        _this.httpRequest(url, openType, contentType, callback, params);
                    }, false);
                }
            });
            GameMsg_1.default.request_json_data({ coursewareId: this.coursewareId });
            return;
        }
        if (ConstValue_1.ConstValue.IS_TEACHER) {
            if (!this.titleId) {
                //教师端没有titleId的情况
                UIHelp_1.UIHelp.showErrorPanel('URL参数错误,缺少titleId,请联系技术人员！', '', '', '确定');
                return;
            }
        }
        else {
            //新课堂学生端  判断所有参数
            if (!ConstValue_1.ConstValue.IS_TEACHER &&
                (!this.userId || !this.coursewareId || !this.env || !this.app || !this.channel || !this.browser)) {
                GameMsg_1.default.URLError(this.theRequest);
                UIHelp_1.UIHelp.showErrorPanel('URL参数错误,请联系客服！', '', '', '确定');
                return;
            }
        }
        var xhr = new XMLHttpRequest();
        xhr.open(openType, url);
        xhr.timeout = 10000;
        xhr.setRequestHeader('Content-Type', contentType);
        xhr.withCredentials = true;
        //回调
        xhr.onreadystatechange = function () {
            console.log('httpRequest rsp status', xhr.status, '        xhr.readyState', xhr.readyState, '        xhr.responseText', xhr.responseText);
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status <= 400) {
                var response = JSON.parse(xhr.responseText);
                if (callback && response.errcode == 0) {
                    callback(false, response);
                }
                else {
                    GameMsg_1.default.httpError(response.errmsg);
                    if (ConstValue_1.ConstValue.IS_EDITIONS) {
                        UIHelp_1.UIHelp.showErrorPanel(response.errmsg + ',请联系客服！', '', '', '确定', function () {
                            _this.httpRequest(url, openType, contentType, callback, params);
                        }, false);
                    }
                }
            }
        };
        //超时回调
        xhr.ontimeout = function (event) {
            GameMsg_1.default.httpTimeOut('网络不佳，请稍后重试');
            if (ConstValue_1.ConstValue.IS_EDITIONS) {
                UIHelp_1.UIHelp.showErrorPanel('网络不佳，请稍后重试', '', '若重新连接无效，请联系客服', '重新连接', function () {
                    _this.httpRequest(url, openType, contentType, callback, params);
                }, true);
            }
            console.log('httpRequest timeout');
            callback && callback(true, null);
        };
        //出错
        xhr.onerror = function (error) {
            if (ConstValue_1.ConstValue.IS_EDITIONS) {
                UIHelp_1.UIHelp.showErrorPanel('网络出错，请稍后重试', '若重新连接无效，请联系客服', '', '重新连接', function () {
                    _this.httpRequest(url, openType, contentType, callback, params);
                }, true);
            }
            console.log('httpRequest error');
            callback && callback(true, null);
        };
        xhr.send(params);
    };
    /**
     * 获取url参数
     */
    NetWorkClass.prototype.GetRequest = function () {
        if (this.theRequest != null) {
            return this.theRequest;
        }
        this.theRequest = new Object();
        var url = location.search; //获取url中"?"符后的字串
        if (url.indexOf('?') != -1) {
            var str = url.substr(1);
            var strs = str.split('&');
            for (var i = 0; i < strs.length; i++) {
                this.theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
            }
        }
        //新课堂url必需参数
        this.userId = this.theRequest['userId'];
        this.chapterId = this.theRequest['chapterId'];
        this.coursewareId = this.theRequest['coursewareId'];
        this.titleId = this.theRequest['titleId'];
        this.bLive = this.theRequest['bLive'];
        this.bPreload = this.theRequest['bPreload'];
        this.env = this.theRequest['env'];
        this.app = this.theRequest['app'];
        this.platform = this.theRequest['platform'];
        this.channel = this.theRequest['channel'];
        this.browser = this.theRequest['browser'];
        this.appVersion = this.theRequest['appVersion'];
        this.empty = this.theRequest['empty'];
        this.isOffline = parseInt(this.theRequest['isOffline']); //离线模式
        return this.theRequest;
    };
    NetWorkClass.prototype.GetBPreload = function () {
        var BPreload = 0;
        if (this.GetRequest()['bPreload']) {
            BPreload = this.GetRequest()['bPreload'];
        }
        return BPreload;
    };
    NetWorkClass.prototype.GetIsOnline = function () {
        var isOnline = 'test';
        if (this.GetRequest()['env']) {
            isOnline = this.GetRequest()['env'];
        }
        return isOnline;
    };
    return NetWorkClass;
}());
exports.NetWorkClass = NetWorkClass;
exports.NetWork = NetWorkClass.getInstance();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVcXHNjcmlwdHNcXEh0dHBcXE5ldFdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQW1FO0FBQ25FLGtEQUFpRDtBQUNqRCwwQ0FBcUM7QUFDckMsMENBQXlDO0FBQ3pDO0lBQUE7UUFHSSw0QkFBNEI7UUFDWixnQkFBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUM7UUFDN0QsbUNBQW1DO1FBQ25CLFdBQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsU0FBSSxHQUFHLElBQUksQ0FBQyxXQUFXO1lBQ25DLENBQUMsQ0FBQyx1Q0FBdUM7WUFDekMsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDO1FBRTdCLGlCQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDbEMsc0JBQWlCLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7UUFDOUMsY0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO1FBQ3JDLFFBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUN6QixXQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDL0IsVUFBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBRXRDLFVBQUssR0FBWSxLQUFLLENBQUMsQ0FBQyw2QkFBNkI7UUFFNUQsT0FBTztRQUNBLFdBQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxNQUFNO1FBQ3JCLGNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxPQUFPO1FBQ3pCLGlCQUFZLEdBQUcsSUFBSSxDQUFDLENBQUMsc0JBQXNCO1FBQzNDLFlBQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxnQ0FBZ0M7UUFDaEQsVUFBSyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU87UUFDckIsYUFBUSxHQUFHLElB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QWMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNO1FBRS9ELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDO0lBRU0sa0NBQVcsR0FBbEI7UUFDSSxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDL0IsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxrQ0FBVyxHQUFsQjtRQUNJLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUNMLG1CQUFDO0FBQUQsQ0FoUUEsQUFnUUMsSUFBQTtBQWhRWSxvQ0FBWTtBQWtRWixRQUFBLE9BQU8sR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdFZhbHVlIH0gZnJvbSAnLi4vLi4vLi4vZ2FtZS9zY3JpcHRzL0RhdGEvQ29uc3RWYWx1ZSc7XG5pbXBvcnQgeyBVSU1hbmFnZXIgfSBmcm9tICcuLi9NYW5hZ2VyL1VJTWFuYWdlcic7XG5pbXBvcnQgR2FtZU1zZyBmcm9tICcuLi9TREsvR2FtZU1zZyc7XG5pbXBvcnQgeyBVSUhlbHAgfSBmcm9tICcuLi9VdGlscy9VSUhlbHAnO1xuZXhwb3J0IGNsYXNzIE5ldFdvcmtDbGFzcyB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IE5ldFdvcmtDbGFzcztcblxuICAgIC8v5Yik5pat5piv5ZCm5piv57q/5LiKICAgVVJM6YeM5LiN5Yqg5Y+C5pWw5YiZ6buY6K6k5Li65rWL6K+V546v5aKDXG4gICAgcHVibGljIHJlYWRvbmx5IGlzT25saW5lRW52ID0gdGhpcy5HZXRJc09ubGluZSgpID09ICdvbmxpbmUnO1xuICAgIC8v5Yik5pat5piv5ZCm5pivcGPpooTliqDovb3nmoTljY/orq4gICAgVVJM6YeM5LiN5Yqg5Y+C5pWw5YiZ6buY6K6k5Li66Z2e6aKE5Yqg6L29XG4gICAgcHVibGljIHJlYWRvbmx5IGlzT3djciA9IHRoaXMuR2V0QlByZWxvYWQoKTtcbiAgICBwdWJsaWMgcmVhZG9ubHkgQkFTRSA9IHRoaXMuaXNPbmxpbmVFbnZcbiAgICAgICAgPyAnaHR0cHM6Ly9jb3Vyc2V3YXJlLW9ubGluZS5zcGVpeW91LmNvbSdcbiAgICAgICAgOiAnaHR0cHM6Ly9jZXNoaS1jb3Vyc2V3YXJlLnNwZWl5b3UuY29tJztcblxuICAgIHB1YmxpYyByZWFkb25seSBHRVRfUVVFU1RJT04gPSB0aGlzLkJBU0UgKyAnL2dldCc7XG4gICAgcHVibGljIHJlYWRvbmx5IEdFVF9VU0VSX1BST0dSRVNTID0gdGhpcy5CQVNFICsgJy9nZXQvYW5zd2VyJztcbiAgICBwdWJsaWMgcmVhZG9ubHkgR0VUX1RJVExFID0gdGhpcy5CQVNFICsgJy9nZXQvdGl0bGUnO1xuICAgIHB1YmxpYyByZWFkb25seSBBREQgPSB0aGlzLkJBU0UgKyAnL2FkZCc7XG4gICAgcHVibGljIHJlYWRvbmx5IE1PRElGWSA9IHRoaXMuQkFTRSArICcvbW9kaWZ5JztcbiAgICBwdWJsaWMgcmVhZG9ubHkgQ0xFQVIgPSB0aGlzLkJBU0UgKyAnL2NsZWFyJztcblxuICAgIHB1YmxpYyBlbXB0eTogYm9vbGVhbiA9IGZhbHNlOyAvL+a4heeQhuiEj+aVsOaNrueahOW8gOWFs++8jOWcqFVSTOmHjOmdouaLvOatpOWPguaVsCA9IHRydWXvvJtcblxuICAgIC8v5paw6K++5aCC5Y+C5pWwXG4gICAgcHVibGljIHVzZXJJZCA9IG51bGw7IC8v55So5oi3aWRcbiAgICBwdWJsaWMgY2hhcHRlcklkID0gbnVsbDsgLy/nm7Tmkq3orrJpZFxuICAgIHB1YmxpYyBjb3Vyc2V3YXJlSWQgPSBudWxsOyAvL+mimOebruS/oeaBryAgIOeUqOS6juS6pOS6kua4uOaIj+iHqui6q+afpemimOebruS/oeaBr1xuICAgIHB1YmxpYyB0aXRsZUlkID0gbnVsbDsgLy/kuqTkupLmuLjmiI/nu5HlrpppZCAgIOe7keWumueahOaXtuWAmeeUqO+8iOebkeivvuW5s+WPsO+8iSAg5a2m55Sf56uv5LiN5LygXG4gICAgcHVibGljIGJMaXZlID0gbnVsbDsgLy/mmK/lkKbmmK/nm7Tmkq1cbiAgICBwdWJsaWMgYlByZWxvYWQgPSBudWxsOyAvL+aYr+WQpumihOWKoOi9vSAg77yIY2RuL3ppcClcbiAgICBwdWJsaWMgZW52ID0gbnVsbDsgLy/ov5DooYznjq/looPvvIjnur/kuIov5rWL6K+V77yJXG4gICAgcHVibGljIGFwcCA9IG51bGw7IC8vQXBw5ZCN56ewXG4gICAgcHVibGljIHBsYXRmb3JtID0gbnVsbDsgLy/noazku7blubPlj7Dkv6Hmga/vvIhwYy9pUGFkL2FuZHJvaWQvYW5kcm9pZFBhZC93ZWLvvIlcbiAgICBwdWJsaWMgY2hhbm5lbCA9IG51bGw7IC8v5L2/55So5pa5KOi+heWvvOerr+OAgeWtpueUn+err+OAgeacquadpem7keadv+OAgemFjem9kOOAgeaVmeeglOS6keOAgeKApuKApu+8iVxuICAgIHB1YmxpYyBicm93c2VyID0gbnVsbDsgLy/mtY/op4jlmajkv6Hmga/vvIjlhoXmoLjlj4rniYjmnKzvvIlcbiAgICBwdWJsaWMgYXBwVmVyc2lvbiA9IG51bGw7IC8v56uv55qE54mI5pys5L+h5oGvXG4gICAgcHVibGljIGlzVGVhY2hlciA9IGZhbHNlOyAvL+aYr+WQpuS4uuaVmeW4iO+8iOmAmui/h+WQjOatpeeahGdldF9yb2xl6L+U5Zue55qE5piv5ZCm5Li6J3RlYWNoZXIn77yJXG4gICAgcHVibGljIGlzU3luYyA9IGZhbHNlOyAvL+aYr+WQpuS4uuWQjOatpe+8iOmAmui/h+WQjOatpeeahGdldF9pc19zeW5j6L+U5Zue5piv5ZCm5Li6MS90cnVl77yJXG4gICAgcHVibGljIGlzT2ZmbGluZSA9IDA7IC8v5piv5ZCm5Li656a757q/5qih5byPXG4gICAgcHVibGljIGlzTWFzdGVyID0gbnVsbDsgLy/mmK/lkKbmmK/kuLvliqjlj5Hlv4Pot7PnmoTkuIDmlrlcbiAgICBwdWJsaWMgaXNTdXBwb3J0S2VlcFBsYXkgPSBmYWxzZTsgLy/mmK/lkKbmlK/mjIHmjqXnnYDnjqnph43mlrDnjqlcblxuICAgIHB1YmxpYyB0aGVSZXF1ZXN0ID0gbnVsbDtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgICAgIGlmICh0aGlzLmluc3RhbmNlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgTmV0V29ya0NsYXNzKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgcHVibGljIHNldElzU3luYyhpc1N5bmM6IGJvb2xlYW4pIHtcbiAgICAgICAgaXNTeW5jID0gaXNTeW5jID09IG51bGwgPyBmYWxzZSA6IGlzU3luYztcbiAgICAgICAgTmV0V29yay5pc1N5bmMgPSBpc1N5bmM7XG4gICAgfVxuXG4gICAgcHVibGljIHNldElzVGVhY2hlcihyb2xlOiBzdHJpbmcpIHtcbiAgICAgICAgbGV0IGlzVGVhY2hlciA9IHJvbGUgPT0gJ3RlYWNoZXInO1xuICAgICAgICBOZXRXb3JrLmlzVGVhY2hlciA9IGlzVGVhY2hlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SXNQcmVsb2FkKGlzUHJlbG9hZDogYm9vbGVhbikge1xuICAgICAgICBpc1ByZWxvYWQgPSBpc1ByZWxvYWQgPT0gbnVsbCA/IGZhbHNlIDogaXNQcmVsb2FkO1xuICAgICAgICBVSU1hbmFnZXIuaXNHYW1lU2hvd2luZyA9ICFpc1ByZWxvYWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHNldElzTWFzdGVyKGlzTWFzdGVyOiBib29sZWFuKSB7XG4gICAgICAgIGlzTWFzdGVyID0gaXNNYXN0ZXIgPT0gbnVsbCA/IGZhbHNlIDogaXNNYXN0ZXI7XG4gICAgICAgIE5ldFdvcmsuaXNNYXN0ZXIgPSBpc01hc3RlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SXNTdXBwb3J0S2VlcFBsYXkoaXNTdXBwb3J0S2VlcFBsYXk6IGJvb2xlYW4pIHtcbiAgICAgICAgTmV0V29yay5pc1N1cHBvcnRLZWVwUGxheSA9IGlzU3VwcG9ydEtlZXBQbGF5O1xuICAgICAgICBpZiAoIWlzU3VwcG9ydEtlZXBQbGF5KSB7XG4gICAgICAgICAgICBOZXRXb3JrLmlzTWFzdGVyID0gTmV0V29yay5pc1RlYWNoZXI7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coYGlzU3VwcG9ydEtlZXBQbGF5OiAke2lzU3VwcG9ydEtlZXBQbGF5fWApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIOivt+axgue9kee7nFBvc3QgMOaIkOWKnyAx6LaF5pe2XG4gICAgICogQHBhcmFtIHVybFxuICAgICAqIEBwYXJhbSBvcGVuVHlwZVxuICAgICAqIEBwYXJhbSBjb250ZW50VHlwZVxuICAgICAqIEBwYXJhbSBjYWxsYmFja1xuICAgICAqIEBwYXJhbSBwYXJhbXNcbiAgICAgKi9cbiAgICBwdWJsaWMgaHR0cFJlcXVlc3QodXJsOiBzdHJpbmcsIG9wZW5UeXBlLCBjb250ZW50VHlwZSwgY2FsbGJhY2sgPSBudWxsLCBwYXJhbXMgPSAnJykge1xuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLeemu+e6v+aooeW8jy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgaWYgKHRoaXMuaXNPZmZsaW5lICYmIHVybC5zdWJzdHJpbmcoMCwgdGhpcy5HRVRfUVVFU1RJT04ubGVuZ3RoKSA9PSB0aGlzLkdFVF9RVUVTVElPTikge1xuICAgICAgICAgICAgR2FtZU1zZy5yZWN2X2pzb25fZGF0YSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWN2X2pzb25fZGF0YTonLCBkYXRhKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgZGF0YS5qc29uRGF0YS5lcnJjb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIGRhdGEuanNvbkRhdGEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIFVJSGVscC5zaG93RXJyb3JQYW5lbChcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuanNvbkRhdGEuZXJybXNnICsgJyzor7fogZTns7vlrqLmnI3vvIEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICfnoa7lrponLFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cFJlcXVlc3QodXJsLCBvcGVuVHlwZSwgY29udGVudFR5cGUsIGNhbGxiYWNrLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgR2FtZU1zZy5yZXF1ZXN0X2pzb25fZGF0YSh7IGNvdXJzZXdhcmVJZDogdGhpcy5jb3Vyc2V3YXJlSWQgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoQ29uc3RWYWx1ZS5JU19URUFDSEVSKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudGl0bGVJZCkge1xuICAgICAgICAgICAgICAgIC8v5pWZ5biI56uv5rKh5pyJdGl0bGVJZOeahOaDheWGtVxuICAgICAgICAgICAgICAgIFVJSGVscC5zaG93RXJyb3JQYW5lbCgnVVJM5Y+C5pWw6ZSZ6K+vLOe8uuWwkXRpdGxlSWQs6K+36IGU57O75oqA5pyv5Lq65ZGY77yBJywgJycsICcnLCAn56Gu5a6aJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy/mlrDor77loILlrabnlJ/nq68gIOWIpOaWreaJgOacieWPguaVsFxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFDb25zdFZhbHVlLklTX1RFQUNIRVIgJiZcbiAgICAgICAgICAgICAgICAoIXRoaXMudXNlcklkIHx8ICF0aGlzLmNvdXJzZXdhcmVJZCB8fCAhdGhpcy5lbnYgfHwgIXRoaXMuYXBwIHx8ICF0aGlzLmNoYW5uZWwgfHwgIXRoaXMuYnJvd3NlcilcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIEdhbWVNc2cuVVJMRXJyb3IodGhpcy50aGVSZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBVSUhlbHAuc2hvd0Vycm9yUGFuZWwoJ1VSTOWPguaVsOmUmeivryzor7fogZTns7vlrqLmnI3vvIEnLCAnJywgJycsICfnoa7lrponKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKG9wZW5UeXBlLCB1cmwpO1xuICAgICAgICB4aHIudGltZW91dCA9IDEwMDAwO1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgY29udGVudFR5cGUpO1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAgICAgICAvL+Wbnuiwg1xuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgJ2h0dHBSZXF1ZXN0IHJzcCBzdGF0dXMnLFxuICAgICAgICAgICAgICAgIHhoci5zdGF0dXMsXG4gICAgICAgICAgICAgICAgJyAgICAgICAgeGhyLnJlYWR5U3RhdGUnLFxuICAgICAgICAgICAgICAgIHhoci5yZWFkeVN0YXRlLFxuICAgICAgICAgICAgICAgICcgICAgICAgIHhoci5yZXNwb25zZVRleHQnLFxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVRleHQsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8PSA0MDApIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiByZXNwb25zZS5lcnJjb2RlID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soZmFsc2UsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBHYW1lTXNnLmh0dHBFcnJvcihyZXNwb25zZS5lcnJtc2cpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoQ29uc3RWYWx1ZS5JU19FRElUSU9OUykge1xuICAgICAgICAgICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLmVycm1zZyArICcs6K+36IGU57O75a6i5pyN77yBJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAn56Gu5a6aJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cFJlcXVlc3QodXJsLCBvcGVuVHlwZSwgY29udGVudFR5cGUsIGNhbGxiYWNrLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8v6LaF5pe25Zue6LCDXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIEdhbWVNc2cuaHR0cFRpbWVPdXQoJ+e9kee7nOS4jeS9s++8jOivt+eojeWQjumHjeivlScpO1xuICAgICAgICAgICAgaWYgKENvbnN0VmFsdWUuSVNfRURJVElPTlMpIHtcbiAgICAgICAgICAgICAgICBVSUhlbHAuc2hvd0Vycm9yUGFuZWwoXG4gICAgICAgICAgICAgICAgICAgICfnvZHnu5zkuI3kvbPvvIzor7fnqI3lkI7ph43or5UnLFxuICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ+iLpemHjeaWsOi/nuaOpeaXoOaViO+8jOivt+iBlOezu+WuouacjScsXG4gICAgICAgICAgICAgICAgICAgICfph43mlrDov57mjqUnLFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHBSZXF1ZXN0KHVybCwgb3BlblR5cGUsIGNvbnRlbnRUeXBlLCBjYWxsYmFjaywgcGFyYW1zKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2h0dHBSZXF1ZXN0IHRpbWVvdXQnKTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHRydWUsIG51bGwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8v5Ye66ZSZXG4gICAgICAgIHhoci5vbmVycm9yID0gKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBpZiAoQ29uc3RWYWx1ZS5JU19FRElUSU9OUykge1xuICAgICAgICAgICAgICAgIFVJSGVscC5zaG93RXJyb3JQYW5lbChcbiAgICAgICAgICAgICAgICAgICAgJ+e9kee7nOWHuumUme+8jOivt+eojeWQjumHjeivlScsXG4gICAgICAgICAgICAgICAgICAgICfoi6Xph43mlrDov57mjqXml6DmlYjvvIzor7fogZTns7vlrqLmnI0nLFxuICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgJ+mHjeaWsOi/nuaOpScsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cFJlcXVlc3QodXJsLCBvcGVuVHlwZSwgY29udGVudFR5cGUsIGNhbGxiYWNrLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaHR0cFJlcXVlc3QgZXJyb3InKTtcbiAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHRydWUsIG51bGwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHhoci5zZW5kKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6I635Y+WdXJs5Y+C5pWwXG4gICAgICovXG4gICAgcHVibGljIEdldFJlcXVlc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLnRoZVJlcXVlc3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGhlUmVxdWVzdDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRoZVJlcXVlc3QgPSBuZXcgT2JqZWN0KCk7XG4gICAgICAgIHZhciB1cmwgPSBsb2NhdGlvbi5zZWFyY2g7IC8v6I635Y+WdXJs5LitXCI/XCLnrKblkI7nmoTlrZfkuLJcblxuICAgICAgICBpZiAodXJsLmluZGV4T2YoJz8nKSAhPSAtMSkge1xuICAgICAgICAgICAgdmFyIHN0ciA9IHVybC5zdWJzdHIoMSk7XG4gICAgICAgICAgICB2YXIgc3RycyA9IHN0ci5zcGxpdCgnJicpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50aGVSZXF1ZXN0W3N0cnNbaV0uc3BsaXQoJz0nKVswXV0gPSBkZWNvZGVVUklDb21wb25lbnQoc3Ryc1tpXS5zcGxpdCgnPScpWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5paw6K++5aCCdXJs5b+F6ZyA5Y+C5pWwXG4gICAgICAgIHRoaXMudXNlcklkID0gdGhpcy50aGVSZXF1ZXN0Wyd1c2VySWQnXTtcbiAgICAgICAgdGhpcy5jaGFwdGVySWQgPSB0aGlzLnRoZVJlcXVlc3RbJ2NoYXB0ZXJJZCddO1xuICAgICAgICB0aGlzLmNvdXJzZXdhcmVJZCA9IHRoaXMudGhlUmVxdWVzdFsnY291cnNld2FyZUlkJ107XG4gICAgICAgIHRoaXMudGl0bGVJZCA9IHRoaXMudGhlUmVxdWVzdFsndGl0bGVJZCddO1xuICAgICAgICB0aGlzLmJMaXZlID0gdGhpcy50aGVSZXF1ZXN0WydiTGl2ZSddO1xuICAgICAgICB0aGlzLmJQcmVsb2FkID0gdGhpcy50aGVSZXF1ZXN0WydiUHJlbG9hZCddO1xuICAgICAgICB0aGlzLmVudiA9IHRoaXMudGhlUmVxdWVzdFsnZW52J107XG4gICAgICAgIHRoaXMuYXBwID0gdGhpcy50aGVSZXF1ZXN0WydhcHAnXTtcbiAgICAgICAgdGhpcy5wbGF0Zm9ybSA9IHRoaXMudGhlUmVxdWVzdFsncGxhdGZvcm0nXTtcbiAgICAgICAgdGhpcy5jaGFubmVsID0gdGhpcy50aGVSZXF1ZXN0WydjaGFubmVsJ107XG4gICAgICAgIHRoaXMuYnJvd3NlciA9IHRoaXMudGhlUmVxdWVzdFsnYnJvd3NlciddO1xuICAgICAgICB0aGlzLmFwcFZlcnNpb24gPSB0aGlzLnRoZVJlcXVlc3RbJ2FwcFZlcnNpb24nXTtcbiAgICAgICAgdGhpcy5lbXB0eSA9IHRoaXMudGhlUmVxdWVzdFsnZW1wdHknXTtcbiAgICAgICAgdGhpcy5pc09mZmxpbmUgPSBwYXJzZUludCh0aGlzLnRoZVJlcXVlc3RbJ2lzT2ZmbGluZSddKTsgLy/nprvnur/mqKHlvI9cblxuICAgICAgICByZXR1cm4gdGhpcy50aGVSZXF1ZXN0O1xuICAgIH1cblxuICAgIHB1YmxpYyBHZXRCUHJlbG9hZCgpIHtcbiAgICAgICAgbGV0IEJQcmVsb2FkID0gMDtcbiAgICAgICAgaWYgKHRoaXMuR2V0UmVxdWVzdCgpWydiUHJlbG9hZCddKSB7XG4gICAgICAgICAgICBCUHJlbG9hZCA9IHRoaXMuR2V0UmVxdWVzdCgpWydiUHJlbG9hZCddO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCUHJlbG9hZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgR2V0SXNPbmxpbmUoKSB7XG4gICAgICAgIGxldCBpc09ubGluZSA9ICd0ZXN0JztcbiAgICAgICAgaWYgKHRoaXMuR2V0UmVxdWVzdCgpWydlbnYnXSkge1xuICAgICAgICAgICAgaXNPbmxpbmUgPSB0aGlzLkdldFJlcXVlc3QoKVsnZW52J107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGlzT25saW5lO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IE5ldFdvcmsgPSBOZXRXb3JrQ2xhc3MuZ2V0SW5zdGFuY2UoKTtcbiJdfQ==