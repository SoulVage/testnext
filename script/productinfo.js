const products = [
    {
        name: "Grand Theft Auto V",
        img: "src/png/Card/gtav.jpg",
        price: "720,000 تومان",
        discount: "20%",
        genre: "Action-Adventure",
        developer: "Rockstar North",
        releaseDate: "2013",
    },
    {
        name: "FC 24",
        img: "src/png/Card/fc24.jpg",
        price: "2,150,000 تومان",
        discount: "35%",
        genre: "Sports",
        developer: "EA Sports",
        releaseDate: "2023",
    },
    // اطلاعات بقیه محصولات ...
];


document.querySelectorAll('.card-item').forEach(item => {
    item.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const product = products[productId];

        // نمایش اطلاعات محصول در یک صفحه جدید یا مودال
        displayProductInfo(product);
    });
});

function displayProductInfo(product) {
    const modal = document.getElementById('product-modal');
    modal.querySelector('.modal-title').innerText = product.name;
    modal.querySelector('.modal-img').src = product.img;
    modal.querySelector('.modal-price').innerText = product.price;
    modal.querySelector('.modal-discount').innerText = product.discount;
    modal.querySelector('.modal-genre').innerText = product.genre;
    modal.querySelector('.modal-developer').innerText = product.developer;
    modal.querySelector('.modal-release-date').innerText = product.releaseDate;

    modal.style.display = 'block';
}
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('product-modal').style.display = 'none';
});
