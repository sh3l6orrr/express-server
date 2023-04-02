const db = require('../config.js').db

async function test(req, res, next) {
    try {
        const contents = await db.any("SELECT * FROM Test");
        return res.send(contents)
    } catch {
        next(error)
    }
}
async function readBox(req, res, next) {
    try {
        const content = await db.any("SELECT Content FROM Contents WHERE UserID = $1", req.userid)
        return res.send(content)
    } catch (error) {
        next(error)
    }
}

async function createBox(req, res, next) {
    try {
        await db.none("INSERT INTO Contents(Content, UserID) VALUES ($1, $2)", [req.body.content, req.userid])
        return res.send("Box created successfully.")
    }
    catch (error) {
        next(error)
    }
}

async function updateBox(req, res, next) {
    try {
        await db.none("UPDATE Contents SET Content = $1 WHERE ID = $2 AND UserID = $3", [req.body.content, req.body.id, req.userid])
        return res.send("Box updated successfully.")
    }
    catch (error) {
        next(error)
    }
}

async function deleteBox(req, res, next) {
    try {
        await db.none("DELETE FROM Contents WHERE ID = $1 AND UserID = $2", [req.body.id, req.userid])
        return res.send("Box deleted successfully.")
    }
    catch (error) {
        next(error)
    }
}

module.exports = { test, readBox, createBox, updateBox, deleteBox }