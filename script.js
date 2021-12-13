  let body = document.body;
  let url = window.location.toString();
  let preloaderEl = document.getElementById('preloader');

  const getNameFromUrl = (url) => {
  let getUrl = url.split('=');
  let name = getUrl[1];
  if(name == undefined){
    name = 'Uleva';
  }
    return name;
}

const getTime = new Promise ((resolve, reject) => {
  setTimeout(()=> resolve(new Date()), 2000)
})

const getUser = fetch(`https://api.github.com/users/${getNameFromUrl(url)}`);

Promise.all([getUser, getTime])
  .then(([res,date])=>{

  let day = date.getDate()
  let month = date.getMonth();
  let year = date.getFullYear();
  let data =  document.createElement('h1');
  data.innerHTML = 'Дата: '+ day + '.' + month + '.' + year;
  body.append(data);

  return res.json()
})

  .then(json => {
    preloaderEl.classList.add('hidden');
      console.log(json.avatar_url);
      console.log(json.name);
      console.log(json.bio);
      console.log(json.html_url);

        let photo = new Image();
        photo.src = json.avatar_url;
        body.append(photo);

        let name = document.createElement('p');
        if (json.name != null) {
            name.innerHTML = json.name;
        } else {
            name.innerHTML = 'Информация о пользователе недоступна';
        }
        body.append(name);

        let bio = document.createElement('p');
        bio.classList.add('link');
        if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Информация о пользователе недоступна';
        }
        body.append(bio);

        name.addEventListener("click", () => window.location = json.html_url);
    })
    .catch(err=>console.log(err));
