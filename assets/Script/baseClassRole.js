cc.Class({
    extends: cc.Component,

    properties: {
        syntaxTree : [],     // when green-flag button is pressed, syntaxTree refresh 
        stepPoints : [],
        logicTimer : 30,     // per 30 frames logic engine run once 
        phyAction : [],      // list of action per physical engine frame
        logicAction : [],    // list of call back action per logical engine frame
        frameNum : 0,
        refreshLock : false,

        ox: 0,
        oy: 0,
        os: 0,
        or: 0,
    },

    onLoad: function (){
        this.ox = this.node.x;
        this.oy = this.node.y;
        this.os = this.node.scale;
        this.or = this.node.rotation;
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
            this.initState();
        }
        this.frameNum ++;
    },

    initState: function () {    
        this.syntaxTree = [];
        this.stepPoints = [];
        this.phyAction = [];
        this.logicAction = [];
        this.refreshLock = false;  
        this.node.x = this.ox;
        this.node.y = this.oy;
        this.node.scale = this.os;
        this.node.rotation = this.or;   
    },
    // run our engine, clear frame timer, refresh syntax tree 
    refreshTree: function () {
        this.frameNum = 0;
        this.syntaxTree.push(["start","jump","right","right","up","down","turnleft","turnright","zoomin","zoomout","restore","hide","display"]);
        this.syntaxTree.push(["ontouch","left","right"]);
        this.syntaxTree.forEach(v=>{this.stepPoints.push(0)});              // reset step points to zero
    },

    logicEngine: function () {     
        this.phyAction = [];                                                 // refresh phyaction
        this.logicEngineStep();                                              // one step of logic engine       
    },

    logicEngineStep: function () {
        // for each tree
        for(var i=0; i<this.syntaxTree.length; i++){             
            // register entrances
            if(this.syntaxTree[i][this.stepPoints[i]]      === "start"       && this.stepPoints[i] === 0){
                this.stepPoints[i]++;
            }
            else if(this.syntaxTree[i][this.stepPoints[i]] === "ontouch"     && this.stepPoints[i] === 0){
                if("ontouch" in this.logicAction)
                    this.stepPoints[i]++;
            }
            else if(this.syntaxTree[i][this.stepPoints[i]] === "oncollision" && this.stepPoints[i] === 0){
                if("oncollision" in this.logicAction)
                    this.stepPoints[i]++;
            }
            else if(this.syntaxTree[i][this.stepPoints[i]] === "onRx"        && this.stepPoints[i] === 0){
                if("onRx" in this.logicAction)
                    this.stepPoints[i]++;
            }
            // alread entered, run!
            else if(this.stepPoints[i] !== 0){
                if(this.stepPoints[i] < this.syntaxTree[i].length){          // if not point to the last one
                    var action = this.syntaxTree[i][this.stepPoints[i]];
                    this.phyAction.push(action);
                    this.stepPoints[i]++;
                }            
            }
        };
    },

    phyEngine: function () {
        cc.log(this.phyAction);
        var speed       =  2.0;
        var rotateSpeed =  2.0;
        var scaleSpeed  = 0.01;
        var jumpV       =  4.0;
        var gravity     = 0.26;
        this.phyAction.forEach(v=>{
            if(v === "right")       {this.node.x += speed}
            if(v === "left")        {this.node.x -= speed}
            if(v === "up")          {this.node.y += speed}
            if(v === "down")        {this.node.y -= speed}
            // here need canvas constraint
            if(v === "turnleft")    {this.node.rotation += rotateSpeed}
            if(v === "turnright")   {this.node.rotation -= rotateSpeed}        
            if(v === "zoomin")      {this.node.scale += scaleSpeed}
            if(v === "zoomout")     {this.node.scale -= scaleSpeed}
            if(v === "restore")     {this.node.scale = 1}
            if(v === "hide")        {this.node.opacity = 1}
            if(v === "display")     {this.node.opacity = 255}
            if(v === "jump")        {this.node.y += (jumpV - (this.frameNum % this.logicTimer)*gravity)}
        });
    },
    
});
