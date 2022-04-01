var mod = {
    primaryName: "ඞ<sup>2</sup>",
    secondaryName: "-lλγers",
    version: "1.0.0 Preview",
    engineVer: "0.2.2 P2", //DO NOT MODIFY
    debugMode: true,
    themes: [
        ["sussy", "css/themes/sussy.css"],
        ["purply", "css/themes/purply.css"],
        ["hacky", "css/themes/hacky.css"],
        ["bad", "css/themes/bad.css"],
        ["dark", "css/themes/dark.css"],
        ["broken light", "https://veprogames.github.io/omega-layers/css/main.css"],
        ["neon", "css/themes/neon.css"],
        ["idk blue", "css/themes/darkblue.css"],
        ["halloween", "css/themes/spooky.css"],
        ["my pc", "css/themes/experience.css"]
    ],
    layerNames: [
        ["sussy names",
        [
            ["<sub><sub>ඞ</sub></sub>", "<sub>ඞ</sub>", "<sup>ඞ</sup>", "<sup><sup>ඞ</sup></sup>", "ඞ"],
            "<÷-=+×>",
            ["<span class='flipped-v'>ඞ</span>", "<span class='flipped-v'>ඞ</span><sub>ඞ</sub>", "<span class='flipped-v'>ඞ</span><sub><span class='flipped-v'>ඞ</span></sub>", "<span class='flipped-v'>ඞ<sub>ඞ</sub></span>"]
        ]],
        ["legacy sus names",
        [
            ["○","☛","🔫","🗡","ඞ"],
            "</-=+x>",
            ["<span class='flipped-v'>ඞ</span>", "α","β", "γ"]
        ]],
        ["omega names",
        [
            "αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ",
            "ψϝϛͱϻϙͳϸ",
            ["Ʊ", "Ʊ<sup>2</sup>","Ʊ<sup>3</sup>","Ʊ<sup>2<sup>2</sup></sup>"]
        ]],
        ["some letters",
        [
            "abcdefghijklmnopqrstuvwxyz",
            "123456789",
            "ABCD"
        ]],
        ["idk what they are",
        [
            '!"£$%^&*;:@',
            "<,[{}].>",
            "+×÷^"
        ]],
        ["2 numbers",
        [
            '01',
            "01",
            "2345"
        ]],
        ["crazy",
        [
            Utils.createRandomWord(10, new Random(Date.now()).nextInt()),
            Utils.createRandomWord(10, new Random(Math.floor(Date.now()/2)).nextInt()),
            [Utils.createRandomWord(2, new Random(Math.floor(Date.now()/3)).nextInt()),Utils.createRandomWord(3, new Random(Math.floor(Date.now()/4)).nextInt()),Utils.createRandomWord(4, new Random(Math.floor(Date.now()/5)).nextInt()),Utils.createRandomWord(5, new Random(Math.floor(Date.now()/6)).nextInt())]
        ]]
    ],
    fonts: [
        ["snas", "css/fonts/comic.css"],
        ["mono", "css/fonts/typespace.css"],
        ["airial", "css/fonts/arial.css"],
        ["robot", "css/fonts/roboto.css"],
        ["comfy", "css/fonts/comfortaa.css"],
        ["minceraft", "css/fonts/minecraft.css"],
    ],
    saves: [
        ["crewmate save", ""],
        ["impostor save", "2"],
        ["ghost save", "3"],
        ["sheriff save", "4"],
    ],
    debugClasses: []
}

//DO NOT MODIFY CODE PAST THIS POINT AS IT IS NEEDED (unless your a pro coder then do some experimenting)

mod.layerNames.push(["Refresh Names", "refresh"])

document.getElementById("superImportantTitle").innerHTML = "<span class='omega'>"+mod.primaryName+"</span>"+mod.secondaryName