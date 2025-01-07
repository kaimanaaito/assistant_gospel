"use client";
import React, { useState , useEffect } from "react";

import { useHandleStreamResponse } from "../utilities/runtime-helpers";

function MainComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [parable, setParable] = useState("");
  const [interpretation, setInterpretation] = useState(null);
  const [language, setLanguage] = useState("ja");
  const [scriptureContent, setScriptureContent] = useState(null);
  const books = [
    { ja: "創世記", en: "Genesis" },
    { ja: "出エジプト記", en: "Exodus" },
    { ja: "レビ記", en: "Leviticus" },
    { ja: "民数記", en: "Numbers" },
    { ja: "申命記", en: "Deuteronomy" },
    { ja: "ヨシュア記", en: "Joshua" },
    { ja: "士師記", en: "Judges" },
    { ja: "ルツ記", en: "Ruth" },
    { ja: "サムエル記上", en: "1 Samuel" },
    { ja: "サムエル記下", en: "2 Samuel" },
    { ja: "列王記上", en: "1 Kings" },
    { ja: "列王記下", en: "2 Kings" },
    { ja: "歴代誌上", en: "1 Chronicles" },
    { ja: "歴代誌下", en: "2 Chronicles" },
    { ja: "エズラ記", en: "Ezra" },
    { ja: "ネヘミヤ記", en: "Nehemiah" },
    { ja: "エステル記", en: "Esther" },
    { ja: "ヨブ記", en: "Job" },
    { ja: "詩篇", en: "Psalms" },
    { ja: "箴言", en: "Proverbs" },
    { ja: "伝道の書", en: "Ecclesiastes" },
    { ja: "雅歌", en: "Song of Solomon" },
    { ja: "イザヤ書", en: "Isaiah" },
    { ja: "エレミヤ書", en: "Jeremiah" },
    { ja: "哀歌", en: "Lamentations" },
    { ja: "エゼキエル書", en: "Ezekiel" },
    { ja: "ダニエル書", en: "Daniel" },
    { ja: "ホセア書", en: "Hosea" },
    { ja: "ヨエル書", en: "Joel" },
    { ja: "アモス書", en: "Amos" },
    { ja: "オバデヤ書", en: "Obadiah" },
    { ja: "ヨナ書", en: "Jonah" },
    { ja: "ミカ書", en: "Micah" },
    { ja: "ナホム書", en: "Nahum" },
    { ja: "ハバクク書", en: "Habakkuk" },
    { ja: "ゼパニヤ書", en: "Zephaniah" },
    { ja: "ハガイ書", en: "Haggai" },
    { ja: "ゼカリヤ書", en: "Zechariah" },
    { ja: "マラキ書", en: "Malachi" },
    { ja: "マタイによる福音書", en: "Matthew" },
    { ja: "マルコによる福音書", en: "Mark" },
    { ja: "ルカによる福音書", en: "Luke" },
    { ja: "ヨハネによる福音書", en: "John" },
    { ja: "使徒行伝", en: "Acts" },
    { ja: "ローマ人への手紙", en: "Romans" },
    { ja: "コリント人への第一の手紙", en: "1 Corinthians" },
    { ja: "コリント人への第二の手紙", en: "2 Corinthians" },
    { ja: "ガラテヤ人への手紙", en: "Galatians" },
    { ja: "エペソ人への手紙", en: "Ephesians" },
    { ja: "ピリピ人への手紙", en: "Philippians" },
    { ja: "コロサイ人への手紙", en: "Colossians" },
    { ja: "テサロニケ人への第一の手紙", en: "1 Thessalonians" },
    { ja: "テサロニケ人への第二の手紙", en: "2 Thessalonians" },
    { ja: "テモテへの第一の手紙", en: "1 Timothy" },
    { ja: "テモテへの第二の手紙", en: "2 Timothy" },
    { ja: "テトスへの手紙", en: "Titus" },
    { ja: "ピレモンへの手紙", en: "Philemon" },
    { ja: "ヘブル人への手紙", en: "Hebrews" },
    { ja: "ヤコブの手紙", en: "James" },
    { ja: "ペテロの第一の手紙", en: "1 Peter" },
    { ja: "ペテロの第二の手紙", en: "2 Peter" },
    { ja: "ヨハネの第一の手紙", en: "1 John" },
    { ja: "ヨハネの第二の手紙", en: "2 John" },
    { ja: "ヨハネの第三の手紙", en: "3 John" },
    { ja: "ユダの手紙", en: "Jude" },
    { ja: "ヨハネの黙示録", en: "Revelation" },
    { ja: "1 ニーファイ", en: "1 Nephi" },
    { ja: "2 ニーファイ", en: "2 Nephi" },
    { ja: "ヤコブ書", en: "Jacob" },
    { ja: "エノス書", en: "Enos" },
    { ja: "ジェロム書", en: "Jarom" },
    { ja: "オムナイ書", en: "Omni" },
    { ja: "モルモンの言葉", en: "Words of Mormon" },
    { ja: "モーサヤ書", en: "Mosiah" },
    { ja: "アルマ書", en: "Alma" },
    { ja: "ヒラマン書", en: "Helaman" },
    { ja: "3 ニーファイ", en: "3 Nephi" },
    { ja: "4 ニーファイ", en: "4 Nephi" },
    { ja: "モルモン書", en: "Mormon" },
    { ja: "エテル書", en: "Ether" },
    { ja: "モロナイ書", en: "Moroni" },
    { ja: "教義と聖約 第1部", en: "Doctrine and Covenants Part 1" },
    { ja: "教義と聖約 第2部", en: "Doctrine and Covenants Part 2" },
    { ja: "教義と聖約 第3部", en: "Doctrine and Covenants Part 3" },
    { ja: "教義と聖約 第4部", en: "Doctrine and Covenants Part 4" },
    { ja: "教義と聖約 第5部", en: "Doctrine and Covenants Part 5" },
    { ja: "教義と聖約 第6部", en: "Doctrine and Covenants Part 6" },
    { ja: "教義と聖約 第7部", en: "Doctrine and Covenants Part 7" },
  ];
  const chapters = Array.from({ length: 150 }, (_, i) => i + 1);
  const [activeTab, setActiveTab] = useState("network");
  const [sampleData, setSampleData] = useState({
    network: {
      title: language === "ja" ? "人物関係図" : "Character Network",
      content:
        language === "ja"
          ? "書物と章を選択して「分析する」をクリックしてください"
          : "Select a book and chapter, then click 'Analyze'",
    },
    summary: {
      title: language === "ja" ? "要約" : "Summary",
      content:
        language === "ja"
          ? "書物と章を選択して「分析する」をクリックしてください"
          : "Select a book and chapter, then click 'Analyze'",
    },
    principles: {
      title: language === "ja" ? "原則" : "Principles",
      content:
        language === "ja"
          ? "書物と章を選択して「分析する」をクリックしてください"
          : "Select a book and chapter, then click 'Analyze'",
    },
  });
  const [loading, setLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [error, setError] = useState(null);
  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: (message) => {
      setStreamingMessage("");
      try {
        const parsed = JSON.parse(message);
        if (parsed.searchResults) {
          setSearchResults(parsed);
          setSearchTerm("");
        } else if (parsed.interpretation) {
          setInterpretation(parsed.interpretation);
        } else {
          setSampleData((prev) => ({
            ...prev,
            [activeTab]: parsed,
          }));
        }
      } catch (e) {
        setError(
          language === "ja"
            ? "応答の解析に失敗しました"
            : "Failed to parse response"
        );
      }
      setLoading(false);
    },
  });
  const fetchScriptureData = async () => {
    if (!selectedBook || !selectedChapter) return;

    try {
      const response = await fetch("/integrations/web-scraper/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: `https://www.churchofjesuschrist.org/study/scriptures/${selectedBook}/${selectedChapter}?lang=${language}`,
        }),
      });

      const data = await response.json();
      setScriptureContent(data);
    } catch (err) {
      setError(
        language === "ja"
          ? "聖文の取得に失敗しました"
          : "Failed to fetch scripture content"
      );
    }
  };
  const interpretParable = async () => {
    if (!parable) {
      setError(
        language === "ja"
          ? "たとえ話を入力してください"
          : "Please enter a parable"
      );
      return;
    }

    setLoading(true);
    setError(null);

    const messages = [
      {
        role: "user",
        content: `Please interpret the following parable or abstract story in ${
          language === "ja" ? "Japanese" : "English"
        }:\n\n${parable}`,
      },
    ];

    const schema = {
      name: "parable_interpretation",
      schema: {
        type: "object",
        properties: {
          interpretation: {
            type: "object",
            properties: {
              symbolism: { type: "string" },
              modernApplication: { type: "string" },
              historicalContext: { type: "string" },
            },
            required: ["symbolism", "modernApplication", "historicalContext"],
            additionalProperties: false,
          },
        },
        required: ["interpretation"],
        additionalProperties: false,
      },
    };

    try {
      const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          json_schema: schema,
          stream: true,
        }),
      });
      handleStreamResponse(response);
    } catch (err) {
      setError(
        language === "ja"
          ? "解釈中にエラーが発生しました"
          : "An error occurred during interpretation"
      );
      setLoading(false);
    }
  };
  const [db, setDb] = useState(null);
  const [savedVerses, setSavedVerses] = useState([]);
  const [translatedContent, setTranslatedContent] = useState(null);

  useEffect(() => {
    const initDb = async () => {
      const database = await fetch("/api/database", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "scripture_db",
          schema: {
            verses: {
              book: "string",
              chapter: "number",
              content: "string",
              notes: "string",
              timestamp: "date",
            },
          },
        }),
      });
      const dbData = await database.json();
      setDb(dbData);
      loadSavedVerses();
    };
    initDb();
    fetchScriptureData();
  }, []);

  const loadSavedVerses = async () => {
    if (db) {
      const verses = await db.verses.findMany();
      setSavedVerses(verses);
    }
  };
  const saveVerse = async (content, notes = "") => {
    if (db && selectedBook && selectedChapter) {
      await db.verses.create({
        book: selectedBook,
        chapter: selectedChapter,
        content: content,
        notes: notes,
        timestamp: new Date(),
      });
      loadSavedVerses();
    }
  };
  const analyzeScripture = async () => {
    if (!selectedBook || !selectedChapter) {
      setError(
        language === "ja"
          ? "書物と章を選択してください"
          : "Please select a book and chapter"
      );
      return;
    }

    setLoading(true);
    setError(null);

    await fetchScriptureData();

    let messages = [];
    let schema = {};

    const systemMessage =
      language === "ja"
        ? "あなたは末日聖徒イエス・キリスト教会の教えに基づいて回答を提供するアシスタントです。必ず日本語で回答してください。総大会や預言者の言葉も含めて回答してください。教会の教義に反する内容や不適切な解釈は避けてください。"
        : "You are an assistant providing responses based on the teachings of The Church of Jesus Christ of Latter-day Saints. Please respond in English. Include conference talks and prophetic words. Avoid content that contradicts church doctrine or inappropriate interpretations.";

    if (activeTab === "network") {
      const userPrompt =
        language === "ja"
          ? `${selectedBook}${selectedChapter}章の登場人物とその関係性を、末日聖徒イエス・キリスト教会の視点から分析してください。以下の形式で出力してください：
1. 主要な登場人物のリスト（name, description）
2. 登場人物間の関係性（source, target, relationship）
3. 物語の背景説明と福音の原則
4. 関連する総大会や預言者の教え
5. 教会の教義との整合性

聖文の内容：${scriptureContent}`
          : `Please analyze the characters and their relationships in ${selectedBook} chapter ${selectedChapter} from the perspective of The Church of Jesus Christ of Latter-day Saints. Output in the following format:
1. List of main characters (name, description)
2. Character relationships (source, target, relationship)
3. Story background and gospel principles
4. Related conference talks and prophetic teachings
5. Alignment with church doctrine

Scripture content: ${scriptureContent}`;

      messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: userPrompt },
      ];

      schema = {
        name: "character_network_analysis",
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            characters: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                },
                required: ["name", "description"],
                additionalProperties: false,
              },
            },
            relationships: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  source: { type: "string" },
                  target: { type: "string" },
                  relationship: { type: "string" },
                },
                required: ["source", "target", "relationship"],
                additionalProperties: false,
              },
            },
            background: { type: "string" },
            modernTeachings: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  speaker: { type: "string" },
                  quote: { type: "string" },
                  source: { type: "string" },
                  doctrinalAlignment: { type: "string" },
                },
                required: ["speaker", "quote", "source", "doctrinalAlignment"],
                additionalProperties: false,
              },
            },
          },
          required: [
            "title",
            "characters",
            "relationships",
            "background",
            "modernTeachings",
          ],
          additionalProperties: false,
        },
      };
    } else if (activeTab === "summary") {
      const userPrompt =
        language === "ja"
          ? `${selectedBook}${selectedChapter}章の内容を末日聖徒イエス・キリスト教会の視点から要約してください。以下の形式で出力してください：
1. 章の概要と福音の原則
2. 主要な出来事と霊的な教訓
3. 重要なポイントと現代への適用
4. 関連する総大会や預言者の教え
5. 教会の教義との整合性

聖文の内容：${scriptureContent}`
          : `Please summarize ${selectedBook} chapter ${selectedChapter} from the perspective of The Church of Jesus Christ of Latter-day Saints. Output in the following format:
1. Chapter overview and gospel principles
2. Major events and spiritual lessons
3. Key points and modern application
4. Related conference talks and prophetic teachings
5. Alignment with church doctrine

Scripture content: ${scriptureContent}`;

      messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: userPrompt },
      ];

      schema = {
        name: "chapter_summary",
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            overview: { type: "string" },
            events: {
              type: "array",
              items: { type: "string" },
            },
            keyPoints: {
              type: "array",
              items: { type: "string" },
            },
            modernTeachings: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  speaker: { type: "string" },
                  quote: { type: "string" },
                  source: { type: "string" },
                  doctrinalAlignment: { type: "string" },
                },
                required: ["speaker", "quote", "source", "doctrinalAlignment"],
                additionalProperties: false,
              },
            },
          },
          required: [
            "title",
            "overview",
            "events",
            "keyPoints",
            "modernTeachings",
          ],
          additionalProperties: false,
        },
      };
    } else if (activeTab === "principles") {
      const userPrompt =
        language === "ja"
          ? `${selectedBook}${selectedChapter}章から学べる福音の原則や教訓を末日聖徒イエス・キリスト教会の視点から分析してください。以下の形式で出力してください：
1. 主要な福音の原則
2. 現代への適用と証
3. 実践的な提案と祈りのポイント
4. 関連する総大会や預言者の教え
5. 教会の教義との整合性

聖文の内容：${scriptureContent}`
          : `Please analyze the gospel principles and lessons from ${selectedBook} chapter ${selectedChapter} from the perspective of The Church of Jesus Christ of Latter-day Saints. Output in the following format:
1. Main gospel principles
2. Modern application and testimony
3. Practical suggestions and prayer points
4. Related conference talks and prophetic teachings
5. Alignment with church doctrine

Scripture content: ${scriptureContent}`;

      messages = [
        { role: "system", content: systemMessage },
        { role: "user", content: userPrompt },
      ];

      schema = {
        name: "chapter_principles",
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            principles: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  principle: { type: "string" },
                  application: { type: "string" },
                  practicalSteps: {
                    type: "array",
                    items: { type: "string" },
                  },
                  modernTeachings: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        speaker: { type: "string" },
                        quote: { type: "string" },
                        source: { type: "string" },
                        doctrinalAlignment: { type: "string" },
                      },
                      required: [
                        "speaker",
                        "quote",
                        "source",
                        "doctrinalAlignment",
                      ],
                      additionalProperties: false,
                    },
                  },
                },
                required: [
                  "principle",
                  "application",
                  "practicalSteps",
                  "modernTeachings",
                ],
                additionalProperties: false,
              },
            },
          },
          required: ["title", "principles"],
          additionalProperties: false,
        },
      };
    }

    try {
      const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          json_schema: schema,
          stream: true,
        }),
      });
      handleStreamResponse(response);

      if (
        sampleData[activeTab].content &&
        sampleData[activeTab].content !==
          "書物と章を選択して「分析する」をクリックしてください" &&
        sampleData[activeTab].content !==
          "Select a book and chapter, then click 'Analyze'"
      ) {
        saveVerse(sampleData[activeTab].content);
      }
    } catch (err) {
      setError(
        language === "ja"
          ? "分析中にエラーが発生しました"
          : "An error occurred during analysis"
      );
      setLoading(false);
    }
  };
  const searchCharacter = async () => {
    if (!searchTerm) {
      setError(
        language === "ja"
          ? "検索する人物名を入力してください"
          : "Please enter a character name to search"
      );
      return;
    }

    setLoading(true);
    setError(null);

    const systemMessage =
      language === "ja"
        ? "あなたは末日聖徒イエス・キリスト教会の教えに基づいて回答を提供するアシスタントです。必ず日本語で回答してください。総大会や預言者の言葉も含めて回答してください。教会の教義に反する内容や不適切な解釈は避けてください。"
        : "You are an assistant providing responses based on the teachings of The Church of Jesus Christ of Latter-day Saints. Please respond in English. Include conference talks and prophetic words. Avoid content that contradicts church doctrine or inappropriate interpretations.";

    const userPrompt =
      language === "ja"
        ? `聖典に登場する「${searchTerm}」について、末日聖徒イエス・キリスト教会の視点から以下の形式で分析してください：
1. 人物の概要と信仰の特徴
2. 重要な行動や出来事と霊的な意義
3. その人物から学べる福音の原則
4. 関連する聖句の箇所と現代への適用
5. 関連する総大会や預言者の教え
6. 教会の教義との整合性`
        : `Please analyze "${searchTerm}" from the scriptures from the perspective of The Church of Jesus Christ of Latter-day Saints in the following format:
1. Character overview and faith characteristics
2. Important actions, events, and spiritual significance
3. Gospel principles we can learn from this person
4. Related scripture passages and modern application
5. Related conference talks and prophetic teachings
6. Alignment with church doctrine`;

    const messages = [
      { role: "system", content: systemMessage },
      { role: "user", content: userPrompt },
    ];

    const schema = {
      name: "character_search",
      schema: {
        type: "object",
        properties: {
          searchResults: {
            type: "object",
            properties: {
              name: { type: "string" },
              summary: { type: "string" },
              actions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    event: { type: "string" },
                    reference: { type: "string" },
                  },
                  required: ["event", "reference"],
                  additionalProperties: false,
                },
              },
              principles: {
                type: "array",
                items: { type: "string" },
              },
              references: {
                type: "array",
                items: { type: "string" },
              },
              modernTeachings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    speaker: { type: "string" },
                    quote: { type: "string" },
                    source: { type: "string" },
                    doctrinalAlignment: { type: "string" },
                  },
                  required: [
                    "speaker",
                    "quote",
                    "source",
                    "doctrinalAlignment",
                  ],
                  additionalProperties: false,
                },
              },
            },
            required: [
              "name",
              "summary",
              "actions",
              "principles",
              "references",
              "modernTeachings",
            ],
            additionalProperties: false,
          },
        },
        required: ["searchResults"],
        additionalProperties: false,
      },
    };

    try {
      const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          json_schema: schema,
          stream: true,
        }),
      });
      handleStreamResponse(response);
    } catch (err) {
      setError(
        language === "ja"
          ? "検索中にエラーが発生しました"
          : "An error occurred during search"
      );
      setLoading(false);
    }
  };
  const translateContent = async (content) => {
    if (!content) return content;
    try {
      const response = await fetch(
        "/integrations/google-translate/language/translate/v2",
        {
          method: "POST",
          body: new URLSearchParams({
            q: content,
            source: language === "ja" ? "ja" : "en",
            target: language === "ja" ? "en" : "ja",
          }),
        }
      );
      const data = await response.json();
      return data.data.translations[0].translatedText;
    } catch (err) {
      return content;
    }
  };
  const translateAllContent = async () => {
    if (searchResults) {
      const translatedSearchResults = {
        searchResults: {
          name: await translateContent(searchResults.searchResults.name),
          summary: await translateContent(searchResults.searchResults.summary),
          actions: await Promise.all(
            searchResults.searchResults.actions.map(async (action) => ({
              event: await translateContent(action.event),
              reference: action.reference,
            }))
          ),
          principles: await Promise.all(
            searchResults.searchResults.principles.map(translateContent)
          ),
          references: searchResults.searchResults.references,
          modernTeachings: await Promise.all(
            searchResults.searchResults.modernTeachings.map(
              async (teaching) => ({
                speaker: await translateContent(teaching.speaker),
                quote: await translateContent(teaching.quote),
                source: teaching.source,
                doctrinalAlignment: await translateContent(
                  teaching.doctrinalAlignment
                ),
              })
            )
          ),
        },
      };
      setSearchResults(translatedSearchResults);
    }

    if (interpretation) {
      const translatedInterpretation = {
        symbolism: await translateContent(interpretation.symbolism),
        modernApplication: await translateContent(
          interpretation.modernApplication
        ),
        historicalContext: await translateContent(
          interpretation.historicalContext
        ),
      };
      setInterpretation(translatedInterpretation);
    }

    if (savedVerses.length > 0) {
      const translatedVerses = await Promise.all(
        savedVerses.map(async (verse) => ({
          ...verse,
          content: await translateContent(verse.content),
        }))
      );
      setSavedVerses(translatedVerses);
    }

    if (scriptureContent) {
      const translatedScriptureContent = await translateContent(
        scriptureContent
      );
      setScriptureContent(translatedScriptureContent);
    }
  };

  useEffect(() => {
    const translateSampleData = async () => {
      const translatedData = {
        network: {
          title: await translateContent(sampleData.network.title),
          content: await translateContent(sampleData.network.content),
        },
        summary: {
          title: await translateContent(sampleData.summary.title),
          content: await translateContent(sampleData.summary.content),
        },
        principles: {
          title: await translateContent(sampleData.principles.title),
          content: await translateContent(sampleData.principles.content),
        },
      };
      setSampleData(translatedData);
    };
    translateSampleData();
    translateAllContent();
  }, [language]);

  return (
    <div className="min-h-screen bg-[#FFFFFF] p-2 md:p-4 font-noto-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 bg-[#002B5B] p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-white">
            {language === "ja" ? "福音アシスタント" : "Gospel Assistant"}
          </h1>
          <button
            onClick={() => setLanguage((prev) => (prev === "ja" ? "en" : "ja"))}
            className="bg-white text-[#002B5B] px-4 py-2 rounded-md hover:bg-gray-100 transition duration-200"
          >
            {language === "ja" ? "English" : "日本語"}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 mb-8 border border-[#E6E6E6]">
          <div className="flex flex-col gap-4 mb-6 md:mb-8">
            <select
              className="p-3 border-2 border-[#E6E6E6] rounded-lg w-full focus:border-[#002B5B] focus:ring-2 focus:ring-[#002B5B] focus:outline-none transition duration-200 text-base md:text-lg"
              value={selectedBook}
              onChange={(e) => setSelectedBook(e.target.value)}
            >
              <option value="">
                {language === "ja" ? "書物を選択" : "Select Book"}
              </option>
              {books.map((book) => (
                <option key={book.ja} value={book.ja}>
                  {language === "ja" ? book.ja : book.en}
                </option>
              ))}
            </select>
            <select
              className="p-3 border-2 border-[#E6E6E6] rounded-lg w-full focus:border-[#002B5B] focus:ring-2 focus:ring-[#002B5B] focus:outline-none transition duration-200 text-base md:text-lg"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
            >
              <option value="">
                {language === "ja" ? "章を選択" : "Select Chapter"}
              </option>
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>
                  {language === "ja" ? `${chapter}章` : `Chapter ${chapter}`}
                </option>
              ))}
            </select>

            <div className="flex w-full gap-2">
              <input
                type="text"
                placeholder={
                  language === "ja" ? "人物名を入力" : "Enter character name"
                }
                className="p-3 border-2 border-[#E6E6E6] rounded-lg flex-grow focus:border-[#002B5B] focus:ring-2 focus:ring-[#002B5B] focus:outline-none transition duration-200 text-base md:text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={searchCharacter}
                disabled={loading}
                className="bg-[#002B5B] text-white px-4 md:px-6 rounded-lg hover:bg-[#001B3B] disabled:opacity-50 transition duration-200"
              >
                <i className="fas fa-search text-lg"></i>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
            <button
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg transition duration-200 text-sm md:text-base w-full md:w-auto ${
                activeTab === "network"
                  ? "bg-[#002B5B] text-white"
                  : "bg-[#F5F5F5] text-[#002B5B] hover:bg-[#E6E6E6]"
              }`}
              onClick={() => setActiveTab("network")}
            >
              <i className="fas fa-project-diagram mr-2"></i>
              {language === "ja" ? "人物関係図" : "Character Network"}
            </button>
            <button
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg transition duration-200 text-sm md:text-base w-full md:w-auto ${
                activeTab === "summary"
                  ? "bg-[#002B5B] text-white"
                  : "bg-[#F5F5F5] text-[#002B5B] hover:bg-[#E6E6E6]"
              }`}
              onClick={() => setActiveTab("summary")}
            >
              <i className="fas fa-book-open mr-2"></i>
              {language === "ja" ? "要約" : "Summary"}
            </button>
            <button
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg transition duration-200 text-sm md:text-base w-full md:w-auto ${
                activeTab === "principles"
                  ? "bg-[#002B5B] text-white"
                  : "bg-[#F5F5F5] text-[#002B5B] hover:bg-[#E6E6E6]"
              }`}
              onClick={() => setActiveTab("principles")}
            >
              <i className="fas fa-lightbulb mr-2"></i>
              {language === "ja" ? "原則" : "Principles"}
            </button>
          </div>

          {loading ? (
            <div className="bg-[#F5F5F5] rounded-lg p-8">
              <div className="animate-pulse">
                <div className="h-4 bg-[#E6E6E6] rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-[#E6E6E6] rounded"></div>
                  <div className="h-4 bg-[#E6E6E6] rounded w-5/6"></div>
                </div>
              </div>
              <div className="mt-4 text-[#666666]">{streamingMessage}</div>
            </div>
          ) : (
            <div className="bg-[#F5F5F5] rounded-lg p-4 md:p-8">
              <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                {searchResults ? (
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <h2 className="text-xl md:text-2xl font-bold break-words">
                        {searchResults.searchResults.name}
                      </h2>
                      <button
                        onClick={() => setSearchResults(null)}
                        className="text-[#3498db] hover:text-[#2980b9] whitespace-nowrap"
                      >
                        <i className="fas fa-arrow-left mr-2"></i>
                        {language === "ja" ? "分析に戻る" : "Back to Analysis"}
                      </button>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        {language === "ja" ? "概要" : "Overview"}
                      </h3>
                      <p className="text-gray-700 break-words leading-relaxed">
                        {searchResults.searchResults.summary}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        {language === "ja"
                          ? "重要な出来事"
                          : "Important Events"}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchResults.searchResults.actions.map(
                          (action, i) => (
                            <div
                              key={i}
                              className="bg-white p-4 rounded-lg shadow"
                            >
                              <p className="text-gray-700 break-words leading-relaxed">
                                {action.event}
                              </p>
                              <p className="text-sm text-[#3498db] mt-2">
                                {action.reference}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        {language === "ja"
                          ? "学べる原則"
                          : "Principles to Learn"}
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {searchResults.searchResults.principles.map(
                          (principle, i) => (
                            <li
                              key={i}
                              className="text-gray-700 break-words leading-relaxed"
                            >
                              {principle}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        {language === "ja"
                          ? "関連する聖句"
                          : "Related Scriptures"}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {searchResults.searchResults.references.map(
                          (ref, i) => (
                            <span
                              key={i}
                              className="bg-[#3498db] text-white px-3 py-1 rounded-full text-sm break-words"
                            >
                              {ref}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        {language === "ja"
                          ? "総大会や預言者の教え"
                          : "Conference Talks and Prophetic Teachings"}
                      </h3>
                      <div className="space-y-4">
                        {searchResults.searchResults.modernTeachings.map(
                          (teaching, i) => (
                            <div
                              key={i}
                              className="bg-white p-4 rounded-lg shadow"
                            >
                              <p className="font-semibold text-[#002B5B] mb-2">
                                {teaching.speaker}
                              </p>
                              <p className="text-gray-700 italic mb-2">
                                「{teaching.quote}」
                              </p>
                              <p className="text-sm text-[#3498db]">
                                {teaching.source}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg md:text-xl font-bold mb-4 break-words">
                      {sampleData[activeTab].title}
                    </h2>
                    {activeTab === "network" &&
                    sampleData[activeTab].characters ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold mb-2">
                            {language === "ja"
                              ? "主要な登場人物"
                              : "Main Characters"}
                          </h3>
                          <div className="space-y-2">
                            {sampleData[activeTab].characters.map((char, i) => (
                              <div
                                key={i}
                                className="break-words leading-relaxed"
                              >
                                <span className="font-bold">{char.name}:</span>{" "}
                                {char.description}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            {language === "ja"
                              ? "人物関係"
                              : "Character Relationships"}
                          </h3>
                          <div className="space-y-2">
                            {sampleData[activeTab].relationships.map(
                              (rel, i) => (
                                <div
                                  key={i}
                                  className="break-words leading-relaxed"
                                >
                                  {rel.source} → {rel.target}:{" "}
                                  {rel.relationship}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            {language === "ja" ? "背景" : "Background"}
                          </h3>
                          <div className="whitespace-pre-line break-words leading-relaxed">
                            {sampleData[activeTab].background}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            {language === "ja"
                              ? "総大会や預言者の教え"
                              : "Conference Talks and Prophetic Teachings"}
                          </h3>
                          <div className="space-y-4">
                            {sampleData[activeTab].modernTeachings.map(
                              (teaching, i) => (
                                <div
                                  key={i}
                                  className="bg-white p-4 rounded-lg shadow"
                                >
                                  <p className="font-semibold text-[#002B5B] mb-2">
                                    {teaching.speaker}
                                  </p>
                                  <p className="text-gray-700 italic mb-2">
                                    「{teaching.quote}」
                                  </p>
                                  <p className="text-sm text-[#3498db]">
                                    {teaching.source}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ) : activeTab === "summary" &&
                      sampleData[activeTab].overview ? (
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold mb-2">
                            {language === "ja"
                              ? "章の概要"
                              : "Chapter Overview"}
                          </h3>
                          <p className="text-gray-700 break-words leading-relaxed">
                            {sampleData[activeTab].overview}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            {language === "ja"
                              ? "主要な出来事"
                              : "Major Events"}
                          </h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {sampleData[activeTab].events.map((event, i) => (
                              <li
                                key={i}
                                className="text-gray-700 break-words leading-relaxed"
                              >
                                {event}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            {language === "ja"
                              ? "重要なポイント"
                              : "Key Points"}
                          </h3>
                          <ul className="list-disc pl-5 space-y-2">
                            {sampleData[activeTab].keyPoints.map((point, i) => (
                              <li
                                key={i}
                                className="text-gray-700 break-words leading-relaxed"
                              >
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-bold mb-2">
                            {language === "ja"
                              ? "総大会や預言者の教え"
                              : "Conference Talks and Prophetic Teachings"}
                          </h3>
                          <div className="space-y-4">
                            {sampleData[activeTab].modernTeachings.map(
                              (teaching, i) => (
                                <div
                                  key={i}
                                  className="bg-white p-4 rounded-lg shadow"
                                >
                                  <p className="font-semibold text-[#002B5B] mb-2">
                                    {teaching.speaker}
                                  </p>
                                  <p className="text-gray-700 italic mb-2">
                                    「{teaching.quote}」
                                  </p>
                                  <p className="text-sm text-[#3498db]">
                                    {teaching.source}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ) : activeTab === "principles" &&
                      sampleData[activeTab].principles ? (
                      <div className="space-y-6">
                        {sampleData[activeTab].principles.map((item, i) => (
                          <div key={i}>
                            <h3 className="font-bold mb-2 break-words">
                              {language === "ja"
                                ? `原則 ${i + 1}: ${item.principle}`
                                : `Principle ${i + 1}: ${item.principle}`}
                            </h3>
                            <div className="mb-3">
                              <h4 className="font-semibold mb-1">
                                {language === "ja"
                                  ? "現代への適用"
                                  : "Modern Application"}
                              </h4>
                              <p className="text-gray-700 break-words leading-relaxed">
                                {item.application}
                              </p>
                            </div>
                            <div className="mb-3">
                              <h4 className="font-semibold mb-1">
                                {language === "ja"
                                  ? "実践的な提案"
                                  : "Practical Suggestions"}
                              </h4>
                              <ul className="list-disc pl-5 space-y-2">
                                {item.practicalSteps.map((step, j) => (
                                  <li
                                    key={j}
                                    className="text-gray-700 break-words leading-relaxed"
                                  >
                                    {step}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">
                                {language === "ja"
                                  ? "総大会や預言者の教え"
                                  : "Conference Talks and Prophetic Teachings"}
                              </h4>
                              <div className="space-y-4">
                                {item.modernTeachings.map((teaching, j) => (
                                  <div
                                    key={j}
                                    className="bg-white p-4 rounded-lg shadow"
                                  >
                                    <p className="font-semibold text-[#002B5B] mb-2">
                                      {teaching.speaker}
                                    </p>
                                    <p className="text-gray-700 italic mb-2">
                                      「{teaching.quote}」
                                    </p>
                                    <p className="text-sm text-[#3498db]">
                                      {teaching.source}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="whitespace-pre-line break-words leading-relaxed">
                        {sampleData[activeTab].content}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-center mb-6 bg-red-50 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="text-center mb-8">
          {!searchResults && (
            <button
              onClick={analyzeScripture}
              disabled={loading}
              className="bg-[#002B5B] text-white px-8 py-3 rounded-lg hover:bg-[#001B3B] disabled:opacity-50 transition duration-200 text-lg"
            >
              {loading
                ? language === "ja"
                  ? "分析中..."
                  : "Analyzing..."
                : language === "ja"
                ? "分析する"
                : "Analyze"}
            </button>
          )}
        </div>

        {savedVerses.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-lg p-8 border border-[#E6E6E6]">
            <h2 className="text-2xl font-bold text-[#002B5B] mb-6">
              {language === "ja"
                ? "保存された聖句と意見"
                : "Saved Verses and Opinions"}
            </h2>
            <div className="space-y-6">
              {savedVerses.map((verse, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#F5F5F5] rounded-lg border border-[#E6E6E6]"
                >
                  <div className="font-bold mb-3 text-[#002B5B]">
                    {verse.book} {verse.chapter}章
                  </div>
                  <p className="text-[#333333] mb-4">{verse.content}</p>
                  <textarea
                    className="w-full p-4 border-2 border-[#E6E6E6] rounded-lg focus:border-[#002B5B] focus:ring-2 focus:ring-[#002B5B] focus:outline-none transition duration-200"
                    placeholder={
                      language === "ja"
                        ? "この聖句についての意見を書く"
                        : "Write your opinion about this verse"
                    }
                    value={verse.notes}
                    onChange={async (e) => {
                      if (db) {
                        const updatedVerse = {
                          ...verse,
                          notes: e.target.value,
                        };
                        await db.verses.update(verse.id, updatedVerse);
                        loadSavedVerses();
                      }
                    }}
                  />
                  <div className="text-sm text-[#666666] mt-3">
                    {new Date(verse.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-lg p-8 border border-[#E6E6E6]">
          <h2 className="text-2xl font-bold text-[#002B5B] mb-6">
            {language === "ja" ? "たとえ話の解釈" : "Parable Interpretation"}
          </h2>
          <textarea
            className="w-full p-4 border-2 border-[#E6E6E6] rounded-lg mb-6 h-32 focus:border-[#002B5B] focus:ring-2 focus:ring-[#002B5B] focus:outline-none transition duration-200"
            placeholder={
              language === "ja"
                ? "解釈したいたとえ話や抽象的な話を入力してください"
                : "Enter a parable or abstract story for interpretation"
            }
            value={parable}
            onChange={(e) => setParable(e.target.value)}
          />
          <button
            onClick={interpretParable}
            disabled={loading}
            className="bg-[#002B5B] text-white px-6 py-3 rounded-lg hover:bg-[#001B3B] disabled:opacity-50 transition duration-200 w-full text-lg"
          >
            {loading
              ? language === "ja"
                ? "解釈中..."
                : "Interpreting..."
              : language === "ja"
              ? "解釈する"
              : "Interpret"}
          </button>
          {interpretation && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4 text-[#002B5B]">
                {language === "ja" ? "解釈" : "Interpretation"}
              </h3>
              <div className="bg-[#F5F5F5] rounded-lg p-6 border border-[#E6E6E6]">
                <h4 className="font-bold mb-3 text-[#002B5B]">
                  {language === "ja" ? "象徴的な意味" : "Symbolic Meaning"}
                </h4>
                <p className="mb-6 text-[#333333]">
                  {interpretation.symbolism}
                </p>
                <h4 className="font-bold mb-3 text-[#002B5B]">
                  {language === "ja" ? "現代的な適用" : "Modern Application"}
                </h4>
                <p className="mb-6 text-[#333333]">
                  {interpretation.modernApplication}
                </p>
                <h4 className="font-bold mb-3 text-[#002B5B]">
                  {language === "ja" ? "歴史的背景" : "Historical Context"}
                </h4>
                <p className="text-[#333333]">
                  {interpretation.historicalContext}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainComponent;