//Dummy JSON responses
let data = [

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": []
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 4, 0]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 1,
                "symbolIDs": [0]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": []
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 2,
                "symbolIDs": [1, 0]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [2, 1, 0]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 4,
                "symbolIDs": [5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 3,
                "symbolIDs": [2, 0]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": []
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [5, 4, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 9,
                "symbolIDs": [5, 3, 2, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [4, 0, 1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 1,
                "symbolIDs": [1]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [1, 2, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": []
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 5,
                "symbolIDs": [0, 2, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": []
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 6,
                "symbolIDs": [0, 2, 3]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 8,
                "symbolIDs": [0, 1, 2, 5]
            }
        }
    },

    {
        "response": {
            "results": {
                "win": 0,
                "symbolIDs": []
            }
        }
    },

]

let config = {
    type: Phaser.WEBGL,
    width: 1280,
    height: 720,
    scene: {
        preload: preload,
        create: create,
        pack: {
            files: [
                {
                    type: 'scenePlugin',
                    key: 'SpinePlugin',
                    url: 'SpineWebGLPlugin.min.js',
                    sceneKey: 'spine'
                }
            ]
        }
    }
}

let game

window.addEventListener('load', function () {
    game = new Phaser.Game(config)

})

var playerBalance = 50;
var stakeAmount = 0;

var stakeIncreaseButton;
var stakeDecreaseButton;

function preload() {
    this.load.image("symbol_00", "assets/symbols/symbol_00.png");

    this.load.image("upArrow", "assets/arrows/upArrow.png");
    this.load.image("downArrow", "assets/arrows/downArrow.png");

    this.load.image("spinButton", "assets/spinButton.png");

    this.load.setPath('assets/symbols/');

    this.load.spine('set0', 'symbol_00.json', ['symbol_00.atlas'], true);
    this.load.spine('set1', 'symbol_01.json', ['symbol_01.atlas'], true);
    this.load.spine('set2', 'symbol_02.json', ['symbol_02.atlas'], true);
    this.load.spine('set3', 'symbol_03.json', ['symbol_03.atlas'], true);
    this.load.spine('set4', 'symbol_04.json', ['symbol_04.atlas'], true);
    this.load.spine('set5', 'symbol_05.json', ['symbol_05.atlas'], true);
}

function create() {

    var balanceText = this.add.text(20, 20, "Player Balance: £" + playerBalance);
    var stakeText = this.add.text(20, 50, "Stake Amount: £" + stakeAmount);
    var errorText = this.add.text(20, 130, "").setColor("#ff0000");

    var resultText = this.add.text(config.width / 2, config.height / 5, "", { align: "center", fontSize: 50 }).setOrigin(0.5);
    var endGameText = this.add.text(config.width / 2, config.height - config.height / 5, "", { align: "center", fontSize: 60 }).setOrigin(0.5);

    this.add.image(40, 100, 'upArrow')
        .setScale(.25)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if (stakeAmount < playerBalance) {
                stakeAmount += 1;
                stakeText.setText("Stake Amount: £" + stakeAmount);
                errorText.setText("");
            }
            else {
                errorText.setText("Cannot increase Stake. Insufficient Balance");
            }

        });

    this.add.image(90, 100, 'downArrow')
        .setScale(.25)
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if (stakeAmount != 0) {
                stakeAmount -= 1;
                stakeText.setText("Stake Amount: £" + stakeAmount);
                errorText.setText("");

            }
            else {
                errorText.setText("Cannot set stake below 0.");
            }

        });
    let c1 = this.add.spine(config.width - 6.5 * (config.width / 8), config.height / 2, 'set0', 'static', true);
    let c2 = this.add.spine(config.width - 5.5 * (config.width / 8), config.height / 2, 'set1', 'static', true);
    let c3 = this.add.spine(config.width - 4.5 * (config.width / 8), config.height / 2, 'set2', 'static', true);
    let c4 = this.add.spine(config.width - 3.5 * (config.width / 8), config.height / 2, 'set3', 'static', true);
    let c5 = this.add.spine(config.width - 2.5 * (config.width / 8), config.height / 2, 'set4', 'static', true);
    let c6 = this.add.spine(config.width - 1.5 * (config.width / 8), config.height / 2, 'set5', 'static', true);

    var slots = [c1, c2, c3, c4, c5, c6];

    var spinButton = this.add.image(config.width / 2, config.height - config.height / 6, 'spinButton')
        .setInteractive()
        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
            if (stakeAmount == 0) {
                errorText.setText("Please set a stake amount");
            }
            else {
                playerBalance -= stakeAmount;

                spin(slots, resultText, endGameText, spinButton);

                balanceText.setText("Player Balance: £" + playerBalance);
                stakeAmount = 0;
                stakeText.setText("Stake Amount: £" + stakeAmount);

                this.time.delayedCall(2000, () => {spinButton.setInteractive()}, [], this);
            }
        });



}


function spin(slot, resultText, endGameText, spinButton) {
    var result = Math.floor(Math.random() * (slot.length))

    if (data[result].response.results.win != 0) {
        data[result].response.results.symbolIDs.forEach(element => slot[element].play("win", false));
        resultText.setText("WINNER\nYou Won: £" + data[result].response.results.win);
        this.playerBalance += data[result].response.results.win;
        
    }
    else {
        resultText.setText("Unlucky\nTry Again!!");
        
    }

    if (playerBalance == 0) {
        endGameText.setText("INSUFFICIENT BALANCE.\nPLEASE TOP UP TO CONTINUE PLAYING");
        spinButton.destroy();
    }
    spinButton.disableInteractive();
}