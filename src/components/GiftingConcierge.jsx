import React, { useState } from 'react';
import { Gift, Check } from 'lucide-react';

export default function GiftingConcierge({ currency, onAddBespokeHamper }) {
  const [selectedBox, setSelectedBox] = useState('ivory-star');
  const [ribbonColor, setRibbonColor] = useState('champagne');
  const [sealInitial, setSealInitial] = useState('N');
  const [recipientName, setRecipientName] = useState('Sharma Family');
  const [personalMessage, setPersonalMessage] = useState('Wishing you joy, good health, and sweet celebrations ahead.');
  const [added, setAdded] = useState(false);
  const [letterTilt, setLetterTilt] = useState({ x: 0, y: 0 });

  const handleLetterMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setLetterTilt({ x, y });
  };

  const handleLetterMouseLeave = () => {
    setLetterTilt({ x: 0, y: 0 });
  };

  const boxes = [
    {
      id: 'ivory-star',
      name: 'The Ivory Gift Box',
      weight: '500g',
      capacity: '24 Pieces',
      priceINR: 1950,
      priceUSD: 28,
      desc: 'Handcrafted textured ivory box with gold foil star motif'
    },
    {
      id: 'ratnavali-chest',
      name: 'The Heritage Tier Box',
      weight: '1,000g',
      capacity: '48 Pieces',
      priceINR: 4200,
      priceUSD: 62,
      desc: 'Dual slide-out tiered trays with individually nestled compartments'
    },
    {
      id: 'darbar-trunk',
      name: 'The Grand Celebration Box',
      weight: '1,500g',
      capacity: 'Assorted Mithai',
      priceINR: 5900,
      priceUSD: 88,
      desc: 'Rigid keepsake presentation box with antique brass clasp'
    }
  ];

  const ribbons = [
    { id: 'champagne', name: 'Champagne Ivory', hex: '#EBDDC3', border: '#C59A45' },
    { id: 'crimson', name: 'Festive Crimson', hex: '#8B1E28', border: '#B91C1C' },
    { id: 'emerald', name: 'Peacock Green', hex: '#115E59', border: '#0D9488' }
  ];

  const currentBox = boxes.find(b => b.id === selectedBox) || boxes[0];
  const price = currency === "INR" 
    ? `₹${currentBox.priceINR.toLocaleString('en-IN')}` 
    : `$${currentBox.priceUSD}`;

  const handleAddHamper = () => {
    const hamperId = `giftbox-${currentBox.id}-${ribbonColor}`;
    onAddBespokeHamper({
      id: hamperId,
      name: currentBox.name,
      category: "Gift Box",
      weight: currentBox.weight,
      priceINR: currentBox.priceINR,
      priceUSD: currentBox.priceUSD,
      image: "/images/ref1.webp",
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
        
        {/* Clean Section Header with Scroll Reveal */}
        <div className="clean-section-header text-center reveal-on-scroll">
          <span className="clean-section-eyebrow">GIFT BOXES</span>
          <h2 className="clean-section-title font-royal">Send a Sweet Gift</h2>
          <p className="clean-section-lead font-serif">
            Perfect for festivals, weddings, and celebrations. Pick your box, choose a ribbon, and add a personal message.
          </p>
        </div>

        {/* Interactive Customizer Workspace with Scroll Reveal */}
        <div className="concierge-workspace-grid reveal-on-scroll">
          
          {/* Controls Column */}
          <div className="concierge-controls">
            
            {/* Step 1: Box Format */}
            <div className="config-step">
              <span className="step-num font-royal">01. CHOOSE YOUR GIFT BOX</span>
              <div className="box-options-list">
                {boxes.map(box => (
                  <div 
                    key={box.id}
                    data-magnetic
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
              <span className="step-num font-royal">02. RIBBON & SEAL MONOGRAM</span>
              <div className="ribbon-selection-row">
                <span className="config-sub-label">Ribbon:</span>
                <div className="ribbon-swatches">
                  {ribbons.map(r => (
                    <button
                      key={r.id}
                      data-magnetic
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
                <span className="config-sub-label">Wax Seal Initial:</span>
                <div className="seal-input-group">
                  {['N', 'S', 'A', 'R', 'K', 'V'].map(letter => (
                    <button
                      key={letter}
                      data-magnetic
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
              <span className="step-num font-royal">03. PERSONAL MESSAGE CARD</span>
              <div className="input-field-group">
                <label className="field-label">Recipient Name</label>
                <input 
                  type="text" 
                  className="royal-input" 
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g., Sharma Family"
                />
              </div>

              <div className="input-field-group">
                <label className="field-label">Personal Message</label>
                <textarea 
                  rows="3"
                  className="royal-textarea font-serif" 
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  placeholder="Wishing you joy, good health, and sweet celebrations..."
                />
              </div>
            </div>

          </div>

          {/* Live Preview Column: The Gold-Embossed Digital Parchment */}
          <div className="concierge-preview-col">
            <div className="preview-sticky-card">
              
              <div className="preview-eyebrow">
                <span className="preview-dot" />
                <span>GIFT BOX PREVIEW</span>
              </div>

              {/* Digital Parchment Envelope with 3D physical tilt */}
              <div 
                className="parchment-letter-wrapper"
                data-cursor="view"
                onMouseMove={handleLetterMouseMove}
                onMouseLeave={handleLetterMouseLeave}
                style={{
                  transform: `perspective(900px) rotateY(${letterTilt.x * 5}deg) rotateX(${-letterTilt.y * 5}deg)`,
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                
                {/* Decorative Ribbon Accent */}
                <div 
                  className="preview-ribbon-band"
                  style={{
                    backgroundColor: ribbons.find(r => r.id === ribbonColor)?.hex
                  }}
                />

                {/* Hot Wax Gold Seal */}
                <div className="preview-wax-seal" data-magnetic>
                  <div className="wax-seal-inner">
                    <span className="wax-letter font-royal">{sealInitial}</span>
                  </div>
                </div>

                {/* Letter Content */}
                <div className="parchment-body">
                  <div className="parchment-crest font-royal">NENSHI FOODS · EST. 1968</div>
                  <div className="parchment-divider-line" />

                  <p className="parchment-salutation font-serif">Dear,</p>
                  <h4 className="parchment-recipient font-royal">{recipientName || "Recipient Name"}</h4>

                  <p className="parchment-message font-serif">
                    "{personalMessage || "Wishing you joy, prosperity, and sweet celebrations ahead."}"
                  </p>

                  <div className="parchment-footer font-serif">
                    <span>Selected Box: <strong>{currentBox.name}</strong></span>
                    <span>Packing: <strong>Carefully packed for safe delivery</strong></span>
                  </div>
                </div>

              </div>

              {/* Order Box Summary */}
              <div className="preview-order-bar">
                <div className="preview-price-block">
                  <span className="preview-price-sub font-serif">Custom Gift Box</span>
                  <span className="preview-price-total font-royal">{price}</span>
                </div>

                <button 
                  className={`btn-gold ${added ? 'btn-acquired' : ''}`}
                  data-magnetic
                  onClick={handleAddHamper}
                >
                  {added ? (
                    <>
                      <Check size={16} />
                      <span>Gift Box Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Gift size={16} />
                      <span>Add Gift Box to Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Corporate and Wedding Notice */}
              <div className="concierge-hotline-note">
                <p>
                  Need sweets for a wedding, festival, or corporate gifting? Reach us at <strong>gifts@nenshifoods.in</strong> or <strong>+91 98200 19680</strong>.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
