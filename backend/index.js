
const express = require('express')

const app = express()


app.get('/posts', (request, response) => {
    let posts =[
        {
            caption:"bridge",
            location:"Lucknow,india"
            },
        {
            caption:"ganga",
            location:"prayagraj,india"
            },
                    
]
  response.send(posts)
})

app.listen(process.env.PORT || 3000)