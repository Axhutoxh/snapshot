const post=[]

db.collection('posts').get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        post.push(doc.data())
    })
})

console.log(post)