# The Way of the Crab Podcast

## Podcast Release Procedure

- All guests:
  - Record independent streams
  - Uploads their tracks to Ecton
- Ecton:
  - Uses Levelator to level all tracks (For now)
  - Creates an Audacity project with all tracks lined up and trimmed
  - Adds intro/outro music
  - Upload compressed Audacity project
  - Creates draft episode post with show notes
- ToggleBit:
  - Downloads Audacity project
  - Performs any additional edits/cleanup
  - Export from Audacity as mono FLAC
  - Use ffmeg to export AAC audio:

    ```sh
    ffmpeg -i episode-X.flac -acodec aac -vn -vbr 3 episode-XXX.m4a
    ```

    This uses variable bitrate with a moderate quality.
  - Upload the episode to ~/episodes/
  - Update the post's metadata:
    - `aac_length`: Set the size in bytes of the file
    - `duration` = duration in seconds
    - Remove draft flag from post
  - Commit and push for the site to be automatically deployed
  - If deployment fails, to manually deploy:

    ```sh
    zola bulid
    rsync -aivzd --delete public/ wotc@wayofthecrab.com:public/
    ```
