import idx from 'idx';
import credential from './api-key';

const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${credential.key}`;

const getVision = (base64, cb) => {
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requests: [
        {
          image: {
            content: base64
          },
          features: [
            {
              type: 'TEXT_DETECTION',
              maxResults: 10
            }
          ]
        }
      ]
    })
  };
 fetch(apiUrl, options)
 .then((response) => response.json())
 .then((responseJson) => {
   const results = idx(responseJson, _ => _.responses[0]);
   cb(results);
 })
 .catch((error) => {
   console.error(error);
 });
};

export default getVision;
