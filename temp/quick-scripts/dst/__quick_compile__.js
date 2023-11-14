
(function () {
var scripts = [{"deps":{"./assets/game/scripts/Data/CustomSyncData":2,"./assets/game/scripts/Manager/GameManager":4,"./assets/game/scripts/SkeletonExt":6,"./assets/frame/scripts/Data/FrameConstValue":9,"./assets/game/scripts/UI/Item/SoundConfig":14,"./assets/game/scripts/Data/ConstValue":15,"./assets/frame/scripts/Manager/ListenerManager":20,"./assets/frame/scripts/UI/BindNode":23,"./assets/frame/scripts/SDK/GameMsg":25,"./assets/frame/scripts/UI/AdaptiveScreen":27,"./assets/frame/scripts/UI/Item/Tip":28,"./assets/frame/scripts/Utils/BoundingBoxHelp":40,"./assets/frame/scripts/Utils/MathUtils":43,"./assets/frame/scripts/Data/FrameMsgType":44,"./assets/frame/scripts/Utils/Tools":45,"./assets/frame/scripts/Utils/HitTest":47,"./assets/frame/scripts/Data/FrameSyncData":49,"./assets/game/scripts/Data/EventType":50,"./assets/game/scripts/Manager/EditorManager":51,"./assets/game/scripts/UI/Item/OptionNode":1,"./assets/frame/scripts/Manager/SyncDataManager":5,"./assets/frame/scripts/UI/Item/MaskGlobal":3,"./assets/frame/scripts/Http/NetWork":10,"./assets/frame/scripts/SDK/T2M":11,"./assets/frame/scripts/Utils/BoundingBoxDemo":13,"./assets/game/scripts/UI/Components/ButtonSync":7,"./assets/game/scripts/UI/panel/TeacherPanel":8,"./assets/frame/scripts/UI/BaseFrameUI":18,"./assets/frame/scripts/Manager/SoundManager":19,"./assets/frame/scripts/Manager/UIManager":21,"./assets/frame/scripts/UI/BaseUI":22,"./assets/frame/scripts/Manager/ReportManager":24,"./assets/frame/scripts/UI/GameMain":29,"./assets/frame/scripts/UI/Panel/BaseGamePanel":12,"./assets/frame/scripts/Utils/UIHelp":46,"./assets/frame/scripts/Utils/AudioPlayExtension":48,"./assets/game/scripts/UI/panel/GamePanel":16,"./assets/game/scripts/UI/Item/GameUI":17,"./assets/frame/scripts/UI/Item/TeacherPanelLoading":26,"./assets/frame/scripts/UI/Item/TitleNode":30,"./assets/frame/scripts/UI/Item/MaskRecover":31,"./assets/frame/scripts/UI/Panel/BaseTeacherPanel":32,"./assets/frame/scripts/UI/Item/replayBtn":33,"./assets/frame/scripts/UI/Panel/ErrorPanel":34,"./assets/frame/scripts/UI/Panel/TipUI":35,"./assets/frame/scripts/UI/Panel/SubmissionPanel":36,"./assets/frame/scripts/UI/Panel/StarCount":37,"./assets/frame/scripts/UI/Panel/AffirmTips":38,"./assets/frame/scripts/UI/Panel/LoadingUI":39,"./assets/frame/scripts/UI/Panel/UploadAndReturnPanel":41,"./assets/frame/scripts/UI/Panel/OverTips":42},"path":"preview-scripts/__qc_index__.js"},{"deps":{"../../../../frame/scripts/Manager/SoundManager":19,"../../../../frame/scripts/Utils/Tools":45,"../../Data/EventType":50,"../../../../frame/scripts/Manager/ListenerManager":20,"../../../../frame/scripts/Manager/SyncDataManager":5,"./SoundConfig":14,"../../Manager/EditorManager":51},"path":"preview-scripts/assets/game/scripts/UI/Item/OptionNode.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/CustomSyncData.js"},{"deps":{"../../Data/FrameMsgType":44,"../../Manager/ListenerManager":20,"../../Manager/UIManager":21,"../BindNode":23,"../../Utils/UIHelp":46},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskGlobal.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/GameManager.js"},{"deps":{"../../../frame/scripts/Data/FrameSyncData":49,"../../../game/scripts/Data/CustomSyncData":2,"../../../frame/scripts/Manager/ReportManager":24},"path":"preview-scripts/assets/frame/scripts/Manager/SyncDataManager.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/SkeletonExt.js"},{"deps":{"../../../../frame/scripts/SDK/T2M":11},"path":"preview-scripts/assets/game/scripts/UI/Components/ButtonSync.js"},{"deps":{"../../../../frame/scripts/Data/FrameMsgType":44,"../../../../frame/scripts/Manager/ListenerManager":20,"../../../../frame/scripts/Manager/UIManager":21,"../../../../frame/scripts/Manager/ReportManager":24,"../../../../frame/scripts/UI/Panel/BaseTeacherPanel":32,"../../../../frame/scripts/Utils/UIHelp":46,"../../Data/ConstValue":15,"../../Manager/EditorManager":51,"./GamePanel":16},"path":"preview-scripts/assets/game/scripts/UI/panel/TeacherPanel.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameConstValue.js"},{"deps":{"../../../game/scripts/Data/ConstValue":15,"../SDK/GameMsg":25,"../Manager/UIManager":21,"../Utils/UIHelp":46},"path":"preview-scripts/assets/frame/scripts/Http/NetWork.js"},{"deps":{"../Data/FrameMsgType":44,"../Http/NetWork":10,"../Manager/ListenerManager":20,"../Manager/SyncDataManager":5,"../Utils/UIHelp":46,"./GameMsg":25},"path":"preview-scripts/assets/frame/scripts/SDK/T2M.js"},{"deps":{"../../Data/FrameMsgType":44,"../../../../game/scripts/Manager/EditorManager":51,"../../../../game/scripts/Data/ConstValue":15,"../../Manager/ListenerManager":20,"../../Http/NetWork":10,"../../SDK/GameMsg":25,"../../Manager/SoundManager":19,"../../Manager/SyncDataManager":5,"../../Manager/UIManager":21,"../BaseUI":22,"../../Manager/ReportManager":24,"../../Utils/UIHelp":46,"../../SDK/T2M":11},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseGamePanel.js"},{"deps":{"./BoundingBoxHelp":40},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxDemo.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/UI/Item/SoundConfig.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/ConstValue.js"},{"deps":{"../../Data/EventType":50,"../../../../frame/scripts/Manager/SyncDataManager":5,"../../../../frame/scripts/Manager/ListenerManager":20,"../../../../frame/scripts/UI/Panel/BaseGamePanel":12},"path":"preview-scripts/assets/game/scripts/UI/panel/GamePanel.js"},{"deps":{"../../../../frame/scripts/Manager/SoundManager":19,"../../../../frame/scripts/Http/NetWork":10,"../../../../frame/scripts/SDK/T2M":11,"../../../../frame/scripts/Manager/SyncDataManager":5,"../../../../frame/scripts/Utils/UIHelp":46,"../../../../frame/scripts/Manager/ListenerManager":20,"../../Manager/EditorManager":51,"./OptionNode":1,"../../../../frame/scripts/Utils/Tools":45,"../../Data/EventType":50,"./SoundConfig":14},"path":"preview-scripts/assets/game/scripts/UI/Item/GameUI.js"},{"deps":{"../Data/FrameConstValue":9,"./BaseUI":22},"path":"preview-scripts/assets/frame/scripts/UI/BaseFrameUI.js"},{"deps":{"../Data/FrameConstValue":9,"../Data/FrameMsgType":44,"./ListenerManager":20,"../SDK/GameMsg":25,"../Http/NetWork":10,"./UIManager":21},"path":"preview-scripts/assets/frame/scripts/Manager/SoundManager.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Manager/ListenerManager.js"},{"deps":{"../UI/BaseUI":22},"path":"preview-scripts/assets/frame/scripts/Manager/UIManager.js"},{"deps":{"../Data/FrameConstValue":9,"./BindNode":23,"../Manager/ListenerManager":20},"path":"preview-scripts/assets/frame/scripts/UI/BaseUI.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/BindNode.js"},{"deps":{"../../../game/scripts/Manager/EditorManager":51,"../SDK/GameMsg":25,"../../../game/scripts/Data/ConstValue":15},"path":"preview-scripts/assets/frame/scripts/Manager/ReportManager.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/SDK/GameMsg.js"},{"deps":{"../../Data/FrameMsgType":44,"../BindNode":23,"../../Manager/ListenerManager":20},"path":"preview-scripts/assets/frame/scripts/UI/Item/TeacherPanelLoading.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/AdaptiveScreen.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/UI/Item/Tip.js"},{"deps":{"../Manager/ReportManager":24,"../Data/FrameMsgType":44,"../Manager/ListenerManager":20,"../../../game/scripts/Manager/EditorManager":51,"../Http/NetWork":10,"../Manager/UIManager":21,"../SDK/T2M":11,"../Manager/SyncDataManager":5,"../Manager/SoundManager":19,"../Utils/UIHelp":46,"../SDK/GameMsg":25},"path":"preview-scripts/assets/frame/scripts/UI/GameMain.js"},{"deps":{"../../Manager/ListenerManager":20,"../../Data/FrameMsgType":44},"path":"preview-scripts/assets/frame/scripts/UI/Item/TitleNode.js"},{"deps":{"../../Data/FrameMsgType":44,"../../Manager/ListenerManager":20,"../BindNode":23,"../../Manager/UIManager":21},"path":"preview-scripts/assets/frame/scripts/UI/Item/MaskRecover.js"},{"deps":{"../../../../game/scripts/Data/ConstValue":15,"../../../../game/scripts/Manager/EditorManager":51,"../../Utils/UIHelp":46,"../../Http/NetWork":10,"../BaseUI":22},"path":"preview-scripts/assets/frame/scripts/UI/Panel/BaseTeacherPanel.js"},{"deps":{"../../SDK/T2M":11,"../../Data/FrameMsgType":44},"path":"preview-scripts/assets/frame/scripts/UI/Item/replayBtn.js"},{"deps":{"../../Utils/UIHelp":46,"./../../SDK/GameMsg":25,"./../BaseFrameUI":18,"./../../Manager/SoundManager":19},"path":"preview-scripts/assets/frame/scripts/UI/Panel/ErrorPanel.js"},{"deps":{"../Item/Tip":28,"../BaseFrameUI":18},"path":"preview-scripts/assets/frame/scripts/UI/Panel/TipUI.js"},{"deps":{"../../Http/NetWork":10,"../../Utils/UIHelp":46,"../../../../game/scripts/Manager/EditorManager":51,"../../../../game/scripts/Data/ConstValue":15,"../BaseFrameUI":18},"path":"preview-scripts/assets/frame/scripts/UI/Panel/SubmissionPanel.js"},{"deps":{"./../../Manager/SoundManager":19,"../../Utils/Tools":45,"../../Utils/UIHelp":46,"../../../../game/scripts/Manager/EditorManager":51,"../../Manager/ReportManager":24,"../BaseFrameUI":18,"../../../../game/scripts/Data/ConstValue":15},"path":"preview-scripts/assets/frame/scripts/UI/Panel/StarCount.js"},{"deps":{"../../SDK/T2M":11,"../../Utils/UIHelp":46,"../BaseFrameUI":18,"../../Data/FrameMsgType":44},"path":"preview-scripts/assets/frame/scripts/UI/Panel/AffirmTips.js"},{"deps":{"../../../../game/scripts/Data/ConstValue":15,"../../Http/NetWork":10,"../../Manager/UIManager":21,"../../SDK/GameMsg":25,"../../../../game/scripts/UI/panel/TeacherPanel":8,"../../../../game/scripts/UI/panel/GamePanel":16,"../../Manager/SoundManager":19,"../BaseFrameUI":18},"path":"preview-scripts/assets/frame/scripts/UI/Panel/LoadingUI.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/BoundingBoxHelp.js"},{"deps":{"./../../Manager/ListenerManager":20,"../../Manager/ReportManager":24,"../BaseFrameUI":18,"../../Utils/UIHelp":46,"../../Data/FrameMsgType":44,"../../Manager/SoundManager":19,"../../../../game/scripts/Manager/EditorManager":51,"../../SDK/T2M":11},"path":"preview-scripts/assets/frame/scripts/UI/Panel/UploadAndReturnPanel.js"},{"deps":{"../../Utils/Tools":45,"../BaseFrameUI":18,"../../Utils/UIHelp":46,"./../../Manager/SoundManager":19,"../../SDK/T2M":11,"../../Manager/UIManager":21,"../../Data/FrameMsgType":44,"../../../../game/scripts/Data/ConstValue":15},"path":"preview-scripts/assets/frame/scripts/UI/Panel/OverTips.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/MathUtils.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameMsgType.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/Tools.js"},{"deps":{"../../../game/scripts/UI/panel/GamePanel":16,"../../../game/scripts/UI/panel/TeacherPanel":8,"../Manager/ListenerManager":20,"../Data/FrameMsgType":44,"../Manager/UIManager":21,"../UI/Panel/StarCount":37,"../UI/Panel/OverTips":42,"../UI/Panel/AffirmTips":38,"../UI/Panel/TipUI":35,"../UI/Panel/ErrorPanel":34,"../UI/Panel/UploadAndReturnPanel":41,"../UI/Panel/SubmissionPanel":36},"path":"preview-scripts/assets/frame/scripts/Utils/UIHelp.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Utils/HitTest.js"},{"deps":{"./../Manager/SoundManager":19},"path":"preview-scripts/assets/frame/scripts/Utils/AudioPlayExtension.js"},{"deps":{},"path":"preview-scripts/assets/frame/scripts/Data/FrameSyncData.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Data/EventType.js"},{"deps":{},"path":"preview-scripts/assets/game/scripts/Manager/EditorManager.js"}];
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
    