
// DEACLARITION USABLE VARIABLES

let surah_name_arabic;

let surah_name_eng;

let numberOfAyahs;

let ayah_num;

let ayahNumberInSurah;

let number;

let ayah_arab;

let ayah_eng;

let lang = "arabic";

let surah_num = Math.floor(Math.random() * 114);

if (surah_num == 0) {
    surah_num++;
}

// GET MAIN AYAH DATA

const getData = () => {
    fetch(`https://api.alquran.cloud/v1/surah/${surah_num}`).then((result) => {
        let data = result.json();
        return data;
    }).then((surah) => {
        // ARABIC
        let numberOfAyahs = surah.data.numberOfAyahs;
        ayah_num = Math.floor(Math.random() * numberOfAyahs);
        let ayah = surah.data.ayahs[ayah_num];
        ayahNumberInSurah = ayah.numberInSurah;
        number = surah.data.number;
        surah_name_arabic = surah.data.name;
        ayah_arab = ayah.text;
        // ENGLISH
        fetch(`https://api.alquran.cloud/v1/surah/${surah_num}/en.sahih`).then((result) => {
            let data = result.json();
            return data
        }).then((surah) => {
            console.log(surah);
            let ayah = surah.data.ayahs[ayah_num];
            ayahNumberInSurah = ayah.numberInSurah;
            surah_name_eng = surah.data.englishName;
            ayah_eng = ayah.text;
            console.log(surah_name_eng)
            console.log(ayahNumberInSurah)
            console.log(ayah_eng)
        })
        printInPage()
    })
}

getData();

// FUNCTION TO PRINT ALL RESPONSE TEXT FORM API TO PAGE

const printInPage = () => {
    let ayah_ele = document.querySelector(".ayah p");
    let surah_name_ele = document.querySelector(".container #surah_name")
    let ayah_num = document.querySelector(".container #ayah_num");
    ayah_num.textContent = `(${ayahNumberInSurah})`;
    if (lang == "arabic") {
        ayah_ele.textContent = ayah_arab;
        surah_name_ele.textContent = surah_name_arabic;
    } else {
        ayah_ele.textContent = ayah_eng;
        surah_name_ele.textContent = surah_name_eng;
    }
}

// TRANSLATE FORM ARABIC TO ENGLISH AND VICE VERSA

let translate = document.querySelector("#trans");

translate.addEventListener("click", () => {
    if (lang == "arabic") {
        lang = "eng";
    } else {
        lang = "arabic";
    }
    printInPage()
})

// CHANGE AYAH AND BACKGROUDN ON CLICK DICE

let change = document.querySelector("#change");

change.addEventListener("click", () => {
    let surah_num = Math.floor(Math.random() * 114);
    if (surah_num == 0){
        surah_num++;
    }
    fetch(`https://api.alquran.cloud/v1/surah/${surah_num}`).then((result) => {
        let data = result.json();
        return data;
    }).then((surah) => {
        // ARABIC
        console.log(surah);
        let numberOfAyahs = surah.data.numberOfAyahs;
        ayah_num = Math.floor(Math.random() * numberOfAyahs);
        let ayah = surah.data.ayahs[ayah_num];
        ayahNumberInSurah = ayah.numberInSurah;
        number = surah.data.number;
        surah_name_arabic = surah.data.name;
        ayah_arab = ayah.text;
        console.log(surah_name_arabic)
        console.log(ayahNumberInSurah)
        console.log(ayah_arab)
        // ENGLISH
        fetch(`https://api.alquran.cloud/v1/surah/${surah_num}/en.sahih`).then((result) => {
            let data = result.json();
            return data
        }).then((surah) => {
            console.log(surah);
            let ayah = surah.data.ayahs[ayah_num];
            ayahNumberInSurah = ayah.numberInSurah;
            surah_name_eng = surah.data.englishName;
            ayah_eng = ayah.text;
            console.log(surah_name_eng)
            console.log(ayahNumberInSurah)
            console.log(ayah_eng)
        })
        printInPage();
        RandomBg();
    })
})

// OPEN SETTINGS MENU

let settings = document.querySelector(".settings");
let settings_menu = document.querySelector(".settings_menu")

settings.addEventListener('click', () => {
    settings_menu.style.left = "0";
    close_settings.style.left = "270px";
})

// CLOSE SETTING MENU

let close_settings = document.querySelector(".close_setting_menu");

close_settings.addEventListener("click", () => {
    settings_menu.style.left = "-500px";
    close_settings.style.left = "-270px";
})

