let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const dots = document.querySelectorAll('.dot');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const links = [
    'https://shecan.ir/', // لینک‌های مرتبط با تصاویر
    'https://example.com/page2',
    'https://example.com/page3'
];
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let autoSlideInterval;
let isAutoSliding = true;
const slideDuration = 3000; // مدت زمان خودکار تعویض اسلایدها (به میلی‌ثانیه)
const threshold = 100; // میزان حرکت برای تغییر اسلاید
const clickDurationThreshold = 120; // مدت زمان آستانه برای تشخیص کلیک واقعی
let clickStartTime = 0; // زمان شروع کلیک
let clickTimeout; // برای جلوگیری از ثبت کلیک طولانی

// تابع نمایش اسلایدها
function showSlides() {
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    updateSlidePosition();
}

// تابع به‌روزرسانی موقعیت اسلاید
function updateSlidePosition() {
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(${-slideIndex * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex].classList.add('active');
}

// تابع راه‌اندازی مجدد اسلایدر خودکار
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(showSlides, slideDuration);
}

// تابع اضافه کردن لینک به تصاویر
function addLinks() {
    slides.forEach((slide, index) => {
        const img = slide.querySelector('img');
        img.style.cursor = 'pointer'; // تغییر شکل نشانگر ماوس به "دست"
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // جلوگیری از Propagation رویداد
            if (Date.now() - clickStartTime <= clickDurationThreshold) {
                window.location.href = links[index];
            }
        });
    });
}

// راه‌اندازی اولیه
window.onload = function () {
    addLinks(); // اضافه کردن لینک‌ها به تصاویر
    dots[0].classList.add('active'); // دایره اول را فعال کن
    setTimeout(() => {
        slideIndex = 1; // بعد از 2 ثانیه به اسلاید دوم برو
        updateSlidePosition();
        resetAutoSlide(); // شروع اسلایدر خودکار
    }, 2000);
};

// افزودن رویداد کلیک به دایره‌ها
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (!isDragging) { // فقط اگر درگ نکرده باشد
            slideIndex = index;
            updateSlidePosition();
            resetAutoSlide(); // راه‌اندازی مجدد اسلایدر خودکار
        }
    });
});

function startDrag(e) {
    isDragging = true;
    clickStartTime = Date.now(); // زمان شروع کلیک را ذخیره کن
    startX = getPositionX(e);
    slider.style.transition = 'none';
    clearInterval(autoSlideInterval);
    isAutoSliding = false;
}

function endDrag(e) {
    if (isDragging) {
        isDragging = false;
        slider.style.transition = 'transform 0.5s ease-in-out';

        const movedBy = currentTranslate - prevTranslate;

        if (Math.abs(movedBy) > threshold) {
            // اگر درگ کردیم، به‌روزرسانی اسلایدها را انجام دهیم
            if (movedBy < -threshold) {
                slideIndex++;
            } else if (movedBy > threshold) {
                slideIndex--;
            }

            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            } else if (slideIndex >= slides.length) {
                slideIndex = 0;
            }

            updateSlidePosition();
            prevTranslate = -slideIndex * slider.clientWidth;
        }

        // فعال‌سازی مجدد اسلایدر خودکار پس از 7 ثانیه
        setTimeout(() => {
            isAutoSliding = true;
            resetAutoSlide();
        }, 7000);
    }
}

function dragging(e) {
    if (isDragging) {
        const currentX = getPositionX(e);
        currentTranslate = prevTranslate + currentX - startX;
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }
}

