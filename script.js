// Background effects disabled per user request (clean solid background)

// === MOBILE MENU TOGGLE ===
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// === SMOOTH SCROLL ===
document.addEventListener('click', function(e) {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const targetId = a.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
        e.preventDefault();
        const nav = document.querySelector('.navtabbar');
        const navHeight = nav ? nav.offsetHeight : 0;
        const targetPosition = target.offsetTop - navHeight + 10;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        history.replaceState(null, '', targetId);
    }
});

// === ACTIVE NAVIGATION HIGHLIGHT ===
function highlightNav() {
    const scrollPos = window.scrollY + 140;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const subnavLinks = document.querySelectorAll('.subnav-links a');

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active-link');
                }
            });

            if (subnavLinks.length) {
                subnavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}

window.addEventListener('scroll', highlightNav);

// === LIGHTBOX MODAL SYSTEM ===
const modalOverlay = document.getElementById('lightbox-modal');
const modalCloseBtn = document.getElementById('modal-close');
const modalMedia = document.getElementById('modal-media');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalActions = document.getElementById('modal-actions');

function openModal(data) {
    if (!modalOverlay) return;

    modalMedia.innerHTML = '';
    
    if (data.videoId) {
        modalMedia.innerHTML = `<iframe src="https://www.youtube.com/embed/${data.videoId}?autoplay=1&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else if (data.img) {
        modalMedia.innerHTML = `<img src="${data.img}" alt="${data.title}">`;
    }

    modalTitle.textContent = data.title || 'Project Details';
    modalCategory.textContent = data.categoryLabel || 'SHOWCASE';
    modalDescription.textContent = data.description || '';

    if (data.link) {
        modalActions.innerHTML = `<a href="${data.link}" target="_blank" rel="noopener" class="btn-primary">🔗 Open Project Link</a>`;
    } else {
        modalActions.innerHTML = '';
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        if (modalMedia) modalMedia.innerHTML = '';
    }, 350);
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// === 3D SOFT CARD TILT EFFECT ===
function init3DTiltEffect() {
    const cards = document.querySelectorAll('.Projects-item, .profile-card-frame');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// === INTERACTIVE CATEGORY FILTERING ===
function initCategoryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;
            const projectItems = document.querySelectorAll('.Projects-item');
            const assignmentItems = document.querySelectorAll('.assignment-item');
            const sections = document.querySelectorAll('.Projects-section, .assignment-section');

            if (filterValue === 'all') {
                sections.forEach(s => s.style.display = '');
                projectItems.forEach(item => item.style.display = '');
                assignmentItems.forEach(item => item.style.display = '');
            } else {
                sections.forEach(s => {
                    if (s.dataset.category === filterValue) {
                        s.style.display = '';
                    } else {
                        s.style.display = 'none';
                    }
                });

                projectItems.forEach(item => {
                    item.style.display = (item.dataset.category === filterValue) ? '' : 'none';
                });

                assignmentItems.forEach(item => {
                    item.style.display = (item.dataset.category === filterValue) ? '' : 'none';
                });
            }
        });
    });
}

// === SKILL PROGRESS BAR ANIMATION ===
function initSkillBars() {
    const skillSection = document.querySelector('.skills-main-area');
    if (!skillSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.skill-bar-fill').forEach(fill => {
                    const targetWidth = fill.dataset.progress || '80%';
                    fill.style.width = targetWidth;
                });
                observer.unobserve(skillSection);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(skillSection);
}

// === ATTACH MODAL LISTENERS TO CARDS ===
function attachCardModalEvents() {
    document.querySelectorAll('.Projects-item[data-video-id], .Projects-item[data-img]').forEach(card => {
        card.addEventListener('click', () => {
            const dataset = card.dataset;
            openModal({
                videoId: dataset.videoId,
                img: dataset.img,
                title: dataset.title,
                description: dataset.description,
                categoryLabel: dataset.categoryLabel,
                link: dataset.link
            });
        });
    });
}

// === MOUNT PROJECTS FROM projects.html (IF NOT EMBEDDED) ===
(async function mountProjects() {
    const mount = document.getElementById('projects-mount');
    const existingGame = document.getElementById('gameproject');

    if (mount && !existingGame) {
        try {
            const res = await fetch('projects.html', { cache: 'no-store' });
            const html = await res.text();
            const temp = document.createElement('div');
            temp.innerHTML = html;

            const artwork3d = temp.querySelector('#artwork3d');
            const gameproject = temp.querySelector('#gameproject');
            const mediaAssignments = temp.querySelector('#media-assignments');

            if (artwork3d) mount.appendChild(artwork3d);
            if (gameproject) mount.appendChild(gameproject);
            if (mediaAssignments) mount.appendChild(mediaAssignments);
        } catch (err) {
            console.log('Static sections present or local file load:', err);
        }
    }

    initCategoryFilter();
    init3DTiltEffect();
    attachCardModalEvents();

    if (location.hash) {
        const target = document.querySelector(location.hash);
        if (target) {
            const navHeight = document.querySelector('.navtabbar')?.offsetHeight || 0;
            window.scrollTo({ top: target.offsetTop - navHeight + 10, behavior: 'smooth' });
        }
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
    highlightNav();
});
