import { IncomingHttpHeaders } from 'http'; 

export function prepareHeadersForForwarding(
  originalHeaders: IncomingHttpHeaders,
  method: string,
  body: any,
): Record<string, string> {
  const headersToForward: Record<string, string> = {};

  for (const key in originalHeaders) {
    if (Object.prototype.hasOwnProperty.call(originalHeaders, key)) {
      const value = originalHeaders[key];
      if (typeof value === 'string') {
        headersToForward[key] = value;
      } else if (Array.isArray(value)) {
        // Handle array values (e.g., 'set-cookie') by joining them,
        // or choose to forward only the first one if appropriate for your use case.
        headersToForward[key] = value.join(', ');
      }
    }
  }

  // --- Filter out problematic headers ---
  delete headersToForward['host'];          
  delete headersToForward['connection'];     
  delete headersToForward['content-length']; 
  delete headersToForward['accept-encoding']; 

  // --- Special handling for Content-Type ---
  // content-type is correctly set for POST/PUT/PATCH requests if a body exists
  // and content-type was not explicitly set or was stripped.
  const httpMethod = method.toUpperCase();
  if ((httpMethod === 'POST' || httpMethod === 'PUT' || httpMethod === 'PATCH') && body) {
    if (!headersToForward['content-type']) {
      // Default to JSON if a body is present and no content-type was specified
      headersToForward['content-type'] = 'application/json';
    }
  }

  return headersToForward;
}