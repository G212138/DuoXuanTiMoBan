import { ListenerManager } from "../../../../frame/scripts/Manager/ListenerManager";
import { SoundManager } from "../../../../frame/scripts/Manager/SoundManager";
import { SyncDataManager } from "../../../../frame/scripts/Manager/SyncDataManager";
import { Tools } from "../../../../frame/scripts/Utils/Tools";
import { EventType } from "../../Data/EventType";
import { EditorManager, GameData } from "../../Manager/EditorManager";
import { SoundConfig } from "./SoundConfig";


const { ccclass, property } = cc._decorator;

@ccclass
export default class OptionNode extends cc.Component {
    @property(cc.Node)
    private img_zhadan: cc.Node = null;
    @property(sp.Skeleton)
    private ani_pipi: sp.Skeleton = null;
    @property(cc.Node)
    private img_wutaidong: cc.Node = null;
    @property(cc.Node)
    private zhandan_node: cc.Node = null;
    @property(sp.Skeleton)
    private yanwu: sp.Skeleton = null;
    @property(sp.Skeleton)
    private boom: sp.Skeleton = null;
    @property(cc.Node)
    public option_node: cc.Node = null;
    @property(cc.Label)
    private option_lbl: cc.Label = null;
    @property(cc.Sprite)
    private option_img: cc.Sprite = null;
    @property(cc.Node)
    public option_check: cc.Node = null;
    @property(cc.Sprite)
    private icon: cc.Sprite = null;
    @property(cc.Sprite)
    private icon_1: cc.Sprite = null;
    @property(cc.SpriteFrame)
    private icon_img: cc.SpriteFrame[] = [];

    private optionIndex: number = 0;
    private gameData: GameData = null;
    private isTrue: boolean = false;

    public showInit(index: number) {
        this.icon_1.node.active = false;
        this.gameData = EditorManager.editorData.GameData[SyncDataManager.getSyncData().customSyncData.curLevel];
        this.optionIndex = index;
        this.isTrue = this.gameData.answerId.indexOf(index + 1) != -1;
        this.icon.spriteFrame = this.icon_img[index];
        this.icon_1.spriteFrame = this.icon_img[index];
        this.node.scaleX = 0;
        for (let i = 0; i < this.node.childrenCount; i++) {
            this.node.children[i].active = false;
        }
        this.img_wutaidong.active = true;
        cc.tween(this.node).to(0.2, { scaleX: 1 }).call(() => {
            this.img_wutaidong.active = false;
            this.ani_pipi.node.active = true;
            Tools.playSpine(this.ani_pipi, 'pipi_dongli chulai happy', false, () => {
                Tools.playSpine(this.ani_pipi, 'pipi_catch', true, () => {

                });
                this.option_node.active = true;
                this.option_node.scaleX = 0;
                cc.tween(this.option_node).to(0.3, { scaleX: 1 }).call(() => {
                    this.icon_1.node.active = true;
                    this.ani_pipi.node.active = false;
                }).start();
            });
        }).start();
        this.initOption();
    }

    private initOption() {
        let optionData = this.gameData.answer[this.optionIndex];
        if (optionData.opinionPic == "") {
            this.option_img.node.active = false;
            this.option_lbl.node.active = true;
            this.option_lbl.string = optionData.opinionText;
        } else {
            this.option_img.node.active = true;
            this.option_lbl.node.active = false;
            cc.resources.load("images/" + optionData.opinionPic, cc.SpriteFrame, function (err, img) {
                this.option_img.spriteFrame = img;
            }.bind(this));
        }
    }

    onClickOption() {
        SoundManager.playEffect(SoundConfig.soudlist["点击音效"], false, false);
        ListenerManager.dispatch(EventType.CLICK_OPTION, this.optionIndex);
    }

