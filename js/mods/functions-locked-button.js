Vue.component("functions-locked-button", {
    props: ["functions"],
    methods: {
        totalFunctions: () => game.functionsLayer.functionsPoints,
        Decimal: (x) => new Decimal(x)
    },
    template: `<button @click="$emit('click')" :disabled="Decimal(totalFunctions()).lt(functions)">
    <span v-if="Decimal(totalFunctions()).lt(functions)">Reach {{functions}}<span class="aleph">ƒP</span></span>
    <span v-else><slot></slot></span>
</button>`
})
