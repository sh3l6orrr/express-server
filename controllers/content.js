const db = require('../config.js').db

async function test(req, res, next) {
    try {
        const contents = await db.any("SELECT * FROM test");
        return res.send(contents)
    } catch {
        next(error)
    }
}
async function getBox(req, res, next) {
    try {
        const content = await db.any("SELECT content FROM contents WHERE user_id = $1", req.userId)
        return res.send(content)
    } catch (error) {
        next(error)
    }
}

async function addBox(req, res, next) {
    try {
        await db.none("INSERT INTO contents(content, user_id) VALUES ($1, $2)", [req.body.content, req.userId])
        return res.send("Box added successfully.")
    }
    catch (error) {
        next(error)
    }
}

async function changeBox(req, res, next) {
    try {

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