import { ListenerManager } from "../../../../frame/scripts/Manager/ListenerManager";
import { SoundManager } from "../../../../frame/scripts/Manager/SoundManager";
import { UIHelp } from "../../../../frame/scripts/Utils/UIHelp";
import { EventType } from "../../Data/EventType";
import { SoundConfig } from "./SoundConfig";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OptionKuang extends cc.Component {

    @property(cc.Label)
    private text: cc.Label = null;
    @property(cc.Sprite)
    private img: cc.Sprite = null;
    @property(cc.Node)
    private img_true: cc.Node = null;
    @property(cc.Node)
    private img_wrong: cc.Node = null;

    private isTrueAnswer: boolean = false;
    private index: number = 0;

    public init(index: number, text: string, img: string, isTrueAnswer: boolean) {
        this.index = index;
        this.text.string = text;
        if (img == "") {
            this.img.node.active = false;
        } else {
            this.text.node.active = false;
            this.img.node.active = true;
        }
        this.isTrueAnswer = isTrueAnswer;
    }

    public onClickOption() {
        UIHelp.showMask();
        ListenerManager.dispatch(EventType.CLICK_OPTION, this.isTrueAnswer);
        let soundName = this.isTrueAnswer ? "正确音效" : "错误音效";
        SoundManager.playEffect(SoundConfig.soudlist[soundName], false, false, false);
        this.img_true.active = this.isTrueAnswer;
        this.img_wrong.active = !this.isTrueAnswer;       
    }


}
