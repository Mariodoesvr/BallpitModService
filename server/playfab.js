const fetch = require("node-fetch");

const TITLE_ID = "YOUR_TITLE_ID";
const SECRET_KEY = "YOUR_SECRET_KEY";

async function banPlayer(playFabId, reason = "Moderation action", durationHours = 0) {
    try {
        const res = await fetch(
            `https://${TITLE_ID}.playfabapi.com/Admin/BanUsers`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-SecretKey": SECRET_KEY
                },
                body: JSON.stringify({
                    Bans: [
                        {
                            PlayFabId: playFabId,
                            Reason: reason,
                            DurationInHours: durationHours
                        }
                    ]
                })
            }
        );

        return await res.json();
    } catch (err) {
        return { success: false, error: err.message };
    }
}

module.exports = { banPlayer };
