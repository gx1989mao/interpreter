
cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    changeBlockPanel: function () {
        var N = this.node.name;
        var blockP = cc.find("Canvas/blockContainer/blockPanel");
        // var children = blockP.chileren;
        // children.forEach(r=>{r.active = false});
        // blockP.getChildByName(N).avtive = true;
        // cc.log(N);
    },
});
