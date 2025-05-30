import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const quotes = [
  "十年磨一剑，只为今朝露锋芒！",
  "乾坤未定，你我皆是黑马！",
  "不负韶华，不惧挑战，高考加油！",
  "一笔一划皆是梦想的伏笔。",
  "所有努力终将成就不凡！",
  "沉着冷静，稳扎稳打，你就是考场王者！",
  "今日拼搏，明日辉煌！",
  "知识改变命运，高考成就未来！",
  "心之所向，素履以往！",
  "青春无悔，奋斗最美！",
  "每一分努力都值得被看见！",
  "考场如战场，你就是最勇敢的战士！",
  "相信自己，你就是奇迹的创造者！",
  "坚持到最后，胜利属于你！",
  "梦想的翅膀，终将带你翱翔！",
  "今日的汗水，明日的微笑！",
  "沉着应战，稳中求胜！",
  "你的努力，时间看得见！",
  "高考不是终点，而是新的起点！",
  "全力以赴，不留遗憾！",
  "你的潜力超乎你的想象！",
  "静心答题，细心检查！",
  "每一道题都是通往梦想的阶梯！",
  "保持平常心，发挥超常水平！",
  "你的名字值得出现在录取通知书上！",
  "今日的拼搏，是为了明天的骄傲！",
  "考场上的每一分钟都价值千金！",
  "你的坚持，终将美好！",
  "高考只是人生的一次小测验！",
  "沉着冷静，思路清晰！",
  "你的未来由你书写！",
  "每一分努力都在为成功铺路！",
  "相信自己，你就是最棒的！",
  "今日的付出，明日的收获！",
  "考场如舞台，你就是主角！",
  "保持微笑，轻松应考！",
  "你的努力终将开花结果！",
  "沉着冷静，思路清晰！",
  "高考只是人生的一次小测验！",
  "你的未来由你书写！",
  "每一分努力都在为成功铺路！",
  "相信自己，你就是最棒的！",
  "今日的付出，明日的收获！",
  "考场如舞台，你就是主角！",
  "保持微笑，轻松应考！",
  "你的努力终将开花结果！",
  "沉着冷静，思路清晰！",
  "高考只是人生的一次小测验！",
  "你的未来由你书写！",
  "每一分努力都在为成功铺路！"
];

const musicFiles = [
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music1.mp3",
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music2.mp3",
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music3.mp3",
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music4.mp3",
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music5.mp3",
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music6.mp3",
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music7.mp3",
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music8.mp3",
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music9.mp3",
  "https://nephen-blog.oss-cn-beijing.aliyuncs.com/post/bg-music10.mp3"
];

