Vue.component("functions-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'aleph' + `>ƒP</span>'"></resource-upgrade>`
});