Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v1.0.1</template>
    <template v-slot:text>- Reduce the meta requirement from 96 to 48<br> - Reduce the "???? ?????" Secret Achievement requirement from ??? to ??<br> - new content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.0.0</template>
    <template v-slot:text> - Game Released<br><h3>What's does this mod have?</h3><br> - Early game has a better balancing<br> - Start a game with a free log(ℵ) upgrade.<br> - ℵ Multiplier from the highest layer is buffed.<br> - Most Aleph Upgrades level caps are removed and they have a slow cost scaling.<br> - The β Prestige Formula is better effect is nerfed after few levels its stronger than original mod.<br> - First Meta Upgrade doesn't have max level, its cost scaling is slower and it's buffed.<br> - Most Meta Upgrades in Upgrade tree is buffed and cheaper, their level caps are now 10 and they have a fast cost scaling.<br> - Added 2 more Resource Multipliers and Powerers.<br> - V1.0.0 Currently Balanced up to Layer 1e100 in meta layer.
    </template>
    </guide-item>
</div>`
})