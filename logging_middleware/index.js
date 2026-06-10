const express = require('express');
const { Log } = require('./log_File/logger'); // Import our reusable logger engine

const app = express();
const PORT = 3000;

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YWliaGF2LnZlcm1hLnNkZUBnbWFpbC5jb20iLCJleHAiOjE3ODEwNzM4MTcsImlhdCI6MTc4MTA3MjkxNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI3ZmYwMmFmLTk5ODgtNDYxMC1iNzViLTFiNTFmN2ViMjA3OCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgdmVybWEiLCJzdWIiOiI5MzgzNGM0OS00YTkxLTQ0YzUtOTY0MC1kZTA0ZDVjYmVkZWQifSwiZW1haWwiOiJ2YWliaGF2LnZlcm1hLnNkZUBnbWFpbC5jb20iLCJuYW1lIjoidmFpYmhhdiB2ZXJtYSIsInJvbGxObyI6IjIzMTUwMDIzODIiLCJhY2Nlc3NDb2RlIjoiUlBzZ1l0IiwiY2xpZW50SUQiOiI5MzgzNGM0OS00YTkxLTQ0YzUtOTY0MC1kZTA0ZDVjYmVkZWQiLCJjbGllbnRTZWNyZXQiOiJZaEplcFFYaG1HV216RHBQIn0.51MkQw_nIvzwVOfk2aXWqHbs6Ez07KYLSjo6PrShEVg";

app.use(express.json());

app.get('/simulate-mismatch-error', async (req, res) => {
   
    await Log("backend", "error", "handler", "received string, expected bool", ACCESS_TOKEN);
    
    res.status(400).json({ status: "Error logged successfully" });
});

app.get('/simulate-db-fatal', async (req, res) => {
   
    await Log("backend", "fatal", "db", "Critical database connection failure.", ACCESS_TOKEN);
    
    res.status(500).json({ status: "Fatal dependency error logged" });
});

app.get('/health', async (req, res) => {
    await Log("backend", "info", "middleware", "Health check endpoint pinged.", ACCESS_TOKEN);
    res.json({ alive: true });
});

app.listen(PORT, () => {
    console.log(`Server is running at port number ${PORT}`);
});