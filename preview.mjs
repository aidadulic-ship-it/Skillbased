import { spawn } from 'node:child_process';
import { parseArgs } from 'node:util';

const { values } = parseArgs({
  options: { host: {type:'string'}, port: {type:'string'}, strictPort: {type:'boolean'} },
});
const server = spawn('python3', ['-m', 'http.server', values.port ?? '8000',
  '--bind', values.host ?? '127.0.0.1', '--directory', 'site'], { stdio: 'inherit' });
server.on('exit', code => { process.exitCode = code ?? 1; });
process.on('SIGTERM', () => server.kill());
