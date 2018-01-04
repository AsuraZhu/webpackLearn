export class GameBgUI extends Laya.View {
    constructor() {
        super();
    }
    public bg1: Laya.Image;
    public bg2: Laya.Image;
    public static uiView:any = {"type":"View","props":{"width":720,"height":1280},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg1","skin":"background.png"}},{"type":"Image","props":{"y":-1280,"x":0,"var":"bg2","skin":"background.png"}}]};

    protected createChildren(): void {
        super.createChildren();
        this.createView(GameBgUI.uiView);
    }
}