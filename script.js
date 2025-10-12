// script.js — Shared Interactivity for GradForge

// Dynamic year in footer
document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  });
  
  // Like / Upvote buttons
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      let count = parseInt(btn.textContent.replace(/\D/g, '')) || 0;
      btn.textContent = `👍 ${count + 1}`;
    });
  });
  
  // Save / Bookmark buttons
  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.textContent = btn.textContent.includes('Saved') ? '🔖 Save' : '✅ Saved';
    });
  });
  
  // Simple stat animation for hero numbers
  const stats = document.querySelectorAll("[data-stat]");
  const animateStats = () => {
    stats.forEach(stat => {
      const target = parseInt(stat.textContent);
      let count = 0;
      const step = Math.ceil(target / 60);
      const interval = setInterval(() => {
        count += step;
        if (count >= target) {
          stat.textContent = target;
          clearInterval(interval);
        } else {
          stat.textContent = count;
        }
      }, 30);
    });
  };
  
  // Trigger animation when hero is in view
  const heroCard = document.querySelector('.hero-card');
  if (heroCard) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(heroCard);
  }

// Mentor data
const mentorsData = [
  {
    id: 1,
    name: "Priya Sharma",
    expertise: ["Resume Review", "HR", "Recruitment"],
    company: "Google",
    rating: 4.9,
    sessions: 150,
    price: 299,
    availability: "Mon-Fri, 6-9 PM",
    image: "https://images.unsplash.com/photo-1494790108755-2616b89104db?w=150&h=150&fit=crop&crop=face",
    instantBook: true,
    badge: "Top Resume Mentor"
  },
  {
    id: 2,
    name: "Raj Patel",
    expertise: ["Data Science", "AI/ML", "Python"],
    company: "Microsoft",
    rating: 4.8,
    sessions: 200,
    price: 499,
    availability: "Sat-Sun, 10 AM-2 PM",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    instantBook: false,
    badge: "AI Expert"
  },
  {
    id: 3,
    name: "Anjali Gupta",
    expertise: ["Frontend", "React", "JavaScript"],
    company: "Amazon",
    rating: 4.7,
    sessions: 120,
    price: 399,
    availability: "Every day, 8-10 PM",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    instantBook: true,
    badge: "Frontend Pro"
  },
  {
    id: 4,
    name: "Vikram Singh",
    expertise: ["Backend", "Node.js", "Databases"],
    company: "Flipkart",
    rating: 4.6,
    sessions: 90,
    price: 349,
    availability: "Mon, Wed, Fri 7-9 PM",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    instantBook: true,
    badge: "Backend Specialist"
  },
  {
    id: 5,
    name: "Sneha Reddy",
    expertise: ["Product Management", "Strategy", "Analytics"],
    company: "Swiggy",
    rating: 4.8,
    sessions: 110,
    price: 599,
    availability: "Tue, Thu 6-8 PM",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    instantBook: false,
    badge: "Product Expert"
  },
  {
    id: 6,
    name: "Arjun Kumar",
    expertise: ["DevOps", "AWS", "Docker"],
    company: "Zomato",
    rating: 4.5,
    sessions: 80,
    price: 449,
    availability: "Weekends, 11 AM-3 PM",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    instantBook: true,
    badge: "DevOps Pro"
  }
];

// Reviews data
const reviewsData = [
  {
    name: "Rahul Sharma",
    review: "Amazing session with Priya! She helped me restructure my resume and I got 3 interview calls within a week.",
    rating: 5,
    mentor: "Priya Sharma"
  },
  {
    name: "Deepika Patel",
    review: "Raj's insights on machine learning career paths were incredibly valuable. Worth every penny!",
    rating: 5,
    mentor: "Raj Patel"
  },
  {
    name: "Karan Agarwal",
    review: "Anjali guided me through React best practices. My code quality improved significantly.",
    rating: 4,
    mentor: "Anjali Gupta"
  },
  {
    name: "Pooja Singh",
    review: "Vikram helped me optimize my backend architecture. Great technical depth and clarity.",
    rating: 5,
    mentor: "Vikram Singh"
  },
  {
    name: "Amit Verma",
    review: "Sneha's product management advice helped me transition from engineering to PM role successfully.",
    rating: 5,
    mentor: "Sneha Reddy"
  },
  {
    name: "Neha Jain",
    review: "Arjun's DevOps expertise helped me land my dream job at a top startup. Highly recommended!",
    rating: 4,
    mentor: "Arjun Kumar"
  }
];

// Initialize consultation page
document.addEventListener("DOMContentLoaded", () => {
  // Initialize consultation page if we're on it
  if (document.getElementById('mentorsGrid')) {
    initConsultationPage();
  }
});

