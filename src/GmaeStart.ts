import { GameStartUI } from "./ui/GameStartUI";

export class GameStart extends GameStartUI {
    public onClose(): void {
        this.removeSelf();
        this.destroy();
    }
    public GameStart() {
        this.btn_start.visible = false;
        this.once(Laya.Event.CLOSE,this,this.onClose);
    }
}