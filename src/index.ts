import { GameStart } from "./GmaeStart";
class Main {
    constructor() {
        Laya.init(720,1280, Laya.WebGL);
        Laya.Stat.show();
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.loader.load("res/atlas/gameUI.atlas",Laya.Handler.create(this,this.gameStart))
    }

    
    private start: GameStart;



    gameStart(): void {
        console.log("执行");
        this.start = new GameStart();
        Laya.stage.addChild(this.start);

    }

}

new Main();
