import { useMemo, useState } from 'react';

const products = [
  { id: 1, name: 'Наушники Studio Pro', category: 'Аудио', price: 24990, oldPrice: 31990, emoji: '🎧', tag: 'ХИТ', rating: '4.9', reviews: 128 },
  { id: 2, name: 'Смартфон Nova X', category: 'Смартфоны', price: 189990, oldPrice: 209990, emoji: '📱', tag: '−10%', rating: '4.8', reviews: 96 },
  { id: 3, name: 'Умные часы Pulse 4', category: 'Гаджеты', price: 42990, oldPrice: 49990, emoji: '⌚', tag: 'НОВИНКА', rating: '4.7', reviews: 74 },
  { id: 4, name: 'Портативная колонка Boom', category: 'Аудио', price: 32990, oldPrice: 38990, emoji: '🔊', tag: '−15%', rating: '4.9', reviews: 203 },
  { id: 5, name: 'Ноутбук AirBook 14', category: 'Компьютеры', price: 379990, oldPrice: 419990, emoji: '💻', tag: 'ХИТ', rating: '4.8', reviews: 61 },
  { id: 6, name: 'Игровой контроллер', category: 'Гейминг', price: 21990, oldPrice: 25990, emoji: '🎮', tag: '−15%', rating: '4.6', reviews: 88 },
  { id: 7, name: 'Камера instant Mini', category: 'Гаджеты', price: 55990, oldPrice: 62990, emoji: '📸', tag: 'НОВИНКА', rating: '4.7', reviews: 42 },
  { id: 8, name: 'Механическая клавиатура', category: 'Компьютеры', price: 27990, oldPrice: 32990, emoji: '⌨️', tag: '−15%', rating: '4.8', reviews: 115 },
];

const categories = ['Все товары', 'Аудио', 'Смартфоны', 'Гаджеты', 'Компьютеры', 'Гейминг'];
const money = (value) => new Intl.NumberFormat('ru-RU').format(value) + ' ₸';

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Все товары');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState('');
  const [email, setEmail] = useState('');

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'Все товары' || product.category === category;
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase()) || product.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [query, category]);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__sameShopToast);
    window.__sameShopToast = window.setTimeout(() => setToast(''), 2400);
  };

  const addToCart = (product) => {
    setCart((current) => [...current, product]);
    notify('Добавили в корзину: ' + product.name);
  };

  const toggleFavorite = (product) => {
    const isFavorite = favorites.includes(product.id);
    setFavorites((current) => isFavorite ? current.filter((id) => id !== product.id) : [...current, product.id]);
    notify(isFavorite ? 'Убрали из избранного' : 'Добавили в избранное ♥');
  };

  const cartTotal = cart.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="app-shell">
      <div className="topline">
        <span>✨ Техника, которая делает жизнь проще</span>
        <span><strong>Доставка по Казахстану</strong> · Поддержка каждый день</span>
      </div>

      <header className="header">
        <a className="logo" href="#" aria-label="SameShop — главная">
          <span className="logo-mark">S</span>
          Same<span>Shop</span>
        </a>
        <label className="search">
          <span className="search-icon">⌕</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти смартфон, наушники, гаджет..." aria-label="Поиск товаров" />
        </label>
        <div className="header-actions">
          <button className="icon-button" onClick={() => notify(favorites.length ? 'В избранном товаров: ' + favorites.length : 'Пока нет избранных товаров')} aria-label="Избранное">♡{favorites.length > 0 && <span className="count">{favorites.length}</span>}</button>
          <button className="icon-button" onClick={() => notify(cart.length ? `Корзина: ${cart.length} шт. на ${money(cartTotal)}` : 'Корзина пока пустая')} aria-label="Корзина">🛍{cart.length > 0 && <span className="count">{cart.length}</span>}</button>
        </div>
      </header>

      <nav className="nav" aria-label="Главная навигация">
        <a href="#catalog">Каталог</a><a href="#catalog">Новинки</a><a href="#catalog">Хиты продаж</a><a href="#benefits">Доставка и оплата</a><a href="#footer">Контакты</a>
      </nav>

      <main>
        <section className="hero">
          <div>
            <span className="eyebrow">✦ Технологии ближе</span>
            <h1>Умные покупки.<br /><span>Яркие возможности.</span></h1>
            <p>Выбирай любимые гаджеты по приятным ценам. Только то, что действительно хочется использовать каждый день.</p>
            <a className="primary-button" href="#catalog">Смотреть каталог <span>↗</span></a>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="orb" />
            <span className="hero-product">🎧</span>
            <span className="spark one">✦</span><span className="spark two">✧</span>
          </div>
        </section>

        <section className="benefits" id="benefits">
          <div className="benefit"><span className="benefit-icon">🚚</span><div><strong>Удобная доставка</strong><small>По Казахстану</small></div></div>
          <div className="benefit"><span className="benefit-icon">🛡️</span><div><strong>Покупки с уверенностью</strong><small>Понятные условия и поддержка</small></div></div>
          <div className="benefit"><span className="benefit-icon">💜</span><div><strong>Выбор без стресса</strong><small>Любимые гаджеты в одном месте</small></div></div>
        </section>

        <section id="catalog">
          <div className="section-head">
            <div><h2>Популярные товары</h2><p>Подборка гаджетов для твоего ритма</p></div>
            <span style={{ color: '#858b99', fontSize: 12 }}>{visibleProducts.length} товаров</span>
          </div>
          <div className="filter-row">
            {categories.map((item) => <button key={item} className={'filter-chip' + (category === item ? ' active' : '')} onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="products">
            {visibleProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-art">
                  <span className="tag">{product.tag}</span>
                  <button className={'heart' + (favorites.includes(product.id) ? ' liked' : '')} onClick={() => toggleFavorite(product)} aria-label="Добавить в избранное">{favorites.includes(product.id) ? '♥' : '♡'}</button>
                  <span className="product-emoji">{product.emoji}</span>
                </div>
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="rating">★ {product.rating}<span>({product.reviews} отзывов)</span></div>
                <div className="price-row">
                  <div><div className="price">{money(product.price)}</div><div className="old-price">{money(product.oldPrice)}</div></div>
                  <button className="add-button" onClick={() => addToCart(product)} aria-label={'Добавить ' + product.name + ' в корзину'}>+</button>
                </div>
              </article>
            ))}
            {visibleProducts.length === 0 && <div className="empty-state">Ничего не нашли. Попробуй другой запрос или категорию.</div>}
          </div>
        </section>

        <section className="newsletter">
          <div><h3>Будь первым в курсе 💌</h3><p>Новинки и специальные предложения прямо на почту.</p></div>
          <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); if (email.trim()) { notify('Спасибо! Подписка для ' + email + ' подготовлена.'); setEmail(''); } }}>
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Твоя электронная почта" aria-label="Электронная почта" />
            <button type="submit">Подписаться</button>
          </form>
        </section>
      </main>

      <footer className="footer" id="footer">
        <span>© {new Date().getFullYear()} SameShop. Демоверсия магазина.</span>
        <span>Сделано с 💜 на React</span>
      </footer>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}