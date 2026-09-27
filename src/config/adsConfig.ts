/**
 * CENTRALIZED ADSENSE & ADVERTISEMENT CONFIGURATION
 * 
 * You only need to set your Google AdSense Publisher ID and slot IDs HERE.
 * All pages and ad units across the entire website will automatically use these settings.
 */

export const ADS_CONFIG = {
  // 1. Enter your Google AdSense Publisher ID here (e.g., 'ca-pub-9747308467755001')
  client: 'ca-pub-9747308467755001',

  // 2. Set to true to activate AdSense advertising site-wide
  enabled: true,

  // 3. Show high-converting sponsored banner fallbacks when AdSense script is pending or blocked
  showFallbacks: true,

  // 4. Ad Slot IDs for different placements (replace with your AdSense slot IDs when available)
  slots: {
    // Header leaderboard banner (Desktop: 728x90, Mobile: 320x50/300x100)
    topHeader: '1770310380490-0',

    // Horizontal banner below category circles
    belowCategories: '1770310380491-1',

    // In-feed native ad inserted into product grids
    inFeed: '1770310380492-2',

    // Product detail page - directly above product details
    productDetailTop: '1777454610541-0',

    // Product detail page - below description
    productDetailBottom: '1777454610542-1',

    // Cart review page banner
    cartPage: '1770310380493-3',

    // Address & delivery page banner
    addressPage: '1770310380494-4',

    // Final checkout payment step (HIGH VALUE: Placed next to the Out-of-Stock notice)
    paymentOutOfStock: '1770310380495-5',

    // Sticky bottom mobile anchor banner
    stickyBottomAnchor: '1770310380496-6',

    // Footer banner
    footer: '1770310380497-7',
  },

  // 5. Optional custom HTML / Script banner override if you prefer raw ad scripts
  customAdSnippet: '',
};

export type AdSlotKey = keyof typeof ADS_CONFIG.slots;
