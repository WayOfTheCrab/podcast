onload = (_) => {
    const players = document.querySelectorAll("audio");

    for (i in players) {
        const player = players[i];
        const id = "player-id-" + player.currentSrc;

        var lastTime = parseFloat(window.localStorage.getItem(id)) || 0;

        player.currentTime = lastTime;
        player.ontimeupdate = (_) => {
            if (Math.abs(player.currentTime - lastTime) > 5) {
                lastTime = player.currentTime;
                window.localStorage.setItem(id, lastTime);
            }
        };
    }
};
