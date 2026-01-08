/**
 * Team Topologies Diagnosis Questions
 * 
 * Team Types:
 * - streamAligned: Stream-Aligned Team (ストリームアラインドチーム)
 * - enabling: Enabling Team (イネーブリングチーム)
 * - complicated: Complicated Subsystem Team (コンプリケイテッドサブシステムチーム)
 * - platform: Platform Team (プラットフォームチーム)
 */

const questions = [
    {
        id: 1,
        text: 'あなたのチームは主にどのような価値を提供していますか？',
        options: [
            {
                text: 'エンドユーザーに直接価値を届けるプロダクト機能の開発',
                scores: { streamAligned: 3, enabling: 0, complicated: 0, platform: 0 }
            },
            {
                text: '他のチームの能力向上やスキルトランスファー',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '専門性の高い技術領域のコンポーネント開発',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 0 }
            },
            {
                text: '他のチームが利用する共通基盤やサービスの提供',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    },
    {
        id: 2,
        text: 'チームの主な顧客は誰ですか？',
        options: [
            {
                text: '外部のエンドユーザーや顧客',
                scores: { streamAligned: 3, enabling: 0, complicated: 0, platform: 0 }
            },
            {
                text: '他の開発チーム（一時的な支援として）',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '特定の技術領域を必要とする他チーム',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 0 }
            },
            {
                text: '社内の複数の開発チーム（継続的なサービスとして）',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    },
    {
        id: 3,
        text: 'チームのデリバリーサイクルはどのような特徴がありますか？',
        options: [
            {
                text: 'ビジネス価値を継続的かつ迅速にデリバリーする',
                scores: { streamAligned: 3, enabling: 1, complicated: 0, platform: 1 }
            },
            {
                text: '他チームのニーズに応じて柔軟にサポートする',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '技術的な品質と正確性を最優先にデリバリーする',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 1 }
            },
            {
                text: '安定したプラットフォームサービスを継続的に提供する',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    },
    {
        id: 4,
        text: 'チームに求められる専門性はどのようなものですか？',
        options: [
            {
                text: 'ビジネスドメインの深い理解とフルスタックな開発力',
                scores: { streamAligned: 3, enabling: 0, complicated: 0, platform: 0 }
            },
            {
                text: 'コーチングやメンタリング、技術トランスファーのスキル',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '数学、AI/ML、特殊なアルゴリズムなど高度な専門知識',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 0 }
            },
            {
                text: 'インフラ、DevOps、プラットフォーム設計の専門性',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    },
    {
        id: 5,
        text: 'チームの他チームとの関わり方は？',
        options: [
            {
                text: '必要に応じて他チームと連携するが、基本的に自律的に動く',
                scores: { streamAligned: 3, enabling: 0, complicated: 1, platform: 0 }
            },
            {
                text: '他チームに深く入り込み、能力向上を支援する',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '専門領域のAPIやコンポーネントを提供し、他チームが利用する',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 1 }
            },
            {
                text: 'セルフサービスで利用できるプラットフォームを提供する',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    },
    {
        id: 6,
        text: 'チームの成功はどのように測定されますか？',
        options: [
            {
                text: 'ユーザーへの価値提供とビジネス指標の改善',
                scores: { streamAligned: 3, enabling: 0, complicated: 0, platform: 0 }
            },
            {
                text: '支援したチームの成長と自立',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '技術的な品質とパフォーマンスの指標',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 1 }
            },
            {
                text: 'プラットフォームの利用率と開発者体験',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    },
    {
        id: 7,
        text: 'チームの寿命やライフサイクルは？',
        options: [
            {
                text: 'プロダクトやサービスが存在する限り継続する長期チーム',
                scores: { streamAligned: 3, enabling: 0, complicated: 1, platform: 2 }
            },
            {
                text: '支援の必要性に応じて柔軟に活動する一時的なチーム',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '特定の技術領域が必要な限り存在する専門チーム',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 0 }
            },
            {
                text: '組織全体のインフラを支える恒久的なチーム',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    },
    {
        id: 8,
        text: 'チームが最も重視していることは？',
        options: [
            {
                text: '素早いフィードバックループとユーザー価値の最大化',
                scores: { streamAligned: 3, enabling: 1, complicated: 0, platform: 0 }
            },
            {
                text: '組織全体の技術力向上と知識共有',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '技術的な深さと専門性の追求',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 0 }
            },
            {
                text: 'スケーラビリティと信頼性の高いサービス提供',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    },
    {
        id: 9,
        text: 'チームの認知負荷について、どのような状況ですか？',
        options: [
            {
                text: 'ビジネスドメインに集中できるよう、他の複雑性は最小化したい',
                scores: { streamAligned: 3, enabling: 0, complicated: 0, platform: 0 }
            },
            {
                text: '多様な技術とプラクティスに精通し、それを他チームに伝えたい',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '深い専門領域に集中し、その複雑性をカプセル化したい',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 0 }
            },
            {
                text: 'インフラの複雑性を抽象化し、他チームの負荷を減らしたい',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    },
    {
        id: 10,
        text: 'チームが提供するものの「消費者」との関係は？',
        options: [
            {
                text: 'プロダクトを通じてエンドユーザーと直接つながる',
                scores: { streamAligned: 3, enabling: 0, complicated: 0, platform: 0 }
            },
            {
                text: 'メンタリングやペアリングで密接に関わり、徐々に離れる',
                scores: { streamAligned: 0, enabling: 3, complicated: 0, platform: 0 }
            },
            {
                text: '明確なインターフェースを通じて、必要なときに利用される',
                scores: { streamAligned: 0, enabling: 0, complicated: 3, platform: 1 }
            },
            {
                text: 'セルフサービスで自由に利用できるAPIやツールを提供',
                scores: { streamAligned: 0, enabling: 0, complicated: 0, platform: 3 }
            }
        ]
    }
];

/**
 * Team Types Information
 */
const teamTypes = {
    streamAligned: {
        name: 'Stream-Aligned Team（ストリームアラインドチーム）',
        description: `あなたのチームは「ストリームアラインドチーム」の特性が強いようです。

ストリームアラインドチームは、ビジネス価値の流れ（ストリーム）に沿って編成され、エンドユーザーに直接価値を届けることを目的としています。

主な特徴：
• エンドツーエンドでプロダクト機能を開発・運用できる
• ビジネスドメインに深い理解を持つ
• 迅速かつ継続的にデリバリーする能力がある
• 認知負荷を管理可能な範囲に保つことを重視する

組織の大部分のチームがこのタイプであることが理想的です。`
    },
    enabling: {
        name: 'Enabling Team（イネーブリングチーム）',
        description: `あなたのチームは「イネーブリングチーム」の特性が強いようです。

イネーブリングチームは、他のチーム（主にストリームアラインドチーム）の能力を高めることを使命としています。

主な特徴：
• 他チームへの技術・プラクティスのトランスファーが得意
• コーチング、メンタリング能力が高い
• 一時的にチームに入り込み、支援後は離れる
• 新技術の調査・評価・導入支援を行う

このチームの目標は、支援したチームが自立できるようになることです。`
    },
    complicated: {
        name: 'Complicated Subsystem Team（コンプリケイテッドサブシステムチーム）',
        description: `あなたのチームは「コンプリケイテッドサブシステムチーム」の特性が強いようです。

このチームは、高度な専門知識を必要とする複雑なサブシステムを担当します。

主な特徴：
• 数学、AI/ML、ビデオコーデックなど高度な専門知識を持つ
• 複雑性をカプセル化し、シンプルなインターフェースを提供
• 専門領域の深い技術的品質を追求
• 他チームが専門知識なしで利用できるコンポーネントを提供

このチームは組織に数チームのみ存在し、その専門性で他チームを支援します。`
    },
    platform: {
        name: 'Platform Team（プラットフォームチーム）',
        description: `あなたのチームは「プラットフォームチーム」の特性が強いようです。

プラットフォームチームは、他のチームが自律的に動けるよう、共通基盤やサービスを提供します。

主な特徴：
• セルフサービスで利用できるプラットフォームを提供
• 他チームの認知負荷を下げることを重視
• 信頼性とスケーラビリティの高いサービス運用
• 開発者体験（Developer Experience）を最優先

内部プロダクトとして他チームをユーザーと捉え、魅力的なプラットフォームを提供します。`
    }
};
