import clientPromise from './mongodb';

export async function getRoom(roomId) {
    const client = await clientPromise;
    const db = client.db('chatapp');
    const room = await db.collection('rooms').findOne({ _id: roomId });
    if (!room) {
        await db.collection('rooms').insertOne({ _id: roomId, messages: [] });
        return [];
    }
    return room.messages;
}

export async function addMessage(roomId, message) {
    const client = await clientPromise;
    const db = client.db('chatapp');
    await db.collection('rooms').updateOne(
        { _id: roomId },
        { $push: { messages: message } }
    );
    return message;
}

export async function getRoomMessages(roomId) {
    return getRoom(roomId);
}

export async function setRepoContext(roomId, repoContext) {
    const client = await clientPromise;
    const db = client.db('chatapp');
    await db.collection('rooms').updateOne(
        { _id: roomId },
        { $set: { repoContext } }
    );
}

export async function getRepoContext(roomId) {
    const client = await clientPromise;
    const db = client.db('chatapp');
    const room = await db.collection('rooms').findOne({ _id: roomId });
    return room?.repoContext || null;
}
