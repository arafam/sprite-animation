const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

// Loads sprite sheet
//ASSET_MANAGER.queueDownload("./sprites/Miko.png");
ASSET_MANAGER.queueDownload("./sprites/Miko2.png");
//ASSET_MANAGER.queueDownload("./sprites/Red.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.addEntity(new Miko(gameEngine));

	gameEngine.start();
});
