Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
    <template v-slot:title>v1.7.0.2 - Style up</template>
    <template v-slot:text>- Updated by jwklong (the omega engine maker)<br>- Changed cover in embed<br>- Added Elements notation (not to be confused with elemental)<br>- Some other things that wont be noticed, but may be used in a future update
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.7.0.1 - Naming alterations</template>
    <template v-slot:text>- Updated by Nif<br>- Added bamboo and amethyst to Minecraft notations<br>- Added Neutronium to Elemental notations<br>- I am now Nif
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.7 - ENHANCED</template>
    <template v-slot:text>- Add 14 more enhancers<br>- New Themes and Fonts and Layers Names<br>-Changed u91<br>-Expect Some Bugs or Lag<br>- Change Precisions to 3 instead of 2<br> Endgame: Layer 8.080e808<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.6.2 - NaN Fix</template>
    <template v-slot:text>- NaN Bug Fixed (epic)<br>- Changed Generator Names<br>- You Can Buy 3rd Number Upgrade Anytime now<br>- Endgame: Layer 1e535<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.6.1 - Fix</template>
    <template v-slot:text>- ^0 Resource Multiplier Boost Bug Fixed (thanks person#2629)<br>- Endgame: Layer 1e535<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.6 - Meta Enhance</template>
    <template v-slot:text>- Attempt 3 on Fixing NaN Bug in Meta (LoL)<br>- Add more upgrades in the restack tree<br>- Add 5 Achievements Total: 97 Achievements<br>- Endgame: Layer 1e535<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.5.2 - this update still stinks</template>
    <template v-slot:text>- Attempt 2 on Fixing NaN Bug in Meta<br>- Reduce some timewalls in meta section<br>- Add 1 Achievements Total: 92 Achievements (It was supposed to be on V1.6 but whatever)<br>- Endgame: Layer 1e470<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.5.1 - this update stinks</template>
    <template v-slot:text>- Fix NaN Bug in Meta Maybe?<br>- Endgame: Layer 1e470<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.5 - the epic update</template>
    <template v-slot:text>- Fix Save and Achievements<br>- Add even more Contents to Functions<br>- Buff both Row 8 upgrades in meta upgrade tree<br>- Add Guide (trust me it's helpful)<br>- Add 11 Achievements. Total: 91 Achievements<br>- Add ? Secret Achievements. Total: ?? Secret Achievements<br>- Endgame: Layer 1e470<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.4</template>
    <template v-slot:text>- Improve the softcap formula after layer 1.8e308 layers/s<br>- Add more Contents to Functions layer.<br> - Add 8 Achievements. Total: 80 Achievements<br>- Add ? Secret Achievements. Total: ?? Secret Achievements<br>- Add 2 new fonts.<br>- Add a new names.<br><br>- Endgame: Layer 1e327<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.3.2</template>
    <template v-slot:text>- Fixed a lot of uncool bugs.<br>- Endgame: Layer 1e314<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.3.1</template>
    <template v-slot:text>- Add 2 Achievements. Total: 72 Achievements<br>- Add ? Secret Achievements. Total: ? Secret Achievements<br>- Updated omega engine to v0.2.3<br>- Endgame: Layer 1e312<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.3</template>
    <template v-slot:text>- Add ? Secret Achievements. Total: ? Secret Achievements<br>- Add 2 Custom Names.<br>- Add a Prestige layer.<br>- Softcapped Layers gain past 1.8e308<br> - Edited Description, Icon, and Names<br> - Endgame: Layer 1e312<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.2</template>
    <template v-slot:text>- Add ? Secret Achievements. Total: ? Secret Achievements<br> - Nerfed Meta Upgrades by capping their levels at 5.<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.1</template>
    <template v-slot:text>- Add 66 Achievements. Total: 70 Achievements<br> - Add ? Secret Achievements. Total: ? Secret Achievements<br> - Balanced Aleph Layer Little Better.<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.0.1</template>
    <template v-slot:text>- Reduce the meta requirement from 96 to 48<br> - Reduce the "???? ?????" Secret Achievement requirement from ??? to ??<br> - New content coming soon...
    </template>
    </guide-item>
    <guide-item>
    <template v-slot:title>v1.0.0</template>
    <template v-slot:text> - Game Released<br><h3>What's does this mod have?</h3><br> - All Generators and Power Generators Multiplier per 10 levels base is 4<br>- Early game has a better balancing<br> - Start a game with a free log(ℵ) upgrade.<br> - ℵ Multiplier from the highest layer is buffed.<br> - Most Aleph Upgrades level caps are removed and they have a slow cost scaling.<br> - The β Prestige Formula is better effect is nerfed after few levels its stronger than original mod.<br> - First Meta Upgrade doesn't have max level, its cost scaling is slower and it's buffed.<br> - Most Meta Upgrades in Upgrade tree is buffed and cheaper, their level caps are now 5 and they have a fast cost scaling.<br> - Added 2 more Resource Multipliers and Powerers.<br> - V1.0.0 Currently Balanced up to Layer 1e100 in meta layer.
    </template>
    </guide-item>
</div>`
})
