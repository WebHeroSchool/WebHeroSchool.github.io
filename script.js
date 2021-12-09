let body = document.body;
let url = window.location.toString();
let ursl = https://api.github.com/users/;
//let name = 'Uleva';

const getNameFromUrl = (url) => {
  let getUrl = url.split('=');
  let name = getUrl[1];
  if(name == undefined){
  name = 'Uleva';
  }
return name;
}

const getName = new Promise((resolve,reject)=>{
  setTimeout(()=> getNameFromUrl(url) ? resolve(getNameFromUrl(url)) : reject('Пользователь не найден'),3000)
});

const getUrl = new Promise((resolve,reject)=>{
  setTimeout(()=> url ? resolve(url) : reject('Недоступен url'),2000)
});
Promise.all([getName,getUrl])
.then(([names,ursl]) => fetch(`${ursl}${getNameFromUrl(url)}`))
.then(res=>res.json())
.then(json => {
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
