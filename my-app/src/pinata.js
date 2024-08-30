import axios from 'axios';
// require('dotenv').config();

// console.log(process.env.REACT_APP_PINATA_KEY)
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
