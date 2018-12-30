cc.Class({
    extends: cc.Component,

    properties: {
        roleButton: {
            default: null, 
            type: cc.Prefab, 
        },
        blockPanel: {
            default: null,
            type: cc.Prefab,
        },
        role: {
            default: null,
            type: cc.Prefab,
        },
    },

    addRolePros: function () {
        cc.instantiate(this.roleButton).parent = cc.find("Canvas/roleContainer/rolePanel");
        cc.instantiate(this.blockPanel).parent = cc.find("Canvas/blockContainer/blockPanel");
        cc.instantiate(this.role).parent = cc.find("Canvas/stage");
    },
});
