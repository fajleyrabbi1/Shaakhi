import type { TranslationKeys } from './bn';

/**
 * English translation dictionary — mirrors the Bangla dictionary shape exactly.
 */
const en: TranslationKeys = {
  nav: {
    home: 'Home',
    feed: 'Feed',
    cases: 'Cases',
    map: 'Map',
    stats: 'Statistics',
    profile: 'Profile',
    notifications: 'Notifications',
    admin: 'Admin',
    create_post: 'New Post',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
  },

  post: {
    title: 'Title',
    body: 'Description',
    category: 'Category',
    district: 'District',
    date_of_incident: 'Date of Incident',
    case_number: 'Case Number',
    source_links: 'Source Links',
    anonymous: 'Post anonymously',
    preview: 'Preview',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete',
    share: 'Share',
    report: 'Report',
    days_without_justice: 'Days without justice',
    breaking_case: 'Breaking Case',
  },

  status: {
    no_action: 'No action',
    investigating: 'Under investigation',
    in_court: 'In court',
    resolved: 'Resolved',
    abandoned: 'Abandoned',
  },

  reactions: {
    anger: 'Anger',
    sad: 'Sadness',
    solidarity: 'Solidarity',
    witness: 'Witness',
  },

  common: {
    search: 'Search',
    filter: 'Filter',
    load_more: 'Load more',
    no_results: 'No results found',
    loading: 'Loading...',
    error: 'An error occurred',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete_confirm: 'Are you sure you want to delete this?',
    sign_in_required: 'Please sign in first',
    today_memory: "Today's Memory",
    do_you_remember: 'Do you remember?',
  },

  profile: {
    posts: 'Posts',
    comments: 'Comments',
    petitions_signed: 'Petitions Signed',
    followed_cases: 'Followed Cases',
    follow: 'Follow',
    unfollow: 'Unfollow',
    edit_profile: 'Edit Profile',
    joined: 'Joined',
    badges: {
      first_post: 'First Post',
      verified_reporter: 'Verified Reporter',
      justice_seeker: 'Justice Seeker',
      community_voice: 'Community Voice',
      petition_starter: 'Petition Starter',
      milestone_100: '100 Posts',
      trusted_witness: 'Trusted Witness',
    },
  },

  petition: {
    sign: 'Sign',
    signatures: 'Signatures',
    goal: 'Goal',
    signed: 'Signed',
    share_petition: 'Share Petition',
  },

  timeline: {
    incident: 'Incident',
    fir_filed: 'FIR Filed',
    arrest: 'Arrest',
    trial_started: 'Trial Started',
    verdict: 'Verdict',
    enforcement: 'Enforcement',
  },

  category: {
    child_abuse: 'Child Abuse',
    sexual_violence: 'Sexual Violence',
    murder: 'Murder',
    corruption: 'Corruption',
    domestic_violence: 'Domestic Violence',
    injustice: 'Injustice',
    institution_abuse: 'Institutional Abuse',
    success: 'Success Story',
    petition: 'Petition & Movement',
    general: 'General Post',
  },

  date: {
    just_now: 'Just now',
    seconds_ago: 'seconds ago',
    minute_ago: '1 minute ago',
    minutes_ago: 'minutes ago',
    hour_ago: '1 hour ago',
    hours_ago: 'hours ago',
    day_ago: '1 day ago',
    days_ago: 'days ago',
    month_ago: '1 month ago',
    months_ago: 'months ago',
    year_ago: '1 year ago',
    years_ago: 'years ago',
    days: 'days',
  },

  meta: {
    app_name: 'Sakkhi',
    tagline: 'Voice of the justice seekers of Bangladesh',
    description:
      'Sakkhi — A social justice platform where every story of injustice in Bangladesh is documented.',
  },
} as const;

export default en;
