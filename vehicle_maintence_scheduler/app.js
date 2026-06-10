const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const BASE_URL = "http://4.224.186.213/evaluation-service";
const ACCESS_T = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YWliaGF2LnZlcm1hLnNkZUBnbWFpbC5jb20iLCJleHAiOjE3ODEwNzM4MTcsImlhdCI6MTc4MTA3MjkxNywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjI3ZmYwMmFmLTk5ODgtNDYxMC1iNzViLTFiNTFmN2ViMjA3OCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgdmVybWEiLCJzdWIiOiI5MzgzNGM0OS00YTkxLTQ0YzUtOTY0MC1kZTA0ZDVjYmVkZWQifSwiZW1haWwiOiJ2YWliaGF2LnZlcm1hLnNkZUBnbWFpbC5jb20iLCJuYW1lIjoidmFpYmhhdiB2ZXJtYSIsInJvbGxObyI6IjIzMTUwMDIzODIiLCJhY2Nlc3NDb2RlIjoiUlBzZ1l0IiwiY2xpZW50SUQiOiI5MzgzNGM0OS00YTkxLTQ0YzUtOTY0MC1kZTA0ZDVjYmVkZWQiLCJjbGllbnRTZWNyZXQiOiJZaEplcFFYaG1HV216RHBQIn0.51MkQw_nIvzwVOfk2aXWqHbs6Ez07KYLSjo6PrShEVg";


function optiMain(vehicles, budget) {
    const n = vehicles.length;
    const dp = Array(n + 1).fill(null).map(() => Array(budget + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const currVehi = vehicles[i - 1];
        const weight = currVehi.Duration;
        const value = currVehi.Impact;

        for (let w = 0; w <= budget; w++) {
            if (weight <= w) {
                dp[i][w] = Math.max(value + dp[i - 1][w - weight], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    let res = dp[n][budget];
    let w = budget;
    const selectedVehi = [];

    for (let i = n; i > 0 && res > 0; i--) {
        if (res === dp[i - 1][w]) {
            continue;
        } else {
            selectedVehi.push(vehicles[i - 1]);
            res -= vehicles[i - 1].Impact;
            w -= vehicles[i - 1].Duration;
        }
    }

    const totalDuration = selectedVehi.reduce((sum, v) => sum + v.Duration, 0);
    const totalImpact = selectedVehi.reduce((sum, v) => sum + v.Impact, 0);

    return {
        totalOperationalImpact: totalImpact,
        mechanicHoursUsed: totalDuration,
        scheduledTasks: selectedVehi
    };
}

app.get('/schedule-maintenance', async (req, res) => {
    try {
        const headers = { Authorization: `Bearer ${ACCESS_T}` };

        const [depotsRes, vehiclesRes] = await Promise.all([
            axios.get(`${BASE_URL}/depots`, { headers }),
            axios.get(`${BASE_URL}/vehicles`, { headers })
        ]);

        const depots = depotsRes.data.depots;
        const vehicles = vehiclesRes.data.vehicles;

        const schedules = depots.map(depot => {
            const result = optiMain(vehicles, depot.MechanicHours);
            return {
                depotID: depot.ID,
                mechanicHoursBudget: depot.MechanicHours,
                ...result
            };
        });
        res.status(200).json({
            success: true,
            schedules
        });

    } catch (error) {
        console.error("Scheduling Engine Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to generate vehicle maintenance schedule",
            error: error.response ? error.response.data : error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server Running at Port number ${PORT}`);
});