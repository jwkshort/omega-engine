const game = {
    version: "1.1",
    timeSaved: Date.now(),
    layers: [],
    highestLayer: 0,
    highestUpdatedLayer: 0,
    automators: {
        autoMaxAll: new Automator("Auto Max All", "Automatically buys max on all Layers", () =>
        {
            for(let i = Math.max(0, game.volatility.autoMaxAll.apply().toNumber()); i < game.layers.length; i++)
            {
                game.layers[i].maxAll();
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 3) + 1, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.toNumber()) * [0.2, 0.5, 0.8][level.toNumber() % 3]),
            level => level.gt(0) ? Math.pow(0.8, level.toNumber() - 1) * 10 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoPrestige: new Automator("Auto Prestige", "Automatically prestiges all Layers", () =>
        {
            for(let i = 0; i < game.layers.length - 1; i++)
            {
                if(game.layers[game.layers.length - 2].canPrestige() && !game.settings.autoPrestigeHighestLayer)
                {
                    break;
                }
                if(game.layers[i].canPrestige() && !game.layers[i].isNonVolatile())
                {
                    game.layers[i].prestige();
                }
            }
        }, new DynamicLayerUpgrade(level => Math.floor(level / 2) + 2, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * (level.toNumber() % 2 === 0 ? 0.25 : 0.75)),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 30 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAleph: new Automator("Auto Aleph", "Automatically Max All Aleph Upgrades", () =>
        {
            game.alephLayer.maxAll();
        }, new DynamicLayerUpgrade(level => level + 3, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(3).toNumber()) * 0.7),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 60 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
        autoAuto: new Automator("Auto Automators", "Automatically Max All Automators (except this)", () =>
        {
            for(let i = 0; i < game.automators.length - 2; i++)
            {
                game.automators[i].upgrade.buyMax()
            }
        }, new DynamicLayerUpgrade(level => level + 7, () => null, () => "Decrease the Automator interval",
            level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(10).toNumber()) * 10),
            level => level.gt(0) ? Math.pow(0.6, level.toNumber() - 1) * 500 : Infinity, null, {
                getEffectDisplay: effectDisplayTemplates.automator()
            })),
    },
    volatility: {
        layerVolatility: new DynamicLayerUpgrade(level => level + 1, level => level,
            function()
            {
                return "Make the next Layer non-volatile";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(1).toNumber())), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
        prestigePerSecond: new DynamicLayerUpgrade(level => Math.round(level * 1.3) + 3, level => null,
            () => "Boost the Prestige Reward you get per second",
            function(level)
            {
                const max = PrestigeLayer.getPrestigeCarryOverForLayer(Math.round(level.toNumber() * 1.3) + 3);
                return Decimal.pow(10, new Random(level.toNumber() * 10 + 10).nextDouble() * max).round();
            }, level => new Decimal(0.5 + 0.1 * level), null, {
                getEffectDisplay: effectDisplayTemplates.percentStandard(0)
            }),
        autoMaxAll: new DynamicLayerUpgrade(level => level + 2, level => level,
            function()
            {
                return "The next Layer is maxed automatically each tick";
            }, level => Decimal.pow(10, PrestigeLayer.getPrestigeCarryOverForLayer(level.add(2).toNumber()) * 0.125), level => level.sub(1), null, {
                getEffectDisplay: function()
                {
                    const val1 = this.level.eq(0) ? "None" : PrestigeLayer.getNameForLayer(this.apply().toNumber());
                    const val2 = PrestigeLayer.getNameForLayer(this.getEffect(this.level.add(1)).toNumber());
                    return val1 + " → " + val2;
                }
            }),
    },
    achievements: [
        new Achievement("You played!", "If you dont have this, you shouldn't exist", "<span>&Omega;<sub>EZ</sub></span>", () => true),
        new Achievement("Starting out", "Gain 1 &alpha;", "&alpha;", () => ((game.layers[0] && game.layers[0].resource.gte(1)))|| game.metaLayer.active),
        new Achievement("The beginning of Idling", "Buy 1 <span>&alpha;<sub>1</sub></span> Generator", "<span>&alpha;<sub>1</sub></span>", () => ((game.layers[0] && game.layers[0].generators[0].bought.gt(0)))|| game.metaLayer.active),
        new Achievement("Polynomial growth", "Buy 1 <span>&alpha;<sub>2</sub></span> Generator", "<span>&alpha;<sub>2</sub></span>", () => (game.layers[0] && game.layers[0].generators[1].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Another polynomial growth", "Buy 1 <span>&alpha;<sub>3</sub></span> Generator", "<span>&alpha;<sub>3</sub></span>", () => (game.layers[0] && game.layers[0].generators[2].bought.gt(0))|| game.metaLayer.active),
        new Achievement("A Square of Generators", "Buy 1 <span>&alpha;<sub>4</sub></span> Generator", "<span>&alpha;<sub>4</sub></span>", () => (game.layers[0] && game.layers[0].generators[3].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Pentagen", "Buy 1 <span>&alpha;<sub>5</sub></span> Generator", "<span>&alpha;<sub>5</sub></span>", () => (game.layers[0] && game.layers[0].generators[4].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Power of Six", "Buy 1 <span>&alpha;<sub>6</sub></span> Generator", "<span>&alpha;<sub>6</sub></span>", () => (game.layers[0] && game.layers[0].generators[5].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Heavenly Seven", "Buy 1 <span>&alpha;<sub>7</sub></span> Generator", "<span>&alpha;<sub>7</sub></span>", () => (game.layers[0] && game.layers[0].generators[6].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Octacore", "Buy 1 <span>&alpha;<sub>8</sub></span> Generator", "<span>&alpha;<sub>8</sub></span>", () => (game.layers[0] && game.layers[0].generators[7].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Nien!", "Buy 1 <span>&alpha;<sub>9</sub></span> Generator", "<span>&alpha;<sub>9</sub></span>", () => (game.layers[0] && game.layers[0].generators[8].bought.gt(0))|| game.metaLayer.active),
        new Achievement("The end of Idling?", "Buy 1 <span>&alpha;<sub>10</sub></span> Generator", "<span>&alpha;<sub>10</sub></span>", () => (game.layers[0] && game.layers[0].generators[9].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Upgradalicious", "Buy your first &alpha; Upgrade", "<span>&alpha;<sub>&uarr;</sub></span>", () => (game.layers[0] && game.layers[0].upgrades[0].level.gt(0))|| game.metaLayer.active),
        new Achievement("Stonks", "Reach 1.00e18 &alpha;", "&alpha;", () => (game.layers[0] && game.layers[0].resource.gte(1e18))|| game.metaLayer.active),
        new Achievement("Other Times Await", "Go &beta;", "&beta;", () => (game.layers[1] && game.layers[1].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Genarating Power", "Buy 1 <span>&beta;<sub>P<sub>1</sub></sub></span> Generator", "<span>&beta;<sub>P<sub>1</sub></sub></span>", () => (game.layers[1] && game.layers[1].powerGenerators[0].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Polynomial Power", "Buy 1 <span>&beta;<sub>P<sub>2</sub></sub></span> Generator", "<span>&beta;<sub>P<sub>2</sub></sub></span>", () => (game.layers[1] && game.layers[1].powerGenerators[1].bought.gt(0))|| game.metaLayer.active),
        new Achievement("In Thousands", "Buy 1,000 <span>&alpha;<sub>1</sub></span> Generator", "<span>&alpha;<sub>1</sub></span>", () => (game.layers[0] && game.layers[0].generators[0].bought.gt(1000))|| game.metaLayer.active),
        new Achievement("Other Times Arrived", "Go &beta; 10 times", "&beta;", () => (game.layers[1] && game.layers[1].timesReset >= 10)|| game.metaLayer.active),
        new Achievement("Automatic!", "Enable the \"Max All\" Automator", "<img alt=\"LC\" src=\"images/hardware-chip.svg\" alt=\"A\">", () =>( game.automators.autoMaxAll.upgrade.level.gte(1))|| game.metaLayer.active),
        new Achievement("Exploding number", "Gain 1,000,000 &beta;", "&beta;", () => (game.layers[1] && game.layers[1].resource.gte(1e6))|| game.metaLayer.active),
        new Achievement("A big Boost", "Reach 1.00e9 &beta;-Power", "<span>&beta;<sub>P</sub></span>", () => (game.layers[1] && game.layers[1].power.gte(1e9))|| game.metaLayer.active),
        new Achievement("To the Infinity?", "Gain &#126;1.80e308 &alpha;", "<span>&alpha;<sub>&#8734;</sub></span>", () => (game.layers[0] && game.layers[0].resource.gte("1.8e308"))|| game.metaLayer.active),
        new Achievement("A Square of Power", "Buy 1 <span>&beta;<sub>P<sub>4</sub></sub></span> Generator", "<span>&beta;<sub>P<sub>4</sub></sub></span>", () => (game.layers[1] && game.layers[1].powerGenerators[3].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Another Layer?!", "Reach 1.00e20 &beta;", "&beta;", () => (game.layers[1] && game.layers[1].resource.gte(1e20))|| game.metaLayer.active),
        new Achievement("A Cube of Power", "Buy 1 <span>&beta;<sub>P<sub>8</sub></sub></span> Generator", "<span>&beta;<sub>P<sub>8</sub></sub></span>", () => (game.layers[1] && game.layers[1].powerGenerators[7].bought.gt(0))|| game.metaLayer.active),
        new Achievement("Other Times Await... Again", "Go &gamma;", "&gamma;", () => (game.layers[2] && game.layers[2].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Gamma Power", "Buy 1 <span>&gamma;<sub>P<sub>1</sub></sub></span> Generator", "<span>&gamma;<sub>P<sub>1</sub></sub></span>", () => (game.layers[1] && game.layers[1].powerGenerators[0].bought.gt(0))|| game.metaLayer.active),
        new Achievement("The True Time", "Go &gamma; 42 Times", "&gamma;", () => (game.layers[2] && game.layers[2].timesReset >= 42)|| game.metaLayer.active),
        new Achievement("More Gamma, more Boost", "Gain 1,000,000 &gamma;", "&gamma;", () => (game.layers[2] && game.layers[2].resource.gte(1e6))|| game.metaLayer.active),
        new Achievement("Huge Number", "Gain 1.00e100,000 &alpha;", "&alpha;", () => (game.layers[1] && game.layers[0].resource.gte("1e100000"))|| game.metaLayer.active),
        new Achievement("Persistence", "Make Layer &alpha; Non-Volatile", '<img src="images/save.svg" alt="S">', () => (game.volatility.layerVolatility.level.gt(0))|| game.metaLayer.active),
        new Achievement("Other Times Await... Yet Again", "Go &delta;", "&delta;", () => (game.layers[3] && game.layers[3].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Aleph-0", "Reach 1,000 &#8501;", '<span class="aleph">&#8501;<sub>0</sub></span>', () => (game.alephLayer.bestaleph.gte(1000))|| game.metaLayer.active),
        new Achievement("Aleph-1", "Reach 1.00e30 &#8501;", '<span class="aleph">&#8501;<sub>1</sub></span>', () => (game.alephLayer.bestaleph.gte(1e30))|| game.metaLayer.active),
        new Achievement("Aleph-2", "Reach &#126;1.80e308 &#8501;", '<span class="aleph">&#8501;<sub>&#8734;</sub></span>', () => (game.alephLayer.bestaleph.gte("1.8e308"))|| game.metaLayer.active),
        new Achievement("Much aleph, much wow", "Reach 2.00e1024 &#8501;", '<span class="aleph">&#8501;</span>', () => (game.alephLayer.bestaleph.gte("2e1024"))|| game.metaLayer.active),
        new Achievement("Aleph-π", "Have 3.14e1592 aleph", '<span class="aleph">&aleph;<sub>π</sub></span>', () => (game.alephLayer.bestaleph.gte("3.14e1592"))|| game.metaLayer.active),
        new Achievement("It all runs by itself", "Enable the Aleph Automator", "<img src=\"images/hardware-chip.svg\" alt=\"A\">", () => (game.automators.autoAleph.upgrade.level.gte(1))|| game.metaLayer.active),
        new Achievement("How many are there!?", "Go &epsilon;", "&epsilon;", () => (game.layers[4] && game.layers[4].timesReset > 0)|| game.metaLayer.active),
        new Achievement("It's time to stop!", "Go &zeta;", "&zeta;", () => (game.layers[5] && game.layers[5].timesReset > 0)|| game.metaLayer.active),
        new Achievement("End Game?", "Gain 1.00e1,000,000,000 &alpha;", "&alpha;", () => (game.layers[1] && game.layers[0].resource.gte("1e1000000000"))|| game.metaLayer.active),
        new Achievement("Temperature", "Go &theta;", "&theta;", () => (game.layers[7] && game.layers[7].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Oκay?", "Go &kappa;", "&kappa;", () => (game.layers[9] && game.layers[9].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Stacking up", "Do a restack and restart your progress", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.timesReset > 0),
        new Achievement("H λ l f L i f e  C o n f i r m e d !", "Go &lambda;", "&lambda;", () => (game.layers[10] && game.layers[10].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Double Logarithms", "Gain ee15.95 &alpha;", "&alpha;", () => (game.layers[0] && game.layers[0].resource.gte("1e9e15"))|| game.metaLayer.active),
        new Achievement("Coefficient of Static Friction", "Go &mu;", "&mu;", () => (game.layers[11] && game.layers[11].timesReset > 0)|| game.metaLayer.active),
        new Achievement("νeprogames!", "Go &nu;", "&nu;", () => (game.layers[12] && game.layers[12].timesReset > 0)|| game.metaLayer.active),
        new Achievement("A Slice of Pi", "Go &pi;", "&pi;", () => (game.layers[15] && game.layers[15].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Torque", "Go &tau;", "&tau;", () => (game.layers[18] && game.layers[18].timesReset > 0)|| game.metaLayer.active),
        new Achievement("One for Everyone", "Gain 7.80e9 Layer Coins", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.layerCoins.gte(7.8e9)),
        new Achievement("Super Upgradalicious", "Max all the non-meta upgrades", "↑<sub>↑<sub>↑</sub></sub>", () => ((Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(0)).length + Object.values(game.restackLayer.permUpgrades).filter(u => u.level.gt(1)).length) == 12) || game.metaLayer.active),
        new Achievement("What's the Point of Layers?", "Buy the Meta Upgrade", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.metaUpgrade.level.gt(0)),
        new Achievement("Position", "Go &chi;", "&chi;", () => (game.layers[21] && game.layers[21].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Angular Velocity", "Go &omega;", "&omega;", () => (game.layers[23] && game.layers[23].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Kinetic Energy", "Go &Kappa;", "&Kappa;", () => (game.layers[33] && game.layers[33].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Power", "Go &Rho;", "&Rho;", () => (game.layers[40] && game.layers[40].timesReset > 0)|| game.metaLayer.active),
        new Achievement("Ω-Layers", "Reach Layer &Omega;", "&Omega;", () => game.layers[47]|| game.metaLayer.active),
        new Achievement("No turning back", "Go meta and be reborn", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.metaLayer.active),
        new Achievement("One for each Second", "Advance 1 Layer per second", "»", () => game.metaLayer.getLayersPS().gte(1)),
        new Achievement("Meta-Layers", "Reach Layer &Omega; in meta", "&Omega;", () => game.metaLayer.layer.gte(48)),
        new Achievement("The Ladder is Infinite", "Reach Layer 1000", "&Rho;↑&beta;", () => game.metaLayer.layer.gte(1000)),
        new Achievement("Stupidly fast", "Advance 10 Layer per second", "»»", () => game.metaLayer.getLayersPS().gte(10)),
        new Achievement("What are Layer resets?", "Buy the ReStack Tree Upgrade in Row 5", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.upgradeTreeNames.substractLayers.apply()),
        new Achievement("Faster than Light", "Advance ~300e9 Layers per second", "»»»", () => game.metaLayer.getLayersPS().gte(299792458)),
        new Achievement("It never Ends", "Reach Layer 1.00e10", "<span style='font-size: 30%;'><span>Ω<sub>ϝ</sub></span><sup>ρ</sup>↑<span>Ω<sub>ϙ</sub></span><sup>Ν</sup>↑<span>Ω<sub>ϛ</sub></span><sup>κ</sup>↑<span>Ω</span><sup>Σ</sup></span>", () => game.metaLayer.layer.gte(1e10)),
        new Achievement("N I C E", "Reach Layer 4.20e69", "nice", () => game.metaLayer.layer.gte(4.20e69)),
        new Achievement("What are Time resets?", "Buy the ReStack Tree Upgrade in Row 7", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.upgradeTreeNames.noReset.apply()),
        new Achievement("It truly never Ends", "Reach Layer 1e100", "<span style='font-size: 30%;'><span>2Ω<sub>ϝ</sub></span><sup>ρ</sup>↑<span>Ω<sub>ϙ</sub></span><sup>Ν</sup>↑<span>Ω<sub>ϛ</sub></span><sup>κ</sup>↑<span>Ω</span><sup>Σ</sup></span>", () => game.metaLayer.layer.gte(1e100)),
        new Achievement("Inf-Infinity", "Reach Layer 1.8e308", "<span style='font-size: 100%;'>Ʊ</span>", () => game.metaLayer.layer.gte("1.8e308")),
        new Achievement("(softcapped) speed", "Advance ~1.8e308 Layers per second", "<span>»<sub>&#8734;</sub></span>", () => game.metaLayer.getLayersPS().gte("1.8e308")),
        new Achievement("ƒ(x) = 1", "Reach 1 &#0131;P", '<span class="aleph">&#0131;<sub>1</sub></span>', () => Decimal.gte(game.functionsLayer.functionsPoints, 1)),
        new Achievement("ƒ(x) = 2", "Reach 1,000,000 &#0131;P", '<span class="aleph">&#0131;<sub>2</sub></span>', () =>Decimal.gte(game.functionsLayer.functionsPoints, 1e6)),
        new Achievement("ƒ(x) = 3", "Reach 1.00e100 &#0131;P", '<span class="aleph">&#0131;<sub>3</sub></span>', () => Decimal.gte(game.functionsLayer.functionsPoints, 1e100)),
        new Achievement("ƒ(x) = 4", "Reach ~1.80e308 &#0131;P", '<span class="aleph">&#0131;<sub>&#8734;</sub></span>', () => Decimal.gte(game.functionsLayer.functionsPoints, "1.8e308")),
        new Achievement("ƒ(x) = 5", "Reach 1.2e480 &#0131;P Reward: Unlock another row of Number Upgrades", '<span class="aleph">&#0131;<sub>5</sub></span>', () => Decimal.gte(game.functionsLayer.functionsPoints, "1.2e480")),
        new Achievement("Variables?", "Increase your <b>x</b>", '<span class="aleph">&#0131;<sub>x</sub></span>', () => game.functionsLayer.upgrades.Variable_X.level.gte(1)),
        new Achievement("Starting Again", "Increase your <b>&alpha;</b>", '<span class="aleph">&#0131;<sub>&alpha;</sub></span>', () => game.functionsLayer.upgrades.Variable_alpha.level.gte(1)),
        new Achievement("Other Times Still Await...", "Increase your <b>&beta;</b>", '<span class="aleph">&#0131;<sub>&beta;</sub></span>', () => game.functionsLayer.upgrades.Variable_beta.level.gte(1)),
        new Achievement("Poγγ", "Increase your <b>&gamma;</b>", '<span class="aleph">&#0131;<sub>&gamma;</sub></span>', () => game.functionsLayer.upgrades.Variable_gamma.level.gte(1)),
        new Achievement("Delta Timewall Gaming", "Increase your <b>&delta;</b>", '<span class="aleph">&#0131;<sub>&delta;</sub></span>', () => game.functionsLayer.upgrades.Variable_delta.level.gte(1)),
        new Achievement("Rush ε", "Increase your <b>&epsilon;</b>", '<span class="aleph">&#0131;<sub>&epsilon;</sub></span>', () => game.functionsLayer.upgrades.Variable_epsilon.level.gte(1)),
        new Achievement("Shall we stop now?", "Increase your <b>&zeta;</b>", '<span class="aleph">&#0131;<sub>&zeta;</sub></span>', () => game.functionsLayer.upgrades.Variable_zeta.level.gte(1)),
        new Achievement('"Eta When?"', "Increase your <b>&eta;</b>", '<span class="aleph">&#0131;<sub>&eta;</sub></span>', () => game.functionsLayer.upgrades.Variable_eta.level.gte(1)),
        new Achievement("The Number", "Unlock Number", '<span class="aleph">1</span>', () => game.functionsLayer.upgrades.UnlockNumber.level.gte(1)),
        new Achievement("Increasing", "Start Increasing the Number", '<span class="aleph">1.01</span>', () => game.functionsLayer.upgrades.NumberMultiplier.level.gte(1)),
        new Achievement("Capped out", "Reach the number ~1.8e308", '<span class="aleph">&#8734;</span>', () => Decimal.gte(game.functionsLayer.number, "1.8e308")),
        new Achievement("Extended", "Increase the number limit", '<span class="aleph">+1</span>', () => game.functionsLayer.upgrades.NumberLimit.level.gte(1)),
        new Achievement("One for Everything", "Gain ee420.69 Layer Coins", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.layerCoins.gte("ee420.69")),
        new Achievement("Endgame", "Reach layer 1e470 and finish Omega Layers EZ", "Ʊ", () => game.metaLayer.layer.gte("1e416")),
    ],
    secretAchievements: [
        new Achievement("Meta sucks!", "Reach Layer 96 without going meta", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.highestLayerpremeta >= 95),
        new Achievement("The Ladder is Actually Infinite", "Reach Layer 1000 without going meta", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.highestLayerpremeta >= 999),
        new Achievement("Like Watching Paint Dry", "Reach the cap of \"The Layer Exponential Factor increases over time\"", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.permUpgrades.layerExponentialBoostFactorTime.getEffect(game.restackLayer.permUpgrades.layerExponentialBoostFactorTime.level) === Utils.clamp(game.restackLayer.permUpgrades.layerExponentialBoostFactorTime.level, 1, 2)*3),
        new Achievement("NC Challenge", "Get &epsilon; without completing any challenges", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.layers[4] && game.layers[2].challenges[0].level == 0 && game.layers[2].challenges[1].level == 0 && game.layers[2].challenges[2].level == 0 && game.layers[2].challenges[3].level == 0 && game.layers[2].challenges[4].level == 0 && game.layers[3].challenges[0].level == 0 && game.layers[3].challenges[1].level == 0 && game.layers[3].challenges[2].level == 0 && game.layers[3].challenges[3].level == 0 && game.layers[3].challenges[4].level == 0 && game.layers[3].challenges[5].level == 0),
        new Achievement("Volatility sucks!", "Get &epsilon; without non-volatiling any layer", "<img alt=\"LC\" class=\"inline\" src=\"images/save.svg\"/>", () => game.layers[4] && game.volatility.layerVolatility.level.eq(0)),
        new Achievement("You having fun with that alpha?", "Have a game with over a day of time and exactly 1 &alpha;", "...", () => game.layers[0].resource.eq(1) && game.timeSpent > 3600*24),
        new Achievement("A very long wait...", "Have a game with over 3 months of time", "...", () => game.timeSpent > 50803200),
        new Achievement("Aleph-e", "Have 2.71e8281 aleph", "<span>&aleph;<sub>e</sub></span>", () => game.alephLayer.bestaleph.gte("2.71e8281")),
        new Achievement("Much Aleph, Much wow Original", "Have 1.00e10000 aleph", "&aleph;", () => game.alephLayer.bestaleph.gte("1e10000")),
        new Achievement("Should we tell them to stop? I", "Buy 10,000 Meta Upgrades", "<img alt=\"LC\" class=\"inline\" src=\"images/layercoin.svg\"/>", () => game.restackLayer.metaUpgrade.level.gte(10000)),
        new Achievement("Truly capped", "Let your Number multiplier reach x1.00 when your number is bigger than 1.8e308", '<span>x1.00</span>', () => Decimal.gte(game.functionsLayer.number, "1.8e308")&&Decimal.eq(game.functionsLayer.getNumberMult(), 1)),
    ],
    alephLayer: new AlephLayer(),
    restackLayer: new ReStackLayer(),
    metaLayer: new MetaLayer(),
    functionsLayer: new FunctionsLayer(),
    currentLayer: null,
    currentChallenge: null,
    notifications: [],
    timeSpent: 0,
    settings: {
        tab: "Layers",
        showAllLayers: true,
        showMinLayers: 5,
        showMaxLayers: 5,
        showLayerOrdinals: true,
        layerTickSpeed: 1,
        buyMaxAlways10: true,
        disableBuyMaxOnHighestLayer: false,
        resourceColors: true,
        resourceGlow: true,
        newsTicker: true,
        autoMaxAll: true,
        autoPrestigeHighestLayer: true,
        notifications: true,
        saveNotifications: true,
        confirmations: true,
        offlineProgress: true,
        titleStyle: 2,
        theme: mod.themes[0][1],
        layerNames: mod.layerNames[0][1],
        font: mod.fonts[0][1],
        saveInfo: "i have no idea"
    },
};
const initialGame = functions.getSaveString();