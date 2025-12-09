window.addEventListener('load', () => {
    const introScreen = document.getElementById('intro-screen');
    const brandName = document.querySelector('.intro-brand');
    const subTitle = document.querySelector('.intro-sub');
    const tagline = document.querySelector('.intro-tagline'); // Naya element select kiya

    if (introScreen && brandName && subTitle && tagline) {
        
        // 1. Brand ("VIAN") aayega - 0.5 sec par
        setTimeout(() => {
            brandName.classList.add('visible');
        }, 500);

        // 2. Subtitle ("Jewellery") aayega - 1.3 sec par
        setTimeout(() => {
            subTitle.classList.add('visible');
        }, 1300);

        // 3. Tagline ("Luxury...") aayegi - 2.0 sec par (NAYA STEP)
        setTimeout(() => {
            tagline.classList.add('visible');
        }, 2000);

        // 4. Screen Fade Out hogi - 4.5 sec par (Time badhaya taaki padhne ka time mile)
        setTimeout(() => {
            introScreen.style.opacity = '0';
            
            // 5. Screen gayab - Fade out ke baad
            setTimeout(() => {
                introScreen.style.display = 'none';
            }, 1500);
            
        }, 4500); 
    }
});
function toggleMenu() {
    const menu = document.getElementById('luxuryMenu');
    menu.classList.toggle('active');

    // Optional: Prevent scrolling on body when menu is open
    if (menu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close menu when pressing ESC key (User Experience enhancement)
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const menu = document.getElementById('luxuryMenu');
        if (menu.classList.contains('active')) {
            toggleMenu();
        }
    }
});

// --- DOM ELEMENTS ---
const authOverlay = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const tabBtns = document.querySelectorAll('.tab-btn');
const activeLine = document.querySelector('.active-line');

// --- OPEN / CLOSE MODAL ---

function openLoginPage() {
    authOverlay.classList.add('active');
    // Default to Login view when opening
    switchTab('login');
}

function closeAuthModal() {
    authOverlay.classList.remove('active');
}

// Close when clicking outside the card
authOverlay.addEventListener('click', (e) => {
    if (e.target === authOverlay) {
        closeAuthModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && authOverlay.classList.contains('active')) {
        closeAuthModal();
    }
});

/* --- ULTRA LUXURY LOGIN LOGIC --- */

// 1. Open Login Modal
window.openLuxuryLogin = function() {
    const modal = document.getElementById('luxuryAuthModal');
    if(modal) {
        modal.classList.add('active');
        // Default to login tab
        window.switchAuthTab('login');
    } else {
        console.error("Error: luxuryAuthModal not found!");
    }
}

// 2. Close Login Modal
window.closeLuxuryLogin = function() {
    const modal = document.getElementById('luxuryAuthModal');
    if(modal) modal.classList.remove('active');
}

// 3. Switch Tabs (Log In <-> Sign Up)
window.switchAuthTab = function(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const goldLine = document.querySelector('.gold-line');

    if (type === 'login') {
        // Tab Styles
        tabBtns[0].classList.add('active');
        tabBtns[1].classList.remove('active');
        goldLine.style.transform = 'translateX(0)';

        // Form Animation
        loginForm.classList.add('active-form');
        loginForm.style.transform = 'translateX(0)';
        
        signupForm.classList.remove('active-form');
        signupForm.style.transform = 'translateX(50px)';
    } else {
        // Tab Styles
        tabBtns[0].classList.remove('active');
        tabBtns[1].classList.add('active');
        goldLine.style.transform = 'translateX(100%)';

        // Form Animation
        signupForm.classList.add('active-form');
        signupForm.style.transform = 'translateX(0)';
        
        loginForm.classList.remove('active-form');
        loginForm.style.transform = 'translateX(-50px)';
    }
}

// 4. Close on Outside Click (User Experience)
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('luxuryAuthModal');
    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) window.closeLuxuryLogin();
        });
    }
});

function startExperience() {
    // 1. Home screen ko fade out karo
    const homeScreen = document.getElementById('home-screen');
    homeScreen.style.opacity = '0';

    // 2. Thodi der baad (0.8s) Collection screen dikhao
    setTimeout(() => {
        homeScreen.style.display = 'none';
        
        const collectionScreen = document.getElementById('collection-screen');
        collectionScreen.classList.remove('hidden');
        
        // Force reflow taki transition work kare
        void collectionScreen.offsetWidth; 
        
        collectionScreen.classList.add('active');

        // 3. Ab Cards ko animate karo (Sorelle Style)
        triggerCardAnimations();
        
    }, 800); // 800ms match karta hai CSS transition se
}

function triggerCardAnimations() {
    // Sab cards select karo
    const cards = document.querySelectorAll('.card');
    
    // Sab par 'slide-up' class add karo
    cards.forEach(card => {
        card.classList.add('slide-up');
    });
}

// Form Opening Logic
function openForm(productName) {
    document.getElementById('selected-product').innerText = productName;
    document.getElementById('form-overlay').classList.remove('hidden');
}

function closeForm() {
    document.getElementById('form-overlay').classList.add('hidden');
}




