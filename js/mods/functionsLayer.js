class FunctionsLayer
{
    constructor()
    {
        this.functionsPoints = new Decimal(0);
        this.number = new Decimal (1);
        this.upgrades = {
            functionsGain: new FunctionsUpgrade("Increase your Funcitons points gain",
            level => Decimal.pow(1.225, level).mul(this.upgrades.EnhanceFM.level.gte(1) ? 1 : 200),
            level => Decimal.pow(1.2, level),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            functionsBonus: new FunctionsUpgrade("Gain a bonus to Functions points gain",
            level => Utils.createValueDilation(Decimal.pow(1e3, level).mul(1000), 0.0075, new Decimal ("2e1024")).div(this.upgrades.EnhanceFB.level.gte(1) ? this.number : 1),
            level => new Decimal (1).add(level.div(10).mul(Decimal.pow(1.05, Decimal.max(level.sub(10), 0)))),
            {getEffectDisplay: effectDisplayTemplates.percentStandard(3, "", " %", 0)}
            ),



            ResourceMultipliersBasedOnLayers: new FunctionsUpgrade("RMs are stronger based on Layer you currently on",
            level => Decimal.pow(1e5, level.pow(1.25)).mul(1000),
            level => Utils.softcap(new Decimal (1).add(game.metaLayer.layer.mul(level).pow(level.pow(0.6)).add(1).log10().pow(0.8).div(10)).pow(this.upgrades.EnhanceRMBOL.apply()), new Decimal (0.1), new Decimal ("2e1024")),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            SelfFunctions: new FunctionsUpgrade("Gain more Functions Points based on log(ƒP)",
            level => new Decimal (1e6).pow(Decimal.pow(1.2, level)),
            level => (new Decimal(1).add(Decimal.max(0, game.functionsLayer.functionsPoints).add(1).log10().mul(level.add(1)).mul(0.05)).pow(2.5)).pow(this.upgrades.EnhanceSF.apply()),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            MoreLayerCoins: new FunctionsUpgrade("Gain more Layer Coins on restack",
            level => new Decimal (1e10).pow(Decimal.pow(this.upgrades.EnhanceMLC.apply(), level)),
            level => Decimal.add(1, level).add(this.upgrades.EnhanceVar_alpha.level.gte(1) ? this.upgrades.Variable_alpha.apply().sub(975).max(0) : 0).pow(level.add(1).log10().add(1)).pow(8),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            CostDivider: new FunctionsUpgrade("Divide the cost of all resource multipliers and powerers",
            level => new Decimal (1e30).pow(Decimal.pow(1.25, level)),
            level => Decimal.add(8, this.upgrades.EnhanceCD.level.min(1).mul(2)).pow(level.pow(0.8)).mul(100).floor().div(100),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "÷")}
            ),
            ResourceMultipliersBasedOnfx: new FunctionsUpgrade("RMs are stronger based on ƒ(<b>x</b>)",
            level => new Decimal (1e100).mul(Decimal.pow(1e5, level.mul(level.add(1)).div(2))),
            level => this.getFunctionsValue().mul(level.add(1)).pow(level.pow(0.6)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            MoreFP: new FunctionsUpgrade("Gain more functions points (boosted based on layer you currently on)",
            level => new Decimal ((this.upgrades.EnhanceMFP.level.gte(1)) ? 1 : 1e120).mul(Decimal.pow(1e10, (((level.mul(Decimal.sub(1, Decimal.mul(0.075, this.upgrades.EnhanceMFP.level.min(1))))).mul((level.mul(Decimal.sub(1, Decimal.mul(0.075, this.upgrades.EnhanceMFP.level.min(1)))).add(1))).div(2))))),
            level => Decimal.add(2.5, game.metaLayer.layer.add(1).ln().add(1).ln()).pow(level.mul(level.add(1)).pow(0.6)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            VariablesCostDivider: new FunctionsUpgrade("Divide the cost of all variables (boosted based on ƒP)",
            level => new Decimal (1e200).mul(Decimal.pow(1e15, level.mul(level.add(1)).div(2))),
            level => Decimal.add(2, Decimal.log(Decimal.log(this.functionsPoints.add(1), 2).add(1), 2)).pow(Decimal.mul(level, Decimal.add(level, 1)).pow(0.6)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "÷")}
            ),
            UnlockNumber: new FunctionsUpgrade("Add <b>×(ln(x+1)+1)</b> on ƒP's effect, Your Layer boosts the gain of ƒP even more, Unlock Number",
            level => new Decimal (1e250).mul(Decimal.pow(1e25, level)).mul(Decimal.pow(1e5, (level.sub(2).max(0).mul(level.sub(1).max(0))).div(2))),
            level => level.add(1).pow(Decimal.add(0.6, Decimal.mul(0.09, this.upgrades.EnhanceUN.level.min(1)))),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),



            Variable_X: new FunctionsUpgrade("Increase the value of <b>x</b>",
            level => (Decimal.pow(1e3, level.mul(Decimal.sub(1, Decimal.mul(0.1, this.upgrades.EnhanceVar_epsilon.level.min(1)))))).mul(this.upgrades.EnhanceVar.level.gte(1) ? 1 : 1e3).div(this.getVariablesCostDivide()),
            level => new Decimal (1).add(level).add(this.upgrades.EnhanceVar_beta.level.gte(1) ? this.upgrades.Variable_beta.apply().pow(0.75).floor() : 0).add(this.upgrades.EnhanceVar_gamma.level.gte(1) ? this.upgrades.Variable_gamma.apply().pow(0.75).floor() : 0).add(this.upgrades.EnhanceVar_delta.level.gte(1) ? this.upgrades.Variable_delta.apply().pow(0.75).floor() : 0).add(this.upgrades.EnhanceVar_epsilon.apply()).add(this.upgrades.EnhanceVar_zeta.apply()).add(this.upgrades.EnhanceVar_eta.apply()).add(this.upgrades.Variable_alpha.apply()),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_alpha: new FunctionsUpgrade("Increase the value of <b>α</b>",
            level => (Decimal.pow(1e9, level.mul(Decimal.sub(1, Decimal.mul(0.1, this.upgrades.EnhanceVar_epsilon.level.min(1)))))).mul(this.upgrades.EnhanceVar.level.gte(1) ? 1 : 1e9).div(this.getVariablesCostDivide()),
            level => level.add(this.upgrades.EnhanceVar_gamma.level.gte(1) ? this.upgrades.Variable_gamma.apply().pow(0.75).floor() : 0).add(this.upgrades.EnhanceVar_delta.level.gte(1) ? this.upgrades.Variable_delta.apply().pow(0.75).floor() : 0).add(this.upgrades.EnhanceVar_epsilon.apply()).add(this.upgrades.EnhanceVar_zeta.apply()).add(this.upgrades.EnhanceVar_eta.apply()).add(this.upgrades.Variable_beta.apply()),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_beta: new FunctionsUpgrade("Increase the value of <b>β</b>",
            level => Decimal.pow(1e18, level.mul(Decimal.sub(1, Decimal.mul(0.1, this.upgrades.EnhanceVar_epsilon.level.min(1))))).mul(this.upgrades.EnhanceVar.level.gte(1) ? 1 : 1e50).div(this.getVariablesCostDivide()),
            level => level.add(this.upgrades.EnhanceVar_delta.level.gte(1) ? this.upgrades.Variable_delta.apply().pow(0.75).floor() : 0).add(this.upgrades.EnhanceVar_epsilon.apply()).add(this.upgrades.EnhanceVar_zeta.apply()).add(this.upgrades.EnhanceVar_eta.apply()).add(this.upgrades.Variable_gamma.apply()),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_gamma: new FunctionsUpgrade("Increase the value of <b>γ</b>",
            level => Decimal.pow(1e30, level.mul(Decimal.sub(1, Decimal.mul(0.1, this.upgrades.EnhanceVar_epsilon.level.min(1))))).mul(this.upgrades.EnhanceVar.level.gte(1) ? 1 : 1e80).div(this.getVariablesCostDivide()),
            level => level.add(this.upgrades.EnhanceVar_epsilon.apply()).add(this.upgrades.EnhanceVar_zeta.apply()).add(this.upgrades.EnhanceVar_eta.apply()).add(this.upgrades.Variable_delta.apply()),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_delta: new FunctionsUpgrade("Increase the value of <b>δ</b>",
            level => Decimal.pow(1e45, level.mul(Decimal.sub(1, Decimal.mul(0.1, this.upgrades.EnhanceVar_epsilon.level.min(1))))).mul(this.upgrades.EnhanceVar.level.gte(1) ? 1 : 1e100).div(this.getVariablesCostDivide()),
            level => level.add(this.upgrades.EnhanceVar_zeta.apply()).add(this.upgrades.EnhanceVar_eta.apply()).add(this.upgrades.Variable_epsilon.apply()),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_epsilon: new FunctionsUpgrade("Increase the value of <b>ε</b>",
            level => Decimal.pow(1e63, level.mul(Decimal.sub(1, Decimal.mul(0.1, this.upgrades.EnhanceVar_epsilon.level.min(1))))).mul(this.upgrades.EnhanceVar.level.gte(1) ? 1 : 1e128).div(this.getVariablesCostDivide()),
            level => level.add(this.upgrades.EnhanceVar_eta.apply()).add(this.upgrades.Variable_zeta.apply()),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_zeta: new FunctionsUpgrade("Increase the value of <b>ζ</b>",
            level => Decimal.pow(1e84, level.mul(Decimal.sub(1, Decimal.mul(0.1, this.upgrades.EnhanceVar_epsilon.level.min(1))))).mul(this.upgrades.EnhanceVar.level.gte(1) ? 1 : 1e200).div(this.getVariablesCostDivide()),
            level => level.add(this.upgrades.Variable_eta.apply()),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),
            Variable_eta: new FunctionsUpgrade("Increase the value of <b>η</b>",
            level => Decimal.pow(1e108, level.mul(Decimal.sub(1, Decimal.mul(0.1, this.upgrades.EnhanceVar_epsilon.level.min(1))))).mul(this.upgrades.EnhanceVar.level.gte(1) ? 1 : 1e256).mul(Decimal.pow(1e27, level.sub(24).max(0).pow(2))).div(this.getVariablesCostDivide()),
            level => level.add(this.upgrades.Enhancefx.apply().sub(1).max(0).min(100)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "",)}
            ),



            NumberMultiplier: new FunctionsUpgrade("Increase the Number Multiplier",
            level => (this.upgrades.UnlockNumber.level.gte(1)) ? new Decimal ("1.8e308").mul(Decimal.pow(1e10, level)).mul(Decimal.pow(1e5, (level.sub(2).max(0).mul(level.sub(1).max(0))).div(2))) : Decimal.dInf,
            level => level.pow(0.6).add(1),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            fxtoNumberMultiplier: new FunctionsUpgrade("Increase the Number Multiplier based on ƒ(<b>x</b>)",
            level => (this.upgrades.UnlockNumber.level.gte(1)) ? new Decimal ("4.04e404").mul(Decimal.pow(1e15, level)).mul(Decimal.pow(1e5, (level.sub(2).max(0).mul(level.sub(1).max(0))).div(2))) : Decimal.dInf,
            level => this.getFunctionsValue().add(1).log10().add(1).ln().add(1).pow(level.pow(0.4)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            NumberLimit: new FunctionsUpgrade("Increase the Number Limit",
            level => (this.upgrades.UnlockNumber.level.gte(1)) ? new Decimal ("1.8e308").mul(Decimal.pow(1e20, level)).mul(Decimal.pow(1e5, (level.sub(1).max(0).mul(level.max(0))).div(2))) : Decimal.dInf,
            level => Decimal.pow(1.1, level.pow(0.6)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            NumberRM: new FunctionsUpgrade("Number boosts all RMs at a reduced rate",
            level => (this.upgrades.UnlockNumber.level.gte(1)) ? new Decimal ("1.8e308").mul(Decimal.pow(1e5, (level.sub(1).max(0)).mul(level.sub(2).max(0)).div(2))).mul(Decimal.pow(1e25, level)) : Decimal.dInf,
            level => Decimal.pow(this.getNumberEff().pow(0.125), level.pow(0.5)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),


            WeakDivider: new FunctionsUpgrade("First Number Multiplier Divider is weaker and boost functions gain by <b>ζ</b> per level",
            level => (this.upgrades.UnlockNumber.level.gte(1)&&game.achievements[79].isCompleted) ? new Decimal ("4.04e404").mul(Decimal.pow(1e2, level.pow(3).sub(1))).mul(Decimal.pow(1e20, level)) : Decimal.dInf,
            level => Decimal.pow(0.9, level.pow(0.6)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            NumberLimit2: new FunctionsUpgrade("Your highest layer increases the number limit base",
            level => (this.upgrades.UnlockNumber.level.gte(1)&&game.achievements[79].isCompleted) ? new Decimal ("4.04e404").mul(Decimal.pow(1e5, (level.sub(1).max(0)).mul(level.sub(2).max(0)).div(2))).mul(Decimal.pow(1e30, level)) : Decimal.dInf,
            level => Decimal.pow(game.highestLayer.pow(0.125).add(1), level.pow(0.6)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            FunctionsNumberMult: new FunctionsUpgrade("Increase the Number Multiplier based on ƒP",
            level => (this.upgrades.UnlockNumber.level.gte(1)&&game.achievements[79].isCompleted) ? new Decimal ("1e512").mul(Decimal.pow(1e5, (level.sub(1).max(0)).mul(level.sub(2).max(0)).div(2))).mul(Decimal.pow(1e10, level)) : Decimal.dInf,
            level => Decimal.pow(this.functionsPoints.add(1).ln().add(1).ln(), level.pow(0.6)),
            {getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            WeakSoftcap: new FunctionsUpgrade("Layer Softcap is weaker and Boost Functions gain by log([Number Limit])<sup>0.5</sup> per <b>η</b> per [level]<sup>0.25</sup>",
            level => (this.upgrades.UnlockNumber.level.gte(1)&&game.achievements[79].isCompleted) ? new Decimal(["5.55e555", "1e729"][level.toNumber()]) : Decimal.dInf,
            level => [new Decimal (0.2), new Decimal (0.225), new Decimal (0.25)][level.min(2).toNumber()],
            {
                maxLevel: new Decimal (2),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),



            EnhanceRMBOL: new FunctionsUpgrade("Raise the First Function's effect to the <b>&zeta;</b>",
            level => (game.achievements[93].isCompleted) ? [new Decimal ("1e840"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.max(this.upgrades.Variable_zeta.apply().pow(level.min(1)), 1),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            EnhanceSF: new FunctionsUpgrade("Raise the Second Function's effect to the 1.125th Power, Boost Functions gain by <b>&epsilon;</b>",
            level => (game.achievements[93].isCompleted) ? [new Decimal ("1e846"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(1.125, level.min(1)).pow(this.upgrades.EnhanceFP.level.gte(1) ? this.upgrades.NumberLimit.apply() : new Decimal (1)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),

            EnhanceMLC: new FunctionsUpgrade("Third Function's Cost Scaling is slower, Raise All RMs by <b>&delta;</b>",
            level => (game.achievements[94].isCompleted) ? [new Decimal ("2.91e873"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => new Decimal (1.6).sub(level.min(1).mul(0.1)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            EnhanceCD: new FunctionsUpgrade("Number Limit base is boosted based on Number Multiplier, Increase Fourth Function's Base Effect (8 -> 10), Boost Functions gain by <b>&delta;</b>",
            level => (game.achievements[94].isCompleted) ? [new Decimal ("3.23e878"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(this.getNumberMult().pow(16), level.min(1)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),


            EnhanceRMBOf: new FunctionsUpgrade("Boost Functions gain and raise RMs by ln([Fifth Function's Effect]), Raise Layer Coins gain to <b>&gamma;</b>",
            level => (game.achievements[95].isCompleted) ? [new Decimal ("4.8e975"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(this.upgrades.ResourceMultipliersBasedOnfx.apply().max(1).ln().max(1), level.min(1)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "")}
            ),
            EnhanceMFP: new FunctionsUpgrade("Sixth Function's Cost base is removed and slow its cost scaling by 7.5%, log(<b>&beta;</b>) boosts RPs",
            level => (game.achievements[95].isCompleted) ? [new Decimal ("2e1070"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(this.upgrades.Variable_beta.apply().max(1).log10().max(1), level.min(1)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),

            EnhanceVCD: new FunctionsUpgrade("Seventh Function also applies to Resource Upgrades, ln(ln(<b>&alpha;</b>))<sup><b>&eta;</b></sup> boosts functions gain",
            level => (game.achievements[96].isCompleted) ? [new Decimal ("2.3e1150"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(this.upgrades.Variable_alpha.apply().max(1).ln().max(1).ln().max(1), level.min(1).mul(this.upgrades.Variable_eta.apply())),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            EnhanceUN: new FunctionsUpgrade("Eighth Function use a better effect formula ((x+1)<sup>0.6</sup> -> (x+1)<sup>0.69</sup>), ln(<b>x</b>)<sup>[Eighth Function's Effect]</sup> boosts functions gain",
            level => (game.achievements[96].isCompleted) ? [new Decimal ("5e1250"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(this.upgrades.Variable_X.apply().max(1).ln().max(1), level.min(1).mul(this.upgrades.UnlockNumber.apply())),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            
            
            EnhanceFM: new FunctionsUpgrade("Functions gain Multiplier's Cost Base is removed, Boost Functions gain by 1.125 per achievement",
            level => (game.achievements[98].isCompleted) ? [new Decimal ("5.5e1372"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(1.125, Decimal.mul(game.achievements.filter(ach => ach.isCompleted).length, level.min(1))),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            EnhanceFB: new FunctionsUpgrade("Functions gain Bonus's Cost is divided By your Current Number, Number boosts Number Multiplier and Functions gain",
            level => (game.achievements[98].isCompleted) ? [new Decimal ("5.55e1557"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => this.number.pow(level.min(1)).max(1).log10().max(1).log10().max(1).pow(2.5),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),

            Enhancefx: new FunctionsUpgrade("ReStack resets nothing, Increase the value of <b>k</b>, Next 100 <b>k</b> Increase <b>&eta;</b> and ƒ(<b>x</b>) boosts functions gain exponent by 0.01",
            level => (game.achievements[98].isCompleted) ? new Decimal (this.upgrades.EnhanceVar.level.gte(1) ? 1 : "5e1632").mul(Decimal.pow(1e135, level.mul(Decimal.sub(1, Decimal.mul(0.1, this.upgrades.EnhanceVar_epsilon.level.min(1)))))).mul(Decimal.pow(1e45, level.sub(1).max(0).pow(2))).div(this.getVariablesCostDivide()) : Decimal.dInf,
            level => level.add(1),
            {
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "")}
            ),
            EnhanceVar: new FunctionsUpgrade("All Variables' Cost Base are removed, Gain 100% Layer Coins Gain on Restack",
            level => (game.achievements[98].isCompleted) ? [new Decimal ("6.86e1715"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => level,
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: function()
                        {
                            return this.level.gt(0) ? "Unlocked" : "Locked";
                        }
            }
            ),


            EnhanceVar_x: new FunctionsUpgrade("Each <b>x</b> after 1.111e3 boost functions gain by 1.125",
            level => (game.achievements[100].isCompleted) ? [new Decimal ("5.51e2755"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(1.125, this.upgrades.Variable_X.apply().sub(1111).max(0).mul(level.min(1))),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            EnhanceVar_alpha: new FunctionsUpgrade("Each <b>&alpha;</b> after 975 add 1 to third function's base effect, Boost functions gain based on Layer Coins",
            level => (game.achievements[100].isCompleted) ? [new Decimal ("1.234e3690"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => game.restackLayer.layerCoins.max(1).log10().max(1).log10().max(1).ln().max(1).pow(level.min(1).mul(2.5)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),

            EnhanceVar_beta: new FunctionsUpgrade("floor(<b>&beta;</b><sup>0.75</sup>) adds to <b>x</b>, Boost functions gain based on the Resource Multiplier",
            level => (game.achievements[100].isCompleted) ? [new Decimal ("2.43e3727"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => game.metaLayer.getMultiPS().max(1).log10().max(1).log10().max(1).log10().max(1).pow(level.min(1).mul(2)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            EnhanceVar_gamma: new FunctionsUpgrade("floor(<b>&gamma;</b><sup>0.75</sup>) adds to <b>x</b> and <b>&alpha;</b>, Number boosts its Limit Base",
            level => (game.achievements[100].isCompleted) ? [new Decimal ("4.444e3960"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => this.number.max(1).log10().max(1).pow(level.min(1).mul(25)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),


            EnhanceVar_delta: new FunctionsUpgrade("floor(<b>&delta;</b><sup>0.75</sup>) adds to <b>x</b>, <b>&alpha;</b> and <b>&beta;</b>, All Row 2 Restack Upgrades are all applied at once at level 5, u22's effect never decrease, Boost RPs by slog([Layer Coins])",
            level => (game.achievements[101].isCompleted) ? [new Decimal ("8.044e4408"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => game.restackLayer.layerCoins.slog().pow(level.min(1)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
            EnhanceVar_epsilon: new FunctionsUpgrade("Slow down all variables' first cost scaling by 10%, All Row 4 Restack Upgrades are all applied at once at level 5, floor(<b>&epsilon;</b><sup>0.75</sup>) adds to First 4 Variables",
            level => (game.achievements[101].isCompleted) ? [new Decimal ("4.71e4710"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => this.upgrades.Variable_epsilon.apply().pow(0.75).mul(level.min(1)).floor(),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "+")}
            ),

            EnhanceVar_zeta: new FunctionsUpgrade("All variables' cost are divided by the Number Multiplier, All Row 6 Restack Upgrades are all applied at once at level 5, floor(<b>&zeta;</b><sup>0.75</sup>) adds to First 5 Variables",
            level => (game.achievements[101].isCompleted) ? [new Decimal ("8.793e5862"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => this.upgrades.Variable_zeta.apply().pow(0.75).mul(level.min(1)).floor(),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "+")}
            ),
            EnhanceVar_eta: new FunctionsUpgrade("Add all variable exponents in ƒ(<b>x</b>) by 0.5, All Row 8 Restack Upgrades are all applied at once at level 5, floor(<b>&eta;</b><sup>0.75</sup>) adds to First 6 Variables",
            level => (game.achievements[101].isCompleted) ? [new Decimal ("3.141e6282"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => this.upgrades.Variable_eta.apply().pow(0.75).mul(level.min(1)).floor(),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "+")}
            ),
            EnhanceReStack: new FunctionsUpgrade("Raise Number's effect by <b>k</b><sup>0.5</sup>, Layer Coins boost Resource Multipliers",
            level => (game.achievements[102].isCompleted) ? [new Decimal ("3.161e6531"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(10, game.restackLayer.layerCoins.log10().log10().pow(0.6)).pow(level.min(1)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "^")}
            ),
            EnhanceFP: new FunctionsUpgrade("Boost functions gain based on Bought Functions gain Multiplier levels, Raise Second Enhancer to [Third Number Upgrade's Effect], Boost Functions gain by 1e200 But Nullify Eighth Number Upgrade's Second Effect",
            level => (game.achievements[102].isCompleted) ? [new Decimal ("7.269e7269"), Decimal.dInf][level.toNumber()] : Decimal.dInf,
            level => Decimal.pow(this.upgrades.functionsGain.level.max(0).add(2) , level.min(1).mul(2)),
            {
                maxLevel: new Decimal (1),
                getEffectDisplay: effectDisplayTemplates.numberStandard(3, "x")}
            ),
        }
    }

    getNumberSoftcap1Eff() {
        let base = this.number.max("1.8e308").div("1.8e308").log10().add(1)
        let expo = new Decimal (0.6)
        expo = expo.mul(this.upgrades.WeakDivider.apply())
        let eff = base.pow(expo)
        return eff
    }

    getNumberSoftcap2Eff() {
        let base = new Decimal (1)
        if (this.number.gte("2e1024")) base = new Decimal (this.getNumberSoftcap1Eff().add(1)).log2().add(1)
        let expo = new Decimal (1.25)
        let eff = base.pow(expo)
        return eff
    }

    getNumberSoftcap1Expo() {
        return new Decimal (0.6)
        .mul(this.upgrades.WeakDivider.apply());
    }

    getNumberSoftcap2Expo() {
        return new Decimal (1.25);
    }

    getNumberLimit() {
        return new Decimal ("1.8e308")
        .mul(this.upgrades.NumberLimit2.apply())
        .mul(this.upgrades.EnhanceCD.apply())
        .mul(this.upgrades.EnhanceVar_gamma.apply())
        .pow(this.upgrades.NumberLimit.apply());
    }

    getNumberEffExpo()
    {
        return new Decimal (2).mul(this.upgrades.EnhanceReStack.level.gte(1) ? this.upgrades.Enhancefx.apply().pow(0.5) : new Decimal (1))
    }

    getNumberEff()
    {
        let base = Decimal.log2(game.functionsLayer.number).add(1)
        let expo = new Decimal (2)
        if (this.upgrades.EnhanceReStack.level.gte(1)) expo = expo.mul(this.upgrades.Enhancefx.apply().pow(0.5))
        let eff = base.pow(expo)
        return eff
    }

    getNumberMult()
    {
        return new Decimal (1)
        .mul(this.upgrades.NumberMultiplier.apply())
        .mul(this.upgrades.fxtoNumberMultiplier.apply())
        .mul(this.upgrades.FunctionsNumberMult.apply())
        .mul(this.upgrades.EnhanceFB.apply())
        .div(this.getNumberSoftcap1Eff())
        .div(this.getNumberSoftcap2Eff())
        .max(1);
    }

    getVariablesCostDivide() {
        return new Decimal (1)
        .mul(this.upgrades.EnhanceVar_zeta.level.gte(1) ? this.getNumberMult() : 1)
        .mul(this.upgrades.VariablesCostDivider.apply());
    }

    getFunctionsEff()
    {
        let base = Decimal.add(game.functionsLayer.functionsPoints, 1)
        let softcapstart = new Decimal ("2e1024")
        let softcappower = new Decimal ("0.1")
        if (base.gte(softcapstart)) base=softcapstart.mul((base.div(softcapstart)).pow(softcappower))
        let expo = new Decimal(0.5)
        let eff = base.pow(expo)
        if (game.functionsLayer.upgrades.UnlockNumber.level.gte(1)) eff = eff.mul(Decimal.add(game.functionsLayer.functionsPoints, 1).ln().add(1))
        return eff
    }

    getFunctionsGain()
    {
        let eff = new Decimal (1)
        .mul(this.getFunctionsBoostFromLayer())
        .mul(this.getFunctionsBoostFromfx())
        .mul(this.upgrades.functionsGain.apply())
        .mul(this.upgrades.functionsBonus.apply())
        .mul(this.upgrades.SelfFunctions.apply())
        .mul(this.upgrades.MoreFP.apply())
        .mul((this.upgrades.WeakDivider.level.gte(1)) ? Decimal.pow(this.upgrades.Variable_zeta.apply().max(1), this.upgrades.WeakDivider.level) : new Decimal (1))
        .mul((this.upgrades.WeakSoftcap.level.gte(1)) ? Decimal.pow(this.getNumberLimit().log10().pow(0.5), this.upgrades.Variable_eta.apply().pow(this.upgrades.WeakSoftcap.level.min(2).pow(0.25))).pow(this.upgrades.EnhanceFP.level.gte(1) ? new Decimal (0) : new Decimal (1)) : new Decimal (1))
        .mul((this.upgrades.EnhanceSF.level.gte(1)) ? this.upgrades.Variable_epsilon.apply().max(1) : new Decimal (1))
        .mul((this.upgrades.EnhanceCD.level.gte(1)) ? this.upgrades.Variable_delta.apply().max(1) : new Decimal (1))
        .mul(this.getNumberEff())
        .mul(this.upgrades.EnhanceRMBOf.apply())
        .mul(this.upgrades.EnhanceVCD.apply())
        .mul(this.upgrades.EnhanceFM.apply())
        .mul(this.upgrades.EnhanceFB.apply())
        .mul(this.upgrades.EnhanceVar_x.apply())
        .mul(this.upgrades.EnhanceVar_alpha.apply())
        .mul(this.upgrades.EnhanceVar_beta.apply())
        .mul(this.upgrades.EnhanceFP.apply())
        .mul(this.upgrades.EnhanceFP.level.gte(1) ? new Decimal (1e200) : new Decimal (1))
        return eff
    }

    getFunctionsValue()
    {
        return new Decimal (this.upgrades.Variable_X.apply().pow(Decimal.add(1, this.upgrades.EnhanceVar_eta.level.min(1).mul(0.5))))
        .add(this.upgrades.Variable_alpha.apply().mul(this.upgrades.Variable_X.apply().pow(Decimal.add(1.5, this.upgrades.EnhanceVar_eta.level.min(1).mul(0.5)))))
        .add(this.upgrades.Variable_beta.apply().mul(this.upgrades.Variable_X.apply().pow(Decimal.add(2, this.upgrades.EnhanceVar_eta.level.min(1).mul(0.5)))))
        .add(this.upgrades.Variable_gamma.apply().mul(this.upgrades.Variable_X.apply().pow(Decimal.add(2.5, this.upgrades.EnhanceVar_eta.level.min(1).mul(0.5)))))
        .add(this.upgrades.Variable_delta.apply().mul(this.upgrades.Variable_X.apply().pow(Decimal.add(3, this.upgrades.EnhanceVar_eta.level.min(1).mul(0.5)))))
        .add(this.upgrades.Variable_epsilon.apply().mul(this.upgrades.Variable_X.apply().pow(Decimal.add(3.5, this.upgrades.EnhanceVar_eta.level.min(1).mul(0.5)))))
        .add(this.upgrades.Variable_zeta.apply().mul(this.upgrades.Variable_X.apply().pow(Decimal.add(4, this.upgrades.EnhanceVar_eta.level.min(1).mul(0.5)))))
        .add(this.upgrades.Variable_eta.apply().mul(this.upgrades.Variable_X.apply().pow(Decimal.add(4.5, this.upgrades.EnhanceVar_eta.level.min(1).mul(0.5)))))
        .mul(this.upgrades.Enhancefx.apply());
    }
    

    isUnlocked()
    {
        return game.highestUpdatedLayer.gte("1.8e308");
    }

    getFBFfxexpo()
    {
        return new Decimal (1).
        mul(Decimal.add(1, this.upgrades.Enhancefx.apply().sub(1).max(0).min(100).mul(0.01)));
    }

    getFunctionsBoostFromfx()
    {
        return this.getFunctionsValue()
        .pow(Decimal.add(1, this.upgrades.Enhancefx.apply().sub(1).max(0).min(100).mul(0.01)));
    }

    getFunctionsBoostFromLayer()
    {
        if(game.metaLayer.layer.lte(new Decimal("1.8e308"))) return new Decimal(0);
        let base = Decimal.log2(game.metaLayer.layer.add(1)).sub(1024).max(0)
        let eff = base.pow(this.getFBFLexpo())
        return eff
    }
    getFBFLexpo()
    {
        let expo = new Decimal(1)
        expo = expo.mul(this.upgrades.UnlockNumber.apply())
        return expo
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
        if (this.upgrades.UnlockNumber.level.gte(1)) {
            this.number = this.number.mul(Decimal.pow(this.getNumberMult(), dt)).min(this.getNumberLimit())
        }
    }

    loadFromSave(obj)
    {
        this.functionsPoints = obj.functionsPoints;
        this.number = obj.number;
        for(const k of Object.getOwnPropertyNames(obj.upgrades))
        {
            if(this.upgrades[k])
            {
                this.upgrades[k].level = obj.upgrades[k].level;
            }
        };
    }
}