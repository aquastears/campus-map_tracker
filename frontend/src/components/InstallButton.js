import React from 'react';
import './InstallButton.css';

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);
  const [isInstallable, setIsInstallable] = React.useState(false);
  const [isInstalled, setIsInstalled] = React.useState(false);
  const [showInstructions, setShowInstructions] = React.useState(false);

  React.useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Listen for the install prompt event
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If no install prompt, show manual instructions
      setShowInstructions(true);
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsInstalled(true);
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  const closeInstructions = () => {
    setShowInstructions(false);
  };

  // Don't show if already installed
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* Install Button in Header */}
      <button 
        className="install-button"
        onClick={handleInstallClick}
        title="Install app for offline access"
      >
        <span className="install-icon">📥</span>
        <span className="install-text">Install App</span>
      </button>

      {/* Manual Instructions Modal */}
      {showInstructions && (
        <div className="install-modal-overlay" onClick={closeInstructions}>
          <div className="install-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeInstructions}>✕</button>
            
            <h2>📱 Install Campus Access</h2>
            <p className="modal-subtitle">Get quick access and use offline!</p>

            <div className="platform-instructions">
              {/* Android Instructions */}
              <div className="platform-section">
                <h3>🤖 Android (Chrome)</h3>
                <ol>
                  <li>Tap the <strong>menu</strong> icon (⋮) in the top right</li>
                  <li>Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong></li>
                  <li>Tap <strong>"Install"</strong></li>
                  <li>App will appear on your home screen!</li>
                </ol>
              </div>

              {/* iOS Instructions */}
              <div className="platform-section">
                <h3>🍎 iPhone (Safari)</h3>
                <ol>
                  <li>Tap the <strong>Share</strong> button (
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                      <path d="M8 0l-4 4h2.5v7h3V4H12L8 0zm-7 11v8h14v-8h-2v6H3v-6H1z"/>
                    </svg>
                    ) at the bottom
                  </li>
                  <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                  <li>Tap <strong>"Add"</strong> in the top right</li>
                  <li>App will appear on your home screen!</li>
                </ol>
              </div>
            </div>

            <div className="benefits">
              <h4>Why Install?</h4>
              <ul>
                <li>⚡ Faster loading</li>
                <li>📡 Works offline</li>
                <li>🏠 Easy access from home screen</li>
                <li>🔋 Uses less battery</li>
              </ul>
            </div>

            <button className="modal-close-btn" onClick={closeInstructions}>
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default InstallButton;