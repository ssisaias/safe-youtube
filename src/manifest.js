
module.exports = {
  name: 'Safe Youtube',
  version: '1.0.0',
  description: 'Extensao do chrome para avaliar nivel de comentários ruins em um vídeo.',
  author: 'Isaias S. Silva',
  manifest_version: 2,
  icons: { '16': 'icons/16.png', '128': 'icons/128.png' },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'cookies',
    'background',
    'contextMenus',
    'unlimitedStorage',
    'storage',
    'notifications',
    'identity',
    'identity.email',
    'declarativeContent'
  ],
  background: {
    persistent: false,
    page: 'pages/background.html'
  },
  page_action: {
    default_title: 'title',
    default_popup: 'pages/popup.html'
  },
  devtools_page: 'pages/devtools.html',
  options_page: 'pages/options.html',
  content_scripts: [{
    js: [ 'js/inject.js' ],
    run_at: 'document_end',
    matches: ['<all_urls>'],
    all_frames: true
  }],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: [ 'panel.html', 'js/content.js' ]
}
