var mod = {
    primaryName: "ΩL",
    secondaryName: " EZ",
    version: "1.7",
    engineVer: "1.0.0", //DO NOT MODIFY
    debugMode: false,
    Infinities: [new Decimal(2).pow(1024), new Decimal("1.8e30008"), new Decimal("1.8e300000008"), new Decimal("ee38")],
    themes: [
        ["Dark", "css/themes/dark.css"],
        ["Light (Legacy)", "https://veprogames.github.io/omega-layers/css/main.css"],
        ["Light", "css/themes/light.css"],
        ["Neon", "css/themes/neon.css"],
        ["Godot Blue", "css/themes/darkblue.css"],
        ["Halloween", "css/themes/spooky.css"],
        ["eXPerience", "css/themes/experience.css"],
        ["Blue/Cyan Neon", "css/themes/blueneon.css"],
        ["Dark (Alt) [JeehanMoment]", "css/themes/darkalt.css"]
    ],
    layerNames: [
        ["Ω-Lλγers",
        [
            "αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ",
            "ψϝϛͱϻϙͳϸ",
            ["Ʊ", "Ʊ<sup>2</sup>","Ʊ<sup>3</sup>","Ʊ<sup>2<sup>2</sup></sup>"]
        ]],
        ["Latin",
        [
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            "ðþȝƿəŋſÐÞȜǷƏŊ",
            "æœĳǉ"
        ]],
        ["Alphabet",
        [
            "abcdefghijklmnopqrstuvwxyz",
            "123456789",
            "ABCD"
        ]],
        ["Symbols",
        [
            '!"£$%^&*;:@',
            "<,[{}].>",
            "+×÷^"
        ]],
        ["Binary",
        [
            '01',
            "01",
            "2345"
        ]],
        ["Morse code (JeehanMoment)",
        [
            [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."],
            ["-----", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----."],
            ["..--..", ".-...", "........", "...-."]
        ]],
        ["Wingdings (JeehanMoment)",
        [
            '♋♌♍♎♏♐♑♒♓🙰🙵●🔾■□🞐❑❒⬧⧫◆❖⬥⌧⮹⌘',
            "📁📂📄🗏🗐🗄⌛🖮🖰🖲",
            "✌👌👍👎"
        ]],
        ["Unary (JeehanMoment)",
        [
            '1',
            "1",
            "2345"
        ]],
        ["Who's on first? (JeehanMoment)",
        [
            ["YES", "FIRST", "DISPLAY", "OKAY", "SAYS", "NOTHING", "", "BLANK", "NO", "LED", "LEAD", "READ", "RED", "REED", "LEED", "HOLD ON", "YOU", "YOU ARE", "YOUR", "YOU'RE", "UR", "THERE", "THEY'RE", "THEIR", "THEY ARE", "SEE", "C", "CEE"],
            ["READY", "FIRST", "NO", "BLANK", "NOTHING", "YES", "WHAT", "UHHH", "LEFT", "RIGHT", "MIDDLE", "OKAY", "WAIT", "PRESS", "YOU", "YOU'RE", "UR", "U", "UH HUH", "UH UH", "WHAT?", "DONE", "NEXT", "HOLD", "SURE", "LIKE"],
            ["WHO'S", "ON", "FIRST", "?"]
        ]],
        ["Chess (JeehanMoment)",
        [
            ["♙", "♘", "♗", "♖", "♕", "♔", "♟", "♞", "♝", "♜", "♛", "♚", "O-O", "O-O-O"],
            ["a1", "a2", "a3", "a4", "a5", "a6" , "a7", "a8", "b1", "b2", "b3", "b4", "b5", "b6" , "b7", "b8", "c1", "c2", "c3", "c4", "c5", "c6" , "c7", "c8", "d1", "d2", "d3", "d4", "d5", "d6" , "d7", "d8", "e1", "e2", "e3", "e4", "e5", "e6" , "e7", "e8", "f1", "f2", "f3", "f4", "f5", "f6" , "f7", "f8", "g1", "g2", "g3", "g4", "g5", "g6" , "g7", "g8", "h1", "h2", "h3", "h4", "h5", "h6" , "h7", "h8"],
            ["x", "+", "=", "#"]
        ]],
        ["Confusion (JeehanMoment)",
        [
            ["1", "10", "11", "20", "21", "100", "101", "110", "111", "120", "121", "200", "201", "210", "211", "220", "221", "300", "301", "310", "311", "320", "321"],
            ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot" , "Golf", "Hotel", "India", "Juliett", "Kilo", "Lima", "Mike", "November" , "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor" , "Whiskey", "X-ray", "Yankee", "Zulu"],
            ["?", "!", ".", "-"]
        ]],
        ["Minecraft (Nif)",
        [
            ["Oak", "Spruce", "Birch", "Jungle", "Acacia", "Dark oak", "Crimson", "Warped", "Mangrove", "Bamboo", "Crafting table"],
            ["Coal", "Copper", "Amethyst", "Lapis", "Iron", "Gold", "Redstone", "Emerald", "Diamond", "Quartz", "Netherrite"],
            ["Overworld", "Nether", "End", "Aether"]
        ]
        ],
        ["Minecraft shorthand (Nif)",
        [
            ["O", "S", "B", "J", "A", "DO", "C", "W", "M", "B", "CT"],
            ["Co", "Cu", "Am", "L", "I", "G", "R", "E", "D", "Q", "N"],
            ["Ov", "Ne", "En", "Ae"]
        ]
        ],
        ["Elemental (Nif)",
        [
            ["Neutronium", "Hydrogen", "Helium", "Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon", "Sodium", "Magnesium", "Aluminium", "Silicon", "Phosphorous", "Sulfur", "Chlorine", "Argon", "Potassium", "Calcium", "Scandium", "Titanium", "Vanadium", "Chromium", "Manganese", "Iron", "Cobalt", "Nickel", "Copper", "Zinc", "Gallium", "Germanium", "Arsenic", "Selenium", "Bromine", "Krypton", "Rubidium", "Strontium", "Yttrium", "Zirconium", "Niobium", "Molybdenium", "Technecium", "Rutherfordium", "Rhodium", "Palladium", "Silver", "Cadmium", "Indium", "Tin", "Antimony", "Tellerium", "Iodine", "Xenon", "Caesium", "Barium", "Lanthanium", "Cerium", "Praseodymium", "Neodymium", "Promethium", "Samarium", "Europeum", "Gadolinium", "Terbium", "Dysprosium", "Holomium", "Erbium", "Thulium", "Ytterbium", "Lutetium", "Hafnium", "Tantalium", "Tungsten", "Rhenium", "Osmium", "Iridium", "Platinum", "Gold", "Mercury", "Thallium", "Lead", "Bismuth", "Polonium", "Astatine", "Radon", "Francium", "Radium", "Actinium", "Thorium", "Proactinium", "Uranium", "Neptunium", "Plutonium", "Americium", "Curium", "Berkelium", "Californium", "Einsteinium", "Fermium", "Mendelevium", "Nobelium", "Lawrencium", "Rutherfordium", "Dubnium", "Seaborgium", "Bohrium", "Hassium", "Meitnerium", "Darmstadtium", "Rogentgenium", "Copernicium", "Nihonium", "Flerovium", "Moscovium", "Livermorium", "Tenessine", "Oganesson"],
            ["Up quark", "Down quark", "Charm quark", "Strange quark", "Top quark", "Bottom quark", "Electron", "Muon", "Tau particle", "Electron neutrino", "Muon neutrino", "Tau neutrino", "Gluon", "Photon", "Z boson", "W boson", "Higgs boson"],
            ["Delta 2+", "Delta proton", "Delta neutron", "Delta electron"]
        ]
        ],
        ["Elemental shorthand (Nif)",
        [
            ["Nt", "H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "Ar", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"],
            ["u", "d", "c", "s", "t", "b", "e", "μ", "τ", "Ve", "Vμ", "Vτ", "g", "γ", "Z", "W", "H"],
            ["Δ⁺⁺", "Δ⁺", "Δ⁰", "Δ⁻"]
        ]
        ],
        ["Random",
        [
            Utils.createRandomWord(10, new Random(Date.now()).nextInt()),
            Utils.createRandomWord(10, new Random(Math.floor(Date.now()/2)).nextInt()),
            [Utils.createRandomWord(2, new Random(Math.floor(Date.now()/3)).nextInt()),Utils.createRandomWord(3, new Random(Math.floor(Date.now()/4)).nextInt()),Utils.createRandomWord(4, new Random(Math.floor(Date.now()/5)).nextInt()),Utils.createRandomWord(5, new Random(Math.floor(Date.now()/6)).nextInt())]
        ]],
    ],
    fonts: [
        ["Monospace Typewriter", "css/fonts/typespace.css"],
        ["Comic Sans", "css/fonts/comic.css"],
        ["Arial", "css/fonts/arial.css"],
        ["Roboto", "css/fonts/roboto.css"],
        ["Comfortaa", "css/fonts/comfortaa.css"],
        ["Minecraft", "css/fonts/minecraft.css"],
        ["Ubuntu", "css/fonts/ubuntu.css"],
        ["Special Elite", "css/fonts/special-elite.css"],
        ["Courier", "css/fonts/courier.css"],
        ["Montserrat", "css/fonts/montserrat.css"],
        ["Depixel (Hallbfett)", "css/fonts/depixelhbf.css"]
    ],
    saves: [
        ["Save 1", ""],
        ["Save 2", "2"],
        ["Save 3", "3"],
        ["Save 4", "4"],
        ["Save 5", "5"],
    ],
    extraNames: [
        this.primaryName+this.secondaryName, //title name
        this.primaryName+this.secondaryName, //save name
        this.primaryName+this.secondaryName, //save .txt name
    ],
    debugClasses: []
}

//DO NOT MODIFY CODE PAST THIS POINT AS IT IS NEEDED (unless your a pro coder then do some experimenting)

mod.layerNames.push(["Refresh Names", "refresh"])

document.getElementById("superImportantTitle").innerHTML = "<span class='omega'>"+mod.primaryName+"</span>"+mod.secondaryName+" v"+mod.version
