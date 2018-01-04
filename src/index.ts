import { GameStart } from "./GmaeStart";
export class Main {
    constructor() {
        Laya.init(720,1280, Laya.WebGL);
        Laya.Stat.show();
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.loader.load("res/atlas/gameUI.atlas",Laya.Handler.create(this,this.gameStart))
    }

    
    private start: GameStart;

    // 玩家得分
    public static score:number = 0;



    gameStart(): void {
        console.log("执行");
        this.start = new GameStart();
        Laya.stage.addChild(this.start);

    }

}

new Main();
