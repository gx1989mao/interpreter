window.Global = {
    TF: false,
};

cc.Class({
    extends: cc.Component,

    properties: {
        syntaxTree    : [],     // when green-flag button is pressed, syntaxTree refresh 
        // start ontouch oncollision onrx(globle)
        // right left up down turnleft turnright jump
        // say zoomin zoomout restore hide display
        // sound playrecord
        // delay countloop (number) loop loopend pause
        // terminate toscene (number)
        stepPoints    : [],
        logicTimer    : 30,     // per 30 frames logic engine run once 
        phyAction     : [],     // list of action per physical engine frame
        logicAction   : [],     // list of call back action per logical engine frame
        frameNum      :  0,
        refreshLock   : false,
        logicEngineSW : true,   // switch of logical engine
        loopMarks     : [],     // stack of all loops in all trees
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
        if(Global.runState){                                     // green flag button press down
            if(!this.refreshLock){
                this.frameNum = 0;
                this.refreshTree();                              // refresh syntax tree once
                this.refreshLock = true;
            }         
            if(this.frameNum % this.logicTimer === 0){
                this.phyAction = [];                             // refresh phyaction
                if(this.logicEngineSW){this.logicEngine()}       // run logical engine per 30 frame 
            }
            this.phyEngine();                                    // run physical engine per frame
        }else{
            this.initState();                                    // green flag button up
        }
        this.frameNum ++;                                        // frame counting
    },

    initState: function () {    
        this.syntaxTree  = [];
        this.stepPoints  = [];
        this.phyAction   = [];
        this.logicAction = [];
        this.refreshLock = false;  
        this.logicEngineSW = true;
        this.node.x = this.ox;
        this.node.y = this.oy;
        this.node.scale = this.os;
        this.node.rotation = this.or;   
        Global.TF = false;
    },
    // run our engine, clear frame timer, refresh syntax tree 
    refreshTree: function () {  
        this.syntaxTree.push(["start","right","left","right","left","terminate","turnleft","turnright","zoomin","zoomout","restore","hide","display"]);
        this.syntaxTree.push(["ontouch","left","right"]);
        this.syntaxTree.push(["start","zoomin","zoomout","zoomin","zoomout","zoomin","zoomout","zoomin","zoomout"]);
        this.syntaxTree.forEach(v=>{                                         
            this.stepPoints.push(0);                                         // reset step points to zero
            this.loopMarks.push([]);                                         // push empty list into loopMarks
        });               
    },

    logicEngine: function () {    
        for(var i=0; i<this.syntaxTree.length; i++){                         // for each tree                   
            if(this.stepPoints[i] === 0){                                    // register entrances
                if(this.syntaxTree[i][this.stepPoints[i]] === "start")
                    this.stepPoints[i]++;
                if(this.syntaxTree[i][this.stepPoints[i]] === "ontouch")
                    if("ontouch" in this.logicAction)
                        this.stepPoints[i]++;
                if(this.syntaxTree[i][this.stepPoints[i]] === "oncollision")
                    if("oncollision" in this.logicAction)
                        this.stepPoints[i]++;
                if(this.syntaxTree[i][this.stepPoints[i]] === "onrx")
                    if("onrx" in this.logicAction)
                        this.stepPoints[i]++;
            }else{                                                           // already entry this tree, just run
                if(this.stepPoints[i] < this.syntaxTree[i].length){          // if not point to the last one
                    var action = this.syntaxTree[i][this.stepPoints[i]];     // read one step action from this syntax tree                  
                    var loops = ["countloop","loop","loopend"];          
                    if(action === "pause"){this.logicEngineSW = false}       // switch off logical engine "pause" stop this role
                    else if(action === "terminate"){
                        this.logicEngineSW = false;
                        Global.TF = true;
                    }
                    else if(!(action in loops || /\d/.test(action))){        // not a kind of loop, not a number
                        this.phyAction.push(action);                         // push a phy action
                        this.stepPoints[i]++;
                    }       
                    else if(action === "loop"){
                        this.loopMarks[i].push(this.stepPoints[i]);          // record a loop start position
                    }           
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
            if(v === "delay")       {cc.log("delay")}
        });
    },
    
});
