Vue.component("number-upgrade", {
    props: ["upgrade"],
    template: `<resource-upgrade :upgrade="upgrade" :resourcename="'<span class=` + 'aleph' + `>NUM</span>'"></resource-upgrade>`
});