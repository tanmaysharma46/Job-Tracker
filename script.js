let currentView = 'ALL';

function changeStatus(button, newStatus) {
    const card = button.closest('.job-card');
    card.setAttribute('data-status', newStatus);

    const badge = card.querySelector('.status-badge');
    badge.innerText = newStatus;

    if (newStatus === 'INTERVIEW') {
        badge.className = "status-badge px-3 py-1 rounded text-xs font-bold bg-green-50 text-green-600";
    } else {
        badge.className = "status-badge px-3 py-1 rounded text-xs font-bold bg-red-50 text-red-500";
    }

    applyFilter();
    updateCounts();
}

function deleteCard(button) {
    const card = button.closest('.job-card');
    card.remove();
    updateCounts();
    applyFilter();
}

function filterJobs(filterType) {
    currentView = filterType;

    const btns = {
        'ALL': 'btn-all',
        'INTERVIEW': 'btn-interview',
        'REJECTED': 'btn-rejected'
    };

    Object.keys(btns).forEach(key => {
        const el = document.getElementById(btns[key]);
        if (key === filterType) {
            el.className = "px-6 py-2 rounded font-medium bg-blue-600 text-white shadow-md";
        } else {
            el.className = "px-6 py-2 rounded font-medium text-gray-500 hover:bg-gray-100";
        }
    });

    applyFilter();
}

function applyFilter() {
    const cards = document.querySelectorAll('.job-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const status = card.getAttribute('data-status');

        if (currentView === 'ALL') {
            card.classList.remove('hidden-card');
            visibleCount++;
        } else if (status === currentView) {
            card.classList.remove('hidden-card');
            visibleCount++;
        } else {
            card.classList.add('hidden-card');
        }
    });

    document.getElementById('job-status-count').innerText = visibleCount;

    const msg = document.getElementById('empty-message');
    if (visibleCount === 0) {
        msg.classList.remove('hidden');
    } else {
        msg.classList.add('hidden');
    }
}

function updateCounts() {
    const allCards = document.querySelectorAll('.job-card');
    const interviewCards = document.querySelectorAll('.job-card[data-status="INTERVIEW"]');
    const rejectedCards = document.querySelectorAll('.job-card[data-status="REJECTED"]');

    document.getElementById('total-count').innerText = allCards.length;
    document.getElementById('interview-count').innerText = interviewCards.length;
    document.getElementById('rejected-count').innerText = rejectedCards.length;
}

window.onload = updateCounts;