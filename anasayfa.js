let aktifIs = null;
let puan = Number(localStorage.getItem("puan")) || 0;
let gecmis = JSON.parse(localStorage.getItem("gecmis")) || [];
let geriSayim = 0;
let geriSayimInterval = null;

const aktifIsDiv = document.getElementById("aktifIs");
const gecmisDiv = document.getElementById("gecmis");
const bildirim = document.getElementById("bildirim");
const onayEkrani = document.getElementById("onayEkrani");
const videoGonder = document.getElementById("videoGonder");
const liderlikDiv = document.getElementById("liderlik");
const bagislarDiv = document.getElementById("bagislar");
const guncellemelerDiv = document.getElementById("guncellemeler");

function kaydet(){
    localStorage.setItem("puan", puan);
    localStorage.setItem("gecmis", JSON.stringify(gecmis));
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

    document.getElementById("kullaniciBilgi").innerHTML = `Puan: ${puan}`;

    liderlikGoster();
    bagislariGoster();
    guncellemeleriGoster();
}

function liderlikGoster(){
    liderlikDiv.innerHTML = "";

    const liderler = [
        {isim: "🇹🇷 Mustafa Kemal Atatürk ∞", renk: "yellow", boyut: "20px"},
        {isim: "👑 Kemal Ulutaş (PATRON) | Km: 372914", renk: "red", boyut: "18px"},
        {isim: "2️⃣ Hasan Ali Budak | Km: 281500", renk: "green", boyut: "18px"},
        {isim: "3️⃣ Yiğit Efe Uluçay | Km: 270000", renk: "green", boyut: "18px"}
    ];

    liderler.forEach(l=>{
        let div = document.createElement("div");
        div.innerHTML = l.isim;
        div.style.color = l.renk;
        div.style.fontWeight = "bold";
        div.style.fontSize = l.boyut;
        div.style.animation = "blink 1s infinite";
        liderlikDiv.appendChild(div);
    });
}

function bildirimGoster(mesaj){
    bildirim.innerText = mesaj;
    bildirim.style.display = "block";
    setTimeout(()=>{bildirim.style.display="none";},2000);
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
    onayEkrani.style.display = "flex";
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

    let yazi = `${aktifIs.yuk} | ${aktifIs.nereden} → ${aktifIs.nereye}`;
    gecmis.unshift(yazi);

    aktifIs = null;

    // Sefer tamamlandı, 120 dakika bekleme başlat
    const simdikiZaman = new Date().getTime();
    const bitisZamani = simdikiZaman + 120*60*1000; // 120 dakika
    localStorage.setItem("seferBitisZamani", bitisZamani);

    startGeriSayim();

    kaydet();
    goster();
    videoGonder.style.display = "flex";
}

function startGeriSayim(){
    if(geriSayimInterval) clearInterval(geriSayimInterval);

    geriSayimInterval = setInterval(()=>{
        const simdikiZaman = new Date().getTime();
        const bitisZamani = localStorage.getItem("seferBitisZamani");

        if(!bitisZamani){
            geriSayim = 0;
            clearInterval(geriSayimInterval);
            goster();
            return;
        }

        let fark = Math.ceil((bitisZamani - simdikiZaman) / (60*1000));
        if(fark <= 0){
            geriSayim = 0;
            localStorage.removeItem("seferBitisZamani");
            clearInterval(geriSayimInterval);
        } else {
            geriSayim = fark;
        }

        goster();
    }, 60000);
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

// Sayfa açıldığında geri sayımı kontrol et
window.addEventListener("load", ()=>{
    const bitisZamani = localStorage.getItem("seferBitisZamani");
    if(bitisZamani){
        startGeriSayim();
    }
});

// --- BAĞIŞLAR ---
let bagislar = JSON.parse(localStorage.getItem("bagislar")) || ["Yok", "Yok", "Yok"];
function bagislariGoster(){
    bagislarDiv.innerHTML = "";
    bagislar.forEach(isim => {
        let div = document.createElement("div");
        div.innerHTML = `💖 ${isim}`;
        div.style.color = "pink";
        div.style.fontWeight = "bold";
        div.style.fontSize = "16px";
        bagislarDiv.appendChild(div);
    });
}

// --- GÜNCELLEMELER ---
let guncellemeler = JSON.parse(localStorage.getItem("guncellemeler")) || [
    "22/02/2026 - Yeni bağış sistemi eklendi",
    "21/02/2026 - Liderlik tablosu güncellendi",
    "20/02/2026 - Site tasarımına modern dokunuşlar yapıldı"
];
function guncellemeleriGoster(){
    guncellemelerDiv.innerHTML = "";
    guncellemeler.forEach(metin => {
        let div = document.createElement("div");
        div.innerHTML = `• ${metin}`;
        div.style.color = "#22c55e";
        div.style.fontSize = "16px";
        div.style.marginBottom = "5px";
        guncellemelerDiv.appendChild(div);
    });
}

// Sayfa açıldığında tüm gösterimleri çalıştır
goster();
bagislariGoster();
guncellemeleriGoster();



