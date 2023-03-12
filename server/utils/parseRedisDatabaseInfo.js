function parseRedisDatabaseInfo(str, properties = []) {
    let lines = str.split("\n")

    let result = {}

    for (let line of lines) {
        properties.forEach((n) => {
            if (line.includes(n)) {
                let keyVal = line.split(":")
                result[keyVal[0]] = keyVal[1].trimEnd()
            }
        })
    }
    return result
}

module.exports = parseRedisDatabaseInfo