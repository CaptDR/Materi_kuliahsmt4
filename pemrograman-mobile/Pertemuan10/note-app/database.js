import { TouchableOpacity } from "react-native";

export const onInitDB = async (db) => {
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS note (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        );
        PRAGMA journal_mode = WAL;
    `);
};
export const deleteNote = async (db, id) => {
    return await db.runAsync(`DELETE FROM note WHERE id = ?`, id);
};