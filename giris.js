function giris(){
    const email = document.getElementById("email").value.trim();
    if(!email){
        document.getElementById("mesaj").innerText = "E-posta gir!";
        return;
    }

    // E-posta format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        document.getElementById("mesaj").innerText = "Geçerli bir e-posta gir!";
        return;
    }

    let kayitliKullanicilar = JSON.parse(localStorage.getItem("kullanicilar") || "[]");

    if(!kayitliKullanicilar.includes(email)){
        document.getElementById("mesaj").innerText = "Kayıtlı e-posta değil! Lütfen kayıt olun.";
        return;
    }

    localStorage.setItem("kullaniciAdi", email);
    window.location.href = "anasayfa.html";
}

function kayit(){
    const email = document.getElementById("email").value.trim();
    if(!email){
        document.getElementById("mesaj").innerText = "E-posta gir!";
        return;
    }

    // E-posta format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        document.getElementById("mesaj").innerText = "Geçerli bir e-posta gir!";
        return;
    }

    let kayitliKullanicilar = JSON.parse(localStorage.getItem("kullanicilar") || "[]");

    if(kayitliKullanicilar.includes(email)){
        document.getElementById("mesaj").innerText = "Bu e-posta zaten kayıtlı!";
        return;
    }

    kayitliKullanicilar.push(email);
    localStorage.setItem("kullanicilar", JSON.stringify(kayitliKullanicilar));
    localStorage.setItem("kullaniciAdi", email);
    window.location.href = "anasayfa.html";
}
