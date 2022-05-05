Vue.component("functions-layer", {
    data: function() {
        return {
            functions: game.functionsLayer
        }
    },
    computed: {
        canProduceFunctions: function()
        {
            return this.functions.getFunctionsBoostFromLayer().gt(0);
        },
        isSoftCapped: function()
        {
            return this.functions.FunctionsPoints.gte("1.8e308");
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        highestLayer: () => functions.maxLayerUnlocked()
    },
    template: `<div class="functions-layer">
    <div class="resource">
    <p>You have {{formatNumber(functions.functionsPoints, 2, 2, 1e9)}} <span class="aleph">functions points</span></p>
    <p>You are gaining {{formatNumber(functions.getFunctionsGain(), 2, 2, 1e9)}} <span class="aleph">functions points</span> every second</p>
    </div>
    <div class="boosts">
    <p>Your <span class="aleph">functions points</span> raise all resource multipliers upgrades to the {{formatNumber(functions.getFunctionsEff(), 2, 2, 1e9)}}</p>
    </div>
    <div class="boosts">
    <div v-if="canProduceFunctions">
        <p>Your layer boosts the gain of functions points, translated to a x{{formatNumber(functions.getFunctionsBoostFromLayer(), 2, 2)}} Boost on <span class="aleph">functions</span> gain</p>
    </div>
    <div v-else>
        <p>You need to get <span>Ʊ</span> at least once to get <span class="aleph">functions</span></p>
    </div>
    <div class="tabs">
    <button @click="functions.maxAll()">Max All (M)</button>
    </div>
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.functionsGain"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.functionsBonus"></functions-upgrade>
    </div>
    <h3>Variables</h3>
    <p>ƒ(<b>x</b>)=<b>γx</b><sup>2.5</sup>+<b>βx</b><sup>2</sup>+<b>αx</b><sup>1.5</sup>+<b>x</b> = {{formatNumber(functions.getFunctionsValue(), 2, 2, 1e9)}}</p>
    <p>ƒ(<b>x</b>) also multiplies functions points gain</p>
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.Variable_X"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_alpha"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_beta"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_gamma"></functions-upgrade>
    </div>
    </div>
    <h3>Functions</h3>
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.ResourceMultipliersBasedOnLayers"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.SelfFunctions"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.MoreLayerCoins"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.CostDivider"></functions-upgrade>
    </div>
</div>
</div>`
});