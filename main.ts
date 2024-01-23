
function Wopen() {
	const channel: BroadcastChannel = new BroadcastChannel('app-data');
	const data = "test.html";
	 

	const windows: any[] = [];
            const size = 15;
            for (let i:number = 0; i < size; i ++) {
                let x:number = i * 50
                let y:number = Math.sin(i) * 150 + 200
                windows.push(window.open(data, '_blank', 'width=5,height=5,menubar=no,toolbar=no,status=no,scrollbars=yes,screenX=' + x  + ',screenY=' + y))
            }
            setTimeout(() => {
                for (let i:number = size - 1; i >= 0; i --) {
					console.log(i);
                    windows[i].close();
                }
            }, 10000)
	
	//channel.postMessage(data);
}
	const channel: BroadcastChannel = new BroadcastChannel('app-data');
channel.addEventListener ('message', (event) => {
 console.log(event.data);
});

window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 1280,
		height: 720,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Level", Level);
    game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {
		
        this.scene.start("Preload");
	}

}