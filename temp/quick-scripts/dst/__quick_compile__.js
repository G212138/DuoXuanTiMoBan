
(function () {
var scripts = [{"deps":{"./assets/frame/scripts/Data/FrameMsgType":2,"./assets/game/scripts/UI/Item/SoundConfig":3,"./assets/game/scripts/SkeletonExt":4,"./assets/frame/scripts/Manager/ListenerManager":5,"./assets/frame/scripts/Utils/BoundingBoxHelp":9,"./assets/game/scripts/Data/EventType":10,"./assets/frame/scripts/SDK/GameMsg":12,"./assets/frame/scripts/UI/AdaptiveScreen":15,"./assets/frame/scripts/UI/BindNode":21,"./assets/frame/scripts/UI/Item/Tip":24,"./assets/frame/scripts/Utils/MathUtils":31,"./assets/frame/scripts/Utils/Tools":35,"./assets/frame/scripts/Utils/HitTest":36,"./assets/frame/scripts/Data/FrameConstValue":38,"./assets/frame/scripts/Data/FrameSyncData":40,"./assets/game/scripts/Manager/GameManager":45,"./assets/game/scripts/Data/CustomSyncData":46,"./assets/game/scripts/Data/ConstValue":47,"./assets/game/scripts/Manager/EditorManager":49,"./assets/frame/scripts/UI/Item/MaskGlobal":1,"./assets/frame/scripts/Http/NetWork":6,"./assets/frame/scripts/SDK/T2M":7,"./assets/frame/scripts/Manager/SyncDataManager":11,"./assets/frame/scripts/Manager/SoundManager":13,"./assets/frame/scripts/Manager/UIManager":16,"./assets/frame/scripts/Manager/ReportManager":14,"./assets/frame/scripts/UI/BaseFrameUI":17,"./assets/frame/scripts/UI/BaseUI":19,"./assets/frame/scripts/UI/Panel/BaseTeacherPanel":8,"./assets/frame/scripts/UI/GameMain":25,"./assets/frame/scripts/Utils/BoundingBoxDemo":39,"./assets/frame/scripts/Utils/AudioPlayExtension":41,"./assets/frame/scripts/Utils/UIHelp":42,"./assets/frame/scripts/UI/Item/replayBtn":18,"./assets/frame/scripts/UI/Item/TitleNode":20,"./assets/frame/scripts/UI/Item/MaskRecover":22,"./assets/frame/scripts/UI/Item/TeacherPanelLoading":23,"./assets/frame/scripts/UI/Panel/ErrorPanel":26,"./assets/frame/scripts/UI/Panel/BaseGamePanel":27,"./assets/frame/scripts/UI/Panel/OverTips":28,"./assets/frame/scripts/UI/Panel/StarCount":29,"./assets/frame/scripts/UI/Panel/TipUI":32,"./assets/frame/scripts/UI/Panel/LoadingUI":30,"./assets/frame/scripts/UI/Panel/SubmissionPanel":33,"./assets/frame/scripts/UI/Panel/AffirmTips":34,"./assets/frame/scripts/UI/Panel/UploadAndReturnPanel":37,"./assets/game/scripts/UI/Components/ButtonSync":44,"./assets/game/scripts/UI/panel/TeacherPanel":43,"./assets/game/scripts/UI/Item/OptionNode":48,"./assets/game/scripts/UI/panel/GamePanel":50,"./assets/game/scripts/UI/Item/GameUI":51},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../../Manager/ListenerManager":5,"../../Manager/UIManager":16,"../../Data/FrameMsgType":2,"../../Utils/UIHelp":42,"../BindNode":21},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskGlobal.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameMsgType.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/UI/Item/SoundConfig.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/SkeletonExt.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Manager/ListenerManager.js"},{"deps":{"../Manager/UIManager":16,"../../../game/scripts/Data/ConstValue":47,"../Utils/UIHelp":42,"../SDK/GameMsg":12},"path":"preview-scripts/assets/frame/scripts/Http/NetWork.js"},{"deps":{"../Utils/UIHelp":42,"../Http/NetWork":6,"../Manager/ListenerManager":5,"../Data/FrameMsgType":2,"./GameMsg":12,"../Manager/SyncDataManager":11},"path":"preview-scripts/assets/frame/scripts/SDK/T2M.js"},{"deps":{"../../../../game/scripts/Manager/EditorManager":49,"../../../../game/scripts/Data/ConstValue":47,"../../Utils/UIHelp":42,"../BaseUI":19,"../../Http/NetWork":6},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseTeacherPanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxHelp.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/EventType.js"},{"deps":{"../../../frame/scripts/Data/FrameSyncData":40,"../../../frame/scripts/Manager/ReportManager":14,"../../../game/scripts/Data/CustomSyncData":46},"path":"preview-scripts/assets/frame/scripts/Manager/SyncDataManager.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/SDK/GameMsg.js"},{"deps":{"../Data/FrameConstValue":38,"../SDK/GameMsg":12,"../Http/NetWork":6,"../Data/FrameMsgType":2,"./ListenerManager":5,"./UIManager":16},"path":"preview-scripts/assets/frame/scripts/Manager/SoundManager.js"},{"deps":{"../SDK/GameMsg":12,"../../../game/scripts/Data/ConstValue":47,"../../../game/scripts/Manager/EditorManager":49},"path":"preview-scripts/assets/frame/scripts/Manager/ReportManager.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/AdaptiveScreen.js"},{"deps":{"../UI/BaseUI":19},"path":"preview-scripts/assets/frame/scripts/Manager/UIManager.js"},{"deps":{"../Data/FrameConstValue":38,"./BaseUI":19},"path":"preview-scripts/assets/frame/scripts/UI/BaseFrameUI.js"},{"deps":{"../../Data/FrameMsgType":2,"../../SDK/T2M":7},"path":"preview-scripts/assets/frame/scripts/UI/Item/replayBtn.js"},{"deps":{"../Manager/ListenerManager":5,"../Data/FrameConstValue":38,"./BindNode":21},"path":"preview-scripts/assets/frame/scripts/UI/BaseUI.js"},{"deps":{"../../Manager/ListenerManager":5,"../../Data/FrameMsgType":2},"path":"preview-scripts/assets/frame/scripts/UI/Item/TitleNode.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/BindNode.js"},{"deps":{"../../Data/FrameMsgType":2,"../../Manager/ListenerManager":5,"../../Manager/UIManager":16,"../BindNode":21},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskRecover.js"},{"deps":{"../../Data/FrameMsgType":2,"../../Manager/ListenerManager":5,"../BindNode":21},"path":"preview-scripts/assets/frame/scripts/UI/Item/TeacherPanelLoading.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/Item/Tip.js"},{"deps":{"../../../game/scripts/Manager/EditorManager":49,"../Manager/ListenerManager":5,"../Data/FrameMsgType":2,"../Manager/ReportManager":14,"../Manager/SoundManager":13,"../Http/NetWork":6,"../SDK/GameMsg":12,"../Manager/UIManager":16,"../Manager/SyncDataManager":11,"../Utils/UIHelp":42,"../SDK/T2M":7},"path":"preview-scripts/assets/frame/scripts/UI/GameMain.js"},{"deps":{"./../BaseFrameUI":17,"../../Utils/UIHelp":42,"./../../Manager/SoundManager":13,"./../../SDK/GameMsg":12},"path":"preview-scripts/assets/frame/scripts/UI/Panel/ErrorPanel.js"},{"deps":{"../../Data/FrameMsgType":2,"../../Manager/ListenerManager":5,"../../Http/NetWork":6,"../../../../game/scripts/Data/ConstValue":47,"../../../../game/scripts/Manager/EditorManager":49,"../../Manager/ReportManager":14,"../../Manager/UIManager":16,"../../Manager/SyncDataManager":11,"../../SDK/T2M":7,"../../Manager/SoundManager":13,"../../Utils/UIHelp":42,"../../SDK/GameMsg":12,"../BaseUI":19},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseGamePanel.js"},{"deps":{"../../Utils/Tools":35,"./../../Manager/SoundManager":13,"../../Utils/UIHelp":42,"../../Manager/UIManager":16,"../BaseFrameUI":17,"../../../../game/scripts/Data/ConstValue":47,"../../Data/FrameMsgType":2,"../../SDK/T2M":7},"path":"preview-scripts/assets/frame/scripts/UI/Panel/OverTips.js"},{"deps":{"../../Utils/Tools":35,"../../../../game/scripts/Manager/EditorManager":49,"../BaseFrameUI":17,"../../../../game/scripts/Data/ConstValue":47,"../../Utils/UIHelp":42,"./../../Manager/SoundManager":13,"../../Manager/ReportManager":14},"path":"preview-scripts/assets/frame/scripts/UI/Panel/StarCount.js"},{"deps":{"../../Manager/SoundManager":13,"../../../../game/scripts/Data/ConstValue":47,"../../../../game/scripts/UI/panel/GamePanel":50,"../../SDK/GameMsg":12,"../../Http/NetWork":6,"../BaseFrameUI":17,"../../../../game/scripts/UI/panel/TeacherPanel":43,"../../Manager/UIManager":16},"path":"preview-scripts/assets/frame/scripts/UI/Panel/LoadingUI.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/MathUtils.js"},{"deps":{"../BaseFrameUI":17,"../Item/Tip":24},"path":"preview-scripts/assets/frame/scripts/UI/Panel/TipUI.js"},{"deps":{"../BaseFrameUI":17,"../../Http/NetWork":6,"../../Utils/UIHelp":42,"../../../../game/scripts/Data/ConstValue":47,"../../../../game/scripts/Manager/EditorManager":49},"path":"preview-scripts/assets/frame/scripts/UI/Panel/SubmissionPanel.js"},{"deps":{"../../Data/FrameMsgType":2,"../BaseFrameUI":17,"../../Utils/UIHelp":42,"../../SDK/T2M":7},"path":"preview-scripts/assets/frame/scripts/UI/Panel/AffirmTips.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/Tools.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/HitTest.js"},{"deps":{"./../../Manager/ListenerManager":5,"../BaseFrameUI":17,"../../Data/FrameMsgType":2,"../../Utils/UIHelp":42,"../../Manager/ReportManager":14,"../../../../game/scripts/Manager/EditorManager":49,"../../Manager/SoundManager":13,"../../SDK/T2M":7},"path":"preview-scripts/assets/frame/scripts/UI/Panel/UploadAndReturnPanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameConstValue.js"},{"deps":{"./BoundingBoxHelp":9},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxDemo.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameSyncData.js"},{"deps":{"./../Manager/SoundManager":13},"path":"preview-scripts/assets/frame/scripts/Utils/AudioPlayExtension.js"},{"deps":{"../../../game/scripts/UI/panel/GamePanel":50,"../Manager/UIManager":16,"../Data/FrameMsgType":2,"../../../game/scripts/UI/panel/TeacherPanel":43,"../UI/Panel/OverTips":28,"../UI/Panel/AffirmTips":34,"../UI/Panel/ErrorPanel":26,"../UI/Panel/StarCount":29,"../UI/Panel/UploadAndReturnPanel":37,"../Manager/ListenerManager":5,"../UI/Panel/SubmissionPanel":33,"../UI/Panel/TipUI":32},"path":"preview-scripts/assets/frame/scripts/Utils/UIHelp.js"},{"deps":{"../../../../frame/scripts/Manager/ReportManager":14,"../../../../frame/scripts/Data/FrameMsgType":2,"../../../../frame/scripts/Manager/ListenerManager":5,"../../../../frame/scripts/Manager/UIManager":16,"../../../../frame/scripts/UI/Panel/BaseTeacherPanel":8,"./GamePanel":50,"../../../../frame/scripts/Utils/UIHelp":42,"../../Manager/EditorManager":49,"../../Data/ConstValue":47},"path":"preview-scripts/assets/game/scripts/UI/panel/TeacherPanel.js"},{"deps":{"../../../../frame/scripts/SDK/T2M":7},"path":"preview-scripts/assets/game/scripts/UI/Components/ButtonSync.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/GameManager.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/CustomSyncData.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/ConstValue.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":5,"../../../../frame/scripts/Manager/SyncDataManager":11,"../../Data/EventType":10,"../../../../frame/scripts/Utils/Tools":35,"../../Manager/EditorManager":49,"./SoundConfig":3,"../../../../frame/scripts/Manager/SoundManager":13},"path":"preview-scripts/assets/game/scripts/UI/Item/OptionNode.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/EditorManager.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":5,"../../../../frame/scripts/UI/Panel/BaseGamePanel":27,"../../../../frame/scripts/Manager/SyncDataManager":11,"../../Data/EventType":10},"path":"preview-scripts/assets/game/scripts/UI/panel/GamePanel.js"},{"deps":{"../../../../frame/scripts/Manager/ListenerManager":5,"../../../../frame/scripts/Utils/UIHelp":42,"../../../../frame/scripts/Http/NetWork":6,"../../../../frame/scripts/Manager/SoundManager":13,"../../../../frame/scripts/SDK/T2M":7,"../../../../frame/scripts/Manager/SyncDataManager":11,"../../../../frame/scripts/Utils/Tools":35,"./OptionNode":48,"../../Manager/EditorManager":49,"../../Data/EventType":10,"./SoundConfig":3},"path":"preview-scripts/assets/game/scripts/UI/Item/GameUI.js"}];
var entries = ["preview-scripts/__qc_index__.js"];
var bundleScript = 'preview-scripts/__qc_bundle__.js';

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

