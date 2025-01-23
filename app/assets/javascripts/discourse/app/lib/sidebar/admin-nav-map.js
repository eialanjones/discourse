export const ADMIN_NAV_MAP = [
  {
    name: "account",
    label: "admin.account.title",
    links: [
      {
        name: "admin_backups",
        route: "admin.backups",
        label: "admin.account.sidebar_link.backups",
        icon: "box-archive",
      },
    ],
  },
  {
    name: "reports",
    label: "admin.reports.sidebar_title",
    links: [
      {
        name: "admin_all_reports",
        route: "adminReports.index",
        label: "admin.reports.sidebar_link.all",
        icon: "chart-bar",
        moderator: true,
      },
    ],
  },
  {
    name: "community",
    label: "admin.community.title",
    links: [
      {
        name: "admin_about_your_site",
        route: "adminConfig.about",
        label: "admin.community.sidebar_link.about_your_site",
        icon: "gear",
      },
      {
        name: "admin_badges",
        route: "adminBadges",
        label: "admin.community.sidebar_link.badges",
        icon: "certificate",
      },
      {
        name: "admin_login_and_authentication",
        route: "adminConfig.loginAndAuthentication.settings",
        label: "admin.community.sidebar_link.login_and_authentication",
        icon: "unlock",
      },
      {
        name: "admin_notifications",
        route: "adminConfig.notifications.settings",
        label: "admin.community.sidebar_link.notifications",
        icon: "bell",
      },
      {
        name: "admin_permalinks",
        route: "adminPermalinks",
        label: "admin.community.sidebar_link.permalinks",
        icon: "link",
      },
      {
        name: "admin_trust_levels",
        route: "adminConfig.trustLevels.settings",
        label: "admin.community.sidebar_link.trust_levels",
        icon: "user-shield",
      },
      {
        name: "admin_group_permissions",
        route: "adminConfig.groupPermissions.settings",
        label: "admin.community.sidebar_link.group_permissions",
        icon: "user-gear",
      },
      {
        name: "admin_user_fields",
        route: "adminUserFields",
        label: "admin.community.sidebar_link.user_fields",
        icon: "user-pen",
      },
      {
        name: "admin_watched_words",
        route: "adminWatchedWords",
        label: "admin.community.sidebar_link.watched_words",
        icon: "eye",
        moderator: true,
      },
      {
        name: "admin_legal",
        route: "adminConfig.legal.settings",
        label: "admin.community.sidebar_link.legal",
        icon: "gavel",
      },
      {
        name: "admin_moderation_flags",
        route: "adminConfig.flags",
        label: "admin.community.sidebar_link.moderation_flags.title",
        keywords: "admin.community.sidebar_link.moderation_flags.keywords",
        icon: "flag",
      },
    ],
  },
  {
    name: "appearance",
    label: "admin.appearance.title",
    links: [
      {
        name: "admin_font_style",
        route: "adminConfig.fonts.settings",
        label: "admin.appearance.sidebar_link.font_style",
        icon: "italic",
      },
      {
        name: "admin_site_logo",
        route: "adminConfig.logo.settings",
        label: "admin.appearance.sidebar_link.site_logo",
        icon: "fab-discourse",
      },
      {
        name: "admin_color_schemes",
        route: "adminCustomize.colors",
        label: "admin.appearance.sidebar_link.color_schemes",
        icon: "palette",
      },
      {
        name: "admin_emoji",
        route: "adminEmojis",
        label: "admin.appearance.sidebar_link.emoji",
        icon: "discourse-emojis",
      },
      {
        name: "admin_navigation",
        route: "adminConfig.navigation.settings",
        label: "admin.appearance.sidebar_link.navigation",
        icon: "diagram-project",
      },
      {
        name: "admin_themes_and_components",
        route: "adminConfig.lookAndFeel.themes",
        currentWhen:
          "adminConfig.lookAndFeel.themes adminConfig.lookAndFeel.components",
        label: "admin.appearance.sidebar_link.themes_and_components.title",
        icon: "paintbrush",
        keywords:
          "admin.appearance.sidebar_link.themes_and_components.keywords",
      },
      {
        name: "admin_customize_site_texts",
        route: "adminSiteText",
        label: "admin.appearance.sidebar_link.site_texts",
        icon: "language",
      },
    ],
  },
  {
    name: "email_settings",
    label: "admin.email_settings.title",
    links: [
      {
        name: "admin_server_setup",
        route: "adminEmail",
        label: "admin.email_settings.sidebar_link.server_setup.title",
        icon: "gear",
        keywords: "admin.email_settings.sidebar_link.server_setup.keywords",
      },
      {
        name: "admin_appearance",
        route: "adminCustomizeEmailStyle",
        label: "admin.email_settings.sidebar_link.appearance",
        icon: "envelope",
      },
    ],
  },
  {
    name: "security",
    label: "admin.security.title",
    links: [
      {
        name: "admin_security",
        route: "adminConfig.security.settings",
        label: "admin.security.sidebar_link.security",
        icon: "lock",
      },
      {
        name: "admin_spam",
        route: "adminConfig.spam.settings",
        label: "admin.security.sidebar_link.spam",
        icon: "robot",
      },
      {
        name: "admin_logs_staff_action_logs",
        route: "adminLogs",
        label: "admin.security.sidebar_link.staff_action_logs.title",
        keywords: "admin.security.sidebar_link.staff_action_logs.keywords",
        icon: "user-shield",
        moderator: true,
      },
    ],
  },
  {
    name: "plugins",
    label: "admin.plugins.title",
    links: [
      {
        name: "admin_installed_plugins",
        route: "adminPlugins.index",
        label: "admin.plugins.sidebar_link.installed",
        icon: "puzzle-piece",
      },
    ],
  },
  {
    name: "advanced",
    label: "admin.advanced.title",
    links: [
      {
        name: "admin_api_keys",
        route: "adminApiKeys",
        icon: "key",
        label: "admin.advanced.sidebar_link.api_keys.title",
        keywords: "admin.advanced.sidebar_link.api_keys.keywords",
      },
      {
        name: "admin_webhooks",
        route: "adminWebHooks",
        icon: "arrows-rotate",
        label: "admin.advanced.sidebar_link.webhooks",
      },
      {
        name: "admin_developer",
        route: "adminConfig.developer.settings",
        label: "admin.advanced.sidebar_link.developer",
        icon: "keyboard",
      },
      {
        name: "admin_embedding",
        route: "adminEmbedding",
        label: "admin.advanced.sidebar_link.embedding",
        icon: "code",
      },
      {
        name: "admin_rate_limits",
        route: "adminConfig.rate-limits.settings",
        label: "admin.advanced.sidebar_link.rate_limits",
        icon: "rocket",
      },
      {
        name: "admin_user_api",
        route: "adminConfig.user-api.settings",
        label: "admin.advanced.sidebar_link.user_api",
        icon: "shuffle",
      },
      {
        name: "admin_onebox",
        route: "adminConfig.onebox.settings",
        label: "admin.advanced.sidebar_link.onebox",
        icon: "far-square",
      },
      {
        name: "admin_files",
        route: "adminConfig.files.settings",
        label: "admin.advanced.sidebar_link.files",
        icon: "file",
      },
      {
        name: "admin_other_options",
        route: "adminConfig.other.settings",
        label: "admin.advanced.sidebar_link.other_options",
        icon: "discourse-other-tab",
      },
      {
        name: "admin_search",
        route: "adminConfig.search.settings",
        label: "admin.advanced.sidebar_link.search",
        icon: "magnifying-glass",
      },
      {
        name: "admin_experimental",
        route: "adminConfig.experimental.settings",
        label: "admin.advanced.sidebar_link.experimental",
        icon: "discourse-sparkles",
      },
    ],
  },
];
