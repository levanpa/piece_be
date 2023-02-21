"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextID = exports.dbWrite = exports.dbRead = void 0;
const app_1 = require("firebase/app");
const database_1 = require("firebase/database");
const firebaseConfig = {
    databaseURL: "https://piece-0001-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const dbApp = (0, app_1.initializeApp)(firebaseConfig);
const db = (0, database_1.getDatabase)(dbApp);
function dbRead(id, callback) {
    const reference = (0, database_1.ref)(db, `pieces/${id}`);
    (0, database_1.onValue)(reference, (snapshot) => {
        callback(snapshot.val());
    }, { onlyOnce: true });
}
exports.dbRead = dbRead;
async function dbWrite(dataJson, callback) {
    let status, message, postId;
    let data = dataJson;
    message = 'Saved successfully!';
    status = 1;
    postId = 1;
    getNextID((nextID) => {
        if (nextID > 0 && nextID < 100) {
            let promise = (0, database_1.set)((0, database_1.ref)(db, `pieces/${nextID}`), {
                content: data.content,
                password: data.password || '',
                expire: data.expire || 0,
                created: data.createDate || '',
            });
            promise.then(() => {
                postId = nextID;
                (0, database_1.update)((0, database_1.ref)(db), { '/pieces/nextID': ++nextID });
                if (typeof callback === 'function')
                    callback({ status, message, postId });
            }).catch((error) => {
                console.log(222);
                status = 0;
                message = 'error: ' + error.message;
                postId = 0;
                if (typeof callback === 'function')
                    callback({ status, message, postId });
            });
        }
    });
}
exports.dbWrite = dbWrite;
async function getNextID(callback) {
    (0, database_1.onValue)((0, database_1.ref)(db, `pieces/nextID`), (snapshot) => {
        callback(snapshot.val());
    }, { onlyOnce: true });
}
exports.getNextID = getNextID;
//# sourceMappingURL=db.js.map