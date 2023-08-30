const axios = require('axios');
require('dotenv').config();

module.exports = async (req, res) => {
  try {
    const lineNotifyToken = process.env.LINE_NOTIFY_TOKEN;

    const options = {
      method: 'post',
      url: 'https://notify-api.line.me/api/notify',
      headers: {
        'Authorization': `Bearer ${lineNotifyToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `message=${req.body.message}`,
    };

    const response = await axios(options);
    
    res.send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};
