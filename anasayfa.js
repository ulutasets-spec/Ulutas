let aktifIs = null;

let puan = Number(localStorage.getItem("puan")) || 0;
let bakiye = Number(localStorage.getItem("bakiye")) || 0;
let gecmis = JSON.parse(localStorage.getItem("gecmis")) || [];
let geriSayim = Number(localStorage.getItem("geriSayim")) || 0;
let geriSayimInterval = null;

const aktifIsDiv = document.getElementById("aktifIs");
const gecmisDiv = document.getElementById("gecmis");
const bildirim = document.getElementById("bildirim");
const onayEkrani = document.getElementById("onayEkrani");
const videoGonder = document.getElementById("videoGonder");
const liderlikDiv = document.getElementById("liderlik");

function kaydet(){
    localStorage.setItem("puan", puan);
    localStorage.setItem("bakiye", bakiye);
    localStorage.setItem("gecmis", JSON.stringify(gecmis));
    localStorage.setItem("geriSayim", geriSayim);
}

function goster(){
    if(geriSayim > 0){
        aktifIsDiv.innerHTML = `İş alabilmek için bekle: ${geriSayim} dakika`;
    } else {
        aktifIsDiv.innerHTML = aktifIs
            ? `<p>${aktifIs.yuk}</p>
               <p>${aktifIs.nereden} → ${aktifIs.nereye}</p>`
            : "Aktif iş yok";
    }

    gecmisDiv.innerHTML = "";
    gecmis.forEach(i=>{
        gecmisDiv.innerHTML += `<p>${i}</p>`;
    });

    document.getElementById("kullaniciBilgi").innerHTML =
    `Puan: ${puan} | Bakiye: ${bakiye} TL`;

    liderlikGoster();
}

function liderlikGoster(){
    liderlikDiv.innerHTML = "";

    let ata = document.createElement("div");
    ata.innerHTML = "🇹🇷 Mustafa Kemal Atatürk ∞";
    ata.style.color = "yellow";
    ata.style.fontWeight = "bold";
    ata.style.fontSize = "20px";
    ata.style.animation = "blink 1s infinite";
    liderlikDiv.appendChild(ata);

    let kemal = document.createElement("div");
    kemal.innerHTML = "👑 Kemal Ulutaş (PATRON) | Km: 372914";
    kemal.style.color = "red";
    kemal.style.fontWeight = "bold";
    kemal.style.fontSize = "18px";
    kemal.style.animation = "blink 1s infinite";
    liderlikDiv.appendChild(kemal);

    let hasan = document.createElement("div");
    hasan.innerHTML = "2️⃣ Hasan Ali Budak | Km: 281500";
    hasan.style.color = "green";
    hasan.style.fontWeight = "bold";
    hasan.style.fontSize = "18px";
    hasan.style.animation = "blink 1s infinite";
    liderlikDiv.appendChild(hasan);

    let yigit = document.createElement("div");
    yigit.innerHTML = "3️⃣ Yiğit Efe Uluçay | Km: 270000";
    yigit.style.color = "green";
    yigit.style.fontWeight = "bold";
    yigit.style.fontSize = "18px";
    yigit.style.animation = "blink 1s infinite";
    liderlikDiv.appendChild(yigit);
}

function bildirimGoster(mesaj){
    bildirim.innerText = mesaj;
    bildirim.style.display = "block";

    setTimeout(()=>{
        bildirim.style.display="none";
    },2000);
}

function isBaslat(){
    if(geriSayim > 0){
        bildirimGoster(`İş alabilmek için ${geriSayim} dakika bekle`);
        return;
    }

    const yuk = document.getElementById("yuk").value;
    const nereden = document.getElementById("nereden").value;
    const nereye = document.getElementById("nereye").value;

    if(!yuk || !nereden || !nereye){
        bildirimGoster("Bilgileri doldur kaptan");
        return;
    }

    window.yeniIs = {yuk, nereden, nereye};
    onayEkrani.style.display = "flex"; // uyarı sadece burada gösterilecek
}

function onayla(){
    aktifIs = window.yeniIs;
    onayEkrani.style.display = "none";
    bildirimGoster("Sefer başladı");
    goster();
}

function iptal(){
    onayEkrani.style.display = "none";
}

function teslim(){
    if(!aktifIs){
        bildirimGoster("Aktif iş yok");
        return;
    }

    puan += 50;

    if(puan >= 10000){
        bakiye += 100;
        puan = puan - 10000;
        bildirimGoster("100 TL kazandın");
    }

    let yazi = `${aktifIs.yuk} | ${aktifIs.nereden} → ${aktifIs.nereye}`;
    gecmis.unshift(yazi);

    aktifIs = null;

    // Teslimden sonra 90 dakika geri sayım başlat
    geriSayim = 90;
    localStorage.setItem("geriSayim", geriSayim);
    geriSayimInterval = setInterval(()=>{
        geriSayim--;
        localStorage.setItem("geriSayim", geriSayim);
        if(geriSayim <= 0){
            clearInterval(geriSayimInterval);
            localStorage.removeItem("geriSayim");
        }
        goster();
    }, 60000);

    kaydet();
    goster();
    videoGonder.style.display = "flex";
}

function kapatVideo(){
    videoGonder.style.display = "none";
}

function gecmisiSifirla(){
    gecmis = [];
    kaydet();
    goster();
    bildirimGoster("Geçmiş silindi");
}

// Sayfa açıldığında geri sayım varsa başlat
if(geriSayim > 0){
    geriSayimInterval = setInterval(()=>{
        geriSayim--;
        localStorage.setItem("geriSayim", geriSayim);
        if(geriSayim <= 0){
            clearInterval(geriSayimInterval);
            localStorage.removeItem("geriSayim");
        }
        goster();
    }, 60000);
}

goster();
