function loadLazyImg(img) {
    // Chuyển giá trị lazy-src sang src để load hình (đồng thời xóa lazy-src)
    img.setAttribute('src', img.getAttribute('lazy-src'))
    img.removeAttribute('lazy-src')
}

function ready() {
    const lazyImgs = document.querySelectorAll('[lazy-src]')

    if ('IntersectionObserver' in window) { // Kiểm tra browser có hỗ trợ API Intersection hay không
        const observerLazyImg = new IntersectionObserver((entries, observer) => {

            console.log(entries) // Danh sách các đối tượng theo dõi lazyImgs 
            console.log(observer)

            entries.forEach(entry => {

                console.log(entry) // Đối tượng theo dõi lazyImg

                if (entry.isIntersecting) { // Kiểm tra element nằm trong khung viewport
                    loadLazyImg(entry.target) // entry.target: tương đương đối tượng DOM đang được entry này tracking
                    observerLazyImg.unobserve(entry.target)
                }
            })
        }, {}) // options được để trống

        lazyImgs.forEach(lazyImg => {
            observerLazyImg.observe(lazyImg) // Tracking từng lazyImg
        })
    } else {
        // Sử dụng cách thủ công: Scroll và Resize event
    }
}

document.addEventListener('DOMContentLoaded', ready)