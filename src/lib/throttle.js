export default function(fn, timeoutDuration) {
  let callLater = false;
  let inTimeout = false;
  return function() {
    let callTimeArguments = arguments
    let callAndTimeout = function() {
      fn(...callTimeArguments)
      inTimeout = true
      setTimeout(() => {
        inTimeout = false
        if (callLater) {
          callLater = false
          callAndTimeout()
        }
      }, timeoutDuration)
    }
    if (inTimeout) {
      callLater = true
    } else {
      callAndTimeout()
    }
  }
}
