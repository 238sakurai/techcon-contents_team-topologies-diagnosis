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
        this.currentResultType = resultType; // シェア用に保存

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

                <div class="share-buttons">
                    <button type="button" id="share-x-btn" class="share-btn share-x" aria-label="Xでシェア">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        <span>Xでシェア</span>
                    </button>
                    <button type="button" id="copy-result-btn" class="share-btn share-copy" aria-label="結果をコピー">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>結果をコピー</span>
                    </button>
                </div>

                <div class="screenshot-hint">
                    <span>📸</span> スクショもOK！
                </div>
            </div>
        `;

        // シェアボタンのイベントをバインド
        this.bindShareEvents();

        this.showScreen('result');
    }

    /**
     * シェアボタンのイベントをバインド
     */
    bindShareEvents() {
        const shareXBtn = document.getElementById('share-x-btn');
        const copyBtn = document.getElementById('copy-result-btn');

        if (shareXBtn) {
            shareXBtn.addEventListener('click', () => this.shareToX());
        }
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyResult());
        }
    }

    /**
     * シェアURL取得（現在のページURL）
     */
    getShareUrl() {
        // URLパラメータを除いたベースURL
        return window.location.origin + window.location.pathname;
    }

    /**
     * シェアテキスト取得（280文字制限対応）
     */
    getShareText(typeInfo) {
        const baseText = typeInfo.shareText;
        const url = this.getShareUrl();
        const maxLength = 280;

        // URL分の文字数を考慮（t.coで23文字に短縮される）
        const urlLength = 23;
        const availableLength = maxLength - urlLength - 2; // 改行分

        if (baseText.length <= availableLength) {
            return baseText;
        }

        // 長すぎる場合は短縮
        return baseText.substring(0, availableLength - 3) + '...';
    }

    /**
     * Xでシェア（Web Intent）
     */
    shareToX() {
        const typeInfo = resultTypes[this.currentResultType];
        const text = this.getShareText(typeInfo);
        const url = this.getShareUrl();

        const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

        window.open(intentUrl, '_blank', 'noopener,noreferrer');
    }

    /**
     * 結果をクリップボードにコピー
     */
    async copyResult() {
        const typeInfo = resultTypes[this.currentResultType];
        const text = typeInfo.shareText;
        const url = this.getShareUrl();
        const copyText = `${text}\n${url}`;

        const copyBtn = document.getElementById('copy-result-btn');

        try {
            await navigator.clipboard.writeText(copyText);

            // 成功フィードバック
            if (copyBtn) {
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>コピーしました！</span>
                `;
                copyBtn.classList.add('copied');

                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.classList.remove('copied');
                }, 2000);
            }
        } catch (err) {
            // フォールバック: 古いブラウザ用
            this.fallbackCopy(copyText, copyBtn);
        }
    }

    /**
     * クリップボードコピーのフォールバック
     */
    fallbackCopy(text, copyBtn) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            if (copyBtn) {
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>コピーしました！</span>
                `;
                copyBtn.classList.add('copied');

                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.classList.remove('copied');
                }, 2000);
            }
        } catch (err) {
            alert('コピーに失敗しました。手動でコピーしてください。');
        }

        document.body.removeChild(textarea);
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
