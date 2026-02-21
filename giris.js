function kayit(){

let kullanici=document.getElementById("kullanici").value;
let sifre=document.getElementById("sifre").value;

if(kullanici=="" || sifre==""){
mesaj("Bilgileri doldur.");
return;
}

let users=JSON.parse(localStorage.getItem("users")) || [];

let varmi=users.find(u=>u.kullanici===kullanici);

if(varmi){
mesaj("Bu kullanıcı zaten var.");
return;
}

users.push({kullanici,sifre,para:0,puan:0});
localStorage.setItem("users",JSON.stringify(users));

mesaj("Kayıt başarılı.");
}

function giris(){

let kullanici=document.getElementById("kullanici").value;
let sifre=document.getElementById("sifre").value;

let users=JSON.parse(localStorage.getItem("users")) || [];

let user=users.find(u=>u.kullanici===kullanici && u.sifre===sifre);

if(user){

localStorage.setItem("aktifKullanici", kullanici)

window.location="anasayfa.html"

}
else{
mesaj("Bilgiler yanlış.");
}

}

function mesaj(text){
document.getElementById("mesaj").innerText=text;
}