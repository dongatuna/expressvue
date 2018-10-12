const express = require('express')
const mongodb = require('mongodb')
const router = express.Router()

//GET POSTS
router.get('/', async(req, res)=>{
    const posts = await loadPostsCollection();

    res.send(await posts.find({}).toArray());
})

//ADD POSTS
router.post('/', async(req, res)=>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })

    res.status(201).send()
})

//DELETE POSTS
router.delete('/:id', async(req, res)=>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200)
})

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ("mongodb://dong33:bros060301@ds131323.mlab.com:31323/expressvue", {
        useNewUrlParser:true
    })

    return client.db("expressvue").collection("posts")
}

module.exports = router