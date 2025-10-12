// Autonomous Driving Project Website - Main JavaScript
// Team: Can Soysal, Cagri Sanli, Mustafa Cem Hur, Taha Ugan, Taylan Kayali

// ============================================
// Smooth Scrolling Navigation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initProgressAnimation();
    initMobileMenu();
    updateLastModified();
});

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update active nav item
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

// ============================================
// Progress Bar Animation
// ============================================
function initProgressAnimation() {
    const progressBar = document.querySelector('.progress-fill');

    if (!progressBar) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.dataset.progress || '25';
                entry.target.style.width = targetWidth + '%';
                entry.target.textContent = targetWidth + '%';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(progressBar);
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const navList = document.querySelector('nav ul');

    // Create mobile menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.innerHTML = '☰';
    menuButton.setAttribute('aria-label', 'Toggle navigation menu');

    menuButton.addEventListener('click', () => {
        navList.classList.toggle('show');
        menuButton.innerHTML = navList.classList.contains('show') ? '✕' : '☰';
    });

    nav.insertBefore(menuButton, navList);
}

// ============================================
// Update Last Modified Date
// ============================================
function updateLastModified() {
    const footer = document.querySelector('footer p:first-child');
    const lastModified = new Date(document.lastModified);
    const year = lastModified.getFullYear();

    if (footer && footer.textContent.includes('©')) {
        footer.innerHTML = `&copy; ${year} Autonomous Driving Algorithm Project`;
    }
}

// ============================================
// Dynamic Progress Updates
// ============================================
const projectProgress = {
    phase1: { name: 'Research & Planning', status: 'completed', progress: 100 },
    phase2: { name: 'Simulation Setup', status: 'in-progress', progress: 60 },
    phase3: { name: 'Algorithm Development', status: 'planned', progress: 0 },
    phase4: { name: 'Testing & Optimization', status: 'planned', progress: 0 },
    phase5: { name: 'Documentation', status: 'planned', progress: 0 }
};

function updateProgress(phase, newProgress) {
    if (projectProgress[phase]) {
        projectProgress[phase].progress = newProgress;

        // Calculate overall progress
        const totalPhases = Object.keys(projectProgress).length;
        const overallProgress = Object.values(projectProgress)
            .reduce((sum, phase) => sum + phase.progress, 0) / totalPhases;

        // Update UI
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.dataset.progress = Math.round(overallProgress);
            progressBar.style.width = overallProgress + '%';
            progressBar.textContent = Math.round(overallProgress) + '%';
        }

        console.log(`Progress updated: ${phase} - ${newProgress}%`);
        console.log(`Overall progress: ${Math.round(overallProgress)}%`);
    }
}

// ============================================
// Team Member Data Management
// ============================================
const teamMembers = [
    {
        name: 'Can Soysal',
        role: 'Computer Engineering',
        github: '',
        email: '',
        responsibilities: []
    },
    {
        name: 'Cagri Sanli',
        role: 'Computer Engineering',
        github: '',
        email: '',
        responsibilities: []
    },
    {
        name: 'Mustafa Cem Hur',
        role: 'Computer Engineering',
        github: '',
        email: '',
        responsibilities: []
    },
    {
        name: 'Taha Ugan',
        role: 'Computer Engineering',
        github: '',
        email: '',
        responsibilities: []
    },
    {
        name: 'Taylan Kayali',
        role: 'Computer Engineering',
        github: '',
        email: '',
        responsibilities: []
    }
];

function renderTeamMembers() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;

    teamGrid.innerHTML = teamMembers.map(member => `
        <div class="team-member">
            <h3>${member.name}</h3>
            <p style="color: var(--light-text); margin-top: 0.5rem;">${member.role}</p>
            ${member.github ? `<a href="${member.github}" target="_blank">GitHub</a>` : ''}
            ${member.responsibilities.length > 0 ? `
                <ul style="margin-top: 0.5rem; font-size: 0.9rem;">
                    ${member.responsibilities.map(r => `<li>${r}</li>`).join('')}
                </ul>
            ` : ''}
        </div>
    `).join('');
}

// ============================================
// Gallery & Media Management
// ============================================
function addImage(imagePath, altText) {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return;

    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `<img src="${imagePath}" alt="${altText}" loading="lazy">`;

    gallery.appendChild(galleryItem);
}

function addVideo(videoUrl, title) {
    const demoSection = document.querySelector('#demo');
    if (!demoSection) return;

    // Make section visible
    demoSection.style.display = 'block';

    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container';
    videoContainer.innerHTML = `
        <iframe src="${videoUrl}" 
                title="${title}"
                allowfullscreen>
        </iframe>
    `;

    demoSection.querySelector('h2').insertAdjacentElement('afterend', videoContainer);
}

// ============================================
// Milestone Management
// ============================================
function addMilestone(phase, title, description, status, date) {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const statusIcon = {
        'completed': '✅',
        'in-progress': '🔄',
        'planned': '📅'
    };

    const timelineItem = document.createElement('div');
    timelineItem.className = 'timeline-item';
    timelineItem.innerHTML = `
        <h4>${title} ${statusIcon[status] || '📅'}</h4>
        <p>${description}</p>
        <p style="color: var(--light-text); font-size: 0.9rem;">${date}</p>
    `;

    timeline.appendChild(timelineItem);
}

// ============================================
// Notification System
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// Utility Functions
// ============================================
function exportProjectData() {
    const projectData = {
        progress: projectProgress,
        team: teamMembers,
        lastUpdated: new Date().toISOString()
    };

    const dataStr = JSON.stringify(projectData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'project-data.json';
    link.click();

    URL.revokeObjectURL(url);
    showNotification('Project data exported successfully!', 'success');
}

// ============================================
// Event Listeners for External Updates
// ============================================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
    } else {
        nav.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// ============================================
// Console Welcome Message
// ============================================
console.log('%c🚗 Autonomous Driving Algorithm Project', 'color: #3498db; font-size: 20px; font-weight: bold;');
console.log('%cTeam: Can Soysal, Cagri Sanli, Mustafa Cem Hur, Taha Ugan, Taylan Kayali', 'color: #2c3e50; font-size: 12px;');
console.log('%cFall 2025 - Computer Engineering Final Project', 'color: #7f8c8d; font-size: 10px;');

// ============================================
// Export functions for external use
// ============================================
window.ProjectUtils = {
    updateProgress,
    addImage,
    addVideo,
    addMilestone,
    showNotification,
    exportProjectData,
    teamMembers,
    projectProgress
};
