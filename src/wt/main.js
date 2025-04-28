import { Worker } from 'worker_threads';
import { resolve } from 'path';
import { cpus } from 'os';

const performCalculations = async () => {
  const numCores = cpus().length;
  const workerPath = resolve('src/wt/worker.js');

  const results = [];

  const workers = Array.from({ length: numCores }, (_, index) => {
    return new Promise((resolveWorker) => {
      const worker = new Worker(workerPath);

      worker.postMessage(10 + index);

      worker.on('message', (result) => {
        results.push({ status: 'resolved', data: result });
        resolveWorker();
      });

      worker.on('error', (err) => {
        results.push({ status: 'error', data: null });
        resolveWorker();
      });

      worker.on('exit', (code) => {
        if (code !== 0) {
          results.push({ status: 'error', data: null });
          resolveWorker();
        }
      });
    });
  });

  await Promise.all(workers);
  console.log(results);
};

await performCalculations();
