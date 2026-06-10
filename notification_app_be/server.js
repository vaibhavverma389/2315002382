const { default: axios } = require('axios');
const express = require('express');

const app = express();
const PORT = 3000;

const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YWliaGF2LnZlcm1hLnNkZUBnbWFpbC5jb20iLCJleHAiOjE3ODEwNzM4MTcsImlhdCI6MTc4MTA3MjkxNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI3ZmYwMmFmLTk5ODgtNDYxMC1iNzViLTFiNTFmN2ViMjA3OCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgdmVybWEiLCJzdWIiOiI5MzgzNGM0OS00YTkxLTQ0YzUtOTY0MC1kZTA0ZDVjYmVkZWQifSwiZW1haWwiOiJ2YWliaGF2LnZlcm1hLnNkZUBnbWFpbC5jb20iLCJuYW1lIjoidmFpYmhhdiB2ZXJtYSIsInJvbGxObyI6IjIzMTUwMDIzODIiLCJhY2Nlc3NDb2RlIjoiUlBzZ1l0IiwiY2xpZW50SUQiOiI5MzgzNGM0OS00YTkxLTQ0YzUtOTY0MC1kZTA0ZDVjYmVkZWQiLCJjbGllbnRTZWNyZXQiOiJZaEplcFFYaG1HV216RHBQIn0.51MkQw_nIvzwVOfk2aXWqHbs6Ez07KYLSjo6PrShEVg";
const Base_url="http://4.224.186.213/evaluation-service/notifications";
const headers = { Authorization: `Bearer ${ACCESS_TOKEN}` };
app.use(express.json());


app.get('notifications',(req,res)={
    
})