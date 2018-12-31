window.boxSort = {
    sort: "entrance",   // 1 entrance 2 move 3 role 4 voice 5 time 6 finish
};

cc.Class({
    extends: cc.Component,

    properties:{
        sortNow: "entrance",
    },

    update: function(){
        if(boxSort.sort !== this.sortNow){
            cc.log(boxSort.sort);
            this.sortNow = boxSort.sort;
        }
            
    },
    

    
});
