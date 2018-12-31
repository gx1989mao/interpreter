
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

    onload: function () {
        Global.roleNum = 1;
    },
    addRolePros: function () {
        Global.roleNum++;
        var roleB = cc.instantiate(this.roleButton);
        roleB.name = String(Global.roleNum);
        roleB.parent = cc.find("Canvas/roleContainer/rolePanel");
        var blockP = cc.instantiate(this.blockPanel)
        blockP.name = String(Global.roleNum);
        blockP.parent = cc.find("Canvas/blockContainer/blockPanel");
        var role = cc.instantiate(this.role)
        role.name = String(Global.roleNum);
        role.parent = cc.find("Canvas/stage");

        cc.log("after "+role.x+" "+role.y);
    },

    // randomNum: function (a,b) {
    //     var r = cc.random0To1();
    //     return a+r*(b-a);
    // },
});
