import { spawn } from 'child_process';
import { resolve } from 'path';

const spawnChildProcess = async (args) => {
  const scriptPath = resolve('src/cp/files/script.js');

  const child = spawn('node', [scriptPath, ...args], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.on('error', (err) => {
    console.error('Failed to start child process:', err.message);
  });

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);
