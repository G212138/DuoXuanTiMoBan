import { NetWork } from "../../../../frame/scripts/Http/NetWork";
import { ListenerManager } from "../../../../frame/scripts/Manager/ListenerManager";
import { SoundManager } from "../../../../frame/scripts/Manager/SoundManager";
import { SyncDataManager } from "../../../../frame/scripts/Manager/SyncDataManager";
import { T2M } from "../../../../frame/scripts/SDK/T2M";
import { Tools } from "../../../../frame/scripts/Utils/Tools";
import { UIHelp } from "../../../../frame/scripts/Utils/UIHelp";
import { EventType } from "../../Data/EventType";
import { EditorManager, GameData } from "../../Manager/EditorManager";
import OptionKuang from "./OptionKuang";
import { SoundConfig } from "./SoundConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {
    @property(sp.Skeleton)
    private bg_ani: sp.Skeleton = null;
    @property(cc.Node)
    private btn_start: cc.Node = null;
    @property(cc.Node)
    private question_node: cc.Node = null;
    @property(cc.Node)
    private option_node: cc.Node = null;
    @property(cc.Prefab)
    private option_prefab: cc.Prefab = null;
    @property(cc.Label)
    private title_text: cc.Label = null;
    @property(cc.Sprite)
    private question_img: cc.Sprite = null;
    @property(cc.Label)
    private question_text: cc.Label = null;
    @property(cc.Label)
    private lb_curLevel: cc.Label = null;
    @property(cc.Label)
    private lb_levelCount: cc.Label = null;

    private gameData: GameData = null;
    private question_node_start_posY: number = 900;
    private question_node_posY: number = 90;
    private option_node_start_posY: number = -1000;
    private option_node_posY: number = -400;

    onLoad() {
        ListenerManager.on(EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager.on(EventType.GAME_RECONNECT, this.resetUI, this);
        ListenerManager.on(EventType.GAME_REPLAY, this.handleEnterGame, this);
        ListenerManager.on(EventType.CLICK_OPTION, this.handleClickOption, this);
        T2M.addSyncEventListener(EventType.CHANGE_ANI, this.T2M_changeAni.bind(this));
        T2M.addSyncEventListener(EventType.NEXT_LEVEL, this.nextLevel.bind(this));
        T2M.addSyncEventListener(EventType.SHOW_QUESTION, this.handleShowQuestion.bind(this));
        T2M.addSyncEventListener(EventType.SYNC_GAME_OVER, this.syncGameOver.bind(this));
    }

    onDestroy() {
        ListenerManager.off(EventType.ENTER_GAME, this.handleEnterGame, this);
        ListenerManager.off(EventType.GAME_RECONNECT, this.resetUI, this);
        ListenerManager.off(EventType.GAME_REPLAY, this.handleEnterGame, this);
        ListenerManager.off(EventType.CLICK_OPTION, this.handleClickOption, this);
        T2M.removeSyncEventListener(EventType.CHANGE_ANI);
        T2M.removeSyncEventListener(EventType.NEXT_LEVEL);
        T2M.removeSyncEventListener(EventType.SHOW_QUESTION);
        T2M.removeSyncEventListener(EventType.SYNC_GAME_OVER);
    }

    private handleEnterGame() {
        Tools.playSpine(this.bg_ani, "BG", true);
        this.gameData = EditorManager.editorData.GameData[SyncDataManager.getSyncData().customSyncData.curLevel];
        this.initUI();
    }

    private initUI() {
        console.log("initUI", this.gameData);
        this.initTitle();
        this.initLevelProgress();
        this.initQuestion();
        this.initOption();

        this.btn_start.active = true;
        this.btn_start.opacity = 0;
        this.question_node.y = this.question_node_start_posY;
        this.option_node.y = this.option_node_start_posY;
        Tools.playSpine(this.bg_ani, "BG1-1", true);
        SyncDataManager.getSyncData().customSyncData.curAni = "BG1-1";
        SyncDataManager.getSyncData().customSyncData.aniLoop = true;
        //播放皮皮语音：“别跑！”
        SoundManager.playEffect(SoundConfig.soudlist["别跑"], false, false, false, () => {
            cc.tween(this.btn_start).to(0.5, { opacity: 255 }).start();
        });
    }

    private resetUI() {
        this.gameData = EditorManager.editorData.GameData[SyncDataManager.getSyncData().customSyncData.curLevel];
        this.initTitle();
        this.initLevelProgress();
        this.initQuestion();
        this.initOption();
        this.btn_start.active = !SyncDataManager.getSyncData().customSyncData.isStart;
        Tools.playSpine(this.bg_ani, SyncDataManager.getSyncData().customSyncData.curAni, SyncDataManager.getSyncData().customSyncData.aniLoop);
        if (SyncDataManager.getSyncData().customSyncData.isStart) {
            this.question_node.y = this.question_node_posY;
            this.option_node.y = this.option_node_posY;
            this.question_node.getChildByName("qie").x = 430;
        }
        if (SyncDataManager.syncData.frameSyncData.isGameOver) {
            this.question_node.y = this.question_node_start_posY;
            this.option_node.y = this.option_node_start_posY;
            this.question_node.getChildByName("qie").x = 300;
        }
    }

    private nextLevel() {
        this.gameData = EditorManager.editorData.GameData[SyncDataManager.getSyncData().customSyncData.curLevel];
        this.initTitle();
        this.initLevelProgress();
        this.initQuestion();
        this.initOption();
        this.handleShowQuestion();
    }

    private initTitle() {
        this.title_text.string = this.gameData.questionText;
        if (this.gameData.questionText.length > 36) {
            this.title_text.node.width = this.title_text.fontSize * 36;
            this.title_text.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        } else {
            this.title_text.overflow = cc.Label.Overflow.NONE;
        }
        this.title_text.node.active = false;
        this.title_text.string = this.gameData.questionText;
        this.title_text.node.active = true;
        this.title_text.node.parent.getComponent(cc.Layout).updateLayout();
    }

    private initLevelProgress() {
        this.lb_curLevel.node.parent.parent.active = EditorManager.editorData.GameData.length > 1;
        this.lb_curLevel.string = (SyncDataManager.getSyncData().customSyncData.curLevel + 1).toString();
        this.lb_levelCount.string = EditorManager.editorData.GameData.length.toString();
    }

    private initQuestion() {
        this.question_text.string = this.gameData.questionText;
    }

    private initOption() {
        this.option_node.destroyAllChildren();
        this.option_node.removeAllChildren();
        for (let i = 0; i < this.gameData.opinion; i++) {
            let option = cc.instantiate(this.option_prefab);
            option.name = "option" + i;
            option.parent = this.option_node;
            let com = option.getComponent(OptionKuang);
            let isTrueAnswer = this.gameData.answer == i + 1;
            com.init(i, this.gameData["opinionText" + (i + 1)], this.gameData["opinionPic" + (i + 1)], isTrueAnswer);
        }
    }

    private handleClickOption(data) {
        ListenerManager.dispatch(EventType.SUBMIT, data);
        cc.tween(this.question_node.getChildByName("qie")).to(0.5, { x: 300 }).call(() => {
            if (data) {
                this.handleTrueAni();
            } else {
                this.handleWrongAni();
            }
        }).start();
    }

    private handleTrueAni() {
        SyncDataManager.getSyncData().customSyncData.tureLevel.push(SyncDataManager.getSyncData().customSyncData.curLevel + 1);
        cc.tween(this.question_node).delay(0.5).to(0.5, { y: this.question_node_start_posY }).start();
        cc.tween(this.option_node).delay(0.5).to(0.5, { y: this.option_node_start_posY }).call(() => {
            this.handleNextLevel();
        }).start();
    }

    private handleWrongAni() {
        cc.tween(this.question_node).delay(0.5).to(0.5, { y: this.question_node_start_posY }).start();
        cc.tween(this.option_node).delay(0.5).to(0.5, { y: this.option_node_start_posY }).call(() => {
            this.handleNextLevel(false);
        }).start();
    }

    private handleNextLevel(isTrue: boolean = true) {
        let bg_ani_name = isTrue ? "BG3" : "BG4";
        if (SyncDataManager.getSyncData().customSyncData.curLevel + 1 >= EditorManager.editorData.GameData.length) {
            this.handleGameOver();
        } else {
            SyncDataManager.getSyncData().customSyncData.curLevel++;
            SyncDataManager.getSyncData().customSyncData.curAni = bg_ani_name;
            SyncDataManager.getSyncData().customSyncData.aniLoop = false;
            Tools.playSpine(this.bg_ani, bg_ani_name, false, () => {
                if (NetWork.isMaster || !NetWork.isSync) {
                    T2M.dispatch(EventType.CHANGE_ANI, { name: "BG2", loop: true })
                    T2M.dispatch(EventType.NEXT_LEVEL, null);
                }
                SyncDataManager.getSyncData().customSyncData.curAni = "BG2";
                SyncDataManager.getSyncData().customSyncData.aniLoop = true;
                // Tools.playSpine(this.bg_ani, "BG2", true);
                // this.nextLevel();
            });
        }
    }

    private T2M_changeAni(data) {
        Tools.playSpine(this.bg_ani, data.name, data.loop);
    }

    private handleGameOver() {
        if (SyncDataManager.getSyncData().customSyncData.tureLevel.length == EditorManager.editorData.GameData.length) {
            SyncDataManager.getSyncData().customSyncData.curAni = "BG3_win";
            SyncDataManager.getSyncData().customSyncData.aniLoop = false;
            Tools.playSpine(this.bg_ani, "BG3_win", false, () => {
                if (NetWork.isMaster || !NetWork.isSync) {
                    T2M.dispatch(EventType.CHANGE_ANI, { name: "BG3_win2", loop: true });
                    // T2M.dispatch(EventType.SYNC_GAME_OVER, null);
                }
                SoundManager.playEffect(SoundConfig.soudlist["快节奏成功音效"], false, false, false, () => {
                    if (NetWork.isMaster || !NetWork.isSync) {
                        // T2M.dispatch(EventType.CHANGE_ANI, { name: "BG3_win2", loop: true });
                        T2M.dispatch(EventType.SYNC_GAME_OVER, null);
                    }
                });
                SyncDataManager.getSyncData().customSyncData.curAni = "BG3_win2";
                SyncDataManager.getSyncData().customSyncData.aniLoop = true;
                // Tools.playSpine(this.bg_ani, "BG3_win2", true);
                // ListenerManager.dispatch(EventType.GAME_OVER);
            });
        } else {

            SyncDataManager.getSyncData().customSyncData.curAni = "BG3&4_lost";
            SyncDataManager.getSyncData().customSyncData.aniLoop = false;
            Tools.playSpine(this.bg_ani, "BG3&4_lost", false, () => {
                if (NetWork.isMaster || !NetWork.isSync) {
                    T2M.dispatch(EventType.CHANGE_ANI, { name: "BG3&4_lost2", loop: true });
                    // T2M.dispatch(EventType.SYNC_GAME_OVER, null);
                }
                SoundManager.playEffect(SoundConfig.soudlist["长一些的失败音效"], false, false, false, () => {
                    if (NetWork.isMaster || !NetWork.isSync) {
                        // T2M.dispatch(EventType.CHANGE_ANI, { name: "BG3_win2", loop: true });
                        T2M.dispatch(EventType.SYNC_GAME_OVER, null);
                    }
                });
                SyncDataManager.getSyncData().customSyncData.curAni = "BG3&4_lost2";
                SyncDataManager.getSyncData().customSyncData.aniLoop = true;
                // Tools.playSpine(this.bg_ani, "BG3&4_lost2", true);
                // ListenerManager.dispatch(EventType.GAME_OVER);
            });
        }
    }

    private syncGameOver() {
        ListenerManager.dispatch(EventType.GAME_OVER);
    }

    private onClickStart() {
        SyncDataManager.getSyncData().customSyncData.isStart = true;
        SoundManager.playEffect(SoundConfig.soudlist["点击音效"], false, false, false);
        this.btn_start.active = false;
        SyncDataManager.getSyncData().customSyncData.curAni = "BG1";
        SyncDataManager.getSyncData().customSyncData.aniLoop = false;
        Tools.playSpine(this.bg_ani, "BG1", false, () => {
            if (NetWork.isMaster || !NetWork.isSync) {
                T2M.dispatch(EventType.CHANGE_ANI, { name: "BG2", loop: true });
                T2M.dispatch(EventType.SHOW_QUESTION, null);
            }
            SyncDataManager.getSyncData().customSyncData.curAni = "BG2";
            SyncDataManager.getSyncData().customSyncData.aniLoop = true;
            // Tools.playSpine(this.bg_ani, "BG2", true);
            // this.handleShowQuestion();
        });
    }

    private handleShowQuestion() {
        this.question_node.getChildByName("qie").x = 300;
        cc.tween(this.question_node).to(0.5, { y: this.question_node_posY }).call(() => {
            UIHelp.closeMask();
            cc.tween(this.question_node.getChildByName("qie")).to(0.5, { x: 430 }).start();
        }).start();
        cc.tween(this.option_node).to(0.5, { y: this.option_node_posY }).start();
    }

}
