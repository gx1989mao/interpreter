
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    changeBlockPanel: function () {
        var N = this.node.name;
        var blockP = cc.find("Canvas/blockContainer/blockPanel");
        var children = blockP.children;
        // children.forEach(r=>{cc.log(r.name)});
        //children.forEach(r=>{r.active = false});
        blockP.getChildByName(N).avtive = true;
        // cc.log(blockP.getChildByName(N)+" "+blockP.getChildByName(N).avtive);
    },
});
