import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [coins, setCoins] = useState(0)

  const packages = [
    { id: 1, coins: 65, price: 0.99, bonus: 0, popular: false },
    { id: 2, coins: 330, price: 4.99, bonus: 0, popular: false },
    { id: 3, coins: 660, price: 9.99, bonus: 10, popular: true },
    { id: 4, coins: 1321, price: 19.99, bonus: 15, popular: false },
    { id: 5, coins: 3303, price: 49.99, bonus: 20, popular: false },
    { id: 6, coins: 6607, price: 99.99, bonus: 25, popular: false },
  ]

  const handlePurchase = (pkg) => {
    setSelectedPackage(pkg)
    setShowModal(true)
  }

  const completePurchase = () => {
    setCoins(coins + selectedPackage.coins)
    setShowModal(false)
    setTimeout(() => setSelectedPackage(null), 300)
  }

  return (
    <>
      <Head>
        <title>TikTok Coins Shop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container">
        <header>
          <div className="header-content">
            <h1>🪙 TikTok Coins</h1>
            <div className="balance">
              <span className="balance-label">Your Balance:</span>
              <span className="balance-amount">{coins} coins</span>
            </div>
          </div>
        </header>

        <main>
          <div className="intro">
            <h2>Recharge Coins</h2>
            <p>Send Gifts to your favorite creators and support them!</p>
          </div>

          <div className="packages-grid">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`package-card ${pkg.popular ? 'popular' : ''}`}
              >
                {pkg.popular && <div className="popular-badge">Most Popular</div>}
                {pkg.bonus > 0 && <div className="bonus-badge">+{pkg.bonus}% Bonus</div>}

                <div className="coin-icon">🪙</div>
                <div className="coin-amount">{pkg.coins.toLocaleString()}</div>
                <div className="coin-label">Coins</div>

                <div className="price">${pkg.price}</div>

                <button
                  className="purchase-btn"
                  onClick={() => handlePurchase(pkg)}
                >
                  Recharge
                </button>
              </div>
            ))}
          </div>

          <div className="info-section">
            <h3>💡 About TikTok Coins</h3>
            <ul>
              <li>Use coins to send virtual gifts to creators during LIVE streams</li>
              <li>Gifts help support your favorite content creators</li>
              <li>Different gifts have different coin values</li>
              <li>Bonus coins are added automatically to larger packages</li>
            </ul>
          </div>
        </main>

        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h3>Confirm Purchase</h3>
              <div className="modal-content">
                <div className="modal-coin-icon">🪙</div>
                <p className="modal-coins">{selectedPackage.coins} Coins</p>
                <p className="modal-price">${selectedPackage.price}</p>

                <div className="payment-info">
                  <p>⚠️ This is a demo shop</p>
                  <p>No real payment will be processed</p>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn-confirm" onClick={completePurchase}>
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
