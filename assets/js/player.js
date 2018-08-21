/**
 * [video播放]
 * Created by chen.zhanghua on 2017/9/22.
 * fix by xu.qiang on 2017/10/12.
 */
;(function(window,undefined){
    /**
      ** 播放器 各状态 可以在这里捕获到相应状态后 处理业务逻辑。
    **/
    function getSwfInstance(movieName) {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            return window[movieName];
        } else {
            return document[movieName];
        }
    }
    window.onJavaScriptBridgeCreated = function(playerId,status,object){
       switch (status) {
           case 'timeupdate':                  
               break;   
           case  'complete' :
                $('#playerdata').data('url')!=undefined?location.href=$('#playerdata').data('url'):false;
               break;
            case 'play' :
                $.each(XP.instances, function(index, val) {
                    if(val.uid!=playerId){
                        getSwfInstance(val.uid).pause();
                    }
                });
                break;      
           default:
       }
    }   
    function XcarPlayer(){
        var uid=0;
        this.instances={

        };
        this.getUid=function(){
            return '__js_xp_'+uid++;
            //return '132697';
        }
    }
    XcarPlayer.ua=(function(){
        var ua=navigator.userAgent.toLowerCase();
        return {
            isIE:(/msie/).test(ua)
        }
    })();
    XcarPlayer.extend=function(target){
        var i= 1,length=arguments.length;

        for(;i<length;i++){
            var options=arguments[i];
            for(var prop in options){
                var copy=options[prop];
                if(target === copy){
                    continue;
                }
                if(copy !== undefined){
                    target[prop]=copy;
                }
            }
        }
        return target;
    };
    XcarPlayer.prototype={
        create:function(container,opts){
            var uid=this.getUid();
            opts=XcarPlayer.extend({},XcarPlayer.defOptions,opts);
            opts['uid']=uid;
            this.instances[uid]=new Player(container,opts);
            return this.instances[uid];
        },
        play:function(uid){
            this.instances[uid].play();
        },
        pause:function(uid){
            if(this.instances[uid]){
                this.instances[uid].pause();
            }
        },
        pauseOthers:function(notuid){
            for(var p in this.instances){
                if(p!==notuid){
                    if(!this.instances[p].paused){
                        this.pause(p);
                    }
                }
            }
        }
    };
    XcarPlayer.defOptions={
        movie:'http://js.xcar.com.cn/source/danhong/ArcMediaPlayback_new_180613.swf',
        quality:'high',
        wmode:"transparent",
        allowFullScreen:true,
        allowScriptAccess:"always",
        autoPlay:true,
        bgcolor:'#000000',
        id:'0',
        logoDisplay:false,
        rServer:"http://xtv.xcar.com.cn",
        shareDisplay:false

    };
//基本属性构成
    XcarPlayer.settingProps=['bgcolor','quality','allowScriptAccess','wmode','allowFullScreen'];
    XcarPlayer.flashVarsProps=['width','height','autoPlay','shareDisplay','logoDisplay',,'id','rServer'];



    function Player(container,opts){
        this.opts=opts;
        this.uid=opts.uid;
        this.width=opts.width||'800';
        this.height=opts.height||'600';
        this.container=typeof container == 'string'?document.getElementById(container):container;
        this.init();
        this.setSrc(opts.url);
        this.setSourceList(opts.list);
    }
    Player.prototype={
        init:function(){
            this.createPlayerHtml();
            this.api=null;
            this.apiStack=[];
            this.paused=false;
            this.autoPlay=this.opts.autoPlay||false;
            this.inited=true;
            var that=this;
            this.setVSize=function(){};
            window['__playready__'+this.uid]=function(e){
                that.api=document.getElementById(that.uid);
                for(var i= 0,len=that.apiStack.length;i<len;i++){
                    var item=that.apiStack[i];
                    if(item.type==='set'){
                        that[item.type+item.method](item.value);
                    }else if(item.type==='call'||item.type==='fire'){
                        that[item.method](item.value);
                    }
                }
                XP.pause(that.uid);
                if(that.autoPlay){
                    XP.play(that.uid);
                    XP.pauseOthers(that.uid);
                }


            };
            window['__event__'+this.uid]=function(ev){
                if(ev==='play'){
                    if(that.inited){

                        that.inited=false;
                        that.setVSize();

                        if(!that.autoPlay){
                            XP.pause(that.uid);
                        }
                    }else{
                        if(!that.inited){
                            that.paused=false;
                            XP.pauseOthers(that.uid);
                        }
                    }
                }
                if(ev==='pause'){
                    that.paused=true;
                }
            }

        },
        createPlayerHtml:function(){
            var settings=this._getSettings(this.opts);
            var flashVars=this._getFlashVars(this.opts);
            var html='';
            if(XcarPlayer.ua.isIE){
                html=this.iePlayer(settings,flashVars);
            }else{
                html=this.embed(settings,flashVars);
            }
            this.container.innerHTML=html;
        },
        _getSettings:function(opts){
            var res={};
            for(var i= 0,len=XcarPlayer.settingProps.length;i<len;i++){
                var prop=XcarPlayer.settingProps[i];
                if(opts[prop] !== undefined){
                    res[prop]=opts[prop];
                }
            }
            return res;
        },
        _getFlashVars:function(opts){
            var res={};
            for(var i= 0,len=XcarPlayer.flashVarsProps.length;i<len;i++){
                var prop=XcarPlayer.flashVarsProps[i];
                if(opts[prop] !== undefined){
                    res[prop]=opts[prop];
                }
            }
            return res;
        },
        iePlayer:function(settings,flashVars){
            var html=[];
            html.push('<object id="'+this.uid+'" name="'+this.uid+'" uid="'+this.uid+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.width+'" height="'+this.height+'" style="display:block;background: rgb(0, 0, 0)">');
            html.push(this.objToParam(settings));
            html.push('<param name="movie" value="'+this.opts.movie+'"/>');
            html.push('<param name="flashvars" value="'+this.objToQuery(flashVars)+'&javascriptCallbackFunction=onJavaScriptBridgeCreated" />');
            html.push( '</object>');
            return html.join('');
        },
        commonFn:function(w,h,vw,vh){
            //寛高都大于播放器寛高
            if(vw>w&&vh>h)
            {

                var radio=Math.min(w/vw,h/vh);
                return {w:vw*radio,h:vh*radio}
            }
            else if(vw>w)
            {

                radio=w/vw;
                return {w:vw*radio,h:vh*radio}
            }
            else if(vh>h)
            {
                radio=h/vh;

                return {w:vw*radio,h:vh*radio}
            }
            radio=Math.min(w/vw,h/vh);
            return {w:vw*radio,h:vh*radio}

        },
        embed:function(settings,flashVars){
            var html=[];
                html.push('<object id="'+this.uid+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.width+'" height="'+this.height+'" style="display:block;background: rgb(0, 0, 0)">')
                html.push('<param name="movie" value="'+this.opts.movie+'"/>');
                html.push('<param name="bgcolor" value="#000"/>');
                html.push('<param name="quality" value="high"/>');
                html.push('<param name="wmode" value="transparent"/>');
                html.push('<param name="allowFullScreen" value="true"/>');
                html.push('<param name="allowScriptAccess" value="samedomain"/>');
                html.push('<param name="flashvars" value="'+this.objToQuery(flashVars)+'&javascriptCallbackFunction=onJavaScriptBridgeCreated"/>');
                html.push('<embed src="'+this.opts.movie+'" bgcolor="#000" '+this.objToEmbed(settings)+'  width="'+this.width+'" height="'+this.height+'" name="'+this.uid+'"   flashvars="'+this.objToQuery(flashVars)+'&javascriptCallbackFunction=onJavaScriptBridgeCreated"/>');
                html.push( '</object>');
               return html.join('');
                
                
        },
        objToParam:function(opts){
            var params=[];
            for(var name in opts){
                params.push('<param name="'+name+'" value="'+opts[name]+'" />');
            }
            return params.join('');
        },
        objToEmbed:function(opts){
            var params=[];
            for(var name in opts){
                params.push(name+'="'+opts[name]+'"');
            }
            return params.join(' ');
        },
        objToQuery:function(obj){
            var res=[];
            for(var name in obj){
                res.push(name+'='+obj[name]);
            }
            return res.join('&');
        },
        exec:function(name,type,val){
            var setApiFn;
            if(type=='set'){
                setApiFn=type+'_'+name.toLowerCase();
            }else{
                setApiFn=name;
            }
            if(type=='fire'){
                setApiFn=type+'_'+name;
            }
            if(this.api != null && this.api[setApiFn] !== undefined){
                if(type=='fire'){
                    this.api[setApiFn](val.w,val.h);
                    return;
                }
                this.api[setApiFn](val);
            }else{
                if(name==='setSize'){
                    name='setVideoSize';
                }
                this.apiStack.push({
                    type:type,
                    method:name,
                    value:val
                });
            }
        },
        play:function(){
            this.exec('play','call',true);
            this.paused=false;
        },
        pause:function(){
            this.exec('play','call',false);
            this.paused=true;
        },
        setSrc:function(src){
            this.exec('Src','set',src);
        },
        setSourceList:function(list){
            this.exec('setSourceList','call',list);
        },
        setVideoSize:function(data){
            data=data||{w:this.width,h:this.height};
            this.setVSize=function(){
                this.setVideoSize(data);
            };

            if(data && data.w && data.h){
                this.exec('setSize','fire',data);
            }
        }
    };


    window.XP=new XcarPlayer();
})(window);