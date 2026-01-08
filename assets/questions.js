/**
 * Team Topologies 診断 - SRE向け 10問 Yes/No
 * 
 * タイプ定義：
 * - Type A: 自律実行型チーム（Stream-aligned寄り）
 * - Type B: 横断イネイブリング型（Platform/Enabling寄り）
 * - Type C: 分断・属人化ゾーン（あるある枠）
 */

const questions = [
    {
        id: 1,
        text: "組織横断的な案件を同時に複数抱えている",
        // Yes → B_score += 1
        yesScore: { A: 0, B: 1, C: 0 },
        noScore: { A: 0, B: 0, C: 0 }
    },
    {
        id: 2,
        text: "インフラや運用のコスト削減をミッションとして担っている",
        // Yes → B_score += 1
        yesScore: { A: 0, B: 1, C: 0 },
        noScore: { A: 0, B: 0, C: 0 }
    },
    {
        id: 3,
        text: "他チーム向けに「仕組み・テンプレ・ガイド」を作ることが多い",
        // Yes → B_score += 1
        yesScore: { A: 0, B: 1, C: 0 },
        noScore: { A: 0, B: 0, C: 0 }
    },
    {
        id: 4,
        text: "社内勉強会や知見展開を「役割として」やっている",
        // Yes → B_score += 1
        yesScore: { A: 0, B: 1, C: 0 },
        noScore: { A: 0, B: 0, C: 0 }
    },
    {
        id: 5,
        text: "障害対応は基本的にチーム内で完結する",
        // Yes → A_score += 1
        yesScore: { A: 1, B: 0, C: 0 },
        noScore: { A: 0, B: 0, C: 0 }
    },
    {
        id: 6,
        text: "「この人がいないと詰む」状況がある",
        // Yes → C_flag += 1（属人化シグナル）
        yesScore: { A: 0, B: 0, C: 1 },
        noScore: { A: 0, B: 0, C: 0 }
    },
    {
        id: 7,
        text: "自分たちの責任範囲を一言で説明できる",
        // Yes → A_score += 1 AND B_score += 1（責務明確）
        yesScore: { A: 1, B: 1, C: 0 },
        noScore: { A: 0, B: 0, C: 0 }
    },
    {
        id: 8,
        text: "相談・依頼が常にどこかから飛んでくる",
        // Yes → B_score += 1
        yesScore: { A: 0, B: 1, C: 0 },
        noScore: { A: 0, B: 0, C: 0 }
    },
    {
        id: 9,
        text: "仕事の優先順位を自分たちで決められている",
        // Yes → A_score += 1 AND B_score += 1（主導権）
        yesScore: { A: 1, B: 1, C: 0 },
        noScore: { A: 0, B: 0, C: 0 }
    },
    {
        id: 10,
        text: "今の役割について納得感がある",
        // No → C_flag += 1（納得感欠如シグナル）
        yesScore: { A: 0, B: 0, C: 0 },
        noScore: { A: 0, B: 0, C: 1 }
    }
];

/**
 * 結果タイプ定義
 */
const resultTypes = {
    A: {
        id: "A",
        title: "自律実行型チーム",
        subtitle: "寄り",
        features: [
            "判断と運用がチーム内で回りやすい",
            "責務が比較的クリア",
            "改善サイクルを自走できる"
        ],
        dressCode: "分断が少ない状態は、意識しないと崩れやすい",
        color: "#4CAF50",
        emoji: "🚀"
    },
    B: {
        id: "B",
        title: "横断イネイブリング型",
        subtitle: "寄り",
        features: [
            "組織横断の依頼が集まりやすい",
            "コスト・基盤・標準化が主戦場",
            "仕組み化や勉強会で周りを強くする"
        ],
        dressCode: "横断が増えるほど「業務の分断と摩擦」は見えやすくなる",
        color: "#2196F3",
        emoji: "🌐"
    },
    C: {
        id: "C",
        title: "分断・属人化ゾーン",
        subtitle: "寄り",
        features: [
            "判断や情報が人に寄りやすい",
            "相談が集中しやすい",
            "構造より気合で回りがち"
        ],
        dressCode: "問題は人ではなく、役割や情報の分断にあることが多い",
        color: "#FF9800",
        emoji: "⚡"
    }
};
