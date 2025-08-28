// GMU Purity Test Questions (ordered from least to most freaky)
const questions = [
    // Basic GMU Experience (Very Innocent)
    "Are a CS major?",
    "Live on campus?",
    "Commute to GMU?",
    "Have a LinkedIn account?",
    "Have used r/GMU?",
    "Complained about how bad PatriotWeb is?",
    "Had your 'records under review by an administrator' on Patriot Web?",
    "Have parents who work in IT/government?",
    
    // Academic Basics
    "Had a class in Lecture Hall?",
    "Taken a class that starts at 9 am or earlier?",
    "Taken a class that ends at 10 pm?",
    "Applied to jobs on Handshake?",
    "Went to a career fair for the free merch?",
    "Have held a part-time on-campus job?",
    "Attended a gaming-related event?",
    "Watch One Piece?",
    
    // Campus Life
    "Worked out at the RAC?",
    "Gotten JC Chipotle more than twice in a week?",
    "Been to all the dining halls?",
    "Had food at DCG, Bitez, Flavor Hive, or Blazin?",
    "Been to TeaDo?",
    "Been to Shotted or Haraz?",
    "Used The MiX?",
    "Touched the George Mason statue?",
    "Attended Mason Day?",
    "Attended an event from a cultural club?",
    
    // Student Struggles
    "Studied abroad at Mason Korea?",
    "Transferred from NOVA?",
    "Had your parents make you go here?",
    "Had GMU as your safety school?",
    "Are majoring in IT because CS is too difficult?",
    "Have not received ANY internship offers?",
    "Changed your major?",
    "Complained about the advisors?",
    
    // Commuter Life
    "Take Ox Road on your commute?",
    "Been late to class more than once because of traffic?",
    "Spent more than 5 minutes looking for parking?",
    "Got a parking ticket?",
    "Seen someone's car cooked in one of the parking lots?",
    "Don't have a car?",
    "Used a Bird scooter?",
    "Rode the Mason shuttle or the CUE bus?",
    
    // Campus Events & Social
    "Went to an event just for the free food?",
    "Went to an event held at one of the JC meeting rooms?",
    "Got flyered by the JC kiosks?",
    "Took a flyer from a club and NEVER attended it?",
    "Attended a VSA event?",
    "Had Domino's cheese-flavored pizza from multiple club events?",
    "Attended a basketball game?",
    "Spectated a protest/protestor in Wilkins Plaza?",
    "Been approached by someone trying to convert you to a different spiritual/religious belief?",
    "Seen a furry on campus?",
    "Observed people doing dances in the JC basement or Horizon Hall at night?",
    "Doom-scrolled or submitted to the GMU Crushes Instagram?",

    // Minor Rule Breaking
    "Skipped the majority of lectures for a class?",
    "Used less than half of your meal swipes in a semester?",
    "Stolen stuff from the dining hall?",
    "Pulled an all-nighter to finish a project or study for an exam?",
    "Hate the new logo?",
    "Complained to an RA about a roommate or neighbor?",
    "Got food poisoning from Ike's?",
    "Went to a student government meeting?",
    
    // Academic Dishonesty (Mild)
    "Used your phone while Lockdown Browser was on?",
    "ChatGPT-ed a whole class?",
    "Dropped a class?",
    "Failed a class?",
    
    // Partying & Social Life
    "Lived in President's Park?",
    "Are part of a frat/sorority?",
    "Attended an on-campus party?",
    "Attended an off-campus party?",
    "Attended a JMU party?",
    "Traveled to other universities to party?",
    "Been to a party at The Main or The Flats?",
    "Went to PJ Skidooz or Fatz?",
    
    // Romance & Flirting
    "Crushed on your TA/professor?",
    "Acquired SUB1 condoms?",
    "Made out in a classroom?",
    "Did more than make out in a classroom?",
    "Were caught doing something in a classroom?",
    
    // Getting Wild
    "Went out in Arlington?",
    "Been part of a protest?",
    "Drank on campus?",
    "Went to a GMU frat party?",
    "Blacked out?",
    "Greened out?",
    "Swam in the Mason Pond?",
    "Climbed on one of the roofs on campus?",
    
    // Academic Violations
    "Used ChatGPT LIVE during an exam?",
    "Caught cheating in class?",
    "Broke the Honor Code?",
    
    // Very Freaky Territory
    "Hooked up in a Fenwick 2-person study room?",
    "Got kicked out of Horizon Hall by police officers?",
    "Kicked a roommate out in order to do something freaky?",
    "Had someone else's toes/foot in your mouth?",
    "Took a shit in third floor Fenwick?",
    "Had an encounter with the Mason PD?",
    "Seen the armored Mason PD vehicle in action?"
];

// DOM elements
const elements = {
    calculateBtn: document.getElementById('calculate-score'),
    retakeBtn: document.getElementById('retake-test'),
    shareBtn: document.getElementById('share-score'),
    questionsContainer: document.querySelector('.questions-list'),
    scoreNumber: document.getElementById('score-number'),
    scoreMessage: document.getElementById('score-message'),
    quizMain: document.getElementById('quiz-main'),
    resultsScreen: document.getElementById('results-screen')
};

