Vue.component("endgame-tab", {
    computed: {
        timeSpent: function() {
            time = game.timeSpent;
            formattedTime = functions.formatTime(time)
            return formattedTime
        },
    },
    methods: {
        hardResetGame: () => functions.hardResetGame(),
    },
    template: `<div id="endgame">
    <h2><span class="omega">wow</span> cool</h2>
    <p>you now have a degree in <b><i>sus</i></b> and you got it in <span class="omega"><b>{{timeSpent}}</b></span><br>
    <button onclick="game.settings.tab = 'Layers'">continue gaming</button> <button @click="hardResetGame()">die</button></p>
</div>`
})