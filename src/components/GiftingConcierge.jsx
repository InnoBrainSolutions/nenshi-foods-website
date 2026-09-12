import React, { useState } from 'react';
import { Gift, Check, Award, Send } from 'lucide-react';

export default function GiftingConcierge({ currency, onAddBespokeHamper }) {
  const [selectedBox, setSelectedBox] = useState('ivory-star');
  const [ribbonColor, setRibbonColor] = useState('champagne');
  const [sealInitial, setSealInitial] = useState('N');
  const [recipientName, setRecipientName] = useState('Maharani Gayatri Devi');
  const [personalMessage, setPersonalMessage] = useState('With deepest reverence and auspicious wishes for the auspicious celebrations ahead.');
  const [added, setAdded] = useState(false);

  const boxes = [
    {
      id: 'ivory-star',
      name: 'The Ivory Star Casket',
      weight: '500g',
      capacity: '24 Jewels',
      priceINR: 1950,
      priceUSD: 28,
      desc: 'Handmade Italian linen paper with 22k gold foil 8-pointed star'
    },
    {
      id: 'ratnavali-chest',
      name: 'The Ratnavali Slide Chest',
      weight: '1,000g',
      capacity: '48 Jewels',
      priceINR: 4200,
      priceUSD: 62,
      desc: 'Dual slide-out tiered trays with velvet-cushioned individual golden cups'
    },
    {
      id: 'darbar-trunk',
      name: 'The Darbar Heritage Trunk',
      weight: '1,500g',
      capacity: 'Grand Assortment',
      priceINR: 5900,
      priceUSD: 88,
      desc: 'Architectural rigid wood-frame trunk with antique brass latches'
    }
  ];

  const ribbons = [
    { id: 'champagne', name: 'Champagne Ivory', hex: '#EBDDC3', border: '#C59A45' },
    { id: 'crimson', name: 'Royal Crimson', hex: '#8B1E28', border: '#B91C1C' },
    { id: 'emerald', name: 'Peacock Emerald', hex: '#115E59', border: '#0D9488' }
  ];

  const currentBox = boxes.find(b => b.id === selectedBox) || boxes[0];
  const price = currency === "INR" 
    ? `₹${currentBox.priceINR.toLocaleString('en-IN')}` 
    : `$${currentBox.priceUSD}`;

  const handleAddHamper = () => {
    onAddBespokeHamper({
      id: `bespoke-${Date.now()}`,
      name: `Bespoke ${currentBox.name}`,
      category: "Bespoke Hamper",
      weight: currentBox.weight,
      priceINR: currentBox.priceINR,
      priceUSD: currentBox.priceUSD,
      image: "/images/ref1.jpg",
      customDetails: {
        ribbon: ribbonColor,
        seal: sealInitial,
        recipient: recipientName,
        message: personalMessage
      }
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="gifting" className="gifting-section">
      <div className="container">
        
        {/* Clean Section Header */}
        <div className="clean-section-header text-center">
          <span className="clean-section-eyebrow">BESPOKE GIFTING CONCIERGE</span>
          <h2 className="clean-section-title font-royal">Curate A Royal Presentation</h2>
          <p className="clean-section-lead font-serif">
            A Nenshi gift casket is an emblem of reverence. Select your presentation format, fine silk ribbon, and personalized wax seal monogram.
          </p>
        </div>

        {/* Interactive Customizer Workspace */}
        <div className="concierge-workspace-grid">
          
          {/* Controls Column */}
          <div className="concierge-controls">
            
            {/* Step 1: Box Format */}
            <div className="config-step">
              <span className="step-num font-royal">01. SELECT PRESENTATION CASKET</span>
              <div className="box-options-list">
                {boxes.map(box => (
                  <div 
                    key={box.id}
                    className={`box-select-card ${selectedBox === box.id ? 'box-selected' : ''}`}
                    onClick={() => setSelectedBox(box.id)}
                  >
                    <div className="box-card-left">
                      <h4 className="box-option-title font-royal">{box.name}</h4>
                      <p className="box-option-desc font-serif">{box.desc}</p>
                      <span className="box-capacity-tag">{box.capacity} · {box.weight}</span>
                    </div>
                    <div className="box-card-right">
                      <span className="box-price font-royal">
                        {currency === "INR" ? `₹${box.priceINR.toLocaleString('en-IN')}` : `$${box.priceUSD}`}
                      </span>
                      <div className="custom-radio">
                        {selectedBox === box.id && <div className="radio-dot" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Ribbon & Seal */}
            <div className="config-step">
              <span className="step-num font-royal">02. SILK GROSGRAIN & SEAL MONOGRAM</span>
              <div className="ribbon-selection-row">
                <span className="config-sub-label">Silk Ribbon:</span>
                <div className="ribbon-swatches">
                  {ribbons.map(r => (
                    <button
                      key={r.id}
                      className={`ribbon-swatch-btn ${ribbonColor === r.id ? 'swatch-active' : ''}`}
                      style={{ backgroundColor: r.hex, borderColor: r.border }}
                      onClick={() => setRibbonColor(r.id)}
                      title={r.name}
                    >
                      {ribbonColor === r.id && <Check size={14} color={r.id === 'champagne' ? '#704313' : '#FFF'} />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="seal-selection-row">
                <span className="config-sub-label">Gold Wax Seal Initial:</span>
                <div className="seal-input-group">
                  {['N', 'S', 'A', 'R', 'K', 'V'].map(letter => (
                    <button
                      key={letter}
                      className={`seal-letter-btn ${sealInitial === letter ? 'seal-active' : ''}`}
                      onClick={() => setSealInitial(letter)}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Parchment Letter Inscription */}
            <div className="config-step">
              <span className="step-num font-royal">03. HANDMADE PARCHMENT INSCRIPTION</span>
              <div className="input-field-group">
                <label className="field-label">Honored Recipient Name</label>
                <input 
                  type="text" 
                  className="royal-input" 
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g., The Singhania Family"
                />
              </div>

              <div className="input-field-group">
                <label className="field-label">Royal Salutation & Greeting Note</label>
                <textarea 
                  rows="3"
                  className="royal-textarea font-serif" 
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  placeholder="Draft your auspicious greetings..."
                />
              </div>
            </div>

          </div>

          {/* Live Preview Column: The Gold-Embossed Digital Parchment */}
          <div className="concierge-preview-col">
            <div className="preview-sticky-card">
              
              <div className="preview-eyebrow">
                <span className="preview-dot" />
                <span>LIVE BESPOKE PREVIEW</span>
              </div>

              {/* Digital Parchment Envelope */}
              <div className="parchment-letter-wrapper">
                
                {/* Decorative Ribbon Accent */}
                <div 
                  className="preview-ribbon-band"
                  style={{
                    backgroundColor: ribbons.find(r => r.id === ribbonColor)?.hex
                  }}
                />

                {/* Hot Wax Gold Seal */}
                <div className="preview-wax-seal">
                  <div className="wax-seal-inner">
                    <span className="wax-letter font-royal">{sealInitial}</span>
                  </div>
                </div>

                {/* Letter Content */}
                <div className="parchment-body">
                  <div className="parchment-crest font-royal">NANSHI FOODS · 1968</div>
                  <div className="parchment-divider-line" />

                  <p className="parchment-salutation font-serif">To the esteemed,</p>
                  <h4 className="parchment-recipient font-royal">{recipientName || "Distinguished Recipient"}</h4>

                  <p className="parchment-message font-serif">
                    "{personalMessage || "May these handcrafted confections bring sweetness, prosperity, and light to your auspicious celebrations."}"
                  </p>

                  <div className="parchment-footer font-serif">
                    <span>Selected Box: <strong>{currentBox.name}</strong></span>
                    <span>Dispatch: <strong>Air-Chilled Sealed Vault</strong></span>
                  </div>
                </div>

              </div>

              {/* Order Box Summary */}
              <div className="preview-order-bar">
                <div className="preview-price-block">
                  <span className="preview-price-sub font-serif">Bespoke Curated Hamper</span>
                  <span className="preview-price-total font-royal">{price}</span>
                </div>

                <button 
                  className={`btn-gold ${added ? 'btn-acquired' : ''}`}
                  onClick={handleAddHamper}
                >
                  {added ? (
                    <>
                      <Check size={16} />
                      <span>Hamper Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Gift size={16} />
                      <span>Acquire Bespoke Hamper</span>
                    </>
                  )}
                </button>
              </div>

              {/* Corporate and Wedding Notice */}
              <div className="concierge-hotline-note">
                <p>
                  Organizing a Royal Wedding or Corporate Gala? Connect directly with our Senior Gifting Master at <strong>concierge@nanshifoods.com</strong> or <strong>+91 (0) 141 289 1968</strong>.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
