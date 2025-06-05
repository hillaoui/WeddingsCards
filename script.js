// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {
    // Navigation smooth scroll
    setupSmoothScroll();

    // Filtres de galerie
    setupGalleryFilters();

    // Formulaire de commande
    setupOrderForm();

    // Menu mobile
    setupMobileMenu();

    // Animation on scroll
    setupScrollAnimations();
});

// Navigation avec défilement fluide
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Système de filtres pour la galerie
function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filtrer les éléments
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Fonction pour sélectionner un modèle depuis la galerie
function selectTemplate(templateName, category) {
    // Remplir le champ du modèle sélectionné
    const templateInput = document.getElementById('selectedTemplate');
    const eventTypeSelect = document.getElementById('eventType');

    if (templateInput) {
        templateInput.value = templateName;
    }
    if (eventTypeSelect) {
        eventTypeSelect.value = category;
    }

    // Faire défiler vers le formulaire de commande
    const orderSection = document.getElementById('commande');
    const headerHeight = document.querySelector('.header').offsetHeight;
    window.scrollTo({
        top: orderSection.offsetTop - headerHeight,
        behavior: 'smooth'
    });

    // S'assurer que le formulaire est visible
    const form = document.querySelector('.form');
    form.style.display = 'block';
    form.style.visibility = 'visible';
    form.style.opacity = '1';

    // Ajouter une animation au formulaire pour attirer l'attention
    form.style.animation = 'pulse 1s ease';
    setTimeout(() => {
        form.style.animation = '';
    }, 1000);

    // Afficher une notification
    showNotification('Modèle sélectionné: ' + templateName, 'success');
}


// Configuration du formulaire de commande
function setupOrderForm() {
    const form = document.getElementById('orderForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validation des champs obligatoires
            if (!validateForm()) {
                return;
            }

            // Collecter les données du formulaire
            const formData = collectFormData();

            // Créer le message WhatsApp
            const whatsappMessage = createWhatsAppMessage(formData);

            // Rediriger vers WhatsApp
            const phoneNumber = '212606572298'; // Numéro de téléphone du business
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            window.open(whatsappUrl, '_blank');

            // Afficher un message de confirmation
            showNotification('Redirection vers WhatsApp...', 'success');
        });
    }
}

// Validation du formulaire
function validateForm() {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'eventType', 'quantity', 'customText'];
    let isValid = true;

    requiredFields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field && !field.value.trim()) {
            field.style.borderColor = '#e74c3c';
            isValid = false;

            // Retirer la couleur d'erreur après 3 secondes
            setTimeout(() => {
                field.style.borderColor = '#ddd';
            }, 3000);
        }
    });

    if (!isValid) {
        showNotification('Veuillez remplir tous les champs obligatoires', 'error');
    }

    return isValid;
}

// Collecter les données du formulaire
function collectFormData() {
    return {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        eventType: document.getElementById('eventType').value,
        selectedTemplate: document.getElementById('selectedTemplate').value,
        quantity: document.getElementById('quantity').value,
        deadline: document.getElementById('deadline').value,
        customText: document.getElementById('customText').value,
        colors: document.getElementById('colors').value,
        format: document.getElementById('format').value,
        comments: document.getElementById('comments').value
    };
}

// Créer le message WhatsApp
function createWhatsAppMessage(data) {
    const message = `NOUVELLE COMMANDE - Cartes Précieuses

CLIENT:
    • Nom: ${data.firstName} ${data.lastName}
    • Email: ${data.email}
    • Téléphone: ${data.phone}

DÉTAILS DE LA COMMANDE:
    • Type d'événement: ${data.eventType}
    • Modèle choisi: ${data.selectedTemplate || 'Non spécifié'}
    • Quantité: ${data.quantity} cartes
    • Date limite: ${data.deadline || 'Non spécifiée'}

PERSONNALISATION:
    • Texte personnalisé: "${data.customText}"
    • Couleurs préférées: ${data.colors || 'Non spécifiées'}
    • Format: ${data.format || 'Non spécifié'}

COMMENTAIRES:
    ${data.comments || 'Aucun commentaire supplémentaire'}

---
Merci de me contacter pour finaliser cette commande !`;

    return message;
}

// Menu mobile
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
            nav.style.flexDirection = 'column';
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = 'white';
            nav.style.padding = '1rem';
            nav.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    }
}

// Animations au défilement
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    }, observerOptions);

    // Observer les cartes et sections
    const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .gallery-card, .form');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Système de notifications
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Créer la nouvelle notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;

    // Ajouter au DOM
    document.body.appendChild(notification);

    // Gestionnaire pour fermer la notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Ajouter les styles CSS pour les animations des notifications
const notificationStyles = `
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

.notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s ease;
}

.notification-close:hover {
    opacity: 1;
}

.notification-message {
    flex: 1;
}
`;

// Ajouter les styles au head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Fonction utilitaire pour déboguer
function debugLog(message, data = null) {
    console.log(`[Cartes Précieuses] ${message}`, data);
}

// Initialisation des données factices pour les tests
function initializeTestData() {
    // Ajouter des gestionnaires d'événements pour tester
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('btn-secondary')) {
            debugLog('Bouton de sélection de modèle cliqué');
        }
    });
}

// Appeler l'initialisation des tests
initializeTestData();