window.boxSort = {
    sort: "entrance",   // 1 entrance 2 move 3 role 4 voice 5 time 6 finish
};

cc.Class({
    extends: cc.Component,

    properties:{
        sortNow: "entrance",
        blockProto:{
            default: null, 
            type: cc.Prefab, 
        },
        entrance: [],
        move: [],
        role: [],
        voice: [],
        time: [],
        finish: [],
    },

    onLoad: function() {
        this.entrance = ["11","12","13","14","15"];
        this.move = ["21","22","23","24","25","26","27"];
        this.role = ["31","32","33","34","35","36"];
        this.voice = ["41"];
        this.time =  ["51","52","531","541"];
        this.finish = ["61","62"];
    },

    update: function(){
        if(boxSort.sort !== this.sortNow){
            this.initblock(boxSort.sort);
            //cc.log(boxSort.sort);
            this.sortNow = boxSort.sort;
        }
            
    },

    initblock: function(s) {
        //cc.log(s);
        var children = this.node.children;
        children.forEach(v=>{v.destroy()});

        if(s === "entrance")
            this.entrance.forEach(v=>{this.initOneBlock(v)});
        if(s === "move")
            this.move.forEach(v=>{this.initOneBlock(v)});
        if(s === "role")
            this.role.forEach(v=>{this.initOneBlock(v)});
        if(s === "voice")
            this.voice.forEach(v=>{this.initOneBlock(v)});
        if(s === "time")
            this.time.forEach(v=>{this.initOneBlock(v)});
        if(s === "finish")
            this.finish.forEach(v=>{this.initOneBlock(v)});
    },

    initOneBlock: function(name) {
        var b = cc.instantiate(this.blockProto);
        b.name = name;
        cc.loader.loadRes("blocks", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame(name);
            b.getComponent(cc.Sprite).spriteFrame = frame;
        });
        b.parent = this.node;
    }
});
