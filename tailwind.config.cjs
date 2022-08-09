/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-violet': '#AD1FEA',
        'custom-blue': '#4661E6',
        'light-blue': '#62BCFA',
        'dark-blue': '#3A4374',
        'dark-blue-2': '#373F68',
        stone: '#F7F8FD',
        'light-gray': '#F2F4FF',
        'light-gray-2': '#CDD2EE',
        'dark-gray': '#647196',
        'orange-pastel': '#F49F85',
        'custom-red': '#D73737',
        'hover-violet': '#C75AF6',
        'hover-blue': '#7C91F9',
        'hover-dark-blue': '#656EA3',
        'hover-red': '#E98888',
      },
      fontFamily: {
        regular: 'Jost Regular',
        bold: 'Jost Bold',
        semiBold: 'Jost SemiBold',
      },
    },
  },
  plugins: [],
};
