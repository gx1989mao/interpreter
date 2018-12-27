cc.Class({
    extends: cc.Component,

    properties: {
        syntaxTree : [["start","right","right","up"]],     // when green-flag button is pressed, syntaxTree refresh 
        stepPoints : [],
        hideFlag : false,    // default display
        logicTimer : 30,     // per 30 frames logic engine run once 
        phyAction : [],      // list of action per physical engine frame
        logicAction : [],    // list of call back action per logical engine frame
        frameNum : 0,
        refreshLock : false,
    },

    update: function () {    
        if(Global.runState){
            if(!this.refreshLock){
                this.refreshTree();                     // refresh syntax tree once
                this.refreshLock = true;
            }         
            if(this.frameNum % this.logicTimer === 0)
                this.logicEngine();                     // run logical engine per 30 frame 
            this.phyEngine();                           // run physical engine per frame
        }else{
            this.refreshLock = false;
        }
        this.frameNum ++;
    },
    // run our engine, clear frame timer, refresh syntax tree 
    refreshTree: function () {
        this.frameNum = 0;
        this.syntaxTree.forEach(v=>{this.stepPoints.push(0);});   // reset step points to zero
    },
    phyEngine: function () {
        // cc.log("phy");
    },
    logicEngine: function () {
        cc.log("logic"+this.frameNum);
        for(var i=0; i<this.stepPoints.length; i++){
            if(this.syntaxTree[i][this.stepPoints[i]] === "start"){
                this.stepPoints[i]++;
            }
        };

    },
    
});
