const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content);
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
exports.authorize = async () => {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
exports.listFiles = async (authClient) => {
    const drive = google.drive({ version: 'v3', auth: authClient });
    // const res = await drive.files.list({
    //     pageSize: 10,
    //     fields: 'nextPageToken, files(id, name)',
    // });
    // const files = res.data.files;
    // if (files.length === 0) {
    //     console.log('No files found.');
    //     return;
    // }

    const folderId = '1cYCTKvaucGxpQrSgdXZylY63crOv1UeS';
    drive.files.list(
        {
            q: `'${folderId}' in parents and mimeType='image/jpeg'`,
            fields: 'files(name, webViewLink)'
        },
        (err, res) => {
            if (err) {
                console.error('Error retrieving image URLs:', err);
                return;
            }
            const images = res.data.files, imgdata = res.data.files;
            if (images.length) {
                console.log('Image URLs:');
                images.forEach((image) => {
                    // Imgdata.push(image.webViewLink)
                    console.log(`${image.name}: ${image.webViewLink}`);
                    // Download the image using the provided URL
                    // downloadImage(image.webViewLink, `./path/to/save/${image.name}`);
                });
            } else {
                console.log('No images found in the folder.');
            }
        }
    );

    console.log("data", imgdata)
    console.log(IIII)
    // return data;


    // console.log('Files:');
    // files.map((file) => {
    //     console.log(`${file.name} (${file.id})`);
    // });
}

// authorize().then(listFiles).catch(console.error);