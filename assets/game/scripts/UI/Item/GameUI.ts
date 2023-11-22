
import { NetWork } from "../../../../frame/scripts/Http/NetWork";
import { ListenerManager } from "../../../../frame/scripts/Manager/ListenerManager";
import { SoundManager } from "../../../../frame/scripts/Manager/SoundManager";
import { SyncDataManager } from "../../../../frame/scripts/Manager/SyncDataManager";
import { T2M } from "../../../../frame/scripts/SDK/T2M";
import { Tools } from "../../../../frame/scripts/Utils/Tools";
import { UIHelp } from "../../../../frame/scripts/Utils/UIHelp";
import { EventType } from "../../Data/EventType";
import { EditorManager, GameData } from "../../Manager/EditorManager";
import OptionNode from "./OptionNode";
import { SoundConfig } from "./SoundConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {

    @property(cc.Node)
    private option_panel: cc.Node = null;
    @property(cc.Prefab)
    private option_prefab: cc.Prefab = null;
    @property(cc.Label)
    private question_lbl: cc.Label = null;
    @property(cc.Sprite)
    private question_img: cc.Sprite = null;
    @property(cc.Node)
    private jiangbei: cc.Node = null;
    @property(cc.Label)
    private title_lbl: cc.Label = null;
    @property(cc.Label)
    private curLevel_lbl: cc.Label = null;
    @property(cc.Label)
    private levelCount_lbl: cc.Label = null;
    @property(cc.Node)
    private endLayer: cc.Node = null;
    @property(cc.Prefab)
    private jiangbei_prefab: cc.Prefab = null;
    @property(cc.Prefab)
    private zhadan_prefab: cc.Prefab = null;
    @property(cc.Prefab)
    private end_item_prefab: cc.Prefab = null;

    private gameData: GameData = null;

    onLoad() {
        ListenerManager.on(EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager.on(EventType.GAME_RECONNECT, this.resetUI, this);
        ListenerManager.on(EventType.GAME_REPLAY, this.handleEnterGame, this);
        ListenerManager.on(EventType.CLICK_OPTION, this.handleClickOption, this);
        T2M.addSyncEventListener(EventType.NEXT_LEVEL, this.nextLevel.bind(this));
    }

    onDestroy() {
        ListenerManager.off(EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager.off(EventType.GAME_RECONNECT, this.resetUI, this);
        ListenerManager.off(EventType.GAME_REPLAY, this.handleEnterGame, this);
        ListenerManager.off(EventType.CLICK_OPTION, this.handleClickOption, this);
        T2M.removeSyncEventListener(EventType.NEXT_LEVEL);
    }

    private handleEnterGame() {
        this.gameData = EditorManager.editorData.GameData[SyncDataManager.getSyncData().customSyncData.curLevel];
        this.initUI();
    }

    private initUI() {
        this.gameData = EditorManager.editorData.GameData[SyncDataManager.getSyncData().customSyncData.curLevel];
        UIHelp.showMask();
        this.node.getChildByName("btn_check").active = false;
        this.node.getChildByName("btn_check").opacity = 0;
        this.node.getChildByName("btn_check").getChildByName("btn_disable").active = false;
        this.jiangbei.opacity = 0;
        this.jiangbei.scale = 0;
        this.jiangbei.active = false;
        this.node.getChildByName("pipi_yanwu").active = false;
        this.endLayer.active = false;

        this.option_panel.removeAllChildren();
        this.option_panel.destroyAllChildren();
        for (let i = 0; i < this.gameData.opinion; i++) {
            let option = cc.instantiate(this.option_prefab);
            option.parent = this.option_panel;
            option.name = "option_" + i;
            option.getComponent(OptionNode).showInit(i);
        }

        let panel_width = this.gameData.opinion * 290 + (this.gameData.opinion - 1) * 30;
        if (panel_width > 1800) {
            this.option_panel.scale = 1800 / panel_width;
        }

        this.scheduleOnce(() => {
            this.showQuestion();
            this.node.getChildByName("btn_check").active = true;
            this.node.getChildByName("btn_check").getChildByName("btn_disable").active = true;
        }, 1);
        cc.tween(this.node.getChildByName("btn_check")).delay(1.5).to(0.5, { opacity: 255 }).call(() => {
            UIHelp.closeMask();
        }).start();
        this.initTitle();
        this.initLevelProgress();
    }

    private initLevelProgress() {
        this.curLevel_lbl.node.parent.parent.active = EditorManager.editorData.GameData.length > 1;
        this.curLevel_lbl.string = (SyncDataManager.getSyncData().customSyncData.curLevel + 1).toString();
        this.levelCount_lbl.string = EditorManager.editorData.GameData.length.toString();
    }

    private initTitle() {
        this.title_lbl.string = this.gameData.questionText;
        if (this.gameData.questionText.length > 36) {
            this.title_lbl.node.width = this.title_lbl.fontSize * 36;
            this.title_lbl.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        } else {
            this.title_lbl.overflow = cc.Label.Overflow.NONE;
        }
        this.title_lbl.node.active = false;
        this.title_lbl.string = this.gameData.questionText;
        this.title_lbl.node.active = this.gameData.questionPic == "" && this.gameData.questionText != "";
        this.title_lbl.node.parent.getComponent(cc.Layout).updateLayout();
    }

    private resetUI() {
        this.initUI();
        this.handleOptionState();
        this.handleCheckBtnState();

        if (SyncDataManager.getSyncData().frameSyncData.isGameOver) {
            for (let i = 0; i < this.option_panel.childrenCount; i++) {
                let option = this.option_panel.children[i];
                option.active = false;
            }
            for (let i = 0; i < this.node.getChildByName("img_wutaipingmu").childrenCount; i++) {
                let timu = this.node.getChildByName("img_wutaipingmu").children[i];
                timu.opacity = 0;
            }
        }
    }

    private showQuestion() {
        if (this.gameData.questionPic == "") {
            this.question_lbl.node.active = true;
            this.question_img.node.active = false;
            this.question_lbl.string = this.gameData.questionText;
            cc.tween(this.question_lbl.node).delay(0.5).to(0.3, { opacity: 255 }).start();
        } else {
            this.question_lbl.node.active = false;
            this.question_img.node.active = true;
            cc.tween(this.question_img.node).delay(0.5).to(0.3, { opacity: 255 }).start();
            cc.resources.load("images/" + this.gameData.questionPic, cc.SpriteFrame, function (err, img) {
                this.question_img.spriteFrame = img;
            }.bind(this));
        }
    }

    private handleClickOption(data) {
        let seletedOption = SyncDataManager.getSyncData().customSyncData.seletedOption;
        if (seletedOption.indexOf(data) != -1) {
            seletedOption.splice(seletedOption.indexOf(data), 1);
        } else {
            seletedOption.push(data);
        }
        this.handleOptionState();
        this.handleCheckBtnState();
    }

    private handleOptionState() {
        for (let i = 0; i < this.option_panel.childrenCount; i++) {
            let option = this.option_panel.children[i];
            option.getComponent(OptionNode).option_check.active = false;
        }
        for (let i = 0; i < SyncDataManager.getSyncData().customSyncData.seletedOption.length; i++) {
            let option = this.option_panel.getChildByName("option_" + SyncDataManager.getSyncData().customSyncData.seletedOption[i]);
            option.getComponent(OptionNode).option_check.active = true;
        }
    }

    private handleCheckBtnState() {
        let btn_check = this.node.getChildByName("btn_check");
        let btn_mask = btn_check.getChildByName("btn_disable");
        btn_mask.active = SyncDataManager.getSyncData().customSyncData.seletedOption.length < 1;
    }

    private onClickCheckBtn() {
        SoundManager.playEffect(SoundConfig.soudlist["点击音效"], false, false);
        UIHelp.showMask();
        //判断答案是否正确
        if (SyncDataManager.getSyncData().customSyncData.seletedOption.length != this.gameData.answerId.length) {
            // console.log("答案错误");
            this.handleFalse();
        } else {
            let isTrue = true;
            for (let i = 0; i < SyncDataManager.getSyncData().customSyncData.seletedOption.length; i++) {
                if (this.gameData.answerId.indexOf(SyncDataManager.getSyncData().customSyncData.seletedOption[i] + 1) == -1) {
                    isTrue = false;
                    break;
                }
            }
            if (isTrue) {
                // console.log("答案正确");
                this.handleTrue();
            } else {
                // console.log("答案错误");
                this.handleFalse();
            }
        }
    }

    private handleTrue() {
        ListenerManager.dispatch(EventType.SUBMIT, true);
        SyncDataManager.getSyncData().customSyncData.rightTimu[SyncDataManager.getSyncData().customSyncData.curLevel] = true;
        for (let i = 0; i < this.node.getChildByName("img_wutaipingmu").childrenCount; i++) {
            let timu = this.node.getChildByName("img_wutaipingmu").children[i];
            cc.tween(timu).to(0.5, { opacity: 0 }).start();
        }
        for (let i = 0; i < this.option_panel.childrenCount; i++) {
            let option = this.option_panel.children[i];
            option.getComponent(OptionNode).showTrue();
        }
        this.jiangbei.opacity = 0;
        this.jiangbei.active = true;
        this.scheduleOnce(() => {
            cc.tween(this.jiangbei).to(0.5, { opacity: 255, scale: 1 }).start();
            SoundManager.playEffect(SoundConfig.soudlist["快节奏成功音效"], false, false, false, () => {
                if (NetWork.isMaster || !NetWork.isSync) {
                    T2M.dispatch(EventType.NEXT_LEVEL, true)
                }
                // this.nextLevel();
            });
        }, 2);
        this.scheduleOnce(() => {
            SoundManager.playEffect(SoundConfig.soudlist["咻"], false, false, false);
        }, 0.5);
    }

    private handleFalse() {
        ListenerManager.dispatch(EventType.SUBMIT, false);
        SyncDataManager.getSyncData().customSyncData.rightTimu[SyncDataManager.getSyncData().customSyncData.curLevel] = false;
        for (let i = 0; i < this.node.getChildByName("img_wutaipingmu").childrenCount; i++) {
            let timu = this.node.getChildByName("img_wutaipingmu").children[i];
            cc.tween(timu).to(0.5, { opacity: 0 }).start();
        }
        for (let i = 0; i < this.option_panel.childrenCount; i++) {
            let option = this.option_panel.children[i];
            let isSleted = SyncDataManager.getSyncData().customSyncData.seletedOption.indexOf(i) != -1;
            option.getComponent(OptionNode).showFalse(isSleted);
        }
        this.scheduleOnce(() => {
            this.node.getChildByName("pipi_yanwu").active = true;
            Tools.playSpine(this.node.getChildByName("pipi_yanwu").getComponent(sp.Skeleton), 'effect_smoke1', false, () => {
                this.node.getChildByName("pipi_yanwu").active = false;
                // this.nextLevel();
                if (NetWork.isMaster || !NetWork.isSync) {
                    T2M.dispatch(EventType.NEXT_LEVEL, true)
                }
            });
        }, 2.5);
        this.scheduleOnce(() => {
            SoundManager.playEffect(SoundConfig.soudlist["咻"], false, false, false);
        }, 0.5);
    }

    private nextLevel() {
        this.jiangbei.active = false;
        for (let i = 0; i < this.option_panel.childrenCount; i++) {
            let option = this.option_panel.children[i];
            option.active = false;
        }
        if (SyncDataManager.getSyncData().customSyncData.curLevel + 1 >= EditorManager.editorData.GameData.length) {
            this.handleGameOver();
        } else {
            SyncDataManager.getSyncData().customSyncData.curLevel++;
            SyncDataManager.getSyncData().customSyncData.seletedOption = [];
            this.initUI();
        }
    }

    private handleGameOver() {
        this.endLayer.active = true;
        let isAllRight = true;
        this.endLayer.getChildByName("panel").removeAllChildren();
        for (let i = 0; i < EditorManager.editorData.GameData.length; i++) {
            if (SyncDataManager.getSyncData().customSyncData.rightTimu[i]) {
                let end_item = cc.instantiate(this.end_item_prefab);
                end_item.parent = this.endLayer.getChildByName("panel");
                end_item.getChildByName("lbl").getComponent(cc.Label).string = "第" + (i + 1) + "题";
                end_item.getChildByName("img_cuowu").active = false;
                end_item.getChildByName("title").getComponent(cc.Label).string = "正确";
            } else {
                let end_item = cc.instantiate(this.end_item_prefab);
                end_item.parent = this.endLayer.getChildByName("panel");
                end_item.getChildByName("lbl").getComponent(cc.Label).string = "第" + (i + 1) + "题";
                end_item.getChildByName("img_cuowu").active = true;
                end_item.getChildByName("title").getComponent(cc.Label).string = "错误";
                isAllRight = false;
            }
        }
        if (isAllRight) {
            // SoundManager.playEffect(SoundConfig.soudlist["激烈的掌声欢呼音效"], false, false, false, () => {
            // ListenerManager.dispatch(EventType.GAME_OVER);
            // });
            Tools.playSpine(this.endLayer.getChildByName("pipi").getComponent(sp.Skeleton), 'pipi_happy', true);
        } else {
            // SoundManager.playEffect(SoundConfig.soudlist["稀稀拉拉的掌声音效"], false, false, false, () => {
            // ListenerManager.dispatch(EventType.GAME_OVER);
            // });
            Tools.playSpine(this.endLayer.getChildByName("pipi").getComponent(sp.Skeleton), 'pipi_embarrassed', true);
        }
        this.scheduleOnce(() => {
            ListenerManager.dispatch(EventType.GAME_OVER);
        }, 3);
    }

}
