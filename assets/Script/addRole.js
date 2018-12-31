window.Gblock = {
    blockNow: "0",
};


cc.Class({
    extends: cc.Component,

    properties: {
        roleButton: {
            default: null, 
            type: cc.Prefab, 
        },
        blockBoard: {
            default: null,
            type: cc.Prefab,
        },
        role: {
            default: null,
            type: cc.Prefab,
        },
        roleNum: {
            default: 0,
        },
    },


    addRolePros: function () {
        this.roleNum++;
        var roleB = cc.instantiate(this.roleButton);
        roleB.name = String(this.roleNum);
        roleB.parent = cc.find("Canvas/roleContainer/rolePanel");

        var blockB = cc.instantiate(this.blockBoard)
        blockB.name = String(this.roleNum);
        blockB.active = false;
        blockB.parent = cc.find("Canvas/blockContainer/blockPanel");

        var role = cc.instantiate(this.role)
        role.name = String(this.roleNum);
        role.parent = cc.find("Canvas/stage");
    },
});
