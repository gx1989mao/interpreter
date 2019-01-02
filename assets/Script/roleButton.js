
cc.Class({
    extends: cc.Component,

    properties: {
    },

    changeBlockPanel: function () {
        // cc.log(window.Gblock.blockNow);
        var blockP = cc.find("Canvas/blockContainer/blockPanel");
        blockP.getChildByName(window.Gblock.blockNow).active = false;
        window.Gblock.blockNow = this.node.name;  
        blockP.getChildByName(this.node.name).active = true;
        blockP.x = 0;
        blockP.y = 0;


        cc.log(" ");
        blockP.children.forEach(r=>{cc.log(r.name+" "+r.active)});
    },
});
