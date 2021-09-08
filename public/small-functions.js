let getAsArray = vallue => Array.isArray(vallue) ? [...vallue] : [vallue]
let debounce = (callback, delay) => {
    const Delay = delay ?? 100
    let timer
    return event => {
        if(timer) clearTimeout(timer)
        timer = setTimeout(callback, Delay, event )
    }
}
let delay = (callback, delay) => {
    const Dellay = delay ?? 100
    let currentRunning = 1
    let timer
    return event => {
        setTimeout(event => {
            callback(event)
            --currentRunning
        }, Dellay * currentRunning, event)
        ++currentRunning
    }
}
export {
    getAsArray,
    debounce,
    delay
}