export default function App() {
  const [quote, setQuote] = useState(() => {
    const idx = Math.floor(Math.random() * quotes.length);
    return quotes[idx];
  });
  const [countdown, setCountdown] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => {
    const randomIndex = Math.floor(Math.random() * musicFiles.length);
    return new Audio(musicFiles[randomIndex]);
  });

  // 🎯 许愿相关
  const [wishInput, setWishInput] = useState("");
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    const fetchWishes = async () => {
      try {
        const response = await fetch("https://wx.nephen.cn/wxMessageBoard/getgaokaowish");
        if (response.ok) {
          const data = await response.json();
          setWishes(data.map(item => ({
            text: item.content,
            color: getRandomColor()
          })));
        }
      } catch (error) {
        console.error("获取愿望失败:", error);
      }
    };
    fetchWishes();
  }, []);

  const getRandomColor = () => {
    const colors = ["#f87171", "#60a5fa", "#34d399", "#facc15", "#f472b6"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const randomIndex = Math.floor(Math.random() * musicFiles.length);
      audio.src = musicFiles[randomIndex];
      audio.play().then(() => setIsPlaying(true))
        .catch(() => console.log("需要用户交互才能播放音乐"));
    }
  };

  // 倒计时
  useEffect(() => {
    const target = new Date("2025-06-07T09:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const diff = target - now;
      if (diff <= 0) {
        clearInterval(timer);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.4;
    audio.play().catch(() => {
      console.log("等待用户交互以播放音乐");
    });
  }, [audio]);

  const newQuote = () => {
    const idx = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[idx]);
  };

  const handleWishSubmit = async (e) => {
    e.preventDefault();
    if (wishInput.trim()) {
      try {
        const response = await fetch("https://wx.nephen.cn/wxMessageBoard/newgaokaowish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: wishInput.trim()
          })
        });

        if (response.ok) {
          const newWishes = [
            { text: wishInput.trim(), color: getRandomColor() },
            ...wishes,
          ].slice(0, 20);
          setWishes(newWishes);
          setWishInput("");
          triggerFireworks();
        } else {
          console.error("提交愿望失败");
        }
      } catch (error) {
        console.error("网络错误:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <Fireworks />
      <motion.button
        onClick={toggleAudio}
        className="text-lg bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-full shadow-lg mb-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? (
          <>⏸ <span className="ml-2">暂停音乐</span></>
        ) : (
          <>▶️ <span className="ml-2">播放音乐</span></>
        )}
      </motion.button>

      <motion.h1
        className="text-5xl font-bold mb-6 text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        高考加油！你是最棒的！🎓
      </motion.h1>

      <motion.div
        className="text-2xl font-semibold text-center mb-6"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {countdown.days} 天 {countdown.hours} 小时 {countdown.minutes} 分{" "}
        {countdown.seconds} 秒
      </motion.div>

      <motion.div
        className="bg-white text-indigo-900 p-6 rounded-2xl shadow-lg max-w-xl text-center text-xl font-bold mb-6"
        whileHover={{ scale: 1.05 }}
      >
        {quote}
      </motion.div>

      <button 
        onClick={newQuote} 
        className="text-lg mb-8 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        ✨ 换一句鼓励语
      </button>

      {/* 🎯 许愿区域 */}
      <form
        onSubmit={handleWishSubmit}
        className="flex flex-col items-center space-y-4 mb-8 w-full max-w-md"
      >
        <motion.input
          type="text"
          value={wishInput}
          onChange={(e) => setWishInput(e.target.value)}
          placeholder="输入你的高考愿望..."
          className="w-full p-3 rounded-lg text-indigo-900"
          whileFocus={{ scale: 1.05 }}
        />
        <button 
          type="submit" 
          className="w-full text-lg bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          🎈 许愿！
        </button>
      </form>

      {/* 考前注意事项 */}
      <motion.div 
        className="w-full max-w-md bg-white bg-opacity-20 p-4 rounded-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-xl font-bold mb-2">📝 考前小贴士</h3>
        <ul className="space-y-2 text-sm">
          <li>✅ 提前准备好准考证、身份证和考试用品</li>
          <li>✅ 考前保证充足睡眠，调整好生物钟</li>
          <li>✅ 饮食清淡，避免生冷食物</li>
          <li>✅ 提前熟悉考场路线和位置</li>
          <li>✅ 保持平和心态，相信自己</li>
        </ul>
      </motion.div>

      {/* 心理调节 */}
      <motion.div 
        className="w-full max-w-md bg-white bg-opacity-20 p-4 rounded-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-xl font-bold mb-2">🧠 心理调节</h3>
        <ul className="space-y-2 text-sm">
          <li>💆 深呼吸缓解紧张情绪</li>
          <li>🧘 考前做简单伸展运动</li>
          <li>📝 写下焦虑点然后撕掉</li>
          <li>🤗 和家长/老师聊聊放松心情</li>
        </ul>
      </motion.div>

      {/* 答题技巧 */}
      <motion.div 
        className="w-full max-w-md bg-white bg-opacity-20 p-4 rounded-lg mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-xl font-bold mb-2">✍️ 答题技巧</h3>
        <ul className="space-y-2 text-sm">
          <li>📖 先浏览全卷，合理分配时间</li>
          <li>✏️ 选择题先排除明显错误选项</li>
          <li>📝 主观题分点作答，条理清晰</li>
          <li>⏱️ 留10分钟检查答题卡</li>
        </ul>
      </motion.div>

      <div className="w-full max-w-md space-y-2 max-h-80 overflow-y-auto">
        {/* 弹幕形式的愿望列表 */}
        <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {wishes.map((wish, idx) => {
          const top = `${10 + (idx % 10) * 8}%`; // 避免重叠，高度分布更合理
          const duration = 15 + Math.random() * 10; // 更自然的时长
          const offset = window.innerWidth + 400; // 保证完全滑出视图

          return (
            <motion.div
              key={idx}
              className="absolute whitespace-nowrap text-lg font-semibold px-2 py-1 rounded-full"
              style={{
                color: wish.color,
                top,
                left: "100vw",
                textShadow: "0 0 5px rgba(0,0,0,0.5)",
                whiteSpace: "nowrap"
              }}
              initial={{ x: 0 }}
              animate={{
                x: -offset,
                transition: {
                  duration,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear"
                }
              }}
            >
              🎯 {wish.text}
            </motion.div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

function Fireworks() {
  useEffect(() => {
    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    function createParticle(x, y) {
      for (let i = 0; i < 30; i++) {
        particles.push({
          x,
          y,
          radius: Math.random() * 2 + 1,
          dx: Math.cos((i * 12 * Math.PI) / 180) * (Math.random() * 4),
          dy: Math.sin((i * 12 * Math.PI) / 180) * (Math.random() * 4),
          life: 100,
          color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life -= 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        if (p.life <= 0) particles.splice(i, 1);
      });
      requestAnimationFrame(animate);
    }

    animate();

    // 公开触发函数
    window.createParticle = createParticle;
  }, []);

  return (
    <canvas
      id="fireworks"
      className="fixed top-0 left-0 pointer-events-none z-10"
    />
  );
}

// 触发烟花（中心位置）
function triggerFireworks() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  window.createParticle(centerX, centerY);
}
