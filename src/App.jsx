import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Biohazard, RotateCcw, Star } from "lucide-react";

const scenes = [
  {
    title: "Gudang Berdebu",
    emoji: "🏚️",
    story: "Kamu masuk ke gudang tua yang jarang dibersihkan. Ada tanda-tanda tikus dan banyak barang menumpuk.",
    dangers: [
      {
        id: "kotoran",
        label: "Kotoran tikus",
        x: "25%",
        y: "62%",
        info: "Kotoran tikus bisa menjadi sumber risiko jika debunya terhirup.",
      },
      {
        id: "sapu",
        label: "Sapu kering",
        x: "70%",
        y: "68%",
        info: "Menyapu kering dapat membuat debu beterbangan.",
      },
      {
        id: "makanan",
        label: "Makanan terbuka",
        x: "76%",
        y: "38%",
        info: "Makanan terbuka bisa menarik tikus masuk.",
      },
    ],
    question: "Apa tindakan paling aman sebelum membersihkan gudang?",
    choices: [
      {
        text: "Pakai masker dan sarung tangan, semprot disinfektan, lalu bersihkan perlahan",
        correct: true,
      },
      {
        text: "Langsung sapu kering agar cepat bersih",
        correct: false,
      },
    ],
  },
  {
    title: "Dapur Warga",
    emoji: "🍽️",
    story: "Di dapur, ada sampah terbuka, celah pintu, dan bahan makanan yang tidak tertutup rapat.",
    dangers: [
      {
        id: "sampah",
        label: "Sampah terbuka",
        x: "27%",
        y: "68%",
        info: "Sampah terbuka dapat menarik tikus.",
      },
      {
        id: "celah",
        label: "Celah masuk tikus",
        x: "60%",
        y: "58%",
        info: "Celah kecil bisa menjadi jalur masuk tikus.",
      },
      {
        id: "beras",
        label: "Makanan tidak tertutup",
        x: "78%",
        y: "40%",
        info: "Makanan perlu disimpan dalam wadah tertutup.",
      },
    ],
    question: "Pesan penyuluhan yang paling tepat adalah...",
    choices: [
      {
        text: "Tutup makanan, buang sampah rutin, dan tutup celah rumah",
        correct: true,
      },
      {
        text: "Cukup semprot parfum supaya tikus pergi",
        correct: false,
      },
    ],
  },
  {
    title: "Warga Bergejala",
    emoji: "🤒",
    story: "Seorang warga demam, lemas, nyeri otot, dan sebelumnya membersihkan gudang yang banyak kotoran tikus.",
    dangers: [
      {
        id: "demam",
        label: "Demam dan lemas",
        x: "33%",
        y: "42%",
        info: "Gejala awal dapat mirip flu, jadi riwayat paparan penting ditanyakan.",
      },
      {
        id: "paparan",
        label: "Riwayat paparan tikus",
        x: "60%",
        y: "65%",
        info: "Paparan area dengan tanda tikus adalah clue penting.",
      },
      {
        id: "sesak",
        label: "Waspada sesak napas",
        x: "76%",
        y: "38%",
        info: "Jika muncul sesak napas, segera cari pertolongan medis.",
      },
    ],
    question: "Apa edukasi akhir yang paling aman?",
    choices: [
      {
        text: "Segera ke fasilitas kesehatan jika gejala memburuk atau muncul sesak napas",
        correct: true,
      },
      {
        text: "Anggap semua demam pasti biasa saja",
        correct: false,
      },
    ],
  },
];