// Will generated by module.js plugin
// var scripts = ${scripts};
// var entries = ${entries};
// var bundleScript = ${bundleScript};

if (typeof global === 'undefined') {
    window.global = window;
}

var isJSB = typeof jsb !== 'undefined';

function getXMLHttpRequest () {
    return window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('MSXML2.XMLHTTP');
}

function downloadText(url, callback) {
    if (isJSB) {
        var result = jsb.fileUtils.getStringFromFile(url);
        callback(null, result);
        return;
    }

    var xhr = getXMLHttpRequest(),
        errInfo = 'Load text file failed: ' + url;
    xhr.open('GET', url, true);
    if (xhr.overrideMimeType) xhr.overrideMimeType('text\/plain; charset=utf-8');
    xhr.onload = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(null, xhr.responseText);
            }
            else {
                callback({status:xhr.status, errorMessage:errInfo + ', status: ' + xhr.status});
            }
        }
        else {
            callback({status:xhr.status, errorMessage:errInfo + '(wrong readyState)'});
        }
    };
    xhr.onerror = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(error)'});
    };
    xhr.ontimeout = function(){
        callback({status:xhr.status, errorMessage:errInfo + '(time out)'});
    };
    xhr.send(null);
};

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            let depIndex = m.deps[request];
            // dependence script was excluded
            if (depIndex === -1) {
                return null;
            }
            else {
                requestScript = scripts[ m.deps[request] ];
            }
        }
        
        let requestPath = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                requestPath = name2path[request];
            }

            if (!requestPath) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            requestPath = formatPath(requestScript.path);
        }

        let requestModule = modules[requestPath];
        if (!requestModule) {
            console.warn('Can not find request module for path : ' + requestPath);
            return null;
        }

        if (!requestModule.module && requestModule.func) {
            requestModule.func();
        }

        if (!requestModule.module) {
            console.warn('Can not find requestModule.module for path : ' + path);
            return null;
        }

        return requestModule.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;

            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
            return path;
        });

        console.time && console.time('load __quick_compile_project__');
        // jsb can not analysis sourcemap, so keep separate files.
        if (bundleScript && !isJSB) {
            downloadText(formatPath(bundleScript), function (err, bundleSource) {
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                if (err) {
                    console.error(err);
                    return;
                }

                let evalTime = 'eval __quick_compile_project__ : ' + srcs.length + ' files';
                console.time && console.time(evalTime);
                var sources = bundleSource.split('\n//------QC-SOURCE-SPLIT------\n');
                for (var i = 0; i < sources.length; i++) {
                    if (sources[i]) {
                        window.eval(sources[i]);
                        // not sure why new Function cannot set breakpoints precisely
                        // new Function(sources[i])()
                    }
                }
                self.run();
                console.timeEnd && console.timeEnd(evalTime);
                cb();
            })
        }
        else {
            loadScripts(srcs, function () {
                self.run();
                console.timeEnd && console.timeEnd('load __quick_compile_project__');
                cb();
            });
        }
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    