function initConsultationPage() {
  populateMentorMarquee();
  populateMentorsGrid();
  populateReviews();
  initFAQ();
  initSearch();
  
  // Event listeners
  document.getElementById('showAllMentors')?.addEventListener('click', showAllMentors);
  document.getElementById('becomeMentorBtn')?.addEventListener('click', openMentorApplication);
}

function populateMentorMarquee() {
  const marquee = document.getElementById('mentorMarquee');
  if (!marquee) return;
  
  // Duplicate mentors for seamless scroll
  const allMentors = [...mentorsData, ...mentorsData];
  
  marquee.innerHTML = allMentors.map(mentor => `
    <img src="${mentor.image}" alt="${mentor.name}" class="mentor-avatar" title="${mentor.name} - ${mentor.expertise[0]}">
  `).join('');
}

function populateMentorsGrid() {
  const grid = document.getElementById('mentorsGrid');
  if (!grid) return;
  
  // Show first 6 mentors initially
  const featuredMentors = mentorsData.slice(0, 6);
  
  grid.innerHTML = featuredMentors.map(mentor => `
    <div class="mentor-card" data-mentor-id="${mentor.id}">
      <img src="${mentor.image}" alt="${mentor.name}">
      <h3>${mentor.name}</h3>
      <p class="company">${mentor.company}</p>
      <div class="expertise-tags">
        ${mentor.expertise.map(skill => `<span class="tag">${skill}</span>`).join('')}
      </div>
      <div class="rating">
        ${'⭐'.repeat(Math.floor(mentor.rating))} ${mentor.rating}/5 (${mentor.sessions} sessions)
      </div>
      <p class="price">₹${mentor.price}/session</p>
      <p class="availability"><i class="fas fa-clock"></i> ${mentor.availability}</p>
      <div class="mentor-actions" style="margin-top: 1rem;">
        ${mentor.instantBook ? 
          `<button class="btn book-instant" data-mentor-id="${mentor.id}">
            <i class="fas fa-bolt"></i> Instant Book
          </button>` :
          `<button class="btn btn-outline request-book" data-mentor-id="${mentor.id}">
            <i class="fas fa-calendar-check"></i> Request to Book
          </button>`
        }
      </div>
      ${mentor.badge ? `<div class="badge" style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--purple-primary);">🏆 ${mentor.badge}</div>` : ''}
    </div>
  `).join('');
  
  // Add event listeners for booking buttons
  grid.addEventListener('click', handleMentorBooking);
}

function populateReviews() {
  const track = document.getElementById('reviewsTrack');
  if (!track) return;
  
  // Duplicate reviews for seamless scroll
  const allReviews = [...reviewsData, ...reviewsData];
  
  track.innerHTML = allReviews.map(review => `
    <div class="review-card">
      <div class="rating">${'⭐'.repeat(review.rating)}</div>
      <p>"${review.review}"</p>
      <div style="margin-top: 1rem; font-weight: 600; color: var(--purple-primary);">
        - ${review.name}
      </div>
      <div style="font-size: 0.85rem; color: var(--text-gray);">
        Session with ${review.mentor}
      </div>
    </div>
  `).join('');
}

function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('i');
      
      // Close all other FAQ items
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          otherQuestion.nextElementSibling.classList.remove('active');
          otherQuestion.querySelector('i').style.transform = 'rotate(0deg)';
        }
      });
      
      // Toggle current FAQ item
      answer.classList.toggle('active');
      icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
    });
  });
}

function initSearch() {
  const searchInput = document.getElementById('mentorSearch');
  if (!searchInput) return;
  
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterMentors(e.target.value);
    }, 300);
  });
}

function filterMentors(searchTerm) {
  const grid = document.getElementById('mentorsGrid');
  if (!grid) return;
  
  const filteredMentors = mentorsData.filter(mentor => 
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  if (filteredMentors.length === 0) {
    grid.innerHTML = `
      <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
        <i class="fas fa-search" style="font-size: 3rem; color: var(--text-gray); margin-bottom: 1rem;"></i>
        <h3>No mentors found</h3>
        <p>Try adjusting your search terms</p>
      </div>
    `;
    return;
  }
  
  // Re-populate with filtered results
  grid.innerHTML = filteredMentors.map(mentor => `
    <div class="mentor-card" data-mentor-id="${mentor.id}">
      <img src="${mentor.image}" alt="${mentor.name}">
      <h3>${mentor.name}</h3>
      <p class="company">${mentor.company}</p>
      <div class="expertise-tags">
        ${mentor.expertise.map(skill => `<span class="tag">${skill}</span>`).join('')}
      </div>
      <div class="rating">
        ${'⭐'.repeat(Math.floor(mentor.rating))} ${mentor.rating}/5 (${mentor.sessions} sessions)
      </div>
      <p class="price">₹${mentor.price}/session</p>
      <p class="availability"><i class="fas fa-clock"></i> ${mentor.availability}</p>
      <div class="mentor-actions" style="margin-top: 1rem;">
        ${mentor.instantBook ? 
          `<button class="btn book-instant" data-mentor-id="${mentor.id}">
            <i class="fas fa-bolt"></i> Instant Book
          </button>` :
          `<button class="btn btn-outline request-book" data-mentor-id="${mentor.id}">
            <i class="fas fa-calendar-check"></i> Request to Book
          </button>`
        }
      </div>
      ${mentor.badge ? `<div class="badge" style="margin-top: 0.5rem; font-size: 0.8rem; color: var(--purple-primary);">🏆 ${mentor.badge}</div>` : ''}
    </div>
  `).join('');
  
  grid.addEventListener('click', handleMentorBooking);
}

function handleMentorBooking(e) {
  if (e.target.classList.contains('book-instant') || e.target.closest('.book-instant')) {
    const mentorId = e.target.dataset.mentorId || e.target.closest('.book-instant').dataset.mentorId;
    bookInstantSession(mentorId);
  } else if (e.target.classList.contains('request-book') || e.target.closest('.request-book')) {
    const mentorId = e.target.dataset.mentorId || e.target.closest('.request-book').dataset.mentorId;
    requestBookSession(mentorId);
  }
}

function bookInstantSession(mentorId) {
  const mentor = mentorsData.find(m => m.id == mentorId);
  console.log('Booking instant session for mentor:', mentor);
  
  if (mentor) {
    // Store mentor data in sessionStorage for billing page
    const mentorForStorage = {
      id: mentor.id,
      name: mentor.name,
      company: mentor.company,
      expertise: mentor.expertise,
      price: mentor.price
    };
    
    console.log('Storing mentor data:', mentorForStorage);
    sessionStorage.setItem('selectedMentor', JSON.stringify(mentorForStorage));
    
    // Small delay to ensure storage is complete
    setTimeout(() => {
      window.location.href = `billing.html?mentor=${mentorId}&type=instant`;
    }, 100);
  } else {
    console.error('Mentor not found:', mentorId);
    alert('Error: Mentor information not found. Please try again.');
  }
}

function requestBookSession(mentorId) {
  const mentor = mentorsData.find(m => m.id == mentorId);
  console.log('Requesting book session for mentor:', mentor);
  
  if (mentor) {
    // Store mentor data in sessionStorage for billing page
    const mentorForStorage = {
      id: mentor.id,
      name: mentor.name,
      company: mentor.company,
      expertise: mentor.expertise,
      price: mentor.price
    };
    
    console.log('Storing mentor data:', mentorForStorage);
    sessionStorage.setItem('selectedMentor', JSON.stringify(mentorForStorage));
    
    // Small delay to ensure storage is complete
    setTimeout(() => {
      window.location.href = `billing.html?mentor=${mentorId}&type=request`;
    }, 100);
  } else {
    console.error('Mentor not found:', mentorId);
    alert('Error: Mentor information not found. Please try again.');
  }
}

function showAllMentors() {
  // This would typically navigate to a dedicated mentors page
  alert('🔍 Showing all mentors page...\n\nFeatures:\n• Advanced filters\n• Sort by rating, price, availability\n• More mentor profiles\n• Detailed mentor portfolios');
}

function openMentorApplication() {
  const modal = document.getElementById('mentorApplicationModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Add event listeners for modal functionality
document.addEventListener('DOMContentLoaded', function() {
  // Modal functionality
  const modal = document.getElementById('mentorApplicationModal');
  const closeBtn = document.getElementById('closeMentorModal');
  const cancelBtn = document.getElementById('cancelApplication');
  const form = document.getElementById('mentorApplicationForm');
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    form.reset();
  }
  
  closeBtn?.addEventListener('click', closeModal);
  cancelBtn?.addEventListener('click', closeModal);
  
  // Close modal when clicking outside
  modal?.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Handle form submission
  form?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    alert('✅ Application Submitted Successfully!\n\nThank you for applying to be a mentor. We will review your application and get back to you within 2-3 business days.\n\nNext steps:\n• Background verification\n• Interview scheduling\n• Profile setup\n• Onboarding session');
    
    closeModal();
  });
  
  // File upload feedback
  const fileInput = document.getElementById('mentorResume');
  const fileLabel = document.querySelector('.file-upload-label span');
  
  fileInput?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
      fileLabel.textContent = `Selected: ${file.name}`;
    } else {
      fileLabel.textContent = 'Choose Resume File';
    }
  });
});
