// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use default light theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);

    // Theme toggle button click handler
    themeToggleBtn.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('mobile-active');
        this.classList.toggle('active');
    });

    // Testimonial Slider Functionality
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonial = 0;

    // Function to show a specific testimonial
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the selected testimonial and activate its dot
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonialCards.length - 1;
        }
        showTestimonial(currentTestimonial);
    });

    // Next button click
    nextBtn.addEventListener('click', function() {
        currentTestimonial++;
        if (currentTestimonial >= testimonialCards.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });

    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Interview Simulator Functionality
    const startBtn = document.querySelector('.start-btn');
    const userInput = document.querySelector('.user-input input');
    const sendBtn = document.querySelector('.send-btn');
    const micBtn = document.querySelector('.mic-btn');
    const chatArea = document.querySelector('.chat-area');
    const messagePlaceholder = document.querySelector('.message-placeholder');
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    const feedbackBtn = document.querySelector('.feedback-btn');
    const saveBtn = document.querySelector('.save-btn');
    
    // Sample interview questions for demonstration
    const interviewQuestions = {
        'software': [
            "Tell me about your experience with HTML, CSS, and JavaScript.",
            "Can you explain how you would optimize a website's performance?",
            "What's your approach to responsive design?",
            "How do you handle cross-browser compatibility issues?",
            "Describe a challenging project you worked on and how you solved the problems."
        ],
        'marketing': [
            "How do you measure the success of a marketing campaign?",
            "Tell me about a marketing campaign you're particularly proud of.",
            "What social media platforms do you think are most effective for B2B marketing?",
            "How do you stay updated with the latest marketing trends?",
            "What metrics do you focus on when analyzing marketing performance?"
        ],
        'design': [
            "Walk me through your design process.",
            "How do you incorporate user feedback into your designs?",
            "How do you balance aesthetics and functionality?",
            "Tell me about a time you had to compromise on a design decision.",
            "How do you stay inspired and current with design trends?"
        ],
        'sales': [
            "Describe your sales approach.",
            "How do you handle rejection?",
            "Tell me about your most successful sale.",
            "How do you prioritize your sales pipeline?",
            "What CRM tools have you worked with?"
        ],
        'data': [
            "What data analysis tools are you familiar with?",
            "How do you approach cleaning and preparing data?",
            "Explain a complex data insight to a non-technical stakeholder.",
            "How do you validate your data analysis results?",
            "Tell me about a time you used data to drive business decisions."
        ]
    };

    let interviewInProgress = false;
    let currentQuestion = 0;
    let selectedJobType = '';
    let progress = 0;
    
    // Start the interview simulation
    startBtn.addEventListener('click', function() {
        if (interviewInProgress) {
            // Reset the interview if already in progress
            resetInterview();
            return;
        }
        
        interviewInProgress = true;
        selectedJobType = document.getElementById('job-type').value;
        messagePlaceholder.style.display = 'none';
        
        // Enable input controls
        userInput.disabled = false;
        sendBtn.disabled = false;
        micBtn.disabled = false;
        
        // Update button text
        startBtn.textContent = 'Reset Interview';
        
        // Ask the first question
        askQuestion(0);
    });
    
    // Ask interview question
    function askQuestion(index) {
        if (index >= interviewQuestions[selectedJobType].length) {
            endInterview();
            return;
        }
        
        // Create and append the AI message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'ai-message');
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
            </div>
            <div class="message-content">
                <p>${interviewQuestions[selectedJobType][index]}</p>
            </div>
        `;
        
        chatArea.appendChild(messageElement);
        chatArea.scrollTop = chatArea.scrollHeight;
        
        currentQuestion = index;
        
        // Update progress
        progress = Math.round((index / interviewQuestions[selectedJobType].length) * 100);
        updateProgress(progress);
    }
    
    // Handle user sending a message
    sendBtn.addEventListener('click', function() {
        sendUserMessage();
    });
    
    // Allow pressing Enter to send a message
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
    
    // Send user message and proceed with interview
    function sendUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Create and append the user message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        
        chatArea.appendChild(messageElement);
        chatArea.scrollTop = chatArea.scrollHeight;
        
        // Clear input
        userInput.value = '';
        
        // Ask the next question after a short delay
        setTimeout(() => {
            askQuestion(currentQuestion + 1);
        }, 1000);
    }
    
    // Simulate voice input with microphone button
    micBtn.addEventListener('click', function() {
        if (!interviewInProgress) return;
        
        // Toggle "active" state to provide visual feedback
        this.classList.toggle('active');
        
        // If active, simulate recording
        if (this.classList.contains('active')) {
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="red"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
            `;
            
            // Simulate a voice recording for 3 seconds
            setTimeout(() => {
                // Reset mic button
                this.classList.remove('active');
                this.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                `;
                
                // Simulate a received voice message
                const fakeResponses = [
                    "I have experience working on responsive web applications using modern frameworks.",
                    "I would approach this by analyzing the requirements and breaking them down into smaller tasks.",
                    "In my previous role, I led a team that successfully delivered a similar project.",
                    "I believe my strengths lie in problem-solving and attention to detail.",
                    "I'm looking for an opportunity where I can grow and contribute to meaningful projects."
                ];
                
                userInput.value = fakeResponses[Math.floor(Math.random() * fakeResponses.length)];
            }, 3000);
        } else {
            // Reset mic button if deactivated
            this.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
            `;
        }
    });
    
    // Update progress bar
    function updateProgress(value) {
        progressBar.style.width = `${value}%`;
        progressText.textContent = `${value}%`;
    }
    
    // End the interview
    function endInterview() {
        // Create final message
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'ai-message');
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
            </div>
            <div class="message-content">
                <p>Thank you for completing the interview simulation! You can now get feedback on your performance or save this interview for future reference.</p>
            </div>
        `;
        
        chatArea.appendChild(messageElement);
        chatArea.scrollTop = chatArea.scrollHeight;
        
        // Update progress to 100%
        updateProgress(100);
        
        // Enable feedback and save buttons
        feedbackBtn.disabled = false;
        saveBtn.disabled = false;
        
        // Disable input
        userInput.disabled = true;
        sendBtn.disabled = true;
        micBtn.disabled = true;
    }
    
    // Reset the interview
    function resetInterview() {
        // Clear chat area except for the first welcome message
        while (chatArea.children.length > 1) {
            chatArea.removeChild(chatArea.lastChild);
        }
        
        // Show placeholder
        messagePlaceholder.style.display = 'block';
        
        // Reset progress
        updateProgress(0);
        
        // Reset variables
        interviewInProgress = false;
        currentQuestion = 0;
        
        // Update button text
        startBtn.textContent = 'Start New Interview';
        
        // Disable buttons
        userInput.disabled = true;
        sendBtn.disabled = true;
        micBtn.disabled = true;
        feedbackBtn.disabled = true;
        saveBtn.disabled = true;
    }
    
    // Get feedback on the interview
    feedbackBtn.addEventListener('click', function() {
        if (!interviewInProgress) return;
        
        // Create feedback message
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'ai-message');
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
            </div>
            <div class="message-content">
                <h4>Interview Feedback:</h4>
                <p><strong>Strengths:</strong> Clear communication, relevant examples, good engagement.</p>
                <p><strong>Areas for improvement:</strong> More specific details in answers, practice concise responses, prepare more technical examples.</p>
                <p><strong>Overall:</strong> Good performance! Continue practicing with more advanced questions.</p>
            </div>
        `;
        
        chatArea.appendChild(messageElement);
        chatArea.scrollTop = chatArea.scrollHeight;
    });
    
    // Save the interview
    saveBtn.addEventListener('click', function() {
        alert('Interview saved successfully! (This is a demo feature)');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});
