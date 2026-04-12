let postModel = require("../Models/postSchema")
let ImageKit = require("@imagekit/nodejs")
let { toFile } = require("@imagekit/nodejs")


let imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function CreatePostController(req,res){
    console.log(req.body,req.file)
    
  

   const file = await imagekit.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'Test',
  folder:'Insta-clone-posts'
});
console.log("POST CREATED")
console.log(file)

let post = await postModel.create({
    caption:req.body.caption,
    Img_URL:file.url,
    user:decode.id
})

console.log(post)
res.status(201).json({
    message:"post created successfully",
    post
})



}
module.exports={
    CreatePostController
}