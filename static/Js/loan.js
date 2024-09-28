const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');
const filds = document.querySelectorAll('.filds');

let currentActive = 1;

next.addEventListener('click', () => {
    if (currentActive < circles.length) {
        currentActive++;
        update();
    }
});

prev.addEventListener('click', () => {
    if (currentActive > 1) {
        currentActive--;
        update();
    }
});

function update() {
    circles.forEach((circle, idx) => {
        circle.classList.toggle('active', idx < currentActive);
    });

    filds.forEach((fild, idx) => {
        fild.classList.toggle('activeflds', idx === currentActive - 1);
    });

    const actives = document.querySelectorAll('.active');
    progress.style.width = ((actives.length - 1) / (circles.length - 1)) * 100 + '%';

    prev.disabled = currentActive === 1;
    if (currentActive === circles.length) {
        next.innerText = 'Submit';
    }else{
        next.innerText = 'Next';
    }
}


next.disabled = currentActive === 1;
//Check user exist or not
function check_account() {
    alert("Account does not exist");
    next.disabled = false;
}