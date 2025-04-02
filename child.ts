import { spawn, ChildProcess } from 'child_process';

/**
 * Runs an Insomnia collection using the Inso CLI
 * @param collectionPath Path to the Insomnia collection file
 * @param envVars Optional environment variables to pass
 * @returns Promise that resolves when the collection run is complete
 */
async function runInsomniaCollection(
    collectionPath: string, 
    envVars?: Record<string, string>
): Promise<void> {
    return new Promise((resolve, reject) => {
        // Use npx to ensure local installation takes precedence
        const command = 'npx';
        const args = [
            'inso',
            'run',
            'test',
            collectionPath,
            '--reporter', 'xray' // Using Xray reporter
        ];

        // Add environment variables if provided
        if (envVars) {
            Object.entries(envVars).forEach(([key, value]) => {
                args.push('--env', `${key}=${value}`);
            });
        }

        const insoProcess: ChildProcess = spawn(command, args, {
            stdio: 'inherit', // Share stdin/stdout/stderr with parent
            env: { ...process.env, ...envVars } // Merge environment variables
        });

        insoProcess.on('error', (err: Error) => {
            console.error(`Failed to start Inso: ${err.message}`);
            reject(err);
        });

        insoProcess.on('exit', (code: number | null) => {
            if (code === 0) {
                console.log('Inso collection run completed successfully');
                resolve();
            } else {
                console.error(`Inso exited with code ${code}`);
                reject(new Error(`Inso process exited with code ${code}`));
            }
        });
    });
}

// Example usage
const envVariables = {
    API_BASE_URL: 'https://api.example.com/v1',
    AUTH_TOKEN: 'test_token_123'
};

// Example of how to use the function
runInsomniaCollection('my-collection.json', envVariables)
    .then(() => console.log('Collection run completed'))
    .catch((error) => console.error('Collection run failed:', error));