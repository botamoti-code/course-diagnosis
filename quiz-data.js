// ─── 診断質問データ ───
// 各選択肢の score: { mebae, hana, minori } で加算
const quizData = [
  {
    id: 1,
    question: "在宅ワークや副業の経験はありますか？",
    choices: [
      {
        text: "まったくの初心者。何から始めればいいかわからない",
        score: { mebae: 3, hana: 1, minori: 0 }
      },
      {
        text: "興味はあるけど、まだ具体的に動けていない",
        score: { mebae: 2, hana: 2, minori: 0 }
      },
      {
        text: "少し独学でやってみたが、成果が出ていない",
        score: { mebae: 0, hana: 3, minori: 1 }
      },
      {
        text: "すでに収益化に挑戦中。もっとスキルアップしたい",
        score: { mebae: 0, hana: 1, minori: 3 }
      }
    ]
  },
  {
    id: 2,
    question: "今、最も求めていることは何ですか？",
    choices: [
      {
        text: "同じ志を持つ仲間との繋がりが欲しい",
        score: { mebae: 3, hana: 1, minori: 0 }
      },
      {
        text: "具体的なスキル（デザイン・ライティング・SNS）を身につけたい",
        score: { mebae: 0, hana: 3, minori: 1 }
      },
      {
        text: "月5〜10万円の収入を得られるようになりたい",
        score: { mebae: 0, hana: 3, minori: 2 }
      },
      {
        text: "自分だけの商品・サービスを作って自動化したい",
        score: { mebae: 0, hana: 0, minori: 3 }
      }
    ]
  },
  {
    id: 3,
    question: "学びに投資できる金額として、今の感覚に近いのは？",
    choices: [
      {
        text: "まずはワンコイン〜千円程度で様子を見たい",
        score: { mebae: 3, hana: 0, minori: 0 }
      },
      {
        text: "本気で学ぶなら数千円〜1万円程度は出せる",
        score: { mebae: 1, hana: 3, minori: 0 }
      },
      {
        text: "しっかり成果が出るなら3万円前後も検討できる",
        score: { mebae: 0, hana: 1, minori: 3 }
      },
      {
        text: "金額よりも「何が得られるか」を重視したい",
        score: { mebae: 1, hana: 2, minori: 2 }
      }
    ]
  },
  {
    id: 4,
    question: "1日のうち、学習に使える時間はどれくらいですか？",
    choices: [
      {
        text: "正直、ほとんど余裕がない（1日15分程度）",
        score: { mebae: 3, hana: 1, minori: 0 }
      },
      {
        text: "隙間時間を活用すれば30分〜1時間は確保できる",
        score: { mebae: 1, hana: 3, minori: 1 }
      },
      {
        text: "子どもが寝た後など、1〜2時間はしっかり取れる",
        score: { mebae: 0, hana: 2, minori: 3 }
      },
      {
        text: "日中もまとまった時間を確保できる環境にある",
        score: { mebae: 0, hana: 1, minori: 3 }
      }
    ]
  },
  {
    id: 5,
    question: "「理想の未来」に最も近いのはどれですか？",
    choices: [
      {
        text: "まずは一歩踏み出す勇気が欲しい。仲間の存在が力になる",
        score: { mebae: 3, hana: 1, minori: 0 }
      },
      {
        text: "自分のスキルで月数万円を稼ぎ、自信を取り戻したい",
        score: { mebae: 0, hana: 3, minori: 1 }
      },
      {
        text: "在宅で安定した収入を得て、家族との時間も大切にしたい",
        score: { mebae: 0, hana: 2, minori: 2 }
      },
      {
        text: "自分のビジネスを持ち、自動収入の仕組みを作りたい",
        score: { mebae: 0, hana: 0, minori: 3 }
      }
    ]
  }
];

// ─── コース情報 ───
const courseInfo = {
  mebae: {
    name: "芽（めばえ）コース",
    price: "980円",
    priceUnit: "月額",
    emoji: "🌱",
    tagline: "まずは一歩を踏み出したいあなたへ",
    color: "green",
    features: [
      "Discordコミュニティに参加できる",
      "同じ志を持つ仲間と繋がれる",
      "華・実コースの先輩とも交流可能",
      "熱量の高い環境で刺激を受けられる"
    ],
    description: "まずはコミュニティの雰囲気を覗いてみたい方、一人では不安だけど仲間がいれば頑張れるという方に最適なコースです。"
  },
  hana: {
    name: "華（はな）コース",
    price: "7,980円",
    priceUnit: "月額",
    emoji: "🌸",
    tagline: "一番人気！スキルを武器に月5〜10万を目指す",
    color: "pink",
    badge: "一番人気",
    features: [
      "全10章の講義コンテンツが見放題",
      "Canvaデザイン・SNS集客・ライティングを習得",
      "ココナラ完全攻略で実践力を強化",
      "アフィリエイト権利付きで受講料を回収可能"
    ],
    description: "参加者の8割以上が選ぶ最もバランスの取れたコース。学びながら収益化のチャンスも得られるため、最速で投資を回収できます。"
  },
  minori: {
    name: "実（みのり）コース",
    price: "33,000円",
    priceUnit: "月額",
    emoji: "🍎",
    tagline: "本気で自分のビジネスを構築したいあなたへ",
    color: "red",
    features: [
      "華コースの全内容に加え実践的なコンテンツ",
      "自社商品の設計・導線設計・セールスを学べる",
      "UTAGE構築代行スキルの習得",
      "個別チャット＆グループサポート付き"
    ],
    description: "月30万円以上を目指す本気の方向け。商品設計から自動化まで、プロとしての実践力を最速で身につけるコースです。"
  }
};
