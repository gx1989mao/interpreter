window.Global = {
    runState: false,
};
cc.Class({
    extends: cc.Component,

    onButtonClick: function () {
        var self = this;    
        var name;
        if(Global.runState){name = "HelloWorld";}else{name = "dod"} 
        Global.runState = !Global.runState;
        cc.loader.loadRes(name, cc.SpriteFrame, function (err, spriteFrame) {
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },
});


