const axios = require("axios");
async function getResponses(responses) {
  console.log(responses);
  return await axios
    .post(
      "https://api.surveysparrow.com/v3/responses",
      {
        "survey_id": 1000055406,
        "answers": responses
    },
    {headers: {
        Authorization: `Bearer prbmYliCqe-iKfapVhRJ6xKyu6NtjSavd7LXCZRSxGj1Mg_hV5VaTaE8LGi6SBTB9NwgEK28ZU2Coyhs5EO3hhBg`,
      }
    }

    )
}


exports.getResponses = getResponses;
