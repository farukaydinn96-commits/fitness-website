import React, { useEffect, useState } from "react";

const Hero = ({ onStart, onNavigate }) => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);

  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height) {
      const h = height / 100;
      const calc = (weight / (h * h)).toFixed(1);
      setBmiResult(calc);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 },
    );

    const hiddenElements = document.querySelectorAll(".fade-in");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      {/* 1. EFSANEVİ KLASİK HERO (Tam Ekran Arka Planlı) */}
      <section className="hero-section">
        <div className="hero-left">
          <div className="floating-cards-container">
            <div className="glass-card varied-training">
              <div className="card-top">
                <h4>VARIED TRAINING</h4>
                <span className="badge">+25%</span>
              </div>
              <div className="wave-graphic">
                <svg viewBox="0 0 100 30" className="wave-orange">
                  <path
                    d="M0 15 Q 25 5, 50 15 T 100 15"
                    fill="none"
                    stroke="#ff6600"
                    strokeWidth="2"
                  />
                </svg>
                <svg viewBox="0 0 100 30" className="wave-purple">
                  <path
                    d="M0 20 Q 25 35, 50 20 T 100 20"
                    fill="none"
                    stroke="#8a2be2"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="card-bottom">
                <span className="dot orange"></span> PROGRESS{" "}
                <span
                  className="dot purple"
                  style={{ marginLeft: "auto" }}
                ></span>{" "}
                OLD HABITS
              </div>
            </div>
            <div className="glass-card training-intensity">
              <h4>TRAINING INTENSITY</h4>
              <div className="circle-graphic">
                <div className="circle-inner">
                  <h2>
                    92<span>%</span>
                  </h2>
                </div>
              </div>
              <div className="card-bottom">
                PROGRESS{" "}
                <span
                  className="badge gray-badge"
                  style={{ marginLeft: "auto" }}
                >
                  +20%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-content">
            <h1>
              PERSONAL
              <br />
              TRAINING WITH
              <br />
              <span className="highlight">FARUK AYDIN</span>
            </h1>
            <p>
              Unlock your full potential with customized workout and nutrition
              plans designed specifically for your goals. Start your journey
              today.
            </p>
            <button className="hero-btn" onClick={onStart}>
              START NOW
            </button>
          </div>
        </div>
      </section>

      {/* 2. İLETİŞİM ŞERİDİ (INFO BAR) */}
      <div className="contact-info-bar fade-in">
        <div className="info-item">
          <span className="icon">📞</span> +90 555 000 0000
        </div>
        <div className="info-item">
          <span className="icon">✉️</span> contact@fitcore.com
        </div>
        <div className="info-item">
          <span className="icon">📍</span> Bursa, Turkey
        </div>
      </div>

      {/* 3. MARQUEE */}
      <div className="marquee-container fade-in">
        <div className="marquee-content">
          <span>
            NO EXCUSES • PUSH YOUR LIMITS • FITCORE • UNLOCK YOUR POTENTIAL •
            TRAIN HARD •{" "}
          </span>
          <span>
            NO EXCUSES • PUSH YOUR LIMITS • FITCORE • UNLOCK YOUR POTENTIAL •
            TRAIN HARD •{" "}
          </span>
        </div>
      </div>

      {/* 4. TRUST BAR */}
      <section className="trust-bar fade-in">
        <div className="trust-item">
          <h3>50K+</h3>
          <p>Active Users</p>
        </div>
        <div className="trust-item">
          <h3>100+</h3>
          <p>Custom Routines</p>
        </div>
        <div className="trust-item">
          <h3>4.9/5</h3>
          <p>App Store Rating</p>
        </div>
        <div className="trust-item">
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </section>

      {/* 5. ÖZELLİKLER */}
      <section className="features-section fade-in">
        <div className="features-header">
          <h2>
            WHY CHOOSE <span className="highlight">FITCORE?</span>
          </h2>
          <p>We provide the best tools to transform your body and mind.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card clickable" onClick={onStart}>
            <div className="feature-icon">🎯</div>
            <h3>Custom Plans</h3>
            <p>
              Tailored workout routines that fit your specific goals and
              schedule.
            </p>
            <span className="action-text">Create Plan &rarr;</span>
          </div>
          <div className="feature-card clickable" onClick={onStart}>
            <div className="feature-icon">🥗</div>
            <h3>Nutrition Guide</h3>
            <p>
              Calculate your daily macros and get personalized meal suggestions.
            </p>
            <span className="action-text">Get Diet &rarr;</span>
          </div>
          <div
            className="feature-card clickable"
            onClick={() => onNavigate("dashboard")}
          >
            <div className="feature-icon">📈</div>
            <h3>Track Progress</h3>
            <p>
              Monitor your growth with our advanced dashboard and 1RM
              calculators.
            </p>
            <span className="action-text">View Dashboard &rarr;</span>
          </div>
        </div>
      </section>

      {/* 6. BMI HESAPLAYICI (Asimetrik Bölüm) */}
      <section className="asymmetric-section fade-in">
        <div className="asymmetric-left">
          <div className="image-stack">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop"
              className="img-back"
              alt="Workout 1"
            />
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop"
              className="img-front"
              alt="Workout 2"
            />
          </div>
        </div>
        <div className="asymmetric-right">
          <h2>
            KNOW YOUR <span className="highlight">BODY</span>
          </h2>
          <p>
            Understanding your current metrics is the first step towards
            transformation. Use our quick tool to find your Body Mass Index
            (BMI).
          </p>
          <div className="bmi-widget glass-card">
            <form onSubmit={calculateBMI} className="bmi-form">
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
              <button
                type="submit"
                className="hero-btn"
                style={{ padding: "12px 20px", width: "100%" }}
              >
                CALCULATE BMI
              </button>
            </form>
            {bmiResult && (
              <div className="bmi-result">
                <h4>
                  YOUR BMI: <span className="highlight">{bmiResult}</span>
                </h4>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. SPOR HAREKETLERİ */}
      <section className="exercises-section fade-in">
        <div className="features-header">
          <h2>
            POPULAR <span className="highlight">MOVEMENTS</span>
          </h2>
          <p>Master the basics with our premium exercise library.</p>
        </div>
        <div className="exercises-grid">
          <div className="exercise-card">
            <div className="exercise-image">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
                alt="Deadlift"
              />
              <div className="exercise-overlay">
                <span className="exercise-category">Strength</span>
              </div>
            </div>
            <div className="exercise-info">
              <h3>Barbell Deadlift</h3>
              <p>
                Build ultimate posterior chain strength. Essential for full-body
                power, posture, and core stability.
              </p>
            </div>
          </div>
          <div className="exercise-card">
            <div className="exercise-image">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop"
                alt="HIIT"
              />
              <div className="exercise-overlay">
                <span className="exercise-category">Cardio</span>
              </div>
            </div>
            <div className="exercise-info">
              <h3>HIIT Sprints</h3>
              <p>
                Maximize calorie burn and boost cardiovascular endurance with
                high-intensity sprint intervals.
              </p>
            </div>
          </div>
          <div className="exercise-card">
            <div className="exercise-image">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop"
                alt="Mobility"
              />
              <div className="exercise-overlay">
                <span className="exercise-category">Mobility</span>
              </div>
            </div>
            <div className="exercise-info">
              <h3>Dynamic Stretching</h3>
              <p>
                Enhance flexibility and prevent injuries. Perfect for active
                recovery and long-term muscle health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BLOG & MAKALELER */}
      <section
        className="blog-section fade-in"
        style={{
          padding: "100px 80px",
          backgroundColor: "var(--glass-bg)",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        <div className="features-header">
          <h2>
            LATEST <span className="highlight">INSIGHTS</span>
          </h2>
          <p>Expert tips on training gear, form, and nutrition.</p>
        </div>
        <div className="exercises-grid">
          <div className="exercise-card clickable">
            <div className="exercise-image">
              <img
                src="https://images.unsplash.com/photo-1584735175097-719d848f8449?q=80&w=800&auto=format&fit=crop"
                alt="Shoes"
              />
              <div className="exercise-overlay">
                <span className="exercise-category">Gear</span>
              </div>
            </div>
            <div className="exercise-info">
              <h3>The Mechanics of Heavy Lifting</h3>
              <p>
                Discover why flat-soled shoes provide the ultimate stability and
                power transfer for your heavy deadlifts and squats.
              </p>
            </div>
          </div>
          <div className="exercise-card clickable">
            <div className="exercise-image">
              <img
                src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
                alt="Apparel"
              />
              <div className="exercise-overlay">
                <span className="exercise-category">Style</span>
              </div>
            </div>
            <div className="exercise-info">
              <h3>Gym Style Evolution</h3>
              <p>
                From tight stringers to the oversized, boxy fit graphic tees.
                Why maximum comfort is taking over the modern fitness scene.
              </p>
            </div>
          </div>
          <div className="exercise-card clickable">
            <div className="exercise-image">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"
                alt="Nutrition"
              />
              <div className="exercise-overlay">
                <span className="exercise-category">Nutrition</span>
              </div>
            </div>
            <div className="exercise-info">
              <h3>Mastering Macro Nutrition</h3>
              <p>
                Calculate your daily intake correctly and unlock your true
                physical potential with these simple, science-backed dieting
                rules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SIKÇA SORULAN SORULAR (FAQ) */}
      <section className="faq-section fade-in">
        <div className="features-header">
          <h2>
            FREQUENTLY ASKED <span className="highlight">QUESTIONS</span>
          </h2>
          <p>Everything you need to know about FitCore.</p>
        </div>
        <div className="faq-container">
          {[
            "When will I receive my custom program?",
            "Do I need a gym membership to start?",
            "Can I change my diet preferences later?",
          ].map((question, index) => (
            <div
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
              key={index}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h4>{question}</h4>
                <span className="faq-icon">
                  {activeFaq === index ? "−" : "+"}
                </span>
              </div>
              <div className="faq-answer">
                <p>
                  Once you complete the onboarding form, our system immediately
                  processes your metrics and generates a highly tailored routine
                  and macro guide within seconds. You can access it directly
                  from your personalized dashboard.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. ÜYELİK PAKETLERİ */}
      <section className="pricing-section fade-in">
        <div className="features-header">
          <h2>
            CHOOSE YOUR <span className="highlight">PLAN</span>
          </h2>
          <p>Flexible plans tailored to your fitness journey.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Basic</h3>
            <div className="price">
              $0<span>/mo</span>
            </div>
            <ul className="pricing-features">
              <li>✔️ Basic Plans</li>
              <li>✔️ Standard Macros</li>
              <li>❌ Personal Coach</li>
            </ul>
            <button className="pricing-btn" onClick={onStart}>
              GET STARTED
            </button>
          </div>
          <div className="pricing-card pro">
            <div className="popular-badge">MOST POPULAR</div>
            <h3>Pro</h3>
            <div className="price">
              $19.99<span>/mo</span>
            </div>
            <ul className="pricing-features">
              <li>✔️ Premium Plans</li>
              <li>✔️ Advanced Macros</li>
              <li>✔️ 1RM Dashboard</li>
            </ul>
            <button className="pricing-btn pro-btn" onClick={onStart}>
              UPGRADE TO PRO
            </button>
          </div>
          <div className="pricing-card">
            <h3>Elite</h3>
            <div className="price">
              $49.99<span>/mo</span>
            </div>
            <ul className="pricing-features">
              <li>✔️ Pro Features</li>
              <li>✔️ 1-on-1 Coach</li>
              <li>✔️ Custom Recipes</li>
            </ul>
            <button className="pricing-btn" onClick={onStart}>
              GO ELITE
            </button>
          </div>
        </div>
      </section>

      {/* 11. YORUMLAR (TESTIMONIALS) */}
      <section className="testimonials-section fade-in">
        <div className="features-header">
          <h2>
            REAL PEOPLE, <span className="highlight">REAL RESULTS</span>
          </h2>
          <p>Join thousands of members transforming their lives.</p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "Faruk's custom plans completely changed my approach to fitness.
              I've gained 5kg of muscle in just 3 months!"
            </p>
            <div className="testimonial-user">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop"
                alt="User 1"
              />
              <div>
                <h4>James O.</h4>
                <span>Pro Member</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "The 1RM calculator and macro dashboard are incredible. It feels
              like having a personal trainer in my pocket."
            </p>
            <div className="testimonial-user">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop"
                alt="User 2"
              />
              <div>
                <h4>Sarah M.</h4>
                <span>Elite Member</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p>
              "Finally a platform that isn't confusing. Everything is
              straightforward, aesthetic, and incredibly effective."
            </p>
            <div className="testimonial-user">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                alt="User 3"
              />
              <div>
                <h4>David L.</h4>
                <span>Pro Member</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. MÜZİKLER (PLAYLISTS) */}
      <section className="playlists-section fade-in">
        <div className="features-header">
          <h2>
            CURATED <span className="highlight">PLAYLISTS</span>
          </h2>
          <p>Fuel your workout with our premium audio selections.</p>
        </div>
        <div className="playlists-grid">
          <div className="playlist-card">
            <div className="playlist-cover">
              <img
                src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop"
                alt="Heavy Lifting"
              />
              <button className="play-btn">▶</button>
            </div>
            <h4>Heavy Lifting</h4>
            <p>Phonk, Metal & Hardcore Bass</p>
          </div>
          <div className="playlist-card">
            <div className="playlist-cover">
              <img
                src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=500&auto=format&fit=crop"
                alt="HIIT Cardio"
              />
              <button className="play-btn">▶</button>
            </div>
            <h4>HIIT & Cardio</h4>
            <p>140 BPM Electronic & Techno</p>
          </div>
          <div className="playlist-card">
            <div className="playlist-cover">
              <img
                src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=500&auto=format&fit=crop"
                alt="Cool Down"
              />
              <button className="play-btn">▶</button>
            </div>
            <h4>Cool Down</h4>
            <p>Ambient, Lo-Fi & Chillwave</p>
          </div>
        </div>
      </section>

      <footer className="main-footer fade-in">
        <div className="footer-content">
          <p>&copy; 2026 FitCore by Faruk Aydın. Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default Hero;
