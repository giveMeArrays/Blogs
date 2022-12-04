async function getAllBlogs() {
    const data = await fetch("http://localhost:3000/getAllBlogs");
    const res = await data.json();

    document.getElementById("post").onclick = postBlog;

    for(i in res){
        console.log(res)
        $("#x").append(
        `<div class="col-6">
            <div class="card mb-5 text-center shadow" id="${res[i]._id}">
                <div class="card-img">
                    <img src="http://unsplash.it/400" alt="">
                </div>
                <h3 class="card-title">${res[i].title}</h3>
                <div class="card-body">${res[i].body.substring(0, 50)+"..."}</div>
                <div class="card-footer">
                    <button class="btn btn-success" data-id = "${res[i]._id}" onclick = setId("${res[i]._id}")>View</button>
                    <button class="btn btn-danger" data-id = "${res[i]._id}" onclick = deleteBlog("${res[i]._id}")>Delete</button>
                </div>
            </div>
        </div>`
        );
    }

}

async function postBlog(){
    payload = {
        title: document.getElementById("Title").value,
        body : document.getElementById("t").value,
        picture : "abc"
    };
    const data = await fetch("http://localhost:3000/addBlog",{
        method: "post",
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    });
    const res = await data.json();
    console.log(res)
}

async function deleteBlog(id){
    const data = await fetch("http://localhost:3000/deleteBlog", {
        method:"delete",
        body: JSON.stringify({id : id}),
        headers: { 'Content-Type': 'application/json' }
    })
    const res = await data.json();
    window.location.reload()
    console.log(res)
}

function setId(id){
    sessionStorage.setItem("articleID" , id);
    window.location.href = "/viewBlog"
}

//const delButtons = document.getElementsByClassName("btn-danger")

//for(i in delButtons){
   // delButtons[i].onclick = deleteBlog();
//}

async function getArticle(id){
    const data = await fetch("http://localhost:3000/Article", {
         method: "post",
         body: JSON.stringify({id: id}),
         headers: { 'Content-Type': 'application/json' }
     });
 
   const res = await data.json();
   console.log(res);
 
   document.getElementById("Title").value = res.title;
   document.getElementById("t").value = res.body;
   document.getElementById("e").style.display = "block"

   $('#add').modal('show');
 }




getAllBlogs();