var Dojo = function(selecter,context){
    return new this.init(selecter,context);//创建一个新的对象
}
Dojo.prototype.event = {};
Dojo.prototype.init  = function(selecter,context){
    this.gid = 0;
    var dom  = this.getDom(selecter); 
    this.dom = dom;
    this.dom.gid = this.gid++;
    return this;
}
Dojo.prototype.getDom =  function(selecter){
    var dom = document.getElementById(selecter) || null;
    return [dom];
}
Dojo.prototype.addEvent = function(eventName,fn){//存放自定义的事件
    if(!this.event[eventName]){
        this.event[eventName] = [];
    }
    this.event[eventName].push( fn );
}
//Dojo工具类
Dojo.Util = {};
Dojo.Util.isFunction = function(fn){
    return Object.prototype.toString.call( fn ).slice(8,-1) === 'Function';
}
Dojo.Util.ToArray = function(args){
    return Array.prototype.slice.call( args , 0 );
}
//简单实现事件的绑定
Dojo.prototype.click = function(fn){
    this.event[this.dom.gid] = this.event[this.dom.gid] || [];
    var i = j = 0;
    var self = this;
    if(Dojo.Util.isFunction( fn )){
        for(;i<this.dom.length;i++){
            this.dom[i].addEventListener('click' , function(e,data){
                fn.call(self,e,data);        
            } ,false);
        }
    }

}
Dojo.prototype.trigger = function(eventName,data){
    var i = 0;
    if(!this.event[eventName]){
        return;
    }
    for(len = this.event[eventName].length;i<len;i++){
        this.event[eventName][i].apply(this.dom,data);
    }
    return this;
}
Dojo.prototype.init.prototype = Dojo.prototype;
var dom = new Dojo('demodom');
//为创建的dom对象增加自定义函数
//这里面就增加了两个一样的事件
dom.addEvent("data-change",function(){
    console.log(arguments);        
});
dom.addEvent("data-change",function(){
    var arr;
    arr = Dojo.Util.ToArray(arguments);  
    alert(arr);        
});
//click的时候触发事件
dom.click(function(e){
    this.trigger("data-change",['a','c','d']);
});