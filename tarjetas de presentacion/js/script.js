const h1 = ' Limones Luis';
let i = 0;
const typing = () => {
    if(i < h1.length){
        document.querySelector('.h1').innerHTML += h1.charAt(i);
        i++;

        setTimeout(typing, 150);
    }
}

typing();