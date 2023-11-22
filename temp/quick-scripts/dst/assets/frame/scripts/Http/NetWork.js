
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
        // public readonly BASE = this.isOnlineEnv ? 'https://courseware-online.saasp.vdyoo.com' : 'https://ceshi-courseware-online.saasp.vdyoo.com';
        // public readonly COS_URL = this.isOnlineEnv ?
        //     'https://classroom-api-online.saasp.vdyoo.com/micro-class/storage/v1/tencent/sts'
        //     : 'https://test-class-api-online.saasp.vdyoo.com/micro-class/storage/v1/tencent/sts';
        // public readonly COS_BASE_URL = this.isOnlineEnv ? 'https://micro-class.xuepeiyou.com/' : 'https://micro-class-test.xuepeiyou.com/';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZnJhbWVcXHNjcmlwdHNcXEh0dHBcXE5ldFdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQW1FO0FBQ25FLGtEQUFpRDtBQUNqRCwwQ0FBcUM7QUFDckMsMENBQXlDO0FBQ3pDO0lBQUE7UUFHSSw0QkFBNEI7UUFDWixnQkFBVyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxRQUFRLENBQUM7UUFDN0QsbUNBQW1DO1FBQ25CLFdBQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUIsU0FBSSxHQUFHLElBQUksQ0FBQyxXQUFXO1lBQ25DLENBQUMsQ0FBQyx1Q0FBdUM7WUFDekMsQ0FBQyxDQUFDLHNDQUFzQyxDQUFDO1FBQzdDLDZJQUE2STtRQUM3SSwrQ0FBK0M7UUFDL0Msd0ZBQXdGO1FBQ3hGLDRGQUE0RjtRQUM1RixzSUFBc0k7UUFHdEgsaUJBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztRQUNsQyxzQkFBaUIsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztRQUM5QyxjQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7UUFDckMsUUFBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLFdBQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUMvQixVQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7UUFFdEMsVUFBSyxHQUFZLEtBQUssQ0FBQyxDQUFDLDZCQUE2QjtRQUU1RCxPQUFPO1FBQ0EsV0FBTSxHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU07UUFDckIsY0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLE9BQU87UUFDekIsaUJBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxzQkFBc0I7UUFDM0MsWUFBTyxHQUFHLElBQUksQ0FBQyxD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QUFVLENBQUMsRUFBRTtZQUMvQixRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVNLGtDQUFXLEdBQWxCO1FBQ0ksSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzFCLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQXRRQSxBQXNRQyxJQUFBO0FBdFFZLG9DQUFZO0FBd1FaLFFBQUEsT0FBTyxHQUFHLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0VmFsdWUgfSBmcm9tICcuLi8uLi8uLi9nYW1lL3NjcmlwdHMvRGF0YS9Db25zdFZhbHVlJztcbmltcG9ydCB7IFVJTWFuYWdlciB9IGZyb20gJy4uL01hbmFnZXIvVUlNYW5hZ2VyJztcbmltcG9ydCBHYW1lTXNnIGZyb20gJy4uL1NESy9HYW1lTXNnJztcbmltcG9ydCB7IFVJSGVscCB9IGZyb20gJy4uL1V0aWxzL1VJSGVscCc7XG5leHBvcnQgY2xhc3MgTmV0V29ya0NsYXNzIHtcbiAgICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogTmV0V29ya0NsYXNzO1xuXG4gICAgLy/liKTmlq3mmK/lkKbmmK/nur/kuIogICBVUkzph4zkuI3liqDlj4LmlbDliJnpu5jorqTkuLrmtYvor5Xnjq/looNcbiAgICBwdWJsaWMgcmVhZG9ubHkgaXNPbmxpbmVFbnYgPSB0aGlzLkdldElzT25saW5lKCkgPT0gJ29ubGluZSc7XG4gICAgLy/liKTmlq3mmK/lkKbmmK9wY+mihOWKoOi9veeahOWNj+iuriAgICBVUkzph4zkuI3liqDlj4LmlbDliJnpu5jorqTkuLrpnZ7pooTliqDovb1cbiAgICBwdWJsaWMgcmVhZG9ubHkgaXNPd2NyID0gdGhpcy5HZXRCUHJlbG9hZCgpO1xuICAgIHB1YmxpYyByZWFkb25seSBCQVNFID0gdGhpcy5pc09ubGluZUVudlxuICAgICAgICA/ICdodHRwczovL2NvdXJzZXdhcmUtb25saW5lLnNwZWl5b3UuY29tJ1xuICAgICAgICA6ICdodHRwczovL2Nlc2hpLWNvdXJzZXdhcmUuc3BlaXlvdS5jb20nO1xuICAgIC8vIHB1YmxpYyByZWFkb25seSBCQVNFID0gdGhpcy5pc09ubGluZUVudiA/ICdodHRwczovL2NvdXJzZXdhcmUtb25saW5lLnNhYXNwLnZkeW9vLmNvbScgOiAnaHR0cHM6Ly9jZXNoaS1jb3Vyc2V3YXJlLW9ubGluZS5zYWFzcC52ZHlvby5jb20nO1xuICAgIC8vIHB1YmxpYyByZWFkb25seSBDT1NfVVJMID0gdGhpcy5pc09ubGluZUVudiA/XG4gICAgLy8gICAgICdodHRwczovL2NsYXNzcm9vbS1hcGktb25saW5lLnNhYXNwLnZkeW9vLmNvbS9taWNyby1jbGFzcy9zdG9yYWdlL3YxL3RlbmNlbnQvc3RzJ1xuICAgIC8vICAgICA6ICdodHRwczovL3Rlc3QtY2xhc3MtYXBpLW9ubGluZS5zYWFzcC52ZHlvby5jb20vbWljcm8tY2xhc3Mvc3RvcmFnZS92MS90ZW5jZW50L3N0cyc7XG4gICAgLy8gcHVibGljIHJlYWRvbmx5IENPU19CQVNFX1VSTCA9IHRoaXMuaXNPbmxpbmVFbnYgPyAnaHR0cHM6Ly9taWNyby1jbGFzcy54dWVwZWl5b3UuY29tLycgOiAnaHR0cHM6Ly9taWNyby1jbGFzcy10ZXN0Lnh1ZXBlaXlvdS5jb20vJztcblxuXG4gICAgcHVibGljIHJlYWRvbmx5IEdFVF9RVUVTVElPTiA9IHRoaXMuQkFTRSArICcvZ2V0JztcbiAgICBwdWJsaWMgcmVhZG9ubHkgR0VUX1VTRVJfUFJPR1JFU1MgPSB0aGlzLkJBU0UgKyAnL2dldC9hbnN3ZXInO1xuICAgIHB1YmxpYyByZWFkb25seSBHRVRfVElUTEUgPSB0aGlzLkJBU0UgKyAnL2dldC90aXRsZSc7XG4gICAgcHVibGljIHJlYWRvbmx5IEFERCA9IHRoaXMuQkFTRSArICcvYWRkJztcbiAgICBwdWJsaWMgcmVhZG9ubHkgTU9ESUZZID0gdGhpcy5CQVNFICsgJy9tb2RpZnknO1xuICAgIHB1YmxpYyByZWFkb25seSBDTEVBUiA9IHRoaXMuQkFTRSArICcvY2xlYXInO1xuXG4gICAgcHVibGljIGVtcHR5OiBib29sZWFuID0gZmFsc2U7IC8v5riF55CG6ISP5pWw5o2u55qE5byA5YWz77yM5ZyoVVJM6YeM6Z2i5ou85q2k5Y+C5pWwID0gdHJ1Ze+8m1xuXG4gICAgLy/mlrDor77loILlj4LmlbBcbiAgICBwdWJsaWMgdXNlcklkID0gbnVsbDsgLy/nlKjmiLdpZFxuICAgIHB1YmxpYyBjaGFwdGVySWQgPSBudWxsOyAvL+ebtOaSreiusmlkXG4gICAgcHVibGljIGNvdXJzZXdhcmVJZCA9IG51bGw7IC8v6aKY55uu5L+h5oGvICAg55So5LqO5Lqk5LqS5ri45oiP6Ieq6Lqr5p+l6aKY55uu5L+h5oGvXG4gICAgcHVibGljIHRpdGxlSWQgPSBudWxsOyAvL+S6pOS6kua4uOaIj+e7keWummlkICAg57uR5a6a55qE5pe25YCZ55So77yI55uR6K++5bmz5Y+w77yJICDlrabnlJ/nq6/kuI3kvKBcbiAgICBwdWJsaWMgYkxpdmUgPSBudWxsOyAvL+aYr+WQpuaYr+ebtOaSrVxuICAgIHB1YmxpYyBiUHJlbG9hZCA9IG51bGw7IC8v5piv5ZCm6aKE5Yqg6L29ICDvvIhjZG4vemlwKVxuICAgIHB1YmxpYyBlbnYgPSBudWxsOyAvL+i/kOihjOeOr+Wig++8iOe6v+S4ii/mtYvor5XvvIlcbiAgICBwdWJsaWMgYXBwID0gbnVsbDsgLy9BcHDlkI3np7BcbiAgICBwdWJsaWMgcGxhdGZvcm0gPSBudWxsOyAvL+ehrOS7tuW5s+WPsOS/oeaBr++8iHBjL2lQYWQvYW5kcm9pZC9hbmRyb2lkUGFkL3dlYu+8iVxuICAgIHB1YmxpYyBjaGFubmVsID0gbnVsbDsgLy/kvb/nlKjmlrko6L6F5a+856uv44CB5a2m55Sf56uv44CB5pyq5p2l6buR5p2/44CB6YWN6b2Q44CB5pWZ56CU5LqR44CB4oCm4oCm77yJXG4gICAgcHVibGljIGJyb3dzZXIgPSBudWxsOyAvL+a1j+iniOWZqOS/oeaBr++8iOWGheaguOWPiueJiOacrO+8iVxuICAgIHB1YmxpYyBhcHBWZXJzaW9uID0gbnVsbDsgLy/nq6/nmoTniYjmnKzkv6Hmga9cbiAgICBwdWJsaWMgaXNUZWFjaGVyID0gZmFsc2U7IC8v5piv5ZCm5Li65pWZ5biI77yI6YCa6L+H5ZCM5q2l55qEZ2V0X3JvbGXov5Tlm57nmoTmmK/lkKbkuLondGVhY2hlcifvvIlcbiAgICBwdWJsaWMgaXNTeW5jID0gZmFsc2U7IC8v5piv5ZCm5Li65ZCM5q2l77yI6YCa6L+H5ZCM5q2l55qEZ2V0X2lzX3N5bmPov5Tlm57mmK/lkKbkuLoxL3RydWXvvIlcbiAgICBwdWJsaWMgaXNPZmZsaW5lID0gMDsgLy/mmK/lkKbkuLrnprvnur/mqKHlvI9cbiAgICBwdWJsaWMgaXNNYXN0ZXIgPSBudWxsOyAvL+aYr+WQpuaYr+S4u+WKqOWPkeW/g+i3s+eahOS4gOaWuVxuICAgIHB1YmxpYyBpc1N1cHBvcnRLZWVwUGxheSA9IGZhbHNlOyAvL+aYr+WQpuaUr+aMgeaOpeedgOeOqemHjeaWsOeOqVxuXG4gICAgcHVibGljIHRoZVJlcXVlc3QgPSBudWxsO1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBOZXRXb3JrQ2xhc3MoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SXNTeW5jKGlzU3luYzogYm9vbGVhbikge1xuICAgICAgICBpc1N5bmMgPSBpc1N5bmMgPT0gbnVsbCA/IGZhbHNlIDogaXNTeW5jO1xuICAgICAgICBOZXRXb3JrLmlzU3luYyA9IGlzU3luYztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SXNUZWFjaGVyKHJvbGU6IHN0cmluZykge1xuICAgICAgICBsZXQgaXNUZWFjaGVyID0gcm9sZSA9PSAndGVhY2hlcic7XG4gICAgICAgIE5ldFdvcmsuaXNUZWFjaGVyID0gaXNUZWFjaGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJc1ByZWxvYWQoaXNQcmVsb2FkOiBib29sZWFuKSB7XG4gICAgICAgIGlzUHJlbG9hZCA9IGlzUHJlbG9hZCA9PSBudWxsID8gZmFsc2UgOiBpc1ByZWxvYWQ7XG4gICAgICAgIFVJTWFuYWdlci5pc0dhbWVTaG93aW5nID0gIWlzUHJlbG9hZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0SXNNYXN0ZXIoaXNNYXN0ZXI6IGJvb2xlYW4pIHtcbiAgICAgICAgaXNNYXN0ZXIgPSBpc01hc3RlciA9PSBudWxsID8gZmFsc2UgOiBpc01hc3RlcjtcbiAgICAgICAgTmV0V29yay5pc01hc3RlciA9IGlzTWFzdGVyO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRJc1N1cHBvcnRLZWVwUGxheShpc1N1cHBvcnRLZWVwUGxheTogYm9vbGVhbikge1xuICAgICAgICBOZXRXb3JrLmlzU3VwcG9ydEtlZXBQbGF5ID0gaXNTdXBwb3J0S2VlcFBsYXk7XG4gICAgICAgIGlmICghaXNTdXBwb3J0S2VlcFBsYXkpIHtcbiAgICAgICAgICAgIE5ldFdvcmsuaXNNYXN0ZXIgPSBOZXRXb3JrLmlzVGVhY2hlcjtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhgaXNTdXBwb3J0S2VlcFBsYXk6ICR7aXNTdXBwb3J0S2VlcFBsYXl9YCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K+35rGC572R57ucUG9zdCAw5oiQ5YqfIDHotoXml7ZcbiAgICAgKiBAcGFyYW0gdXJsXG4gICAgICogQHBhcmFtIG9wZW5UeXBlXG4gICAgICogQHBhcmFtIGNvbnRlbnRUeXBlXG4gICAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHBhcmFtc1xuICAgICAqL1xuICAgIHB1YmxpYyBodHRwUmVxdWVzdCh1cmw6IHN0cmluZywgb3BlblR5cGUsIGNvbnRlbnRUeXBlLCBjYWxsYmFjayA9IG51bGwsIHBhcmFtcyA9ICcnKSB7XG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0t56a757q/5qih5byPLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBpZiAodGhpcy5pc09mZmxpbmUgJiYgdXJsLnN1YnN0cmluZygwLCB0aGlzLkdFVF9RVUVTVElPTi5sZW5ndGgpID09IHRoaXMuR0VUX1FVRVNUSU9OKSB7XG4gICAgICAgICAgICBHYW1lTXNnLnJlY3ZfanNvbl9kYXRhKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3JlY3ZfanNvbl9kYXRhOicsIGRhdGEpO1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjayAmJiBkYXRhLmpzb25EYXRhLmVycmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSwgZGF0YS5qc29uRGF0YSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5qc29uRGF0YS5lcnJtc2cgKyAnLOivt+iBlOezu+Wuouacje+8gScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ+ehruWumicsXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwUmVxdWVzdCh1cmwsIG9wZW5UeXBlLCBjb250ZW50VHlwZSwgY2FsbGJhY2ssIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBHYW1lTXNnLnJlcXVlc3RfanNvbl9kYXRhKHsgY291cnNld2FyZUlkOiB0aGlzLmNvdXJzZXdhcmVJZCB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChDb25zdFZhbHVlLklTX1RFQUNIRVIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy50aXRsZUlkKSB7XG4gICAgICAgICAgICAgICAgLy/mlZnluIjnq6/msqHmnIl0aXRsZUlk55qE5oOF5Ya1XG4gICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKCdVUkzlj4LmlbDplJnor68s57y65bCRdGl0bGVJZCzor7fogZTns7vmioDmnK/kurrlkZjvvIEnLCAnJywgJycsICfnoa7lrponKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL+aWsOivvuWgguWtpueUn+erryAg5Yik5pat5omA5pyJ5Y+C5pWwXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIUNvbnN0VmFsdWUuSVNfVEVBQ0hFUiAmJlxuICAgICAgICAgICAgICAgICghdGhpcy51c2VySWQgfHwgIXRoaXMuY291cnNld2FyZUlkIHx8ICF0aGlzLmVudiB8fCAhdGhpcy5hcHAgfHwgIXRoaXMuY2hhbm5lbCB8fCAhdGhpcy5icm93c2VyKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgR2FtZU1zZy5VUkxFcnJvcih0aGlzLnRoZVJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIFVJSGVscC5zaG93RXJyb3JQYW5lbCgnVVJM5Y+C5pWw6ZSZ6K+vLOivt+iBlOezu+Wuouacje+8gScsICcnLCAnJywgJ+ehruWumicpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgeGhyLm9wZW4ob3BlblR5cGUsIHVybCk7XG4gICAgICAgIHhoci50aW1lb3V0ID0gMTAwMDA7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCBjb250ZW50VHlwZSk7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gICAgICAgIC8v5Zue6LCDXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICAgICAgICAnaHR0cFJlcXVlc3QgcnNwIHN0YXR1cycsXG4gICAgICAgICAgICAgICAgeGhyLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAnICAgICAgICB4aHIucmVhZHlTdGF0ZScsXG4gICAgICAgICAgICAgICAgeGhyLnJlYWR5U3RhdGUsXG4gICAgICAgICAgICAgICAgJyAgICAgICAgeGhyLnJlc3BvbnNlVGV4dCcsXG4gICAgICAgICAgICAgICAgeGhyLnJlc3BvbnNlVGV4dCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDw9IDQwMCkge1xuICAgICAgICAgICAgICAgIGxldCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIHJlc3BvbnNlLmVycmNvZGUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhmYWxzZSwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIEdhbWVNc2cuaHR0cEVycm9yKHJlc3BvbnNlLmVycm1zZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChDb25zdFZhbHVlLklTX0VESVRJT05TKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBVSUhlbHAuc2hvd0Vycm9yUGFuZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZXJybXNnICsgJyzor7fogZTns7vlrqLmnI3vvIEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICfnoa7lrponLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwUmVxdWVzdCh1cmwsIG9wZW5UeXBlLCBjb250ZW50VHlwZSwgY2FsbGJhY2ssIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy/otoXml7blm57osINcbiAgICAgICAgeGhyLm9udGltZW91dCA9IChldmVudCkgPT4ge1xuICAgICAgICAgICAgR2FtZU1zZy5odHRwVGltZU91dCgn572R57uc5LiN5L2z77yM6K+356iN5ZCO6YeN6K+VJyk7XG4gICAgICAgICAgICBpZiAoQ29uc3RWYWx1ZS5JU19FRElUSU9OUykge1xuICAgICAgICAgICAgICAgIFVJSGVscC5zaG93RXJyb3JQYW5lbChcbiAgICAgICAgICAgICAgICAgICAgJ+e9kee7nOS4jeS9s++8jOivt+eojeWQjumHjeivlScsXG4gICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAn6Iul6YeN5paw6L+e5o6l5peg5pWI77yM6K+36IGU57O75a6i5pyNJyxcbiAgICAgICAgICAgICAgICAgICAgJ+mHjeaWsOi/nuaOpScsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cFJlcXVlc3QodXJsLCBvcGVuVHlwZSwgY29udGVudFR5cGUsIGNhbGxiYWNrLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaHR0cFJlcXVlc3QgdGltZW91dCcpO1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy/lh7rplJlcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGlmIChDb25zdFZhbHVlLklTX0VESVRJT05TKSB7XG4gICAgICAgICAgICAgICAgVUlIZWxwLnNob3dFcnJvclBhbmVsKFxuICAgICAgICAgICAgICAgICAgICAn572R57uc5Ye66ZSZ77yM6K+356iN5ZCO6YeN6K+VJyxcbiAgICAgICAgICAgICAgICAgICAgJ+iLpemHjeaWsOi/nuaOpeaXoOaViO+8jOivt+iBlOezu+WuouacjScsXG4gICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAn6YeN5paw6L+e5o6lJyxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwUmVxdWVzdCh1cmwsIG9wZW5UeXBlLCBjb250ZW50VHlwZSwgY2FsbGJhY2ssIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdodHRwUmVxdWVzdCBlcnJvcicpO1xuICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sodHJ1ZSwgbnVsbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgeGhyLnNlbmQocGFyYW1zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDojrflj5Z1cmzlj4LmlbBcbiAgICAgKi9cbiAgICBwdWJsaWMgR2V0UmVxdWVzdCgpIHtcbiAgICAgICAgaWYgKHRoaXMudGhlUmVxdWVzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50aGVSZXF1ZXN0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGhlUmVxdWVzdCA9IG5ldyBPYmplY3QoKTtcbiAgICAgICAgdmFyIHVybCA9IGxvY2F0aW9uLnNlYXJjaDsgLy/ojrflj5Z1cmzkuK1cIj9cIuespuWQjueahOWtl+S4slxuXG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignPycpICE9IC0xKSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gdXJsLnN1YnN0cigxKTtcbiAgICAgICAgICAgIHZhciBzdHJzID0gc3RyLnNwbGl0KCcmJyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRoZVJlcXVlc3Rbc3Ryc1tpXS5zcGxpdCgnPScpWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChzdHJzW2ldLnNwbGl0KCc9JylbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/mlrDor77loIJ1cmzlv4XpnIDlj4LmlbBcbiAgICAgICAgdGhpcy51c2VySWQgPSB0aGlzLnRoZVJlcXVlc3RbJ3VzZXJJZCddO1xuICAgICAgICB0aGlzLmNoYXB0ZXJJZCA9IHRoaXMudGhlUmVxdWVzdFsnY2hhcHRlcklkJ107XG4gICAgICAgIHRoaXMuY291cnNld2FyZUlkID0gdGhpcy50aGVSZXF1ZXN0Wydjb3Vyc2V3YXJlSWQnXTtcbiAgICAgICAgdGhpcy50aXRsZUlkID0gdGhpcy50aGVSZXF1ZXN0Wyd0aXRsZUlkJ107XG4gICAgICAgIHRoaXMuYkxpdmUgPSB0aGlzLnRoZVJlcXVlc3RbJ2JMaXZlJ107XG4gICAgICAgIHRoaXMuYlByZWxvYWQgPSB0aGlzLnRoZVJlcXVlc3RbJ2JQcmVsb2FkJ107XG4gICAgICAgIHRoaXMuZW52ID0gdGhpcy50aGVSZXF1ZXN0WydlbnYnXTtcbiAgICAgICAgdGhpcy5hcHAgPSB0aGlzLnRoZVJlcXVlc3RbJ2FwcCddO1xuICAgICAgICB0aGlzLnBsYXRmb3JtID0gdGhpcy50aGVSZXF1ZXN0WydwbGF0Zm9ybSddO1xuICAgICAgICB0aGlzLmNoYW5uZWwgPSB0aGlzLnRoZVJlcXVlc3RbJ2NoYW5uZWwnXTtcbiAgICAgICAgdGhpcy5icm93c2VyID0gdGhpcy50aGVSZXF1ZXN0Wydicm93c2VyJ107XG4gICAgICAgIHRoaXMuYXBwVmVyc2lvbiA9IHRoaXMudGhlUmVxdWVzdFsnYXBwVmVyc2lvbiddO1xuICAgICAgICB0aGlzLmVtcHR5ID0gdGhpcy50aGVSZXF1ZXN0WydlbXB0eSddO1xuICAgICAgICB0aGlzLmlzT2ZmbGluZSA9IHBhcnNlSW50KHRoaXMudGhlUmVxdWVzdFsnaXNPZmZsaW5lJ10pOyAvL+emu+e6v+aooeW8j1xuXG4gICAgICAgIHJldHVybiB0aGlzLnRoZVJlcXVlc3Q7XG4gICAgfVxuXG4gICAgcHVibGljIEdldEJQcmVsb2FkKCkge1xuICAgICAgICBsZXQgQlByZWxvYWQgPSAwO1xuICAgICAgICBpZiAodGhpcy5HZXRSZXF1ZXN0KClbJ2JQcmVsb2FkJ10pIHtcbiAgICAgICAgICAgIEJQcmVsb2FkID0gdGhpcy5HZXRSZXF1ZXN0KClbJ2JQcmVsb2FkJ107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEJQcmVsb2FkO1xuICAgIH1cblxuICAgIHB1YmxpYyBHZXRJc09ubGluZSgpIHtcbiAgICAgICAgbGV0IGlzT25saW5lID0gJ3Rlc3QnO1xuICAgICAgICBpZiAodGhpcy5HZXRSZXF1ZXN0KClbJ2VudiddKSB7XG4gICAgICAgICAgICBpc09ubGluZSA9IHRoaXMuR2V0UmVxdWVzdCgpWydlbnYnXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNPbmxpbmU7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgTmV0V29yayA9IE5ldFdvcmtDbGFzcy5nZXRJbnN0YW5jZSgpO1xuIl19