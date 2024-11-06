
// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import cors from 'cors';
// import { fileURLToPath } from 'url';
// import fs from 'fs';
// import FormData from 'form-data';
// import http from 'http';
// import https from 'https';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Configure CORS to allow requests only from your frontend
// const corsOptions = {
//     origin: 'http://localhost:3000', // Your frontend origin
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
// };
// app.use(cors(corsOptions));

// // Ensure the uploads directory exists
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// // Set up file storage for uploaded videos
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload = multer({ storage });

// // Store processed reports in memory for demonstration (you might want to store this in a database)
// let processedReports = [];

// // Route for uploading video files
// app.post('/upload', upload.single('video'), async (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const videoPath = path.join(uploadDir, req.file.filename);
//     console.log(`Uploading video from: ${videoPath}`);

//     try {
//         // Replace this URL with your actual Flask server URL
//         const flaskServerUrl = 'http://localhost:5001/upload'; // Assuming your Flask server runs on port 5001

//         // Send the video to your Flask server via HTTP
//         const formData = new FormData();
//         formData.append('video', fs.createReadStream(videoPath));

//         console.log('Sending video to Flask server...');

//         // Create an HTTP or HTTPS agent based on the URL
//         const agent = flaskServerUrl.startsWith('https') ? https : http;

//         const request = agent.request(flaskServerUrl, {
//             method: 'POST',
//             headers: {
//                 ...formData.getHeaders(),
//             },
//         }, (response) => {
//             let data = '';

//             response.on('data', chunk => {
//                 data += chunk;
//             });

//             response.on('end', () => {
//                 const colabResponse = JSON.parse(data);
//                 console.log('Colab response received:', colabResponse);

//                 // Remove the uploaded file after sending it to the server
//                 fs.unlink(videoPath, (err) => {
//                     if (err) {
//                         console.error(`Error removing file ${videoPath}:`, err);
//                     } else {
//                         console.log(`File ${videoPath} removed successfully.`);
//                     }
//                 });

//                 // Process the response data from the server
//                 const { total_report, occupied_report, unoccupied_report } = colabResponse;

//                 // Store the processed reports in memory
//                 processedReports.push({
//                     totalReport: total_report,
//                     occupiedReport: occupied_report,
//                     unoccupiedReport: unoccupied_report,
//                     date: new Date() // Save the date of the report
//                 });

//                 // Structure the response
//                 const structuredResponse = {
//                     status: 'success',
//                     message: 'Video processed successfully',
//                     totalReport: total_report,
//                     occupiedReport: occupied_report,
//                     unoccupiedReport: unoccupied_report
//                 };

//                 res.json(structuredResponse);
//             });
//         });

//         formData.pipe(request);

//         request.on('error', (error) => {
//             console.error('Error communicating with Flask server:', error.message);
//             res.status(500).json({ error: 'Error processing video', details: error.message });
//         });

//     } catch (error) {
//         console.error('Error processing video:', error.message);
//         res.status(500).json({ error: 'Error processing video', details: error.message });
//     }
// });

// // New endpoint to get processed reports
// app.get('/reports', (req, res) => {
//     res.json(processedReports);
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

//The authenticity of host 'serveo.net (138.68.79.95)' can't be established.
//RSA key fingerprint is SHA256:07jcXlJ4SkBnyTmaVnmTpXuBiRx2+Q2adxbttO9gt0M.



import express from 'express';
import multer from 'multer';
import axios from 'axios';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests only from your frontend
const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up file storage for uploaded videos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Route for uploading video files
app.post('/upload', upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const videoPath = path.join(uploadDir, req.file.filename);
    console.log(`Video saved at: ${videoPath}`);

    
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

