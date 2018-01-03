Laya.init(600,300);
const txt = new Laya.Text();
txt.text = "Hello world";
txt.color = "#ffffff";
Laya.stage.addChild(txt);
Laya.loader.load("res/atlas/gameUI.atlas",Laya.Handler.create(this,this.gameStart))