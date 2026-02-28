// ── DATA ──────────────────────────────────────────────────────────
const SKILLS = [
    { icon: '🐍', name: 'Python' }, { icon: '☕', name: 'Java' }, { icon: '🗄️', name: 'SQL' },
    { icon: '📊', name: 'Power BI' }, { icon: '🐼', name: 'Pandas' }, { icon: '📈', name: 'Matplotlib' },
    { icon: '🌊', name: 'Seaborn' }, { icon: '🤖', name: 'Machine Learning' }, { icon: '📉', name: 'Regression' },
    { icon: '🔬', name: 'Classification' }, { icon: '📋', name: 'Data Analytics' }, { icon: '🧮', name: 'Statistics' }
];
const SOFT = ['Communication', 'Teamwork', 'Problem Solving', 'Adaptability'];
const PROJECTS = [
    { num: '01', title: 'Currency Converter', desc: 'Real-time currency conversion app fetching live exchange rates via REST API with a clean CLI interface.', tech: ['Python', 'REST API', 'Requests'], github: '#' },
    { num: '02', title: 'IPL Auction Analysis', desc: 'Comprehensive data analysis and visualization of IPL auction data revealing bidding patterns and team strategies.', tech: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'], github: '#' },
    { num: '03', title: 'Waste Management Monitor', desc: 'Dashboard for monitoring waste collection routes, costs, and efficiency metrics across municipal zones.', tech: ['Power BI', 'Excel', 'SQL'], github: '#' },
    { num: '04', title: 'Monthly Budget Tracker', desc: 'Excel-based income and expense tracker with automated charts, category summaries and monthly reports.', tech: ['Excel', 'VBA', 'Charts'], github: '#' },
    { num: '05', title: 'Employee Database Analysis', desc: 'Relational SQL analysis of employee records: department performance, salary trends, and attrition insights.', tech: ['SQL', 'MySQL', 'Data Analysis'], github: '#' }
];
const CERTS = [
    { icon: 'fa-brands fa-python', name: 'Python Programming' }, { icon: 'fa-solid fa-chart-line', name: 'Data Analytics' },
    { icon: 'fa-solid fa-brain', name: 'Data Science' }, { icon: 'fa-solid fa-database', name: 'SQL' },
    { icon: 'fa-solid fa-robot', name: 'Machine Learning' }, { icon: 'fa-solid fa-certificate', name: 'NPTEL Certifications' }
];
const LANGS = ['English', 'Tamil', 'Telugu'];

// ── RENDER ────────────────────────────────────────────────────────
function $(id) { return document.getElementById(id) }

function renderSkills() {
    $('skills-grid').innerHTML = SKILLS.map((s, i) =>
        `<div class="skill-card glass" style="--d:${3 + i % 3}s;--delay:${i * 0.1}s">
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
    </div>`).join('');
    $('soft-skills').innerHTML = SOFT.map((s, i) =>
        `<div class="soft-chip" style="animation-delay:${i * 0.2}s">${s}</div>`).join('');
}

function renderProjects() {
    $('projects-grid').innerHTML = PROJECTS.map((p, i) =>
        `<div class="project-card glass reveal" style="--d:${3.5 + i * 0.3}s;--delay:${i * 0.15}s">
      <div class="project-num">Project ${p.num}</div>
      <div class="project-title">${p.title}</div>
      <div class="project-desc">${p.desc}</div>
      <div class="tech-stack">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
      <a href="${p.github}" target="_blank" class="btn-sm"><i class="fab fa-github"></i> View on GitHub</a>
    </div>`).join('');
}

function renderCerts() {
    $('certs-grid').innerHTML = CERTS.map((c, i) =>
        `<div class="cert-badge" style="--d:${3 + i * 0.4}s;--delay:${i * 0.12}s">
      <i class="${c.icon}"></i>${c.name}
    </div>`).join('');
}

function renderLangs() {
    $('lang-chips').innerHTML = LANGS.map((l, i) =>
        `<div class="lang-chip" style="animation-delay:${i * 0.3}s">
      <i class="fas fa-globe" style="margin-right:8px;font-size:.85rem"></i>${l}
    </div>`).join('');
}

renderSkills(); renderProjects(); renderCerts(); renderLangs();

// ── STARFIELD ─────────────────────────────────────────────────────
const canvas = $('stars-canvas'); const ctx = canvas.getContext('2d');
let W, H, stars = [];
function initStars() {
    W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight;
    stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.8 + .2,
        o: Math.random(), speed: Math.random() * .4 + .1, dir: Math.random() * Math.PI * 2,
        twinkle: Math.random() * 2 + 1
    }));
}
function drawStars(t) {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(s => {
        s.o = .3 + .7 * (.5 + .5 * Math.sin(t * .001 * s.twinkle));
        s.x += Math.cos(s.dir) * s.speed * .3; s.y += Math.sin(s.dir) * s.speed * .3;
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0; if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${Math.random() > 0.8 ? '168,85,247' : '0,212,255'},${s.o})`;
        ctx.fill();
    });
    // Shooting star occasionally
    if (Math.random() < .003) {
        const sx = Math.random() * W, sy = Math.random() * (H / 2);
        const len = 80 + Math.random() * 100; const angle = Math.PI / 4;
        const grad = ctx.createLinearGradient(sx, sy, sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
        grad.addColorStop(0, 'rgba(0,212,255,0)'); grad.addColorStop(.5, 'rgba(0,212,255,0.9)'); grad.addColorStop(1, 'rgba(0,212,255,0)');
        ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
        ctx.strokeStyle = grad; ctx.lineWidth = 1.5; ctx.stroke();
    }
    requestAnimationFrame(drawStars);
}
initStars(); requestAnimationFrame(drawStars);
window.addEventListener('resize', initStars);

// ── CURSOR ────────────────────────────────────────────────────────
const glow = $('cursor-glow'), dot = $('cursor-dot');
let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
(function animCursor() { cx += (mx - cx) * .1; cy += (my - cy) * .1; glow.style.left = cx + 'px'; glow.style.top = cy + 'px'; requestAnimationFrame(animCursor); })();

// ── TYPEWRITER ────────────────────────────────────────────────────
const titles = ['Data Analyst', 'Python Developer', 'Machine Learning Enthusiast', 'SQL Engineer', 'Power BI Developer'];
let ti = 0, ci = 0, del = false;
const tw = $('typewriter');
tw.innerHTML = '<span id="tw-text"></span><span style="color:var(--neon);animation:blink 1s infinite">|</span>';
const twEl = document.getElementById('tw-text');
function typewrite() {
    const current = titles[ti];
    if (!del) {
        twEl.textContent = current.slice(0, ++ci);
        if (ci === current.length) { del = true; setTimeout(typewrite, 2000); return; }
    } else {
        twEl.textContent = current.slice(0, --ci);
        if (ci === 0) { del = false; ti = (ti + 1) % titles.length; }
    }
    setTimeout(typewrite, del ? 60 : 90);
}
typewrite();

// ── TILT EFFECT ───────────────────────────────────────────────────
const tiltCard = $('tiltCard');
tiltCard && tiltCard.addEventListener('mousemove', e => {
    const r = tiltCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = -(e.clientY - r.top) / r.height + .5;
    tiltCard.style.transform = `perspective(1000px) rotateX(${y * 10}deg) rotateY(${x * 10}deg) translateZ(10px)`;
});
tiltCard && tiltCard.addEventListener('mouseleave', () => { tiltCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)'; });

// ── PROJECT CARD TILT ─────────────────────────────────────────────
document.addEventListener('mousemove', e => {
    document.querySelectorAll('.project-card').forEach(card => {
        const r = card.getBoundingClientRect();
        if (e.clientX > r.left - 50 && e.clientX < r.right + 50 && e.clientY > r.top - 50 && e.clientY < r.bottom + 50) {
            const x = (e.clientX - r.left - r.width / 2) / (r.width / 2);
            const y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
            card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-8px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// ── SCROLL REVEAL ─────────────────────────────────────────────────
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ── TIMELINE REVEAL ───────────────────────────────────────────────
const obs2 = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.animation = 'slideIn .7s ease forwards'; e.target.style.opacity = '1'; } });
}, { threshold: .2 });
document.querySelectorAll('.timeline-item').forEach(el => obs2.observe(el));

// ── NAVBAR ────────────────────────────────────────────────────────
const navbar = $('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    const secs = ['hero', 'about', 'skills', 'projects', 'education', 'certifications', 'contact'];
    let current = 'hero';
    secs.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
    });
    navbar.querySelectorAll('a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

// ── FORM ──────────────────────────────────────────────────────────
$('contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('[type=submit]');
    btn.innerHTML = '<i class="fas fa-check"></i>&nbsp; Sent!';
    btn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Message'; btn.style.background = ''; e.target.reset(); }, 3000);
});
