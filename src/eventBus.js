const eventListeners = {};

function emit(eventName, ...args) {
    console.log("Emitting event:", eventName);
    if (eventListeners[eventName]) {
        eventListeners[eventName].forEach((listener) => {
            listener(args);
        });
    }
}

function registerListener(eventName, listener) {
    console.log("Registering listener for:", eventName);
    if (Array.isArray(eventListeners[eventName])) {
        eventListeners[eventName].push(listener);
    } else {
        eventListeners[eventName] = [listener];
    }
}

function removeListener(eventName, listener) {
    if (!Array.isArray(eventListeners[eventName])) {
        throw new Exception("Cannot remove listener, eventListeners does not contain a valid array for this eventName");
    }

    let i = eventListeners[eventName].indexOf(listener);
    if (i < 0) {
        throw new Exception("Cannot remove listener, listener not registered to this event");
    }

    eventListeners[eventName].splice(i, 1);
}