var RewardMechanism = IgeEventingClass.extend({
    classId: 'RewardMechanism',

    init: function () {
        var self = this,
            textureList = JSON.parse(GameConfig.config['rewardMechanismTextureList']);

        self.uiScene = ige.$('uiScene');
        self.textureListLookup = {};

        for(var i = 0; i < textureList.length; i++){
            self.textureListLookup[textureList[i].name] = textureList[i];
        }
    },

    claimReward: function(assetName, amount, translateObj, itemRef){
        var self = this
            _translateObj = translateObj || {x:-self.uiScene._renderPos.x,y:-self.uiScene._renderPos.y,z:0};

        _translateObj.x += self.uiScene._renderPos.x;
        _translateObj.y += self.uiScene._renderPos.y;


        switch(assetName){
            case "xp":
                //add xp
                break;
            case "coins":
                API.addCoins(parseInt(amount))
                break;
            case "cash":
                API.addCash(parseInt(amount))
                break;
            case "water":
                API.addWater(parseInt(amount))
                break;
        }

        var animation = new AssetAnimation(assetName, self.textureListLookup[assetName].texture, self.textureListLookup[assetName].mount)
            .drawBounds(true)
            .width(50)
            .height(60)
            .translateTo(_translateObj.x,_translateObj.y,_translateObj.z)
            .mount(self.uiScene);

        animation.update = function(){
            AssetAnimation.prototype.update.call(this);
            if(itemRef !== null && itemRef !== undefined)
                this.translateTo(itemRef.screenPosition().x + self.uiScene._renderPos.x, itemRef.screenPosition().y + self.uiScene._renderPos.y, _translateObj.z);
        }

        new IgeTimeout(function () { animation.gotoTopNavBar(); }, parseInt(GameConfig.config['assetAnimationTimerDuration']) * 1000);

        animation.mouseOver(function(){
            animation.gotoTopNavBar();
        });
    },

})
