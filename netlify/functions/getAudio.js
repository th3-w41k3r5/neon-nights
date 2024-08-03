exports.handler = async function(event, context) {
    const { AUDIO_WAKE_UP, AUDIO_BEAUTIFUL_NIGHTMARE, AUDIO_LIFELINE, AUDIO_CLUB_LECLERC } = process.env;

    const audioFiles = {
        "wake-up": AUDIO_WAKE_UP,
        "beautiful-nightmare": AUDIO_BEAUTIFUL_NIGHTMARE,
        "lifeline": AUDIO_LIFELINE,
        "club-leclerc": AUDIO_CLUB_LECLERC
    };

    const fileName = event.queryStringParameters.file;

    if (audioFiles[fileName]) {
        return {
            statusCode: 302,
            headers: {
                Location: audioFiles[fileName]
            }
        };
    } else {
        return {
            statusCode: 404,
            body: "Audio file not found"
        };
    }
};
