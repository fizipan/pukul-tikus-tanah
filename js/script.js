const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const menit = document.querySelector('.menit');
const audio = document.getElementById('audio');

let selesai;
let tanahSebelumnya;
let skor;

function randomTanah(tanah) {
    const t = Math.floor(Math.random() * tanah.length);
    const tRandom = tanah[t];
    if (tRandom == tanahSebelumnya) {
        randomTanah(tanah);
    }
    tanahSebelumnya = tRandom;
    return tRandom;
}

function randomWaktu(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
    const tRandom = randomTanah(tanah);
    const wRandom = randomWaktu(300, 800);
    tRandom.classList.add('muncul');
    setTimeout(() => {
        tRandom.classList.remove('muncul');
        if (!selesai) {
            munculkanTikus();
        }
    }, wRandom);

}

function mulai() {
    const minute = menit.value;
    selesai = false;
    skor = 0;
    papanSkor.textContent = 0;
    munculkanTikus();
    setTimeout(() => {
        selesai = true;
    }, minute);
}

function stop() {
    selesai = true;
    skor = 0;
    papanSkor.textContent = 0;
}

function reset() {
    papanSkor.textContent = 0;
}

function pukul() {
    skor++;
    this.parentNode.classList.remove('muncul');
    audio.play();
    papanSkor.textContent = skor;

}

tikus.forEach(t => {
    t.addEventListener('click', pukul)
});