    public showTrue() {
        if (this.isTrue) {
            this.ani_pipi.node.active = true;
            Tools.playSpine(this.ani_pipi, 'pipi_catch', true);
        } else {
            this.ani_pipi.node.active = false;
            this.img_wutaidong.active = true;
        }
        cc.tween(this.option_node).to(0.4, { scaleX: 0 }).call(() => {
            this.zhandan_node.active = true;
            if (this.isTrue) {
                this.zhandan_node.getChildByName("img_zuanshi").x = -90;
                cc.tween(this.zhandan_node.getChildByName("img_zuanshi")).to(1, { y: -450, angle: 720 * 2 }).call(() => { }).start();
                // Tools.playSpine(this.ani_pipi, 'pipi_happy_meidong', true);
            } else {
                this.zhandan_node.getChildByName("img_zhadan").x = 0;
                this.zhandan_node.getChildByName("img_zhadan").active = true;
                cc.tween(this.zhandan_node.getChildByName("img_zhadan")).to(1, { y: -430, angle: 720 * 2 }).delay(0.3).call(() => {
                    this.node.getChildByName("zhadan_boom").active = true;
                    this.zhandan_node.getChildByName("img_dongzhong_zhadan").active = false;
                    this.zhandan_node.getChildByName("img_zhadan").active = false;
                    Tools.playSpine(this.node.getChildByName("zhadan_boom").getComponent(sp.Skeleton), 'effect_boom', false);
                    SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false);
                    // SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false);
                    // this.yanwu.node.active = true;
                    // Tools.playSpine(this.yanwu, 'dongli yanwu', false, () => {
                    //     this.yanwu.node.active = false;
                    // });
                }).start();
                // this.ani_pipi.node.active = false;
                // this.img_wutaidong.active = true;
            }
        }).start();
    }

    public showFalse(isSleted: boolean) {
        if (isSleted) {
            this.ani_pipi.node.active = true;
            Tools.playSpine(this.ani_pipi, 'pipi_catch', true);
        } else {
            this.ani_pipi.node.active = false;
            this.img_wutaidong.active = true;
        }
        cc.tween(this.option_node).to(0.4, { scaleX: 0 }).call(() => {
            this.zhandan_node.active = true;
            if (this.isTrue) {
                this.zhandan_node.getChildByName("img_zuanshi").x = isSleted ? -90 : 0;
                let endY = isSleted ? -460 : -650;
                cc.tween(this.zhandan_node.getChildByName("img_zuanshi")).to(1, { y: -450, angle: 720 * 2 }).call(() => {
                    if (!isSleted) {
                        // cc.tween(this.zhandan_node.getChildByName("img_dongzhong_zhadan")).delay(1).bezierTo(0.5, cc.v2(0, -650), cc.v2(-50, 0), cc.v2(-100, -460)).call(() => {
                        // this.node.getChildByName("boom").active = true;
                        // this.zhandan_node.getChildByName("img_dongzhong_zhadan").active = false;
                        // Tools.playSpine(this.node.getChildByName("boom").getComponent(sp.Skeleton), 'effect_boom', false);
                        // SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false);
                        // }).start();
                    }
                }).start();
                Tools.playSpine(this.ani_pipi, 'pipi_happy', true);
            } else {
                Tools.playSpine(this.ani_pipi, 'pipi_embarrassed', true);
                this.zhandan_node.getChildByName("img_zhadan").active = true;
                this.zhandan_node.getChildByName("img_zhadan").x = isSleted ? -90 : 0;
                let endY = isSleted ? -460 : -650;
                cc.tween(this.zhandan_node.getChildByName("img_zhadan")).to(1, { y: -430, angle: 720 * 2 }).delay(0.3).call(() => {
                    if (!isSleted) {
                        this.zhandan_node.getChildByName("img_zhadan").active = false;
                        this.node.getChildByName("boom").active = true;
                        // this.zhandan_node.getChildByName("img_dongzhong_zhadan").active = false;
                        Tools.playSpine(this.node.getChildByName("boom").getComponent(sp.Skeleton), 'effect_boom', false);
                        SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false, (() => {
                            this.node.getChildByName("boom").active = false;
                        }));
                        // SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false);
                        // this.yanwu.node.active = true;
                        // Tools.playSpine(this.yanwu, 'dongli yanwu', false, () => {
                        //     this.yanwu.node.active = false;
                        // });
                    } else {
                        this.zhandan_node.getChildByName("img_zhadan").active = false;
                        this.node.getChildByName("zhadan_boom").active = true;
                        // this.zhandan_node.getChildByName("img_dongzhong_zhadan").active = false;
                        Tools.playSpine(this.node.getChildByName("zhadan_boom").getComponent(sp.Skeleton), 'effect_boom', false);
                        SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false, (() => {
                            this.node.getChildByName("zhadan_boom").active = false;
                        }));
                    }
                }).start();
                // this.scheduleOnce(() => {
                //     this.zhandan_node.getChildByName("img_zhadan").active = false;
                //     SoundManager.playEffect(SoundConfig.soudlist["爆炸音效"], false, false, false);
                //     this.node.getChildByName("zhadan_boom").active = true;
                //     Tools.playSpine(this.node.getChildByName("zhadan_boom").getComponent(sp.Skeleton), 'effect_boom', false);
                // }, 2.5);
            }
        }).start();
    }
}
