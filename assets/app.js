/**
 * Team Topologies Diagnosis App
 */

class DiagnosisApp {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.init();
    }

    init() {
        this.bindElements();
        this.bindEvents();
        this.updateTotalQuestions();
    }

    bindElements() {
        this.screens = {
            start: document.getElementById('start-screen'),
            question: document.getElementById('question-screen'),
            result: document.getElementById('result-screen')
        };

        this.elements = {
            startBtn: document.getElementById('start-btn'),
            restartBtn: document.getElementById('restart-btn'),
            questionText: document.getElementById('question-text'),
            options: document.getElementById('options'),
            currentQ: document.getElementById('current-q'),
            totalQ: document.getElementById('total-q'),
            progress: document.getElementById('progress'),
            resultContent: document.getElementById('result-content')
        };
    }

    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.startDiagnosis());
        this.elements.restartBtn.addEventListener('click', () => this.restart());
    }

    updateTotalQuestions() {
        this.elements.totalQ.textContent = questions.length;
    }

    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
        this.screens[screenName].classList.add('active');
    }

    startDiagnosis() {
        this.currentQuestion = 0;
        this.answers = [];
        this.showScreen('question');
        this.showQuestion();
    }

    showQuestion() {
        const question = questions[this.currentQuestion];
        this.elements.currentQ.textContent = this.currentQuestion + 1;
        this.elements.questionText.textContent = question.text;

        // Update progress
        const progressPercent = (this.currentQuestion / questions.length) * 100;
        this.elements.progress.style.width = `${progressPercent}%`;

        // Clear and populate options
        this.elements.options.innerHTML = '';
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = option.text;
            btn.addEventListener('click', () => this.selectOption(index));
            this.elements.options.appendChild(btn);
        });
    }

    selectOption(index) {
        const question = questions[this.currentQuestion];
        this.answers.push({
            questionId: question.id,
            optionIndex: index,
            scores: question.options[index].scores
        });

        // Visual feedback
        const buttons = this.elements.options.querySelectorAll('.option-btn');
        buttons[index].classList.add('selected');

        // Next question or result
        setTimeout(() => {
            if (this.currentQuestion < questions.length - 1) {
                this.currentQuestion++;
                this.showQuestion();
            } else {
                this.showResult();
            }
        }, 300);
    }

    calculateResult() {
        const scores = {
            streamAligned: 0,
            enabling: 0,
            complicated: 0,
            platform: 0
        };

        this.answers.forEach(answer => {
            if (answer.scores) {
                Object.keys(answer.scores).forEach(key => {
                    if (scores.hasOwnProperty(key)) {
                        scores[key] += answer.scores[key];
                    }
                });
            }
        });

        return scores;
    }

    showResult() {
        const scores = this.calculateResult();
        const maxScore = Math.max(...Object.values(scores));
        const resultType = Object.keys(scores).find(key => scores[key] === maxScore);

        const typeInfo = teamTypes[resultType] || {
            name: '未定義',
            description: '診断結果が見つかりませんでした。'
        };

        this.elements.resultContent.innerHTML = `
            <div class="result-type">
                <h3 style="color: var(--color-primary); font-size: 1.5rem; margin-bottom: 1rem;">
                    ${typeInfo.name}
                </h3>
                <p style="margin-bottom: 1.5rem;">${typeInfo.description}</p>
                <div class="score-breakdown" style="margin-top: 2rem;">
                    <h4 style="margin-bottom: 1rem; color: var(--color-text-muted);">スコア内訳</h4>
                    ${this.renderScoreBar('Stream-Aligned', scores.streamAligned, maxScore)}
                    ${this.renderScoreBar('Enabling', scores.enabling, maxScore)}
                    ${this.renderScoreBar('Complicated Subsystem', scores.complicated, maxScore)}
                    ${this.renderScoreBar('Platform', scores.platform, maxScore)}
                </div>
            </div>
        `;

        this.elements.progress.style.width = '100%';
        this.showScreen('result');
    }

    renderScoreBar(label, score, maxScore) {
        const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
        return `
            <div style="margin-bottom: 0.75rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                    <span style="font-size: 0.9rem;">${label}</span>
                    <span style="font-size: 0.9rem; color: var(--color-text-muted);">${score}点</span>
                </div>
                <div style="background: var(--color-surface-alt); height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, var(--color-primary), #ff6b6b); transition: width 0.5s ease;"></div>
                </div>
            </div>
        `;
    }

    restart() {
        this.currentQuestion = 0;
        this.answers = [];
        this.showScreen('start');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DiagnosisApp();
});
