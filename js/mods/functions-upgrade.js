Vue.component("functions-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'aleph' + `>FP</span>'"></resource-upgrade>`
});