export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
export const showErrors = () => document.cookie.split('; ').find((row) => row.startsWith(`debug=`));