
import { useState } from "react";
import {
  ArrowDown, ArrowRight, Clock, Coffee, MapPin, Menu, Phone,
  ShoppingBag, Star, X, CheckCircle
} from "lucide-react";
import "./App.css";

const dishes = [
  { id: 1, name: "Cappuccino", category: "Coffee", price: 140, description: "Rich espresso with silky steamed milk.", image: "photo-1572442388796-11668a67e53d", tag: "Bestseller" },
  { id: 2, name: "Iced Latte", category: "Coffee", price: 160, description: "Chilled espresso, milk and a smooth finish.", image: "photo-1461023058943-07fcbe16d735", tag: "Refreshing" },
  { id: 3, name: "Butter Croissant", category: "Bakery", price: 120, description: "Golden, flaky and baked to perfection.", image: "photo-1555507036-ab1f4038808a", tag: "Fresh daily" },
  { id: 4, name: "Chocolate Cake", category: "Desserts", price: 180, description: "Decadent chocolate layers with a soft centre.", image: "photo-1578985545062-69928b1d9587", tag: "Favourite" },
  { id: 5, name: "Avocado Toast", category: "Food", price: 220, description: "Sourdough toast with fresh seasonal toppings.", image: "photo-1525351484163-7529414344d8", tag: "Light bite" },
  { id: 6, name: "Pancake Stack", category: "Food", price: 240, description: "Fluffy pancakes served with fruit and syrup.", image: "photo-1528207776546-365bb710ee93", tag: "Brunch pick" },
];

const categories = ["All", "Coffee", "Bakery", "Desserts", "Food"];

