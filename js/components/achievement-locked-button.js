Vue.component("restack-locked-button", {
    props: ["achievements"],
    methods: {
        completedAchievements: () => game.achievements.filter(ach => ach.isCompleted)
    },
    template: `<button @click="$emit('click')" :disabled="completedAchievements() < achievements">
    <span v-if="completedAchievements() < achievements">Reach {{achievements}}<img alt="LC" class="inline" src="images/star.svg"/></span>
    <span v-else><slot></slot></span>
</button>`
})
