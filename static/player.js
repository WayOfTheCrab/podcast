onload = (_) => {
    const players = document.querySelectorAll("audio");

    for (i in players) {
        const player = players[i];
        const id = "player-id-" + player.currentSrc;

        let lastTime = window.localStorage.getItem(id);
        lastTime = parseFloat(lastTime);
        if (isNaN(lastTime)) {
            lastTime = 0.0;
        }

        player.currentTime = lastTime;

        const playerUpdate = (event) => {
            if (Math.abs(player.currentTime - lastTime) > 5) {
                lastTime = player.currentTime;
                window.localStorage.setItem(id, lastTime);
            }
        }

        player.ontimeupdate = playerUpdate;
    }
};