// ADD TO FAVS

let main_favs = [];

// MAKE LOCAL STORAGE THE MAIN FAVS ARRAY TO SAVE DATA IN LOCAL STORAGE (EQUALITY OF MAIN FAVS AS LOCAL STORAGE)

const addFav = () => {
    let surah_name, ayah;
    if (lang == "arabic") {
        surah_name = surah_name_arabic;
        ayah = ayah_arab;
    } else {
        surah_name = surah_name_eng;
        ayah = ayah_eng;
    }
    const fav = {
        id: number,
        ayahNum: ayahNumberInSurah,
        surah_name: surah_name,
        ayah: ayah,
    }
    if (main_favs.length == 0) {
        main_favs.push(fav)
    } else {
        const index = main_favs.findIndex(fav_ele => {
            return fav_ele.id === fav.id;
        });
        if (index === -1) {
            main_favs.push(fav)
        }
    }
    AddToLocal(main_favs);
    addFavsEle(main_favs);
}

// ADD FAVS ELMENTS TO PAGE

const addFavsEle = (arr) => {
    document.querySelector(".favs").innerHTML = "";
    arr.forEach((fav) => {
        let fav_ele = document.createElement("div");
        fav_ele.classList.add("fav");
        fav_ele.innerHTML = `
        <div class="top_fav">
                    <div class="ayah_info">
                        <span id="ayah_num">${fav.ayahNum}</span> - <span id="surah_name">${fav.surah_name}</span>
                    </div>
                    <div class="del"><i class="fa-solid fa-delete-left"></i></div>
                </div>
                <p class="fav_ayah">${fav.ayah}</p>
        </div>
        `
        document.querySelector(".favs").appendChild(fav_ele);
    })
    document.querySelectorAll(".del").forEach((ele) => {
        ele.addEventListener("click", (e) => {
            let fav_ele_surah_name = e.target.parentElement.parentElement.querySelector("#surah_name").textContent;
            let fav_ele_ayah_num = e.target.parentElement.parentElement.querySelector("#ayah_num").textContent;
            e.target.parentElement.parentElement.parentElement.classList.add("remove")
            setTimeout(() => {
                main_favs = main_favs.filter((fav_ele) => fav_ele.ayahNum != fav_ele_ayah_num && fav_ele.surah_name != fav_ele_surah_name);
                AddToLocal(main_favs)
            }, 1000)
        })
    })
}

// MAKE THE FIRST THAT PAGE FACES THE LOCAL STORAGE NOT THE EMPTY MAIN FAVS ARRAY IF FAVS ELEMENT EXIST IN LOCALSTORAGE

if (window.localStorage.getItem("favs")) {
    main_favs = JSON.parse(window.localStorage.getItem("favs"));
    addFavsEle(main_favs)
}

// ADD TO LOCAL STORAGE

const AddToLocal = (arr) => {
    let data = JSON.stringify(arr);
    window.localStorage.setItem("favs", data);
    addFavsEle(JSON.parse(window.localStorage.getItem("favs")))
}

// ADD TO FAVOURITS

let fav_btn = document.querySelector("#fav");

fav_btn.addEventListener("click", () => {
    document.querySelector("#fav svg").classList.toggle("svg_active");
    addFav();
    document.documentElement.style.setProperty('--fav_text', 'var(--added)');
    if (document.querySelector("#fav svg").classList.contains("svg_active")) {
        setTimeout(() => {
            document.documentElement.style.setProperty('--fav_text', 'var(--removed_ask)');
            document.documentElement.style.setProperty("--pseudo_width", '170px');
        }, 1000)
    }
    if (!document.querySelector("#fav svg").classList.contains("svg_active")) {
        document.documentElement.style.setProperty("--fav_text", 'var(--removed)');
        document.documentElement.style.setProperty("--pseudo_width", '145px');
        setTimeout(() => {
            document.documentElement.style.setProperty("--fav_text", 'var(--fav_main_text)');
            document.documentElement.style.setProperty("--pseudo_width", '145px');
        }, 2000)
        let surah_name, ayah__num;
        if (lang == "arabic") {
            surah_name = surah_name_arabic;
        } else {
            surah_name = surah_name_eng;
        }
        ayah__num = ayah_num + 1;
        for (let i = 0; i < main_favs.length; i++) {
            if (main_favs[i].surah_name == surah_name && main_favs[i].ayahNum == ayah__num) {
                main_favs = main_favs.filter((fav_ele) => fav_ele.ayahNum != ayah__num && fav_ele.surah_name != surah_name);
                AddToLocal(main_favs)
            }
        }
    }
});

