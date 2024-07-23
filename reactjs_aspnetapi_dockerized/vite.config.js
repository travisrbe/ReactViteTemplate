import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "ReactJs_AspNetApi_Dockerized";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

// if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
//     if (0 !== child_process.spawnSync('dotnet', [
//         'dev-certs',
//         'https',
//         '--export-path',
//         certFilePath,
//         '--format',
//         'Pem',
//         '--no-password',
//     ], { stdio: 'inherit', }).status) {
//         throw new Error("Could not create certificate.");
//     }
// }

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:5001';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    preview: {
        host: true,
        port: 8080,
        strictPort: true,
        proxy: {
            '^/weatherforecast': {
                target: 'https://localhost:32769/',
                secure: false
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: true,
        proxy: {
            '^/weatherforecast': {
                target: 'https://localhost:32769/',
                secure: false
            }
        },
        strictPort: true,
        port: 5173,
        // https: {
        //     key: fs.readFileSync(keyFilePath),
        //     cert: fs.readFileSync(certFilePath),
        // }
    }
})
