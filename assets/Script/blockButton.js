
cc.Class({
    extends: cc.Component,

    changeBox: function () {
        window.boxSort.sort = this.node.name;
    },
});