function App() {
  const [category, setCategory] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [reservation, setReservation] = useState({
    name: "", email: "", date: "", time: "10:00", guests: "2", notes: ""
  });
  const [message, setMessage] = useState("");

  const filteredDishes = category === "All"
    ? dishes
    : dishes.filter((dish) => dish.category === category);

  function updateReservation(event) {
    const { name, value } = event.target;
    setReservation((current) => ({ ...current, [name]: value }));
  }

  function submitReservation(event) {
    event.preventDefault();
    setMessage(
      `Thank you, ${reservation.name}! Your table enquiry for ${reservation.guests} guest(s) on ${reservation.date} at ${reservation.time} has been prepared. This demo does not send or store a real booking.`
    );
  }

  return (
    <>
      <header className="header">
        <a className="brand" href="#home" aria-label="Bean and Basil home">
          <span className="brand-icon"><Coffee size={22} /></span>
          <span>bean <i>&</i> basil<span className="brand-dot">.</span>
            <small>CAFE & BAKERY</small>
          </span>
        </a>

        <button className="menu-toggle" onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation" aria-expanded={mobileMenu}>
          {mobileMenu ? <X /> : <Menu />}
        </button>

        <nav className={mobileMenu ? "nav nav-open" : "nav"}>
          {["Home", "Our Story", "Menu", "Visit Us"].map((item) => (
            <a key={item} href={
              item === "Home" ? "#home" :
              item === "Our Story" ? "#story" :
              item === "Menu" ? "#menu" : "#visit"
            } onClick={() => setMobileMenu(false)}>{item}</a>
          ))}
          <a className="nav-cta" href="#reservation" onClick={() => setMobileMenu(false)}>
            Book a table <ArrowRight size={15} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow"><span className="eyebrow-dot" /> YOUR NEIGHBOURHOOD CAFE</span>
            <h1>Good coffee.<br />Great <em>company.</em></h1>
            <p>Slow mornings, fresh bakes and little moments worth savouring. Your favourite corner of the neighbourhood is waiting.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#menu">Explore our menu <ArrowRight size={17} /></a>
              <a className="button button-light" href="#story">Our story</a>
            </div>
            <div className="hero-note">
              <div className="avatar-stack"><span>☕</span><span>🥐</span><span>🤎</span></div>
              <div><strong>Made fresh, served with love</strong><small>Your daily dose of comfort.</small></div>
            </div>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=85" alt="Warm and welcoming cafe interior" />
            <div className="floating-card"><span className="floating-icon"><Star size={18} fill="currentColor" /></span><div><strong>Made with care</strong><small>Every cup, every day</small></div></div>
            <span className="hero-stamp">GOOD<br />THINGS<br /><i>BREW</i><br />HERE</span>
          </div>
          <a href="#story" className="scroll-note"><ArrowDown size={15} /> SCROLL TO DISCOVER</a>
        </section>

        <section className="intro section-pad" id="story">
          <div className="intro-image">
            <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85" alt="Coffee being prepared at a cafe" loading="lazy" />
            <span className="image-label">A LITTLE CUP OF HAPPINESS</span>
          </div>
          <div className="intro-copy">
            <span className="eyebrow">A PLACE TO PAUSE</span>
            <h2>More than coffee.<br />A little <em>feeling.</em></h2>
            <p>At Bean & Basil, we believe the best moments happen when you slow down. From the first sip of your morning coffee to a long catch-up with friends, we're here for your everyday rituals.</p>
            <p>Freshly prepared favourites, thoughtful ingredients and a welcoming space — that's our recipe for a good day.</p>
            <a href="#menu" className="text-link">Discover the menu <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="section-heading">
            <div><span className="eyebrow">FRESH FROM OUR KITCHEN</span><h2>A menu made<br />to <em>make your day.</em></h2></div>
            <p>From comforting classics to little indulgences, find your new favourite.</p>
          </div>
          <div className="category-list" aria-label="Filter menu by category">
            {categories.map((item) => (
              <button key={item} className={category === item ? "category active" : "category"}
                onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <div className="menu-grid">
            {filteredDishes.map((dish) => (
              <article className="dish-card" key={dish.id}>
                <div className="dish-image">
                  <img src={`https://images.unsplash.com/${dish.image}?auto=format&fit=crop&w=700&q=80`}
                    alt={dish.name} loading="lazy" />
                  <span className="dish-tag">{dish.tag}</span>
                </div>
                <div className="dish-info">
                  <div className="dish-title"><h3>{dish.name}</h3><strong>₹{dish.price}</strong></div>
                  <p>{dish.description}</p>
                  <span className="dish-category">{dish.category}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="menu-disclaimer">Sample menu and prices for this demonstration. Actual availability and prices may vary.</p>
        </section>

        <section className="quote-section">
          <span className="quote-mark">“</span>
          <blockquote>There is always time for one more cup of coffee.</blockquote>
          <span className="quote-credit">YOUR TABLE, YOUR MOMENT — BEAN & BASIL</span>
        </section>

        <section className="visit-section section-pad" id="visit">
          <div className="visit-copy">
            <span className="eyebrow">COME ON IN</span>
            <h2>Your new favourite<br />corner is <em>here.</em></h2>
            <p>Drop by for your morning brew, a relaxed lunch or an afternoon treat. We'd love to see you.</p>
            <div className="visit-detail"><MapPin size={20} /><div><strong>Find our cafe</strong><span>123 Coffee Lane, Your City</span><small>Replace with the real business address before launch.</small></div></div>
            <div className="visit-detail"><Clock size={20} /><div><strong>Opening hours</strong><span>Monday – Sunday · 8:00 AM – 8:00 PM</span><small>Demo hours — confirm before publishing.</small></div></div>
            <div className="visit-detail"><Phone size={20} /><div><strong>Say hello</strong><span>+91 90000 00000</span><small>Placeholder number — replace before launch.</small></div></div>
          </div>
          <div className="reservation-card" id="reservation">
            <span className="eyebrow">SAVE YOUR SPOT</span>
            <h3>Let's make it a date.</h3>
            <p>Send us a table enquiry for your next visit.</p>
            <form onSubmit={submitReservation}>
              <label>Your name<input required name="name" value={reservation.name} onChange={updateReservation} placeholder="e.g. Surendra Kumar" /></label>
              <label>Email address<input required type="email" name="email" value={reservation.email} onChange={updateReservation} placeholder="you@example.com" /></label>
              <div className="form-row">
                <label>Date<input required type="date" name="date" min={new Date().toLocaleDateString("en-CA")} value={reservation.date} onChange={updateReservation} /></label>
                <label>Time<select name="time" value={reservation.time} onChange={updateReservation}>{["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"].map(t => <option key={t} value={t}>{t}</option>)}</select></label>
              </div>
              <label>Number of guests<select name="guests" value={reservation.guests} onChange={updateReservation}>{["1","2","3","4","5","6","7","8"].map(n => <option key={n} value={n}>{n} guest{n === "1" ? "" : "s"}</option>)}</select></label>
              <label>Special request <span className="optional">(optional)</span><textarea name="notes" value={reservation.notes} onChange={updateReservation} placeholder="Anything we should know?" rows="2" /></label>
              <button className="button button-dark submit-button" type="submit">Prepare enquiry <ArrowRight size={17} /></button>
              {message && <p className="success-message" role="status"><CheckCircle size={18} />{message}</p>}
            </form>
            <small className="form-note">Demo only: this form does not submit data to a restaurant.</small>
          </div>
        </section>

        <section className="newsletter">
          <div><span className="eyebrow">A LITTLE SOMETHING GOOD</span><h2>Make room for <em>something lovely.</em></h2><p>Good coffee, good food, good company. That's the whole idea.</p></div>
          <a className="button button-light" href="#menu">Explore the menu <ArrowRight size={17} /></a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home"><span className="brand-icon"><Coffee size={22} /></span><span>bean <i>&</i> basil<span className="brand-dot">.</span><small>CAFE & BAKERY</small></span></a>
        <p>Made for good moments. © {new Date().getFullYear()} Bean & Basil Café.</p>
        <a href="#home" className="back-top">Back to top ↑</a>
      </footer>
    </>
  );
}

export default App;
