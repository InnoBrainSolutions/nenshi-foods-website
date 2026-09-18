import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Nenshi Foods ErrorBoundary Caught]:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          backgroundColor: '#FBF8F2',
          color: '#1A0F08',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '1.1rem',
            letterSpacing: '0.2em',
            color: '#C59A45',
            fontWeight: 700,
            marginBottom: '1rem'
          }}>
            ✦ NENSHI FOODS · EST. 1968 ✦
          </div>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '2.5rem',
            fontWeight: 600,
            margin: '0 0 1rem 0'
          }}>
            Crafting in Progress
          </h1>
          <p style={{
            maxWidth: '480px',
            fontSize: '1rem',
            color: '#5C4A3E',
            lineHeight: 1.6,
            marginBottom: '2rem'
          }}>
            We encountered a temporary hiccup loading this page. Please refresh to continue exploring our handcrafted traditional sweets.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: '0.85rem 2rem',
              backgroundColor: '#C59A45',
              color: '#FFFDF9',
              border: 'none',
              borderRadius: '9999px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(197, 154, 69, 0.28)'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