export default function App() {
  const [screen, setScreen] = useState("start");
  const [sceneIndex, setSceneIndex] = useState(0);
  const [found, setFound] = useState([]);
  const [score, setScore] = useState(0);
  const [risk, setRisk] = useState(60);
  const [message, setMessage] = useState("");
  const [answered, setAnswered] = useState(false);

  const scene = scenes[sceneIndex];

  function clickDanger(danger) {
    if (found.includes(danger.id)) return;
    setFound([...found, danger.id]);
    setScore(score + 20);
    setRisk(Math.max(risk - 5, 0));
    setMessage(`Clue ditemukan: ${danger.label}. ${danger.info}`);
  }

  function choose(choice) {
    if (answered) return;
    setAnswered(true);

    if (choice.correct) {
      setScore(score + 100);
      setRisk(Math.max(risk - 25, 0));
      setMessage("Benar! Edukasi kamu membantu menurunkan risiko hantavirus.");
    } else {
      setRisk(Math.min(risk + 20, 100));
      setMessage("Kurang tepat. Pilih tindakan yang mencegah kontak dengan tikus dan debu terkontaminasi.");
    }
  }

  function nextScene() {
    if (sceneIndex < scenes.length - 1) {
      setSceneIndex(sceneIndex + 1);
      setFound([]);
      setMessage("");
      setAnswered(false);
    } else {
      setScreen("result");
    }
  }

  function restart() {
    setScreen("start");
    setSceneIndex(0);
    setFound([]);
    setScore(0);
    setRisk(60);
    setMessage("");
    setAnswered(false);
  }

  if (screen === "start") {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <section className="max-w-5xl grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-cyan-400/10 text-cyan-200 border border-cyan-300/20 rounded-full px-4 py-2 font-bold">
              <Biohazard size={18} /> Game Penyuluhan Hantavirus
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Hanta Alert
              <span className="block text-cyan-300">Outbreak Quest</span>
            </h1>
            <p className="text-slate-300 text-lg">
              Cari bahaya di lingkungan, pilih tindakan pencegahan, dan turunkan risiko hantavirus.
            </p>
            <button
              onClick={() => setScreen("game")}
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-2xl px-8 py-4 transition"
            >
              Mulai Game
            </button>
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-white/10 border border-white/10 rounded-[2rem] p-8 shadow-2xl"
          >
            <div className="text-8xl text-center mb-6">🏠🐭</div>
            <div className="bg-slate-900 rounded-3xl p-5 space-y-3">
              <p className="font-black text-2xl">Misi Kamu</p>
              <p className="text-slate-300">Klik tanda bahaya, baca edukasi, lalu pilih tindakan yang benar.</p>
            </div>
          </motion.div>
        </section>
      </main>
    );
  }

  if (screen === "result") {
    const badge = score >= 420 ? "Hanta Defender" : score >= 300 ? "Health Hero" : "Junior Investigator";

    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <section className="max-w-2xl w-full text-center bg-white/10 border border-white/10 rounded-[2rem] p-8 shadow-2xl">
          <div className="text-7xl mb-4">🏆</div>
          <p className="text-cyan-300 font-bold">Mission Complete</p>
          <h1 className="text-5xl font-black mt-2">{badge}</h1>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-slate-900 rounded-3xl p-5">
              <p className="text-slate-400">Skor</p>
              <p className="text-4xl font-black text-amber-300">{score}</p>
            </div>
            <div className="bg-slate-900 rounded-3xl p-5">
              <p className="text-slate-400">Sisa Risiko</p>
              <p className="text-4xl font-black text-rose-300">{risk}%</p>
            </div>
          </div>
          <p className="mt-6 text-slate-300">
            Edukasi utama: hindari kontak dengan tikus, tutup makanan, buang sampah rutin, gunakan APD, dan jangan menyapu kering area berisiko.
          </p>
          <button
            onClick={restart}
            className="mt-7 inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-2xl px-7 py-4 transition"
          >
            <RotateCcw size={18} /> Main Lagi
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-5 md:p-8">
      <section className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-cyan-300 font-bold">Scene {sceneIndex + 1}/{scenes.length}</p>
            <h1 className="text-3xl md:text-5xl font-black">{scene.title}</h1>
          </div>
          <div className="grid grid-cols-2 gap-3 min-w-[260px]">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-slate-400">Skor</p>
              <p className="text-2xl font-black text-amber-300 flex items-center gap-2"><Star size={20} /> {score}</p>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-slate-400">Risiko</p>
              <p className="text-2xl font-black text-rose-300">{risk}%</p>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <section className="bg-white/10 border border-white/10 rounded-[2rem] p-5 shadow-2xl">
            <p className="text-slate-300 mb-4">{scene.story}</p>

            <div className="relative min-h-[430px] rounded-[2rem] overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 p-5">
              <div className="text-8xl absolute right-8 top-8">{scene.emoji}</div>
              <div className="grid grid-cols-3 gap-5 text-6xl text-center mt-32 opacity-90">
                <div>📦</div>
                <div>🐭</div>
                <div>🧹</div>
                <div>🗑️</div>
                <div>🧤</div>
                <div>🥫</div>
              </div>

              {scene.dangers.map((danger) => {
                const active = found.includes(danger.id);
                return (
                  <button
                    key={danger.id}
                    onClick={() => clickDanger(danger)}
                    style={{ left: danger.x, top: danger.y }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-3 border shadow-lg transition hover:scale-110 ${
                      active
                        ? "bg-emerald-400 text-slate-950 border-emerald-200"
                        : "bg-amber-300/20 text-amber-100 border-amber-300/50"
                    }`}
                  >
                    <AlertTriangle size={22} />
                  </button>
                );
              })}
            </div>
          </section>

          <aside className="bg-white/10 border border-white/10 rounded-[2rem] p-5 shadow-2xl space-y-5">
            <div>
              <p className="text-cyan-300 font-bold">Clue ditemukan</p>
              <p className="text-4xl font-black">{found.length}/{scene.dangers.length}</p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <p className="font-bold text-rose-200">Infection Risk</p>
                <p className="font-black text-rose-300">{risk}%</p>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${risk}%` }}
                  className="h-full bg-rose-400 rounded-full"
                />
              </div>
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-cyan-400/10 border border-cyan-300/20 text-cyan-100 rounded-2xl p-4 text-sm"
              >
                {message}
              </motion.div>
            )}

            <div>
              <h2 className="text-2xl font-black mb-3">{scene.question}</h2>
              <div className="space-y-3">
                {scene.choices.map((choice, index) => (
                  <button
                    key={choice.text}
                    onClick={() => choose(choice)}
                    disabled={answered}
                    className="w-full text-left bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-cyan-300/50 rounded-2xl p-4 transition disabled:opacity-70"
                  >
                    <span className="text-cyan-300 font-black mr-2">{index + 1}.</span>
                    {choice.text}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={nextScene}
              disabled={!answered}
              className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-2xl py-4 transition disabled:opacity-40"
            >
              {sceneIndex < scenes.length - 1 ? "Lanjut" : "Lihat Hasil"}
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
}
