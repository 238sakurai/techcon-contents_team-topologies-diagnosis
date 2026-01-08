/**
 * Team Topologies 診断 App
 * SRE向け・Dress Code文脈
 * 10問 Yes/No 形式
 */

/**
 * X（Twitter）投稿テキスト生成
 * @param {string} resultType - A, B, C
 * @returns {string}
 */
function buildTweetText(resultType) {
    const tag = "#srekaigi_dresscode";
    const templates = {
        A: `チートポ診断：自律実行型チーム 寄りでした。\n責務がクリアだと運用が回るやつ。\n${tag}`,
        B: `チートポ診断：横断イネイブリング型 寄りでした。\n横断が増えるほど分断と摩擦が見えやすい。\n${tag}`,
        C: `チートポ診断：分断・属人化ゾーン 寄りでした。\n問題は人じゃなくて構造、ってやつ。\n${tag}`,
    };

    let text = templates[resultType] ?? `チートポ診断：結果が出ました。\n${tag}`;

    // 短縮（保険）
    const MAX = 260;
    if (text.length > MAX) {
        text = text.split("\n")[0] + "\n" + tag;
        if (text.length > MAX) text = text.slice(0, MAX - 1) + "…";
    }
    return text;
}

/**
 * X投稿画面を開く
 * @param {string} resultType - A, B, C
 */
function openXShare(resultType) {
    const text = buildTweetText(resultType);
    const url = location.href.split('?')[0]; // クエリパラメータを除去

    const intent = new URL("https://twitter.com/intent/tweet");
    intent.searchParams.set("text", text);
    intent.searchParams.set("url", url);

    window.open(intent.toString(), "_blank", "noopener,noreferrer");
}

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
        
        // キーボード操作対応
        document.addEventListener('keydown', (e) => {
            if (this.screens.question.classList.contains('active')) {
                if (e.key === 'y' || e.key === 'Y') {
                    this.selectAnswer(true);
                } else if (e.key === 'n' || e.key === 'N') {
                    this.selectAnswer(false);
                }
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

        // Update progress
        const progressPercent = (this.currentQuestion / questions.length) * 100;
        this.elements.progress.style.width = `${progressPercent}%`;

        // Yes/No ボタンを生成
        this.elements.options.innerHTML = `
            <button class="option-btn yes-btn" aria-label="Yes" data-answer="yes">
                <span class="btn-icon">○</span>
                <span class="btn-text">Yes</span>
            </button>
            <button class="option-btn no-btn" aria-label="No" data-answer="no">
                <span class="btn-icon">×</span>
                <span class="btn-text">No</span>
            </button>
        `;

        // イベントリスナー追加
        this.elements.options.querySelector('.yes-btn').addEventListener('click', () => this.selectAnswer(true));
        this.elements.options.querySelector('.no-btn').addEventListener('click', () => this.selectAnswer(false));
    }

    selectAnswer(isYes) {
        const question = questions[this.currentQuestion];
        const answerKey = isYes ? 'yes' : 'no';
        
        // スコア加算
        const scoring = question.scoring[answerKey];
        this.scores.A += scoring.A;
        this.scores.B += scoring.B;
        this.scores.C += scoring.C;

        // 回答記録
        this.answers.push({
            questionId: question.id,
            answer: isYes
        });

        // Visual feedback
        const buttons = this.elements.options.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);
        const selectedBtn = isYes 
            ? this.elements.options.querySelector('.yes-btn')
            : this.elements.options.querySelector('.no-btn');
        selectedBtn.classList.add('selected');

        // Next question or result
        setTimeout(() => {
            if (this.currentQuestion < questions.length - 1) {
                this.currentQuestion++;
                this.showQuestion();
            } else {
                this.showResult();
            }
        }, 250);
    }

    showResult() {
        // タイプ判定
        const resultType = determineType(this.scores);
        const typeInfo = teamTypes[resultType];
        this.currentResultType = resultType; // X投稿用に保持

        // 結果画面描画（スクショ映え重視・1画面完結）
        this.elements.resultContent.innerHTML = `
            <div class="result-card" style="--type-color: ${typeInfo.color}">
                <div class="result-header">
                    <div class="result-label">あなたのチームは...</div>
                    <h3 class="result-type-name">
                        ${typeInfo.name}
                        <span class="result-suffix">${typeInfo.suffix}</span>
                    </h3>
                </div>
                
                <div class="result-features">
                    ${typeInfo.features.map(f => `
                        <div class="feature-item">
                            <span class="feature-check">✓</span>
                            <span>${f}</span>
                        </div>
                    `).join('')}
                </div>
                
                <div class="result-context ${typeInfo.isWarning ? 'is-warning' : ''}">
                    <p>${typeInfo.dressCodeContext}</p>
                </div>
                
                <div class="result-footer">
                    <p class="brand-small">Team Topologies Diagnosis by Dress Code</p>
                </div>
            </div>
            
            <div class="share-section">
                <button id="share-x-btn" class="btn share-btn" aria-label="結果をXに投稿">
                    <svg class="x-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    結果をXに投稿
                </button>
                <p class="share-note">※投稿内容は編集できます</p>
            </div>
        `;

        // X投稿ボタンのイベント
        document.getElementById('share-x-btn').addEventListener('click', () => {
            openXShare(this.currentResultType);
        });

        this.elements.progress.style.width = '100%';
        this.showScreen('result');
    }

    restart() {
        this.currentQuestion = 0;
        this.answers = [];
        this.scores = { A: 0, B: 0, C: 0 };
        this.showScreen('start');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DiagnosisApp();
});
