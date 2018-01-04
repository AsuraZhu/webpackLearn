import { Main } from "./index";

export class Role extends Laya.Sprite {
    constructor(){
        super();
    }
    /***飞机的类型   “hero”:玩家飞机，“enemy”：敌人飞机、“bulle”：子弹、"ufo":道具****/
    public type:string;
    /***飞机的血量***/
    public hp = 0;
    /***飞机的速度***/
    private speed = 0;
    /***飞机的被攻击半径***/
    public hitRadius:number;
    public camp:number;   // 飞机的阵营

    private roleAni:Laya.Animation;
    private action:string;

    public shootInterval = 300;
    public shootTime = 300;
    /***是否是子弹***/
    public isBullet = false;
    /****道具类型 0:飞机或子弹，1:子弹箱，2:血瓶***/
    public propType = 0;
    /***子弹级别（吃子弹道具后升级）***/
    public bulletLevel = 0;
    /***同时射击子弹数量***/
    public shootNum = 1;
    /***子弹偏移的位置***/
    private bulletPos:Array<Array<number>> = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];

    public Role() {
        this.roleAni = new Laya.Animation();
        this.roleAni.loadAnimation("GameRole.ani")
    }

    /**
     * 角色初始化
     * @param type 角色类型 ---“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
     * @param hp 血量
     * @param speed 速度
     * @param hitRadius   碰撞半径
     * @param camp    阵营
     */
    public init(type:string,hp:number,speed:number,hitRadius:number,camp:number):void {
        // 角色初始化 属性
        this.type = type;
        this.hp = hp;
        this.speed = speed;
        this.hitRadius = hitRadius;
        this.camp = camp;
        //对象基本都从对象池中创建，如果之前为子弹，不重新赋值的话不会播放死亡动画
        this.isBullet = false;

        this.propType = 0;
        // 加载动画对象
        this.addChild(this.roleAni);

        // 监听动画完成事件
        this.roleAni.on(Laya.Event.COMPLETE,this,this.onComplete)
        // 播放默认飞行动画
        this.playAction("fly")
    }


    /**
     * 动画完成后回调方法 
     */
    public onComplete(): void {
        // 如果角色还未有宽，获得角色宽高
        if(this.roleAni.width==0){
            // 获得动画矩形边界
            const bounds:Laya.Rectangle = this.roleAni.getBounds();
            this.roleAni.size(bounds.width,bounds.height);
        }
        // 如果死忙动画播放完成
        if(this.action=="die"){
            // update() 方法中，影藏后在进行回收
            this.visible = false;
            this.lostProp();
        }else if(this.action=="hit"){
            this.playAction("fly")
        }

         
    }

    /**
     * 角色失血
     */
    public lostHp(lostHp:number):void {
        // 减血
        this.hp = this.hp - lostHp;
        // 判断血量
        if(this.hp > 0) {
            // 没死 播放 被攻击动画
            this.playAction("hit");
        }else {
            // 死亡播放爆炸动画
            if(this.isBullet) {
                // 隐藏 下一帧播放
            }else {
                // 添加死亡动画
                this.playAction("die");
                // 添加死亡音效
                if(this.type=="hero") {
                    Laya.SoundManager.playSound("sound/game_over.mp3");
                }else{
                    Laya.SoundManager.playSound("sound/enemy1_die.mp3");
                }

                // 如果碰撞掉血死亡者不是角色和子弹

                if(this.type!="hero"&&!this.isBullet){
                    // 增加游戏积分
                    Main.score++;
                }
            }
        }
    }

    /**
     * 角色死亡掉落物品
     */
    private lostProp():void{
        if(this.type!="enemy3"){
            return ;
        }
        // 从对象池里面创建一个道具
        const prop:Role = Laya.Pool.getItemByClass("role",Role);
        // 生成随机道具类型
        const r = Math.random();
        const num = (r < 0.7)? 1 : 2;
        // 重新初始化道具属性，阵营为敌方 （只与主角发生碰撞）
        prop.init("ufo" + num,1,2,30,1);

        // 道具类型
        prop.propType = num;

        // 强制显示
        prop.visible = true;

        //生成的 位置为死者位置
        prop.pos(this.x,this.y);

        // 加载到父容器
        this.parent.addChild(prop);
    }

    /**
     * 角色吃到 道具 ，加血或子弹级别
     * 
     */
    public eatProp(prop:Role):void {
        // 如果调用者是主角或prop 不是道具则返回
        if(this.type!="hero"||prop.propType==0) return;
        // 添加吃强化道具音效
        Laya.SoundManager.playSound("sound/achievement.mp3");

        // 吃子弹箱
        if(prop.propType==1){
            Main.score++;
            // 子弹级别增加
            this.bulletLevel++;
            // 子弹每升2级 子弹数量增加一，最大数量限制在4个
            this.shootNum = Math.min(Math.floor(this.bulletLevel / 2) + 1 , 4);
            // 子弹级别越高 发射频率越快
            this.shootInterval = 300 - 8 * (this.bulletLevel > 8 ? 8 : this.bulletLevel);
        }else if(prop.propType==2){  //赤血
            // 血量增加
            this.hp = this.hp + 2;
            Main.score = Main.score +1;
        }
        // 道具死亡
        prop.hp = 0;
        // 道具吃完后消失，下一帧回收
        prop.visible = false;
    }

    /**
     * 播放默认飞行动画
     * @param action 动画状态 "fly" "hit" "die" 
     */
    public playAction(action:string): void{
        this.action = action;
        //播放角色动画,name=角色类型_动画状态，如：hero_fly
        this.roleAni.play(0,true,this.type+""+this.action);

    }

    /**
     * 角色更新，边界检查
     */
    public update(): void {
        // 如果角色隐藏 角色消亡回收
        if(!this.visible){
            // 主角色不死亡回收，只隐藏，以免其他对象以主角对象创建，发生引用修改
            if(this.type! = "hero"){
                this.die();
            }else{
                return;
            } 
        }

        // 角色根据速度飞行
        this.y = this.y + this.speed;
        // 如果移动到显示区域以外，则移除
        if(this.type!="hero"&&(this.y > 1280+100 || this.y < -150 )){
            this.visible = false;
        }

        //主角边界检查
        if(this.type == "hero"){
            //需减去角色宽或高的一半，因为在IDE中制作动画时，我们把角色的中心做为了角色对象的原点
            // 判断是否左右超出
            if(this.x < this.roleAni.width / 2){
                this.x = this.roleAni.width / 2;
            }else if(this.x > 720 - this.roleAni.width / 2) {
                this.x = 720 - this.roleAni.width / 2;
            }

            // 判断是否上下超出
            if(this.y < this.roleAni.height / 2){
                this.y = this.roleAni.height / 2
            }else if(this.y > 1280 - this.roleAni.height / 2) {
                this.y = 1280 - this.roleAni.height / 2;
            }
        }
    }

    /**
     * 角色射击，生成子弹
     */
    public shoot(): void {
        // 获取当前时间
        const time = Laya.Browser.now();
        // 如果当前时间大于下次射击时间
        if (time > this.shootTime) {
            // 获取发射子弹的位置数组
            const pos = this.bulletPos[this.shootNum-1]
        }
    }

    public die():void {

    }




}