# NewsportalAPI

<h2>Categor<br>URL: https://openapi.programming-hero.com/api/news/categories</h2>
<p style="color:red">async function fetchcategory() {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const cat = await res.json();
    showcategory(cat.data.news_category)
}
// // Displaying  All Categories After Fetch
function showcategory(category) {
    const categorydiv = document.querySelector('#categories');
    // console.log(categorydiv)
    category.forEach(element => {
        categorydiv.innerHTML += `
    <div class="col-auto gx-5">
        <p  class="category" onclick="fetchnews('${element.category_id}','${element.category_name}')">${element.category_name}<p/>
    </div>`;
    });
}</p>

<h2>All news from a Category <br>
URL: https://openapi.programming-hero.com/api/news/category/${category_id}<br>   
Example: https://openapi.programming-hero.com/api/news/category/01</h2>

<h2>News detail<br>                                           
URL: https://openapi.programming-hero.com/api/news/${news_id}<br>         
Example: https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a</h2>

<h2>Missing Data <br>                                                     
URL: https://openapi.programming-hero.com/api/news/2e78e5e0310c2e9adbb6efb1a263e745</h2>
