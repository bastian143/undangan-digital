"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  Music, 
  Music2,
  Copy, 
  CheckCircle2, 
  Send,
  Map,
  Share2
} from "lucide-react";

interface TemplateProps {
  data: {
    groomName: string;
    groomFullName: string;
    groomPhoto: string;
    groomParents: string;
    groomChildOrder?: string;
    brideName: string;
    brideFullName: string;
    bridePhoto: string;
    brideParents: string;
    brideChildOrder?: string;
    events: { name: string; date: string; time: string; endTime?: string; location: string; address: string; mapUrl: string; mapEmbedUrl?: string; }[];
    gallery: string[];
    couplePhoto?: string;
    loveStory: { date: string; title: string; description: string; photo?: string; }[];
    quote: string;
    quoteSource: string;
    musicUrl: string;
    musicTitle?: string;
    giftAccounts: { bank: string; accountNumber: string; accountName: string; }[];
    giftAddress?: string;
    language: string;
    customSlug: string;
  };
  guestName?: string;
  isPreview?: boolean;
}

export default function ElegantRoseTemplate({ data, guestName, isPreview }: TemplateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName || "");
  const [rsvpStatus, setRsvpStatus] = useState("hadir");
  const [rsvpGuests, setRsvpGuests] = useState("1");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Wishes Form State
  const [wishName, setWishName] = useState(guestName || "");
  const [wishMessage, setWishMessage] = useState("");
  const [wishes, setWishes] = useState([
    { name: "Andi & Keluarga", message: "Selamat menempuh hidup baru! Semoga samawa.", time: "1 jam yang lalu" },
    { name: "Budi Santoso", message: "Lancar sampai hari H yaa!", time: "3 jam yang lalu" }
  ]);

  useEffect(() => {
    // Only set up audio if window is defined
    if (typeof window !== 'undefined' && data.musicUrl) {
      audioRef.current = new Audio(data.musicUrl);
      audioRef.current.loop = true;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [data.musicUrl]);

  useEffect(() => {
    if (isOpen && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(e => console.log("Audio autoplay failed:", e));
    }
  }, [isOpen]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (!data.events || data.events.length === 0) return;
    
    const targetDate = new Date(data.events[0].date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [data.events]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(text);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName || !wishMessage) return;
    
    setWishes([{
      name: wishName,
      message: wishMessage,
      time: "Baru saja"
    }, ...wishes]);
    
    setWishMessage("");
  };

  // Styles
  const bgCream = "bg-[#FFF8F0]";
  const textBrown = "text-[#3D2B1F]";
  const textRose = "text-[#D4A5A5]";
  const bgRose = "bg-[#D4A5A5]";
  const textGold = "text-[#C9A96E]";
  const borderGold = "border-[#C9A96E]";

  const sectionClass = "py-16 px-6 relative overflow-hidden";
  const titleClass = `font-serif text-3xl md:text-4xl text-center mb-8 ${textRose}`;

  return (
    <div className={`min-h-screen ${bgCream} ${textBrown} font-sans selection:bg-[#D4A5A5] selection:text-white max-w-md mx-auto shadow-2xl relative`}>
      
      {/* Floating Music Button */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg ${bgRose} text-white`}
            onClick={toggleMusic}
          >
            {isPlaying ? <Music className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '3s' }} /> : <Music2 className="w-6 h-6" />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cover Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${bgCream} max-w-md mx-auto shadow-2xl`}
          >
            <div className="absolute top-0 left-0 w-32 h-32 opacity-30 pointer-events-none">
              {/* Floral top left corner */}
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,0 L100,0 C100,55.228 55.228,100 0,100 L0,0 Z" fill="#D4A5A5" />
              </svg>
            </div>
            
            <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30 pointer-events-none">
              {/* Floral bottom right corner */}
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100,100 L0,100 C0,44.772 44.772,0 100,0 L100,100 Z" fill="#D4A5A5" />
              </svg>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center z-10"
            >
              <h4 className="uppercase tracking-widest text-sm mb-4 text-[#C9A96E]">The Wedding Of</h4>
              <h1 className={`font-serif text-5xl mb-6 ${textRose}`}>{data.brideName} & {data.groomName}</h1>
              
              <div className="mt-12 mb-8">
                <p className="text-sm mb-2 opacity-70">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <h3 className="font-bold text-xl">{guestName || "Tamu Undangan"}</h3>
              </div>

              <button 
                onClick={() => setIsOpen(true)}
                className={`mt-4 px-8 py-3 rounded-full ${bgRose} text-white font-medium flex items-center justify-center mx-auto hover:bg-opacity-90 transition shadow-md`}
              >
                <Heart className="w-4 h-4 mr-2" /> Buka Undangan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content (Only shows after cover opens) */}
      <div className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        
        {/* Hero Section */}
        <section className={`min-h-[80vh] flex flex-col items-center justify-center text-center p-6 relative`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="z-10"
          >
            <h4 className={`uppercase tracking-[0.2em] text-sm mb-4 ${textGold}`}>Pernikahan</h4>
            <div className={`w-48 h-48 mx-auto rounded-t-full border-4 ${borderGold} p-1 mb-6 overflow-hidden`}>
              <div className="w-full h-full rounded-t-full bg-gradient-to-br from-[#D4A5A5] to-[#C9A96E] opacity-50 flex items-center justify-center">
                 {/* Placeholder for couple photo */}
                 <Heart className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className={`font-serif text-5xl mb-2 ${textRose}`}>{data.brideName} & {data.groomName}</h1>
            <p className="mt-4 text-sm max-w-xs mx-auto italic">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."
            </p>
          </motion.div>
        </section>

        {/* Profile Section */}
        <section className={sectionClass}>
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
          >
            <h2 className={titleClass}>Mempelai</h2>
            
            <div className="flex flex-col gap-12 mt-8">
              {/* Bride */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-[#D4A5A5] to-[#FFF8F0] border-2 border-[#C9A96E] p-1 mb-4 flex items-center justify-center">
                   {/* Bride Photo Placeholder */}
                </div>
                <h3 className={`font-serif text-2xl ${textRose}`}>{data.brideFullName}</h3>
                <p className="text-sm mt-2 opacity-80">{data.brideChildOrder}</p>
                <p className="text-sm font-semibold mt-1">{data.brideParents}</p>
              </motion.div>

              <div className="flex justify-center items-center">
                <span className={`text-5xl font-serif ${textGold}`}>&</span>
              </div>

              {/* Groom */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-[#D4A5A5] to-[#FFF8F0] border-2 border-[#C9A96E] p-1 mb-4 flex items-center justify-center">
                   {/* Groom Photo Placeholder */}
                </div>
                <h3 className={`font-serif text-2xl ${textRose}`}>{data.groomFullName}</h3>
                <p className="text-sm mt-2 opacity-80">{data.groomChildOrder}</p>
                <p className="text-sm font-semibold mt-1">{data.groomParents}</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Countdown Section */}
        <section className={`${sectionClass} bg-[#D4A5A5] bg-opacity-10`}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className={titleClass}>Menuju Hari Bahagia</h2>
            
            <div className="flex justify-center gap-4 mt-8">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-16 h-16 ${bgRose} text-white rounded-lg flex items-center justify-center text-2xl font-bold shadow-md`}>
                    {item.value}
                  </div>
                  <span className="text-xs mt-2 font-medium uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Events Section */}
        <section className={sectionClass}>
          <h2 className={titleClass}>Acara</h2>
          
          <div className="space-y-8 mt-8">
            {data.events.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`bg-white rounded-2xl p-6 shadow-lg border-t-4 ${borderGold}`}
              >
                <h3 className={`text-xl font-serif font-bold mb-4 text-center ${textRose}`}>{event.name}</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className={`w-5 h-5 ${textGold}`} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className={`w-5 h-5 ${textGold}`} />
                    <span>{event.time} {event.endTime ? `- ${event.endTime}` : 'selesai'}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 ${textGold} flex-shrink-0 mt-0.5`} />
                    <div>
                      <p className="font-semibold">{event.location}</p>
                      <p className="opacity-70 mt-1">{event.address}</p>
                    </div>
                  </div>
                </div>

                <a 
                  href={event.mapUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`mt-6 w-full block text-center py-2 rounded-lg border border-[#C9A96E] ${textGold} hover:bg-[#C9A96E] hover:text-white transition`}
                >
                  Lihat Lokasi
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className={`${sectionClass} bg-[#D4A5A5] bg-opacity-10`}>
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
          >
            <h2 className={titleClass}>Galeri</h2>
            
            <div className="grid grid-cols-2 gap-2 mt-6">
               {/* Mock Gallery */}
               {[1,2,3,4].map((item) => (
                 <div key={item} className={`aspect-square rounded-lg bg-gradient-to-br from-[#D4A5A5] to-[#FFF8F0] opacity-60`}></div>
               ))}
            </div>
          </motion.div>
        </section>

        {/* Love Story */}
        <section className={sectionClass}>
          <h2 className={titleClass}>Kisah Cinta</h2>
          
          <div className="relative mt-8 pl-6 border-l-2 border-[#D4A5A5]">
            {data.loveStory.map((story, idx) => (
              <motion.div 
                key={idx}
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-8 relative"
              >
                <div className={`absolute -left-[31px] w-4 h-4 rounded-full ${bgRose} border-2 border-white`}></div>
                <span className={`text-xs font-bold ${textGold}`}>{story.date}</span>
                <h3 className="font-bold text-lg mt-1">{story.title}</h3>
                <p className="text-sm mt-2 opacity-80 leading-relaxed">{story.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quote */}
        <section className={`${sectionClass} bg-white text-center`}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Heart className={`w-8 h-8 mx-auto mb-4 ${textRose} opacity-50`} />
            <p className="font-serif italic text-lg leading-relaxed px-4">
              "{data.quote}"
            </p>
            <p className={`mt-4 font-bold text-sm ${textGold}`}>{data.quoteSource}</p>
          </motion.div>
        </section>

        {/* RSVP Form */}
        <section className={sectionClass}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`bg-[#D4A5A5] bg-opacity-10 p-6 rounded-2xl`}
          >
            <h2 className={titleClass}>Konfirmasi Kehadiran</h2>
            
            {rsvpSubmitted ? (
              <div className="text-center p-4">
                <CheckCircle2 className="w-12 h-12 mx-auto text-green-500 mb-2" />
                <p className="font-bold">Terima Kasih!</p>
                <p className="text-sm">Konfirmasi Anda telah kami terima.</p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1 font-medium">Nama</label>
                  <input 
                    type="text" 
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4A5A5]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1 font-medium">Kehadiran</label>
                  <select 
                    value={rsvpStatus}
                    onChange={(e) => setRsvpStatus(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4A5A5]"
                  >
                    <option value="hadir">Hadir</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                  </select>
                </div>

                {rsvpStatus === "hadir" && (
                  <div>
                    <label className="block text-sm mb-1 font-medium">Jumlah Orang</label>
                    <select 
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#D4A5A5]"
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang</option>
                    </select>
                  </div>
                )}

                <button 
                  type="submit"
                  className={`w-full py-3 rounded-lg ${bgRose} text-white font-bold mt-4 shadow-md hover:bg-opacity-90`}
                >
                  Kirim Konfirmasi
                </button>
              </form>
            )}
          </motion.div>
        </section>

        {/* Wishes */}
        <section className={sectionClass}>
          <h2 className={titleClass}>Ucapan & Doa</h2>
          
          <form onSubmit={handleWishSubmit} className="mb-8">
            <input 
              type="text" 
              placeholder="Nama Anda"
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-t-lg border border-gray-300 border-b-0 focus:outline-none"
            />
            <textarea 
              placeholder="Tulis ucapan atau doa..."
              value={wishMessage}
              onChange={(e) => setWishMessage(e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 focus:outline-none"
            />
            <button 
              type="submit"
              className={`w-full py-2 rounded-b-lg ${bgRose} text-white font-medium flex items-center justify-center gap-2`}
            >
              <Send className="w-4 h-4" /> Kirim Ucapan
            </button>
          </form>

          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {wishes.map((wish, idx) => (
              <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <p className="font-bold text-sm">{wish.name}</p>
                <p className="text-xs text-gray-500 mb-2">{wish.time}</p>
                <p className="text-sm opacity-90">{wish.message}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gift / Amplop Digital */}
        <section className={`${sectionClass} bg-[#D4A5A5] bg-opacity-10 text-center`}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={titleClass}>Kirim Hadiah</h2>
            <p className="text-sm mb-6 opacity-80">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui:</p>

            <div className="space-y-4">
              {data.giftAccounts.map((account, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-md border-t-2 border-[#C9A96E]">
                  <p className="font-bold text-lg">{account.bank}</p>
                  <p className="font-mono text-xl tracking-wider my-2">{account.accountNumber}</p>
                  <p className="text-sm mb-4">a.n {account.accountName}</p>
                  
                  <button 
                    onClick={() => handleCopy(account.accountNumber)}
                    className="mx-auto flex items-center gap-2 text-sm px-4 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                  >
                    {copiedAccount === account.accountNumber ? (
                      <><CheckCircle2 className="w-4 h-4 text-green-500" /> Tersalin</>
                    ) : (
                      <><Copy className="w-4 h-4" /> Salin No. Rekening</>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center bg-[#3D2B1F] text-white relative">
          <p className="font-serif text-2xl mb-4 text-[#C9A96E]">{data.brideName} & {data.groomName}</p>
          <p className="text-xs opacity-70">Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.</p>
          <p className="text-xs mt-8 opacity-50">Powered by Grativy Invitation</p>
        </footer>

      </div>
    </div>
  );
}
