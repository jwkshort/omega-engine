const computed = {
    isMeta: function()
    {
        return game.metaLayer.active;
    },
    isDebug: function()
    {
        return mod.debugMode
    },
    isLayerCategory: function()
    {
        category = null
        switch(game.settings.tab)
        {
            case "Guide":
            case "Changelog":
            case "Engine Changelog":
                category = "Guide";
                break;
            case "Aleph":
            case "ReStack":
            case "Achievements":
            case "Secret Achievements":
                category = "Achievements";
                break;
            case "Settings":
            case "Debug":
                category = "Settings";
                break;
            default:
                category = "Unknown";
                break;
        }
        return category
    },
    secretAchUnlock: function() {
        return game.secretAchievements.filter(ach => ach.isCompleted).length > 0
    },
};
