Vue.component("sabotage-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'aleph' + `>SP</span>'"></resource-upgrade>`
});