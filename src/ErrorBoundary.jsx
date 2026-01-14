import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center', 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
            Xatolik yuz berdi
          </h1>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Iltimos, sahifani yangilang yoki keyinroq qayta urinib ko'ring.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1476FF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Sahifani yangilash
          </button>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <pre style={{ 
              marginTop: '20px', 
              padding: '20px', 
              backgroundColor: '#fff', 
              border: '1px solid #ddd',
              borderRadius: '5px',
              textAlign: 'left',
              overflow: 'auto',
              maxWidth: '800px'
            }}>
              {this.state.error.toString()}
              {this.state.error.stack}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

