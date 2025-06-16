document.addEventListener('DOMContentLoaded', function() {
    // 1. Khởi tạo ScrollReveal
    // Cài đặt chung cho các hiệu ứng
    ScrollReveal.init({
        distance: '60px', // Khoảng cách di chuyển của phần tử
        duration: 1000,   // Thời gian hiệu ứng (ms)
        easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)', // Easing function
        interval: 100,    // Khoảng thời gian giữa các phần tử liên tiếp (ms)
        delay: 0,         // Độ trễ ban đầu (ms)
        origin: 'bottom', // Hướng xuất hiện (bottom, top, left, right)
        reset: false      // Không reset khi cuộn ngược lại
    });

    // Áp dụng ScrollReveal cho các phần tử cụ thể
    // Tiêu đề sidebar
    ScrollReveal().reveal('.sidebar-name', { delay: 100, origin: 'left' });
    ScrollReveal().reveal('.sidebar-tagline', { delay: 200, origin: 'left' });
    ScrollReveal().reveal('.sidebar-nav li', { delay: 300, origin: 'left', interval: 50 });
    ScrollReveal().reveal('.sidebar-social a', { delay: 400, origin: 'left', interval: 50 });

    // Các tiêu đề Section
    ScrollReveal().reveal('.section-title', { delay: 100, origin: 'top' });

    // Nội dung phần About
    ScrollReveal().reveal('#about p', { delay: 200, interval: 100 });
    ScrollReveal().reveal('.skills-list li', { delay: 400, interval: 50, origin: 'bottom' });

    // Nội dung phần Experience
    ScrollReveal().reveal('.job-item', { delay: 200, interval: 150 });
    ScrollReveal().reveal('.btn-cv-download', { delay: 400, origin: 'bottom' });

    // Nội dung phần Projects
    ScrollReveal().reveal('.project-item', { delay: 200, interval: 200, origin: 'bottom' });
    ScrollReveal().reveal('.more-projects', { delay: 400, origin: 'bottom' });

    // 2. Highlight Nav Link khi cuộn
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // Kích hoạt khi 50% của section hiển thị
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Xử lý active link ban đầu khi tải trang
    const initialHash = window.location.hash;
    if (initialHash) {
        const targetSection = document.querySelector(initialHash);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === initialHash) {
                    link.classList.add('active');
                }
            });
        }
    } else {
        // Mặc định active section đầu tiên (#about) nếu không có hash
        const firstNavLink = document.querySelector('.nav-link[href="#about"]');
        if (firstNavLink) {
            firstNavLink.classList.add('active');
        }
    }

    // 3. Hiệu ứng Light Blob theo chuột
    const lightBlob = document.querySelector('.light-blob');

    // Cập nhật vị trí của vùng sáng khi chuột di chuyển
    document.addEventListener('mousemove', function(e) {
        lightBlob.style.left = `${e.clientX}px`;
        lightBlob.style.top = `${e.clientY}px`;

        // Đảm bảo vùng sáng hiển thị khi chuột di chuyển trên trang
        if (lightBlob.style.opacity === '0') {
            lightBlob.style.opacity = '1';
        }
    });

    // Ẩn vùng sáng khi chuột rời khỏi cửa sổ trình duyệt
    document.addEventListener('mouseleave', function() {
        lightBlob.style.opacity = '0';
    });

    // Hiện vùng sáng khi chuột trở lại cửa sổ trình duyệt
    document.addEventListener('mouseenter', function() {
        lightBlob.style.opacity = '1';
    });

    const blob = document.getElementById('lightBlob');
    // Chỉ kích hoạt trên desktop
    if (window.innerWidth > 1024) {
        document.addEventListener('mousemove', function(e) {
            blob.style.left = e.clientX + 'px';
            blob.style.top = e.clientY + 'px';
            blob.style.opacity = 1;
        });
        document.addEventListener('mouseleave', function() {
            blob.style.opacity = 0;
        });
        document.addEventListener('mouseenter', function() {
            blob.style.opacity = 1;
        });
    }
});