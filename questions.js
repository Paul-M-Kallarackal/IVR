const axios = require("axios");
async function getQuestions() {
  const config = {
    headers: {
      Authorization: `Bearer prbmYliCqe-iKfapVhRJ6xKyu6NtjSavd7LXCZRSxGj1Mg_hV5VaTaE8LGi6SBTB9NwgEK28ZU2Coyhs5EO3hhBg`,
    },
  };
  return await axios
    .get(
      "https://api.surveysparrow.com/v3/questions?survey_id=1000055406",
      config,
    )
}


exports.getQuestions = getQuestions;
