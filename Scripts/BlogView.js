async function getArticle(){
   const data = await fetch("http://localhost:3000/Article", {
        method: "post",
        body: JSON.stringify({id: sessionStorage.getItem("articleID")}),
        headers: { 'Content-Type': 'application/json' }
    });

  const res = await data.json();
  console.log(res);

  document.getElementById("Title").innerHTML = res.title;
  document.getElementById("body").innerHTML = res.body;
}

getArticle()