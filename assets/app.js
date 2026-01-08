/**
 * Team Topologies 診断アプリ
 * SRE向け 10問 Yes/No 診断
 */

class DiagnosisApp {
    constructor() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = { A: 0, B: 0, C: 0 };
        this.init();
    }

    init() {
        this.bindElements();
        this.bindEvents();
        this.updateTotalQuestions();
        this.restoreFromLocalStorage();
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
            yesBtn: document.getElementById('yes-btn'),
            noBtn: document.getElementById('no-btn'),
            currentQ: document.getElementById('current-q'),
            totalQ: document.getElementById('total-q'),
            progress: document.getElementById('progress'),
            resultContent: document.getElementById('result-content')
        };
    }

    bindEvents() {
        this.elements.startBtn.addEventListener('click', () => this.startDiagnosis());
        this.elements.restartBtn.addEventListener('click', () => this.restart());
        this.elements.yesBtn.addEventListener('click', () => this.selectAnswer(true));
        this.elements.noBtn.addEventListener('click', () => this.selectAnswer(false));

        // キーボード操作
        document.addEventListener('keydown', (e) => {
            if (!this.screens.question.classList.contains('active')) return;
            
            if (e.key === 'y' || e.key === 'Y' || e.key === '1') {
                this.selectAnswer(true);
            } else if (e.key === 'n' || e.key === 'N' || e.key === '2') {
                this.selectAnswer(false);
            }
        });
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
        this.scores = { A: 0, B: 0, C: 0 };
        this.showScreen('question');
        this.showQuestion();
    }

    showQuestion() {
        const question = questions[this.currentQuestion];
        this.elements.currentQ.textContent = this.currentQuestion + 1;
        this.elements.questionText.textContent = question.text;

        // プログレスバー更新
        const progressPercent = (this.currentQuestion / questions.length) * 100;
        this.elements.progress.style.width = `${progressPercent}%`;

        // ボタンの選択状態をリセット
        this.elements.yesBtn.classList.remove('selected');
        this.elements.noBtn.classList.remove('selected');
        this.elements.yesBtn.disabled = false;
        this.elements.noBtn.disabled = false;
    }

    selectAnswer(isYes) {
        const question = questions[this.currentQuestion];
        const selectedBtn = isYes ? this.elements.yesBtn : this.elements.noBtn;
        
        // 視覚的フィードバック
        selectedBtn.classList.add('selected');
        this.elements.yesBtn.disabled = true;
        this.elements.noBtn.disabled = true;

        // スコア計算
        const scoreToAdd = isYes ? question.yesScore : question.noScore;
        this.scores.A += scoreToAdd.A;
        this.scores.B += scoreToAdd.B;
        this.scores.C += scoreToAdd.C;

        // 回答を記録
        this.answers.push({
            questionId: question.id,
            answer: isYes
        });

        // 次の質問へ、または結果表示
        setTimeout(() => {
            if (this.currentQuestion < questions.length - 1) {
                this.currentQuestion++;
                this.showQuestion();
            } else {
                this.showResult();
            }
        }, 300);
    }

    /**
     * 判定ロジック（仕様書7.3に準拠）
     * C_flag >= 2 → Type C
     * それ以外で B_score >= A_score かつ B_score >= 4 → Type B
     * それ以外 → Type A
     */
    determineType() {
        const { A, B, C } = this.scores;

        // C_flag >= 2 → Type C
        if (C >= 2) {
            return 'C';
        }

        // B_score >= A_score かつ B_score >= 4 → Type B
        if (B >= A && B >= 4) {
            return 'B';
        }

        // それ以外 → Type A
        return 'A';
    }

    showResult() {
        const resultType = this.determineType();
        const typeInfo = resultTypes[resultType];

        // プログレスバーを100%に
        this.elements.progress.style.width = '100%';

        // 結果を保存
        this.saveToLocalStorage(resultType);

        // 結果画面を描画
        this.elements.resultContent.innerHTML = `
            <div class="result-card" style="--type-color: ${typeInfo.color}">
                <div class="result-emoji">${typeInfo.emoji}</div>
                <div class="result-type-label">あなたのチームは...</div>
                <h2 class="result-type-title">${typeInfo.title}</h2>
                <p class="result-type-subtitle">${typeInfo.subtitle}</p>
                
                <ul class="result-features">
                    ${typeInfo.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                
                <div class="result-dress-code">
                    <span class="dress-code-icon">💡</span>
                    <p>${typeInfo.dressCode}</p>
                </div>
                
                <div class="screenshot-hint">
                    <span>📸</span> スクショしてSNSでシェア！
                </div>
            </div>
        `;

        this.showScreen('result');
    }

    saveToLocalStorage(resultType) {
        try {
            const data = {
                resultType,
                scores: this.scores,
                answers: this.answers,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('tt-diagnosis-result', JSON.stringify(data));
        } catch (e) {
            // localStorage unavailable
        }
    }

    restoreFromLocalStorage() {
        // 今回はリロード時の復元は任意なのでスキップ
        // 実装する場合はここで復元処理を行う
    }

    restart() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = { A: 0, B: 0, C: 0 };
        this.elements.progress.style.width = '0%';
        this.showScreen('start');
    }
}

// DOMContentLoaded時にアプリを初期化
document.addEventListener('DOMContentLoaded', () => {
    new DiagnosisApp();
});
