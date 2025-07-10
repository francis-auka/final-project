
/**
 * Security utility functions for input sanitization and validation
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Validate and sanitize user profile data
 */
export const validateProfileData = (data: any) => {
  const errors: Record<string, string> = {};
  
  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  } else if (data.name.length > 100) {
    errors.name = 'Name must be less than 100 characters';
  }
  
  // Email validation (basic)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation (if provided)
  if (data.phone && data.phone.length > 0) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,20}$/;
    if (!phoneRegex.test(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
  }
  
  // Age validation
  if (data.age && (isNaN(data.age) || data.age < 13 || data.age > 100)) {
    errors.age = 'Age must be between 13 and 100';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitizedData: {
      name: sanitizeHtml(data.name?.trim() || ''),
      email: data.email?.trim() || '',
      phone: sanitizeHtml(data.phone?.trim() || ''),
      school: sanitizeHtml(data.school?.trim() || ''),
      course: sanitizeHtml(data.course?.trim() || ''),
      year: data.year || '',
      sex: data.sex || '',
      age: data.age || ''
    }
  };
};

/**
 * Validate file uploads for security
 */
export const validateFileUpload = (file: File) => {
  const errors: string[] = [];
  
  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    errors.push('File size must be less than 5MB');
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    errors.push('Only JPG and PNG images are allowed');
  }
  
  // Check for potential malicious file names
  const dangerousPatterns = [
    /\.php$/i, /\.js$/i, /\.html$/i, /\.htm$/i, 
    /\.svg$/i, /\.xml$/i, /\.jsp$/i, /\.asp$/i
  ];
  
  if (dangerousPatterns.some(pattern => pattern.test(file.name))) {
    errors.push('File type not allowed for security reasons');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