// CHECK IF MAIN FAVS HAS SAME AYAH IN MAIN AYAH TO PUT THE HEART OR REMOVE IT

setInterval(() => {
    let surah_name, ayah__num;
    if (lang == "arabic") {
        surah_name = surah_name_arabic;
    } else {
        surah_name = surah_name_eng;
    }
    ayah__num = ayah_num + 1;
    for (let i = 0; i < main_favs.length; i++) {
        if (main_favs[i].surah_name == surah_name && main_favs[i].ayahNum == ayah__num) {
            document.querySelector("#fav svg").classList.add("svg_active");
            document.documentElement.style.setProperty('--fav_text', 'var(--removed_ask)');
            document.documentElement.style.setProperty("--pseudo_width", '170px');
        } else {
            document.querySelector("#fav svg").classList.remove("svg_active");
            document.documentElement.style.setProperty("--fav_text", 'var(--fav_main_text)');
            document.documentElement.style.setProperty("--pseudo_width", '145px');
        }
    }
}, 1000)

let random_img;

const RandomBg = () => {
    let folders = ['jpg', 'jpeg', 'videos']
    let random_folder_num = Math.floor(Math.random() * 3);
    let random_num;
    let random_folder = `./imgs/${folders[random_folder_num]}`;
    if (document.querySelector("video")){
        document.querySelector("video").remove()
    }
    if (random_folder == "./imgs/jpg") {
        random_num = Math.floor(Math.random() * 15);
        random_img = `${random_folder}/img_${random_num}.jpg`;
    }
    if (random_folder == "./imgs/jpeg") {
        random_num = Math.floor(Math.random() * 29);
        random_img = `${random_folder}/img_${random_num}.jpeg`;
    }
    if (random_folder == "./imgs/videos") {
        random_num = Math.floor(Math.random() * 7);
        random_video = `${random_folder}/video_${random_num}.mp4`;
        let video = document.createElement("video");
        video.setAttribute("autoplay", "")
        video.setAttribute("loop", "")
        video.setAttribute("muted", "")
        video.src = random_video;
        document.body.appendChild(video)
    }
    document.body.style.backgroundImage = `url(${random_img})`;
}

RandomBg();

// GET WEATHER AND PREMISION ON LOCATION

const findState = () => {
    const sucess = (e) => {
        let lat = e.coords.latitude;
        let lon = e.coords.longitude;
        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5f032a2c89e5c9b29550fc870d61f335`
        fetch(api).then(result => {
            let data = result.json();
            return data
        }).then(weather => {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                if (result.state === "granted") {
                    console.log(weather)
                    document.querySelector("#w_txt").textContent = `${Math.ceil(weather.main.temp)}°`
                    document.querySelector("#country").textContent = `${weather.sys.country} (${weather.name})`
                    document.querySelector(".weather").style.display = "flex";
                    document.querySelector(".check_weather").style.display = "none";
                } else if (result.state === "prompt") {
                    document.querySelector(".weather").style.display = "none";
                    document.querySelector(".check_weather").style.display = "block";
                }
            });
            
        })
    }

    const error = (e) => {
        console.log(e)
    }

    let location = navigator.geolocation.getCurrentPosition(sucess, error);
}

// CHECK IF THE USER ALREADY HAVE ACCEPTED LOCATION PREMISION

navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
        findState();
    }
});

document.querySelector(".check_weather").addEventListener("click", ()=>{
    findState(); 
})

// TIME 

setInterval(() => {
    let date = new Date();
  
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let secounds = date.getSeconds()
    let time_zone = "AM";
  
    if(hours > 12){
      time_zone = "PM";
      hours = hours - 12;
    }else if (hours == 0){
      hours = 12;
    }
  
    if (hours < 10){
      hours = `0${hours}`
    }
    if (minutes < 10){
      minutes = `0${minutes}`
    }
    if (secounds < 10){
      secounds = `0${secounds}`
    }
  
    let month = date.getMonth() + 1;
    let full_date = `${date.getDate()} / ${month} / ${date.getFullYear()} `
  
   document.querySelector("#time").textContent = `${hours} : ${minutes} ${time_zone}`;
   document.querySelector('#date').textContent = full_date
}, 1000)

// PRELOADER

window.onload = () =>{
    setTimeout(()=>{
        document.documentElement.style.setProperty("--width", "0%");
        document.querySelector("#pre_loader svg").style.display = "none";
    }, 2000)
}