// Event listeners
document.addEventListener('DOMContentLoaded', init);
elements.calculateBtn.addEventListener('click', calculateScore);
elements.retakeBtn.addEventListener('click', resetQuiz);
elements.shareBtn.addEventListener('click', shareScore);

// Initialize the app
function init() {
    renderQuestions();
}

// Render questions
function renderQuestions() {
    const container = elements.questionsContainer;
    container.innerHTML = '';
    
    questions.forEach((question, index) => {
        const li = document.createElement('li');
        li.className = 'question-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `q${index}`;
        
        const label = document.createElement('label');
        label.htmlFor = `q${index}`;
        label.textContent = question;
        
        li.appendChild(checkbox);
        li.appendChild(label);
        container.appendChild(li);
    });
}

// Calculate and display score
function calculateScore() {
    const checkboxes = document.querySelectorAll('.questions-list input[type="checkbox"]');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const totalQuestions = questions.length;
    const purityScore = Math.round(((totalQuestions - checkedCount) / totalQuestions) * 100);
    
    // Track the result (you can send this to analytics later)
    trackResult(purityScore, checkedCount, totalQuestions);
    
    // Show results screen
    elements.scoreNumber.textContent = purityScore + '%';
    elements.scoreMessage.textContent = getScoreMessage(purityScore);
    elements.resultsScreen.classList.remove('hidden');
}

// Track results to Google Sheets
function trackResult(score, checkedCount, totalQuestions) {
    const checkboxes = document.querySelectorAll('.questions-list input[type="checkbox"]');
    
    // Get which specific questions were checked
    const checkedQuestions = [];
    const checkedQuestionNumbers = [];
    
    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            checkedQuestions.push(questions[index]);
            checkedQuestionNumbers.push(index + 1); // Question numbers (1-99)
        }
    });
    
    const result = {
        timestamp: new Date().toISOString(),
        score,
        checkedCount,
        checkedQuestionNumbers: checkedQuestionNumbers.join(','), // "1,5,12,23" format
        checkedQuestions: checkedQuestions.join(' | '), // Full text separated by |
        userAgent: navigator.userAgent // Device/browser info
    };
    
    const SHEET_URL = CONFIG.SHEET_URL;
    
    // Silently track results
    
    // Alternative method using form submission (bypasses CORS)
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = SHEET_URL;
    form.target = 'hidden_iframe';
    form.style.display = 'none';
    
    // Create hidden iframe to catch the response
    let iframe = document.getElementById('hidden_iframe');
    if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden_iframe';
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    
    // Add each field as a hidden input
    Object.keys(result).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = result[key];
        form.appendChild(input);
    });
    
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    // Data sent successfully
}

// Reset quiz
function resetQuiz() {
    const checkboxes = document.querySelectorAll('.questions-list input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    elements.scoreNumber.textContent = '--';
    elements.scoreMessage.textContent = '';
    elements.resultsScreen.classList.add('hidden');
}

// Get score message based on purity score
function getScoreMessage(score) {
    if (score >= 95) {
        return "You probably still think Mason is just a commuter school.";
    } else if (score >= 90) {
        return "You definitely believe the parking situation will get better.";
    } else if (score >= 85) {
        return "You still think you'll find parking in Lot A before 10 AM.";
    } else if (score >= 80) {
        return "You still think you'll find parking in Rap Deck before 10 AM.";
    } else if (score >= 75) {
        return "You think the JC food court has variety.";
    } else if (score >= 70) {
        return "You believe Mason will beat VCU in basketball this year.";
    } else if (score >= 65) {
        return "You think the shuttle will actually be on time.";
    } else if (score >= 60) {
        return "You still have hope for the campus Wi-Fi.";
    } else if (score >= 55) {
        return "You think Fenwick Library is quiet during finals week.";
    } else if (score >= 50) {
        return "You believe construction on campus will actually finish.";
    } else if (score >= 45) {
        return "You think you can graduate in exactly 4 years.";
    } else if (score >= 40) {
        return "You've accepted that Mason owns your soul now.";
    } else if (score >= 35) {
        return "You know which bathroom stalls have the good Wi-Fi.";
    } else if (score >= 30) {
        return "You've mastered the art of Mason student survival.";
    } else if (score >= 25) {
        return "You probably know more about Mason than the tour guides.";
    } else if (score >= 20) {
        return "You're basically a walking Mason encyclopedia at this point.";
    } else if (score >= 15) {
        return "You've transcended normal student life into Mason legend status.";
    } else if (score >= 10) {
        return "You ARE the Mason experience.";
    } else if (score >= 5) {
        return "George Mason himself would be impressed by your dedication.";
    } else {
        return "You've achieved maximum Mason enlightenment. Teach us your ways.";
    }
}

// Share score
function shareScore() {
    const score = elements.scoreNumber.textContent;
    const shareText = `I got a ${score} on GMU PT. Take the test: gmupuritytest.com`;
    
    if (navigator.share) {
        navigator.share({
            title: 'GMU Purity Test Results',
            text: shareText
        });
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Score copied to clipboard!');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Score copied to clipboard!');
    }
}
