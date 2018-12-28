window.Global = {
    runState: false,
    terminateState: false,
};
cc.Class({
    extends: cc.Component,

    update: function () {
        if(Global.terminateState){
            Global.terminateState = false;
            this.onButtonClick();
        }
    },
    onButtonClick: function () {
        var self = this;    
        var name;
        if(Global.runState){name = "HelloWorld";cc.log("off");}else{name = "dod";cc.log("on");} 
        Global.runState = !Global.runState;
        cc.loader.loadRes(name, cc.SpriteFrame, function (err, spriteFrame) {
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
});


