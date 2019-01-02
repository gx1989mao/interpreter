cc.Class({
    extends: cc.Component,

    properties: {
        block:{
            default: null, 
            type: cc.Prefab, 
        },
    },


    onLoad: function(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            cc.log("press");
            var b = cc.instantiate(this.block);
            b.x = event.getLocationX();
            b.y = event.getLocationY()-200;
            cc.log(b.x);
            b.name = this.name;
            b.parent = cc.find("Canvas");
            cc.log(b.parent.name);
        }, this);
    },

});
