// //require('dotenv').config();
// require('dotenv').config();
// const key = process.env.REACT_APP_PINATA_KEY;
// const secret = process.env.REACT_APP_PINATA_SECRET;
// // require('dotenv').config();

// const axios = require('axios');
// const FormData = require('form-data');

// export const uploadJSONToIPFS = async(JSONBody) => {
//     const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
//     //making axios POST request to Pinata ⬇️
//     return axios 
//         .post(url, JSONBody, {
//             headers: {
//                 pinata_api_key: key,
//                 pinata_secret_api_key: secret,
//             }
//         })
//         .then(function (response) {
//            return {
//                success: true,
//                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
//            };
//         })
//         .catch(function (error) {
//             console.log(error)
//             return {
//                 success: false,
//                 message: error.message,
//             }

//     });
// };

// export const uploadFileToIPFS = async(file) => {
//     const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
//     //making axios POST request to Pinata ⬇️
    
//     let data = new FormData();
//     data.append('file', file);

//     const metadata = JSON.stringify({
//         name: 'testname',
//         keyvalues: {
//             exampleKey: 'exampleValue'
//         }
//     });
//     data.append('pinataMetadata', metadata);

//     //pinataOptions are optional
//     const pinataOptions = JSON.stringify({
//         cidVersion: 0,
//         customPinPolicy: {
//             regions: [
//                 {
//                     id: 'FRA1',
//                     desiredReplicationCount: 1
//                 },
//                 {
//                     id: 'NYC1',
//                     desiredReplicationCount: 2
//                 }
//             ]
//         }
//     });
//     data.append('pinataOptions', pinataOptions);

//     return axios 
//         .post(url, data, {
//             maxBodyLength: 'Infinity',
//             headers: {
//                 'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
//                 pinata_api_key: key,
//                 pinata_secret_api_key: secret,
//             }
//         })
//         .then(function (response) {
//             console.log("image uploaded", response.data.IpfsHash)
//             return {
//                success: true,
//                pinataURL: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
//            };
//         })
//         .catch(function (error) {
//             console.log(error)
//             return {
//                 success: false,
//                 message: error.message,
//             }

//     });
// };




// import axios from 'axios';

// // Pinata API keys (replace with your own)
// const pinataApiKey = process.env.REACT_APP_PINATA_KEY;
// const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET;

// // Pinata endpoints
// const pinFileEndpoint = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
// const pinJSONEndpoint = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

// /**
//  * Upload a file to IPFS via Pinata.
//  * @param {File} file - The file to upload.
//  * @returns {Promise<string>} The IPFS URL of the uploaded file.
//  */
// export const uploadFileToIPFS = async (file) => {
//   if (!file) throw new Error('No file provided');

//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     const response = await axios.post(pinFileEndpoint, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         'pinata_api_key': pinataApiKey,
//         'pinata_secret_api_key': pinataSecretApiKey,
//       },
//     });

//     return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//   } catch (error) {
//     console.error('Pinata IPFS file upload error:', error);
//     throw error;
//   }
// };

// /**
//  * Upload metadata to IPFS via Pinata.
//  * @param {Object} metadata - The metadata to upload.
//  * @returns {Promise<string>} The IPFS URL of the uploaded metadata.
//  */
// export const uploadMetadataToIPFS = async (metadata) => {
//   if (!metadata) throw new Error('No metadata provided');

//   try {
//     const response = await axios.post(pinJSONEndpoint, metadata, {
//       headers: {
//         'Content-Type': 'application/json',
//         'pinata_api_key': pinataApiKey,
//         'pinata_secret_api_key': pinataSecretApiKey,
//       },
//     });

//     return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//   } catch (error) {
//     console.error('Pinata IPFS metadata upload error:', error);
//     throw error;
//   }
// };


import axios from 'axios';

// Pinata API keys (replace with your own)
const pinataApiKey = "c4b8ea58330e6f5456f6";
const pinataSecretApiKey = "c55c5eef672f2861d0522672b67f889add0a74ee2ff25d774fe65e609e200c2d";

// Pinata endpoints
const pinFileEndpoint = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const pinJSONEndpoint = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

/**
 * Upload a file to IPFS via Pinata.
 * @param {File} file - The file to upload.
 * @returns {Promise<string>} The IPFS URL of the uploaded file.
 */
export const uploadFileToIPFS = async (file) => {
  if (!file) throw new Error('No file provided');

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(pinFileEndpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretApiKey,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    // Log detailed error information
    console.error('Pinata IPFS file upload error:', {
      message: error.message,
      status: error.response ? error.response.status : 'N/A',
      data: error.response ? error.response.data : 'N/A',
      headers: error.response ? error.response.headers : 'N/A',
    });
    throw error;
  }
};

/**
 * Upload metadata to IPFS via Pinata.
 * @param {Object} metadata - The metadata to upload.
 * @returns {Promise<string>} The IPFS URL of the uploaded metadata.
 */
export const uploadMetadataToIPFS = async (metadata) => {
  if (!metadata) throw new Error('No metadata provided');

  try {
    const response = await axios.post(pinJSONEndpoint, metadata, {
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': pinataApiKey,
        'pinata_secret_api_key': pinataSecretApiKey,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
  } catch (error) {
    // Log detailed error information
    console.error('Pinata IPFS metadata upload error:', {
      message: error.message,
      status: error.response ? error.response.status : 'N/A',
      data: error.response ? error.response.data : 'N/A',
      headers: error.response ? error.response.headers : 'N/A',
    });
    throw error;
  }
};
