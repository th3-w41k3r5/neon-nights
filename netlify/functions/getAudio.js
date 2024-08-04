const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    const { AUDIO_WAKE_UP, AUDIO_BEAUTIFUL_NIGHTMARE, AUDIO_LIFELINE, AUDIO_CLUB_LECLERC } = process.env;
    const audioFiles = {
        "wake-up": AUDIO_WAKE_UP,
        "beautiful-nightmare": AUDIO_BEAUTIFUL_NIGHTMARE,
        "lifeline": AUDIO_LIFELINE,
        "club-leclerc": AUDIO_CLUB_LECLERC
    };

    const fileName = event.queryStringParameters.file;
    const audioUrl = audioFiles[fileName];

    if (audioUrl) {
        try {
            const response = await fetch(audioUrl);
            const buffer = await response.buffer();
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'audio/mpeg',
                    'Cache-Control': 'no-cache',
                },
                body: buffer.toString('base64'),
                isBase64Encoded: true,
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: "Error fetching audio file",
            };
        }
    } else {
        return {
            statusCode: 404,
            body: "Audio file not found",
        };
    }
};



