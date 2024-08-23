let rooms = {};

export function getRoom(roomId) {
    if (!rooms[roomId]) {
        rooms[roomId] = [];
    }
    return rooms[roomId];
}

export function addMessage(roomId, message) {
    const room = getRoom(roomId);
    room.push(message);
    return message;
}

export function getRoomMessages(roomId) {
    return getRoom(roomId);
}