function getPositionX(e) {
    return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

// جلوگیری از باز شدن لینک هنگام درگ کردن
slider.addEventListener('mousedown', startDrag);
slider.addEventListener('mouseup', endDrag);
slider.addEventListener('mouseleave', endDrag);
slider.addEventListener('mousemove', (e) => {
    dragging(e);
});

slider.addEventListener('touchstart', startDrag);
slider.addEventListener('touchend', endDrag);
slider.addEventListener('touchmove', (e) => {
    dragging(e);
});

// جلوگیری از رفتار پیش‌فرض مرورگر برای درگ کردن تصاویر
slides.forEach((slide) => {
    slide.addEventListener('dragstart', (e) => e.preventDefault());
});

// کنترل کلیک بر روی دکمه‌های قبلی و بعدی
prev.addEventListener('click', () => {
    if (!isDragging) { // فقط اگر درگ نکرده باشد
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        updateSlidePosition();
        resetAutoSlide();
    }
});

next.addEventListener('click', () => {
    if (!isDragging) { // فقط اگر درگ نکرده باشد
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        updateSlidePosition();
        resetAutoSlide();
    }
});

const items = document.querySelectorAll('.discount-item');

items.forEach(item => {
    item.addEventListener('mouseover', () => {
        items.forEach(el => {
            if (el !== item) {
                el.classList.add('black-bg'); // اضافه کردن کلاس برای تغییر رنگ
            }
        });
    });

    item.addEventListener('mouseout', () => {
        items.forEach(el => {
            el.classList.remove('black-bg'); // حذف کلاس برای بازگشت به حالت اولیه
        });
    });
});


// تابع برای "مشاهده بیشتر"
function showMoreItems() {
    // نمایش آیتم‌های بیشتر از نوع .discount-item.hidden
    document.querySelectorAll('.discount-item.hidden').forEach(function(item) {
        item.classList.remove('hidden');
    });

    // نمایش آیتم‌های بیشتر از نوع .paragraph.hidden
    document.querySelectorAll('.paragraph.hidden').forEach(function(item) {
        item.classList.remove('hidden');
    });

    // تبدیل به حالت Grid
    document.querySelector('.daily-discount').classList.add('grid-view');

    // تغییر متن دکمه به "مشاهده کمتر"
    const button = document.querySelector('.more-item');
    button.textContent = '...مشاهده کمتر';
    button.classList.add('less-item');

    // تغییر رویداد دکمه به "مشاهده کمتر"
    button.removeEventListener('click', showMoreItems);
    button.addEventListener('click', showLessItems);
}

function showLessItems() {
    // مخفی کردن آیتم‌های بیشتر از نوع .discount-item
    document.querySelectorAll('.discount-item').forEach(function(item, index) {
        if (index >= 6) {
            item.classList.add('hidden');
        }
    });

    // مخفی کردن آیتم‌های بیشتر از نوع .paragraph
    document.querySelectorAll('.paragraph').forEach(function(item, index) {
        if (index >= 6) {
            item.classList.add('hidden');
        }
    });

    // بازگشت به حالت اولیه (column view)
    document.querySelector('.daily-discount').classList.remove('grid-view');

    // تغییر متن دکمه به "مشاهده بیشتر"
    const button = document.querySelector('.more-item');
    button.textContent = '...مشاهده بیشتر';
    button.classList.remove('less-item');

    // تغییر رویداد دکمه به "مشاهده بیشتر"
    button.removeEventListener('click', showLessItems);
    button.addEventListener('click', showMoreItems);
}

// شروع با رویداد "مشاهده بیشتر"
document.querySelector('.more-item').addEventListener('click', showMoreItems);


document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdownToggle.addEventListener('click', function (event) {
        event.preventDefault();
        // حذف همه کلاس‌های show از تمام منوهای دراپ‌داون دیگر
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (menu !== dropdownMenu) {
                menu.classList.remove('show');
            }
        });

        // اضافه کردن یا حذف کلاس show برای نمایش یا مخفی کردن منوی فعلی
        dropdownMenu.classList.toggle('show');

        // تنظیم z-index برای آوردن منو به بالاترین سطح
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.style.zIndex = '10000';
        } else {
            dropdownMenu.style.zIndex = '1000';
        }
    });

    // بستن منو اگر کاربر خارج از آن کلیک کند
    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});



function closePromoBar() {
    const promoBar = document.getElementById('promo-bar');
    promoBar.classList.add('hidden');

    // حذف کامل نوار تبلیغاتی بعد از انیمیشن (اختیاری)
    setTimeout(() => {
        promoBar.style.display = 'none';
    }, 500); // مدت زمان باید با transition در CSS برابر باشد
}






// زمان پایان تایمر را 7 روز بعد از زمان کنونی تنظیم کنید
// زمان پایان تایمر را 7 روز بعد از زمان کنونی تنظیم کنید
const countdownDate = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

// بروزرسانی تایمر در هر ثانیه
const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    // محاسبه زمان باقی‌مانده
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // نمایش زمان باقی‌مانده
    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    // وقتی تایمر به پایان می‌رسد
    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById("countdown").innerHTML = "زمان به پایان رسیده!";
    }
}, 1000);
