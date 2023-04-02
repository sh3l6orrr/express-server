const db = require('../config.js').db

async function test(req, res, next) {
    try {
        const contents = await db.any("SELECT * FROM Test");
        return res.send(contents)
    } catch {
        next(error)
    }
}
async function getBox(req, res, next) {
    try {
        const content = await db.any("SELECT Content FROM Contents WHERE User_ID = $1", req.userid)
        return res.send(content)
    } catch (error) {
        next(error)
    }
}

async function addBox(req, res, next) {
    try {
        await db.none("INSERT INTO Contents(Content, User_ID) VALUES ($1, $2)", [req.body.content, req.userid])
        return res.send("Box added successfully.")
    }
    catch (error) {
        next(error)
    }
}

async function changeBox(req, res, next) {
    try {
        await db.none("UPDATE Contents SET Content = $1 WHERE ID = $2", [req.body.content, req.body.id])
        return res.send("Box changed successfully.")
    }
    catch (error) {
        next(error)
    }
}

async function deleteBox(req, res, next) {
    try {

    }
    catch (error) {
        next(error)
    }
}

module.exports = { test, getBox, addBox, changeBox, deleteBox }