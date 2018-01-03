class Main {
    gameStart(arg0: any, arg1: any): any {
        throw new Error("Method not implemented.");
    }
    constructor() {
        Laya.init(720,1280, Laya.WebGL);
        Laya.Stat.show();
        Laya.stage.scaleMode = Laya.Stage.SCALE_EXACTFIT;
        Laya.loader.load("res/atlas/gameUI.atlas",Laya.Handler.create(this,this.gameStart))
    }

}

new Main();
