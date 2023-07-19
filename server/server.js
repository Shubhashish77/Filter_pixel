const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');

const { authorize, listFiles } = require('./index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cors());

app.get('/api/v1/images', async (req, res) => {
    let authClient;
    let imagesss;
    try {
        authClient = await authorize();
        const drive = await google.drive({ version: 'v3', auth: authClient });
        const folderId = '1cYCTKvaucGxpQrSgdXZylY63crOv1UeS';
        drive.files.list(
            {
                q: `'${folderId}' in parents and mimeType='image/jpeg'`,
                fields: 'files(name, webViewLink)'
            },
            (err, ress) => {
                if (err) {
                    console.error('Error retrieving image URLs:', err);
                    return;
                }
                // return res.send(ress.data.files)
                const images = ress.data.files;
                imagesss = [...images]
                console.log("dede", imagesss);

                // if (images.length) {
                //     console.log('Image URLs:');
                //     images.forEach((image) => {
                //         // image.webViewLink
                //         // Imgdata.push(image.webViewLink)
                //         console.log(`${image.name}: ${image.webViewLink}`);
                //         // Download the image using the provided URL
                //         // downloadImage(image.webViewLink, `./path/to/save/${image.name}`);
                //     });
                // } else {
                //     console.log('No images found in the folder.');
                // }
                res.status(200).json({
                    data: imagesss
                })
            }
        );
        // res.status(200).json({
        //     data: imagesss
        // })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            data: error
        })
    }

})


app.listen(5000, () => {
    console.log(`App running on port 5000...`);
});