window.Global = {
    runState: false,
    roleNum: 0,
};
cc.Class({
    extends: cc.Component,

    properties: {
        buttonPress: false,
    },
    
    update: function () {
        if(this.buttonPress){
            this.buttonPress = false;
            this.switchButton(Global.runState);
            Global.runState = !Global.runState;
        }
        if(Global.TF){
            this.switchButton(Global.runState);
            Global.runState = !Global.runState;
            Global.TF = false;
        }
    },
    onButtonClick: function () {this.buttonPress = true;cc.log("press");},   // button click call back

    switchButton: function (state) {      // button press process  false: switch run   ture: switch stop 
        var name;
        if(state){name = "run";  cc.log("off state");}
        else     {name = "stop"; cc.log("on  state");}       
        cc.loader.loadRes("gf", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame(name);
            cc.find("Canvas/greenFlag").getComponent(cc.Sprite).spriteFrame = frame;
        });
    },
});


