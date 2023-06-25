const copyPosToClipboard = (ev) => {
    ev.preventDefault();

    const permaLink = document.querySelector(".perma-link");
    navigator.clipboard.writeText(permaLink.href);

    const origText = permaLink.innerText;
    permaLink.innerText = "Copied to clipboard...";
    ev.target.onmouseleave = () => {
        setTimeout(() => {
            permaLink.innerText = origText;
        }, 1000);
    };
}

onload = (_) => {
    // -----------------------------------------------------------------------------
    //     - Link to a position -
    // -----------------------------------------------------------------------------
    const querystring = new URLSearchParams(window.location.search);
    const playhead = querystring.get("t");

    // -----------------------------------------------------------------------------
    //     - Remember playhead position -
    // -----------------------------------------------------------------------------
    const player = document.querySelector("audio");
    const permaLink = document.querySelector(".perma-link");
    if (!(player || permaLink)) return;

    permaLink.onclick = copyPosToClipboard;

    const id = "player-id-" + player.currentSrc;

    var lastTime = parseFloat(window.localStorage.getItem(id)) || 0;

    player.currentTime = lastTime;
    player.ontimeupdate = (_) => {
        permaLink.href = `${permaLink.dataset['url']}?t=${Math.round(player.currentTime)}`;
        if (Math.abs(player.currentTime - lastTime) > 5) {
            lastTime = player.currentTime;
            window.localStorage.setItem(id, lastTime);
        }
    };

    // If the playhead position is set in the querystring
    // that will take precedence over the stored location
    if (playhead != null) {
        const playheadPos = parseFloat(playhead || 0);
        player.currentTime = playheadPos;
    }
};
