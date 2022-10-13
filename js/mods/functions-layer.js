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
        EighthFunctionsOwned: function()
        {
            return this.functions.upgrades.UnlockNumber.level.gte(1);
        },
        NumberUpgrades2: function()
        {
            return game.achievements[76].isCompleted
        },
        isSoftCapped: function()
        {
            return this.functions.functionsPoints.gte("2e1024");
        },
        NumberSoftcap1: function()
        {
            return this.functions.number.gte("1.8e308")
        },
        NumberSoftcap2: function()
        {
            return this.functions.number.gte("2e1024")
        },
        Enhancer1: function()
        {
            return game.achievements[93].isCompleted
        },
        Enhancer2: function()
        {
            return game.achievements[94].isCompleted
        },
        Enhancer3: function()
        {
            return game.achievements[95].isCompleted
        },
        Enhancer4: function()
        {
            return game.achievements[96].isCompleted
        },
        Enhancer5: function()
        {
            return game.achievements[98].isCompleted
        },
        Enhancer6: function()
        {
            return game.achievements[100].isCompleted
        },
        Enhancer7: function()
        {
            return game.achievements[101].isCompleted
        },
        Enhancer8: function()
        {
            return game.achievements[102].isCompleted
        },
        Enhancer20Owned: function()
        {
            return this.functions.upgrades.EnhanceVar_eta.level.gte(1)
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        highestLayer: () => functions.maxLayerUnlocked()
    },
    template: `<div class="functions-layer">

    <div class="resource">
    <p>You have {{formatNumber(functions.functionsPoints, 3, 3, 1e9)}} <span class="aleph">functions points</span></p>
    <p>You are gaining {{formatNumber(functions.getFunctionsGain(), 3, 3, 1e9)}} <span class="aleph">functions points</span> every second</p>
    </div>

    <div class="boosts">
    <p>Your <span class="aleph">functions points</span> raise all resource multipliers upgrades to {{formatNumber(functions.getFunctionsEff(), 3, 3, 1e9)}}</p>
    <p>Base Effect Formula: x<sup>0.5</sup></p>
    <div v-if="EighthFunctionsOwned">
        <p>Current Effect Formula: x<sup>0.5</sup>×(ln(x+1)+1)</p>
    </div>
    <div v-else>
        <p>Current Effect Formula: x<sup>0.5</sup></p>
    </div>
    <div v-if="isSoftCapped">
    <p>This softcapped past 2.00e1024 ƒP</p>
    </div>
    <div v-else>
    </div>
    </div>

    <div class="boosts">
    <div v-if="canProduceFunctions">
        <p>Your layer boosts the gain of functions points, translated to a x{{formatNumber(functions.getFunctionsBoostFromLayer(), 3, 3, 1e9)}} Boost on <span class="aleph">functions</span> gain</p>
        <p>Base Effect Formula: max.(log<sub>2</sub>(x)-1024 , 0)</p>
        <div v-if="EighthFunctionsOwned">
            <p>Current Effect Formula: max.(log<sub>2</sub>(x)-1024 , 0)<sup>{{formatNumber(functions.getFBFLexpo(), 3, 3, 1e9)}}</sup></p>
        </div>
        <div v-else>
            <p>Current Effect Formula: max.(log<sub>2</sub>(x)-1024 , 0)</p>
        </div>
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

    <div v-if="Enhancer20Owned">
    <p>ƒ(<b>x</b>)=(<b>ηx</b><sup>5</sup>+<b>ζx</b><sup>4.5</sup>+<b>εx</b><sup>4</sup>+<b>δx</b><sup>3.5</sup>+<b>γx</b><sup>3</sup>+<b>βx</b><sup>2.5</sup>+<b>αx</b><sup>2</sup>+<b>x</b><sup>1.5</sup>)<b>k</b> = {{formatNumber(functions.getFunctionsValue(), 3, 3, 1e9)}}</p>
    </div>
    <div v-else>
    <p>ƒ(<b>x</b>)=(<b>ηx</b><sup>4.5</sup>+<b>ζx</b><sup>4</sup>+<b>εx</b><sup>3.5</sup>+<b>δx</b><sup>3</sup>+<b>γx</b><sup>2.5</sup>+<b>βx</b><sup>2</sup>+<b>αx</b><sup>1.5</sup>+<b>x</b>)<b>k</b> = {{formatNumber(functions.getFunctionsValue(), 3, 3, 1e9)}}</p>
    </div>

    <p>ƒ(<b>x</b>)<sup>{{formatNumber(functions.getFBFfxexpo(), 3, 3, 1e9)}}</sup> also multiplies functions points gain. ({{formatNumber(functions.getFunctionsBoostFromfx(), 3, 3, 1e9)}})</p>
    <p>Increasing a variable also increase the previous one.</p>

    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.Variable_X"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_alpha"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_beta"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_gamma"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_delta"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_epsilon"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_zeta"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.Variable_eta"></functions-upgrade>
    </div>

    <h3>Functions</h3>
    </div>
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.ResourceMultipliersBasedOnLayers"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.SelfFunctions"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.MoreLayerCoins"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.CostDivider"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.ResourceMultipliersBasedOnfx"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.MoreFP"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.VariablesCostDivider"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.UnlockNumber"></functions-upgrade>
    </div>

    <h3>Number</h3>
    <div v-if="EighthFunctionsOwned">
    <div class="resource">
    <p>Your number is currently <span class="big-number">{{formatNumber(functions.number, 3, 3, 1e9)}}</span></p>
    <p>Which is increasing by x<span class="big-number">{{formatNumber(functions.getNumberMult(), 3, 3, 1e9)}}</span> every second</p>
    <p>But capped at <span class="big-number">{{formatNumber(functions.getNumberLimit(), 3, 3, 1e9)}}</span></p>
    </div>
    <div class="boosts">
    <div v-if="NumberSoftcap1">
    <p>Your number is currently bigger than 1.80e308 which divide your multiplier by {{formatNumber(functions.getNumberSoftcap1Eff(), 3, 3, 1e9)}}</p>
    <p>Base Effect Formula: (log<sub>2</sub>(x/1.80e308)+1)<sup>0.6</sup></p>
    <p>Current Effect Formula: (log<sub>2</sub>(x/1.80e308)+1)<sup>{{formatNumber(functions.getNumberSoftcap1Expo(), 3, 3, 1e9)}}</sup></p>
    </div>
    <div v-else>
    </div>
    <div v-if="NumberSoftcap2">
    <p>Your number is currently bigger than 2e1024 which divide your multiplier by {{formatNumber(functions.getNumberSoftcap2Eff(), 3, 3, 1e9)}} (based on previous effect)</p>
    <p>Base Effect Formula: (log<sub>2</sub>(x+1)+1)<sup>1.25</sup></p>
    <p>Current Effect Formula: (log<sub>2</sub>(x+1)+1)<sup>{{formatNumber(functions.getNumberSoftcap2Expo(), 3, 3, 1e9)}}</sup></p>
    </div>
    <div v-else>
    </div>
    <p>Your number gives a x{{formatNumber(functions.getNumberEff(), 3, 3, 1e9)}} boost to functions gain</p>
    <p>Base Effect Formula: log<sub>2</sub>(x+1)<sup>2</sup></p>
    <p>Current Effect Formula: log<sub>2</sub>(x+1)<sup>{{formatNumber(functions.getNumberEffExpo(), 3, 3, 1e9)}}</sup></p>
    </div>
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.NumberMultiplier"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.fxtoNumberMultiplier"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.NumberLimit"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.NumberRM"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.WeakDivider"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.NumberLimit2"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.FunctionsNumberMult"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.WeakSoftcap"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    <div class="boosts">
    <p>Number is Not Unlocked Yet</p>
    </div>
    </div>

    <div v-if="Enhancer1">
    <h3>Enhancers</h3>
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceRMBOL"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceSF"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>

    <div v-if="Enhancer2">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceMLC"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceCD"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>

    <div v-if="Enhancer3">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceRMBOf"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceMFP"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>

    <div v-if="Enhancer4">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVCD"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceUN"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>

    <div v-if="Enhancer5">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceFM"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceFB"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>

    <div v-if="Enhancer5">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.Enhancefx"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVar"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>

    <div v-if="Enhancer6">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVar_x"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVar_alpha"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>

    <div v-if="Enhancer6">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVar_beta"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVar_gamma"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>

    <div v-if="Enhancer7">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVar_delta"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVar_epsilon"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>

    <div v-if="Enhancer7">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVar_zeta"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceVar_eta"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>
    <div v-if="Enhancer8">
    <div class="upgrades">
    <functions-upgrade :upgrade="functions.upgrades.EnhanceReStack"></functions-upgrade>
    <functions-upgrade :upgrade="functions.upgrades.EnhanceFP"></functions-upgrade>
    </div>
    </div>
    <div v-else>
    </div>
</div>
</div>`
});