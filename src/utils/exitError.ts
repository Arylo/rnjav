export const exitError = (...msg: any[]) => {
  console.error(...msg)
  process.exit(1)
}

export default exitError
