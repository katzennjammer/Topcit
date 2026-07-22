/**
 * Utility for loading TOPCIT reviewer markdown documents from public/reviewers/
 */

export const REVIEWER_MODULES = [
  {
    id: 'V1',
    essenceId: 'E1',
    filename: 'V1_Software Development.md',
    title: 'Software Development Reviewer',
    category: 'Software Engineering',
    description: 'Complete study guide for software engineering lifecycle, design patterns, testing, and SCM.',
    iconName: 'Code',
    color: '#4F46E5',
    accentLight: '#EEF2FF',
  },
  {
    id: 'V2',
    essenceId: 'E2',
    filename: 'V2_Database.md',
    title: 'Database Systems Reviewer',
    category: 'Data Engineering',
    description: 'In-depth notes on data modeling, relational algebra, normalization, SQL, and DBMS transaction processing.',
    iconName: 'Database',
    color: '#0284C7',
    accentLight: '#E0F2FE',
  },
  {
    id: 'V3',
    essenceId: 'E3',
    filename: 'V3_System Architecture.md',
    title: 'System Architecture Reviewer',
    category: 'Architecture & OS',
    description: 'Hardware architecture, network protocols, cloud platforms, virtual machines, and operating system concepts.',
    iconName: 'Cpu',
    color: '#7C3AED',
    accentLight: '#F3E8FF',
  },
  {
    id: 'V4',
    essenceId: 'E4',
    filename: 'V4_Information Security.md',
    title: 'Information Security Reviewer',
    category: 'Cyber Security',
    description: 'Cybersecurity pillars, cryptography algorithms, authentication protocols, network defenses, and threat analysis.',
    iconName: 'ShieldCheck',
    color: '#E11D48',
    accentLight: '#FFE4E6',
  },
  {
    id: 'V5',
    essenceId: 'E5',
    filename: 'V5_IT Business and Ethics.md',
    title: 'IT Business & Ethics Reviewer',
    category: 'Business & Ethics',
    description: 'Digital transformation strategy, enterprise IT value, IP law, open source licensing, and corporate tech ethics.',
    iconName: 'Briefcase',
    color: '#D97706',
    accentLight: '#FEF3C7',
  },
  {
    id: 'V6',
    essenceId: 'E6',
    filename: 'V6_Project Management.md',
    title: 'Project Management Reviewer',
    category: 'Management & Agile',
    description: 'PMBOK framework, Agile/Scrum methodologies, risk management, quality control, and team communication.',
    iconName: 'CheckSquare',
    color: '#059669',
    accentLight: '#D1FAE5',
  },
];

/**
 * Loads markdown raw content for a reviewer file from public/reviewers/
 */
export async function loadReviewerMarkdown(filename) {
  try {
    const res = await fetch(`/reviewers/${encodeURIComponent(filename)}`);
    if (!res.ok) {
      throw new Error(`Failed to load reviewer file: ${filename} (Status ${res.status})`);
    }
    const text = await res.text();
    return text;
  } catch (err) {
    console.error(`Error loading reviewer markdown file ${filename}:`, err);
    throw err;
  }
}
