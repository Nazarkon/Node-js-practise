
const reverseData = (data => data.split('').reverse().join(''))

process.stdin.on("data", data => process.stdout.write(`${reverseData(data.toString().trim())}\n\n\n`))
