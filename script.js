// Code for Rating system
// const star = document.querySelectorAll('.rating i');
// star.forEach((e, index1) => {
//     e.addEventListener('click', () => {
//         console.log(index1)
//         star.forEach((element, index2) => {
//             if (index1 >= index2) {
//                 element.classList.add("active")
//             }
//             else {
//                 element.classList.remove("active")
//             }
//         });
//     })
// })

async function fetchcategory() {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const cat = await res.json();
    showcategory(cat.data.news_category)
}

function showcategory(category) {
    const categorydiv = document.querySelector('#categories');
    // console.log(categorydiv)
    category.forEach(element => {
        categorydiv.innerHTML += `
    <div class="col-auto gx-5">
        <p onclick="fetchnews('${element.category_id}','${element.category_name}')">${element.category_name}<p/>
    </div>`;
    });
}
async function fetchnews(categoryid,category_name) {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryid}`;
    const res = await fetch(url);
    const news = await res.json();
    if(news.status){
        shownews(news.data, category_name);
    }
    else{
        document.querySelector('#card').innerHTML = '<h1 style="text-align: center;"> No News At the moment </h1>'
        document.getElementById('alert').innerHTML = '';
    }
}

function shownews(newses, name) {
    const carddiv = document.querySelector('#card');
    document.getElementById('alert').innerHTML = `${newses.length} found for the catergory ${name}`;
    carddiv.innerHTML = '';
    newses.forEach(element => {

        // getting star on the rating value from API
        let st = '';
        const val = Math.round(element.rating.number)
        for (i = 0; i < 5; i++) {
            if (i < val)
                st += `<i class="fas fa-star text-warning " id="1"></i>`
            else
                st += `<i class="fas fa-star" id="1"></i>`
        }

        carddiv.innerHTML += `
        <div class="row p-2 m-4 shadow rounded-4">
                    <div class="col-lg-3  d-flex flex-column align-content-center justify-content-center">
                        <img src="${element.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
                    </div>
                    <div class="col-lg-9"  >
                        <div class="card w-100 border-0">
                            <div class="card-body">
                                <h4 class="card-title">${element.title}</h4>
                                <p class="card-text">Tucker Carlson has rarely met a dictator's ass he didn't want to kiss, 
                                and Vladimir Putin is at the very top of that puckering up list. </p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small>
                                <div class="d-flex w-100 mt-5">
                                    <div class="author w-25 d-flex">
                                        <div class="w-25">
                                        <img src="${element.author.img}"
                                            alt="" class="img-fluid rounded-circle w-100">
                                        </div>
                                        <div class="d-flex flex-column mx-1 w-75">
                                            <h5 class="my-0 fs-5 fw-light">${element.author.name}</h5>
                                            <h6 class="my-0 fw-lighter">>${element.author.published_date}</h6>
                                        </div>
                                    </div>
                                    <div class="view w-25 d-flex align-content-center justify-content-center">
                                        <div class="out">
                                            <div class="in">
                                            </div>
                                        </div>
                                        <p>${element.total_view}</p>
                                    </div>
                                    <div class="rating w-25">
                                        ${st}
                                    </div>
                                    <div class="detail w-25 h-25 align-content-center justify-content-end d-flex">
                                        <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop" onclick="modalbody('${element._id}')">-></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        `
    });
}
async function modalbody(id){
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    console.log(details.data)
    printinmodal(details.data[0])
}
function printinmodal(detail){
    const modalbody = document.getElementById('modalbody');
    modalbody.innerHTML=`
    <div class="row shadow d-flex flex-column align-content-center justify-content-center">
                    <div class="col-auto w-75 d-flex flex-column align-content-center justify-content-center">
                        <img src="${detail.thumbnail_url}" class="img-fluid rounded-start w-100" alt="...">
                    </div>
                    <div class="col-lg-9"  >
                        <div class="card w-100 border-0">
                            <div class="card-body">
                                <h4 class="card-title">${detail.title}</h4>
                                <p class="card-text">${detail.details}</p>
                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small>
                                <div class="d-flex w-100 mt-5 align-content-center justify-content-between">
                                    <div class="author w-50">
                                        <div class="w-25">
                                        <img src="${detail.author.img}"
                                            alt="" class="img-fluid rounded-circle w-100">
                                        </div>
                                        <div class="d-flex flex-column mx-1 w-75">
                                            <h5 class="my-0 fs-5 fw-light">${detail.author.name}</h5>
                                            <h6 class="my-0 fw-lighter">>${detail.author.published_date}</h6>
                                        </div>
                                    </div>
                                    <div class="view w-50 d-flex align-content-center justify-content-center">
                                        <div class="out">
                                            <div class="in">
                                            </div>
                                        </div>
                                        <p>${detail.total_view}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    `
}
fetchcategory();