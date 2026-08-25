import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5 + 0.5;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
      }
    }
    
    const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            const opacity = 1 - distance / 150;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    // Full screen background
    <div className="relative min-h-screen w-full bg-red-800 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      
      {/* Particle Animation Background */}
      <ParticleBackground />

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-[420px] bg-background rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
        
        {/* Card Header */}
        <div className="bg-red-700 pt-10 pb-7 px-8 flex flex-col items-center text-white text-center">
          <div className="w-14 h-14 bg-background rounded-full flex items-center justify-center shadow-lg mb-4 transform transition-transform hover:scale-105 duration-300">
            <Zap className="text-red-600" size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            ផ្ទាំងគ្រប់គ្រងគម្រោង
          </h1>
          <p className="text-white/80 text-sm font-medium mt-1">
            ចូលគណនីផ្ទាំងគ្រប់គ្រងរបស់អ្នក
          </p>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8">
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground/80">
                អាសយដ្ឋានអ៊ីមែល
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com" 
                className="w-full px-3.5 py-2.5 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all placeholder:text-muted-foreground"
              />
            </div>
            
            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-foreground/80">
                ពាក្យសម្ងាត់
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  className="w-full pl-3.5 pr-10 py-2.5 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
                  aria-label={showPassword ? "លាក់ពាក្យសម្ងាត់" : "បង្ហាញពាក្យសម្ងាត់"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            {/* Sign In Button */}
            <Link to="/admin"
              className="w-full mt-1 bg-red-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-red-700 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2">
              ចូលគណនី
            </Link>

            {/* Links and Divider */}
            <div className="flex flex-col items-center gap-3.5 pt-1">
              <a href="#" className="text-xs font-semibold text-red-600 hover:underline">
                ភ្លេចពាក្យសម្ងាត់?
              </a>
              
              <div className="w-full flex items-center justify-center relative my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs px-3 bg-background text-muted-foreground">
                  អ្នកប្រើប្រាស់ថ្មី?
                </div>
              </div>
              
              <a href="#" className="text-sm font-semibold text-red-600 hover:underline">
                បង្កើតគណនី
              </a>
            </div>
          </form>
          
          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Your Project Name. រក្សាសិទ្ធិគ្រប់យ៉ាង។
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}