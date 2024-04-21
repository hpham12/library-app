export const FRONTEND_CATEGORY = 'Frontend';
export const BACKEND_CATEGORY = 'Backend';
export const DATA_CATEGORY = 'Data';
export const DEVOPS_CATEGORY = 'DevOps';
export type BookCategory = typeof FRONTEND_CATEGORY | typeof BACKEND_CATEGORY | typeof DATA_CATEGORY | typeof DEVOPS_CATEGORY;

export const CATEGORIES_AND_SEARCH_TERMS_MAP = new Map<BookCategory, string>([
	[FRONTEND_CATEGORY, 'fe'],
	[BACKEND_CATEGORY, 'be'],
	[DATA_CATEGORY, 'data'],
	[DEVOPS_CATEGORY, 'devops']
])