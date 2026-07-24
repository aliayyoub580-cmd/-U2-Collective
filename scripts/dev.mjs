import { spawn } from 'node:child_process'

const children = [
  spawn('npm run dev:client', { stdio: 'inherit', shell: true }),
  spawn('npm run dev:server', { stdio: 'inherit', shell: true }),
]

let shuttingDown = false

function shutdown(signal = 'SIGTERM') {
  if (shuttingDown) return
  shuttingDown = true
  for (const child of children) {
    if (!child.killed) child.kill(signal)
  }
}

for (const child of children) {
  child.on('error', (error) => {
    console.error(`Failed to start development process: ${error.message}`)
    shutdown()
    process.exitCode = 1
  })

  child.on('exit', (code) => {
    if (!shuttingDown && code !== 0) {
      shutdown()
      process.exitCode = code ?? 1
    }
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
