class FunctionsLayer
{
    constructor()
    {
        this.functionsPoints = new Decimal(0);
        this.upgrades = {
            functionsGain: new FunctionsUpgrade("Increase your Funcitons points gain",
            level => Decimal.pow(1.25, level).mul(200),
            level => Decimal.pow(1.2, level),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            functionsBonus: new FunctionsUpgrade("Gain a bonus to Functions points gain",
            level => Decimal.pow(1e3, level).mul(1000),
            level => new Decimal (1).add(level.div(10).mul(Decimal.pow(1.05, Decimal.max(level.sub(10), 0)))),
            {getEffectDisplay: effectDisplayTemplates.percentStandard(3, "", " %", 0)}
            ),
        }
    }

    getFunctionsEff()
    {
        let base = game.functionsLayer.functionsPoints.add(1)
        let expo = new Decimal(0.5)
        let eff = base.pow(expo)
        return eff
    }

    getFunctionsGain()
    {
        return new Decimal (1).mul(this.getFunctionsBoostFromLayer()).mul(this.upgrades.functionsGain.apply()).mul(this.upgrades.functionsBonus.apply())
    }

    isUnlocked()
    {
        return game.highestUpdatedLayer.gte("1.8e308");
    }

    getFunctionsBoostFromLayer()
    {
        if(game.metaLayer.layer.lte(new Decimal("1.8e308"))) return new Decimal(0);
        return Decimal.log2(game.metaLayer.layer).sub("1024")
    }

    maxAll()
    {
        for(const k of Object.keys(this.upgrades))
        {
            this.upgrades[k].buyMax();
        }
    }

    tick(dt)
    {
        if(this.isUnlocked())
        {
            this.functionsPoints = this.functionsPoints.add(this.getFunctionsGain().mul(dt));
        }
    }

    loadFromSave(obj)
    {
        this.functionsPoints = obj.functionsPoints;
        for(const k of Object.getOwnPropertyNames(obj.upgrades))
        {
            if(this.upgrades[k])
            {
                this.upgrades[k].level = obj.upgrades[k].level;
            }
        }
    }
}