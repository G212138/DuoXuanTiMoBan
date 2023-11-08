/**
 * 需要同步的自定义数据
 * 游戏业务层同步数据在这里添加
 */
export class CustomSyncData {
    public curLevel: number = 0; // 当前关卡(第一关为0)
    // TODO 自定义

    public isStart: boolean = false; // 是否开始游戏
    public tureLevel: number[] = []; // 回答正确的关卡
    public curAni: string = "BG"; // 当前动画
    public aniLoop: boolean = false; // 动画是否循环
}
