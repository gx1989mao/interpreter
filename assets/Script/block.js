
cc.Class({
    extends: cc.Component,

    properties: {
        connecter:{
            default: null, 
            type: cc.Prefab, 
        },
        ender:{
            default: null, 
            type: cc.Prefab, 
        },
    },

    onLoad: function(){
        var me = this;
        cc.loader.loadRes("blocks", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame(me.name);
            me.getComponent(cc.Sprite).spriteFrame = frame;
        });
        cc.log("newblock");
        // this.x = cc.Event.MOUSE.getLocationX();
        // this.y = cc.Event.MOUSE.getLocationY();
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var delta = event.touch.getDelta();     
            this.node.x += delta.x;
            this.node.y += delta.y;
        }, this);
    },
  

});
