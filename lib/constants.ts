// Application Constants

export const UNIVERSITIES = ['UM', 'USM', 'UKM', 'UTM', 'UTAR', 'UPM', 'MMU', 'INTI']

export const CATEGORIES = [
  'Textbooks',
  'Electronics',
  'Furniture',
  'Clothing',
  'Stationery',
  'Sports',
  'Other',
]

export const CATEGORY_DISPLAY_NAMES: { [key: string]: string } = {
  'All': 'Semua',
  'Textbooks': 'Books',
  'Clothing': 'Fashion',
  'Electronics': 'Gadgets',
  'Furniture': 'Perabot',
  'Other': 'Lain-lain',
}

export const ITEM_CONDITIONS = ['New', '9/10', '8/10', '7/10', '6/10', '5/10 or Below'] as const

