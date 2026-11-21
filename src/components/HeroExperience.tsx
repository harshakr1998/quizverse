import { useEffect, useState } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowDownRight, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import '../hero.css';

export function HeroExperience() {
  const [answer, setAnswer] = useState<number | null>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const intro = animate('.hero-reveal', { opacity: [0, 1], translateY: [30, 0], duration: 850, delay: stagger(90), ease: 'outExpo' });
    const orbit = animate('.orbit-ring', { rotate: [0, 360], duration: 42000, loop: true, ease: 'linear' });
    const orbitReverse = animate('.orbit-ring-reverse', { rotate: [360, 0], duration: 30000, loop: true, ease: 'linear' });
    const float = animate('.planet-core', { translateY: [0, -12, 0], rotate: [-3, 2, -3], duration: 6000, loop: true, ease: 'inOutSine' });
    const dots = animate('.star-dot', { scale: [.35, 1, .35], opacity: [.25, .9, .25], duration: 2400, delay: stagger(85, { from: 'center' }), loop: true, ease: 'inOutSine' });
    const underline = animate('.sketch-underline', { scaleX: [0, 1], duration: 900, delay: 600, ease: 'outExpo' });
    return () => { intro.cancel(); orbit.cancel(); orbitReverse.cancel(); float.cancel(); dots.cancel(); underline.cancel(); };
  }, []);
  useEffect(() => {
    if (answer === null || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const response = animate('.demo-feedback', { opacity: [0, 1], translateY: [8, 0], duration: 400, ease: 'outExpo' });
    return () => { response.cancel(); };
  }, [answer]);

  return <section className="cosmic-hero">
    <div className="cosmic-grid" aria-hidden="true"/>
    <div className="cosmic-noise" aria-hidden="true"/>
    <div className="cosmic-inner wrap">
      <div className="cosmic-copy">
        <div className="cosmic-kicker hero-reveal"><span className="signal"/> THE UNIVERSE OF GETTING BETTER <span className="kicker-number">/ 001</span></div>
        <h1 className="cosmic-title" aria-label="Think. Play. Level up."><span className="hero-reveal">THINK<span className="title-dot">.</span></span><span className="hero-reveal">PLAY<span className="title-dot">.</span></span><span className="hero-reveal outline-word">LEVEL UP<span className="title-dot">.</span><i className="sketch-underline" aria-hidden="true"/></span></h1>
        <div className="cosmic-description hero-reveal"><span className="description-mark">✳</span><p>Big interview energy starts with one small question. Explore your skills, challenge your brain, and enjoy the ride.</p></div>
        <div className="cosmic-actions hero-reveal"><a className="cosmic-cta" href="#explore">ENTER THE VERSE <ArrowUpRight size={19}/></a><span>FREE TO EXPLORE<br/><b>IMPOSSIBLE TO STOP LEARNING</b></span></div>
      </div>
      <div className="cosmic-stage hero-reveal">
        <div className="stage-label"><span>LIVE FROM THE QUIZVERSE</span><span>✦ EST. RIGHT NOW</span></div>
        <div className="orbital-scene">
          <div className="stars" aria-hidden="true">{Array.from({ length: 27 }, (_, i) => <i className="star-dot" key={i} style={{ '--x': `${(i * 47 + 13) % 100}%`, '--y': `${(i * 71 + 9) % 100}%` } as React.CSSProperties}/>)}</div>
          <div className="orbit-ring orbit-a" aria-hidden="true"><i/><b>✦</b></div><div className="orbit-ring-reverse orbit-b" aria-hidden="true"><i/><b>✳</b></div>
          <div className="planet-core"><span className="planet-smile">:)</span><span className="planet-word">BRAIN<br/>POWER</span><span className="planet-spark">✳</span></div>
          <div className="floating-tag tag-one" aria-hidden="true">GOOD QUESTION! <Sparkles size={14}/></div><div className="floating-tag tag-two" aria-hidden="true">+ 100 CURIOSITY</div>
          <div className="demo-card"><div className="demo-top"><span>POP QUIZ <b>✳</b></span><span>01 / ∞</span></div><p>What's the best way<br/>to get better?</p><div className="demo-options">{['Keep practicing', 'Wait for a miracle'].map((option, i) => <button key={option} className={answer === i ? 'picked' : ''} aria-pressed={answer === i} onClick={() => setAnswer(i)}><span>{String.fromCharCode(65 + i)}</span>{option}{answer === i && <Check size={15}/>}</button>)}</div><div className="demo-bottom" aria-live="polite">{answer === null ? 'GO ON, TAKE A GUESS ↗' : <span className="demo-feedback">{answer === 0 ? 'Exactly. Let’s get to it ✦' : 'Fun idea. Practice works better ✦'}</span>}</div></div>
        </div>
        <div className="stage-bottom"><span>YOUR BRAIN LOOKS GOOD IN HERE</span><span>SCROLL TO EXPLORE <ArrowDownRight size={15}/></span></div>
      </div>
    </div>
    <div className="cosmic-marquee" aria-hidden="true"><div>THINK BIG <span>✳</span> STAY CURIOUS <span>✳</span> PLAY SMART <span>✳</span> THINK BIG <span>✳</span> STAY CURIOUS <span>✳</span> PLAY SMART <span>✳</span></div></div>
  </section>;
}
